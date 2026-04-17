import { useState, useEffect, useRef } from "react";

const STORAGE_KEY = "tummy-time-tracker";

const GOALS_BY_AGE = [
  { minAge: 0, maxAge: 1, label: "0-1 month", goalMin: 5, sessionMin: 2, sessions: 3, tip: "Start with 1-2 minutes at a time, 3-5 times per day" },
  { minAge: 1, maxAge: 2, label: "1-2 months", goalMin: 10, sessionMin: 3, sessions: 3, tip: "Work up to 3-5 minutes per session, several times daily" },
  { minAge: 2, maxAge: 3, label: "2-3 months", goalMin: 20, sessionMin: 5, sessions: 4, tip: "Aim for 5-10 minutes per session, building up gradually" },
  { minAge: 3, maxAge: 4, label: "3-4 months", goalMin: 30, sessionMin: 10, sessions: 3, tip: "Baby may start to enjoy tummy time more as they get stronger" },
  { minAge: 4, maxAge: 5, label: "4-5 months", goalMin: 45, sessionMin: 15, sessions: 3, tip: "Baby should be pushing up on arms and may start rolling" },
  { minAge: 5, maxAge: 24, label: "5+ months", goalMin: 60, sessionMin: 20, sessions: 3, tip: "Aim for at least 60 minutes total throughout the day" },
];

