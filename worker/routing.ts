/**
 * URL routing for the static export, as pure functions so every rule is unit
 * tested without a Workers runtime.
 *
 * The build writes English under `out/en/…`, but English URLs are unprefixed
 * (`/about`). This module decides, for a request, whether to redirect, which
 * built asset answers it, and whether it is a document (HTML page) or a file.
 */
import {
  isLocale,
  LOCALE_COOKIE,
  negotiateLocale,
  readCookie,
  type Locale,
} from '../src/i18n/config';
import { site } from '../src/content/site';
import { prefersMarkdown } from './accept';
import products from '../releases/products.json';

/** Path prefixes the release receiver owns (`/<product>/install.sh`, …). */
export const INSTALLER_PRODUCTS: readonly string[] = products.map(
  (entry) => entry.product,
);

type Section = keyof typeof site.launched;

/**
 * Shortcuts into launch sections, live only once their section launches.
 * Bare product names point at their product pages (`/wpantry` too, after
 * the command's w- prefix); `/iron/…` and `/butter/…` stay installers.
 */
const SECTION_REDIRECTS: Record<Section, Record<string, string>> = {
  pantry: { '/pantry': '/products/pantry', '/wpantry': '/products/pantry' },
  stack: {
    '/iron': '/products/iron',
    '/butter': '/products/butter',
    '/waffle': '/products/waffle',
    '/syrup': '/products/syrup',
    '/stack': '/products',
  },
  solutions: {},
  industries: {},
};

/** The redirects to pages in sections `launched` says are live. */
export function sectionRedirects(
  launched: Record<Section, boolean>,
): Record<string, string> {
  return Object.assign(
    {},
    ...(Object.keys(SECTION_REDIRECTS) as Section[])
      .filter((section) => launched[section])
      .map((section) => SECTION_REDIRECTS[section]),
  );
}

/** Old or typed-from-memory URLs and where they live now. */
export const REDIRECTS: Record<string, string> = {
  ...sectionRedirects(site.launched),
  '/team': '/about/team',
  '/careers': '/about#hiring',
  '/branding': '/brand',
  '/terms': '/legal/terms',
  '/privacy': '/legal/privacy',
  '/cookies': '/legal/cookies',
};

export type Decision =
  /** Redirect; `cookie` is set alongside (the one-time language redirect). */
  | {
      kind: 'redirect';
      location: string;
      status: 301 | 302 | 308;
      cookie?: Locale;
    }
  /** An installer path: hand the request to the assets as-is. */
  | { kind: 'passthrough' }
  | { kind: 'api'; name: string }
  | { kind: 'robots' }
  | {
      kind: 'asset';
      /** Path of the built file to serve (`/en/about`, `/ja.txt`, …). */
      assetPath: string;
      locale: Locale;
      /** An HTML page (no file extension), as opposed to a file. */
      document: boolean;
      /** Serve the page's prebuilt markdown twin instead of its HTML. */
      markdown: boolean;
    };

const lastSegment = (path: string) => path.slice(path.lastIndexOf('/') + 1);

/** Pages have no extension; `.txt`, `.md`, `.xml`, images, … are files. */
export const isDocumentPath = (path: string) =>
  !lastSegment(path).includes('.');

/**
 * Maps an unprefixed public path onto the English build output.
 * `/` → `/en`, `/about` → `/en/about`, `/index.md` → `/en.md`, and the RSC
 * payloads the client router fetches for the home page (`/index.txt`,
 * `/index/__next.…`) → `/en.txt`, `/en/__next.…`.
 */
export function englishAssetPath(path: string): string {
  if (path === '/') return '/en';
  if (path === '/index.txt' || path === '/index.md')
    return `/en${path.slice(6)}`;
  if (path.startsWith('/index/')) return `/en/${path.slice(7)}`;
  return `/en${path}`;
}

