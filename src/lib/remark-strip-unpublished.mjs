// 把 Markdown 內文裡指向尚未發布文章（/blog/<slug>/）的連結改成純文字。
// 用 fs 掃 frontmatter，不依賴 Astro API；build 時間判斷即可（每天自動重建）。
import fs from "node:fs";
import path from "node:path";
import { visit } from "unist-util-visit";

function loadPublished() {
  const dir = path.resolve("src/content/blog");
  const now = new Date();
  const set = new Set();
  for (const file of fs.readdirSync(dir)) {
    if (!file.endsWith(".md")) continue;
    const text = fs.readFileSync(path.join(dir, file), "utf8");
    const m = text.match(/^---\n([\s\S]*?)\n---/);
    if (!m) continue;
    const fm = m[1];
    const get = (k) => (fm.match(new RegExp(`^${k}:\\s*"?([^"\\n]*)"?\\s*$`, "m")) || [])[1];
    const slug = get("slug") || file.replace(/\.md$/, "");
    const date = get("publishDate");
    const draft = (get("draft") || "false").trim() === "true";
    if (!draft && date && new Date(date) <= now) set.add(slug.trim());
  }
  return set;
}

export default function remarkStripUnpublished() {
  const published = loadPublished();
  return (tree) => {
    visit(tree, "link", (node, index, parent) => {
      const m = /^\/blog\/([^\/#?]+)\/?(?:[#?].*)?$/.exec(node.url || "");
      if (!m || published.has(m[1]) || !parent) return;
      parent.children.splice(index, 1, ...node.children);
      return index;
    });
  };
}
