import { useState } from "react";

const AGE_DATA = [
  { label: "Newborn (0-2 weeks)", minAge: 0, maxAge: 0.5, ozPerFeed: "1-2", feedsPerDay: "8-12", interval: "2-3 hrs", notes: "Feed on demand; colostrum in first days" },
  { label: "2-4 weeks", minAge: 0.5, maxAge: 1, ozPerFeed: "2-3", feedsPerDay: "8-10", interval: "2-3 hrs", notes: "Stomach still very small" },
  { label: "1-2 months", minAge: 1, maxAge: 2, ozPerFeed: "3-4", feedsPerDay: "7-8", interval: "2.5-3.5 hrs", notes: "Starting to take more per feed" },
  { label: "2-4 months", minAge: 2, maxAge: 4, ozPerFeed: "4-5", feedsPerDay: "6-7", interval: "3-4 hrs", notes: "More efficient feeding" },
  { label: "4-6 months", minAge: 4, maxAge: 6, ozPerFeed: "5-6", feedsPerDay: "5-6", interval: "3-4 hrs", notes: "May start solids around 6 months" },
  { label: "6-9 months", minAge: 6, maxAge: 9, ozPerFeed: "6-7", feedsPerDay: "4-5", interval: "4-5 hrs", notes: "Solids supplement but milk is primary nutrition" },
  { label: "9-12 months", minAge: 9, maxAge: 12, ozPerFeed: "7-8", feedsPerDay: "3-4", interval: "4-6 hrs", notes: "Increasing solids, milk still important" },
];