/** `/en/…` and `/ja/…`-style paths: the locale and the rest. */
function splitPrefixed(path: string): { locale: Locale | null; rest: string } {
  const [, first = '', ...rest] = path.split('/');
  // `/ja.txt` and `/ja.md` belong to the Japanese home page.
  const bare = first.replace(/\.(txt|md)$/, '');
  if (isLocale(bare)) return { locale: bare, rest: `/${rest.join('/')}` };
  return { locale: null, rest: path };
}

/**
 * The canonical form of `path`, or null when it is already canonical:
 * no trailing slash, no `.html`, no `/index`, no `/en` prefix on pages,
 * and the legacy redirects above.
 */
export function canonicalPath(path: string): string | null {
  let next = path;
  if (next.length > 1 && next.endsWith('/'))
    next = next.replace(/\/+$/, '') || '/';
  if (next.endsWith('.html')) next = next.slice(0, -5);
  if (next === '/index' || next.endsWith('/index'))
    next = next.slice(0, -6) || '/';
  if (isDocumentPath(next) && (next === '/en' || next.startsWith('/en/'))) {
    next = next.slice(3) || '/';
  }
  if (REDIRECTS[next]) next = REDIRECTS[next];
  return next === path ? null : next;
}

type RequestInfo = {
  method: string;
  headers: Headers;
};

/**
 * Whether this request may be sent to the visitor's own language: a real
 * top-level browser navigation (not a prefetch, an RSC fetch or a crawler
 * without Sec-Fetch headers) from someone who has never picked a language.
 */
function languageRedirect(
  path: string,
  { method, headers }: RequestInfo,
): Locale | null {
  if (method !== 'GET') return null;
  if (headers.get('sec-fetch-mode') !== 'navigate') return null;
  if (headers.get('sec-fetch-dest') !== 'document') return null;
  if (headers.get('next-router-prefetch') || headers.get('rsc')) return null;
  if (readCookie(headers.get('cookie'), LOCALE_COOKIE)) return null;
  const wanted = negotiateLocale(headers.get('accept-language'));
  return wanted && wanted !== 'en' ? wanted : null;
}

/**
 * Decides how to answer a request. See the module comment. Pass
 * `languageRedirects: false` to skip the one-time language redirect (the
 * Worker does when the target page does not exist in that language).
 */
export function route(
  url: URL,
  request: RequestInfo,
  { languageRedirects = true }: { languageRedirects?: boolean } = {},
): Decision {
  const path = decodeURI(url.pathname);
  const [, first = ''] = path.split('/');

  if (path === '/robots.txt') return { kind: 'robots' };
  if (first === 'api') return { kind: 'api', name: path.slice(5) };
  if (INSTALLER_PRODUCTS.includes(first) && path !== `/${first}`) {
    return { kind: 'passthrough' };
  }

  const canonical = canonicalPath(path);
  if (canonical !== null) {
    return { kind: 'redirect', location: canonical + url.search, status: 308 };
  }

  const { locale } = splitPrefixed(path);
  const document = isDocumentPath(path);
  const assetPath = locale ? path : englishAssetPath(path);

  if (!locale && document && languageRedirects) {
    const wanted = languageRedirect(path, request);
    if (wanted) {
      const target = `/${wanted}${path === '/' ? '' : path}`;
      return {
        kind: 'redirect',
        location: target + url.search,
        status: 302,
        cookie: wanted,
      };
    }
  }

  return {
    kind: 'asset',
    assetPath,
    locale: locale ?? 'en',
    document,
    markdown: document && prefersMarkdown(request.headers.get('accept')),
  };
}

/** The public markdown URL for a page (what `Link` and `<link>` advertise). */
export function markdownPathFor(publicPath: string): string {
  return publicPath === '/' ? '/index.md' : `${publicPath}.md`;
}

/**
 * Rewrites a `Location` the asset layer produced for an internal `/en/…`
 * path back to its public, unprefixed form. Other locations are untouched.
 */
export function publicLocation(location: string, base: string): string {
  const url = new URL(location, base);
  if (url.pathname !== '/en' && !url.pathname.startsWith('/en/'))
    return location;
  url.pathname = url.pathname.slice(3) || '/';
  return url.origin === new URL(base).origin
    ? url.pathname + url.search + url.hash
    : url.href;
}
