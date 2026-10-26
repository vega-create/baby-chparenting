import { useEffect, useState } from "react";

const KEY = "bcg-mood-journal-v1";
const MOODS = [
  { v: 1, emoji: "😩", label: "Awful", color: "#B05B73", reply: "That's a heavy day. You showed up anyway, and that counts for more than it feels like right now." },
  { v: 2, emoji: "😕", label: "Rough", color: "#A37224", reply: "Rough days are allowed. Lower one standard tonight and let that be the win." },
  { v: 3, emoji: "😐", label: "Okay", color: "#5B7A9A", reply: "Okay is a real result in the baby years. Notice one small thing that went right." },
  { v: 4, emoji: "🙂", label: "Good", color: "#3E8A66", reply: "A good day. Whatever made it good, see if it can happen again tomorrow." },
  { v: 5, emoji: "😄", label: "Great", color: "#2E6FB8", reply: "Great days are proof the hard ones aren't the whole story. Save this feeling." },
];

function todayKey() { return new Date().toISOString().slice(0, 10); }
function load() { try { return JSON.parse(localStorage.getItem(KEY) || "[]"); } catch { return []; } }
function save(entries) { try { localStorage.setItem(KEY, JSON.stringify(entries)); } catch {} }

export default function MoodJournal() {
  const [entries, setEntries] = useState([]);
  const [mood, setMood] = useState(null);
  const [note, setNote] = useState("");
  const [reply, setReply] = useState("");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const e = load();
    setEntries(e);
    const t = e.find((x) => x.date === todayKey());
    if (t) { setMood(t.mood); setNote(t.note || ""); }
    setReady(true);
  }, []);

  const submit = () => {
    if (!mood) return;
    const entry = { date: todayKey(), mood, note: note.trim().slice(0, 280) };
    const next = [entry, ...entries.filter((x) => x.date !== entry.date)]
      .sort((a, b) => (a.date < b.date ? 1 : -1))
      .slice(0, 60);
    setEntries(next); save(next);
    setReply(MOODS.find((m) => m.v === mood).reply);
  };
  const remove = (date) => { const next = entries.filter((x) => x.date !== date); setEntries(next); save(next); if (date === todayKey()) { setMood(null); setNote(""); setReply(""); } };
  const clearAll = () => { if (confirm("Delete all journal entries on this device?")) { setEntries([]); save([]); setMood(null); setNote(""); setReply(""); } };

  const last30 = entries.filter((e) => (Date.now() - new Date(e.date + "T00:00:00").getTime()) / 86400000 <= 30);
  const avg = last30.length ? (last30.reduce((s, e) => s + e.mood, 0) / last30.length).toFixed(1) : null;
  const trend = [...last30].reverse();

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
      <div className="card">
        <p className="text-xs font-bold tracking-wider uppercase text-[#6B7B91]">How was today?</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {MOODS.map((m) => (
            <button key={m.v} type="button" onClick={() => setMood(m.v)} className={`flex flex-col items-center px-3 py-2 rounded-2xl border-2 transition-colors ${mood === m.v ? "border-[#2E6FB8] bg-[#E6F0FB]" : "border-blue-100 hover:border-blue-200"}`}>
              <span className="text-2xl">{m.emoji}</span>
              <span className="text-xs font-semibold text-[#374151]">{m.label}</span>
            </button>
          ))}
        </div>
        <label className="block mt-5 text-sm font-semibold text-[#1E3A5F]">One line about today (optional)</label>
        <textarea value={note} onChange={(e) => setNote(e.target.value)} maxLength={280} rows={3} placeholder="What happened, what you needed, one thing that was yours…" className="mt-1 w-full px-3 py-2 border-2 border-blue-200 rounded-xl bg-white focus:border-[#3B82F6] focus:outline-none text-sm" />
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <button className="btn-primary disabled:opacity-50" disabled={!mood} onClick={submit}>{entries.some((e) => e.date === todayKey()) ? "Update today" : "Save today"}</button>
          <span className="text-xs text-[#6B7B91]">{note.length}/280</span>
        </div>
        {reply && <div className="mt-4 rounded-2xl p-4 text-sm leading-relaxed" style={{ background: "#DDF0E5", color: "#1E3A5F" }}>{reply}</div>}
        <p className="mt-4 text-xs text-[#6B7B91]">Entries are saved only in this browser on this device. Nothing is uploaded. Clearing your browser data will erase them.</p>
      </div>
      <div className="card">
        <div className="flex items-center justify-between">
          <p className="text-xs font-bold tracking-wider uppercase text-[#6B7B91]">Last 30 days</p>
          {avg && <p className="text-sm text-[#374151]">Average <strong>{avg}</strong>/5 · {last30.length} {last30.length === 1 ? "entry" : "entries"}</p>}
        </div>
        {ready && trend.length === 0 && <p className="mt-4 text-sm text-[#6B7B91]">Your first entry will show up here. After a week you'll start to see a pattern, and patterns are easier to fix than vague bad feelings.</p>}
        {trend.length > 0 && (
          <div className="mt-4 flex items-end gap-1 h-24">
            {trend.map((e) => {
              const m = MOODS.find((x) => x.v === e.mood);
              return <div key={e.date} title={`${e.date}: ${m.label}`} className="flex-1 rounded-t-md" style={{ height: `${e.mood * 20}%`, background: m.color }} />;
            })}
          </div>
        )}
        {entries.length > 0 && (
          <ul className="mt-4 space-y-2 max-h-72 overflow-y-auto pr-1">
            {entries.slice(0, 30).map((e) => {
              const m = MOODS.find((x) => x.v === e.mood);
              return (
                <li key={e.date} className="flex items-start gap-3 text-sm">
                  <span className="text-xl leading-none">{m.emoji}</span>
                  <div className="flex-1">
                    <p className="text-[#1E3A5F] font-semibold">{new Date(e.date + "T00:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" })} · {m.label}</p>
                    {e.note && <p className="text-[#374151]">{e.note}</p>}
                  </div>
                  <button className="text-xs text-[#6B7B91] hover:text-[#B05B73]" onClick={() => remove(e.date)} aria-label="Delete entry">✕</button>
                </li>
              );
            })}
          </ul>
        )}
        {entries.length > 0 && <button className="mt-4 text-xs text-[#6B7B91] underline" onClick={clearAll}>Clear all entries</button>}
      </div>
    </div>
  );
}
