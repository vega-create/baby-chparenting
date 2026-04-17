import { useState, useEffect } from "react";

const STORAGE_KEY = "baby-sleep-tracker";

const SLEEP_BY_AGE = [
  { age: "0-1 month", total: "14-17 hrs", night: "8-9 hrs", naps: "7-8 hrs", napCount: "4-5" },
  { age: "1-3 months", total: "14-16 hrs", night: "9-10 hrs", naps: "4-5 hrs", napCount: "3-4" },
  { age: "3-6 months", total: "13-15 hrs", night: "10-11 hrs", naps: "3-4 hrs", napCount: "3" },
  { age: "6-9 months", total: "12-14 hrs", night: "10-11 hrs", naps: "2-3 hrs", napCount: "2-3" },
  { age: "9-12 months", total: "12-14 hrs", night: "10-12 hrs", naps: "2-3 hrs", napCount: "2" },
  { age: "12-18 months", total: "11-14 hrs", night: "10-12 hrs", naps: "1.5-3 hrs", napCount: "1-2" },
  { age: "18-24 months", total: "11-14 hrs", night: "10-12 hrs", naps: "1-2 hrs", napCount: "1" },
];

const SLEEP_TIPS = {
  "0-3": [
    "Follow baby's sleepy cues: yawning, eye rubbing, fussiness.",
    "Keep nighttime feedings calm and dimly lit.",
    "Practice safe sleep: back to sleep, firm flat surface, no loose bedding.",
    "Swaddling can help newborns feel secure and sleep longer.",
  ],
  "3-6": [
    "Start a consistent bedtime routine: bath, book, song.",
    "Put baby down drowsy but awake to encourage self-soothing.",
    "Aim for 3 naps per day, watching wake windows of 1.5-2.5 hours.",
    "Darken the room and use white noise for better sleep.",
  ],
  "6-12": [
    "Most babies can sleep through the night (10-12 hours).",
    "Transition from 3 naps to 2 naps around 7-9 months.",
    "Keep a consistent bedtime between 6:30-7:30 PM.",
    "If sleep training, choose a method you're comfortable with.",
  ],
  "12-24": [
    "Transition from 2 naps to 1 nap around 14-18 months.",
    "Offer a comfort object like a small lovey for self-soothing.",
    "Set clear boundaries around bedtime routines.",
    "Limit screen time, especially 1-2 hours before bed.",
  ],
};

function getTipKey(ageMonths) {
  if (ageMonths < 3) return "0-3";
  if (ageMonths < 6) return "3-6";
  if (ageMonths < 12) return "6-12";
  return "12-24";
}

function getTodayKey() {
  return new Date().toISOString().split("T")[0];
}

function loadData() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch { return {}; }
}

function saveData(data) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch {}
}

function loadToday() {
  const data = loadData();
  return data[getTodayKey()] || { nightSleep: null, naps: [], wakings: 0, wakingDuration: 0 };
}

function saveToday(record) {
  const data = loadData();
  data[getTodayKey()] = record;
  saveData(data);
}

function loadHistory() {
  const data = loadData();
  return Object.entries(data)
    .sort(([a], [b]) => b.localeCompare(a))
    .slice(0, 7);
}

function calcMinutes(start, end) {
  if (!start || !end) return 0;
  const [sh, sm] = start.split(":").map(Number);
  const [eh, em] = end.split(":").map(Number);
  let diff = (eh * 60 + em) - (sh * 60 + sm);
  if (diff < 0) diff += 24 * 60;
  return diff;
}

function fmtMinutes(m) {
  const hrs = Math.floor(m / 60);
  const mins = m % 60;
  if (hrs === 0) return `${mins}m`;
  return mins > 0 ? `${hrs}h ${mins}m` : `${hrs}h`;
}

