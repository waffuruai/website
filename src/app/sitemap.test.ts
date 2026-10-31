// @vitest-environment node
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';

import { afterEach, describe, expect, it, vi } from 'vitest';

import { internalNavHrefs } from '@/content/navigation';
import { site } from '@/content/site';
import { localeInfo, locales } from '@/i18n/config';
import { sectionRoutes, type LaunchSection } from '@/lib/launch';

import sitemap, { dynamic } from './sitemap';

const temp: string[] = [];

/** Runs the sitemap as if the repo root held these `src/content/blog` files. */
function withBlog(files: Record<string, string>) {
  const root = mkdtempSync(path.join(tmpdir(), 'sitemap-'));
  temp.push(root);
  for (const [file, contents] of Object.entries(files)) {
    const target = path.join(root, 'src/content/blog', file);
    mkdirSync(path.dirname(target), { recursive: true });
    writeFileSync(target, contents);
  }
  vi.spyOn(process, 'cwd').mockReturnValue(root);
  return sitemap();
}

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllEnvs();
  for (const dir of temp.splice(0))
    rmSync(dir, { recursive: true, force: true });
});

const post = (title: string, extra = '') =>
  `export const article = {\n  title: '${title}',\n  date: '2026-10-20',\n${extra}};\n\nBody.\n`;

const find = (entries: ReturnType<typeof sitemap>, url: string) =>
  entries.find((entry) => entry.url === url);

