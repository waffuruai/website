/**
 * The waffuru.ai Worker. It runs in front of the static export (Workers
 * static assets) for pages and the `/api/*` endpoints; build assets
 * (`/_next/static`, `/img`, fonts) and installers bypass it entirely (see
 * `run_worker_first` in wrangler.jsonc).
 *
 * What it adds over plain static hosting:
 * - unprefixed English URLs served from `out/en/…`, `/en/…` 308'd away;
 * - a one-time redirect to the visitor's language on first navigation;
 * - `Accept: text/markdown` answered with each page's markdown twin;
 * - per-page hash-based CSP and security headers on every document;
 * - `noindex` everywhere except the production host.
 */
import cspManifest from './generated/csp.json';
import { BASE_HEADERS, documentHeaders, PRODUCTION_HOST } from './headers';
import { handleGeo } from './geo';
import { handleSubscribe } from './subscribe';
import {
  markdownPathFor,
  publicLocation,
  route,
  type Decision,
} from './routing';
import { LOCALE_COOKIE } from '../src/i18n/config';

export interface Env {
  ASSETS: Fetcher;
}

const manifest = cspManifest as Record<string, string[]>;

const ONE_YEAR = 60 * 60 * 24 * 365;

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      ...BASE_HEADERS,
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  });

/** Disallow-all robots on preview hosts; the real one elsewhere. */
async function robots(request: Request, env: Env, production: boolean) {
  if (production) return env.ASSETS.fetch(request);
  return new Response('User-agent: *\nDisallow: /\n', {
    headers: { ...BASE_HEADERS, 'Content-Type': 'text/plain; charset=utf-8' },
  });
}

/** Fetches a built file by path, keeping the original method and headers. */
const fetchAsset = (env: Env, request: Request, path: string) =>
  env.ASSETS.fetch(new Request(new URL(path, request.url), request));

/** Whether a built page exists (used before a language redirect). */
async function pageExists(env: Env, request: Request, path: string) {
  const response = await env.ASSETS.fetch(
    new Request(new URL(path, request.url), { method: 'HEAD' }),
  );
  return response.ok;
}

/** Copies `response` with extra headers (asset responses are immutable). */
function withHeaders(response: Response, extra: Record<string, string>) {
  const headers = new Headers(response.headers);
  for (const [name, value] of Object.entries(extra)) headers.set(name, value);
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

async function serveAsset(
  request: Request,
  env: Env,
  decision: Extract<Decision, { kind: 'asset' }>,
  production: boolean,
): Promise<Response> {
  const url = new URL(request.url);
  const robotsHeader: Record<string, string> = production
    ? {}
    : { 'X-Robots-Tag': 'noindex, nofollow' };

  if (decision.markdown) {
    const response = await fetchAsset(env, request, `${decision.assetPath}.md`);
    if (response.ok) {
      return withHeaders(response, {
        ...BASE_HEADERS,
        'Content-Type': 'text/markdown; charset=utf-8',
        Vary: 'Accept',
        // The HTML page is the one to index; this is its twin for agents.
        'X-Robots-Tag': 'noindex',
        Link: `<${url.origin}${url.pathname}>; rel="canonical"`,
      });
    }
  }

  let response = await fetchAsset(env, request, decision.assetPath);

  // The asset layer canonicalises `/en/x/` → `/en/x`; keep URLs public.
  const location = response.headers.get('Location');
  if (location && response.status >= 300 && response.status < 400) {
    response = withHeaders(response, {
      Location: publicLocation(location, request.url),
    });
  }

  if (!decision.document) {
    return withHeaders(response, { ...BASE_HEADERS, ...robotsHeader });
  }

  // A missing page is answered with its locale's 404.html; hash that page.
  const key =
    response.status === 404 ? `/${decision.locale}/404` : decision.assetPath;
  return withHeaders(response, {
    ...documentHeaders({
      scriptHashes: manifest[key] ?? [],
      markdownPath: markdownPathFor(url.pathname),
      locale: decision.locale,
    }),
    ...robotsHeader,
  });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const production = url.hostname === PRODUCTION_HOST;
    let decision = route(url, request);

    // Only redirect to a language the page actually exists in.
    if (decision.kind === 'redirect' && decision.cookie) {
      const target = new URL(decision.location, url).pathname;
      if (!(await pageExists(env, request, target))) {
        decision = route(url, request, { languageRedirects: false });
      }
    }

    switch (decision.kind) {
      case 'passthrough':
        return env.ASSETS.fetch(request);
      case 'robots':
        return robots(request, env, production);
      case 'api':
        if (decision.name === 'geo') return handleGeo(request);
        if (decision.name === 'subscribe') return handleSubscribe(request);
        return json({ error: 'not_found', docs: '/llms.txt' }, 404);
      case 'redirect': {
        const headers = new Headers({
          ...BASE_HEADERS,
          Location: decision.location,
          'Cache-Control': 'no-store',
        });
        if (decision.cookie) {
          headers.set(
            'Set-Cookie',
            `${LOCALE_COOKIE}=${decision.cookie}; Path=/; Max-Age=${ONE_YEAR}; SameSite=Lax; Secure`,
          );
          headers.set('Vary', 'Accept-Language, Cookie');
        }
        return new Response(null, { status: decision.status, headers });
      }
      case 'asset':
        return serveAsset(request, env, decision, production);
    }
  },
} satisfies ExportedHandler<Env>;
