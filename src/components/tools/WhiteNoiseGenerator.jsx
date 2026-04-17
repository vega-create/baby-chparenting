import { useState, useEffect, useRef } from "react";

const SOUNDS = [
  { id: "white", label: "White Noise", emoji: "🌫️", desc: "Classic static hiss for deep sleep", canGenerate: true },
  { id: "rain", label: "Rain", emoji: "🌧️", desc: "Gentle rainfall on a rooftop", canGenerate: true },
  { id: "ocean", label: "Ocean Waves", emoji: "🌊", desc: "Rolling waves on a sandy shore", canGenerate: false },
  { id: "heartbeat", label: "Heartbeat", emoji: "💓", desc: "Steady heartbeat like in the womb", canGenerate: true },
  { id: "shush", label: "Shushing", emoji: "🤫", desc: "Rhythmic shushing sounds", canGenerate: true },
  { id: "fan", label: "Fan", emoji: "🌀", desc: "Steady fan humming", canGenerate: true },
  { id: "thunder", label: "Thunder", emoji: "⛈️", desc: "Distant rumbling thunder", canGenerate: false },
  { id: "lullaby", label: "Lullaby", emoji: "🎵", desc: "Soft musical tones", canGenerate: false },
];

const TIMERS = [
  { label: "15 min", minutes: 15 },
  { label: "30 min", minutes: 30 },
  { label: "45 min", minutes: 45 },
  { label: "1 hr", minutes: 60 },
  { label: "2 hr", minutes: 120 },
  { label: "Continuous", minutes: 0 },
];

function createWhiteNoise(audioCtx) {
  const bufferSize = 2 * audioCtx.sampleRate;
  const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }
  const source = audioCtx.createBufferSource();
  source.buffer = buffer;
  source.loop = true;
  return source;
}

function createBrownNoise(audioCtx) {
  const bufferSize = 2 * audioCtx.sampleRate;
  const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
  const data = buffer.getChannelData(0);
  let last = 0;
  for (let i = 0; i < bufferSize; i++) {
    const white = Math.random() * 2 - 1;
    data[i] = (last + 0.02 * white) / 1.02;
    last = data[i];
    data[i] *= 3.5;
  }
  const source = audioCtx.createBufferSource();
  source.buffer = buffer;
  source.loop = true;
  return source;
}

function createHeartbeat(audioCtx) {
  const sampleRate = audioCtx.sampleRate;
  const duration = 1.0;
  const bufferSize = Math.floor(sampleRate * duration);
  const buffer = audioCtx.createBuffer(1, bufferSize, sampleRate);
  const data = buffer.getChannelData(0);
  const beat = (t, center, width) => Math.exp(-Math.pow((t - center) / width, 2));
  for (let i = 0; i < bufferSize; i++) {
    const t = i / sampleRate;
    data[i] = 0.6 * beat(t, 0.1, 0.03) * Math.sin(2 * Math.PI * 60 * t)
            + 0.4 * beat(t, 0.25, 0.03) * Math.sin(2 * Math.PI * 50 * t);
  }
  const source = audioCtx.createBufferSource();
  source.buffer = buffer;
  source.loop = true;
  return source;
}

function createShush(audioCtx) {
  const sampleRate = audioCtx.sampleRate;
  const duration = 2.0;
  const bufferSize = Math.floor(sampleRate * duration);
  const buffer = audioCtx.createBuffer(1, bufferSize, sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    const t = i / sampleRate;
    const envelope = 0.5 + 0.5 * Math.sin(2 * Math.PI * 0.5 * t);
    data[i] = (Math.random() * 2 - 1) * envelope * 0.5;
  }
  const source = audioCtx.createBufferSource();
  source.buffer = buffer;
  source.loop = true;
  return source;
}

function createFan(audioCtx) {
  const source = createBrownNoise(audioCtx);
  return source;
}

function createSoundSource(audioCtx, soundId) {
  switch (soundId) {
    case "white": return createWhiteNoise(audioCtx);
    case "rain": return createBrownNoise(audioCtx);
    case "heartbeat": return createHeartbeat(audioCtx);
    case "shush": return createShush(audioCtx);
    case "fan": return createFan(audioCtx);
    default: return null;
  }
}

function fmtTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function WhiteNoiseGenerator() {
  const [selected, setSelected] = useState("white");
  const [volume, setVolume] = useState(50);
  const [timer, setTimer] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [remaining, setRemaining] = useState(null);
  const [showInfo, setShowInfo] = useState(false);

  const audioCtxRef = useRef(null);
  const sourceRef = useRef(null);
  const gainRef = useRef(null);
  const timerRef = useRef(null);

  const stopAudio = () => {
    if (sourceRef.current) {
      try { sourceRef.current.stop(); } catch {}
      sourceRef.current = null;
    }
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setPlaying(false);
    setRemaining(null);
  };

  const startAudio = () => {
    const sound = SOUNDS.find((s) => s.id === selected);
    if (!sound?.canGenerate) return;

    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    const ctx = audioCtxRef.current;
    stopAudio();

    const gain = ctx.createGain();
    gain.gain.value = volume / 100;
    gain.connect(ctx.destination);
    gainRef.current = gain;

    const source = createSoundSource(ctx, selected);
    if (!source) return;
    source.connect(gain);
    source.start();
    sourceRef.current = source;
    setPlaying(true);

    if (timer > 0) {
      let left = timer * 60;
      setRemaining(left);
      timerRef.current = setInterval(() => {
        left--;
        if (left <= 0) {
          stopAudio();
        } else {
          setRemaining(left);
        }
      }, 1000);
    }
  };

  useEffect(() => {
    if (gainRef.current) {
      gainRef.current.gain.value = volume / 100;
    }
  }, [volume]);

  useEffect(() => {
    return () => stopAudio();
  }, []);

  const sound = SOUNDS.find((s) => s.id === selected);

  return (
    <div className="card">
      {/* Sound selection */}
      <h3 className="text-sm font-bold text-[#1E293B] uppercase tracking-wide mb-3">Choose a Sound</h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
        {SOUNDS.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => { if (!playing) setSelected(s.id); }}
            className={`relative p-3 rounded-xl text-center transition border-2 ${
              selected === s.id
                ? "border-[#3B82F6] bg-blue-50"
                : "border-blue-100 hover:border-blue-200"
            } ${playing && selected !== s.id ? "opacity-50" : ""}`}
          >
            {!s.canGenerate && (
              <span className="absolute top-1 right-1 text-[9px] bg-[#3B82F6] text-white px-1.5 py-0.5 rounded-full">
                Soon
              </span>
            )}
            <span className="text-2xl block mb-1">{s.emoji}</span>
            <span className="text-xs font-semibold text-[#1E293B]">{s.label}</span>
          </button>
        ))}
      </div>

      {/* Sound description */}
      <p className="text-sm text-[#9CA3AF] mb-6 text-center">{sound?.desc}</p>

      {/* Volume */}
      <div className="mb-6">
        <label className="text-sm font-semibold text-[#1E293B] mb-2 block">
          Volume: {volume}%
        </label>
        <input
          type="range" min="0" max="100" value={volume}
          onChange={(e) => setVolume(parseInt(e.target.value))}
          className="w-full accent-[#3B82F6]"
        />
      </div>

      {/* Timer */}
      <div className="mb-6">
        <label className="text-sm font-semibold text-[#1E293B] mb-2 block">Timer</label>
        <div className="flex flex-wrap gap-2">
          {TIMERS.map((t) => (
            <button
              key={t.minutes}
              type="button"
              onClick={() => { if (!playing) setTimer(t.minutes); }}
              className={`px-4 py-2 text-sm font-semibold rounded-full transition ${
                timer === t.minutes
                  ? "bg-[#3B82F6] text-white"
                  : "bg-blue-50 text-[#1E293B] hover:bg-blue-100"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Playback controls */}
      <div className="flex items-center justify-center gap-4 mb-6">
        {!playing ? (
          <button
            type="button"
            onClick={startAudio}
            disabled={!sound?.canGenerate}
            className={`px-8 py-3 font-bold rounded-full text-white text-lg transition ${
              sound?.canGenerate
                ? "bg-[#3B82F6] hover:bg-[#1D4ED8]"
                : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            Play
          </button>
        ) : (
          <button
            type="button"
            onClick={stopAudio}
            className="px-8 py-3 bg-red-500 text-white font-bold rounded-full text-lg hover:bg-red-600 transition"
          >
            Stop
          </button>
        )}
      </div>

      {/* Waveform animation */}
      {playing && (
        <div className="flex items-end justify-center gap-1 h-12 mb-4">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="w-1.5 bg-[#3B82F6] rounded-full"
              style={{
                animation: `waveBar 0.8s ease-in-out ${i * 0.05}s infinite alternate`,
                height: "8px",
              }}
            />
          ))}
          <style>{`
            @keyframes waveBar {
              0% { height: 8px; opacity: 0.4; }
              100% { height: 40px; opacity: 1; }
            }
          `}</style>
        </div>
      )}

      {/* Timer countdown */}
      {remaining !== null && (
        <p className="text-center font-mono text-lg text-[#3B82F6] mb-4">
          {fmtTime(remaining)} remaining
        </p>
      )}

      {/* Info section */}
      <div className="mt-6 border-t-2 border-blue-100 pt-6">
        <button
          type="button"
          onClick={() => setShowInfo(!showInfo)}
          className="text-sm font-bold text-[#3B82F6] hover:text-[#1D4ED8] transition"
        >
          {showInfo ? "Hide" : "Show"}: Why white noise helps babies sleep
        </button>
        {showInfo && (
          <div className="mt-4 space-y-3 text-sm text-[#1E293B] leading-relaxed">
            <p>
              Inside the womb, babies are surrounded by a constant swooshing sound that reaches about 80 decibels
              -- roughly as loud as a vacuum cleaner. White noise mimics this familiar environment, helping
              newborns feel safe and calm.
            </p>
            <p>
              White noise works by masking sudden sounds (door slams, dogs barking) that can startle a sleeping
              baby. It provides a consistent auditory environment that promotes longer, deeper sleep.
            </p>
            <div className="p-3 bg-blue-50 rounded-xl">
              <p className="font-semibold text-[#1D4ED8] mb-1">AAP Safety Recommendations:</p>
              <ul className="space-y-1 text-[#1E293B]">
                <li className="flex gap-2"><span className="text-[#3B82F6]">*</span> Keep volume below 50 decibels (about the level of a soft shower)</li>
                <li className="flex gap-2"><span className="text-[#3B82F6]">*</span> Place the sound machine at least 7 feet (200 cm) away from the crib</li>
                <li className="flex gap-2"><span className="text-[#3B82F6]">*</span> Use a timer so it does not play all night -- aim for shutoff after baby falls asleep</li>
                <li className="flex gap-2"><span className="text-[#3B82F6]">*</span> Do not place the device inside or attached to the crib</li>
              </ul>
            </div>
          </div>
        )}
      </div>

      <p className="mt-6 text-xs text-[#9CA3AF] italic text-center">
        This tool generates sound using the Web Audio API. Sounds marked "Soon" are coming in a future update.
        Always supervise audio use around your baby.
      </p>
    </div>
  );
}
