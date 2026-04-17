import { useState } from "react";

const SLEEP_DATA = [
  { minAge: 0, maxAge: 1, label: "0-1 month", nightHrs: 8.5, totalHrs: 15.5, naps: 5, lastNapEnd: 1.5, wakeWindow: 0.75 },
  { minAge: 1, maxAge: 3, label: "1-3 months", nightHrs: 9.5, totalHrs: 15, naps: 4, lastNapEnd: 1.5, wakeWindow: 1.25 },
  { minAge: 3, maxAge: 6, label: "3-6 months", nightHrs: 10.5, totalHrs: 14, naps: 3, lastNapEnd: 2, wakeWindow: 2 },
  { minAge: 6, maxAge: 9, label: "6-9 months", nightHrs: 11, totalHrs: 14, naps: 2, lastNapEnd: 3, wakeWindow: 2.75 },
  { minAge: 9, maxAge: 12, label: "9-12 months", nightHrs: 11, totalHrs: 13.5, naps: 2, lastNapEnd: 3.5, wakeWindow: 3.25 },
  { minAge: 12, maxAge: 18, label: "12-18 months", nightHrs: 11, totalHrs: 13, naps: 1.5, lastNapEnd: 4, wakeWindow: 4 },
  { minAge: 18, maxAge: 24, label: "18-24 months", nightHrs: 11, totalHrs: 12.5, naps: 1, lastNapEnd: 4.5, wakeWindow: 5 },
];

function getDataForAge(months) {
  return SLEEP_DATA.find((d) => months >= d.minAge && months < d.maxAge) || SLEEP_DATA[SLEEP_DATA.length - 1];
}

