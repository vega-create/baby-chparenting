import { useState } from "react";

const DIAPER_SIZES = [
  { size: "Preemie", minLbs: 0, maxLbs: 6, perDay: 12, monthlyCost: 55, monthlyCount: 360 },
  { size: "Newborn", minLbs: 6, maxLbs: 10, perDay: 10, monthlyCost: 50, monthlyCount: 300 },
  { size: "Size 1", minLbs: 8, maxLbs: 14, perDay: 10, monthlyCost: 50, monthlyCount: 300 },
  { size: "Size 2", minLbs: 12, maxLbs: 18, perDay: 8, monthlyCost: 45, monthlyCount: 240 },
  { size: "Size 3", minLbs: 16, maxLbs: 28, perDay: 8, monthlyCost: 45, monthlyCount: 240 },
  { size: "Size 4", minLbs: 22, maxLbs: 37, perDay: 7, monthlyCost: 50, monthlyCount: 210 },
  { size: "Size 5", minLbs: 27, maxLbs: 35, perDay: 6, monthlyCost: 50, monthlyCount: 180 },
  { size: "Size 6", minLbs: 35, maxLbs: 45, perDay: 5, monthlyCost: 50, monthlyCount: 150 },
  { size: "Size 7", minLbs: 41, maxLbs: 55, perDay: 5, monthlyCost: 55, monthlyCount: 150 },
];

const SIZE_UP_SIGNS = [
  "Frequent blowouts, especially up the back",
  "Red marks on baby's thighs or waist from elastic",
  "Diaper is difficult to fasten or the tabs barely meet",
  "Baby seems uncomfortable or fussy when freshly changed",
  "Diaper looks visibly too small or rides low",
];

const DIAPER_TYPES = [
  {
    type: "Disposable",
    pros: ["Most convenient", "Highly absorbent", "Easy for travel", "No washing needed"],
    cons: ["Ongoing cost", "Environmental waste", "Chemical concerns for some parents"],
    monthCost: "$40-80",
  },
  {
    type: "Cloth",
    pros: ["Eco-friendly", "Saves money long-term", "Gentler on skin", "Cute patterns available"],
    cons: ["Higher upfront cost ($200-500)", "Requires washing", "Less absorbent overnight", "Not as convenient for travel"],
    monthCost: "$0-20 (after initial investment)",
  },
  {
    type: "Hybrid",
    pros: ["Best of both worlds", "Reusable cover with disposable insert", "Less waste than full disposable"],
    cons: ["More expensive per change than cloth", "Less mainstream/harder to find", "Still requires some washing"],
    monthCost: "$30-60",
  },
];

function getRecommendedSize(weightLbs) {
  const matches = DIAPER_SIZES.filter((d) => weightLbs >= d.minLbs && weightLbs <= d.maxLbs);
  return matches.length > 0 ? matches : [DIAPER_SIZES[DIAPER_SIZES.length - 1]];
}

