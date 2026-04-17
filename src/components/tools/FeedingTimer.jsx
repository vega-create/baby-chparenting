import { useState, useEffect, useRef, useCallback } from "react";

const STORAGE_KEY = "baby-feeding-timer";

const FEEDING_GUIDE = [
  { age: "0-1 month", feeds: "8-12/day", breastTime: "10-20 min/side", bottle: "1-3 oz", solids: "N/A" },
  { age: "1-3 months", feeds: "7-9/day", breastTime: "10-15 min/side", bottle: "3-5 oz", solids: "N/A" },
  { age: "3-6 months", feeds: "6-8/day", breastTime: "10-15 min/side", bottle: "4-6 oz", solids: "N/A" },
  { age: "6-9 months", feeds: "5-7/day", breastTime: "8-12 min/side", bottle: "6-8 oz", solids: "1-2 meals" },
  { age: "9-12 months", feeds: "4-6/day", breastTime: "5-10 min/side", bottle: "6-8 oz", solids: "2-3 meals" },
  { age: "12-18 months", feeds: "3-4/day", breastTime: "5-10 min/side", bottle: "16-24 oz total", solids: "3 meals + snacks" },
  { age: "18-24 months", feeds: "2-3/day", breastTime: "5-10 min/side", bottle: "16-20 oz total", solids: "3 meals + 2 snacks" },
];

function fmt(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

function fmtTime(date) {
  return new Date(date).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
}

function getTodayKey() {
  return new Date().toISOString().split("T")[0];
}

function loadData() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}"); } catch { return {}; }
}

function saveData(data) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch {}
}

function loadToday() {
  return loadData()[getTodayKey()] || [];
}

function saveToday(records) {
  const data = loadData();
  data[getTodayKey()] = records;
  saveData(data);
}

function loadAllDays() {
  const data = loadData();
  return Object.entries(data).sort(([a], [b]) => b.localeCompare(a)).slice(0, 7);
}

function timeSince(isoString) {
  if (!isoString) return "";
  const diff = Math.floor((Date.now() - new Date(isoString).getTime()) / 60000);
  if (diff < 1) return "just now";
  if (diff < 60) return `${diff}m ago`;
  const h = Math.floor(diff / 60);
  const m = diff % 60;
  return `${h}h ${m}m ago`;
}

