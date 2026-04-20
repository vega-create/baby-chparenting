import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { siteConfig } from '../../site.config';

export const GET: APIRoute = async () => {
  const origin = siteConfig.url;
  const now = new Date();
  const posts = (await getCollection('blog', ({ data }) => !data.draft && data.publishDate <= now))
    .sort((a, b) => b.data.publishDate.getTime() - a.data.publishDate.getTime())
    .slice(0, 5);

  const lines: string[] = [];
  lines.push(`# ${siteConfig.name}`);
  lines.push('');
  lines.push(`> ${siteConfig.tagline}`);
  lines.push('');
  lines.push(`Source: ${origin}/`);
  lines.push('');
  lines.push(siteConfig.description);
  lines.push('');
  lines.push('## Main Sections');
  lines.push('');
  lines.push(`- **Sleep** — ${origin}/sleep/ — Sleep training, schedules, and safe sleep`);
  lines.push(`- **Names** — ${origin}/names/ — Baby name ideas, meanings, and trends`);
  lines.push(`- **Feeding** — ${origin}/feeding/ — Breastfeeding, formula, and solids`);
  lines.push(`- **Gear** — ${origin}/gear/ — Strollers, car seats, and essentials`);
  lines.push(`- **Development** — ${origin}/development/ — Milestones and growth`);
  lines.push(`- **Tools** — ${origin}/tools/ — Interactive calculators and trackers`);
  lines.push(`- **All Articles** — ${origin}/blog/`);
  lines.push('');

  if (posts.length > 0) {
    lines.push('## Latest Articles');
    lines.push('');
    for (const post of posts) {
      const cat = post.data.category ? ` [${post.data.category}]` : '';
      const date = ` — ${post.data.publishDate.toISOString().slice(0, 10)}`;
      lines.push(`- [${post.data.title}](${origin}/blog/${post.data.slug}/)${cat}${date}`);
    }
    lines.push('');
  }

  lines.push('## Machine-Readable Indexes');
  lines.push('');
  lines.push(`- ${origin}/llms.txt — llms.txt site guide`);
  lines.push(`- ${origin}/llms-full.txt — Full content of all articles`);
  lines.push(`- ${origin}/sitemap-index.xml — Sitemap index`);

  return new Response(lines.join('\n') + '\n', {
    status: 200,
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
