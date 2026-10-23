// @vitest-environment node
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

import { afterEach, describe, expect, it } from 'vitest';

import {
  buildLlmsFull,
  buildLlmsTxt,
  installerLines,
  orderPages,
  sectionOf,
  writeLlmsTxt,
} from './llms-txt.mjs';
import { writeMarkdownMirrors } from './markdown-mirrors.mjs';
import { pageHtml, tempDirs } from './test-utils.mjs';

const dirs = tempDirs();
afterEach(() => dirs.cleanup());

const PRODUCTS = [
  { product: 'ops', repo: 'waffuruai/ops', asset: 'bootstrap.sh' },
  { product: 'iron', repo: 'waffuruai/iron', asset: 'install.sh' },
];

const page = (path, title, description = `About ${title}.`, date) => ({
  path,
  title,
  description,
  date,
});

describe('sectionOf', () => {
  it('groups routes by their first segment', () => {
    expect(sectionOf('/products/iron')).toBe('Products');
    expect(sectionOf('/solutions')).toBe('Solutions');
    expect(sectionOf('/about/team')).toBe('Company');
    expect(sectionOf('/brand')).toBe('Company');
    expect(sectionOf('/blog/hello')).toBe('Blog');
    expect(sectionOf('/contact')).toBe('Help');
    expect(sectionOf('/support')).toBe('Help');
    expect(sectionOf('/legal/terms')).toBe('Legal');
    expect(sectionOf('/pricing')).toBe('Other');
  });
});