export default function BottleCalculator() {
  const [ageMonths, setAgeMonths] = useState(3);
  const [weight, setWeight] = useState("12");
  const [unit, setUnit] = useState("lbs");
  const [feedType, setFeedType] = useState("formula");
  const [showTable, setShowTable] = useState(false);

  const weightNum = parseFloat(weight) || 0;
  const weightLbs = unit === "kg" ? weightNum * 2.205 : weightNum;

  // Standard: 2.5 oz per pound per day
  const totalDailyOz = Math.round(weightLbs * 2.5 * 10) / 10;
  const totalDailyMl = Math.round(totalDailyOz * 29.5735);

  // Feeds per day by age
  let feedsPerDay;
  if (ageMonths < 1) feedsPerDay = 10;
  else if (ageMonths < 2) feedsPerDay = 8;
  else if (ageMonths < 4) feedsPerDay = 7;
  else if (ageMonths < 6) feedsPerDay = 6;
  else if (ageMonths < 9) feedsPerDay = 5;
  else feedsPerDay = 4;

  const ozPerBottle = Math.round((totalDailyOz / feedsPerDay) * 10) / 10;
  const mlPerBottle = Math.round(ozPerBottle * 29.5735);
  const intervalHrs = Math.round((24 / feedsPerDay) * 10) / 10;

  // Cap at 32 oz per day (common max)
  const cappedDailyOz = Math.min(totalDailyOz, 32);

  return (
    <div className="card">
      {/* Feed type toggle */}
      <div className="flex gap-2 p-1 bg-blue-50 rounded-full mb-6">
        {["formula", "breastmilk"].map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setFeedType(t)}
            className={`flex-1 px-4 py-2 text-sm font-semibold rounded-full transition capitalize ${
              feedType === t ? "bg-[#3B82F6] text-white" : "text-[#9CA3AF]"
            }`}
          >
            {t === "formula" ? "Formula" : "Breast Milk"}
          </button>
        ))}
      </div>

      {/* Inputs */}
      <div className="grid gap-4 sm:grid-cols-2 mb-6">
        <div>
          <label className="text-sm font-semibold text-[#1E293B] mb-2 block">Baby's age (months)</label>
          <input
            type="range" min="0" max="12" value={ageMonths}
            onChange={(e) => setAgeMonths(parseInt(e.target.value))}
            className="w-full accent-[#3B82F6]"
          />
          <p className="text-center text-sm font-medium text-[#3B82F6] mt-1">{ageMonths} months old</p>
        </div>
        <div>
          <label className="text-sm font-semibold text-[#1E293B] mb-2 block">Baby's weight</label>
          <div className="flex gap-2">
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              min="1" max="40" step="0.5"
              className="flex-1 px-3 py-2 border-2 border-blue-200 rounded-xl bg-white focus:border-[#3B82F6] focus:outline-none"
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
      </div>

      {/* Results */}
      {weightNum > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <div className="bg-blue-50 rounded-xl p-4 text-center">
            <p className="text-xs text-[#9CA3AF] font-semibold uppercase mb-1">Daily Intake</p>
            <p className="font-mono text-xl text-[#1D4ED8] font-bold">{cappedDailyOz} oz</p>
            <p className="text-xs text-[#9CA3AF]">{Math.round(cappedDailyOz * 29.57)} ml</p>
          </div>
          <div className="bg-blue-50 rounded-xl p-4 text-center">
            <p className="text-xs text-[#9CA3AF] font-semibold uppercase mb-1">Per Bottle</p>
            <p className="font-mono text-xl text-[#3B82F6]">{ozPerBottle} oz</p>
            <p className="text-xs text-[#9CA3AF]">{mlPerBottle} ml</p>
          </div>
          <div className="bg-blue-50 rounded-xl p-4 text-center">
            <p className="text-xs text-[#9CA3AF] font-semibold uppercase mb-1">Feeds/Day</p>
            <p className="font-mono text-xl text-[#3B82F6]">{feedsPerDay}</p>
          </div>
          <div className="bg-blue-50 rounded-xl p-4 text-center">
            <p className="text-xs text-[#9CA3AF] font-semibold uppercase mb-1">Every</p>
            <p className="font-mono text-xl text-[#3B82F6]">{intervalHrs} hrs</p>
          </div>
        </div>
      )}

      {/* Notes */}
      {feedType === "breastmilk" && (
        <div className="p-3 bg-blue-50 rounded-xl mb-6 text-sm text-[#1E293B]">
          <p className="font-semibold text-[#1D4ED8] mb-1">Breast Milk Note:</p>
          <p>
            Breast milk intake stays relatively constant at about 25 oz (750 ml) per day between months 1-6,
            regardless of baby's weight. The formula (2.5 oz/lb) is more accurate for formula-fed babies.
            Breastfed babies self-regulate intake efficiently.
          </p>
        </div>
      )}

      {totalDailyOz > 32 && (
        <div className="p-3 bg-yellow-50 border-2 border-yellow-200 rounded-xl mb-6 text-sm text-[#1E293B]">
          <p className="font-semibold mb-1">Note:</p>
          <p>
            Most babies should not exceed 32 oz (960 ml) of formula per day. The calculated amount
            ({totalDailyOz} oz) has been capped. Consult your pediatrician for personalized guidance.
          </p>
        </div>
      )}

      {/* Reference table */}
      <button
        type="button"
        onClick={() => setShowTable(!showTable)}
        className="text-sm font-bold text-[#3B82F6] hover:text-[#1D4ED8] transition mb-3"
      >
        {showTable ? "Hide" : "Show"} feeding guide by age
      </button>
      {showTable && (
        <div className="overflow-x-auto mt-2">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b-2 border-blue-100">
                <th className="py-2 px-2 text-[#1E293B]">Age</th>
                <th className="py-2 px-2 text-[#1E293B]">Per Feed</th>
                <th className="py-2 px-2 text-[#1E293B]">Feeds/Day</th>
                <th className="py-2 px-2 text-[#1E293B]">Interval</th>
                <th className="py-2 px-2 text-[#1E293B] hidden sm:table-cell">Notes</th>
              </tr>
            </thead>
            <tbody>
              {AGE_DATA.map((row, i) => (
                <tr key={i} className={`border-b border-blue-50 hover:bg-blue-50 ${ageMonths >= row.minAge && ageMonths < row.maxAge ? "bg-blue-50 font-semibold" : ""}`}>
                  <td className="py-2 px-2 text-[#3B82F6]">{row.label}</td>
                  <td className="py-2 px-2 text-[#1E293B]">{row.ozPerFeed} oz</td>
                  <td className="py-2 px-2 text-[#1E293B]">{row.feedsPerDay}</td>
                  <td className="py-2 px-2 text-[#1E293B]">{row.interval}</td>
                  <td className="py-2 px-2 text-[#9CA3AF] text-xs hidden sm:table-cell">{row.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <p className="mt-6 text-xs text-[#9CA3AF] italic text-center">
        Based on standard pediatric guidelines (2.5 oz per pound per day for formula).
        Always follow your pediatrician's personalized recommendations for your baby.
      </p>
    </div>
  );
}
