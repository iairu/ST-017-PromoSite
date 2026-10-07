import { defineConfig } from 'astro/config';

// Set SITE_URL at build time (e.g. SITE_URL=https://nightjar.example) to get absolute
// canonical / Open Graph URLs. Without it the site still works on any host or sub-path.
const site = process.env.SITE_URL || 'https://nightjar.gift';

export default defineConfig({
  site,
  base: process.env.BASE_PATH || '/',
  trailingSlash: 'always',
  build: { format: 'directory' },
  devToolbar: { enabled: false },
});