function timeToMinutes(time) {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

function minutesToTime(mins) {
  let m = ((mins % 1440) + 1440) % 1440;
  const h = Math.floor(m / 60);
  const mm = Math.round(m % 60);
  const ampm = h >= 12 ? "PM" : "AM";
  const h12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
  return `${h12}:${mm.toString().padStart(2, "0")} ${ampm}`;
}

export default function BedtimeCalculator() {
  const [age, setAge] = useState(6);
  const [wakeTime, setWakeTime] = useState("07:00");
  const [showTable, setShowTable] = useState(false);

  const data = getDataForAge(age);
  const wakeMins = timeToMinutes(wakeTime);
  const bedtimeMins = wakeMins - data.nightHrs * 60;
  const lastNapEndMins = bedtimeMins - data.lastNapEnd * 60;

  // Build a simple day timeline
  const napCount = Math.round(data.naps);
  const napTotalHrs = data.totalHrs - data.nightHrs;
  const napDuration = napTotalHrs / napCount;
  const timelineEvents = [];

  // Wake up
  timelineEvents.push({ time: wakeMins, label: "Wake up", color: "#3B82F6" });

  // Naps
  let nextWake = wakeMins;
  for (let i = 0; i < napCount; i++) {
    const napStart = nextWake + data.wakeWindow * 60;
    const napEnd = napStart + napDuration * 60;
    timelineEvents.push({ time: napStart, label: `Nap ${i + 1} start`, color: "#D1FAE5", bg: true });
    timelineEvents.push({ time: napEnd, label: `Nap ${i + 1} end`, color: "#D1FAE5" });
    nextWake = napEnd;
  }

  // Bedtime
  timelineEvents.push({ time: bedtimeMins, label: "Bedtime", color: "#1D4ED8" });

  // Normalize for display
  const dayStart = wakeMins;
  const dayEnd = bedtimeMins + data.nightHrs * 60;
  const dayLength = dayEnd - dayStart;

  return (
    <div className="card">
      {/* Inputs */}
      <div className="grid gap-4 sm:grid-cols-2 mb-6">
        <div>
          <label className="text-sm font-semibold text-[#1E293B] mb-2 block">Baby's age (months)</label>
          <input
            type="range" min="0" max="24" value={age}
            onChange={(e) => setAge(parseInt(e.target.value))}
            className="w-full accent-[#3B82F6]"
          />
          <p className="text-center text-sm font-medium text-[#3B82F6] mt-1">{age} months old</p>
        </div>
        <div>
          <label className="text-sm font-semibold text-[#1E293B] mb-2 block">Desired wake-up time</label>
          <input
            type="time" value={wakeTime}
            onChange={(e) => setWakeTime(e.target.value)}
            className="w-full px-3 py-2 border-2 border-blue-200 rounded-xl bg-white focus:border-[#3B82F6] focus:outline-none"
          />
        </div>
      </div>

      {/* Results */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <div className="bg-blue-50 rounded-xl p-4 text-center">
          <p className="text-xs text-[#9CA3AF] font-semibold uppercase mb-1">Ideal Bedtime</p>
          <p className="font-mono text-xl text-[#1D4ED8] font-bold">{minutesToTime(bedtimeMins)}</p>
        </div>
        <div className="bg-blue-50 rounded-xl p-4 text-center">
          <p className="text-xs text-[#9CA3AF] font-semibold uppercase mb-1">Night Sleep</p>
          <p className="font-mono text-xl text-[#3B82F6]">{data.nightHrs} hrs</p>
        </div>
        <div className="bg-blue-50 rounded-xl p-4 text-center">
          <p className="text-xs text-[#9CA3AF] font-semibold uppercase mb-1">Naps</p>
          <p className="font-mono text-xl text-[#3B82F6]">{napCount}</p>
        </div>
        <div className="bg-blue-50 rounded-xl p-4 text-center">
          <p className="text-xs text-[#9CA3AF] font-semibold uppercase mb-1">Last Nap Ends By</p>
          <p className="font-mono text-xl text-[#3B82F6]">{minutesToTime(lastNapEndMins)}</p>
        </div>
      </div>

      {/* Visual Timeline */}
      <div className="mb-6">
        <h3 className="text-sm font-bold text-[#1E293B] uppercase tracking-wide mb-3">Daily Schedule Preview</h3>
        <div className="relative bg-blue-50 rounded-xl h-16 overflow-hidden">
          {/* Nap blocks */}
          {Array.from({ length: napCount }).map((_, i) => {
            const napStart = wakeMins + data.wakeWindow * 60 + i * (data.wakeWindow * 60 + napDuration * 60);
            const napEnd = napStart + napDuration * 60;
            const left = ((napStart - dayStart) / (bedtimeMins - dayStart)) * 100;
            const width = ((napEnd - napStart) / (bedtimeMins - dayStart)) * 100;
            return (
              <div
                key={i}
                className="absolute top-0 h-full bg-[#3B82F6] opacity-20 rounded"
                style={{ left: `${Math.max(0, Math.min(left, 100))}%`, width: `${Math.min(width, 100 - left)}%` }}
              />
            );
          })}
          {/* Wake marker */}
          <div className="absolute top-0 left-0 h-full w-1 bg-[#3B82F6] rounded" />
          <div className="absolute top-1 left-2 text-[10px] font-bold text-[#3B82F6]">
            Wake {minutesToTime(wakeMins)}
          </div>
          {/* Bedtime marker */}
          <div className="absolute top-0 right-0 h-full w-1 bg-[#1D4ED8] rounded" />
          <div className="absolute top-1 right-2 text-[10px] font-bold text-[#1D4ED8]">
            Bed {minutesToTime(bedtimeMins)}
          </div>
          {/* Center label */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-semibold text-[#1E293B]">
              {napCount} nap{napCount !== 1 ? "s" : ""} | {napTotalHrs.toFixed(1)} hrs nap time
            </span>
          </div>
        </div>
      </div>

      {/* Reference table */}
      <div className="mt-6">
        <button
          type="button"
          onClick={() => setShowTable(!showTable)}
          className="text-sm font-bold text-[#3B82F6] hover:text-[#1D4ED8] transition mb-3"
        >
          {showTable ? "Hide" : "Show"} full sleep reference table
        </button>
        {showTable && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b-2 border-blue-100">
                  <th className="py-2 px-2 text-[#1E293B]">Age</th>
                  <th className="py-2 px-2 text-[#1E293B]">Total Sleep</th>
                  <th className="py-2 px-2 text-[#1E293B]">Night</th>
                  <th className="py-2 px-2 text-[#1E293B]">Naps</th>
                  <th className="py-2 px-2 text-[#1E293B]">Sample Bedtime</th>
                </tr>
              </thead>
              <tbody>
                {SLEEP_DATA.map((row, i) => {
                  const sampleBed = wakeMins - row.nightHrs * 60;
                  return (
                    <tr key={i} className={`border-b border-blue-50 hover:bg-blue-50 ${age >= row.minAge && age < row.maxAge ? "bg-blue-50 font-semibold" : ""}`}>
                      <td className="py-2 px-2 text-[#3B82F6]">{row.label}</td>
                      <td className="py-2 px-2 text-[#1E293B]">{row.totalHrs} hrs</td>
                      <td className="py-2 px-2 text-[#1E293B]">{row.nightHrs} hrs</td>
                      <td className="py-2 px-2 text-[#1E293B]">{Math.round(row.naps)}</td>
                      <td className="py-2 px-2 font-mono text-[#1D4ED8]">{minutesToTime(sampleBed)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <p className="mt-6 text-xs text-[#9CA3AF] italic text-center">
        Based on AAP and National Sleep Foundation guidelines. Every baby is different --
        adjust based on your baby's unique sleep cues. Consult your pediatrician with any concerns.
      </p>
    </div>
  );
}
