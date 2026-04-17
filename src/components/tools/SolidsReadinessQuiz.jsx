import { useState } from "react";

const QUESTIONS = [
  {
    id: 1,
    text: "Can your baby sit up with minimal support?",
    info: "Good trunk control is essential for safe swallowing.",
  },
  {
    id: 2,
    text: "Does your baby have good head and neck control?",
    info: "Baby should hold their head steady and upright.",
  },
  {
    id: 3,
    text: "Does your baby show interest in food? (reaching for food, watching you eat)",
    info: "Curiosity about food is a strong readiness sign.",
  },
  {
    id: 4,
    text: "Can your baby move food to the back of their mouth and swallow?",
    info: "This shows the oral motor skills needed for solids.",
  },
  {
    id: 5,
    text: "Has your baby lost the tongue-thrust reflex?",
    info: "Babies push food out with their tongue until this reflex fades (usually around 4-6 months).",
  },
  {
    id: 6,
    text: "Is your baby at least 4 months old?",
    info: "AAP recommends introducing solids around 6 months, but not before 4 months.",
  },
  {
    id: 7,
    text: "Has your baby's birth weight approximately doubled?",
    info: "Weight doubling (usually around 4-6 months) indicates readiness.",
  },
  {
    id: 8,
    text: "Does your baby open their mouth when food approaches?",
    info: "This shows interest and willingness to try eating.",
  },
];

function getResult(score) {
  if (score >= 6) {
    return {
      title: "Ready for Solids!",
      color: "#16A34A",
      bgColor: "#D1FAE5",
      emoji: "🎉",
      message: "Your baby is showing most of the key readiness signs. You can start introducing single-ingredient purees or soft foods. Begin with iron-rich foods like iron-fortified cereal or pureed meats.",
    };
  }
  if (score >= 4) {
    return {
      title: "Almost Ready!",
      color: "#D97706",
      bgColor: "#FEF3C7",
      emoji: "⏳",
      message: "Your baby is showing some readiness signs but not all. Give it a few more weeks and check again. Continue with breast milk or formula as the primary nutrition source.",
    };
  }
  return {
    title: "Not Yet Ready",
    color: "#DC2626",
    bgColor: "#FEE2E2",
    emoji: "💤",
    message: "Your baby is not showing enough readiness signs for solid foods yet. This is completely normal -- every baby develops at their own pace. Continue exclusive breastfeeding or formula feeding.",
  };
}

export default function SolidsReadinessQuiz() {
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);

  const answered = Object.keys(answers).length;
  const score = Object.values(answers).filter(Boolean).length;

  const toggleAnswer = (id, value) => {
    setAnswers({ ...answers, [id]: value });
    setShowResult(false);
  };

  const checkResult = () => {
    setShowResult(true);
  };

  const reset = () => {
    setAnswers({});
    setShowResult(false);
  };

  const result = getResult(score);

  return (
    <div className="card">
      {/* AAP note */}
      <div className="p-3 bg-blue-50 rounded-xl mb-6 text-sm text-[#1E293B]">
        <p className="font-semibold text-[#1D4ED8] mb-1">AAP Recommendation:</p>
        <p>
          The American Academy of Pediatrics recommends exclusive breastfeeding (or formula)
          for about the first 6 months of life. Solids should be introduced around 6 months,
          but not before 4 months.
        </p>
      </div>

      {/* Questions */}
      <div className="space-y-4 mb-6">
        {QUESTIONS.map((q) => (
          <div key={q.id} className="p-4 bg-blue-50 rounded-xl">
            <p className="text-sm font-semibold text-[#1E293B] mb-1">
              {q.id}. {q.text}
            </p>
            <p className="text-xs text-[#9CA3AF] mb-3">{q.info}</p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => toggleAnswer(q.id, true)}
                className={`px-6 py-2 text-sm font-semibold rounded-full transition ${
                  answers[q.id] === true
                    ? "bg-[#3B82F6] text-white"
                    : "bg-white text-[#1E293B] border-2 border-blue-200 hover:border-[#3B82F6]"
                }`}
              >
                Yes
              </button>
              <button
                type="button"
                onClick={() => toggleAnswer(q.id, false)}
                className={`px-6 py-2 text-sm font-semibold rounded-full transition ${
                  answers[q.id] === false
                    ? "bg-[#3B82F6] text-white"
                    : "bg-white text-[#1E293B] border-2 border-blue-200 hover:border-[#3B82F6]"
                }`}
              >
                No
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-[#9CA3AF] mb-1">
          <span>{answered}/8 questions answered</span>
          <span>{score}/8 signs present</span>
        </div>
        <div className="bg-blue-100 rounded-full h-3 overflow-hidden">
          <div
            className="h-full bg-[#3B82F6] rounded-full transition-all duration-300"
            style={{ width: `${(answered / 8) * 100}%` }}
          />
        </div>
      </div>

      {/* Check result */}
      <div className="flex gap-3 justify-center mb-6">
        <button
          type="button"
          onClick={checkResult}
          disabled={answered < 8}
          className={`px-8 py-3 font-bold rounded-full text-lg transition ${
            answered >= 8
              ? "bg-[#3B82F6] text-white hover:bg-[#1D4ED8]"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
        >
          Check Readiness
        </button>
        {answered > 0 && (
          <button
            type="button"
            onClick={reset}
            className="px-6 py-3 bg-blue-50 text-[#3B82F6] font-semibold rounded-full hover:bg-blue-100 transition"
          >
            Reset
          </button>
        )}
      </div>

      {/* Result */}
      {showResult && (
        <div className="rounded-xl p-6 text-center mb-6" style={{ backgroundColor: result.bgColor }}>
          <p className="text-4xl mb-2">{result.emoji}</p>
          <h3 className="text-xl font-bold mb-2" style={{ color: result.color }}>
            {result.title}
          </h3>
          <p className="text-lg font-mono mb-2" style={{ color: result.color }}>
            {score}/8 readiness signs
          </p>
          <p className="text-sm text-[#1E293B] leading-relaxed max-w-lg mx-auto">
            {result.message}
          </p>
        </div>
      )}

      {/* Next steps */}
      {showResult && score >= 6 && (
        <div className="p-4 rounded-xl border-2 border-blue-100 mb-4">
          <h3 className="text-sm font-bold text-[#1E293B] uppercase tracking-wide mb-3">Next Steps</h3>
          <ul className="space-y-2 text-sm text-[#1E293B]">
            <li className="flex gap-2"><span className="text-[#3B82F6] font-bold shrink-0">*</span> Start with single-ingredient foods: iron-fortified cereal, pureed sweet potato, avocado, banana</li>
            <li className="flex gap-2"><span className="text-[#3B82F6] font-bold shrink-0">*</span> Introduce one new food every 3-5 days to watch for allergies</li>
            <li className="flex gap-2"><span className="text-[#3B82F6] font-bold shrink-0">*</span> Continue breastfeeding or formula -- milk remains the primary nutrition source</li>
            <li className="flex gap-2"><span className="text-[#3B82F6] font-bold shrink-0">*</span> Offer food when baby is alert and in a good mood, not overly hungry</li>
            <li className="flex gap-2"><span className="text-[#3B82F6] font-bold shrink-0">*</span> Talk to your pediatrician about introducing common allergens early</li>
          </ul>
        </div>
      )}

      <p className="mt-6 text-xs text-[#9CA3AF] italic text-center">
        This quiz is for informational purposes only and is not a diagnostic tool.
        Always consult your pediatrician before starting solid foods.
      </p>
    </div>
  );
}
