import { useState } from "react";

const QUESTIONS = [
  "I feel exhausted even after I've slept.",
  "Small things (a spilled cup, a whine) make me snap or want to cry.",
  "I can't remember the last time I did something just because I wanted to.",
  "I feel like I'm doing everything and nobody notices.",
  "I have trouble falling or staying asleep even when my child is asleep.",
  "I feel touched out or overstimulated by the end of the day.",
  "I worry constantly, even when things are going fine.",
  "I feel guilty most days about something I did or didn't do as a mom.",
  "I've pulled away from friends or things I used to enjoy.",
  "I feel like I'm just going through the motions.",
];
const OPTIONS = [
  { v: 0, label: "Rarely" },
  { v: 1, label: "Sometimes" },
  { v: 2, label: "Often" },
  { v: 3, label: "Almost always" },
];

const LEVELS = [
  {
    max: 10, name: "Low", color: "#3E8A66", bg: "#DDF0E5",
    summary: "You're tired like every mother is tired, but you still have margin.",
    advice: [
      "Keep the small resets that are working. Attach one to a daily trigger so it survives busy weeks.",
      "Protect the thing that refills you most (sleep, a walk, a friend) before you need it.",
    ],
    links: [
      { href: "/blog/self-care-for-moms-that-actually-fits/", label: "Self-care that actually fits" },
      { href: "/tools/daily-affirmation-for-moms/", label: "Daily affirmation for moms" },
    ],
  },
  {
    max: 20, name: "Moderate", color: "#A37224", bg: "#FBEED5",
    summary: "Your tank is running low. This is the zone where small, daily changes make the biggest difference.",
    advice: [
      "Pick two five-minute resets and tie them to your hardest hour of the day.",
      "Find fifteen minutes a day that are yours: the me-time calculator will show you where they are.",
      "Say the load out loud to whoever shares your home, and divide the remembering, not just the chores.",
      "Track your mood for one week so you can see the pattern instead of guessing.",
    ],
    links: [
      { href: "/blog/5-minute-stress-relief-for-moms/", label: "5-minute stress relief for moms" },
      { href: "/tools/me-time-calculator/", label: "Me-time calculator" },
      { href: "/tools/mood-journal/", label: "Mood journal" },
    ],
  },
  {
    max: 30, name: "High", color: "#B05B73", bg: "#FBE0E6",
    summary: "You're carrying a lot, and it's been a while since anything refilled you. Please read the note below about talking to someone.",
    advice: [
      "Tell one person today, in plain words, how it actually is.",
      "If sleep is broken even when your child sleeps, or the low mood has lasted more than two weeks, make an appointment with your doctor or OB-GYN this week. Your baby's pediatrician can also start the conversation.",
      "Lower every standard that doesn't matter this week. Cereal dinners, screens, a messy house.",
      "Use the breathing exercise during the worst hour, and keep the baby safe and step away when you need to.",
    ],
    links: [
      { href: "/blog/mom-rage-why-it-happens-and-what-helps/", label: "Mom rage: why it happens and what helps" },
      { href: "/blog/stay-at-home-mom-burnout/", label: "Stay-at-home mom burnout" },
      { href: "/tools/breathing-exercise/", label: "3-minute breathing exercise" },
    ],
  },
];

export default function MomStressTest({ published = [] }) {
  const linkOk = (href) => !href.startsWith("/blog/") || published.includes(href.replace(/^\/blog\//, "").replace(/\/$/, ""));

  const [answers, setAnswers] = useState(Array(QUESTIONS.length).fill(null));
  const [submitted, setSubmitted] = useState(false);
  const answered = answers.filter((a) => a !== null).length;
  const score = answers.reduce((s, a) => s + (a || 0), 0);
  const level = LEVELS.find((l) => score <= l.max) || LEVELS[2];

  const reset = () => { setAnswers(Array(QUESTIONS.length).fill(null)); setSubmitted(false); };

  if (submitted) {
    return (
      <div className="card">
        <p className="text-xs font-bold tracking-wider uppercase text-[#6B7B91]">Your result</p>
        <div className="mt-3 rounded-2xl p-5" style={{ background: level.bg }}>
          <p className="text-3xl font-bold" style={{ color: level.color }}>{level.name} stress</p>
          <p className="text-sm text-[#374151] mt-1">Score {score} out of 30</p>
          <p className="mt-3 text-[#1E3A5F] leading-relaxed">{level.summary}</p>
        </div>
        <h3 className="mt-6 font-bold text-[#1E3A5F]">What tends to help at this level</h3>
        <ul className="mt-2 list-disc pl-5 space-y-2 text-[#374151] leading-relaxed">
          {level.advice.map((a, i) => <li key={i}>{a}</li>)}
        </ul>
        <h3 className="mt-6 font-bold text-[#1E3A5F]">Start here</h3>
        <ul className="mt-2 space-y-1">
          {level.links.filter((l) => linkOk(l.href)).map((l) => <li key={l.href}><a className="text-[#2E6FB8] underline" href={l.href}>{l.label} →</a></li>)}
        </ul>
        <div className="mt-6 rounded-2xl border-2 border-blue-100 p-4 text-sm text-[#374151] leading-relaxed">
          <p><strong>This is not a medical screening or a diagnosis.</strong> It's a quick snapshot to help you notice where you are. If you've felt sad, hopeless, numb, or constantly anxious for more than two weeks, or you've had thoughts of harming yourself or your child, please talk with your doctor today. In the US you can call or text <strong>988</strong> any time, or call the National Maternal Mental Health Hotline at <strong>1-833-852-6262</strong> (1-833-TLC-MAMA), free and confidential, 24/7.</p>
        </div>
        <button className="mt-6 px-5 py-2.5 rounded-full border-2 border-blue-100 text-[#6B7B91] font-semibold hover:border-blue-200" onClick={reset}>Take it again</button>
      </div>
    );
  }

  return (
    <div className="card">
      <p className="text-sm text-[#6B7B91]">Over the past two weeks, how often has each of these been true? There are no wrong answers.</p>
      <ol className="mt-5 space-y-5">
        {QUESTIONS.map((q, qi) => (
          <li key={qi}>
            <p className="font-semibold text-[#1E3A5F]"><span className="text-[#6B7B91] mr-2">{qi + 1}.</span>{q}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {OPTIONS.map((o) => (
                <button
                  key={o.v}
                  type="button"
                  onClick={() => setAnswers((a) => { const n = [...a]; n[qi] = o.v; return n; })}
                  className={`px-3 py-1.5 rounded-full text-sm font-semibold border-2 transition-colors ${answers[qi] === o.v ? "border-[#2E6FB8] bg-[#E6F0FB] text-[#2E6FB8]" : "border-blue-100 text-[#6B7B91] hover:border-blue-200"}`}
                >{o.label}</button>
              ))}
            </div>
          </li>
        ))}
      </ol>
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <button className="btn-primary disabled:opacity-50" disabled={answered < QUESTIONS.length} onClick={() => setSubmitted(true)}>See my result</button>
        <span className="text-sm text-[#6B7B91]">{answered} of {QUESTIONS.length} answered</span>
      </div>
    </div>
  );
}
