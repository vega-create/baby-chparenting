import { useState } from "react";

const SEAT_TYPES = [
  {
    type: "Rear-Facing Infant",
    ageRange: "Birth - 12+ months",
    weightRange: "4-35 lbs",
    heightRange: "Up to 32 in",
    priceRange: "$80-$300",
    pros: [
      "Portable with handle for carrying",
      "Clicks in and out of base",
      "Compatible with many strollers (travel system)",
      "Easy to install with LATCH or seat belt",
    ],
    cons: [
      "Baby outgrows it quickly (around 1 year)",
      "Heavy to carry as baby grows",
      "Need to buy another seat after this one",
    ],
  },
  {
    type: "Convertible",
    ageRange: "Birth - 7+ years",
    weightRange: "5-65 lbs (rear), up to 65 lbs (forward)",
    heightRange: "Varies by model",
    priceRange: "$100-$400",
    pros: [
      "Lasts many years (rear to forward facing)",
      "Higher rear-facing weight limits",
      "Cost-effective long-term",
      "Many can rear-face up to 40-50 lbs",
    ],
    cons: [
      "Not portable -- stays installed in car",
      "No stroller compatibility",
      "Bulkier than infant seats",
    ],
  },
  {
    type: "All-in-One",
    ageRange: "Birth - 10+ years",
    weightRange: "5-120 lbs",
    heightRange: "Up to 57 in",
    priceRange: "$200-$500",
    pros: [
      "Only seat you will ever need",
      "Rear-facing, forward-facing, and booster in one",
      "Best long-term value",
      "Many last until child no longer needs a car seat",
    ],
    cons: [
      "Largest and heaviest option",
      "Most expensive upfront",
      "Rear-facing position may be bulky for small cars",
      "Not portable",
    ],
  },
];

const SAFETY_CHECKLIST = [
  "Use the 5-point harness and ensure straps lie flat without twists",
  "Check that the LATCH system or seat belt is installed tightly (less than 1 inch of movement)",
  "Know your car seat's expiration date (usually 6-10 years from manufacture)",
  "Never use a car seat that has been in a moderate or severe crash",
  "Register your car seat with the manufacturer for recall notifications",
];

const INSTALLATION_TIPS = [
  "Read both the car seat manual AND your vehicle manual",
  "Use either LATCH or seat belt -- not both (unless the manual says otherwise)",
  "The seat should not move more than 1 inch side to side at the belt path",
  "The harness chest clip should be at armpit level",
  "For rear-facing: recline angle should keep baby's head from falling forward",
  "Visit a car seat inspection station for a free professional check",
];

function getRecommendation(ageMonths, weightLbs, heightIn) {
  if (ageMonths < 12 || weightLbs < 22) {
    return {
      primary: "Rear-Facing Infant",
      note: "Your baby should be in a rear-facing car seat. AAP recommends rear-facing as long as possible, at least until age 2.",
    };
  }
  if (ageMonths < 24 || weightLbs < 30) {
    return {
      primary: "Convertible (Rear-Facing)",
      note: "Keep your baby rear-facing! AAP recommends rear-facing at least until age 2, or until they reach the maximum weight/height limit of their rear-facing seat.",
    };
  }
  if (ageMonths < 48) {
    return {
      primary: "Convertible (Forward-Facing with Harness)",
      note: "Your child can face forward with a 5-point harness. Continue using the harness until they reach the seat's maximum weight/height limit.",
    };
  }
  return {
    primary: "All-in-One or Booster",
    note: "Your child may be ready for a booster seat depending on their weight and height. Check your convertible seat's limits.",
  };
}

