// @vitest-environment node
import { readFileSync } from 'node:fs';

import { describe, expect, it } from 'vitest';

import { site } from '../src/content/site';
import { isPublishedPath } from '../src/lib/launch';
import {
  canonicalPath,
  englishAssetPath,
  INSTALLER_PRODUCTS,
  isDocumentPath,
  markdownPathFor,
  publicLocation,
  REDIRECTS,
  route,
  sectionRedirects,
} from './routing';

const BASE = 'https://waffuru.ai';

/** A browser's top-level navigation, the only thing that gets redirected. */
const navigation = (extra: Record<string, string> = {}) => ({
  method: 'GET',
  headers: new Headers({
    'sec-fetch-mode': 'navigate',
    'sec-fetch-dest': 'document',
    ...extra,
  }),
});

const plain = (extra: Record<string, string> = {}) => ({
  method: 'GET',
  headers: new Headers(extra),
});

const decide = (path: string, request = plain()) =>
  route(new URL(path, BASE), request);

describe('englishAssetPath', () => {
  it.each([
    ['/', '/en'],
    ['/about', '/en/about'],
    ['/about.txt', '/en/about.txt'],
    ['/index.txt', '/en.txt'],
    ['/index.md', '/en.md'],
    ['/index/__next._tree.txt', '/en/__next._tree.txt'],
    ['/about/__next._tree.txt', '/en/about/__next._tree.txt'],
  ])('maps %s to %s', (path, asset) => {
    expect(englishAssetPath(path)).toBe(asset);
  });
});

describe('sectionRedirects', () => {
  const none = {
    pantry: false,
    stack: false,
    solutions: false,
    industries: false,
  };

  it('sends shortcuts into a section only once it launches', () => {
    expect(sectionRedirects(none)).toEqual({});
    expect(sectionRedirects({ ...none, pantry: true })).toEqual({
      '/pantry': '/products/pantry',
      '/wpantry': '/products/pantry',
    });
    expect(sectionRedirects({ ...none, stack: true })['/iron']).toBe(
      '/products/iron',
    );
  });

  it('only redirects to pages production publishes', () => {
    for (const target of Object.values(REDIRECTS)) {
      expect(isPublishedPath(target, { unreleased: false }), target).toBe(true);
    }
  });

  it('redirects bare names only, never an installer path under them', () => {
    for (const from of Object.keys(REDIRECTS)) {
      expect(from).toMatch(/^\/[a-z-]+$/);
    }
  });
});

describe('canonicalPath', () => {
  it.each([
    ['/about/', '/about'],
    ['/about.html', '/about'],
    ['/index', '/'],
    ['/index.html', '/'],
    ['/en', '/'],
    ['/en/about', '/about'],
    ['/en/products/iron/', '/products/iron'],
    ['/team', '/about/team'],
  ])('redirects %s to %s', (path, expected) => {
    expect(canonicalPath(path)).toBe(expected);
  });

  it.each(['/', '/about', '/ja/about', '/en.txt', '/en/about.md', '/ja'])(
    'leaves %s alone',
    (path) => {
      expect(canonicalPath(path)).toBeNull();
    },
  );
});

