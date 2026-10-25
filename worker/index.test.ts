// @vitest-environment node
import { describe, expect, it, vi } from 'vitest';

import worker from './index';

/** A fake ASSETS binding over an in-memory file table. */
function assets(files: Record<string, { body: string; type?: string }>) {
  const fetch = vi.fn(async (request: Request) => {
    const { pathname } = new URL(request.url);
    const file = files[pathname];
    if (!file) return new Response('missing', { status: 404 });
    return new Response(request.method === 'HEAD' ? null : file.body, {
      headers: { 'Content-Type': file.type ?? 'text/html; charset=utf-8' },
    });
  });
  return { fetch } as unknown as Fetcher & { fetch: typeof fetch };
}

const FILES = {
  '/en': { body: '<h1>home</h1>' },
  '/en/about': {
    body: '<link rel="preload" as="script" href="/_next/a.js"/><link rel="stylesheet" href="/a.css"/><h1>about</h1><script src="/_next/a.js"></script><script>self.__next_f.push([1])</script>',
  },
  '/en/about.md': { body: '# About', type: 'text/markdown' },
  '/ja/about': { body: '<h1>について</h1>' },
  '/en/about.txt': { body: 'rsc', type: 'text/plain' },
  '/en/legal/terms': { body: '<h1>terms</h1>' },
  '/iron/install.sh': { body: '#!/bin/sh', type: 'text/x-sh' },
  '/robots.txt': { body: 'User-agent: *\nAllow: /', type: 'text/plain' },
};

const call = (
  path: string,
  init: RequestInit = {},
  host = 'https://waffuru.ai',
) => {
  const env = { ASSETS: assets(FILES) };
  return {
    env,
    response: worker.fetch(new Request(new URL(path, host), init), env),
  };
};

describe('worker', () => {
  it('serves English pages unprefixed with a nonce CSP on every script', async () => {
    const response = await call('/about').response;
    expect(response.status).toBe(200);
    const csp = response.headers.get('content-security-policy') ?? '';
    const nonce = csp.match(/'nonce-([^']+)'/)?.[1];
    expect(nonce).toMatch(/^[A-Za-z0-9+/]{22}==$/);
    expect(csp).toContain("'strict-dynamic'");
    expect(csp).toContain("frame-ancestors 'none'");
    const html = await response.text();
    expect(html.match(/<script nonce="([^"]+)"/g)).toHaveLength(2);
    expect(html).not.toMatch(/<script(?! nonce)/);
    expect(html).toContain(`<link nonce="${nonce}" rel="preload" as="script"`);
    expect(html).toContain('<link rel="stylesheet"');
    expect(html).toContain(`nonce="${nonce}"`);
    expect(response.headers.get('etag')).toBeNull();
    expect(response.headers.get('strict-transport-security')).toContain(
      'max-age=',
    );
    expect(response.headers.get('content-language')).toBe('en');
    expect(response.headers.get('link')).toContain(
      '</about.md>; rel="alternate"; type="text/markdown"',
    );
    expect(response.headers.get('vary')).toBe('Accept');
    expect(response.headers.get('x-robots-tag')).toBeNull();
  });

  it('uses a different nonce on every request', async () => {
    const nonceOf = async () =>
      (await call('/about').response).headers
        .get('content-security-policy')
        ?.match(/'nonce-([^']+)'/)?.[1];
    expect(await nonceOf()).not.toBe(await nonceOf());
  });

  it('answers Accept: text/markdown with the markdown twin', async () => {
    const response = await call('/about', {
      headers: { accept: 'text/markdown' },
    }).response;
    expect(response.headers.get('content-type')).toBe(
      'text/markdown; charset=utf-8',
    );
    expect(response.headers.get('vary')).toBe('Accept');
    expect(response.headers.get('link')).toBe(
      '<https://waffuru.ai/about>; rel="canonical"',
    );
    expect(await response.text()).toBe('# About');
  });

  it('answers missing pages with a 404 that still carries the CSP', async () => {
    const response = await call('/nope').response;
    expect(response.status).toBe(404);
    expect(response.headers.get('content-security-policy')).toContain(
      "'nonce-",
    );
  });

  it('passes installers through without touching them', async () => {
    const { env, response } = call('/iron/install.sh');
    const res = await response;
    expect(await res.text()).toBe('#!/bin/sh');
    expect(
      new URL(
        (env.ASSETS.fetch as ReturnType<typeof vi.fn>).mock.calls[0][0].url,
      ).pathname,
    ).toBe('/iron/install.sh');
  });

  it('redirects a first visit to an existing translation, once', async () => {
    const response = await call('/about', {
      headers: {
        'sec-fetch-mode': 'navigate',
        'sec-fetch-dest': 'document',
        'accept-language': 'ja',
      },
    }).response;
    expect(response.status).toBe(302);
    expect(response.headers.get('location')).toBe('/ja/about');
    expect(response.headers.get('set-cookie')).toContain('waffuru-locale=ja');
  });

  it('stays in English when the page has no translation', async () => {
    const response = await call('/legal/terms', {
      headers: {
        'sec-fetch-mode': 'navigate',
        'sec-fetch-dest': 'document',
        'accept-language': 'ja',
      },
    }).response;
    expect(response.status).toBe(200);
    expect(await response.text()).toBe('<h1>terms</h1>');
  });

  it('marks preview hosts noindex and serves a disallow-all robots.txt', async () => {
    const page = await call(
      '/about',
      {},
      'https://waffuru-site.example.workers.dev',
    ).response;
    expect(page.headers.get('x-robots-tag')).toBe('noindex, nofollow');
    const robots = await call(
      '/robots.txt',
      {},
      'https://waffuru-site.example.workers.dev',
    ).response;
    expect(await robots.text()).toBe('User-agent: *\nDisallow: /\n');
    const live = await call('/robots.txt').response;
    expect(await live.text()).toContain('Allow: /');
  });

  it('returns JSON 404s for unknown API routes', async () => {
    const response = await call('/api/nope').response;
    expect(response.status).toBe(404);
    expect(await response.json()).toEqual({
      error: 'not_found',
      docs: '/llms.txt',
    });
  });

  it('reports the edge location for consent rules', async () => {
    const request = new Request('https://waffuru.ai/api/geo');
    Object.defineProperty(request, 'cf', {
      value: { country: 'FR', regionCode: 'IDF' },
    });
    const response = await worker.fetch(request, { ASSETS: assets(FILES) });
    expect(await response.json()).toEqual({ country: 'FR', region: 'IDF' });
    expect(response.headers.get('cache-control')).toBe('private, no-store');
  });
});
