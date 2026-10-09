import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// Update `site` once you have your Vercel/custom domain.
export default defineConfig({
  site: 'https://gbx-blush.vercel.app',
  integrations: [mdx(), sitemap()],
});
