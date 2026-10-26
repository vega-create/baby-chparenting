import { useEffect, useRef, useState } from "react";

const PATTERNS = {
  box: { id: "box", label: "Box breathing (4-4-4-4)", phases: [["Breathe in", 4], ["Hold", 4], ["Breathe out", 4], ["Hold", 4]], note: "Equal counts. Steady and simple, good for the middle of a hard afternoon." },
  relax: { id: "relax", label: "4-7-8 (long exhale)", phases: [["Breathe in", 4], ["Hold", 7], ["Breathe out", 8]], note: "A long exhale with a longer hold. Many people find it best right before sleep." },
  simple: { id: "simple", label: "4-6 (in 4, out 6)", phases: [["Breathe in", 4], ["Breathe out", 6]], note: "No holds. The easiest one to do while nursing, cooking, or holding a baby." },
};
const DURATIONS = [{ s: 60, label: "1 min" }, { s: 180, label: "3 min" }, { s: 300, label: "5 min" }];

export default function BreathingExercise() {
  const [patternId, setPatternId] = useState("box");
  const [duration, setDuration] = useState(180);
  const [running, setRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [phaseIdx, setPhaseIdx] = useState(0);
  const [phaseLeft, setPhaseLeft] = useState(PATTERNS.box.phases[0][1]);
  const [cycles, setCycles] = useState(0);
  const [done, setDone] = useState(false);
  const tick = useRef(null);
  const pattern = PATTERNS[patternId];

  useEffect(() => {
    if (!running) { clearInterval(tick.current); return; }
    tick.current = setInterval(() => {
      setElapsed((e) => e + 1);
      setPhaseLeft((left) => {
        if (left > 1) return left - 1;
        setPhaseIdx((i) => {
          const next = (i + 1) % pattern.phases.length;
          if (next === 0) setCycles((c) => c + 1);
          return next;
        });
        return 0; // replaced on next render by effect below
      });
    }, 1000);
    return () => clearInterval(tick.current);
  }, [running, pattern]);

  // When phase changes, load its length
  useEffect(() => { if (running) setPhaseLeft(pattern.phases[phaseIdx][1]); }, [phaseIdx]);

  useEffect(() => {
    if (elapsed >= duration && running) { setRunning(false); setDone(true); }
  }, [elapsed, duration, running]);

  // Pause when the tab is hidden so the count stays honest
  useEffect(() => {
    const onVis = () => { if (document.hidden) setRunning(false); };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  const reset = (pid = patternId) => {
    setRunning(false); setElapsed(0); setPhaseIdx(0); setCycles(0); setDone(false);
    setPhaseLeft(PATTERNS[pid].phases[0][1]);
  };
  const start = () => { if (done || elapsed >= duration) reset(); setRunning(true); };

  const [phaseName] = pattern.phases[phaseIdx];
  const scale = phaseName === "Breathe in" ? 1 : phaseName === "Breathe out" ? 0.55 : (phaseIdx > 0 && pattern.phases[phaseIdx - 1][0] === "Breathe in") ? 1 : 0.55;
  const phaseSecs = pattern.phases[phaseIdx][1];
  const remaining = Math.max(0, duration - elapsed);
  const mm = String(Math.floor(remaining / 60)).padStart(1, "0");
  const ss = String(remaining % 60).padStart(2, "0");

  const chip = (active) => `px-3 py-1.5 rounded-full text-sm font-semibold border-2 transition-colors ${active ? "border-[#2E6FB8] bg-[#E6F0FB] text-[#2E6FB8]" : "border-blue-100 text-[#6B7B91] hover:border-blue-200"}`;

  return (
    <div className="card">
      <div className="grid gap-6 md:grid-cols-[1fr_1fr] items-center">
        <div className="flex flex-col items-center justify-center py-4">
          <div className="relative w-56 h-56 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-[#E6F0FB]" />
            <div
              className="absolute rounded-full bg-[#5B9BD5] shadow-lg"
              style={{ width: 200, height: 200, transform: `scale(${running ? scale : 0.7})`, transition: running ? `transform ${phaseSecs}s ease-in-out` : "transform 0.6s ease" }}
            />
            <div className="relative text-center text-white">
              <p className="text-lg font-bold drop-shadow">{running ? phaseName : done ? "Done" : "Ready"}</p>
              <p className="text-3xl font-mono drop-shadow">{running ? phaseLeft : ""}</p>
            </div>
          </div>
          <p className="mt-4 text-sm text-[#6B7B91]">{mm}:{ss} left · {cycles} {cycles === 1 ? "cycle" : "cycles"}</p>
          <div className="mt-4 flex gap-2">
            {!running ? (
              <button className="btn-primary" onClick={start}>{elapsed > 0 && !done ? "Resume" : "Start"}</button>
            ) : (
              <button className="btn-primary" onClick={() => setRunning(false)}>Pause</button>
            )}
            <button className="px-5 py-3 rounded-full border-2 border-blue-100 text-[#6B7B91] font-semibold hover:border-blue-200" onClick={() => reset()}>Reset</button>
          </div>
          {done && <p className="mt-4 text-sm text-[#3E8A66] font-semibold">Nice. {cycles} full cycles. Notice your shoulders.</p>}
        </div>
        <div>
          <p className="text-xs font-bold tracking-wider uppercase text-[#6B7B91] mb-2">Pattern</p>
          <div className="flex flex-wrap gap-2">
            {Object.values(PATTERNS).map((p) => (
              <button key={p.id} className={chip(patternId === p.id)} onClick={() => { setPatternId(p.id); reset(p.id); }}>{p.label}</button>
            ))}
          </div>
          <p className="mt-2 text-sm text-[#6B7B91]">{pattern.note}</p>
          <p className="text-xs font-bold tracking-wider uppercase text-[#6B7B91] mt-5 mb-2">Length</p>
          <div className="flex flex-wrap gap-2">
            {DURATIONS.map((d) => (
              <button key={d.s} className={chip(duration === d.s)} onClick={() => { setDuration(d.s); reset(); }}>{d.label}</button>
            ))}
          </div>
          <div className="mt-5 text-sm text-[#374151] space-y-2">
            <p><strong>How to follow it:</strong> breathe in as the circle grows, out as it shrinks, and stay still while it holds. Breathe through your nose if you can, and let the out-breath be soft rather than forced.</p>
            <p>If you get dizzy, stop and breathe normally. The timer pauses on its own if you switch apps.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
