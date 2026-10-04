// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// The domain isn't registered yet (repo README, decision 4). Set SITE_URL when deploying;
// canonical links, the sitemap and Open Graph URLs are built from it.
const site = process.env.SITE_URL || 'https://yashchauhan.dev';

export default defineConfig({
  site,
  trailingSlash: 'never',
  // The stylesheet (about 22 KB gzipped) goes inline in every page: one round trip fewer before the first paint, which
  // on a phone network matters more than caching it across the few pages a visitor opens.
  build: { format: 'file', inlineStylesheets: 'always' },
  integrations: [react(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
  devToolbar: { enabled: false },
});
