import { useState } from "react";

const NAME_DATA = [
  { name: "Olivia", gender: "girl", origin: "Latin", meaning: "Olive tree, symbol of peace", decades: { "2000s": 4, "2010s": 2, "2020s": 1 }, peak: "2020s", similar: ["Olive", "Livia", "Ophelia"] },
  { name: "Liam", gender: "boy", origin: "Irish", meaning: "Strong-willed warrior", decades: { "2000s": 75, "2010s": 2, "2020s": 1 }, peak: "2020s", similar: ["William", "Levi", "Leo"] },
  { name: "Emma", gender: "girl", origin: "German", meaning: "Whole, universal", decades: { "2000s": 2, "2010s": 1, "2020s": 3 }, peak: "2010s", similar: ["Emily", "Ella", "Emilia"] },
  { name: "Noah", gender: "boy", origin: "Hebrew", meaning: "Rest, comfort", decades: { "2000s": 25, "2010s": 1, "2020s": 2 }, peak: "2010s", similar: ["Jonah", "Micah", "Nolan"] },
  { name: "Ava", gender: "girl", origin: "Latin", meaning: "Life, bird-like", decades: { "2000s": 5, "2010s": 3, "2020s": 5 }, peak: "2010s", similar: ["Eva", "Ivy", "Ada"] },
  { name: "Oliver", gender: "boy", origin: "Latin", meaning: "Olive tree, peaceful one", decades: { "2000s": 88, "2010s": 20, "2020s": 3 }, peak: "2020s", similar: ["Oscar", "Owen", "Otto"] },
  { name: "Sophia", gender: "girl", origin: "Greek", meaning: "Wisdom", decades: { "2000s": 8, "2010s": 1, "2020s": 4 }, peak: "2010s", similar: ["Sophie", "Sofia", "Seraphina"] },
  { name: "Elijah", gender: "boy", origin: "Hebrew", meaning: "My God is Yahweh", decades: { "2000s": 30, "2010s": 8, "2020s": 4 }, peak: "2020s", similar: ["Eli", "Isaiah", "Ezra"] },
  { name: "Charlotte", gender: "girl", origin: "French", meaning: "Free woman", decades: { "2000s": 87, "2010s": 10, "2020s": 3 }, peak: "2020s", similar: ["Clara", "Caroline", "Scarlett"] },
  { name: "James", gender: "boy", origin: "Hebrew", meaning: "Supplanter", decades: { "2000s": 19, "2010s": 12, "2020s": 4 }, peak: "2000s", similar: ["Jack", "Jacob", "Jason"] },
  { name: "Luna", gender: "girl", origin: "Latin", meaning: "Moon", decades: { "2000s": 150, "2010s": 37, "2020s": 10 }, peak: "2020s", similar: ["Stella", "Nova", "Celeste"] },
  { name: "William", gender: "boy", origin: "German", meaning: "Resolute protector", decades: { "2000s": 10, "2010s": 5, "2020s": 6 }, peak: "2000s", similar: ["Liam", "Henry", "Edward"] },
  { name: "Mila", gender: "girl", origin: "Slavic", meaning: "Gracious, dear", decades: { "2000s": 170, "2010s": 22, "2020s": 15 }, peak: "2020s", similar: ["Mia", "Lily", "Isla"] },
  { name: "Benjamin", gender: "boy", origin: "Hebrew", meaning: "Son of the right hand", decades: { "2000s": 22, "2010s": 10, "2020s": 7 }, peak: "2000s", similar: ["Bennett", "Samuel", "Caleb"] },
  { name: "Evelyn", gender: "girl", origin: "English", meaning: "Wished-for child", decades: { "2000s": 150, "2010s": 12, "2020s": 9 }, peak: "2020s", similar: ["Eleanor", "Emery", "Eden"] },
  { name: "Theodore", gender: "boy", origin: "Greek", meaning: "Gift of God", decades: { "2000s": 200, "2010s": 62, "2020s": 10 }, peak: "2020s", similar: ["Thomas", "Tobias", "Felix"] },
  { name: "Harper", gender: "girl", origin: "English", meaning: "Harp player", decades: { "2000s": 150, "2010s": 10, "2020s": 15 }, peak: "2010s", similar: ["Piper", "Hadley", "Quinn"] },
  { name: "Henry", gender: "boy", origin: "German", meaning: "Ruler of the household", decades: { "2000s": 75, "2010s": 25, "2020s": 9 }, peak: "2020s", similar: ["Harry", "Hugo", "Harvey"] },
  { name: "Amelia", gender: "girl", origin: "German", meaning: "Industrious, striving", decades: { "2000s": 150, "2010s": 11, "2020s": 4 }, peak: "2020s", similar: ["Emilia", "Adeline", "Aurelia"] },
  { name: "Alexander", gender: "boy", origin: "Greek", meaning: "Defender of the people", decades: { "2000s": 6, "2010s": 8, "2020s": 12 }, peak: "2000s", similar: ["Alistair", "Andrew", "Adrian"] },
  { name: "Isla", gender: "girl", origin: "Scottish", meaning: "Island", decades: { "2000s": 300, "2010s": 80, "2020s": 12 }, peak: "2020s", similar: ["Iris", "Ivy", "Ada"] },
  { name: "Sebastian", gender: "boy", origin: "Greek", meaning: "Venerable, revered", decades: { "2000s": 68, "2010s": 18, "2020s": 14 }, peak: "2020s", similar: ["Silas", "Atticus", "Augustus"] },
  { name: "Penelope", gender: "girl", origin: "Greek", meaning: "Weaver", decades: { "2000s": 200, "2010s": 30, "2020s": 22 }, peak: "2020s", similar: ["Phoebe", "Genevieve", "Eloise"] },
  { name: "Jack", gender: "boy", origin: "English", meaning: "God is gracious", decades: { "2000s": 35, "2010s": 40, "2020s": 25 }, peak: "2000s", similar: ["Jackson", "Jake", "James"] },
  { name: "Aria", gender: "girl", origin: "Italian", meaning: "Air, song, melody", decades: { "2000s": 300, "2010s": 20, "2020s": 18 }, peak: "2020s", similar: ["Ariana", "Aurora", "Lyra"] },
  { name: "Leo", gender: "boy", origin: "Latin", meaning: "Lion", decades: { "2000s": 200, "2010s": 50, "2020s": 16 }, peak: "2020s", similar: ["Leon", "Leonardo", "Luca"] },
  { name: "Chloe", gender: "girl", origin: "Greek", meaning: "Blooming, fertility", decades: { "2000s": 12, "2010s": 20, "2020s": 30 }, peak: "2000s", similar: ["Zoe", "Phoebe", "Daphne"] },
  { name: "Lucas", gender: "boy", origin: "Greek", meaning: "Light", decades: { "2000s": 40, "2010s": 10, "2020s": 8 }, peak: "2020s", similar: ["Luke", "Luca", "Landon"] },
  { name: "Violet", gender: "girl", origin: "Latin", meaning: "Purple flower", decades: { "2000s": 200, "2010s": 50, "2020s": 35 }, peak: "2020s", similar: ["Iris", "Ivy", "Dahlia"] },
  { name: "Owen", gender: "boy", origin: "Welsh", meaning: "Young warrior", decades: { "2000s": 45, "2010s": 25, "2020s": 20 }, peak: "2020s", similar: ["Evan", "Rowan", "Rhys"] },
  { name: "Nora", gender: "girl", origin: "Irish", meaning: "Honor, light", decades: { "2000s": 200, "2010s": 30, "2020s": 25 }, peak: "2020s", similar: ["Eleanor", "Cora", "Clara"] },
  { name: "Ethan", gender: "boy", origin: "Hebrew", meaning: "Strong, firm", decades: { "2000s": 3, "2010s": 6, "2020s": 15 }, peak: "2000s", similar: ["Evan", "Ian", "Nathan"] },
  { name: "Layla", gender: "girl", origin: "Arabic", meaning: "Night, dark beauty", decades: { "2000s": 200, "2010s": 25, "2020s": 20 }, peak: "2020s", similar: ["Leila", "Lila", "Maya"] },
  { name: "Daniel", gender: "boy", origin: "Hebrew", meaning: "God is my judge", decades: { "2000s": 8, "2010s": 10, "2020s": 15 }, peak: "2000s", similar: ["David", "Dominic", "Declan"] },
  { name: "Willow", gender: "girl", origin: "English", meaning: "Graceful willow tree", decades: { "2000s": 300, "2010s": 65, "2020s": 38 }, peak: "2020s", similar: ["Wren", "Ivy", "Sage"] },
  { name: "Samuel", gender: "boy", origin: "Hebrew", meaning: "God has heard", decades: { "2000s": 25, "2010s": 20, "2020s": 22 }, peak: "2000s", similar: ["Simon", "Seth", "Solomon"] },
  { name: "Scarlett", gender: "girl", origin: "English", meaning: "Red, bright", decades: { "2000s": 200, "2010s": 18, "2020s": 16 }, peak: "2020s", similar: ["Ruby", "Sienna", "Autumn"] },
  { name: "Gabriel", gender: "boy", origin: "Hebrew", meaning: "God is my strength", decades: { "2000s": 30, "2010s": 22, "2020s": 18 }, peak: "2020s", similar: ["Raphael", "Michael", "Elijah"] },
  { name: "Hazel", gender: "girl", origin: "English", meaning: "Hazelnut tree", decades: { "2000s": 300, "2010s": 52, "2020s": 28 }, peak: "2020s", similar: ["Ivy", "Violet", "Olive"] },
  { name: "Finn", gender: "boy", origin: "Irish", meaning: "Fair, handsome", decades: { "2000s": 300, "2010s": 100, "2020s": 50 }, peak: "2020s", similar: ["Flynn", "Felix", "Liam"] },
  { name: "Aurora", gender: "girl", origin: "Latin", meaning: "Dawn", decades: { "2000s": 200, "2010s": 50, "2020s": 30 }, peak: "2020s", similar: ["Luna", "Celeste", "Stella"] },
  { name: "Ezra", gender: "boy", origin: "Hebrew", meaning: "Helper, strong", decades: { "2000s": 200, "2010s": 50, "2020s": 30 }, peak: "2020s", similar: ["Elijah", "Eli", "Asher"] },
  { name: "Stella", gender: "girl", origin: "Latin", meaning: "Star", decades: { "2000s": 200, "2010s": 50, "2020s": 40 }, peak: "2020s", similar: ["Luna", "Nova", "Celeste"] },
  { name: "Oscar", gender: "boy", origin: "Irish", meaning: "Champion warrior", decades: { "2000s": 150, "2010s": 80, "2020s": 60 }, peak: "2020s", similar: ["Otto", "Oliver", "Arthur"] },
  { name: "Ivy", gender: "girl", origin: "English", meaning: "Climbing vine", decades: { "2000s": 300, "2010s": 80, "2020s": 42 }, peak: "2020s", similar: ["Iris", "Ivy", "Fern"] },
  { name: "Felix", gender: "boy", origin: "Latin", meaning: "Happy, fortunate", decades: { "2000s": 300, "2010s": 150, "2020s": 80 }, peak: "2020s", similar: ["Finn", "Hugo", "Milo"] },
  { name: "Eleanor", gender: "girl", origin: "French", meaning: "Shining light", decades: { "2000s": 300, "2010s": 60, "2020s": 22 }, peak: "2020s", similar: ["Elena", "Eloise", "Nora"] },
  { name: "Jasper", gender: "boy", origin: "Persian", meaning: "Spotted stone", decades: { "2000s": 300, "2010s": 150, "2020s": 85 }, peak: "2020s", similar: ["Casper", "Juniper", "Felix"] },
  { name: "Freya", gender: "girl", origin: "Norse", meaning: "Goddess of love", decades: { "2000s": 300, "2010s": 150, "2020s": 90 }, peak: "2020s", similar: ["Fiona", "Flora", "Astrid"] },
  { name: "Hugo", gender: "boy", origin: "German", meaning: "Mind, intellect", decades: { "2000s": 300, "2010s": 200, "2020s": 100 }, peak: "2020s", similar: ["Henry", "Otto", "Leo"] },
];

