import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    publishDate: z.coerce.date(),
    slug: z.string(),
    category: z
      .enum(["sleep", "names", "feeding", "gear", "development"])
      .optional(),
    tags: z.array(z.string()).optional().default([]),
    author: z.string().optional().default("Jessica Park"),
    authorUrl: z
      .string()
      .optional()
      .default("https://baby.chparenting.com/author/jessica-park/"),
    image: z.string().optional(),
    draft: z.boolean().optional().default(false),
  }),
});

export const collections = { blog };