export default function SleepTracker() {
  const [today, setToday] = useState({ nightSleep: null, naps: [], wakings: 0, wakingDuration: 0 });
  const [babyAge, setBabyAge] = useState(6);
  const [bedtime, setBedtime] = useState("19:30");
  const [wakeTime, setWakeTime] = useState("06:30");
  const [wakings, setWakings] = useState("0");
  const [wakingDur, setWakingDur] = useState("0");
  const [napStart, setNapStart] = useState("");
  const [napEnd, setNapEnd] = useState("");
  const [showRef, setShowRef] = useState(false);
  const [tab, setTab] = useState("log");

  useEffect(() => { setToday(loadToday()); }, []);

  const logNightSleep = () => {
    const updated = {
      ...today,
      nightSleep: { bedtime, wakeTime, wakings: parseInt(wakings) || 0, wakingDuration: parseInt(wakingDur) || 0 },
    };
    setToday(updated);
    saveToday(updated);
  };

  const addNap = () => {
    if (!napStart || !napEnd) return;
    const updated = {
      ...today,
      naps: [...today.naps, { start: napStart, end: napEnd }],
    };
    setToday(updated);
    saveToday(updated);
    setNapStart("");
    setNapEnd("");
  };

  const removeNap = (idx) => {
    const updated = { ...today, naps: today.naps.filter((_, i) => i !== idx) };
    setToday(updated);
    saveToday(updated);
  };

  const clearToday = () => {
    const empty = { nightSleep: null, naps: [], wakings: 0, wakingDuration: 0 };
    setToday(empty);
    saveToday(empty);
  };

  // Calculate stats
  const nightMinutes = today.nightSleep ? calcMinutes(today.nightSleep.bedtime, today.nightSleep.wakeTime) - (today.nightSleep.wakingDuration || 0) : 0;
  const napMinutes = today.naps.reduce((sum, n) => sum + calcMinutes(n.start, n.end), 0);
  const totalMinutes = nightMinutes + napMinutes;
  const longestStretch = today.nightSleep
    ? Math.max(0, nightMinutes - (today.nightSleep.wakings || 0) * 10)
    : 0;

  const tips = SLEEP_TIPS[getTipKey(babyAge)];
  const history = loadHistory();

  return (
    <div className="card">
      {/* Age selector */}
      <div className="mb-6">
        <label className="text-sm font-semibold text-[#1E293B] mb-2 block">Baby's age (months)</label>
        <input
          type="range" min="0" max="24" value={babyAge}
          onChange={(e) => setBabyAge(parseInt(e.target.value))}
          className="w-full accent-[#3B82F6]"
        />
        <p className="text-center text-sm font-medium text-[#3B82F6] mt-1">{babyAge} months old</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 p-1 bg-blue-50 rounded-full mb-6">
        {["log", "history", "guide"].map((t) => (
          <button key={t} type="button" onClick={() => setTab(t)}
            className={`flex-1 px-4 py-2 text-sm font-semibold rounded-full transition capitalize ${
              tab === t ? "bg-[#3B82F6] text-white" : "text-[#9CA3AF]"
            }`}>
            {t === "log" ? "Today" : t === "history" ? "History" : "Sleep Guide"}
          </button>
        ))}
      </div>

      {tab === "log" && (
        <>
          {/* Night sleep form */}
          <div className="mb-6 p-4 bg-blue-50 rounded-xl">
            <h3 className="text-sm font-bold text-[#1E293B] uppercase tracking-wide mb-3">Night Sleep</h3>
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm text-[#1E293B] mb-1 block">Bedtime</span>
                <input type="time" value={bedtime} onChange={(e) => setBedtime(e.target.value)}
                  className="w-full px-3 py-2 border-2 border-blue-200 rounded-xl bg-white focus:border-[#3B82F6] focus:outline-none" />
              </label>
              <label className="block">
                <span className="text-sm text-[#1E293B] mb-1 block">Wake time</span>
                <input type="time" value={wakeTime} onChange={(e) => setWakeTime(e.target.value)}
                  className="w-full px-3 py-2 border-2 border-blue-200 rounded-xl bg-white focus:border-[#3B82F6] focus:outline-none" />
              </label>
              <label className="block">
                <span className="text-sm text-[#1E293B] mb-1 block">Night wakings</span>
                <input type="number" min="0" max="20" value={wakings} onChange={(e) => setWakings(e.target.value)}
                  className="w-full px-3 py-2 border-2 border-blue-200 rounded-xl bg-white focus:border-[#3B82F6] focus:outline-none" />
              </label>
              <label className="block">
                <span className="text-sm text-[#1E293B] mb-1 block">Total waking time (min)</span>
                <input type="number" min="0" max="300" value={wakingDur} onChange={(e) => setWakingDur(e.target.value)}
                  className="w-full px-3 py-2 border-2 border-blue-200 rounded-xl bg-white focus:border-[#3B82F6] focus:outline-none" />
              </label>
            </div>
            <button type="button" onClick={logNightSleep}
              className="mt-3 px-6 py-2 bg-[#3B82F6] text-white font-semibold rounded-full hover:bg-[#1D4ED8] transition">
              Save Night Sleep
            </button>
          </div>

          {/* Nap form */}
          <div className="mb-6 p-4 bg-blue-50 rounded-xl">
            <h3 className="text-sm font-bold text-[#1E293B] uppercase tracking-wide mb-3">Add Nap</h3>
            <div className="flex gap-3 flex-wrap items-end">
              <label className="block flex-1 min-w-[120px]">
                <span className="text-sm text-[#1E293B] mb-1 block">Start</span>
                <input type="time" value={napStart} onChange={(e) => setNapStart(e.target.value)}
                  className="w-full px-3 py-2 border-2 border-blue-200 rounded-xl bg-white focus:border-[#3B82F6] focus:outline-none" />
              </label>
              <label className="block flex-1 min-w-[120px]">
                <span className="text-sm text-[#1E293B] mb-1 block">End</span>
                <input type="time" value={napEnd} onChange={(e) => setNapEnd(e.target.value)}
                  className="w-full px-3 py-2 border-2 border-blue-200 rounded-xl bg-white focus:border-[#3B82F6] focus:outline-none" />
              </label>
              <button type="button" onClick={addNap}
                className="px-6 py-2 bg-[#3B82F6] text-white font-semibold rounded-full hover:bg-[#1D4ED8] transition">
                + Add Nap
              </button>
            </div>
          </div>

          {/* Nap list */}
          {today.naps.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-bold text-[#1E293B] uppercase tracking-wide mb-3">Today's Naps</h3>
              <div className="space-y-1">
                {today.naps.map((n, i) => (
                  <div key={i} className="flex items-center justify-between py-2 px-3 bg-blue-50 rounded-lg text-sm">
                    <span className="text-[#1E293B]">{n.start} - {n.end}</span>
                    <span className="font-mono text-[#3B82F6]">{fmtMinutes(calcMinutes(n.start, n.end))}</span>
                    <button type="button" onClick={() => removeNap(i)} className="text-red-400 hover:text-red-600 text-xs">Remove</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Stats */}
          {(today.nightSleep || today.naps.length > 0) && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              <div className="bg-blue-50 rounded-xl p-3 text-center">
                <p className="text-xs text-[#9CA3AF] font-semibold uppercase mb-1">Total Sleep</p>
                <p className="font-mono text-xl text-[#3B82F6]">{fmtMinutes(totalMinutes)}</p>
              </div>
              <div className="bg-blue-50 rounded-xl p-3 text-center">
                <p className="text-xs text-[#9CA3AF] font-semibold uppercase mb-1">Night Sleep</p>
                <p className="font-mono text-xl text-[#3B82F6]">{fmtMinutes(nightMinutes)}</p>
              </div>
              <div className="bg-blue-50 rounded-xl p-3 text-center">
                <p className="text-xs text-[#9CA3AF] font-semibold uppercase mb-1">Nap Time</p>
                <p className="font-mono text-xl text-[#3B82F6]">{fmtMinutes(napMinutes)}</p>
              </div>
              <div className="bg-blue-50 rounded-xl p-3 text-center">
                <p className="text-xs text-[#9CA3AF] font-semibold uppercase mb-1">Wakings</p>
                <p className="font-mono text-xl text-[#3B82F6]">{today.nightSleep?.wakings || 0}</p>
              </div>
            </div>
          )}

          {/* Sleep tips */}
          <div className="mb-6 p-4 rounded-xl border-2 border-blue-100">
            <h3 className="text-sm font-bold text-[#1E293B] uppercase tracking-wide mb-3">
              Sleep Tips for {babyAge} Month Old
            </h3>
            <ul className="space-y-2">
              {tips.map((tip, i) => (
                <li key={i} className="flex gap-2 text-sm text-[#1E293B]">
                  <span className="text-[#3B82F6] font-bold shrink-0">*</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>

          {(today.nightSleep || today.naps.length > 0) && (
            <button type="button" onClick={clearToday}
              className="text-sm text-[#9CA3AF] underline hover:text-red-400 block mx-auto">
              Reset today's log
            </button>
          )}
        </>
      )}

      {tab === "history" && (
        <div>
          <h3 className="text-sm font-bold text-[#1E293B] uppercase tracking-wide mb-3">7-Day History</h3>
          {history.length === 0 ? (
            <p className="text-sm text-[#9CA3AF] text-center py-8">No sleep data recorded yet. Start logging today!</p>
          ) : (
            <div className="space-y-2">
              {history.map(([date, record]) => {
                const ns = record.nightSleep ? calcMinutes(record.nightSleep.bedtime, record.nightSleep.wakeTime) - (record.nightSleep.wakingDuration || 0) : 0;
                const np = (record.naps || []).reduce((s, n) => s + calcMinutes(n.start, n.end), 0);
                return (
                  <div key={date} className="p-3 bg-blue-50 rounded-xl">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-[#1E293B]">{date}</span>
                      <span className="font-mono text-sm text-[#3B82F6]">{fmtMinutes(ns + np)} total</span>
                    </div>
                    <div className="flex gap-4 text-xs text-[#9CA3AF]">
                      <span>Night: {fmtMinutes(ns)}</span>
                      <span>Naps: {fmtMinutes(np)} ({(record.naps || []).length})</span>
                      <span>Wakings: {record.nightSleep?.wakings || 0}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {tab === "guide" && (
        <div>
          <h3 className="text-sm font-bold text-[#1E293B] uppercase tracking-wide mb-3">
            Age-Appropriate Sleep Reference
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b-2 border-blue-100">
                  <th className="py-2 px-2 text-[#1E293B]">Age</th>
                  <th className="py-2 px-2 text-[#1E293B]">Total</th>
                  <th className="py-2 px-2 text-[#1E293B]">Night</th>
                  <th className="py-2 px-2 text-[#1E293B]">Naps</th>
                  <th className="py-2 px-2 text-[#1E293B]"># Naps</th>
                </tr>
              </thead>
              <tbody>
                {SLEEP_BY_AGE.map((row, i) => (
                  <tr key={i} className="border-b border-blue-50 hover:bg-blue-50">
                    <td className="py-2 px-2 font-medium text-[#3B82F6]">{row.age}</td>
                    <td className="py-2 px-2 text-[#1E293B]">{row.total}</td>
                    <td className="py-2 px-2 text-[#1E293B]">{row.night}</td>
                    <td className="py-2 px-2 text-[#1E293B]">{row.naps}</td>
                    <td className="py-2 px-2 text-[#1E293B]">{row.napCount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs text-[#9CA3AF] italic">
            Source: American Academy of Pediatrics and National Sleep Foundation guidelines.
            Every baby is different — these are general ranges.
          </p>
        </div>
      )}

      <p className="mt-6 text-xs text-[#9CA3AF] italic text-center">
        This tool is for tracking purposes only. If you have concerns about your
        baby's sleep patterns, consult your pediatrician.
      </p>
    </div>
  );
}
