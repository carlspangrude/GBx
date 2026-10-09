# Good Stuff Doctrine

Astro + MDX static blog. No client-side framework; pages ship as plain HTML.

## Commands
- `npm install`
- `npm run dev` : local server at http://localhost:4321
- `npm run build` : static output to `dist/`

## Writing a post
Add an `.md` or `.mdx` file to `src/content/posts/`. Frontmatter:
`title`, `description`, `date`, `pillar` (see `src/data/pillars.ts`), optional `tags`, `draft: true` to hide.

## Deploying to Vercel
Push to GitHub, import the repo in Vercel. Astro is auto-detected; no config needed.
Then set `site` in `astro.config.mjs` to your real domain.
Note: quote frontmatter strings that contain a colon.
