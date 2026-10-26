import { useEffect, useRef, useState } from "react";
import { CARD_STYLES, drawCard, downloadCanvas, copyText, shareText } from "./shareCard.js";

// 64 original affirmations written for this site. Not about being a "better mom" —
// about being a whole, tired, allowed-to-have-needs person.
const AFFIRMATIONS = [
  "I am allowed to be tired and still be a good mother.",
  "Rest is not a reward I have to earn. It is maintenance.",
  "I only have to do the next thing, not the whole day.",
  "My worth is not measured by how clean the floor is.",
  "I can love my child and still want an hour to myself.",
  "Good enough is a real standard, and I meet it every day.",
  "I am not behind. There is no schedule for this.",
  "The yell was not the end of the story. The repair is.",
  "I am allowed to have needs in front of my children.",
  "My body did something extraordinary and is still doing it.",
  "I do not have to feel grateful every minute to be grateful.",
  "Asking for help is a skill, not a weakness.",
  "I can lower the bar today and raise it again tomorrow.",
  "Survival mode is a mode, and it is allowed to be the one I'm in.",
  "I am the adult in the room, and I am allowed to be a tired one.",
  "My feelings are information, not verdicts.",
  "I didn't lose myself. I'm in the middle of becoming someone.",
  "Ten minutes that are mine is not stealing from my family.",
  "I can be frustrated with my child and still be safe for my child.",
  "Patience is a tank, not a personality. Mine can be refilled.",
  "I will not apologize to a toddler for having limits.",
  "Today I will drop one standard that was never mine to begin with.",
  "The mother I compare myself to is also comparing herself to someone.",
  "I am doing an enormous job with very little sleep. That counts.",
  "I can say no this week and the world will keep turning.",
  "Screens on a hard afternoon are a tool, not a verdict.",
  "My rest makes me more present, not less.",
  "I am allowed to miss who I was and love who I'm raising.",
  "A messy house with a rested mother is a win.",
  "I can breathe out longer than I breathe in. That is enough for right now.",
  "This hour is not the rest of my life. It just feels that way at 4 p.m.",
  "I am one person. I do not have to be the village by myself.",
  "Guilt is proof I care, not proof I did something wrong.",
  "My child needs a mother who comes back, not one who never leaves.",
  "I am allowed to eat lunch sitting down.",
  "The baby is safe. I can take sixty seconds in the hallway.",
  "I do not have to enjoy every stage to be a loving parent.",
  "Cereal for dinner is still dinner.",
  "I am more than the name 'Mama,' and that is not a betrayal.",
  "I can be the calm one later. Right now I can be the honest one.",
  "A nap is not wasted time. It is the best use of the time.",
  "I did not sleep, and I still showed up. That is the whole job today.",
  "I am allowed to want things that are only for me.",
  "My child will remember that I came back, not that I was perfect.",
  "Lowering the bar until I can step over it is a strategy, not a failure.",
  "I can ask for the specific help I need, out loud, today.",
  "Tired isn't a character flaw. It's a status report.",
  "My body is not a problem to solve. It is the thing carrying all of this.",
  "I am allowed to put myself on the list.",
  "Every mother I admire has had a day exactly like this one.",
  "The next thing. Just the next thing.",
  "I can be a work in progress and a whole person at the same time.",
  "What my kids need most today is a mother who isn't running on empty.",
  "I am allowed to find this hard without finding it unbearable.",
  "A low, slow voice teaches more than a loud one.",
  "I can forgive myself for this morning before this afternoon starts.",
  "I don't have to earn the right to sit down.",
  "My needs and my children's needs can both be real at once.",
  "The season is real, and so is its end.",
  "I will treat myself today the way I'd treat a friend having this day.",
  "I am allowed to be proud of surviving an ordinary Tuesday.",
  "There is no prize for doing this alone.",
  "The feeling will pass. The love is already here.",
  "I am enough for today, and today is all I have to be enough for.",
];

