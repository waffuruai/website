// @vitest-environment node
import { afterEach, describe, expect, it } from 'vitest';

import { builtPages, cleanTitle, headInfo, pageOfFile } from './pages.mjs';
import { pageHtml, tempDirs } from './test-utils.mjs';

const dirs = tempDirs();
afterEach(() => dirs.cleanup());

describe('pageOfFile', () => {
  it('maps built files onto locale and route', () => {
    expect(pageOfFile('en.html')).toEqual({ locale: 'en', path: '/' });
    expect(pageOfFile('ja.html')).toEqual({ locale: 'ja', path: '/' });
    expect(pageOfFile('en/about.html')).toEqual({
      locale: 'en',
      path: '/about',
    });
    expect(pageOfFile('fr/blog/introducing-waffuru.html')).toEqual({
      locale: 'fr',
      path: '/blog/introducing-waffuru',
    });
  });

  it('skips 404s, not-found pages and files outside a locale', () => {
    for (const file of [
      '404.html',
      'en/404.html',
      'ko/404.html',
      '_not-found.html',
      '_not-found/index.html',
      'en/_not-found.html',
      '_next/static/x.html',
      'img/page.html',
    ]) {
      expect(pageOfFile(file), file).toBeNull();
    }
  });
});

describe('headInfo', () => {
  it('reads title, description, canonical and language', () => {
    expect(
      headInfo(
        pageHtml({
          lang: 'zh-CN',
          title: 'Iron &amp; kernels · Waffuru',
          description: 'One &quot;kernel&quot; definition.',
          canonical: 'https://waffuru.ai/zh/products/iron',
        }),
      ),
    ).toEqual({
      title: 'Iron & kernels',
      description: 'One "kernel" definition.',
      canonical: 'https://waffuru.ai/zh/products/iron',
      lang: 'zh-CN',
    });
  });

  it('keeps a title that is just the brand and finds attributes in any order', () => {
    const html =
      '<html lang="en"><head><title>Waffuru</title><meta content="Hi" name="description"/></head></html>';
    expect(headInfo(html)).toMatchObject({
      title: 'Waffuru',
      description: 'Hi',
      canonical: undefined,
    });
    expect(cleanTitle('Iron | Waffuru')).toBe('Iron');
    expect(cleanTitle('Introducing Waffuru')).toBe('Introducing Waffuru');
  });
});

describe('builtPages', () => {
  it('lists pages with public URLs, skipping 404s', async () => {
    const out = await dirs.make({
      'en.html': pageHtml({ title: 'Waffuru' }),
      'es.html': pageHtml({ lang: 'es' }),
      'en/about.html': pageHtml({ canonical: 'https://waffuru.ai/about' }),
      'es/legal/terms.html': pageHtml({
        lang: 'es',
        canonical: 'https://waffuru.ai/legal/terms',
      }),
      'ja/products/iron.html': pageHtml({ lang: 'ja' }),
      'en/404.html': pageHtml(),
      '404.html': pageHtml(),
      '_not-found.html': pageHtml(),
    });
    const pages = await builtPages(out);
    expect(pages.map((page) => [page.file, page.url])).toEqual([
      ['en.html', 'https://waffuru.ai'],
      ['en/about.html', 'https://waffuru.ai/about'],
      ['es.html', 'https://waffuru.ai/es'],
      ['es/legal/terms.html', 'https://waffuru.ai/legal/terms'],
      ['ja/products/iron.html', 'https://waffuru.ai/ja/products/iron'],
    ]);
    expect(
      (await builtPages(out, { locales: ['en'] })).map((page) => page.file),
    ).toEqual(['en.html', 'en/about.html']);
  });
});
