import { useState } from "react";

const NAMES = [
  { name: "Olivia", gender: "girl", origin: "Latin", style: "Classic", syllables: 4 },
  { name: "Liam", gender: "boy", origin: "Irish", style: "Classic", syllables: 1 },
  { name: "Emma", gender: "girl", origin: "German", style: "Classic", syllables: 2 },
  { name: "Noah", gender: "boy", origin: "Hebrew", style: "Biblical", syllables: 2 },
  { name: "Ava", gender: "girl", origin: "Latin", style: "Classic", syllables: 2 },
  { name: "Oliver", gender: "boy", origin: "Latin", style: "Classic", syllables: 3 },
  { name: "Sophia", gender: "girl", origin: "Greek", style: "Classic", syllables: 3 },
  { name: "Elijah", gender: "boy", origin: "Hebrew", style: "Biblical", syllables: 3 },
  { name: "Luna", gender: "girl", origin: "Latin", style: "Nature", syllables: 2 },
  { name: "James", gender: "boy", origin: "Hebrew", style: "Classic", syllables: 1 },
  { name: "Willow", gender: "girl", origin: "English", style: "Nature", syllables: 2 },
  { name: "Theodore", gender: "boy", origin: "Greek", style: "Classic", syllables: 3 },
  { name: "Isla", gender: "girl", origin: "Scottish", style: "Modern", syllables: 2 },
  { name: "Henry", gender: "boy", origin: "German", style: "Royal", syllables: 2 },
  { name: "Aurora", gender: "girl", origin: "Latin", style: "Nature", syllables: 3 },
  { name: "Sebastian", gender: "boy", origin: "Greek", style: "Classic", syllables: 4 },
  { name: "Ivy", gender: "girl", origin: "English", style: "Nature", syllables: 2 },
  { name: "Caleb", gender: "boy", origin: "Hebrew", style: "Biblical", syllables: 2 },
  { name: "Chloe", gender: "girl", origin: "Greek", style: "Classic", syllables: 2 },
  { name: "Alexander", gender: "boy", origin: "Greek", style: "Royal", syllables: 4 },
  { name: "Hazel", gender: "girl", origin: "English", style: "Nature", syllables: 2 },
  { name: "William", gender: "boy", origin: "German", style: "Royal", syllables: 2 },
  { name: "Violet", gender: "girl", origin: "Latin", style: "Nature", syllables: 3 },
  { name: "Benjamin", gender: "boy", origin: "Hebrew", style: "Biblical", syllables: 3 },
  { name: "Charlotte", gender: "girl", origin: "French", style: "Royal", syllables: 2 },
  { name: "Leo", gender: "boy", origin: "Latin", style: "Modern", syllables: 2 },
  { name: "Penelope", gender: "girl", origin: "Greek", style: "Classic", syllables: 4 },
  { name: "Jack", gender: "boy", origin: "English", style: "Classic", syllables: 1 },
  { name: "Eleanor", gender: "girl", origin: "French", style: "Royal", syllables: 3 },
  { name: "Owen", gender: "boy", origin: "Welsh", style: "Classic", syllables: 2 },
  { name: "Nora", gender: "girl", origin: "Irish", style: "Classic", syllables: 2 },
  { name: "Lucas", gender: "boy", origin: "Greek", style: "Classic", syllables: 2 },
  { name: "Mila", gender: "girl", origin: "Slavic", style: "Modern", syllables: 2 },
  { name: "Samuel", gender: "boy", origin: "Hebrew", style: "Biblical", syllables: 3 },
  { name: "Scarlett", gender: "girl", origin: "English", style: "Modern", syllables: 2 },
  { name: "Gabriel", gender: "boy", origin: "Hebrew", style: "Biblical", syllables: 3 },
  { name: "Aria", gender: "girl", origin: "Italian", style: "Modern", syllables: 3 },
  { name: "Daniel", gender: "boy", origin: "Hebrew", style: "Biblical", syllables: 3 },
  { name: "Evelyn", gender: "girl", origin: "English", style: "Classic", syllables: 3 },
  { name: "Arthur", gender: "boy", origin: "Celtic", style: "Royal", syllables: 2 },
  { name: "Stella", gender: "girl", origin: "Latin", style: "Classic", syllables: 2 },
  { name: "Oscar", gender: "boy", origin: "Irish", style: "Classic", syllables: 2 },
  { name: "Layla", gender: "girl", origin: "Arabic", style: "Classic", syllables: 2 },
  { name: "Felix", gender: "boy", origin: "Latin", style: "Classic", syllables: 2 },
  { name: "Iris", gender: "girl", origin: "Greek", style: "Nature", syllables: 2 },
  { name: "Hugo", gender: "boy", origin: "German", style: "Modern", syllables: 2 },
  { name: "Freya", gender: "girl", origin: "Norse", style: "Unique", syllables: 2 },
  { name: "Finn", gender: "boy", origin: "Irish", style: "Modern", syllables: 1 },
  { name: "Clara", gender: "girl", origin: "Latin", style: "Classic", syllables: 2 },
  { name: "Jasper", gender: "boy", origin: "Persian", style: "Unique", syllables: 2 },
  { name: "Thea", gender: "girl", origin: "Greek", style: "Modern", syllables: 2 },
  { name: "Ezra", gender: "boy", origin: "Hebrew", style: "Biblical", syllables: 2 },
  { name: "Dahlia", gender: "girl", origin: "Scandinavian", style: "Nature", syllables: 3 },
  { name: "Silas", gender: "boy", origin: "Latin", style: "Biblical", syllables: 2 },
  { name: "Genevieve", gender: "girl", origin: "French", style: "Royal", syllables: 4 },
  { name: "August", gender: "boy", origin: "Latin", style: "Royal", syllables: 2 },
  { name: "Cecilia", gender: "girl", origin: "Latin", style: "Classic", syllables: 4 },
  { name: "Rhys", gender: "boy", origin: "Welsh", style: "Modern", syllables: 1 },
  { name: "Eloise", gender: "girl", origin: "French", style: "Classic", syllables: 3 },
  { name: "Kai", gender: "boy", origin: "Hawaiian", style: "Nature", syllables: 1 },
  { name: "Juniper", gender: "girl", origin: "Latin", style: "Nature", syllables: 3 },
  { name: "Orion", gender: "boy", origin: "Greek", style: "Unique", syllables: 3 },
  { name: "Lyra", gender: "girl", origin: "Greek", style: "Unique", syllables: 2 },
  { name: "Ethan", gender: "boy", origin: "Hebrew", style: "Biblical", syllables: 2 },
  { name: "Maeve", gender: "girl", origin: "Irish", style: "Unique", syllables: 1 },
  { name: "Atlas", gender: "boy", origin: "Greek", style: "Unique", syllables: 2 },
  { name: "Amina", gender: "girl", origin: "Arabic", style: "Classic", syllables: 3 },
  { name: "Soren", gender: "boy", origin: "Scandinavian", style: "Unique", syllables: 2 },
  { name: "Hana", gender: "girl", origin: "Japanese", style: "Nature", syllables: 2 },
  { name: "Beckett", gender: "boy", origin: "English", style: "Modern", syllables: 2 },
  { name: "Sienna", gender: "girl", origin: "Italian", style: "Modern", syllables: 3 },
  { name: "Tobias", gender: "boy", origin: "Hebrew", style: "Biblical", syllables: 3 },
  { name: "Elowen", gender: "girl", origin: "Cornish", style: "Nature", syllables: 3 },
  { name: "Atticus", gender: "boy", origin: "Latin", style: "Unique", syllables: 3 },
  { name: "Sakura", gender: "girl", origin: "Japanese", style: "Nature", syllables: 3 },
  { name: "Cyrus", gender: "boy", origin: "Persian", style: "Unique", syllables: 2 },
  { name: "Zara", gender: "girl", origin: "Arabic", style: "Modern", syllables: 2 },
];

