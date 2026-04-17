import { useState, useEffect } from "react";

const STORAGE_KEY = "baby-milestone-checker";

const MILESTONE_DATA = {
  1: {
    label: "1 Month",
    physical: [
      "Lifts head briefly when on tummy",
      "Makes jerky, quivering arm movements",
      "Brings hands within range of eyes and mouth",
      "Moves head from side to side while lying on stomach",
    ],
    cognitive: [
      "Focuses on objects 8-12 inches away",
      "Prefers black and white or high-contrast patterns",
      "Recognizes some sounds including parent's voice",
      "Briefly tracks moving objects with eyes",
    ],
    social: [
      "Begins to develop a social smile",
      "Enjoys being held and cuddled",
      "Quiets down or smiles when spoken to",
      "Prefers looking at faces over other shapes",
    ],
    language: [
      "Cries to communicate needs",
      "Makes small throaty sounds",
      "Listens to speech and may startle at loud sounds",
      "Begins to coo with vowel-like sounds",
    ],
  },
  2: {
    label: "2 Months",
    physical: [
      "Holds head up and begins to push up during tummy time",
      "Makes smoother arm and leg movements",
      "Opens and closes hands",
      "Brings hands to mouth",
    ],
    cognitive: [
      "Pays attention to faces",
      "Begins to follow things with eyes",
      "Recognizes people at a distance",
      "Begins to act bored if activity doesn't change (cries or fusses)",
    ],
    social: [
      "Begins to smile at people",
      "Can briefly calm self (may bring hands to mouth)",
      "Tries to look at parent",
      "Coos and makes gurgling sounds",
    ],
    language: [
      "Coos and makes gurgling sounds",
      "Turns head toward sounds",
      "Begins to follow sounds with eyes",
      "Makes different cries for different needs",
    ],
  },
  3: {
    label: "3 Months",
    physical: [
      "Raises head and chest when on tummy",
      "Opens and closes hands",
      "Pushes down on legs when feet placed on firm surface",
      "Grasps and shakes hand toys",
    ],
    cognitive: [
      "Watches faces intently",
      "Follows moving objects with eyes",
      "Recognizes familiar objects and people at a distance",
      "Starts using hands and eyes in coordination",
    ],
    social: [
      "Smiles spontaneously, especially at people",
      "Enjoys playing with others and may cry when playing stops",
      "More communicative with face and body",
      "Imitates some movements and facial expressions",
    ],
    language: [
      "Babbles with vowel sounds (ah, oh)",
      "Imitates some sounds",
      "Turns head toward direction of sound",
      "Begins to babble and imitate some sounds",
    ],
  },
  4: {
    label: "4 Months",
    physical: [
      "Holds head steady without support",
      "Pushes up on elbows during tummy time",
      "May be able to roll from tummy to back",
      "Reaches for toys with one hand",
    ],
    cognitive: [
      "Reaches for toy with one hand",
      "Uses hands and eyes together (sees a toy and reaches)",
      "Follows moving things with eyes side to side",
      "Watches faces closely and recognizes familiar people",
    ],
    social: [
      "Smiles spontaneously at people",
      "Enjoys playing and may cry when playing stops",
      "Copies some movements and facial expressions",
      "Begins to show emotions like happiness and sadness",
    ],
    language: [
      "Begins to babble with consonant sounds",
      "Babbles with expression and copies sounds heard",
      "Cries in different ways for hunger, pain, and tiredness",
      "Laughs out loud",
    ],
  },
  6: {
    label: "6 Months",
    physical: [
      "Rolls over in both directions (front to back and back to front)",
      "Begins to sit without support",
      "Rocks back and forth on hands and knees",
      "Passes objects from one hand to another",
    ],
    cognitive: [
      "Looks around at things nearby",
      "Brings things to mouth to explore",
      "Shows curiosity about things and tries to get out of reach",
      "Begins to pass things from one hand to another",
    ],
    social: [
      "Knows familiar faces and begins to know strangers",
      "Likes to play with others, especially parents",
      "Responds to other people's emotions",
      "Likes to look at self in mirror",
    ],
    language: [
      "Responds to own name",
      "Makes sounds to show joy and displeasure",
      "Begins to say consonant sounds (babbling with m, b)",
      "Responds to sounds by making sounds",
    ],
  },
  9: {
    label: "9 Months",
    physical: [
      "Stands holding on to furniture",
      "Can get into sitting position",
      "Crawls (may army crawl, scoot, or traditional crawl)",
      "Picks up small objects with thumb and finger (pincer grasp developing)",
    ],
    cognitive: [
      "Watches the path of something as it falls",
      "Looks for things hidden under covers (object permanence)",
      "Plays peek-a-boo",
      "Puts things in mouth and explores with fingers",
    ],
    social: [
      "May be afraid of strangers (stranger anxiety)",
      "May be clingy with familiar adults",
      "Has favorite toys",
      "Understands no (may not always obey)",
    ],
    language: [
      "Understands 'no'",
      "Makes different sounds like 'mamamama' and 'babababa'",
      "Copies sounds and gestures of others",
      "Uses fingers to point at things",
    ],
  },
  12: {
    label: "12 Months",
    physical: [
      "Pulls to stand and walks holding on to furniture (cruising)",
      "May take a few steps without holding on",
      "May stand alone briefly",
      "Uses pincer grasp (thumb and forefinger)",
    ],
    cognitive: [
      "Explores things in different ways (shaking, banging, throwing)",
      "Finds hidden things easily",
      "Looks at right picture or thing when named",
      "Copies gestures and begins to use things correctly (cup, brush)",
    ],
    social: [
      "Is shy or nervous with strangers",
      "Cries when mom or dad leaves",
      "Has favorite things and people",
      "Hands you a book when wants a story",
    ],
    language: [
      "Says 'mama' and 'dada' and 1-2 other words",
      "Responds to simple spoken requests",
      "Uses simple gestures like shaking head 'no' or waving 'bye-bye'",
      "Tries to say words you say",
    ],
  },
  15: {
    label: "15 Months",
    physical: [
      "Walks independently (may be unsteady)",
      "Stoops to pick up objects",
      "Stacks 2 blocks",
      "Uses spoon and cup with help",
    ],
    cognitive: [
      "Knows what ordinary things are for (phone, brush, spoon)",
      "Points to get attention of others",
      "Shows interest in a doll or stuffed animal by pretending to feed",
      "Points to one body part when asked",
    ],
    social: [
      "Copies what other children and adults do",
      "Shows you an object they like",
      "Claps when excited",
      "Hugs stuffed dolls or other toys",
    ],
    language: [
      "Says 3-5 words besides 'mama' and 'dada'",
      "Follows 1-step verbal commands with gestures",
      "Points to show you something interesting",
      "Says 'no' and shakes head",
    ],
  },
  18: {
    label: "18 Months",
    physical: [
      "Walks alone without help",
      "May walk up steps and run",
      "Pulls toys while walking",
      "Can help undress self and stacks 2-4 blocks",
    ],
    cognitive: [
      "Knows what ordinary things are used for",
      "Points to get the attention of others",
      "Shows interest in doll or stuffed animal by pretending to feed",
      "Points to one body part when asked",
    ],
    social: [
      "May have temper tantrums",
      "May be afraid of strangers but shows affection to familiar people",
      "Plays simple pretend (feeds a doll)",
      "May cling to caregivers in new situations",
    ],
    language: [
      "Says several single words (at least 5-10)",
      "Points to show someone what they want",
      "Says and shakes head 'no'",
      "Points to at least one body part when asked",
    ],
  },
  24: {
    label: "24 Months",
    physical: [
      "Stands on tiptoe",
      "Kicks a ball",
      "Begins to run",
      "Walks up and down stairs holding on",
    ],
    cognitive: [
      "Finds things hidden under 2-3 covers",
      "Begins to sort shapes and colors",
      "Completes sentences and rhymes in familiar books",
      "Plays simple make-believe games",
    ],
    social: [
      "Copies others, especially adults and older children",
      "Gets excited when with other children",
      "Shows more independence and sometimes defiant behavior",
      "Plays mainly beside other children (parallel play)",
    ],
    language: [
      "Uses 2-word phrases like 'more milk' or 'go outside'",
      "Knows names of familiar people and body parts",
      "Points to things in a book when named",
      "Follows simple 2-step instructions",
    ],
  },
};