export default function DiaperSizeGuide() {
  const [weight, setWeight] = useState("14");
  const [unit, setUnit] = useState("lbs");
  const [showTypes, setShowTypes] = useState(false);
  const [tab, setTab] = useState("size");

  const weightNum = parseFloat(weight) || 0;
  const weightLbs = unit === "kg" ? weightNum * 2.205 : weightNum;
  const recommended = getRecommendedSize(weightLbs);

  return (
    <div className="card">
      {/* Tabs */}
      <div className="flex gap-2 p-1 bg-blue-50 rounded-full mb-6">
        {[
          { id: "size", label: "Size Finder" },
          { id: "chart", label: "Size Chart" },
          { id: "compare", label: "Diaper Types" },
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

      {tab === "size" && (
        <>
          {/* Weight input */}
          <div className="mb-6">
            <label className="text-sm font-semibold text-[#1E293B] mb-2 block">Baby's weight</label>
            <div className="flex gap-2">
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                min="1" max="60" step="0.5"
                className="flex-1 px-4 py-3 border-2 border-blue-200 rounded-xl bg-white focus:border-[#3B82F6] focus:outline-none text-lg"
              />
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="px-3 py-2 border-2 border-blue-200 rounded-xl bg-white focus:border-[#3B82F6] focus:outline-none"
              >
                <option value="lbs">lbs</option>
                <option value="kg">kg</option>
              </select>
            </div>
          </div>

          {/* Recommendation */}
          {weightNum > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-bold text-[#1E293B] uppercase tracking-wide mb-3">Recommended Size</h3>
              {recommended.map((r) => (
                <div key={r.size} className="p-4 bg-blue-50 rounded-xl mb-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl font-bold text-[#1D4ED8]">{r.size}</span>
                    <span className="text-sm text-[#9CA3AF]">{r.minLbs}-{r.maxLbs} lbs</span>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="text-center">
                      <p className="text-xs text-[#9CA3AF] font-semibold uppercase">Per Day</p>
                      <p className="font-mono text-lg text-[#3B82F6]">~{r.perDay}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-[#9CA3AF] font-semibold uppercase">Monthly</p>
                      <p className="font-mono text-lg text-[#3B82F6]">~{r.monthlyCount}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-[#9CA3AF] font-semibold uppercase">Est. Cost</p>
                      <p className="font-mono text-lg text-[#3B82F6]">${r.monthlyCost}/mo</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Signs to size up */}
          <div className="p-4 rounded-xl border-2 border-blue-100">
            <h3 className="text-sm font-bold text-[#1E293B] uppercase tracking-wide mb-3">
              Signs It's Time to Size Up
            </h3>
            <ul className="space-y-2">
              {SIZE_UP_SIGNS.map((sign, i) => (
                <li key={i} className="flex gap-2 text-sm text-[#1E293B]">
                  <span className="text-[#3B82F6] font-bold shrink-0">*</span>
                  {sign}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}

      {tab === "chart" && (
        <div>
          <h3 className="text-sm font-bold text-[#1E293B] uppercase tracking-wide mb-3">Complete Size Chart</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b-2 border-blue-100">
                  <th className="py-2 px-2 text-[#1E293B]">Size</th>
                  <th className="py-2 px-2 text-[#1E293B]">Weight (lbs)</th>
                  <th className="py-2 px-2 text-[#1E293B]">Per Day</th>
                  <th className="py-2 px-2 text-[#1E293B]">Monthly</th>
                  <th className="py-2 px-2 text-[#1E293B]">Est. Cost</th>
                </tr>
              </thead>
              <tbody>
                {DIAPER_SIZES.map((d, i) => {
                  const isMatch = weightNum > 0 && weightLbs >= d.minLbs && weightLbs <= d.maxLbs;
                  return (
                    <tr key={i} className={`border-b border-blue-50 hover:bg-blue-50 ${isMatch ? "bg-blue-50 font-semibold" : ""}`}>
                      <td className="py-2 px-2 text-[#3B82F6]">{d.size}</td>
                      <td className="py-2 px-2 text-[#1E293B]">{d.minLbs}-{d.maxLbs}</td>
                      <td className="py-2 px-2 text-[#1E293B]">~{d.perDay}</td>
                      <td className="py-2 px-2 text-[#1E293B]">~{d.monthlyCount}</td>
                      <td className="py-2 px-2 text-[#1E293B]">${d.monthlyCost}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-[#9CA3AF] italic">
            Costs are approximate averages for mid-range disposable diapers. Actual costs vary by brand and retailer.
          </p>
        </div>
      )}

      {tab === "compare" && (
        <div>
          <h3 className="text-sm font-bold text-[#1E293B] uppercase tracking-wide mb-3">Diaper Type Comparison</h3>
          <div className="space-y-4">
            {DIAPER_TYPES.map((dt) => (
              <div key={dt.type} className="p-4 bg-blue-50 rounded-xl">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-bold text-[#1D4ED8] text-lg">{dt.type}</h4>
                  <span className="text-sm font-mono text-[#3B82F6]">{dt.monthCost}/mo</span>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs font-semibold text-green-600 uppercase mb-1">Pros</p>
                    <ul className="space-y-1">
                      {dt.pros.map((p, i) => (
                        <li key={i} className="text-sm text-[#1E293B] flex gap-1">
                          <span className="text-green-500 shrink-0">+</span> {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-red-500 uppercase mb-1">Cons</p>
                    <ul className="space-y-1">
                      {dt.cons.map((c, i) => (
                        <li key={i} className="text-sm text-[#1E293B] flex gap-1">
                          <span className="text-red-400 shrink-0">-</span> {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <p className="mt-6 text-xs text-[#9CA3AF] italic text-center">
        Diaper sizes vary slightly by brand. When in doubt, buy a small pack to test before stocking up.
      </p>
    </div>
  );
}
