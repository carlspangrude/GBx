import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    // Must match a key in src/data/pillars.ts
    pillar: z.enum(['interaction', 'threats', 'value', 'role', 'mana', 'foundations']),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    toc: z.boolean().default(false),
    // Card name whose artwork heads the post. Falls back to the pillar's art.
    art: z.string().optional(),
  }),
});

export const collections = { posts };
