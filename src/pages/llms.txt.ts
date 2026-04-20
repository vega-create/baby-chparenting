import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { siteConfig } from '../../site.config';

export const GET: APIRoute = async () => {
  const origin = siteConfig.url;
  const now = new Date();
  const posts = (await getCollection('blog', ({ data }) => !data.draft && data.publishDate <= now))
    .sort((a, b) => b.data.publishDate.getTime() - a.data.publishDate.getTime());

  const lines: string[] = [];
  lines.push(`# ${siteConfig.name}`);
  lines.push('');
  lines.push(`> ${siteConfig.tagline}`);
  lines.push('');
  lines.push(siteConfig.description);
  lines.push('');
  lines.push(`${siteConfig.name}（${origin.replace(/^https?:\/\//, '')}）is a content site for new parents covering newborn sleep, feeding, gear, development, and baby names. All articles are written from an evidence-based perspective.`);
  lines.push('');
  lines.push('## Main Categories');
  lines.push('');
  lines.push(`- [Sleep](${origin}/sleep/): Sleep training, schedules, and safe sleep`);
  lines.push(`- [Names](${origin}/names/): Baby name ideas, meanings, and trends`);
  lines.push(`- [Feeding](${origin}/feeding/): Breastfeeding, formula, and solids`);
  lines.push(`- [Gear](${origin}/gear/): Strollers, car seats, and essentials`);
  lines.push(`- [Development](${origin}/development/): Milestones and growth`);
  lines.push(`- [Tools](${origin}/tools/): Interactive calculators and trackers`);
  lines.push('');
  lines.push('## Key Pages');
  lines.push('');
  lines.push(`- [Home](${origin}/): Overview with latest articles and tool highlights`);
  lines.push(`- [All Articles](${origin}/blog/): Complete article index`);
  lines.push(`- [About](${origin}/about/)`);
  lines.push(`- [Contact](${origin}/contact/)`);
  lines.push(`- [Privacy](${origin}/privacy/)`);
  lines.push('');

  const recent = posts.slice(0, 10);
  if (recent.length > 0) {
    lines.push('## Recent Articles');
    lines.push('');
    for (const post of recent) {
      const cat = post.data.category ? ` [${post.data.category}]` : '';
      const date = ` — ${post.data.publishDate.toISOString().slice(0, 10)}`;
      lines.push(`- [${post.data.title}](${origin}/blog/${post.data.slug}/)${cat}${date}`);
    }
    lines.push('');
  }

  lines.push('## Optional');
  lines.push('');
  lines.push(`- [Sitemap](${origin}/sitemap-index.xml): Full page index`);
  lines.push(`- [Full Content](${origin}/llms-full.txt): All articles as markdown in one file`);
  lines.push(`- [Sister Site: Pregnancy Guide](${siteConfig.sister.pregnancy}): Pregnancy-focused companion`);

  return new Response(lines.join('\n') + '\n', {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