const AGE_OPTIONS = [1, 2, 3, 4, 6, 9, 12, 15, 18, 24];
const CATEGORIES = [
  { key: "physical", label: "Physical", icon: "💪", color: "#3B82F6" },
  { key: "cognitive", label: "Cognitive", icon: "🧠", color: "#8B5CF6" },
  { key: "social", label: "Social & Emotional", icon: "❤️", color: "#EF4444" },
  { key: "language", label: "Language", icon: "🗣️", color: "#10B981" },
];

const WHEN_TO_TALK = [
  "Baby doesn't respond to loud sounds",
  "Baby doesn't watch things as they move (by 2 months)",
  "Baby doesn't smile at people (by 3 months)",
  "Baby doesn't bring things to mouth (by 4 months)",
  "Baby doesn't reach for things (by 5 months)",
  "Baby doesn't sit with help (by 6 months)",
  "Baby doesn't bear weight on legs when held upright (by 6 months)",
  "Baby doesn't babble (by 9 months)",
  "Baby doesn't crawl or scoot (by 12 months)",
  "Baby doesn't stand when supported (by 12 months)",
  "Baby doesn't say any words (by 16 months)",
  "Baby doesn't walk (by 18 months)",
  "Baby loses skills they once had",
];

function loadChecked() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}"); } catch { return {}; }
}

