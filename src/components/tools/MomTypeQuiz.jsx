import { useEffect, useRef, useState } from "react";
import { CARD_STYLES, drawCard, downloadCanvas, copyText, shareText } from "./shareCard.js";

const TYPES = {
  superhero: { name: "The Superhero", emoji: "🦸‍♀️", color: "#B05B73", bg: "#FBE0E6",
    desc: "You carry everyone, often before anyone asks. You're the one who notices, remembers, and fixes. Your strength is also your trap: you say yes to everything and rest last.",
    tip: "Your assignment: hand off one recurring task this week and let it be done imperfectly. The me-time calculator will show you how much of your day you've given away.",
    link: { href: "/tools/me-time-calculator/", label: "Me-time calculator" } },
  planner: { name: "The Planner", emoji: "📋", color: "#2E6FB8", bg: "#E6F0FB",
    desc: "Lists, schedules, labeled bins. A predictable day is your calm, and your family runs because of it. The hard days are the ones the plan can't cover.",
    tip: "Your assignment: build one 'no plan' hour into the week and practice sitting in it. The bedtime calculator is your friend; so is a freezer dinner you don't feel guilty about.",
    link: { href: "/tools/bedtime-calculator/", label: "Bedtime calculator" } },
  freespirit: { name: "The Free Spirit", emoji: "🌿", color: "#3E8A66", bg: "#DDF0E5",
    desc: "You follow the kid, the weather, and the mood. Mornings at the park beat mornings at the table, and your children get a lot of wonder from you. Routine is where you run out of steam.",
    tip: "Your assignment: one anchor a day (same bedtime, same breakfast) so the free days have a floor to land on. Keep everything else loose.",
    link: { href: "/blog/toddler-bedtime-routine/", label: "A bedtime routine that actually works" } },
  zen: { name: "The Zen Mom", emoji: "🧘‍♀️", color: "#6C5BA1", bg: "#E4DEF0",
    desc: "You're the calm in the room more often than not, and people assume it's effortless. It isn't. You absorb a lot, and you tend to go quiet rather than ask for help.",
    tip: "Your assignment: say one true, un-calm thing out loud this week to someone who can do something about it. The mood journal is a low-stakes place to practice.",
    link: { href: "/tools/mood-journal/", label: "Mood journal" } },
  hustler: { name: "The Hustler", emoji: "⚡", color: "#A37224", bg: "#FBEED5",
    desc: "Work, side projects, the baby, and somehow a clean kitchen. You run on momentum and you're genuinely good at it. The crash comes when momentum is all you've got.",
    tip: "Your assignment: protect sleep like it's a deadline, and schedule rest with the same seriousness you schedule everything else. Start with three minutes of breathing a day.",
    link: { href: "/tools/breathing-exercise/", label: "3-minute breathing exercise" } },
};

const QUESTIONS = [
  { q: "It's 6:45 a.m. and the baby's awake early. You:", a: [
    ["Get everyone up and moving. The day waits for no one.", "superhero"],
    ["Check the schedule. Early wake means an earlier first nap.", "planner"],
    ["Bring the baby into bed and see where the morning goes.", "freespirit"],
    ["Take a slow breath and a slow feed before anything else.", "zen"],
    ["Feed the baby with one hand and clear two emails with the other.", "hustler"],
  ]},
  { q: "A friend offers to take the kids for a morning. You:", a: [
    ["Say 'you don't have to!' three times before accepting.", "superhero"],
    ["Say yes and immediately plan the morning hour by hour.", "planner"],
    ["Say yes and decide what to do when the door closes.", "freespirit"],
    ["Say yes and sit somewhere quiet, doing nothing on purpose.", "zen"],
    ["Say yes and finally finish the thing you've been working on.", "hustler"],
  ]},
  { q: "Your toddler is melting down in the grocery store. Your first instinct:", a: [
    ["Scoop them up, keep moving, finish the list.", "superhero"],
    ["Mentally note we hit the 'too close to nap' window again.", "planner"],
    ["Abandon the cart. We'll come back. Let's go look at the fish tank.", "freespirit"],
    ["Crouch, low voice, wait it out. Everyone's watching; let them.", "zen"],
    ["Pull up a show on the phone and power through checkout.", "hustler"],
  ]},
  { q: "Bedtime's done. The next hour is:", a: [
    ["Dishes, laundry, lunches, then collapse.", "superhero"],
    ["Prep tomorrow, check the calendar, lights out on time.", "planner"],
    ["Whatever I feel like. Sometimes that's a bath, sometimes it's cake.", "freespirit"],
    ["Silence first. Then maybe a book.", "zen"],
    ["Laptop open. This is when I get real work done.", "hustler"],
  ]},
  { q: "Someone tells you you're doing a great job. You think:", a: [
    ["If they saw the inside of my head they'd know I'm barely holding it.", "superhero"],
    ["Thanks. It's the system, honestly.", "planner"],
    ["Am I? I kind of make it up every day.", "freespirit"],
    ["That's kind. I'm trying to be gentle with myself about it.", "zen"],
    ["Not yet. But I will be.", "hustler"],
  ]},
];

