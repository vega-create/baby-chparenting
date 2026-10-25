import { useState } from "react";

const fmt = (n, d = 2) => "$" + n.toLocaleString(undefined, { minimumFractionDigits: d, maximumFractionDigits: d });

export default function FormulaCostCalculator() {
  const [weight, setWeight] = useState("12");
  const [unit, setUnit] = useState("lbs");
  const [ozPerDay, setOzPerDay] = useState("");
  const [canPrice, setCanPrice] = useState("34.99");
  const [canOz, setCanOz] = useState("20.4");
  const [canPrice2, setCanPrice2] = useState("");
  const [canOz2, setCanOz2] = useState("");
  const [diaperPrice, setDiaperPrice] = useState("0.28");
  const [diapersPerDay, setDiapersPerDay] = useState("8");

  const weightLbs = unit === "kg" ? (parseFloat(weight) || 0) * 2.205 : parseFloat(weight) || 0;
  // AAP rule of thumb: about 2.5 oz of formula per pound per day, capped at 32 oz
  const suggestedOz = Math.min(32, Math.round(weightLbs * 2.5 * 10) / 10);
  const dailyOz = ozPerDay !== "" ? parseFloat(ozPerDay) || 0 : suggestedOz;

  // Most powdered formula: 1 scoop (~8.7 g) per 2 fl oz; cans list how many fl oz they make.
  // We ask for the can's "makes" ounces so the math works for any brand.
  const pricePerOz = (p, o) => (parseFloat(p) > 0 && parseFloat(o) > 0 ? parseFloat(p) / parseFloat(o) : null);
  const ppo1 = pricePerOz(canPrice, canOz);
  const ppo2 = pricePerOz(canPrice2, canOz2);
  const best = ppo1 !== null && ppo2 !== null ? (ppo1 <= ppo2 ? 1 : 2) : null;
  const usePpo = ppo1 ?? ppo2 ?? 0;

  const formulaDay = dailyOz * usePpo;
  const formulaMonth = formulaDay * 30.4;
  const cansPerMonth = parseFloat(canOz) > 0 ? (dailyOz * 30.4) / parseFloat(canOz) : 0;

  const dPrice = parseFloat(diaperPrice) || 0;
  const dCount = parseFloat(diapersPerDay) || 0;
  const diaperMonth = dPrice * dCount * 30.4;

  const total = formulaMonth + diaperMonth;
  const inputCls = "w-full px-3 py-2 border-2 border-blue-200 rounded-xl bg-white focus:border-[#3B82F6] focus:outline-none";

  return (
    <div className="card space-y-6">
      <section>
        <h3 className="text-base font-bold text-[#1E3A5F] mb-3">1. How much formula per day?</h3>
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label className="text-sm font-semibold text-[#1E293B] mb-2 block">Baby's weight</label>
            <div className="flex gap-2">
              <input type="number" min="1" max="40" step="0.5" value={weight} onChange={(e) => setWeight(e.target.value)} className={inputCls} />
              <select value={unit} onChange={(e) => setUnit(e.target.value)} className="px-2 border-2 border-blue-200 rounded-xl bg-white">
                <option value="lbs">lbs</option>
                <option value="kg">kg</option>
              </select>
            </div>
          </div>
          <div>
            <label className="text-sm font-semibold text-[#1E293B] mb-2 block">Suggested (2.5 oz/lb)</label>
            <div className="px-3 py-2 rounded-xl bg-[#E6F0FB] text-[#2E6FB8] font-bold">{suggestedOz} fl oz / day</div>
          </div>
          <div>
            <label className="text-sm font-semibold text-[#1E293B] mb-2 block">Or enter your own</label>
            <input type="number" min="0" max="40" step="1" placeholder={suggestedOz} value={ozPerDay} onChange={(e) => setOzPerDay(e.target.value)} className={inputCls} />
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-base font-bold text-[#1E3A5F] mb-1">2. Formula price</h3>
        <p className="text-xs text-[#9CA3AF] mb-3">Use the "makes approx. X fl oz" number printed on the can, not the powder weight.</p>
        <div className="grid gap-4 sm:grid-cols-2">
          {[1, 2].map((i) => {
            const price = i === 1 ? canPrice : canPrice2;
            const oz = i === 1 ? canOz : canOz2;
            const setP = i === 1 ? setCanPrice : setCanPrice2;
            const setO = i === 1 ? setCanOz : setCanOz2;
            const ppo = i === 1 ? ppo1 : ppo2;
            return (
              <div key={i} className={`p-4 rounded-xl border-2 ${best === i ? "border-[#7BC0A0] bg-[#DDF0E5]" : "border-blue-100 bg-blue-50"}`}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-[#1E293B]">{i === 1 ? "Formula A" : "Formula B (optional)"}</span>
                  {best === i && <span className="text-xs font-bold text-[#3E8A66]">Cheaper per oz</span>}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs text-[#5A6F89] block mb-1">Can price ($)</label>
                    <input type="number" min="0" step="0.01" value={price} onChange={(e) => setP(e.target.value)} className={inputCls} />
                  </div>
                  <div>
                    <label className="text-xs text-[#5A6F89] block mb-1">Makes (fl oz)</label>
                    <input type="number" min="0" step="1" value={oz} onChange={(e) => setO(e.target.value)} className={inputCls} />
                  </div>
                </div>
                {ppo !== null && <div className="text-sm mt-2 text-[#1E3A5F]">{fmt(ppo, 3)} per fl oz</div>}
              </div>
            );
          })}
        </div>
      </section>

      <section>
        <h3 className="text-base font-bold text-[#1E3A5F] mb-3">3. Diapers</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-sm font-semibold text-[#1E293B] mb-2 block">Price per diaper ($)</label>
            <input type="number" min="0" step="0.01" value={diaperPrice} onChange={(e) => setDiaperPrice(e.target.value)} className={inputCls} />
          </div>
          <div>
            <label className="text-sm font-semibold text-[#1E293B] mb-2 block">Diapers per day</label>
            <input type="number" min="0" max="20" step="1" value={diapersPerDay} onChange={(e) => setDiapersPerDay(e.target.value)} className={inputCls} />
          </div>
        </div>
      </section>

      <div className="rounded-2xl bg-[#E6F0FB] p-5 text-center">
        <div className="text-xs font-semibold uppercase tracking-wide text-[#2E6FB8] mb-1">Estimated monthly cost</div>
        <div className="text-4xl font-bold text-[#1E3A5F]">{fmt(total, 0)}</div>
        <div className="grid grid-cols-2 gap-3 mt-4 text-sm">
          <div className="rounded-xl bg-white p-3">
            <div className="font-bold text-[#1E3A5F]">{fmt(formulaMonth, 0)}</div>
            <div className="text-[#5A6F89]">Formula · {fmt(formulaDay)} / day{cansPerMonth > 0 && ` · ~${cansPerMonth.toFixed(1)} cans`}</div>
          </div>
          <div className="rounded-xl bg-white p-3">
            <div className="font-bold text-[#1E3A5F]">{fmt(diaperMonth, 0)}</div>
            <div className="text-[#5A6F89]">Diapers · {Math.round(dCount * 30.4)} / month</div>
          </div>
        </div>
        <div className="text-sm text-[#5A6F89] mt-3">About {fmt(total * 12, 0)} per year at today's usage</div>
      </div>
      <p className="text-xs text-[#9CA3AF] italic">Estimates only. Your baby's intake will change month to month — ask your pediatrician how much to feed.</p>
    </div>
  );
}
