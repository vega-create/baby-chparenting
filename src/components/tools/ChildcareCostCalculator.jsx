import { useState } from "react";

const inputCls = "w-full px-3 py-2 border-2 border-blue-200 rounded-xl bg-white focus:border-[#3B82F6] focus:outline-none";

function Field({ label, value, set, hint, step = "1" }) {
  return (
    <div>
      <label className="text-sm font-semibold text-[#1E293B] mb-1 block">{label}</label>
      <input type="number" min="0" step={step} value={value} onChange={(e) => set(e.target.value)} className={inputCls} />
      {hint && <p className="text-xs text-[#9CA3AF] mt-1">{hint}</p>}
    </div>
  );
}

const fmt = (n) => (n < 0 ? "-" : "") + "$" + Math.abs(Math.round(n)).toLocaleString();

export default function ChildcareCostCalculator() {
  const [salary, setSalary] = useState("55000");
  const [fedRate, setFedRate] = useState("12");
  const [stateRate, setStateRate] = useState("4");
  const [childcare, setChildcare] = useState("1400");
  const [commute, setCommute] = useState("250");
  const [otherCosts, setOtherCosts] = useState("150");
  const [credit, setCredit] = useState("600");
  const [option, setOption] = useState("daycare");

  const gross = parseFloat(salary) || 0;
  const fica = 0.0765; // 6.2% Social Security + 1.45% Medicare (employee share)
  const taxRate = fica + (parseFloat(fedRate) || 0) / 100 + (parseFloat(stateRate) || 0) / 100;
  const netPay = gross * (1 - taxRate);

  const careYear = (parseFloat(childcare) || 0) * 12;
  const commuteYear = (parseFloat(commute) || 0) * 12;
  const otherYear = (parseFloat(otherCosts) || 0) * 12;
  const creditYear = parseFloat(credit) || 0;

  const workCosts = careYear + commuteYear + otherYear - creditYear;
  const netGain = netPay - workCosts;
  const hourly = gross > 0 ? netGain / 2080 : 0;

  return (
    <div className="card space-y-6">
      <div className="flex gap-2 p-1 bg-blue-50 rounded-full">
        {[["daycare", "Daycare / center"], ["nanny", "Nanny / in-home"]].map(([k, label]) => (
          <button key={k} type="button" onClick={() => setOption(k)}
            className={`flex-1 px-4 py-2 text-sm font-semibold rounded-full transition ${option === k ? "bg-[#3B82F6] text-white" : "text-[#9CA3AF]"}`}>
            {label}
          </button>
        ))}
      </div>

      <section className="grid gap-4 sm:grid-cols-2">
        <Field label="Second earner's gross salary ($/year)" value={salary} set={setSalary} step="1000" hint="The income that childcare makes possible." />
        <Field label={option === "nanny" ? "Nanny cost ($/month, incl. payroll taxes)" : "Childcare cost ($/month)"} value={childcare} set={setChildcare} step="50" hint="Use a real quote from a local provider." />
        <Field label="Federal income tax rate (%)" value={fedRate} set={setFedRate} step="1" hint="Your marginal bracket on this income (e.g. 12 or 22)." />
        <Field label="State income tax rate (%)" value={stateRate} set={setStateRate} step="0.5" hint="Enter 0 if your state has no income tax." />
        <Field label="Commuting ($/month)" value={commute} set={setCommute} step="10" hint="Gas, transit, parking." />
        <Field label="Other work costs ($/month)" value={otherCosts} set={setOtherCosts} step="10" hint="Lunches, clothing, convenience meals." />
        <div className="sm:col-span-2">
          <Field label="Childcare tax benefit ($/year)" value={credit} set={setCredit} step="50" hint="Estimated Child and Dependent Care Credit or dependent-care FSA savings. Enter 0 if unsure." />
        </div>
      </section>

      <div className="rounded-2xl bg-[#E6F0FB] p-5">
        <div className="text-xs font-semibold uppercase tracking-wide text-[#2E6FB8] mb-1 text-center">Net financial gain from working</div>
        <div className={`text-4xl font-bold text-center ${netGain >= 0 ? "text-[#1E3A5F]" : "text-[#B05B73]"}`}>{fmt(netGain)} / year</div>
        <div className="text-sm text-[#5A6F89] text-center mt-1">≈ {fmt(netGain / 12)} per month · {fmt(hourly)} per working hour</div>

        <div className="mt-5 space-y-2 text-sm">
          <div className="flex justify-between bg-white rounded-xl p-3"><span>Take-home pay (after {Math.round(taxRate * 100)}% taxes incl. 7.65% FICA)</span><span className="font-semibold">{fmt(netPay)}</span></div>
          <div className="flex justify-between bg-white rounded-xl p-3"><span>− Childcare</span><span className="font-semibold">{fmt(careYear)}</span></div>
          <div className="flex justify-between bg-white rounded-xl p-3"><span>− Commute + other work costs</span><span className="font-semibold">{fmt(commuteYear + otherYear)}</span></div>
          <div className="flex justify-between bg-white rounded-xl p-3"><span>+ Childcare tax benefit</span><span className="font-semibold">{fmt(creditYear)}</span></div>
        </div>
        {netGain < 0 && (
          <p className="text-sm text-[#B05B73] mt-4 text-center font-semibold">Working costs more than it brings in this year — but see the notes below on long-term earnings before deciding.</p>
        )}
      </div>
      <p className="text-xs text-[#9CA3AF] italic">Simplified estimate for planning only — not tax or financial advice. Does not model retirement contributions, employer benefits, or career growth.</p>
    </div>
  );
}