function detectStyle(name) {
  const found = NAMES.find((n) => n.name.toLowerCase() === name.toLowerCase());
  if (found) return { style: found.style, origin: found.origin, syllables: found.syllables, letter: found.name[0].toUpperCase() };
  return { style: "Classic", origin: "Unknown", syllables: name.split(/[aeiouy]+/i).length - 1 || 2, letter: name[0]?.toUpperCase() || "A" };
}

function scoreName(candidate, siblingInfo, allowSameLetter) {
  let score = 0;
  const reasons = [];

  if (candidate.style === siblingInfo.style) {
    score += 3;
    reasons.push(`Same ${candidate.style} style`);
  }
  if (candidate.origin === siblingInfo.origin) {
    score += 3;
    reasons.push(`Same ${candidate.origin} origin`);
  }
  const syllDiff = Math.abs(candidate.syllables - siblingInfo.syllables);
  if (syllDiff <= 1) {
    score += 2;
    reasons.push("Balanced syllable count");
  }
  if (!allowSameLetter && candidate.name[0].toUpperCase() === siblingInfo.letter) {
    score -= 2;
  }
  if (allowSameLetter && candidate.name[0].toUpperCase() === siblingInfo.letter) {
    score += 2;
    reasons.push(`Both start with ${siblingInfo.letter}`);
  }
  if (reasons.length === 0) reasons.push("Fresh and complementary choice");
  return { score, reason: reasons[0] };
}

const STORAGE_KEY = "sibling-name-favorites";
function loadFavorites() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"); } catch { return []; }
}
function saveFavorites(favs) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(favs)); } catch {}
}

