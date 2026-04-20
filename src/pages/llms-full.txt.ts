import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { siteConfig } from '../../site.config';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const FULL_CONTENT_CAP = 50;

function readBody(...candidates: string[]): string | null {
  const root = process.cwd();
  for (const c of candidates) {
    if (!c) continue;
    const bare = c.replace(/\.md$/, '');
    try {
      const raw = readFileSync(join(root, 'src', 'content', 'blog', `${bare}.md`), 'utf-8');
      return raw.replace(/^---[\s\S]*?---\s*/, '');
    } catch {}
  }
  return null;
}

export const GET: APIRoute = async () => {
  const origin = siteConfig.url;
  const now = new Date();
  const posts = (await getCollection('blog', ({ data }) => !data.draft && data.publishDate <= now))
    .sort((a, b) => b.data.publishDate.getTime() - a.data.publishDate.getTime());

  const header: string[] = [
    `# ${siteConfig.name} — Full Content`,
    '',
    `> All published articles from ${siteConfig.url} as markdown for AI agents.`,
    '',
    `Source: ${origin}/`,
    `Generated: ${new Date().toISOString()}`,
    `Posts: ${posts.length}`,
    '',
  ];

  const sections: string[] = [];
  const fullPosts = posts.slice(0, FULL_CONTENT_CAP);
  const digestPosts = posts.slice(FULL_CONTENT_CAP);

  for (const post of fullPosts) {
    const meta: string[] = [
      `Source: ${origin}/blog/${post.data.slug}/`,
      `Published: ${post.data.publishDate.toISOString().slice(0, 10)}`,
    ];
    if (post.data.category) meta.push(`Category: ${post.data.category}`);
    if (post.data.tags && post.data.tags.length) meta.push(`Tags: ${post.data.tags.join(', ')}`);
    if (post.data.author) meta.push(`Author: ${post.data.author}`);

    const body = readBody(post.id, post.data.slug) ?? '_(no content)_';

    sections.push('---', '', `# ${post.data.title}`, '', ...meta, '', body, '');
  }

  if (digestPosts.length > 0) {
    sections.push('---', '', `# Additional Articles (title-only, ${digestPosts.length})`, '');
    sections.push('File size cap reached — the remaining posts are listed below. Fetch each URL for full content.', '');
    for (const post of digestPosts) {
      const cat = post.data.category ? ` [${post.data.category}]` : '';
      const date = ` — ${post.data.publishDate.toISOString().slice(0, 10)}`;
      sections.push(`- [${post.data.title}](${origin}/blog/${post.data.slug}/)${cat}${date}`);
    }
    sections.push('');
  }

  return new Response([...header, ...sections].join('\n'), {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
