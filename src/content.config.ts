import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Must match a key in src/data/pillars.ts
const pillarEnum = z.enum(['interaction', 'threats', 'value', 'role', 'mana', 'foundations']);

const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    pillar: pillarEnum,
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    toc: z.boolean().default(false),
    // Card name whose artwork heads the post. Falls back to the pillar's art.
    art: z.string().optional(),
  }),
});

// One file per card in the index, scored 0-3 against the three tests.
const score = z.number().int().min(0).max(3);
const cards = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/cards' }),
  schema: z.object({
    name: z.string(),
    pillar: pillarEnum,
    cost: z.string().default(''), // e.g. "{1}{B}{B}"
    type: z.string(),
    scores: z.object({ alone: score, trades: score, lategame: score }),
    why: z.object({
      alone: z.string().optional(),
      trades: z.string().optional(),
      lategame: z.string().optional(),
    }).default({}),
    verdict: z.string(),
    draft: z.boolean().default(false),
  }),
});

// One file per decklist in the archive.
const decks = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/decks' }),
  schema: z.object({
    title: z.string(),
    format: z.string(),
    year: z.number().int(),
    colors: z.array(z.enum(['W', 'U', 'B', 'R', 'G'])).default([]),
    summary: z.string(),
    event: z.string().optional(),
    placing: z.string().optional(),
    pilot: z.string().optional(),
    source: z.string().url().optional(),
    illustrative: z.boolean().default(false),
    main: z.string(),
    side: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { posts, cards, decks };