function saveChecked(data) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch {}
}

export default function MilestoneChecker() {
  const [selectedAge, setSelectedAge] = useState(6);
  const [checked, setChecked] = useState({});

  useEffect(() => { setChecked(loadChecked()); }, []);

  const toggleCheck = (ageKey, category, index) => {
    const key = `${ageKey}-${category}-${index}`;
    const updated = { ...checked, [key]: !checked[key] };
    setChecked(updated);
    saveChecked(updated);
  };

  const milestones = MILESTONE_DATA[selectedAge];
  if (!milestones) return null;

  // Calculate progress
  const getProgress = (category) => {
    const items = milestones[category];
    const checkedCount = items.filter((_, i) => checked[`${selectedAge}-${category}-${i}`]).length;
    return { total: items.length, done: checkedCount, pct: Math.round((checkedCount / items.length) * 100) };
  };

  const allItems = CATEGORIES.reduce((sum, c) => sum + milestones[c.key].length, 0);
  const allChecked = CATEGORIES.reduce((sum, c) => {
    return sum + milestones[c.key].filter((_, i) => checked[`${selectedAge}-${c.key}-${i}`]).length;
  }, 0);
  const overallPct = Math.round((allChecked / allItems) * 100);

  const getMessage = (pct) => {
    if (pct === 100) return "All milestones checked! Your baby is doing great!";
    if (pct >= 75) return "Wonderful progress! Your baby is developing well.";
    if (pct >= 50) return "Good progress! Every baby develops at their own pace.";
    if (pct >= 25) return "Keep tracking! Babies reach milestones at different times.";
    return "Just getting started! Remember, each baby has their own timeline.";
  };

  return (
    <div className="card">
      {/* Disclaimer */}
      <div className="mb-6 p-4 bg-amber-50 border-2 border-amber-200 rounded-xl">
        <p className="text-sm text-amber-800 font-medium">
          This tool is for informational purposes only. It is NOT a diagnostic
          tool. Every baby develops at their own pace. Always discuss any
          developmental concerns with your pediatrician.
        </p>
      </div>

      {/* Age selector */}
      <div className="mb-6">
        <label className="text-sm font-semibold text-[#1E293B] mb-3 block">Select baby's age</label>
        <div className="flex flex-wrap gap-2">
          {AGE_OPTIONS.map((age) => (
            <button key={age} type="button" onClick={() => setSelectedAge(age)}
              className={`px-4 py-2 text-sm font-semibold rounded-full transition ${
                selectedAge === age ? "bg-[#3B82F6] text-white" : "bg-blue-50 text-[#1E293B] hover:bg-blue-100"
              }`}>
              {age}m
            </button>
          ))}
        </div>
      </div>

      <h2 className="text-xl font-bold text-[#1E293B] mb-2">
        {milestones.label} Milestones
      </h2>

      {/* Overall progress */}
      <div className="mb-6 p-4 bg-blue-50 rounded-xl">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-[#1E293B]">Overall Progress</span>
          <span className="font-mono text-lg font-bold text-[#3B82F6]">{overallPct}%</span>
        </div>
        <div className="h-3 bg-blue-100 rounded-full overflow-hidden">
          <div className="h-full bg-[#3B82F6] rounded-full transition-all duration-300"
            style={{ width: `${overallPct}%` }} />
        </div>
        <p className="mt-2 text-sm text-[#1E293B]">{getMessage(overallPct)}</p>
      </div>

      {/* Category progress bars */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {CATEGORIES.map((cat) => {
          const prog = getProgress(cat.key);
          return (
            <div key={cat.key} className="bg-blue-50 rounded-xl p-3 text-center">
              <p className="text-lg mb-1">{cat.icon}</p>
              <p className="text-xs font-semibold text-[#1E293B] mb-1">{cat.label}</p>
              <p className="font-mono text-sm font-bold" style={{ color: cat.color }}>{prog.pct}%</p>
              <div className="h-1.5 bg-blue-100 rounded-full mt-1 overflow-hidden">
                <div className="h-full rounded-full transition-all duration-300"
                  style={{ width: `${prog.pct}%`, backgroundColor: cat.color }} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Milestone checklists */}
      <div className="space-y-6 mb-6">
        {CATEGORIES.map((cat) => (
          <div key={cat.key}>
            <h3 className="text-sm font-bold uppercase tracking-wide mb-3 flex items-center gap-2"
              style={{ color: cat.color }}>
              {cat.icon} {cat.label}
            </h3>
            <div className="space-y-2">
              {milestones[cat.key].map((milestone, i) => {
                const key = `${selectedAge}-${cat.key}-${i}`;
                return (
                  <label key={key} className={`flex items-start gap-3 p-3 rounded-xl cursor-pointer transition ${
                    checked[key] ? "bg-[#D1FAE5]" : "bg-blue-50 hover:bg-blue-100"
                  }`}>
                    <input type="checkbox" checked={!!checked[key]}
                      onChange={() => toggleCheck(selectedAge, cat.key, i)}
                      className="mt-0.5 w-5 h-5 rounded accent-[#3B82F6] shrink-0" />
                    <span className={`text-sm ${checked[key] ? "text-green-700 line-through" : "text-[#1E293B]"}`}>
                      {milestone}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* When to talk to doctor */}
      <div className="p-4 rounded-xl border-2 border-red-100 mb-6">
        <h3 className="text-sm font-bold text-red-600 uppercase tracking-wide mb-3">
          When to Talk to Your Doctor
        </h3>
        <p className="text-sm text-[#1E293B] mb-3">
          Contact your pediatrician if you notice any of the following:
        </p>
        <ul className="space-y-2">
          {WHEN_TO_TALK.map((item, i) => (
            <li key={i} className="flex gap-2 text-sm text-[#1E293B]">
              <span className="text-red-400 shrink-0">*</span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      <p className="text-xs text-[#9CA3AF] italic text-center">
        Milestones based on CDC developmental milestone guidelines.
        Every child develops at their own pace. This tool is for tracking
        purposes only and is not a substitute for professional medical advice.
        Your checked milestones are saved locally on your device.
      </p>
    </div>
  );
}
