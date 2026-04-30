/**
 * generate-sitemap.js
 * ───────────────────
 * Post-build script that reads the single source of truth (routes.config.js)
 * and writes a fully formed sitemap.xml into the dist/ folder.
 *
 * Executed automatically as part of `npm run build`.
 */

import { writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { routes } from '../routes.config.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SITE_URL = 'https://wavecollapse.io';
const OUTPUT_PATH = resolve(__dirname, '..', 'dist', 'sitemap.xml');

const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

const urlEntries = routes.map((route) => {
  const priority = route === '/' ? '1.0' : route.split('/').length <= 2 ? '0.8' : '0.6';
  const changefreq = route === '/' ? 'weekly' : 'monthly';
  return `  <url>
    <loc>${SITE_URL}${route}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}).join('\n');

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>
`;

writeFileSync(OUTPUT_PATH, sitemap, 'utf-8');
console.log(`✓ sitemap.xml generated with ${routes.length} routes → ${OUTPUT_PATH}`);
