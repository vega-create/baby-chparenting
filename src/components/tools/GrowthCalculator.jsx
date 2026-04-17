import { useState, useEffect } from "react";

const STORAGE_KEY = "baby-growth-history";

// WHO growth standards (simplified median + SD data for 0-24 months)
// Source: WHO Child Growth Standards, 2006
const WHO_DATA = {
  weight: {
    boy: [
      { month: 0, median: 3.3, sd: 0.45 }, { month: 1, median: 4.5, sd: 0.55 },
      { month: 2, median: 5.6, sd: 0.63 }, { month: 3, median: 6.4, sd: 0.69 },
      { month: 4, median: 7.0, sd: 0.73 }, { month: 5, median: 7.5, sd: 0.77 },
      { month: 6, median: 7.9, sd: 0.80 }, { month: 7, median: 8.3, sd: 0.83 },
      { month: 8, median: 8.6, sd: 0.86 }, { month: 9, median: 8.9, sd: 0.89 },
      { month: 10, median: 9.2, sd: 0.91 }, { month: 11, median: 9.4, sd: 0.93 },
      { month: 12, median: 9.6, sd: 0.95 }, { month: 15, median: 10.3, sd: 1.02 },
      { month: 18, median: 10.9, sd: 1.09 }, { month: 21, median: 11.5, sd: 1.16 },
      { month: 24, median: 12.2, sd: 1.23 },
    ],
    girl: [
      { month: 0, median: 3.2, sd: 0.42 }, { month: 1, median: 4.2, sd: 0.51 },
      { month: 2, median: 5.1, sd: 0.58 }, { month: 3, median: 5.8, sd: 0.64 },
      { month: 4, median: 6.4, sd: 0.69 }, { month: 5, median: 6.9, sd: 0.73 },
      { month: 6, median: 7.3, sd: 0.76 }, { month: 7, median: 7.6, sd: 0.79 },
      { month: 8, median: 7.9, sd: 0.82 }, { month: 9, median: 8.2, sd: 0.85 },
      { month: 10, median: 8.5, sd: 0.87 }, { month: 11, median: 8.7, sd: 0.89 },
      { month: 12, median: 8.9, sd: 0.91 }, { month: 15, median: 9.6, sd: 0.98 },
      { month: 18, median: 10.2, sd: 1.05 }, { month: 21, median: 10.9, sd: 1.12 },
      { month: 24, median: 11.5, sd: 1.19 },
    ],
  },
  length: {
    boy: [
      { month: 0, median: 49.9, sd: 1.89 }, { month: 1, median: 54.7, sd: 1.95 },
      { month: 2, median: 58.4, sd: 2.00 }, { month: 3, median: 61.4, sd: 2.05 },
      { month: 4, median: 63.9, sd: 2.09 }, { month: 5, median: 65.9, sd: 2.12 },
      { month: 6, median: 67.6, sd: 2.15 }, { month: 7, median: 69.2, sd: 2.18 },
      { month: 8, median: 70.6, sd: 2.20 }, { month: 9, median: 72.0, sd: 2.23 },
      { month: 10, median: 73.3, sd: 2.25 }, { month: 11, median: 74.5, sd: 2.28 },
      { month: 12, median: 75.7, sd: 2.30 }, { month: 15, median: 79.1, sd: 2.40 },
      { month: 18, median: 82.3, sd: 2.50 }, { month: 21, median: 85.1, sd: 2.60 },
      { month: 24, median: 87.8, sd: 2.70 },
    ],
    girl: [
      { month: 0, median: 49.1, sd: 1.86 }, { month: 1, median: 53.7, sd: 1.92 },
      { month: 2, median: 57.1, sd: 1.97 }, { month: 3, median: 59.8, sd: 2.02 },
      { month: 4, median: 62.1, sd: 2.06 }, { month: 5, median: 64.0, sd: 2.09 },
      { month: 6, median: 65.7, sd: 2.12 }, { month: 7, median: 67.3, sd: 2.15 },
      { month: 8, median: 68.7, sd: 2.18 }, { month: 9, median: 70.1, sd: 2.20 },
      { month: 10, median: 71.5, sd: 2.23 }, { month: 11, median: 72.8, sd: 2.25 },
      { month: 12, median: 74.0, sd: 2.28 }, { month: 15, median: 77.5, sd: 2.38 },
      { month: 18, median: 80.7, sd: 2.48 }, { month: 21, median: 83.7, sd: 2.58 },
      { month: 24, median: 86.4, sd: 2.68 },
    ],
  },
  head: {
    boy: [
      { month: 0, median: 34.5, sd: 1.20 }, { month: 1, median: 37.3, sd: 1.15 },
      { month: 2, median: 39.1, sd: 1.12 }, { month: 3, median: 40.5, sd: 1.10 },
      { month: 4, median: 41.6, sd: 1.08 }, { month: 5, median: 42.6, sd: 1.07 },
      { month: 6, median: 43.3, sd: 1.06 }, { month: 7, median: 44.0, sd: 1.06 },
      { month: 8, median: 44.5, sd: 1.05 }, { month: 9, median: 45.0, sd: 1.05 },
      { month: 10, median: 45.4, sd: 1.05 }, { month: 11, median: 45.8, sd: 1.05 },
      { month: 12, median: 46.1, sd: 1.05 }, { month: 15, median: 47.0, sd: 1.05 },
      { month: 18, median: 47.8, sd: 1.06 }, { month: 21, median: 48.5, sd: 1.07 },
      { month: 24, median: 49.0, sd: 1.08 },
    ],
    girl: [
      { month: 0, median: 33.9, sd: 1.15 }, { month: 1, median: 36.5, sd: 1.10 },
      { month: 2, median: 38.3, sd: 1.08 }, { month: 3, median: 39.5, sd: 1.06 },
      { month: 4, median: 40.6, sd: 1.05 }, { month: 5, median: 41.5, sd: 1.04 },
      { month: 6, median: 42.2, sd: 1.04 }, { month: 7, median: 42.8, sd: 1.03 },
      { month: 8, median: 43.4, sd: 1.03 }, { month: 9, median: 43.8, sd: 1.03 },
      { month: 10, median: 44.2, sd: 1.03 }, { month: 11, median: 44.6, sd: 1.03 },
      { month: 12, median: 44.9, sd: 1.04 }, { month: 15, median: 45.8, sd: 1.04 },
      { month: 18, median: 46.7, sd: 1.05 }, { month: 21, median: 47.4, sd: 1.06 },
      { month: 24, median: 48.0, sd: 1.07 },
    ],
  },
};

