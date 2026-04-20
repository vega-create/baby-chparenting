import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { siteConfig } from '../../../site.config';

export const GET: APIRoute = async () => {
  const origin = siteConfig.url;
  const now = new Date();
  const posts = (await getCollection('blog', ({ data }) => !data.draft && data.publishDate <= now))
    .sort((a, b) => b.data.publishDate.getTime() - a.data.publishDate.getTime());

  const lines: string[] = [];
  lines.push(`# All Articles — ${siteConfig.name}`);
  lines.push('');
  lines.push(`Source: ${origin}/blog/`);
  lines.push(`Posts: ${posts.length}`);
  lines.push('');

  if (posts.length === 0) {
    lines.push('No articles yet.');
  } else {
    for (const post of posts) {
      const cat = post.data.category ? ` [${post.data.category}]` : '';
      const date = ` — ${post.data.publishDate.toISOString().slice(0, 10)}`;
      lines.push(`- [${post.data.title}](${origin}/blog/${post.data.slug}/)${cat}${date}`);
      if (post.data.description) {
        lines.push(`  > ${post.data.description}`);
      }
    }
  }

  return new Response(lines.join('\n') + '\n', {
    status: 200,
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
