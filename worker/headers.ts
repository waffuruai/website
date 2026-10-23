/**
 * Response headers for HTML documents: a per-page Content Security Policy
 * built from the build's inline-script hashes, transport and isolation
 * headers, and discovery `Link`s for agents.
 */
import type { Locale } from '../src/i18n/config';
import { localeInfo } from '../src/i18n/config';

/** Hosts GA4 loads from and reports to (gtag.js, collect, regional). */
const GA_SCRIPT = 'https://www.googletagmanager.com';
const GA_CONNECT = [
  'https://*.google-analytics.com',
  'https://*.analytics.google.com',
  'https://*.googletagmanager.com',
];
const GA_IMG = [
  'https://*.google-analytics.com',
  'https://*.googletagmanager.com',
];

export const PRODUCTION_HOST = 'waffuru.ai';

/** Two years, the HSTS preload threshold; `preload` is left off for now. */
const HSTS = 'max-age=63072000; includeSubDomains';

/**
 * The Content Security Policy for one page. `scriptHashes` are the page's
 * inline scripts (`'sha256-…'`); nothing else inline may run. Styles allow
 * inline because React writes style attributes and next-themes injects a
 * transition-blocking `<style>` when the theme changes.
 */
export function contentSecurityPolicy(scriptHashes: readonly string[]): string {
  return [
    "default-src 'none'",
    `script-src 'self' ${[...scriptHashes, GA_SCRIPT].join(' ')}`,
    "style-src 'self' 'unsafe-inline'",
    `img-src 'self' data: ${GA_IMG.join(' ')}`,
    "font-src 'self'",
    `connect-src 'self' ${GA_CONNECT.join(' ')}`,
    "manifest-src 'self'",
    "form-action 'self' https://docs.google.com",
    "frame-ancestors 'none'",
    "base-uri 'none'",
    "object-src 'none'",
    'upgrade-insecure-requests',
  ].join('; ');
}

/** Headers every response from the Worker carries, documents or not. */
export const BASE_HEADERS: Record<string, string> = {
  'Strict-Transport-Security': HSTS,
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
};

/** Discovery links for agents, advertised on every page. */
export function discoveryLinks(markdownPath: string): string {
  return [
    `<${markdownPath}>; rel="alternate"; type="text/markdown"`,
    '</llms.txt>; rel="describedby"; type="text/plain"',
    '</.well-known/api-catalog>; rel="api-catalog"',
    '<https://docs.waffuru.ai>; rel="service-doc"',
    '</sitemap.xml>; rel="sitemap"; type="application/xml"',
  ].join(', ');
}

/** Everything an HTML document response gets. */
export function documentHeaders({
  scriptHashes,
  markdownPath,
  locale,
}: {
  scriptHashes: readonly string[];
  markdownPath: string;
  locale: Locale;
}): Record<string, string> {
  return {
    ...BASE_HEADERS,
    'Content-Security-Policy': contentSecurityPolicy(scriptHashes),
    'Permissions-Policy':
      'camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()',
    'Cross-Origin-Opener-Policy': 'same-origin',
    'X-Frame-Options': 'DENY',
    'Content-Language': localeInfo[locale].lang,
    Link: discoveryLinks(markdownPath),
    // The same URL also answers `Accept: text/markdown`.
    Vary: 'Accept',
  };
}
