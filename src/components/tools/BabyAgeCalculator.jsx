import { useState } from "react";

function diffYMD(from, to) {
  let years = to.getFullYear() - from.getFullYear();
  let months = to.getMonth() - from.getMonth();
  let days = to.getDate() - from.getDate();
  if (days < 0) {
    months--;
    days += new Date(to.getFullYear(), to.getMonth(), 0).getDate();
  }
  if (months < 0) { years--; months += 12; }
  return { years, months, days, totalMonths: years * 12 + months };
}

const DAY = 1000 * 60 * 60 * 24;

export default function BabyAgeCalculator() {
  const today = new Date().toISOString().split("T")[0];
  const [birthDate, setBirthDate] = useState("");
  const [asOf, setAsOf] = useState(today);
  const [premature, setPremature] = useState(false);
  const [weeksAtBirth, setWeeksAtBirth] = useState("34");
  const [daysAtBirth, setDaysAtBirth] = useState("0");

  const birth = birthDate ? new Date(birthDate + "T00:00:00") : null;
  const target = asOf ? new Date(asOf + "T00:00:00") : null;
  const valid = birth && target && birth <= target;

  let result = null;
  if (valid) {
    const totalDays = Math.floor((target - birth) / DAY);
    const chrono = diffYMD(birth, target);
    const weeks = Math.floor(totalDays / 7);
    const extraDays = totalDays % 7;

    let adjusted = null;
    const ga = parseInt(weeksAtBirth) || 40;
    const gaDays = parseInt(daysAtBirth) || 0;
    if (premature && ga < 37) {
      // Weeks of prematurity = 40 weeks minus gestational age at birth
      const earlyDays = (40 - ga) * 7 - gaDays;
      const adjDays = totalDays - earlyDays;
      const adjustedBirth = new Date(birth.getTime() + earlyDays * DAY);
      adjusted = {
        earlyWeeks: Math.floor(earlyDays / 7),
        earlyDays: earlyDays % 7,
        totalDays: adjDays,
        ymd: adjDays >= 0 ? diffYMD(adjustedBirth, target) : null,
        weeks: adjDays >= 0 ? Math.floor(adjDays / 7) : 0,
        notYetDue: adjDays < 0,
        stillUsed: chrono.totalMonths < 24,
      };
    }
    result = { totalDays, chrono, weeks, extraDays, adjusted };
  }

  const inputCls = "w-full px-3 py-2 border-2 border-blue-200 rounded-xl bg-white focus:border-[#3B82F6] focus:outline-none";

  return (
    <div className="card">
      <div className="grid gap-4 sm:grid-cols-2 mb-5">
        <div>
          <label className="text-sm font-semibold text-[#1E293B] mb-2 block">Baby's date of birth</label>
          <input type="date" value={birthDate} max={today} onChange={(e) => setBirthDate(e.target.value)} className={inputCls} />
        </div>
        <div>
          <label className="text-sm font-semibold text-[#1E293B] mb-2 block">Age on this date</label>
          <input type="date" value={asOf} onChange={(e) => setAsOf(e.target.value)} className={inputCls} />
        </div>
      </div>

      <label className="flex items-center gap-3 mb-4 cursor-pointer select-none">
        <input type="checkbox" checked={premature} onChange={(e) => setPremature(e.target.checked)} className="w-5 h-5 accent-[#3B82F6]" />
        <span className="text-sm font-semibold text-[#1E293B]">Baby was born early (before 37 weeks)</span>
      </label>

      {premature && (
        <div className="grid gap-4 sm:grid-cols-2 mb-5 p-4 rounded-xl bg-blue-50">
          <div>
            <label className="text-sm font-semibold text-[#1E293B] mb-2 block">Weeks of pregnancy at birth</label>
            <input type="number" min="22" max="36" value={weeksAtBirth} onChange={(e) => setWeeksAtBirth(e.target.value)} className={inputCls} />
          </div>
          <div>
            <label className="text-sm font-semibold text-[#1E293B] mb-2 block">Plus extra days (0–6)</label>
            <input type="number" min="0" max="6" value={daysAtBirth} onChange={(e) => setDaysAtBirth(e.target.value)} className={inputCls} />
          </div>
        </div>
      )}

      {!birthDate && (
        <p className="text-sm text-[#9CA3AF]">Enter your baby's birth date to see their age in days, weeks, and months.</p>
      )}
      {birthDate && !valid && (
        <p className="text-sm text-red-500">The birth date must be on or before the "age on" date.</p>
      )}

      {result && (
        <div className="space-y-4">
          <div className="rounded-2xl bg-[#E6F0FB] p-5 text-center">
            <div className="text-xs font-semibold uppercase tracking-wide text-[#2E6FB8] mb-1">
              {result.adjusted ? "Actual (chronological) age" : "Baby's age"}
            </div>
            <div className="text-3xl font-bold text-[#1E3A5F]">
              {result.chrono.years > 0 && <span>{result.chrono.years} yr </span>}
              {result.chrono.months} mo {result.chrono.days} d
            </div>
            <div className="text-sm text-[#5A6F89] mt-1">
              {result.weeks} weeks {result.extraDays} days · {result.totalDays.toLocaleString()} days · {result.chrono.totalMonths} months total
            </div>
          </div>

          {result.adjusted && (
            <div className="rounded-2xl bg-[#DDF0E5] p-5 text-center">
              <div className="text-xs font-semibold uppercase tracking-wide text-[#3E8A66] mb-1">Adjusted (corrected) age</div>
              {result.adjusted.notYetDue ? (
                <div className="text-lg font-bold text-[#1E3A5F]">
                  Not yet at the original due date — {Math.abs(result.adjusted.totalDays)} days to go
                </div>
              ) : (
                <>
                  <div className="text-3xl font-bold text-[#1E3A5F]">
                    {result.adjusted.ymd.years > 0 && <span>{result.adjusted.ymd.years} yr </span>}
                    {result.adjusted.ymd.months} mo {result.adjusted.ymd.days} d
                  </div>
                  <div className="text-sm text-[#5A6F89] mt-1">
                    {result.adjusted.weeks} weeks · born {result.adjusted.earlyWeeks} wk {result.adjusted.earlyDays} d early
                  </div>
                </>
              )}
              <p className="text-xs text-[#3E8A66] mt-3">
                {result.adjusted.stillUsed
                  ? "Use adjusted age when checking milestones, until about 2 years old."
                  : "Past 2 years old, most pediatricians switch back to actual age."}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