describe('route', () => {
  it('serves unprefixed English pages from out/en', () => {
    expect(decide('/about')).toEqual({
      kind: 'asset',
      assetPath: '/en/about',
      locale: 'en',
      document: true,
      markdown: false,
    });
    expect(decide('/')).toMatchObject({ assetPath: '/en', locale: 'en' });
  });

  it('serves prefixed locales as built', () => {
    expect(decide('/ja/about')).toMatchObject({
      kind: 'asset',
      assetPath: '/ja/about',
      locale: 'ja',
      document: true,
    });
    expect(decide('/zh')).toMatchObject({ assetPath: '/zh', locale: 'zh' });
  });

  it('maps RSC payloads without treating them as documents', () => {
    expect(decide('/about.txt')).toMatchObject({
      assetPath: '/en/about.txt',
      document: false,
    });
    expect(decide('/ja.txt')).toMatchObject({
      assetPath: '/ja.txt',
      locale: 'ja',
      document: false,
    });
  });

  it('308s /en and its pages to the unprefixed URL, keeping the query', () => {
    expect(decide('/en/about?x=1')).toEqual({
      kind: 'redirect',
      location: '/about?x=1',
      status: 308,
    });
  });

  it('passes installer paths through untouched', () => {
    for (const product of INSTALLER_PRODUCTS) {
      expect(decide(`/${product}/install.sh`)).toEqual({ kind: 'passthrough' });
      expect(decide(`/${product}/v1.2.3/install.sh`)).toEqual({
        kind: 'passthrough',
      });
      expect(decide(`/${product}/releases.json`)).toEqual({
        kind: 'passthrough',
      });
    }
  });

  it('serves the Pantry installer from the release receiver', () => {
    expect(INSTALLER_PRODUCTS).toContain('pantry');
  });

  it('routes a bare installer product name like any other path', () => {
    for (const product of INSTALLER_PRODUCTS) {
      expect(decide(`/${product}`), product).not.toEqual({
        kind: 'passthrough',
      });
    }
  });

  it('sends bare product names to their pages once their section launches', () => {
    for (const [from, to, live] of [
      ['/butter', '/products/butter', site.launched.stack],
      ['/pantry', '/products/pantry', site.launched.pantry],
      ['/wpantry', '/products/pantry', site.launched.pantry],
    ] as const) {
      if (live) {
        expect(decide(from), from).toMatchObject({
          kind: 'redirect',
          location: to,
        });
      } else {
        expect(decide(from), from).not.toMatchObject({ kind: 'redirect' });
      }
    }
  });

  it('routes /api and robots.txt to the Worker', () => {
    expect(decide('/api/geo')).toEqual({ kind: 'api', name: 'geo' });
    expect(decide('/api/subscribe')).toEqual({
      kind: 'api',
      name: 'subscribe',
    });
    expect(decide('/robots.txt')).toEqual({ kind: 'robots' });
  });

  describe('markdown negotiation', () => {
    it('serves markdown when the client prefers it', () => {
      expect(
        decide('/about', plain({ accept: 'text/markdown' })),
      ).toMatchObject({
        markdown: true,
      });
      expect(
        decide('/', plain({ accept: 'text/markdown, text/html;q=0.5' })),
      ).toMatchObject({ assetPath: '/en', markdown: true });
    });

    it('keeps HTML for browsers', () => {
      expect(
        decide(
          '/about',
          plain({ accept: 'text/html,application/xhtml+xml,*/*;q=0.8' }),
        ),
      ).toMatchObject({ markdown: false });
    });

    it('never negotiates files', () => {
      expect(
        decide('/about.txt', plain({ accept: 'text/markdown' })),
      ).toMatchObject({
        markdown: false,
      });
    });
  });

  describe('one-time language redirect', () => {
    it('sends a first-time Japanese visitor to /ja and sets the cookie', () => {
      expect(
        decide(
          '/about',
          navigation({ 'accept-language': 'ja-JP,ja;q=0.9,en;q=0.8' }),
        ),
      ).toEqual({
        kind: 'redirect',
        location: '/ja/about',
        status: 302,
        cookie: 'ja',
      });
      expect(
        decide('/', navigation({ 'accept-language': 'zh-TW' })),
      ).toMatchObject({ location: '/zh', cookie: 'zh' });
    });

    it('never redirects someone who has picked a language', () => {
      expect(
        decide(
          '/about',
          navigation({ 'accept-language': 'ja', cookie: 'waffuru-locale=en' }),
        ),
      ).toMatchObject({ kind: 'asset', locale: 'en' });
    });

    it('ignores English, unsupported languages and non-navigations', () => {
      expect(
        decide('/', navigation({ 'accept-language': 'en-US' })),
      ).toMatchObject({
        kind: 'asset',
      });
      expect(
        decide('/', navigation({ 'accept-language': 'de-DE' })),
      ).toMatchObject({
        kind: 'asset',
      });
      // A prefetch or crawler: no Sec-Fetch navigation headers.
      expect(decide('/', plain({ 'accept-language': 'ja' }))).toMatchObject({
        kind: 'asset',
      });
      expect(
        decide('/', {
          ...navigation({ 'accept-language': 'ja' }),
          method: 'HEAD',
        }),
      ).toMatchObject({ kind: 'asset' });
    });

    it('never redirects prefixed pages or files', () => {
      expect(
        decide('/fr/about', navigation({ 'accept-language': 'ja' })),
      ).toMatchObject({
        kind: 'asset',
        locale: 'fr',
      });
      expect(
        decide('/about.txt', navigation({ 'accept-language': 'ja' })),
      ).toMatchObject({
        kind: 'asset',
      });
    });

    it('can be switched off when the target page does not exist', () => {
      expect(
        route(
          new URL('/legal/terms', BASE),
          navigation({ 'accept-language': 'ja' }),
          {
            languageRedirects: false,
          },
        ),
      ).toMatchObject({ kind: 'asset', assetPath: '/en/legal/terms' });
    });
  });
});

describe('helpers', () => {
  it('tells pages from files', () => {
    expect(isDocumentPath('/about')).toBe(true);
    expect(isDocumentPath('/')).toBe(true);
    expect(isDocumentPath('/about.md')).toBe(false);
  });

  it('builds markdown URLs', () => {
    expect(markdownPathFor('/')).toBe('/index.md');
    expect(markdownPathFor('/ja/about')).toBe('/ja/about.md');
  });

  it('strips /en from asset-layer redirects', () => {
    expect(publicLocation('/en/about', BASE)).toBe('/about');
    expect(publicLocation('https://waffuru.ai/en', BASE)).toBe('/');
    expect(publicLocation('/ja/about', BASE)).toBe('/ja/about');
  });
});

describe('wrangler.jsonc', () => {
  it('bypasses the Worker for exactly the installer products', () => {
    const config = readFileSync(
      new URL('../wrangler.jsonc', import.meta.url),
      'utf8',
    );
    for (const product of INSTALLER_PRODUCTS) {
      expect(config).toContain(`"!/${product}/*"`);
    }
  });
});