function getClosestData(data, month) {
  let closest = data[0];
  for (const d of data) {
    if (Math.abs(d.month - month) < Math.abs(closest.month - month)) closest = d;
  }
  return closest;
}

function calcPercentile(value, median, sd) {
  const z = (value - median) / sd;
  const percentile = 100 / (1 + Math.exp(-1.7 * z));
  return Math.max(0.1, Math.min(99.9, percentile));
}

function getStatus(p) {
  if (p < 3) return { label: "Below normal range", color: "#EF4444", emoji: "!", note: "Discuss with your pediatrician." };
  if (p < 15) return { label: "Lower end of normal", color: "#F59E0B", emoji: "~", note: "Likely normal -- monitor growth trend." };
  if (p <= 85) return { label: "Normal range", color: "#059669", emoji: "+", note: "Growing well!" };
  if (p <= 97) return { label: "Upper end of normal", color: "#F59E0B", emoji: "~", note: "Likely normal -- monitor growth trend." };
  return { label: "Above normal range", color: "#EF4444", emoji: "!", note: "Discuss with your pediatrician." };
}

function loadHistory() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"); } catch { return []; }
}

function saveHistory(data) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch {}
}

export default function GrowthCalculator() {
  const [sex, setSex] = useState("boy");
  const [ageMonths, setAgeMonths] = useState("");
  const [weight, setWeight] = useState("");
  const [length, setLength] = useState("");
  const [headCirc, setHeadCirc] = useState("");
  const [unit, setUnit] = useState("metric");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [history, setHistory] = useState([]);
  const [tab, setTab] = useState("calculator");

  useEffect(() => { setHistory(loadHistory()); }, []);

  const handleCalc = () => {
    setError("");
    const age = parseFloat(ageMonths);
    if (isNaN(age) || age < 0 || age > 24) { setError("Enter baby's age (0-24 months)."); return; }

    const results = [];
    const w = parseFloat(weight);
    if (!isNaN(w) && w > 0) {
      const wKg = unit === "imperial" ? w * 0.453592 : w;
      const data = getClosestData(WHO_DATA.weight[sex], age);
      const p = calcPercentile(wKg, data.median, data.sd);
      results.push({ type: "Weight", value: `${unit === "imperial" ? w.toFixed(1) + " lbs" : wKg.toFixed(1) + " kg"}`, percentile: p, status: getStatus(p), median: `${data.median} kg` });
    }

    const l = parseFloat(length);
    if (!isNaN(l) && l > 0) {
      const lCm = unit === "imperial" ? l * 2.54 : l;
      const data = getClosestData(WHO_DATA.length[sex], age);
      const p = calcPercentile(lCm, data.median, data.sd);
      results.push({ type: "Length/Height", value: `${unit === "imperial" ? l.toFixed(1) + " in" : lCm.toFixed(1) + " cm"}`, percentile: p, status: getStatus(p), median: `${data.median} cm` });
    }

    const h = parseFloat(headCirc);
    if (!isNaN(h) && h > 0) {
      const hCm = unit === "imperial" ? h * 2.54 : h;
      const data = getClosestData(WHO_DATA.head[sex], age);
      const p = calcPercentile(hCm, data.median, data.sd);
      results.push({ type: "Head Circumference", value: `${unit === "imperial" ? h.toFixed(1) + " in" : hCm.toFixed(1) + " cm"}`, percentile: p, status: getStatus(p), median: `${data.median} cm` });
    }

    if (results.length === 0) { setError("Enter at least one measurement (weight, length, or head)."); return; }
    setResult({ age, sex, measurements: results });
  };

  const saveToHistory = () => {
    if (!result) return;
    const entry = {
      date: new Date().toISOString().split("T")[0],
      age: result.age,
      sex: result.sex,
      measurements: result.measurements.map((m) => ({
        type: m.type,
        value: m.value,
        percentile: m.percentile,
      })),
    };
    const updated = [entry, ...history].slice(0, 50);
    setHistory(updated);
    saveHistory(updated);
  };

  const clearHistory = () => {
    setHistory([]);
    saveHistory([]);
  };

  return (
    <div className="card">
      {/* Tabs */}
      <div className="flex gap-2 p-1 bg-blue-50 rounded-full mb-6">
        {["calculator", "history"].map((t) => (
          <button key={t} type="button" onClick={() => setTab(t)}
            className={`flex-1 px-4 py-2 text-sm font-semibold rounded-full transition capitalize ${
              tab === t ? "bg-[#3B82F6] text-white" : "text-[#9CA3AF]"
            }`}>
            {t === "calculator" ? "Calculator" : `Growth Trend (${history.length})`}
          </button>
        ))}
      </div>

      {tab === "calculator" && (
        <>
          {/* Unit + sex toggles */}
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex gap-2 p-1 bg-blue-50 rounded-full">
              <button type="button" onClick={() => setSex("boy")}
                className={`px-4 py-2 text-sm font-semibold rounded-full transition ${sex === "boy" ? "bg-blue-200 text-blue-700" : "text-[#9CA3AF]"}`}>
                Boy
              </button>
              <button type="button" onClick={() => setSex("girl")}
                className={`px-4 py-2 text-sm font-semibold rounded-full transition ${sex === "girl" ? "bg-pink-200 text-pink-700" : "text-[#9CA3AF]"}`}>
                Girl
              </button>
            </div>
            <div className="flex gap-2 p-1 bg-blue-50 rounded-full">
              <button type="button" onClick={() => setUnit("metric")}
                className={`px-4 py-2 text-sm font-semibold rounded-full transition ${unit === "metric" ? "bg-[#3B82F6] text-white" : "text-[#9CA3AF]"}`}>
                kg / cm
              </button>
              <button type="button" onClick={() => setUnit("imperial")}
                className={`px-4 py-2 text-sm font-semibold rounded-full transition ${unit === "imperial" ? "bg-[#3B82F6] text-white" : "text-[#9CA3AF]"}`}>
                lbs / in
              </button>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="block">
              <span className="text-sm font-semibold text-[#1E293B] mb-2 block">Baby's age (months)</span>
              <input type="number" min="0" max="24" placeholder="e.g. 6" value={ageMonths}
                onChange={(e) => setAgeMonths(e.target.value)}
                className="w-full px-4 py-3 border-2 border-blue-100 rounded-xl bg-white focus:border-[#3B82F6] focus:outline-none" />
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-[#1E293B] mb-2 block">Weight ({unit === "metric" ? "kg" : "lbs"})</span>
              <input type="number" step="0.1" placeholder={unit === "metric" ? "e.g. 7.5" : "e.g. 16.5"} value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full px-4 py-3 border-2 border-blue-100 rounded-xl bg-white focus:border-[#3B82F6] focus:outline-none" />
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-[#1E293B] mb-2 block">Length/Height ({unit === "metric" ? "cm" : "in"})</span>
              <input type="number" step="0.1" placeholder={unit === "metric" ? "e.g. 67" : "e.g. 26.5"} value={length}
                onChange={(e) => setLength(e.target.value)}
                className="w-full px-4 py-3 border-2 border-blue-100 rounded-xl bg-white focus:border-[#3B82F6] focus:outline-none" />
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-[#1E293B] mb-2 block">Head circumference ({unit === "metric" ? "cm" : "in"})</span>
              <input type="number" step="0.1" placeholder={unit === "metric" ? "e.g. 43" : "e.g. 17"} value={headCirc}
                onChange={(e) => setHeadCirc(e.target.value)}
                className="w-full px-4 py-3 border-2 border-blue-100 rounded-xl bg-white focus:border-[#3B82F6] focus:outline-none" />
            </label>
          </div>

          {error && <p className="mt-3 text-sm text-red-500 font-medium">{error}</p>}

          <button type="button" onClick={handleCalc} className="mt-5 px-8 py-3 bg-[#3B82F6] text-white font-semibold rounded-full hover:bg-[#1D4ED8] transition w-full md:w-auto">
            Calculate Percentile
          </button>

          {result && (
            <div className="mt-8 space-y-4">
              <p className="text-sm text-[#9CA3AF] text-center">
                {result.sex === "boy" ? "Boy" : "Girl"}, {result.age} months old -- WHO Growth Standards
              </p>
              {result.measurements.map((m, i) => (
                <div key={i} className="rounded-xl border border-blue-100 p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="text-sm font-semibold text-[#1E293B]">{m.type}</p>
                      <p className="font-mono text-lg text-[#3B82F6]">{m.value}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-mono text-3xl font-bold" style={{ color: m.status.color }}>
                        {m.percentile.toFixed(0)}th
                      </p>
                      <p className="text-xs text-[#9CA3AF]">percentile</p>
                    </div>
                  </div>
                  {/* Visual bar */}
                  <div className="relative h-4 bg-gradient-to-r from-red-100 via-green-100 to-red-100 rounded-full mb-2">
                    <div
                      className="absolute top-0 w-3 h-4 rounded-full border-2 border-white shadow"
                      style={{ left: `${m.percentile}%`, backgroundColor: m.status.color, transform: "translateX(-50%)" }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-[#9CA3AF]">
                    <span>3rd</span><span>15th</span><span>50th</span><span>85th</span><span>97th</span>
                  </div>
                  <p className="mt-2 text-sm" style={{ color: m.status.color }}>
                    {m.status.label} -- {m.status.note}
                  </p>
                  <p className="text-xs text-[#9CA3AF] mt-1">WHO median for {result.age} months: {m.median}</p>
                </div>
              ))}

              <button type="button" onClick={saveToHistory}
                className="block mx-auto mt-4 px-6 py-2 bg-[#D1FAE5] text-green-700 font-semibold rounded-full hover:bg-green-200 transition">
                Save to Growth Trend
              </button>
            </div>
          )}
        </>
      )}

      {tab === "history" && (
        <div>
          <h3 className="text-sm font-bold text-[#1E293B] uppercase tracking-wide mb-3">
            Measurement History
          </h3>
          <p className="text-sm text-[#9CA3AF] mb-4">
            Track your baby's growth over time. Save measurements from the calculator to build a history.
          </p>
          {history.length === 0 ? (
            <p className="text-sm text-[#9CA3AF] text-center py-8">
              No measurements saved yet. Use the calculator and tap "Save to Growth Trend" to start tracking.
            </p>
          ) : (
            <>
              <div className="space-y-3">
                {history.map((entry, i) => (
                  <div key={i} className="p-4 bg-blue-50 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-[#1E293B]">{entry.date}</span>
                      <span className="text-xs text-[#9CA3AF]">
                        {entry.sex === "boy" ? "Boy" : "Girl"}, {entry.age}m
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {entry.measurements.map((m, j) => (
                        <div key={j} className="text-sm">
                          <span className="text-[#9CA3AF]">{m.type}: </span>
                          <span className="font-mono text-[#3B82F6]">{m.value}</span>
                          <span className="text-xs text-[#9CA3AF] ml-1">({m.percentile.toFixed(0)}th)</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <button type="button" onClick={clearHistory}
                className="mt-4 text-sm text-[#9CA3AF] underline hover:text-red-400 block mx-auto">
                Clear all history
              </button>
            </>
          )}
        </div>
      )}

      <p className="mt-6 text-xs text-[#9CA3AF] italic text-center">
        Based on WHO Child Growth Standards (2006). Percentiles are approximate.
        Growth trends over time are more important than single measurements.
        Always discuss growth concerns with your pediatrician.
      </p>
    </div>
  );
}
