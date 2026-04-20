import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';
import { siteConfig } from '../../../site.config';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

export const getStaticPaths: GetStaticPaths = async () => {
  const now = new Date();
  const posts = await getCollection('blog', ({ data }) => !data.draft && data.publishDate <= now);
  return posts.map((post) => ({
    params: { slug: post.data.slug },
    props: { post },
  }));
};

function readBody(id: string, slug: string): string | null {
  const root = process.cwd();
  for (const candidate of [id, slug, id.replace(/\.md$/, ''), slug.replace(/\.md$/, '')]) {
    try {
      const path = join(root, 'src', 'content', 'blog', `${candidate}.md`);
      const raw = readFileSync(path, 'utf-8');
      return raw.replace(/^---[\s\S]*?---\s*/, '');
    } catch {}
  }
  return null;
}

export const GET: APIRoute = async ({ props }) => {
  const post = (props as any).post as Awaited<ReturnType<typeof getCollection>>[number];
  const origin = siteConfig.url;
  const slug = post.data.slug;
  const body = readBody(post.id, slug) ?? '_(no content)_';

  const lines: string[] = [];
  lines.push(`# ${post.data.title}`);
  lines.push('');
  lines.push(`Source: ${origin}/blog/${slug}/`);
  lines.push(`Published: ${post.data.publishDate.toISOString().slice(0, 10)}`);
  if (post.data.category) lines.push(`Category: ${post.data.category}`);
  if (post.data.tags && post.data.tags.length) lines.push(`Tags: ${post.data.tags.join(', ')}`);
  if (post.data.author) lines.push(`Author: ${post.data.author}`);
  if (post.data.image) lines.push(`Image: ${post.data.image}`);
  lines.push('', '---', '', body);

  return new Response(lines.join('\n') + '\n', {
    status: 200,
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