export default function CarSeatFinder() {
  const [ageMonths, setAgeMonths] = useState(6);
  const [weight, setWeight] = useState("16");
  const [height, setHeight] = useState("26");
  const [tab, setTab] = useState("finder");

  const weightNum = parseFloat(weight) || 0;
  const heightNum = parseFloat(height) || 0;
  const rec = getRecommendation(ageMonths, weightNum, heightNum);

  return (
    <div className="card">
      {/* Tabs */}
      <div className="flex gap-2 p-1 bg-blue-50 rounded-full mb-6">
        {[
          { id: "finder", label: "Seat Finder" },
          { id: "compare", label: "Compare" },
          { id: "safety", label: "Safety" },
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

      {tab === "finder" && (
        <>
          {/* Inputs */}
          <div className="grid gap-4 sm:grid-cols-3 mb-6">
            <div>
              <label className="text-sm font-semibold text-[#1E293B] mb-2 block">Age (months)</label>
              <input
                type="number" value={ageMonths} min="0" max="120"
                onChange={(e) => setAgeMonths(parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 border-2 border-blue-200 rounded-xl bg-white focus:border-[#3B82F6] focus:outline-none"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-[#1E293B] mb-2 block">Weight (lbs)</label>
              <input
                type="number" value={weight} min="1" max="120" step="0.5"
                onChange={(e) => setWeight(e.target.value)}
                className="w-full px-3 py-2 border-2 border-blue-200 rounded-xl bg-white focus:border-[#3B82F6] focus:outline-none"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-[#1E293B] mb-2 block">Height (inches)</label>
              <input
                type="number" value={height} min="10" max="60" step="0.5"
                onChange={(e) => setHeight(e.target.value)}
                className="w-full px-3 py-2 border-2 border-blue-200 rounded-xl bg-white focus:border-[#3B82F6] focus:outline-none"
              />
            </div>
          </div>

          {/* Recommendation */}
          <div className="p-6 bg-blue-50 rounded-xl mb-6 text-center">
            <p className="text-xs text-[#9CA3AF] font-semibold uppercase mb-2">Recommended Seat Type</p>
            <h3 className="text-2xl font-bold text-[#1D4ED8] mb-2">{rec.primary}</h3>
            <p className="text-sm text-[#1E293B] leading-relaxed max-w-lg mx-auto">{rec.note}</p>
          </div>

          {/* AAP highlight */}
          <div className="p-4 bg-[#D1FAE5] rounded-xl mb-6">
            <p className="font-semibold text-[#1D4ED8] text-sm mb-1">AAP Key Recommendation:</p>
            <p className="text-sm text-[#1E293B]">
              Keep children rear-facing as long as possible -- at least until age 2, or until they
              reach the maximum weight or height allowed by their car seat. Rear-facing is the safest
              position for young children in a crash.
            </p>
          </div>

          {/* Transition guide */}
          <div className="p-4 rounded-xl border-2 border-blue-100">
            <h3 className="text-sm font-bold text-[#1E293B] uppercase tracking-wide mb-3">When to Transition</h3>
            <div className="space-y-3 text-sm text-[#1E293B]">
              <div className="flex gap-2">
                <span className="text-[#3B82F6] font-bold shrink-0">1.</span>
                <span><strong>Infant to Convertible:</strong> When baby exceeds the infant seat's weight or height limit (usually 30-35 lbs or 32 inches)</span>
              </div>
              <div className="flex gap-2">
                <span className="text-[#3B82F6] font-bold shrink-0">2.</span>
                <span><strong>Rear to Forward-Facing:</strong> After age 2 AND when exceeding rear-facing limits. Keep rear-facing as long as possible.</span>
              </div>
              <div className="flex gap-2">
                <span className="text-[#3B82F6] font-bold shrink-0">3.</span>
                <span><strong>Harness to Booster:</strong> When child exceeds the harness weight/height limit (usually 40-65 lbs). Must be at least 4 years old.</span>
              </div>
              <div className="flex gap-2">
                <span className="text-[#3B82F6] font-bold shrink-0">4.</span>
                <span><strong>Booster to Seat Belt:</strong> When the seat belt fits properly without a booster (usually around 4'9" tall, ages 8-12)</span>
              </div>
            </div>
          </div>
        </>
      )}

      {tab === "compare" && (
        <div className="space-y-4">
          {SEAT_TYPES.map((st) => (
            <div key={st.type} className="p-4 bg-blue-50 rounded-xl">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-bold text-[#1D4ED8] text-lg">{st.type}</h4>
                <span className="text-sm font-mono text-[#3B82F6]">{st.priceRange}</span>
              </div>
              <div className="grid grid-cols-3 gap-2 mb-3 text-xs text-[#9CA3AF]">
                <div><strong>Age:</strong> {st.ageRange}</div>
                <div><strong>Weight:</strong> {st.weightRange}</div>
                <div><strong>Height:</strong> {st.heightRange}</div>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <p className="text-xs font-semibold text-green-600 uppercase mb-1">Pros</p>
                  <ul className="space-y-1">
                    {st.pros.map((p, i) => (
                      <li key={i} className="text-sm text-[#1E293B] flex gap-1">
                        <span className="text-green-500 shrink-0">+</span> {p}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-semibold text-red-500 uppercase mb-1">Cons</p>
                  <ul className="space-y-1">
                    {st.cons.map((c, i) => (
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
      )}

      {tab === "safety" && (
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-bold text-[#1E293B] uppercase tracking-wide mb-3">Safety Checklist</h3>
            <ul className="space-y-2">
              {SAFETY_CHECKLIST.map((item, i) => (
                <li key={i} className="flex gap-2 text-sm text-[#1E293B]">
                  <span className="text-[#3B82F6] font-bold shrink-0">*</span> {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#1E293B] uppercase tracking-wide mb-3">Installation Tips</h3>
            <ul className="space-y-2">
              {INSTALLATION_TIPS.map((tip, i) => (
                <li key={i} className="flex gap-2 text-sm text-[#1E293B]">
                  <span className="text-[#3B82F6] font-bold shrink-0">*</span> {tip}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <p className="mt-6 text-xs text-[#9CA3AF] italic text-center">
        Car seat guidelines are based on AAP recommendations and NHTSA standards.
        Always follow the specific instructions for your car seat model.
      </p>
    </div>
  );
}