export default function MomTypeQuiz({ published = [] }) {
  const linkOk = (href) => !href.startsWith("/blog/") || published.includes(href.replace(/^\/blog\//, "").replace(/\/$/, ""));

  const [picks, setPicks] = useState(Array(QUESTIONS.length).fill(null));
  const [result, setResult] = useState(null);
  const [styleKey, setStyleKey] = useState("peach");
  const [msg, setMsg] = useState("");
  const canvasRef = useRef(null);
  const answered = picks.filter((p) => p !== null).length;

  const compute = () => {
    const tally = {};
    picks.forEach((p, i) => { if (p === null) return; const t = QUESTIONS[i].a[p][1]; tally[t] = (tally[t] || 0) + 1; });
    const best = Object.keys(tally).sort((a, b) => tally[b] - tally[a])[0];
    setResult(best);
  };

  useEffect(() => {
    if (!result) return;
    const t = TYPES[result];
    drawCard(canvasRef.current, { eyebrow: "Which kind of mom are you?", text: `${t.emoji} I'm ${t.name}. ${t.desc.split(". ")[0]}.`, styleKey, quote: false });
  }, [result, styleKey]);

  const flash = (m) => { setMsg(m); setTimeout(() => setMsg(""), 2500); };
  const btn = "px-4 py-2 rounded-full text-sm font-semibold transition-colors";

  if (result) {
    const t = TYPES[result];
    const share = `I'm ${t.name} ${t.emoji} — which kind of mom are you? Take the 5-question quiz: https://baby.chparenting.com/tools/mom-type-quiz/`;
    return (
      <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
        <div className="card">
          <p className="text-xs font-bold tracking-wider uppercase text-[#6B7B91]">Your result</p>
          <div className="mt-3 rounded-2xl p-5" style={{ background: t.bg }}>
            <p className="text-3xl font-bold" style={{ color: t.color }}>{t.emoji} {t.name}</p>
            <p className="mt-3 text-[#1E3A5F] leading-relaxed">{t.desc}</p>
          </div>
          <p className="mt-4 text-[#374151] leading-relaxed"><strong>Your one assignment:</strong> {t.tip}</p>
          {linkOk(t.link.href) && <p className="mt-2"><a className="text-[#2E6FB8] underline" href={t.link.href}>{t.link.label} →</a></p>}
          <div className="mt-5 flex flex-wrap gap-2">
            <button className={`${btn} bg-[#5B9BD5] text-white hover:bg-[#2E6FB8]`} onClick={() => downloadCanvas(canvasRef.current, `mom-type-${result}.png`)}>Download card</button>
            <button className={`${btn} border-2 border-[#5B9BD5] text-[#2E6FB8] hover:bg-[#E6F0FB]`} onClick={async () => flash((await copyText(share)) ? "Copied!" : "Copy failed.")}>Copy</button>
            <button className={`${btn} border-2 border-[#5B9BD5] text-[#2E6FB8] hover:bg-[#E6F0FB]`} onClick={async () => { const r = await shareText("Which kind of mom are you?", share); if (r === "copied") flash("Sharing isn't available here, so the text was copied."); }}>Share</button>
            <button className={`${btn} text-[#6B7B91] hover:text-[#2E6FB8]`} onClick={() => { setResult(null); setPicks(Array(QUESTIONS.length).fill(null)); }}>Take it again</button>
          </div>
          {msg && <p className="mt-3 text-sm text-[#2E6FB8]">{msg}</p>}
          <p className="mt-4 text-xs text-[#6B7B91]">This is for fun. Most of us are two of these before breakfast and a third by bedtime.</p>
        </div>
        <div>
          <p className="text-xs font-bold tracking-wider uppercase text-[#6B7B91] mb-3">Share card</p>
          <canvas ref={canvasRef} width="1080" height="1080" className="w-full rounded-2xl shadow-lg border border-blue-100" aria-label="Result card preview" />
          <div className="mt-3 flex flex-wrap gap-2">
            {Object.values(CARD_STYLES).map((s) => (
              <button key={s.key} onClick={() => setStyleKey(s.key)} className={`px-3 py-1.5 rounded-full text-xs font-semibold border-2 ${styleKey === s.key ? "border-[#2E6FB8] bg-[#E6F0FB] text-[#2E6FB8]" : "border-blue-100 text-[#6B7B91]"}`}>{s.label}</button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <ol className="space-y-6">
        {QUESTIONS.map((item, qi) => (
          <li key={qi}>
            <p className="font-semibold text-[#1E3A5F]"><span className="text-[#6B7B91] mr-2">{qi + 1}.</span>{item.q}</p>
            <div className="mt-2 grid gap-2">
              {item.a.map((opt, oi) => (
                <button key={oi} type="button" onClick={() => setPicks((p) => { const n = [...p]; n[qi] = oi; return n; })} className={`text-left px-4 py-2.5 rounded-xl border-2 text-sm transition-colors ${picks[qi] === oi ? "border-[#2E6FB8] bg-[#E6F0FB] text-[#1E3A5F]" : "border-blue-100 text-[#374151] hover:border-blue-200"}`}>{opt[0]}</button>
              ))}
            </div>
          </li>
        ))}
      </ol>
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <button className="btn-primary disabled:opacity-50" disabled={answered < QUESTIONS.length} onClick={compute}>Reveal my type</button>
        <span className="text-sm text-[#6B7B91]">{answered} of {QUESTIONS.length} answered</span>
      </div>
    </div>
  );
}
