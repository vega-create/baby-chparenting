import { useState } from "react";

const fmt = (n) => "$" + Math.round(n).toLocaleString();

export default function CollegeSavingsCalculator() {
  const [childAge, setChildAge] = useState(0);
  const [initial, setInitial] = useState("1000");
  const [monthly, setMonthly] = useState("200");
  const [rate, setRate] = useState("6");
  const [targetAge, setTargetAge] = useState(18);

  const years = Math.max(0, targetAge - childAge);
  const p = parseFloat(initial) || 0;
  const m = parseFloat(monthly) || 0;
  const r = (parseFloat(rate) || 0) / 100 / 12;
  const n = years * 12;

  // Monthly compounding, contributions at the end of each month
  const growthFactor = Math.pow(1 + r, n);
  const futureValue = r > 0
    ? p * growthFactor + m * ((growthFactor - 1) / r)
    : p + m * n;
  const contributed = p + m * n;
  const earnings = Math.max(0, futureValue - contributed);
  const pctContrib = futureValue > 0 ? (contributed / futureValue) * 100 : 100;

  // Year-by-year table (every 3 years + final)
  const rows = [];
  for (let y = 0; y <= years; y++) {
    if (y % 3 === 0 || y === years) {
      const k = y * 12;
      const gf = Math.pow(1 + r, k);
      const v = r > 0 ? p * gf + m * ((gf - 1) / r) : p + m * k;
      rows.push({ age: childAge + y, value: v, contributed: p + m * k });
    }
  }

  const inputCls = "w-full px-3 py-2 border-2 border-blue-200 rounded-xl bg-white focus:border-[#3B82F6] focus:outline-none";

  return (
    <div className="card">
      <div className="grid gap-4 sm:grid-cols-2 mb-6">
        <div>
          <label className="text-sm font-semibold text-[#1E293B] mb-2 block">Child's age now: {childAge}</label>
          <input type="range" min="0" max="17" value={childAge} onChange={(e) => setChildAge(parseInt(e.target.value))} className="w-full accent-[#3B82F6]" />
        </div>
        <div>
          <label className="text-sm font-semibold text-[#1E293B] mb-2 block">Target age: {targetAge}</label>
          <input type="range" min="15" max="22" value={targetAge} onChange={(e) => setTargetAge(parseInt(e.target.value))} className="w-full accent-[#3B82F6]" />
        </div>
        <div>
          <label className="text-sm font-semibold text-[#1E293B] mb-2 block">Starting amount ($)</label>
          <input type="number" min="0" step="100" value={initial} onChange={(e) => setInitial(e.target.value)} className={inputCls} />
        </div>
        <div>
          <label className="text-sm font-semibold text-[#1E293B] mb-2 block">Monthly contribution ($)</label>
          <input type="number" min="0" step="25" value={monthly} onChange={(e) => setMonthly(e.target.value)} className={inputCls} />
        </div>
        <div className="sm:col-span-2">
          <label className="text-sm font-semibold text-[#1E293B] mb-2 block">Assumed annual return (%)</label>
          <input type="number" min="0" max="15" step="0.5" value={rate} onChange={(e) => setRate(e.target.value)} className={inputCls} />
          <p className="text-xs text-[#9CA3AF] mt-1">Returns are not guaranteed. Try a conservative and an optimistic number.</p>
        </div>
      </div>

      <div className="rounded-2xl bg-[#E6F0FB] p-5 text-center mb-4">
        <div className="text-xs font-semibold uppercase tracking-wide text-[#2E6FB8] mb-1">Projected balance at age {targetAge}</div>
        <div className="text-4xl font-bold text-[#1E3A5F]">{fmt(futureValue)}</div>
        <div className="text-sm text-[#5A6F89] mt-1">{years} years of saving · {fmt(m * 12)} per year</div>
      </div>

      <div className="grid grid-cols-2 gap-3 text-center mb-4">
        <div className="rounded-xl bg-[#DDF0E5] p-4">
          <div className="text-xl font-bold text-[#3E8A66]">{fmt(contributed)}</div>
          <div className="text-xs text-[#5A6F89]">You contribute</div>
        </div>
        <div className="rounded-xl bg-[#FBEED5] p-4">
          <div className="text-xl font-bold text-[#A37224]">{fmt(earnings)}</div>
          <div className="text-xs text-[#5A6F89]">Investment growth</div>
        </div>
      </div>
      <div className="h-3 rounded-full overflow-hidden flex mb-6" aria-hidden="true">
        <div className="bg-[#7BC0A0]" style={{ width: `${pctContrib}%` }} />
        <div className="bg-[#E8B86E]" style={{ width: `${100 - pctContrib}%` }} />
      </div>

      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-[#5A6F89] border-b border-blue-100">
            <th className="py-2 font-semibold">Child's age</th>
            <th className="py-2 font-semibold text-right">Contributed</th>
            <th className="py-2 font-semibold text-right">Balance</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.age} className="border-b border-blue-50">
              <td className="py-2">{row.age}</td>
              <td className="py-2 text-right">{fmt(row.contributed)}</td>
              <td className="py-2 text-right font-semibold text-[#1E3A5F]">{fmt(row.value)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="text-xs text-[#9CA3AF] mt-4 italic">For planning only — not financial advice. Projections ignore fees, taxes, and inflation.</p>
    </div>
  );
}
