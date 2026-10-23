/**
 * Response headers for HTML documents: a per-request nonce-based Content
 * Security Policy, transport and isolation headers, and discovery `Link`s for
 * agents.
 */
import type { Locale } from '../src/i18n/config';
import { localeInfo } from '../src/i18n/config';

/** Hosts GA4 reports to (collect endpoints, regional variants). */
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
 * The Content Security Policy for one document. A strict, nonce-based
 * `script-src`: the Worker stamps a fresh nonce on every `<script>` the build
 * produced, and `'strict-dynamic'` lets those scripts load what they need
 * (Next's chunks, gtag.js after consent). Cloudflare reads the nonce from this
 * header and adds it to scripts it injects (bot detection). `'self' https:
 * 'unsafe-inline'` only apply to browsers too old for nonces; modern ones
 * ignore them when a nonce is present. Styles allow inline because React
 * writes style attributes and next-themes injects a `<style>` on theme change.
 */
export function contentSecurityPolicy(nonce: string): string {
  return [
    "default-src 'none'",
    `script-src 'nonce-${nonce}' 'strict-dynamic' 'self' https: 'unsafe-inline'`,
    "style-src 'self' 'unsafe-inline'",
    `img-src 'self' data: ${GA_IMG.join(' ')}`,
    "font-src 'self'",
    `connect-src 'self' ${GA_CONNECT.join(' ')}`,
    "manifest-src 'self'",
    "form-action 'self' https://docs.google.com",
    "frame-ancestors 'none'",
    "base-uri 'none'",
    "object-src 'none'",
  ].join('; ');
}

/** A fresh, unguessable nonce (128 bits, base64). */
export function createNonce(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  return btoa(String.fromCharCode(...bytes));
}

/** Script preloads: under `'strict-dynamic'` they need the nonce too. */
const SCRIPT_PRELOAD =
  /<link\b(?=[^>]*\b(?:as=["']?script\b|rel=["']?modulepreload\b))/gi;

/**
 * Adds `nonce` to every `<script` tag (and script preload) in built HTML.
 * Safe as a plain text pass: the build escapes `<` inside inline JSON and RSC
 * payloads (`\u003c`) and page text renders it as `&lt;`, so `<script` only
 * ever starts a tag.
 */
export function addNonce(html: string, nonce: string): string {
  return html
    .replace(/<script\b/gi, `<script nonce="${nonce}"`)
    .replace(SCRIPT_PRELOAD, `<link nonce="${nonce}"`);
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
    '</sitemap.xml>; rel="sitemap"; type="application/xml"',
  ].join(', ');
}

/** Everything an HTML document response gets. */
export function documentHeaders({
  nonce,
  markdownPath,
  locale,
}: {
  nonce: string;
  markdownPath: string;
  locale: Locale;
}): Record<string, string> {
  return {
    ...BASE_HEADERS,
    'Content-Security-Policy': contentSecurityPolicy(nonce),
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