export default function FeedingTimer() {
  const [sessions, setSessions] = useState([]);
  const [timing, setTiming] = useState(false);
  const [side, setSide] = useState("left");
  const [elapsed, setElapsed] = useState(0);
  const [tab, setTab] = useState("breast");
  const [viewTab, setViewTab] = useState("log");
  const [bottleAmt, setBottleAmt] = useState("");
  const [bottleUnit, setBottleUnit] = useState("oz");
  const [solidFood, setSolidFood] = useState("");
  const [solidNotes, setSolidNotes] = useState("");
  const timerRef = useRef(null);

  useEffect(() => { setSessions(loadToday()); }, []);

  useEffect(() => {
    if (timing) {
      timerRef.current = setInterval(() => setElapsed((p) => p + 1), 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [timing]);

  const lastFeed = sessions.length > 0 ? sessions[0] : null;
  const lastSide = lastFeed?.side;
  const nextSide = lastSide === "left" ? "right" : "left";

  const handleStart = useCallback((selectedSide) => {
    setSide(selectedSide);
    setTiming(true);
    setElapsed(0);
  }, []);

  const handleStop = useCallback(() => {
    clearInterval(timerRef.current);
    setTiming(false);
    const record = { time: new Date().toISOString(), type: "breast", side, duration: elapsed };
    const updated = [record, ...sessions];
    setSessions(updated);
    saveToday(updated);
    setElapsed(0);
  }, [side, elapsed, sessions]);

  const logBottle = () => {
    const amt = parseFloat(bottleAmt);
    if (isNaN(amt) || amt <= 0) return;
    const record = {
      time: new Date().toISOString(),
      type: "bottle",
      amount: amt,
      unit: bottleUnit,
    };
    const updated = [record, ...sessions];
    setSessions(updated);
    saveToday(updated);
    setBottleAmt("");
  };

  const logSolid = () => {
    if (!solidFood.trim()) return;
    const record = {
      time: new Date().toISOString(),
      type: "solid",
      food: solidFood.trim(),
      notes: solidNotes.trim(),
    };
    const updated = [record, ...sessions];
    setSessions(updated);
    saveToday(updated);
    setSolidFood("");
    setSolidNotes("");
  };

  const resetToday = () => {
    setSessions([]);
    setTiming(false);
    setElapsed(0);
    clearInterval(timerRef.current);
    const data = loadData();
    delete data[getTodayKey()];
    saveData(data);
  };

  // Stats
  const totalFeeds = sessions.length;
  const breastFeeds = sessions.filter((s) => s.type === "breast");
  const totalBreastTime = breastFeeds.reduce((sum, s) => sum + (s.duration || 0), 0);
  const bottleFeeds = sessions.filter((s) => s.type === "bottle");
  const totalOz = bottleFeeds.reduce((sum, s) => sum + (s.unit === "oz" ? s.amount : s.amount * 0.033814), 0);
  const solidFeeds = sessions.filter((s) => s.type === "solid");

  const history = loadAllDays();

  return (
    <div className="card">
      {/* View tabs */}
      <div className="flex gap-2 p-1 bg-blue-50 rounded-full mb-6">
        {["log", "history", "guide"].map((t) => (
          <button key={t} type="button" onClick={() => setViewTab(t)}
            className={`flex-1 px-4 py-2 text-sm font-semibold rounded-full transition capitalize ${
              viewTab === t ? "bg-[#3B82F6] text-white" : "text-[#9CA3AF]"
            }`}>
            {t === "log" ? "Today" : t === "history" ? "History" : "Guide"}
          </button>
        ))}
      </div>

      {viewTab === "log" && (
        <>
          {/* Feed type tabs */}
          <div className="flex gap-2 mb-6 justify-center">
            {[
              { key: "breast", label: "Breast", icon: "🤱" },
              { key: "bottle", label: "Bottle", icon: "🍼" },
              { key: "solid", label: "Solids", icon: "🥣" },
            ].map((t) => (
              <button key={t.key} type="button" onClick={() => setTab(t.key)}
                className={`px-5 py-2 text-sm font-semibold rounded-full transition border-2 ${
                  tab === t.key ? "border-[#3B82F6] bg-[#3B82F6] text-white" : "border-blue-200 text-[#1E293B] hover:border-[#3B82F6]"
                }`}>
                {t.icon} {t.label}
              </button>
            ))}
          </div>

          {/* Breast feeding */}
          {tab === "breast" && (
            <>
              <div className="text-center mb-6">
                <p className="font-mono text-5xl text-[#3B82F6] mb-2">{fmt(elapsed)}</p>
                <p className="text-sm text-[#9CA3AF]">
                  {timing ? `Feeding on ${side} side...` : "Choose a side to start"}
                </p>
              </div>

              {!timing ? (
                <div className="flex gap-4 justify-center mb-6">
                  <button type="button" onClick={() => handleStart("left")}
                    className={`w-28 h-28 rounded-full text-white font-bold text-lg shadow-lg active:scale-95 transition flex flex-col items-center justify-center ${
                      nextSide === "left" ? "bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] ring-4 ring-blue-200" : "bg-gradient-to-br from-blue-200 to-blue-300"
                    }`}>
                    <span className="text-2xl mb-1">🤱</span>
                    Left
                    {nextSide === "left" && <span className="text-[10px] mt-1 opacity-80">Suggested</span>}
                  </button>
                  <button type="button" onClick={() => handleStart("right")}
                    className={`w-28 h-28 rounded-full text-white font-bold text-lg shadow-lg active:scale-95 transition flex flex-col items-center justify-center ${
                      nextSide === "right" ? "bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] ring-4 ring-blue-200" : "bg-gradient-to-br from-blue-200 to-blue-300"
                    }`}>
                    <span className="text-2xl mb-1">🤱</span>
                    Right
                    {nextSide === "right" && <span className="text-[10px] mt-1 opacity-80">Suggested</span>}
                  </button>
                </div>
              ) : (
                <div className="text-center mb-6">
                  <button type="button" onClick={handleStop}
                    className="w-32 h-32 rounded-full bg-gradient-to-br from-red-400 to-red-600 text-white font-bold text-lg shadow-lg active:scale-95 transition mx-auto block"
                    style={{ animation: "feedPulse 1.5s ease-in-out infinite" }}>
                    STOP
                  </button>
                </div>
              )}
            </>
          )}

          {/* Bottle feeding */}
          {tab === "bottle" && (
            <div className="p-4 bg-blue-50 rounded-xl mb-6">
              <h3 className="text-sm font-bold text-[#1E293B] uppercase tracking-wide mb-3">Log Bottle Feed</h3>
              <div className="flex gap-3 flex-wrap items-end">
                <label className="block flex-1 min-w-[100px]">
                  <span className="text-sm text-[#1E293B] mb-1 block">Amount</span>
                  <input type="number" step="0.5" min="0" placeholder="e.g. 4" value={bottleAmt}
                    onChange={(e) => setBottleAmt(e.target.value)}
                    className="w-full px-3 py-2 border-2 border-blue-200 rounded-xl bg-white focus:border-[#3B82F6] focus:outline-none" />
                </label>
                <div className="flex gap-1 p-1 bg-white rounded-full border-2 border-blue-200">
                  <button type="button" onClick={() => setBottleUnit("oz")}
                    className={`px-3 py-1 text-sm font-semibold rounded-full transition ${
                      bottleUnit === "oz" ? "bg-[#3B82F6] text-white" : "text-[#9CA3AF]"
                    }`}>oz</button>
                  <button type="button" onClick={() => setBottleUnit("ml")}
                    className={`px-3 py-1 text-sm font-semibold rounded-full transition ${
                      bottleUnit === "ml" ? "bg-[#3B82F6] text-white" : "text-[#9CA3AF]"
                    }`}>ml</button>
                </div>
                <button type="button" onClick={logBottle}
                  className="px-6 py-2 bg-[#3B82F6] text-white font-semibold rounded-full hover:bg-[#1D4ED8] transition">
                  Log Feed
                </button>
              </div>
            </div>
          )}

          {/* Solid food */}
          {tab === "solid" && (
            <div className="p-4 bg-blue-50 rounded-xl mb-6">
              <h3 className="text-sm font-bold text-[#1E293B] uppercase tracking-wide mb-3">Log Solid Food</h3>
              <div className="space-y-3">
                <label className="block">
                  <span className="text-sm text-[#1E293B] mb-1 block">Food</span>
                  <input type="text" placeholder="e.g. avocado, sweet potato" value={solidFood}
                    onChange={(e) => setSolidFood(e.target.value)}
                    className="w-full px-3 py-2 border-2 border-blue-200 rounded-xl bg-white focus:border-[#3B82F6] focus:outline-none" />
                </label>
                <label className="block">
                  <span className="text-sm text-[#1E293B] mb-1 block">Notes (optional)</span>
                  <input type="text" placeholder="e.g. liked it, allergic reaction" value={solidNotes}
                    onChange={(e) => setSolidNotes(e.target.value)}
                    className="w-full px-3 py-2 border-2 border-blue-200 rounded-xl bg-white focus:border-[#3B82F6] focus:outline-none" />
                </label>
                <button type="button" onClick={logSolid}
                  className="px-6 py-2 bg-[#3B82F6] text-white font-semibold rounded-full hover:bg-[#1D4ED8] transition">
                  Log Food
                </button>
              </div>
            </div>
          )}

          {/* Time since last feed */}
          {lastFeed && (
            <div className="text-center mb-4 p-3 bg-[#D1FAE5] rounded-xl">
              <p className="text-sm text-[#1E293B]">
                Last feed: <span className="font-semibold text-[#3B82F6]">{timeSince(lastFeed.time)}</span>
                {lastFeed.type === "breast" && ` (${lastFeed.side} side)`}
                {lastFeed.type === "bottle" && ` (${lastFeed.amount} ${lastFeed.unit})`}
                {lastFeed.type === "solid" && ` (${lastFeed.food})`}
              </p>
            </div>
          )}

          {/* Today's stats */}
          {sessions.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
              <div className="bg-blue-50 rounded-xl p-3 text-center">
                <p className="text-xs text-[#9CA3AF] font-semibold uppercase mb-1">Total Feeds</p>
                <p className="font-mono text-xl text-[#3B82F6]">{totalFeeds}</p>
              </div>
              <div className="bg-blue-50 rounded-xl p-3 text-center">
                <p className="text-xs text-[#9CA3AF] font-semibold uppercase mb-1">Breast Time</p>
                <p className="font-mono text-lg text-[#3B82F6]">{fmt(totalBreastTime)}</p>
              </div>
              <div className="bg-blue-50 rounded-xl p-3 text-center">
                <p className="text-xs text-[#9CA3AF] font-semibold uppercase mb-1">Bottle Total</p>
                <p className="font-mono text-xl text-[#3B82F6]">{totalOz.toFixed(1)} oz</p>
              </div>
              <div className="bg-blue-50 rounded-xl p-3 text-center">
                <p className="text-xs text-[#9CA3AF] font-semibold uppercase mb-1">Solids</p>
                <p className="font-mono text-xl text-[#3B82F6]">{solidFeeds.length}</p>
              </div>
            </div>
          )}

          {/* Session log */}
          {sessions.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-bold text-[#1E293B] uppercase tracking-wide mb-3">Today's Log</h3>
              <div className="space-y-1">
                {sessions.map((s, i) => (
                  <div key={i} className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-blue-50 text-sm">
                    <span className="text-[#1E293B]">{fmtTime(s.time)}</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      s.type === "breast" ? (s.side === "left" ? "bg-blue-100 text-blue-700" : "bg-purple-100 text-purple-700")
                        : s.type === "bottle" ? "bg-amber-100 text-amber-700"
                        : "bg-green-100 text-green-700"
                    }`}>
                      {s.type === "breast" ? `🤱 ${s.side}` : s.type === "bottle" ? `🍼 ${s.amount} ${s.unit}` : `🥣 ${s.food}`}
                    </span>
                    <span className="font-mono text-[#3B82F6]">
                      {s.type === "breast" ? fmt(s.duration) : ""}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {sessions.length > 0 && (
            <button type="button" onClick={resetToday}
              className="text-sm text-[#9CA3AF] underline hover:text-red-400 block mx-auto">
              Reset today's log
            </button>
          )}
        </>
      )}

      {viewTab === "history" && (
        <div>
          <h3 className="text-sm font-bold text-[#1E293B] uppercase tracking-wide mb-3">7-Day History</h3>
          {history.length === 0 ? (
            <p className="text-sm text-[#9CA3AF] text-center py-8">No feeding data yet. Start logging!</p>
          ) : (
            <div className="space-y-2">
              {history.map(([date, records]) => {
                const bf = records.filter((r) => r.type === "breast");
                const bt = records.filter((r) => r.type === "bottle");
                const sf = records.filter((r) => r.type === "solid");
                const totalTime = bf.reduce((s, r) => s + (r.duration || 0), 0);
                return (
                  <div key={date} className="p-3 bg-blue-50 rounded-xl">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-[#1E293B]">{date}</span>
                      <span className="font-mono text-sm text-[#3B82F6]">{records.length} feeds</span>
                    </div>
                    <div className="flex gap-4 text-xs text-[#9CA3AF]">
                      <span>Breast: {bf.length} ({fmt(totalTime)})</span>
                      <span>Bottle: {bt.length}</span>
                      <span>Solids: {sf.length}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {viewTab === "guide" && (
        <div>
          <h3 className="text-sm font-bold text-[#1E293B] uppercase tracking-wide mb-3">
            Age-Appropriate Feeding Guide
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b-2 border-blue-100">
                  <th className="py-2 px-2 text-[#1E293B]">Age</th>
                  <th className="py-2 px-2 text-[#1E293B]">Feeds/Day</th>
                  <th className="py-2 px-2 text-[#1E293B]">Breast</th>
                  <th className="py-2 px-2 text-[#1E293B]">Bottle</th>
                  <th className="py-2 px-2 text-[#1E293B]">Solids</th>
                </tr>
              </thead>
              <tbody>
                {FEEDING_GUIDE.map((row, i) => (
                  <tr key={i} className="border-b border-blue-50 hover:bg-blue-50">
                    <td className="py-2 px-2 font-medium text-[#3B82F6]">{row.age}</td>
                    <td className="py-2 px-2 text-[#1E293B]">{row.feeds}</td>
                    <td className="py-2 px-2 text-[#1E293B]">{row.breastTime}</td>
                    <td className="py-2 px-2 text-[#1E293B]">{row.bottle}</td>
                    <td className="py-2 px-2 text-[#1E293B]">{row.solids}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs text-[#9CA3AF] italic">
            Source: AAP and WHO feeding guidelines. Every baby is different —
            follow your baby's hunger cues and consult your pediatrician.
          </p>
        </div>
      )}

      <style>{`
        @keyframes feedPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(239,68,68,0.4); }
          50% { box-shadow: 0 0 0 20px rgba(239,68,68,0); }
        }
      `}</style>

      <p className="mt-6 text-xs text-[#9CA3AF] italic text-center">
        Newborns typically feed 8-12 times per day. The tool suggests alternating
        sides for breastfeeding. Consult a lactation consultant or your pediatrician
        if you have feeding concerns.
      </p>
    </div>
  );
}
