/**
 * WaveCollapse IO — Route Configuration
 * ──────────────────────────────────────
 * Single Source of Truth for all application routes.
 * Consumed by:
 *   1. vite.config.ts  → vite-plugin-prerender (SSG)
 *   2. scripts/generate-sitemap.js → sitemap.xml generation
 *
 * To add a new page:
 *   1. Add the route path here.
 *   2. Add the React component + route definition in App.tsx.
 *   3. Add <SEOHead /> with page-specific metadata in the component.
 *   4. Run `npm run build` — both the static HTML and sitemap update automatically.
 */

/** @type {string[]} */
export const routes = [
  /* Home */
  '/',

  /* Solutions */
  '/solutions/intake',
  '/solutions/settlement',
  '/solutions/rwa',

  /* Protocol */
  '/protocol/equivalency',
  '/protocol/iso20022',
  '/protocol/x402',
  '/protocol/changelog',

  /* Build */
  '/build/node-wizard',
  '/build/sandbox',
  '/build/sdk',
  '/build/api',

  /* Governance */
  '/governance/economics',
  '/governance/validators',
  '/governance/audits',
  '/governance/proposals',

  /* Company */
  '/about',
  '/contact',
  '/press',
  '/careers',

  /* Trust Hub */
  '/trust/simulation',
  '/trust/sec17a4',

  /* Legal */
  '/legal',
  '/legal/privacy',
  '/legal/terms',
  '/legal/cookies',
];
