// Shared helpers for the Mom Wellness share cards (affirmation + quiz result).
// Draws a 1080x1080 card on a canvas and offers download / copy / share.

export const CARD_STYLES = {
  sky:   { key: "sky",   label: "Sky",   bg: "#E6F0FB", fg: "#1E3A5F", accent: "#2E6FB8", sub: "#5B7A9A" },
  sage:  { key: "sage",  label: "Sage",  bg: "#3E8A66", fg: "#FFFFFF", accent: "#DDF0E5", sub: "#CFE8D9" },
  peach: { key: "peach", label: "Peach", bg: "#F8D9C4", fg: "#5C3A21", accent: "#B05B3C", sub: "#8A6A55" },
  night: { key: "night", label: "Night", bg: "#1E3A5F", fg: "#F5F9FF", accent: "#E8B86E", sub: "#A9BCD6" },
};

function wrap(ctx, text, maxW) {
  const words = text.split(" ");
  const lines = [];
  let line = "";
  for (const w of words) {
    const t = line ? line + " " + w : w;
    if (ctx.measureText(t).width > maxW && line) { lines.push(line); line = w; } else line = t;
  }
  if (line) lines.push(line);
  return lines;
}

/**
 * Draw a square card.
 * @param {HTMLCanvasElement} canvas
 * @param {{eyebrow:string, text:string, footer?:string, styleKey:string, quote?:boolean}} opts
 */
export function drawCard(canvas, { eyebrow, text, footer = "baby.chparenting.com", styleKey = "sky", quote = true }) {
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const s = CARD_STYLES[styleKey] || CARD_STYLES.sky;
  const W = canvas.width, H = canvas.height;
  ctx.fillStyle = s.bg; ctx.fillRect(0, 0, W, H);
  ctx.strokeStyle = s.accent; ctx.lineWidth = 4; ctx.strokeRect(56, 56, W - 112, H - 112);
  ctx.textAlign = "center";
  ctx.fillStyle = s.accent; ctx.font = "700 28px 'Nunito', 'Helvetica Neue', sans-serif";
  ctx.fillText(eyebrow.toUpperCase(), W / 2, 160);
  const body = quote ? "“" + text + "”" : text;
  const size = body.length > 220 ? 40 : body.length > 140 ? 48 : 56;
  ctx.font = `600 ${size}px Georgia, 'Times New Roman', serif`;
  ctx.fillStyle = s.fg;
  const lines = wrap(ctx, body, W - 220);
  const lh = size * 1.4;
  let y = H / 2 - (lines.length * lh) / 2 + size * 0.4;
  for (const l of lines) { ctx.fillText(l, W / 2, y); y += lh; }
  ctx.font = "600 24px 'Nunito', 'Helvetica Neue', sans-serif"; ctx.fillStyle = s.sub;
  ctx.fillText(footer, W / 2, H - 110);
}

export function downloadCanvas(canvas, filename) {
  if (!canvas) return;
  const a = document.createElement("a");
  a.download = filename;
  a.href = canvas.toDataURL("image/png");
  a.click();
}

export async function copyText(text) {
  try { await navigator.clipboard.writeText(text); return true; } catch { return false; }
}

export async function shareText(title, text) {
  if (navigator.share) {
    try { await navigator.share({ title, text }); return "shared"; } catch { return "cancelled"; }
  }
  return (await copyText(text)) ? "copied" : "failed";
}
