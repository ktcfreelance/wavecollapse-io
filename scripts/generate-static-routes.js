/**
 * WaveCollapse IO — Post-Build Static Route Generator
 * ────────────────────────────────────────────────────
 * Creates directory-based index.html files for every route in routes.config.js.
 * This ensures that:
 *   1. Static hosts (Cloudflare Pages, S3, etc.) serve the SPA shell for any deep-linked URL.
 *   2. Crawlers receive a valid HTML document on every route (no 404 on refresh).
 *   3. Clean URLs work without server-side rewrite rules.
 *
 * Each generated file is a copy of the root dist/index.html — react-helmet-async
 * handles head injection client-side, and the sitemap ensures crawler discovery.
 *
 * Run: node scripts/generate-static-routes.js
 */

import { routes } from '../routes.config.js';
import { readFileSync, mkdirSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dirname, '..', 'dist');
const shellHtml = readFileSync(join(distDir, 'index.html'), 'utf-8');

let created = 0;
let skipped = 0;

for (const route of routes) {
  // Skip root — already exists as dist/index.html
  if (route === '/') {
    skipped++;
    continue;
  }

  const targetDir = join(distDir, route);
  const targetFile = join(targetDir, 'index.html');

  // Don't overwrite if it already exists (e.g., from a framework build)
  if (existsSync(targetFile)) {
    skipped++;
    continue;
  }

  mkdirSync(targetDir, { recursive: true });
  writeFileSync(targetFile, shellHtml, 'utf-8');
  created++;
}

console.log(`[generate-static-routes] Created ${created} route files, skipped ${skipped}.`);
console.log(`[generate-static-routes] All routes from routes.config.js are now served by dist/.`);
