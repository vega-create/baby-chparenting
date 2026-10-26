import { useState } from "react";

const FIELDS = [
  { key: "sleep", label: "Sleep (actual, not in bed)", hint: "Be honest. Broken sleep counts for what you got, not what you aimed for.", def: 6 },
  { key: "care", label: "Hands-on childcare", hint: "Feeding, changing, soothing, playing, bath, bedtime, school runs.", def: 8 },
  { key: "home", label: "Housework & errands", hint: "Cooking, cleaning, laundry, groceries, appointments, admin.", def: 3 },
  { key: "work", label: "Paid work (including commute)", hint: "Zero is fine. Part-time counts.", def: 0 },
  { key: "partner", label: "Partner, family, friends", hint: "Time with other adults that isn't logistics.", def: 1 },
  { key: "other", label: "Everything else that isn't yours", hint: "Volunteering, the group chat you run, your parent's errands…", def: 0.5 },
];

export default function MeTimeCalculator({ published = [] }) {
  const selfCareOk = published.includes("self-care-for-moms-that-actually-fits");
  const [vals, setVals] = useState(Object.fromEntries(FIELDS.map((f) => [f.key, f.def])));
  const [calc, setCalc] = useState(false);
  const used = FIELDS.reduce((s, f) => s + (parseFloat(vals[f.key]) || 0), 0);
  const me = Math.max(0, 24 - used);
  const over = used > 24;
  const pct = Math.round((me / 24) * 100);
  const care = parseFloat(vals.care) || 0, home = parseFloat(vals.home) || 0, sleep = parseFloat(vals.sleep) || 0, work = parseFloat(vals.work) || 0;

  const suggestions = [];
  if (sleep < 6) suggestions.push("Sleep is under 6 hours. Before chasing me-time, trade one chore block for a nap or an earlier bedtime; everything feels harder on this little sleep.");
  if (care >= 9) suggestions.push("Childcare is 9+ hours. Build one 15-minute independent-play block (a low shelf of safe toys, same time daily) and one overlap of naps or quiet time. That alone usually frees 30 minutes.");
  if (home >= 3) suggestions.push("Housework is 3+ hours. Pick the two standards that matter and consciously drop the rest this week: freezer dinners, a 'good enough' floor, laundry folded by nobody.");
  if (work > 0 && work + care >= 14) suggestions.push("Work plus childcare is 14+ hours. The commute or lunch break is the only slack: ten pages of a book, a walk, or silence instead of the news.");
  if (me >= 2) suggestions.push("You have 2+ hours on paper. The question is whether they're yours or whether they vanish into scrolling and dishes. Protect the first 15 minutes after bedtime for something that refills you.");
  if (suggestions.length < 3) suggestions.push("Name the hour: tell a partner, a grandparent, or a neighbor the exact window you want (Saturday 9 to 10). Specific asks get answered; vague ones don't.");
  if (suggestions.length < 3) suggestions.push("Attach a reset to a trigger you already have: six slow breaths when the kettle goes on, one line in the mood journal after bedtime.");

  const inputCls = "w-full px-3 py-2 border-2 border-blue-200 rounded-xl bg-white focus:border-[#3B82F6] focus:outline-none";

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
      <div className="card">
        <p className="text-sm text-[#6B7B91]">Hours in a typical weekday. Decimals are fine (1.5).</p>
        <div className="mt-4 space-y-4">
          {FIELDS.map((f) => (
            <div key={f.key}>
              <label className="block text-sm font-semibold text-[#1E3A5F]">{f.label}</label>
              <input type="number" min="0" max="24" step="0.5" value={vals[f.key]} onChange={(e) => { setVals({ ...vals, [f.key]: e.target.value }); setCalc(false); }} className={inputCls} />
              <p className="text-xs text-[#6B7B91] mt-1">{f.hint}</p>
            </div>
          ))}
        </div>
        <button className="btn-primary mt-5" onClick={() => setCalc(true)}>Show me my time</button>
      </div>
      <div className="card">
        {!calc ? (
          <p className="text-sm text-[#6B7B91]">Fill in a typical day and the breakdown will appear here. Most moms are surprised in one direction or the other.</p>
        ) : over ? (
          <div>
            <p className="text-xs font-bold tracking-wider uppercase text-[#B05B73]">That's more than 24 hours</p>
            <p className="mt-2 text-[#374151] leading-relaxed">Your entries add up to <strong>{used.toFixed(1)} hours</strong>. That usually means some things overlap (childcare while cooking, work during naps), which is its own kind of exhausting. Try splitting shared hours between categories and recalculating.</p>
          </div>
        ) : (
          <div>
            <p className="text-xs font-bold tracking-wider uppercase text-[#6B7B91]">Time that's yours</p>
            <p className="result-number">{me.toFixed(1)} h</p>
            <p className="text-sm text-[#374151]">{pct}% of your day. Everything else ({used.toFixed(1)} h) belongs to someone or something else.</p>
            <div className="mt-4 h-4 w-full rounded-full overflow-hidden flex bg-blue-50">
              {FIELDS.map((f, i) => {
                const h = parseFloat(vals[f.key]) || 0;
                const colors = ["#A89BD4", "#E89BAE", "#E8B86E", "#5B9BD5", "#7BC0A0", "#B68C73"];
                return h > 0 ? <div key={f.key} style={{ width: `${(h / 24) * 100}%`, background: colors[i] }} title={`${f.label}: ${h}h`} /> : null;
              })}
              <div style={{ width: `${pct}%`, background: "#1E3A5F" }} title={`Yours: ${me.toFixed(1)}h`} />
            </div>
            <ul className="mt-3 grid grid-cols-2 gap-1 text-xs text-[#6B7B91]">
              {FIELDS.map((f, i) => { const h = parseFloat(vals[f.key]) || 0; return h > 0 ? <li key={f.key}>{f.label.split(" (")[0]}: {h}h</li> : null; })}
              <li className="font-semibold text-[#1E3A5F]">Yours: {me.toFixed(1)}h</li>
            </ul>
            <h3 className="mt-6 font-bold text-[#1E3A5F]">Three ways to find 15 minutes</h3>
            <ol className="mt-2 list-decimal pl-5 space-y-2 text-sm text-[#374151] leading-relaxed">
              {suggestions.slice(0, 3).map((s, i) => <li key={i}>{s}</li>)}
            </ol>
            <p className="mt-4 text-sm text-[#374151]">Once you've found the minutes, the {selfCareOk ? <a className="text-[#2E6FB8] underline" href="/blog/self-care-for-moms-that-actually-fits/">self-care list sorted by 2, 10, and 30 minutes</a> : <span>self-care list sorted by 2, 10, and 30 minutes</span>} is where to spend them.</p>
          </div>
        )}
      </div>
    </div>
  );
}