describe('sitemap.xml', () => {
  it('is static', () => {
    expect(dynamic).toBe('force-static');
  });

  it('lists the home page and every nav page in all six locales', () => {
    const entries = withBlog({});
    const urls = entries.map((entry) => entry.url);
    expect(urls).toContain('https://waffuru.ai');
    expect(urls).toContain('https://waffuru.ai/ja');
    expect(urls).toContain('https://waffuru.ai/products/iron');
    expect(urls).toContain('https://waffuru.ai/ko/products/iron');
    expect(urls).toContain('https://waffuru.ai/solutions/ai-companies');
    expect(urls).toContain('https://waffuru.ai/about/team');
    expect(urls).toContain('https://waffuru.ai/zh/support');

    for (const href of internalNavHrefs()) {
      const route = href.split(/[?#]/)[0] || '/';
      if (route.startsWith('/legal') || route === '/security') continue;
      for (const locale of locales) {
        const url = `https://waffuru.ai${locale === 'en' ? '' : `/${locale}`}${route === '/' ? '' : route}`;
        expect(urls, url).toContain(url);
      }
    }
  });

  it('lists a gated section in production only once it has launched', () => {
    vi.stubEnv('NODE_ENV', 'production');
    vi.stubEnv('NEXT_PUBLIC_SHOW_UNRELEASED', '');
    const urls = withBlog({}).map((entry) => entry.url);
    for (const [section, routes] of Object.entries(sectionRoutes)) {
      const launched = site.launched[section as LaunchSection];
      for (const route of routes) {
        expect(urls.includes(`https://waffuru.ai${route}`), route).toBe(
          launched,
        );
        expect(urls.includes(`https://waffuru.ai/ja${route}`), route).toBe(
          launched,
        );
      }
    }
  });

  it('never lists a URL twice, a 404, an API path or the English /en prefix', () => {
    const urls = withBlog({}).map((entry) => entry.url);
    expect(new Set(urls).size).toBe(urls.length);
    for (const url of urls) {
      expect(url).toMatch(/^https:\/\/waffuru\.ai($|\/)/);
      expect(url).not.toMatch(/404|\/api|\/en(\/|$)|\/$/);
    }
  });

  it('keys hreflang alternates by language tag, with x-default on English', () => {
    const entry = find(withBlog({}), 'https://waffuru.ai/about');
    const languages = entry?.alternates?.languages as Record<string, string>;
    expect(Object.keys(languages).sort()).toEqual(
      [...locales.map((code) => localeInfo[code].lang), 'x-default'].sort(),
    );
    expect(languages['zh-CN']).toBe('https://waffuru.ai/zh/about');
    expect(languages.en).toBe('https://waffuru.ai/about');
    expect(languages['x-default']).toBe('https://waffuru.ai/about');
    // Every locale's entry carries the same set, itself included.
    const spanish = find(withBlog({}), 'https://waffuru.ai/es/about');
    expect(spanish?.alternates).toEqual(entry?.alternates);
  });

  it('lists the legal pages and the security policy in English only, without alternates', () => {
    const entries = withBlog({});
    for (const route of [
      '/legal',
      '/legal/terms',
      '/legal/privacy',
      '/legal/cookies',
      '/security',
    ]) {
      const entry = find(entries, `https://waffuru.ai${route}`);
      expect(entry, route).toBeDefined();
      expect(entry?.alternates).toBeUndefined();
      expect(
        find(entries, `https://waffuru.ai/es${route}`),
        route,
      ).toBeUndefined();
    }
  });

  it('lists blog posts only in the locales they are written in', () => {
    const entries = withBlog({
      'introducing-waffuru/page.mdx': post('Introducing Waffuru'),
      'introducing-waffuru/page.es.mdx': post('Presentamos Waffuru'),
      'introducing-waffuru/page.ja.mdx': post('Waffuru のご紹介'),
      'english-only/page.mdx': post(
        'English only',
        "  updated: '2026-10-25',\n",
      ),
    });

    const launch = find(entries, 'https://waffuru.ai/blog/introducing-waffuru');
    expect(launch?.alternates?.languages).toEqual({
      en: 'https://waffuru.ai/blog/introducing-waffuru',
      es: 'https://waffuru.ai/es/blog/introducing-waffuru',
      ja: 'https://waffuru.ai/ja/blog/introducing-waffuru',
      'x-default': 'https://waffuru.ai/blog/introducing-waffuru',
    });
    expect(launch?.lastModified).toBe('2026-10-20');
    expect(
      find(entries, 'https://waffuru.ai/es/blog/introducing-waffuru'),
    ).toBeDefined();
    expect(
      find(entries, 'https://waffuru.ai/fr/blog/introducing-waffuru'),
    ).toBeUndefined();

    const englishOnly = find(entries, 'https://waffuru.ai/blog/english-only');
    expect(englishOnly?.alternates).toBeUndefined();
    expect(englishOnly?.lastModified).toBe('2026-10-25');
    expect(
      entries.filter((entry) => entry.url.includes('english-only')),
    ).toHaveLength(1);
  });

  it('skips drafts and anything that is not a post directory', () => {
    const entries = withBlog({
      'draft-post/page.mdx': post('Draft', '  draft: true,\n'),
      'unpublished/page.mdx': post('Unpublished', '  published: false,\n'),
      'README.md': '# not a post',
      'no-page/notes.txt': 'x',
    });
    const urls = entries.map((entry) => entry.url);
    expect(urls.some((url) => url.includes('draft-post'))).toBe(false);
    expect(urls.some((url) => url.includes('unpublished'))).toBe(false);
    expect(urls.some((url) => url.includes('no-page'))).toBe(false);
  });

  it('lists posts newest first after the pages', () => {
    const entries = withBlog({
      'older/page.mdx': post('Older').replace('2026-10-20', '2026-01-01'),
      'newer/page.mdx': post('Newer'),
    });
    const urls = entries.map((entry) => entry.url);
    expect(urls.indexOf('https://waffuru.ai/blog/newer')).toBeLessThan(
      urls.indexOf('https://waffuru.ai/blog/older'),
    );
    expect(urls.indexOf('https://waffuru.ai/legal')).toBeLessThan(
      urls.indexOf('https://waffuru.ai/blog/newer'),
    );
  });

  it('works when there is no blog directory yet', () => {
    expect(() => withBlog({})).not.toThrow();
    expect(sitemap().some((entry) => entry.url.includes('/blog/'))).toBe(false);
  });
});
