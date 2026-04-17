import { useState } from "react";

const MILESTONES = [
  {
    range: "0-3 months",
    minAge: 0,
    maxAge: 3,
    items: [
      { text: "Startles or cries at loud sounds", key: "m1" },
      { text: "Makes cooing or gurgling sounds", key: "m2" },
      { text: "Recognizes parent's voice and calms down", key: "m3" },
      { text: "Turns head toward sounds", key: "m4" },
      { text: "Has different cries for different needs", key: "m5" },
    ],
    activities: [
      "Talk to your baby during diaper changes, feeding, and bath time",
      "Sing songs and lullabies -- repetition helps babies learn",
      "Respond to your baby's coos and sounds by imitating them",
      "Read board books with high-contrast pictures",
    ],
    redFlags: [
      "Does not startle or react to loud sounds",
      "Does not make any sounds by 2 months",
      "Does not seem to recognize your voice",
    ],
  },
  {
    range: "4-6 months",
    minAge: 4,
    maxAge: 6,
    items: [
      { text: "Babbles with consonant sounds (ba-ba, da-da)", key: "m6" },
      { text: "Laughs and squeals", key: "m7" },
      { text: "Responds when you call their name", key: "m8" },
      { text: "Makes sounds to show joy or displeasure", key: "m9" },
      { text: "Watches your mouth when you talk", key: "m10" },
    ],
    activities: [
      "Name objects and people as you point to them",
      "Play peek-a-boo and other interactive games",
      "Describe what you are doing throughout the day (narrate your actions)",
      "Introduce simple gestures like waving bye-bye",
    ],
    redFlags: [
      "No babbling by 6 months",
      "Does not respond to name by 6 months",
      "Does not laugh or make joyful sounds",
      "Seems not to notice sounds",
    ],
  },
  {
    range: "7-12 months",
    minAge: 7,
    maxAge: 12,
    items: [
      { text: "Understands 'no' and simple instructions", key: "m11" },
      { text: "Waves bye-bye", key: "m12" },
      { text: "Says 'mama' or 'dada' with meaning", key: "m13" },
      { text: "Points at objects of interest", key: "m14" },
      { text: "Tries to imitate words", key: "m15" },
      { text: "Uses gestures (shaking head, reaching)", key: "m16" },
    ],
    activities: [
      "Read together daily -- let baby turn pages",
      "Name body parts during dressing and bath time",
      "Play 'Where is it?' games to encourage pointing",
      "Expand on baby's words: if they say 'ba', say 'ball! Yes, the blue ball!'",
    ],
    redFlags: [
      "No babbling or gesture use by 12 months",
      "Does not respond to name consistently",
      "Does not point or wave by 12 months",
      "No single words by 12 months",
    ],
  },
  {
    range: "12-18 months",
    minAge: 12,
    maxAge: 18,
    items: [
      { text: "Says 1-5 words (besides mama/dada)", key: "m17" },
      { text: "Follows simple one-step commands", key: "m18" },
      { text: "Points to show you something interesting", key: "m19" },
      { text: "Knows names of familiar people and objects", key: "m20" },
      { text: "Imitates simple words when asked", key: "m21" },
    ],
    activities: [
      "Ask simple questions: 'Where is the dog?'",
      "Sing action songs (Itsy Bitsy Spider, Head Shoulders Knees and Toes)",
      "Give simple directions: 'Give me the cup'",
      "Read stories and ask baby to point to pictures",
    ],
    redFlags: [
      "No words by 16 months",
      "Does not point to things",
      "Does not follow simple instructions",
      "Loss of previously acquired words",
    ],
  },
  {
    range: "18-24 months",
    minAge: 18,
    maxAge: 24,
    items: [
      { text: "Uses 50 or more words", key: "m22" },
      { text: "Puts 2 words together (e.g., 'more milk', 'daddy go')", key: "m23" },
      { text: "Names familiar objects when asked", key: "m24" },
      { text: "Follows two-step instructions", key: "m25" },
      { text: "Points to pictures in a book when named", key: "m26" },
      { text: "Tries to say 3-word sentences", key: "m27" },
    ],
    activities: [
      "Have conversations -- ask questions and wait for responses",
      "Read longer stories and discuss the pictures",
      "Use descriptive words: 'the big red truck'",
      "Play pretend: talk on a play phone, feed a stuffed animal",
      "Limit screen time -- live interaction builds language best",
    ],
    redFlags: [
      "Fewer than 50 words by 24 months",
      "No two-word combinations by 24 months",
      "Cannot follow simple instructions",
      "Loss of language skills at any point",
      "Does not engage in pretend play",
    ],
  },
];

function getGroupForAge(months) {
  return MILESTONES.find((g) => months >= g.minAge && months < g.maxAge) || MILESTONES[MILESTONES.length - 1];
}