function getGoalForAge(months) {
  return GOALS_BY_AGE.find((g) => months >= g.minAge && months < g.maxAge) || GOALS_BY_AGE[GOALS_BY_AGE.length - 1];
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
  const data = loadData();
  return data[getTodayKey()] || { sessions: [] };
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

function fmtSeconds(s) {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

const ACTIVITIES = [
  { age: "0-2 months", activities: ["Lay baby on your chest for skin-to-skin tummy time", "Use a rolled towel under armpits for support", "Get on the floor face-to-face with baby", "Place a small mirror in front of baby"] },
  { age: "2-4 months", activities: ["Place colorful toys just out of reach", "Use a nursing pillow for supported tummy time", "Sing songs and make faces at baby's level", "Gently rock baby on an exercise ball (tummy down)"] },
  { age: "4-6 months", activities: ["Place toys in a circle to encourage reaching", "Try airplane -- hold baby tummy-down on your forearms", "Put baby on a blanket and gently pull to slide", "Use textured toys and crinkle books"] },
];

export default function TummyTimeTracker() {
  const [babyAge, setBabyAge] = useState(3);
  const [today, setToday] = useState({ sessions: [] });
  const [timing, setTiming] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [tab, setTab] = useState("timer");
  const intervalRef = useRef(null);

  useEffect(() => {
    setToday(loadToday());
  }, []);

  useEffect(() => {
    if (timing) {
      intervalRef.current = setInterval(() => {
        setElapsed((e) => e + 1);
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [timing]);

  const startTimer = () => {
    setElapsed(0);
    setTiming(true);
  };

  const stopTimer = () => {
    setTiming(false);
    if (elapsed > 0) {
      const session = {
        duration: elapsed,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      const updated = { sessions: [...today.sessions, session] };
      setToday(updated);
      saveToday(updated);
    }
    setElapsed(0);
  };

  const removeSession = (idx) => {
    const updated = { sessions: today.sessions.filter((_, i) => i !== idx) };
    setToday(updated);
    saveToday(updated);
  };

  const goal = getGoalForAge(babyAge);
  const totalSeconds = today.sessions.reduce((sum, s) => sum + s.duration, 0) + (timing ? elapsed : 0);
  const totalMinutes = totalSeconds / 60;
  const goalSeconds = goal.goalMin * 60;
  const progress = Math.min((totalSeconds / goalSeconds) * 100, 100);

  // SVG progress ring
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const history = loadHistory();

  return (
    <div className="card">
      {/* Age */}
      <div className="mb-6">
        <label className="text-sm font-semibold text-[#1E293B] mb-2 block">Baby's age (months)</label>
        <input
          type="range" min="0" max="12" value={babyAge}
          onChange={(e) => setBabyAge(parseInt(e.target.value))}
          className="w-full accent-[#3B82F6]"
        />
        <p className="text-center text-sm font-medium text-[#3B82F6] mt-1">
          {babyAge} months | Daily goal: {goal.goalMin} minutes
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 p-1 bg-blue-50 rounded-full mb-6">
        {[
          { id: "timer", label: "Timer" },
          { id: "history", label: "7-Day History" },
          { id: "tips", label: "Tips" },
        ].map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`flex-1 px-3 py-2 text-sm font-semibold rounded-full transition ${
              tab === t.id ? "bg-[#3B82F6] text-white" : "text-[#9CA3AF]"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "timer" && (
        <>
          {/* Progress ring */}
          <div className="flex flex-col items-center mb-6">
            <div className="relative">
              <svg width="180" height="180" className="transform -rotate-90">
                <circle cx="90" cy="90" r={radius} fill="none" stroke="#E0E7FF" strokeWidth="10" />
                <circle
                  cx="90" cy="90" r={radius} fill="none"
                  stroke={progress >= 100 ? "#16A34A" : "#3B82F6"}
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  className="transition-all duration-500"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-mono text-2xl text-[#1E293B]">{fmtSeconds(totalSeconds)}</span>
                <span className="text-xs text-[#9CA3AF]">/ {goal.goalMin} min goal</span>
              </div>
            </div>
            {progress >= 100 && (
              <p className="mt-2 text-sm font-bold text-green-600">Daily goal reached!</p>
            )}
          </div>

          {/* Timer button */}
          <div className="flex justify-center gap-4 mb-6">
            {!timing ? (
              <button
                type="button"
                onClick={startTimer}
                className="px-10 py-4 bg-[#3B82F6] text-white font-bold rounded-full text-xl hover:bg-[#1D4ED8] transition"
              >
                Start Tummy Time
              </button>
            ) : (
              <div className="text-center">
                <p className="font-mono text-4xl text-[#3B82F6] mb-3">{fmtSeconds(elapsed)}</p>
                <button
                  type="button"
                  onClick={stopTimer}
                  className="px-10 py-4 bg-red-500 text-white font-bold rounded-full text-xl hover:bg-red-600 transition"
                >
                  Stop
                </button>
              </div>
            )}
          </div>

          {/* Today's sessions */}
          {today.sessions.length > 0 && (
            <div className="mb-4">
              <h3 className="text-sm font-bold text-[#1E293B] uppercase tracking-wide mb-2">Today's Sessions</h3>
              <div className="space-y-1">
                {today.sessions.map((s, i) => (
                  <div key={i} className="flex items-center justify-between py-2 px-3 bg-blue-50 rounded-lg text-sm">
                    <span className="text-[#9CA3AF]">{s.time}</span>
                    <span className="font-mono text-[#3B82F6]">{fmtSeconds(s.duration)}</span>
                    <button type="button" onClick={() => removeSession(i)} className="text-red-400 hover:text-red-600 text-xs">Remove</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Goal info */}
          <div className="p-3 bg-blue-50 rounded-xl text-sm text-[#1E293B]">
            <p className="font-semibold text-[#1D4ED8] mb-1">Goal for {goal.label}:</p>
            <p>{goal.tip}</p>
          </div>
        </>
      )}

      {tab === "history" && (
        <div>
          <h3 className="text-sm font-bold text-[#1E293B] uppercase tracking-wide mb-3">7-Day History</h3>
          {history.length === 0 ? (
            <p className="text-sm text-[#9CA3AF] text-center py-8">No tummy time recorded yet. Start today!</p>
          ) : (
            <div className="space-y-2">
              {history.map(([date, record]) => {
                const total = (record.sessions || []).reduce((s, x) => s + x.duration, 0);
                const pct = Math.min((total / goalSeconds) * 100, 100);
                return (
                  <div key={date} className="p-3 bg-blue-50 rounded-xl">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-[#1E293B]">{date}</span>
                      <span className="font-mono text-sm text-[#3B82F6]">{fmtSeconds(total)}</span>
                    </div>
                    <div className="bg-blue-100 rounded-full h-2 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{ width: `${pct}%`, backgroundColor: pct >= 100 ? "#16A34A" : "#3B82F6" }}
                      />
                    </div>
                    <p className="text-xs text-[#9CA3AF] mt-1">{(record.sessions || []).length} sessions | {Math.round(pct)}% of goal</p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {tab === "tips" && (
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-bold text-[#1E293B] uppercase tracking-wide mb-3">Why Tummy Time Matters</h3>
            <div className="p-4 bg-blue-50 rounded-xl text-sm text-[#1E293B] space-y-2">
              <p>The AAP recommends supervised tummy time from the first day home from the hospital. Benefits include:</p>
              <ul className="space-y-1 ml-4">
                <li className="flex gap-2"><span className="text-[#3B82F6]">*</span> Builds neck, shoulder, and core muscle strength</li>
                <li className="flex gap-2"><span className="text-[#3B82F6]">*</span> Helps prevent flat spots on the back of the head (positional plagiocephaly)</li>
                <li className="flex gap-2"><span className="text-[#3B82F6]">*</span> Promotes motor development for rolling, crawling, and sitting</li>
                <li className="flex gap-2"><span className="text-[#3B82F6]">*</span> Develops visual tracking and hand-eye coordination</li>
              </ul>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#1E293B] uppercase tracking-wide mb-3">Activities by Age</h3>
            {ACTIVITIES.map((a) => (
              <div key={a.age} className="mb-3 p-3 rounded-xl border-2 border-blue-100">
                <p className="font-semibold text-[#3B82F6] text-sm mb-2">{a.age}</p>
                <ul className="space-y-1">
                  {a.activities.map((act, i) => (
                    <li key={i} className="text-sm text-[#1E293B] flex gap-2">
                      <span className="text-[#3B82F6]">*</span> {act}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      <p className="mt-6 text-xs text-[#9CA3AF] italic text-center">
        Always supervise tummy time. If your baby seems distressed, take a break and try again later.
        Talk to your pediatrician if you have concerns about your baby's motor development.
      </p>
    </div>
  );
}