describe('buildLlmsTxt', () => {
  const text = buildLlmsTxt({
    pages: [
      page('/', 'Waffuru', 'Home.'),
      page('/products/syrup', 'Syrup'),
      page(
        '/products/iron',
        'Iron',
        'One kernel   definition,\nfour backends.',
      ),
      page('/products', 'Products'),
      page('/blog/old', 'Old post', 'Older.', '2026-01-01'),
      page('/blog/new', 'New post', 'Newer.', '2026-10-20'),
      page('/blog', 'Blog'),
      page('/legal/terms', 'Terms'),
      page('/contact', 'Contact'),
      page('/zebra', 'Zebra'),
    ],
    products: PRODUCTS,
    feed: true,
  });

  it('follows the llms.txt format: h1, summary, h2 sections of links', () => {
    expect(text.startsWith('# Waffuru\n\n> ')).toBe(true);
    expect(text).toMatch(
      /> Waffuru is on a mission to democratize access to intelligence\./,
    );
    const headings = [...text.matchAll(/^## (.+)$/gm)].map((m) => m[1]);
    expect(headings).toEqual([
      'Products',
      'Blog',
      'Help',
      'Legal',
      'Other',
      'Docs',
      'Installers',
    ]);
    for (const line of text.split('\n').filter((l) => l.startsWith('- '))) {
      expect(line).toMatch(/^- \[[^\]]+\]\(https?:\/\/[^)\s]+\)(: .+)?$/);
    }
  });

  it('links the English markdown twins as absolute URLs, in reading order', () => {
    const products = text.slice(
      text.indexOf('## Products'),
      text.indexOf('## Blog'),
    );
    expect(products.split('\n').filter((l) => l.startsWith('- '))).toEqual([
      '- [Products](https://waffuru.ai/products.md): About Products.',
      '- [Iron](https://waffuru.ai/products/iron.md): One kernel definition, four backends.',
      '- [Syrup](https://waffuru.ai/products/syrup.md): About Syrup.',
    ]);
    expect(text).not.toContain('(https://waffuru.ai/index.md)');
    expect(text).toContain('[Zebra](https://waffuru.ai/zebra.md)');
  });

  it('lists posts newest first and the feed when there is one', () => {
    const blog = text.slice(text.indexOf('## Blog'), text.indexOf('## Help'));
    expect(blog.indexOf('New post')).toBeLessThan(blog.indexOf('Old post'));
    expect(blog).toContain('[RSS feed](https://waffuru.ai/blog/feed.xml)');
    expect(
      buildLlmsTxt({ pages: [page('/blog', 'Blog')], products: PRODUCTS }),
    ).not.toContain('feed.xml');
  });

  it('explains languages and how to get markdown', () => {
    expect(text).toContain('Accept: text/markdown');
    expect(text).toContain('append `.md`');
    expect(text).toContain('/es, /fr, /zh, /ja and /ko');
    expect(text).toContain('https://waffuru.ai/index.md');
  });

  it('lists the installers from the release manifest', () => {
    const installers = text.slice(text.indexOf('## Installers'));
    expect(installers).toContain('(https://waffuru.ai/ops/bootstrap.sh)');
    expect(installers).toContain(
      '(https://waffuru.ai/ops/bootstrap.sh.sha256)',
    );
    expect(installers).toContain('(https://waffuru.ai/ops/releases.json)');
    expect(installers).toContain('(https://waffuru.ai/iron/install.sh)');
    expect(installerLines(PRODUCTS)).toHaveLength(6);
  });

  it('points docs and early access at their real homes', () => {
    expect(text).toContain('[Documentation](https://docs.waffuru.ai)');
    expect(text).toContain('[Request early access](https://forms.gle/');
  });

  it('keeps the section order when pages are missing', () => {
    const minimal = buildLlmsTxt({ pages: [], products: [] });
    expect([...minimal.matchAll(/^## (.+)$/gm)].map((m) => m[1])).toEqual([
      'Help',
      'Docs',
    ]);
  });
});

describe('orderPages', () => {
  it('puts the home page first, then sections in order', () => {
    const ordered = orderPages([
      page('/legal', 'Legal'),
      page('/about', 'About'),
      page('/', 'Home'),
      page('/products/butter', 'Butter'),
    ]).map((entry) => entry.path);
    expect(ordered).toEqual(['/', '/products/butter', '/about', '/legal']);
  });
});

describe('buildLlmsFull', () => {
  it('concatenates the markdown with separators and no front matter', () => {
    const text = buildLlmsFull([
      {
        title: 'Waffuru',
        url: 'https://waffuru.ai',
        markdown: '---\ntitle: "Waffuru"\n---\n\n# Waffuru\n\nHome.\n',
      },
      {
        title: 'About',
        url: 'https://waffuru.ai/about',
        markdown: '---\ntitle: "About"\n---\n\n# About\n\nUs.\n',
      },
    ]);
    expect(text).toContain('URL: https://waffuru.ai/about');
    expect(text).toContain('# Waffuru\n\nHome.\n');
    expect(text).not.toContain('title: "About"');
    expect(text.indexOf('# Waffuru\n\nHome.')).toBeLessThan(
      text.indexOf('# About\n\nUs.'),
    );
  });
});

describe('writeLlmsTxt', () => {
  it('discovers English pages and writes both files', async () => {
    const out = await dirs.make({
      'en.html': pageHtml({ title: 'Waffuru', description: 'Home page.' }),
      'en/products/iron.html': pageHtml({
        title: 'Iron · Waffuru',
        description: 'Kernels.',
        body: '<h1>Iron</h1><p>One kernel.</p>',
      }),
      'en/blog/hello.html': pageHtml({
        title: 'Hello · Waffuru',
        description: 'First post.',
        body: '<h1>Hello</h1>',
      }),
      'es/products/iron.html': pageHtml({ lang: 'es' }),
      'en/404.html': pageHtml(),
      'blog/feed.xml': '<rss/>',
    });
    const root = await dirs.make({
      'releases/products.json': JSON.stringify(PRODUCTS),
      'src/content/blog/hello/page.mdx':
        "export const article = { title: 'Hello', date: '2026-10-20' };\n\nHi.\n",
    });
    await writeMarkdownMirrors({ root, out });
    await writeLlmsTxt({ root, out });

    const llms = await readFile(join(out, 'llms.txt'), 'utf8');
    expect(llms).toContain(
      '[Iron](https://waffuru.ai/products/iron.md): Kernels.',
    );
    expect(llms).toContain(
      '[Hello](https://waffuru.ai/blog/hello.md): First post.',
    );
    expect(llms).toContain('[RSS feed](https://waffuru.ai/blog/feed.xml)');
    expect(llms).not.toContain('/es/products');
    expect(llms).not.toContain('404');

    const full = await readFile(join(out, 'llms-full.txt'), 'utf8');
    expect(full).toContain('URL: https://waffuru.ai/products/iron');
    expect(full).toContain('One kernel.');
    expect(full).toContain('# Hello\n\nHi.');
    expect(full.indexOf('# Iron')).toBeLessThan(full.indexOf('# Hello'));
  });
});