export default function LanguageMilestoneQuiz() {
  const [babyAge, setBabyAge] = useState(6);
  const [checked, setChecked] = useState({});
  const [tab, setTab] = useState("checklist");

  const group = getGroupForAge(babyAge);
  const checkedCount = group.items.filter((item) => checked[item.key]).length;
  const totalItems = group.items.length;
  const score = Math.round((checkedCount / totalItems) * 100);

  const toggleItem = (key) => {
    setChecked({ ...checked, [key]: !checked[key] });
  };

  const getScoreColor = () => {
    if (score >= 80) return "#16A34A";
    if (score >= 50) return "#D97706";
    return "#3B82F6";
  };

  const getScoreLabel = () => {
    if (score >= 80) return "Great progress!";
    if (score >= 50) return "Developing well";
    return "Keep encouraging!";
  };

  return (
    <div className="card">
      {/* Age selector */}
      <div className="mb-6">
        <label className="text-sm font-semibold text-[#1E293B] mb-2 block">Baby's age (months)</label>
        <input
          type="range" min="0" max="24" value={babyAge}
          onChange={(e) => { setBabyAge(parseInt(e.target.value)); setChecked({}); }}
          className="w-full accent-[#3B82F6]"
        />
        <p className="text-center text-sm font-medium text-[#3B82F6] mt-1">
          {babyAge} months old | Milestones: {group.range}
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 p-1 bg-blue-50 rounded-full mb-6">
        {[
          { id: "checklist", label: "Checklist" },
          { id: "activities", label: "Activities" },
          { id: "redflags", label: "When to Ask" },
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

      {tab === "checklist" && (
        <>
          {/* Score */}
          <div className="text-center mb-6 p-4 bg-blue-50 rounded-xl">
            <p className="text-xs text-[#9CA3AF] font-semibold uppercase mb-1">Language Progress ({group.range})</p>
            <p className="font-mono text-3xl font-bold" style={{ color: getScoreColor() }}>
              {checkedCount}/{totalItems}
            </p>
            <p className="text-sm font-semibold" style={{ color: getScoreColor() }}>
              {getScoreLabel()}
            </p>
            {/* Progress bar */}
            <div className="mt-3 bg-blue-100 rounded-full h-3 overflow-hidden max-w-xs mx-auto">
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{ width: `${score}%`, backgroundColor: getScoreColor() }}
              />
            </div>
          </div>

          {/* Checklist */}
          <div className="space-y-2 mb-6">
            {group.items.map((item) => (
              <label
                key={item.key}
                className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition ${
                  checked[item.key] ? "bg-[#D1FAE5]" : "bg-blue-50 hover:bg-blue-100"
                }`}
              >
                <input
                  type="checkbox"
                  checked={!!checked[item.key]}
                  onChange={() => toggleItem(item.key)}
                  className="accent-[#3B82F6] w-5 h-5 shrink-0"
                />
                <span className={`text-sm ${checked[item.key] ? "text-green-700 font-semibold" : "text-[#1E293B]"}`}>
                  {item.text}
                </span>
              </label>
            ))}
          </div>

          {/* All groups overview */}
          <div className="p-4 rounded-xl border-2 border-blue-100">
            <h3 className="text-sm font-bold text-[#1E293B] uppercase tracking-wide mb-3">All Age Ranges</h3>
            <div className="space-y-2">
              {MILESTONES.map((m) => (
                <div
                  key={m.range}
                  className={`flex items-center justify-between py-2 px-3 rounded-lg text-sm ${
                    m.range === group.range ? "bg-blue-50 font-semibold" : ""
                  }`}
                >
                  <span className="text-[#1E293B]">{m.range}</span>
                  <span className="text-[#9CA3AF]">{m.items.length} milestones</span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {tab === "activities" && (
        <div>
          <h3 className="text-sm font-bold text-[#1E293B] uppercase tracking-wide mb-3">
            Activities to Encourage Language ({group.range})
          </h3>
          <div className="space-y-2 mb-6">
            {group.activities.map((act, i) => (
              <div key={i} className="p-3 bg-blue-50 rounded-xl text-sm text-[#1E293B] flex gap-2">
                <span className="text-[#3B82F6] font-bold shrink-0">*</span>
                {act}
              </div>
            ))}
          </div>
          <div className="p-4 bg-[#D1FAE5] rounded-xl text-sm text-[#1E293B]">
            <p className="font-semibold text-[#1D4ED8] mb-1">Key Principle:</p>
            <p>
              The single most effective way to build language skills is through responsive,
              back-and-forth conversation. Talk, sing, read, and respond to your baby every day.
              Language develops best through live human interaction, not screens.
            </p>
          </div>
        </div>
      )}

      {tab === "redflags" && (
        <div>
          <h3 className="text-sm font-bold text-[#1E293B] uppercase tracking-wide mb-3">
            When to Talk to Your Pediatrician ({group.range})
          </h3>
          <p className="text-sm text-[#9CA3AF] mb-4">
            These are potential red flags that warrant a conversation with your child's doctor.
            Early intervention can make a significant difference.
          </p>
          <div className="space-y-2 mb-6">
            {group.redFlags.map((flag, i) => (
              <div key={i} className="p-3 bg-red-50 rounded-xl text-sm text-[#1E293B] flex gap-2">
                <span className="text-red-500 font-bold shrink-0">!</span>
                {flag}
              </div>
            ))}
          </div>
          <div className="p-4 rounded-xl border-2 border-blue-100 text-sm text-[#1E293B]">
            <p className="font-semibold text-[#1D4ED8] mb-2">Important Note:</p>
            <p className="mb-2">
              Every child develops at their own pace, and there is a wide range of normal.
              However, if you notice any red flags or have any concerns, do not wait -- talk to your
              pediatrician. Early identification and intervention for speech and language delays
              leads to better outcomes.
            </p>
            <p>
              Your pediatrician can refer you to a speech-language pathologist for evaluation if needed.
              In the US, early intervention services are available free of charge for children under 3.
            </p>
          </div>
        </div>
      )}

      <p className="mt-6 text-xs text-[#9CA3AF] italic text-center">
        This is an informational tool, not a diagnostic assessment. Milestones are general
        guidelines based on CDC and AAP data. Always consult your pediatrician with any concerns
        about your child's development.
      </p>
    </div>
  );
}
