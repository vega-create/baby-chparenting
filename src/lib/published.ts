// 以 build 時間判斷文章是否已發布（每天 08:05 GitHub Actions 重建）
const mods = import.meta.glob("/src/content/blog/*.md", { eager: true }) as Record<string, { frontmatter: { slug?: string; publishDate?: string | Date; draft?: boolean } }>;

const now = new Date();
const published = new Set<string>();
for (const [path, mod] of Object.entries(mods)) {
  const fm = mod.frontmatter ?? {};
  const slug = fm.slug ?? path.split("/").pop()!.replace(/\.md$/, "");
  const date = fm.publishDate ? new Date(fm.publishDate) : null;
  if (!fm.draft && date && date <= now) published.add(slug);
}

export const publishedSlugs: string[] = Array.from(published);
export function isPublished(slug: string): boolean {
  return published.has(slug.replace(/^\/blog\//, "").replace(/\/$/, ""));
}
