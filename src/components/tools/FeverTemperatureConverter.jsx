import { useState } from "react";

const toC = (f) => ((f - 32) * 5) / 9;
const toF = (c) => (c * 9) / 5 + 32;

export default function FeverTemperatureConverter() {
  const [value, setValue] = useState("100.4");
  const [scale, setScale] = useState("F");
  const [ageGroup, setAgeGroup] = useState("under3m");

  const v = parseFloat(value);
  const valid = !isNaN(v);
  const f = valid ? (scale === "F" ? v : toF(v)) : null;
  const c = valid ? (scale === "C" ? v : toC(v)) : null;

  const isFever = valid && f >= 100.4;

  let level = null;
  if (valid) {
    if (f < 100.4) level = { label: "Not a fever", tone: "green", note: "100.4°F (38°C) is the usual cutoff for a fever." };
    else if (ageGroup === "under3m") level = { label: "Call your pediatrician now", tone: "red", note: "Any temperature of 100.4°F (38°C) or higher in a baby under 3 months needs a same-day call, even if baby seems fine." };
    else if (f >= 104) level = { label: "High fever — call your pediatrician", tone: "red", note: "Also call for any fever with trouble breathing, a stiff neck, a rash, repeated vomiting, unusual sleepiness, or a seizure." };
    else level = { label: "Fever — watch and comfort", tone: "amber", note: "Focus on how your baby looks and acts. Call if the fever lasts more than 24 hours, baby is under 2, or something feels off." };
  }

  const tones = {
    green: "bg-[#DDF0E5] text-[#3E8A66]",
    amber: "bg-[#FBEED5] text-[#A37224]",
    red: "bg-[#FBE0E6] text-[#B05B73]",
  };

  const presets = [
    { f: 98.6, label: "Normal" },
    { f: 100.4, label: "Fever line" },
    { f: 102, label: "102°F" },
    { f: 104, label: "104°F" },
  ];
  const inputCls = "w-full px-3 py-2 border-2 border-blue-200 rounded-xl bg-white focus:border-[#3B82F6] focus:outline-none text-lg";

  return (
    <div className="card">
      <div className="grid gap-4 sm:grid-cols-3 mb-4">
        <div className="sm:col-span-2">
          <label className="text-sm font-semibold text-[#1E293B] mb-2 block">Temperature reading</label>
          <div className="flex gap-2">
            <input type="number" step="0.1" value={value} onChange={(e) => setValue(e.target.value)} className={inputCls} />
            <div className="flex rounded-xl overflow-hidden border-2 border-blue-200">
              {["F", "C"].map((s) => (
                <button key={s} type="button" onClick={() => setScale(s)}
                  className={`px-4 font-bold ${scale === s ? "bg-[#3B82F6] text-white" : "bg-white text-[#9CA3AF]"}`}>°{s}</button>
              ))}
            </div>
          </div>
        </div>
        <div>
          <label className="text-sm font-semibold text-[#1E293B] mb-2 block">Baby's age</label>
          <select value={ageGroup} onChange={(e) => setAgeGroup(e.target.value)} className={inputCls}>
            <option value="under3m">Under 3 months</option>
            <option value="3to24m">3 months – 2 years</option>
            <option value="over2y">Over 2 years</option>
          </select>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-5">
        {presets.map((p) => (
          <button key={p.f} type="button" onClick={() => { setScale("F"); setValue(String(p.f)); }}
            className="px-3 py-1.5 text-xs font-semibold rounded-full bg-blue-50 text-[#2E6FB8] hover:bg-blue-100">
            {p.label}
          </button>
        ))}
      </div>

      {valid ? (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className={`rounded-2xl p-5 text-center ${scale === "F" ? "bg-[#E6F0FB]" : "bg-blue-50"}`}>
              <div className="text-xs text-[#5A6F89] mb-1">Fahrenheit</div>
              <div className="text-3xl font-bold text-[#1E3A5F]">{f.toFixed(1)}°F</div>
            </div>
            <div className={`rounded-2xl p-5 text-center ${scale === "C" ? "bg-[#E6F0FB]" : "bg-blue-50"}`}>
              <div className="text-xs text-[#5A6F89] mb-1">Celsius</div>
              <div className="text-3xl font-bold text-[#1E3A5F]">{c.toFixed(1)}°C</div>
            </div>
          </div>
          <div className={`rounded-2xl p-5 ${tones[level.tone]}`}>
            <div className="text-lg font-bold">{isFever ? "🌡️ " : "✅ "}{level.label}</div>
            <p className="text-sm mt-1 leading-relaxed">{level.note}</p>
          </div>
        </div>
      ) : (
        <p className="text-sm text-[#9CA3AF]">Enter a temperature to convert it.</p>
      )}

      <p className="text-xs text-[#9CA3AF] mt-4 italic">
        Informational only, not medical advice. A rectal reading is the most accurate for babies. When in doubt, call your pediatrician.
      </p>
    </div>
  );
}