export default function SiblingNameMatcher() {
  const [siblingName, setSiblingName] = useState("");
  const [gender, setGender] = useState("girl");
  const [sameLetter, setSameLetter] = useState(false);
  const [results, setResults] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searched, setSearched] = useState(false);

  useState(() => { setFavorites(loadFavorites()); });

  const findMatches = () => {
    if (!siblingName.trim()) return;
    const info = detectStyle(siblingName.trim());
    const candidates = NAMES
      .filter((n) => n.gender === gender || n.gender === "neutral")
      .filter((n) => n.name.toLowerCase() !== siblingName.trim().toLowerCase())
      .map((n) => {
        const { score, reason } = scoreName(n, info, sameLetter);
        return { ...n, score, reason };
      })
      .sort((a, b) => b.score - a.score);

    // Take top 6, with some randomization among equal scores
    const top = candidates.slice(0, 12);
    const shuffled = top.sort(() => Math.random() - 0.5).slice(0, 6);
    setResults(shuffled);
    setSearched(true);
  };

  const toggleFavorite = (name) => {
    let updated;
    if (favorites.includes(name)) {
      updated = favorites.filter((f) => f !== name);
    } else {
      updated = [...favorites, name];
    }
    setFavorites(updated);
    saveFavorites(updated);
  };

  return (
    <div className="card">
      {/* Input */}
      <div className="space-y-4 mb-6">
        <div>
          <label className="text-sm font-semibold text-[#1E293B] mb-2 block">Existing child's name</label>
          <input
            type="text"
            value={siblingName}
            onChange={(e) => setSiblingName(e.target.value)}
            placeholder="e.g., Liam"
            className="w-full px-4 py-3 border-2 border-blue-200 rounded-xl bg-white focus:border-[#3B82F6] focus:outline-none text-lg"
          />
        </div>
        <div>
          <label className="text-sm font-semibold text-[#1E293B] mb-2 block">New baby's gender</label>
          <div className="flex gap-2">
            {["girl", "boy"].map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => setGender(g)}
                className={`flex-1 px-4 py-2 text-sm font-semibold rounded-full transition capitalize ${
                  gender === g ? "bg-[#3B82F6] text-white" : "bg-blue-50 text-[#1E293B] hover:bg-blue-100"
                }`}
              >
                {g === "girl" ? "Girl" : "Boy"}
              </button>
            ))}
          </div>
        </div>
        <label className="flex items-center gap-2 text-sm text-[#1E293B]">
          <input
            type="checkbox"
            checked={sameLetter}
            onChange={(e) => setSameLetter(e.target.checked)}
            className="accent-[#3B82F6] w-4 h-4"
          />
          Prefer names starting with the same letter
        </label>
        <button
          type="button"
          onClick={findMatches}
          className="w-full px-6 py-3 bg-[#3B82F6] text-white font-bold rounded-full hover:bg-[#1D4ED8] transition text-lg"
        >
          Find Matching Names
        </button>
      </div>

      {/* Results */}
      {searched && results.length > 0 && (
        <div className="mb-6">
          <h3 className="text-sm font-bold text-[#1E293B] uppercase tracking-wide mb-3">
            Names that pair well with {siblingName}
          </h3>
          <div className="grid gap-2 sm:grid-cols-2">
            {results.map((r) => (
              <div key={r.name} className="p-4 bg-blue-50 rounded-xl flex items-start justify-between">
                <div>
                  <p className="font-bold text-[#1E293B] text-lg">{r.name}</p>
                  <p className="text-xs text-[#3B82F6] font-semibold">{r.origin} | {r.style}</p>
                  <p className="text-xs text-[#9CA3AF] mt-1">{r.reason}</p>
                </div>
                <button
                  type="button"
                  onClick={() => toggleFavorite(r.name)}
                  className="text-xl shrink-0 ml-2"
                  title={favorites.includes(r.name) ? "Remove from favorites" : "Add to favorites"}
                >
                  {favorites.includes(r.name) ? "❤️" : "🤍"}
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={findMatches}
            className="mt-3 px-6 py-2 bg-blue-50 text-[#3B82F6] font-semibold rounded-full hover:bg-blue-100 transition block mx-auto"
          >
            Generate More
          </button>
        </div>
      )}

      {searched && results.length === 0 && (
        <p className="text-center text-[#9CA3AF] py-6">No matches found. Try a different name or gender.</p>
      )}

      {/* Favorites */}
      {favorites.length > 0 && (
        <div className="mt-6 border-t-2 border-blue-100 pt-4">
          <h3 className="text-sm font-bold text-[#1E293B] uppercase tracking-wide mb-3">Your Favorites</h3>
          <div className="flex flex-wrap gap-2">
            {favorites.map((f) => (
              <span key={f} className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 rounded-full text-sm font-semibold text-[#3B82F6]">
                {f}
                <button type="button" onClick={() => toggleFavorite(f)} className="text-red-300 hover:text-red-500 ml-1">x</button>
              </span>
            ))}
          </div>
        </div>
      )}

      <p className="mt-6 text-xs text-[#9CA3AF] italic text-center">
        Name suggestions are based on style, origin, and syllable matching.
        The best name is the one you love!
      </p>
    </div>
  );
}
