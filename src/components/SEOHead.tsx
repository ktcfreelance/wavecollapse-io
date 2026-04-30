import { Helmet } from 'react-helmet-async';

const SITE_URL = 'https://wavecollapse.io';
const DEFAULT_OG_IMAGE = '/logo.png';
const SITE_NAME = 'WaveCollapse Protocol';

interface SEOHeadProps {
  /** Page title — will be suffixed with " | WaveCollapse Protocol" */
  title: string;
  /** Meta description for search engines and social previews */
  description: string;
  /** Canonical path, e.g. "/solutions/settlement" */
  path: string;
  /** Absolute or root-relative path to OG image (defaults to /logo.png) */
  ogImage?: string;
  /** Optional JSON-LD structured data object injected into <head> */
  schema?: Record<string, unknown>;
}

/**
 * SEOHead — Institutional-grade <head> manager for WaveCollapse IO.
 *
 * Uses react-helmet-async to inject per-page metadata that is:
 *   1. Extracted by the SSG prerenderer into static HTML at build time.
 *   2. Readable by non-JS social media crawlers (LinkedIn, Twitter, Slack).
 *   3. Dynamically updated on client-side navigation for live SPAs.
 *
 * All URLs are absolute to satisfy social scraper requirements.
 */
export default function SEOHead({ title, description, path, ogImage, schema }: SEOHeadProps) {
  const fullTitle = `${title} | ${SITE_NAME}`;
  const canonicalUrl = `${SITE_URL}${path}`;
  const absoluteOgImage = `${SITE_URL}${ogImage || DEFAULT_OG_IMAGE}`;

  return (
    <Helmet>
      {/* Core */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph (LinkedIn, Facebook, Slack) */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={absoluteOgImage} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={absoluteOgImage} />

      {/* JSON-LD Structured Data */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
}