function getTrend(data) {
  const r2020 = data["2020s"];
  const r2010 = data["2010s"];
  if (r2020 < r2010 * 0.7) return { label: "Rising", emoji: "📈", color: "#16A34A" };
  if (r2020 > r2010 * 1.3) return { label: "Falling", emoji: "📉", color: "#DC2626" };
  return { label: "Steady", emoji: "➡️", color: "#3B82F6" };
}

export default function NamePopularityTrends() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [notFound, setNotFound] = useState(false);

  const search = () => {
    const q = query.trim().toLowerCase();
    if (!q) return;
    const found = NAME_DATA.find((n) => n.name.toLowerCase() === q);
    if (found) {
      setResult(found);
      setNotFound(false);
    } else {
      setResult(null);
      setNotFound(true);
    }
  };

  const maxRank = result ? Math.max(...Object.values(result.decades)) : 1;
  const trend = result ? getTrend(result.decades) : null;

  return (
    <div className="card">
      {/* Search */}
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && search()}
          placeholder="Type a name (e.g., Olivia, Liam)"
          className="flex-1 px-4 py-3 border-2 border-blue-200 rounded-xl bg-white focus:border-[#3B82F6] focus:outline-none text-lg"
        />
        <button
          type="button"
          onClick={search}
          className="px-6 py-3 bg-[#3B82F6] text-white font-bold rounded-xl hover:bg-[#1D4ED8] transition"
        >
          Search
        </button>
      </div>

      {notFound && (
        <div className="text-center py-8">
          <p className="text-[#9CA3AF] mb-2">Name not found in our database of ~100 popular names.</p>
          <p className="text-sm text-[#9CA3AF]">
            Try: {NAME_DATA.slice(0, 8).map((n) => n.name).join(", ")}...
          </p>
        </div>
      )}

      {result && (
        <>
          {/* Name header */}
          <div className="text-center mb-6">
            <h3 className="text-3xl font-bold text-[#1E293B]">{result.name}</h3>
            <p className="text-sm text-[#9CA3AF] mt-1">
              {result.origin} | {result.gender === "girl" ? "Girl" : "Boy"} | {result.meaning}
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="bg-blue-50 rounded-xl p-3 text-center">
              <p className="text-xs text-[#9CA3AF] font-semibold uppercase mb-1">2020s Rank</p>
              <p className="font-mono text-xl text-[#3B82F6]">#{result.decades["2020s"]}</p>
            </div>
            <div className="bg-blue-50 rounded-xl p-3 text-center">
              <p className="text-xs text-[#9CA3AF] font-semibold uppercase mb-1">Peak Decade</p>
              <p className="font-mono text-xl text-[#3B82F6]">{result.peak}</p>
            </div>
            <div className="bg-blue-50 rounded-xl p-3 text-center">
              <p className="text-xs text-[#9CA3AF] font-semibold uppercase mb-1">Trend</p>
              <p className="font-mono text-lg" style={{ color: trend.color }}>
                {trend.emoji} {trend.label}
              </p>
            </div>
          </div>

          {/* Bar chart */}
          <div className="mb-6">
            <h3 className="text-sm font-bold text-[#1E293B] uppercase tracking-wide mb-3">Popularity by Decade</h3>
            <p className="text-xs text-[#9CA3AF] mb-3">Lower rank = more popular (1 = most popular)</p>
            <div className="space-y-3">
              {Object.entries(result.decades).map(([decade, rank]) => {
                const width = Math.max(5, ((maxRank - rank + 1) / maxRank) * 100);
                return (
                  <div key={decade} className="flex items-center gap-3">
                    <span className="text-sm font-semibold text-[#1E293B] w-14 shrink-0">{decade}</span>
                    <div className="flex-1 bg-blue-50 rounded-full h-8 relative overflow-hidden">
                      <div
                        className="h-full bg-[#3B82F6] rounded-full flex items-center justify-end pr-2 transition-all duration-500"
                        style={{ width: `${width}%` }}
                      >
                        <span className="text-xs font-bold text-white">#{rank}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Similar names */}
          <div className="mb-4">
            <h3 className="text-sm font-bold text-[#1E293B] uppercase tracking-wide mb-3">Similar Names</h3>
            <div className="flex flex-wrap gap-2">
              {result.similar.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => { setQuery(s); const found = NAME_DATA.find((n) => n.name === s); if (found) { setResult(found); setNotFound(false); } }}
                  className="px-4 py-2 bg-blue-50 text-[#3B82F6] font-semibold rounded-full hover:bg-blue-100 transition text-sm"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Browse popular names */}
      {!result && !notFound && (
        <div>
          <h3 className="text-sm font-bold text-[#1E293B] uppercase tracking-wide mb-3">Popular Names to Explore</h3>
          <div className="flex flex-wrap gap-2">
            {NAME_DATA.slice(0, 20).map((n) => (
              <button
                key={n.name}
                type="button"
                onClick={() => { setQuery(n.name); setResult(n); setNotFound(false); }}
                className="px-3 py-1.5 bg-blue-50 text-[#3B82F6] font-semibold rounded-full hover:bg-blue-100 transition text-sm"
              >
                {n.name}
              </button>
            ))}
          </div>
        </div>
      )}

      <p className="mt-6 text-xs text-[#9CA3AF] italic text-center">
        Rankings are approximate and based on US Social Security Administration data estimates.
        Actual popularity may vary by region and year.
      </p>
    </div>
  );
}