function dayOfYear() {
  const now = new Date();
  return Math.floor((Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()) - Date.UTC(now.getFullYear(), 0, 0)) / 86400000);
}

export default function DailyAffirmation() {
  const todayIdx = dayOfYear() % AFFIRMATIONS.length;
  const [idx, setIdx] = useState(todayIdx);
  const [styleKey, setStyleKey] = useState("sky");
  const [msg, setMsg] = useState("");
  const canvasRef = useRef(null);
  const text = AFFIRMATIONS[idx];
  const isToday = idx === todayIdx;
  const dateLabel = new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });

  useEffect(() => {
    drawCard(canvasRef.current, { eyebrow: isToday ? "Today's affirmation for moms" : "An affirmation for moms", text, styleKey });
  }, [idx, styleKey]);

  const flash = (t) => { setMsg(t); setTimeout(() => setMsg(""), 2500); };
  const shareBody = `“${text}”\n\nDaily affirmation for moms: https://baby.chparenting.com/tools/daily-affirmation-for-moms/`;

  const btn = "px-4 py-2 rounded-full text-sm font-semibold transition-colors";

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
      <div className="card">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-xs font-bold tracking-wider uppercase text-[#2E6FB8]">{isToday ? "Today's affirmation" : "An affirmation for you"}</p>
          <p className="text-sm text-[#6B7B91]">{dateLabel}</p>
        </div>
        <blockquote className="mt-5 text-2xl md:text-3xl leading-snug font-semibold text-[#1E3A5F]">
          “{text}”
        </blockquote>
        <div className="mt-6 flex flex-wrap gap-2">
          <button className={`${btn} bg-[#5B9BD5] text-white hover:bg-[#2E6FB8]`} onClick={() => downloadCanvas(canvasRef.current, `affirmation-${idx + 1}.png`)}>Download card</button>
          <button className={`${btn} border-2 border-[#5B9BD5] text-[#2E6FB8] hover:bg-[#E6F0FB]`} onClick={async () => flash((await copyText(shareBody)) ? "Copied!" : "Copy failed. Select the text instead.")}>Copy</button>
          <button className={`${btn} border-2 border-[#5B9BD5] text-[#2E6FB8] hover:bg-[#E6F0FB]`} onClick={async () => { const r = await shareText("Daily affirmation for moms", shareBody); if (r === "copied") flash("Sharing isn't available here, so the text was copied."); }}>Share</button>
          <button className={`${btn} border-2 border-[#5B9BD5] text-[#2E6FB8] hover:bg-[#E6F0FB]`} onClick={() => { let n = idx; while (n === idx) n = Math.floor(Math.random() * AFFIRMATIONS.length); setIdx(n); }}>Another one</button>
          {!isToday && <button className={`${btn} text-[#6B7B91] hover:text-[#2E6FB8]`} onClick={() => setIdx(todayIdx)}>Back to today</button>}
        </div>
        {msg && <p className="mt-3 text-sm text-[#2E6FB8]">{msg}</p>}
        <p className="mt-5 text-xs text-[#6B7B91]">One sentence changes every day. Save the card to your phone, set it as a lock screen, or send it to a friend having the same kind of day.</p>
      </div>
      <div>
        <p className="text-xs font-bold tracking-wider uppercase text-[#6B7B91] mb-3">Card preview</p>
        <canvas ref={canvasRef} width="1080" height="1080" className="w-full rounded-2xl shadow-lg border border-blue-100" aria-label="Affirmation card preview" />
        <div className="mt-3 flex flex-wrap gap-2">
          {Object.values(CARD_STYLES).map((s) => (
            <button key={s.key} onClick={() => setStyleKey(s.key)} className={`px-3 py-1.5 rounded-full text-xs font-semibold border-2 ${styleKey === s.key ? "border-[#2E6FB8] bg-[#E6F0FB] text-[#2E6FB8]" : "border-blue-100 text-[#6B7B91]"}`}>{s.label}</button>
          ))}
        </div>
      </div>
    </div>
  );
}
