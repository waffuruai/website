// @vitest-environment node
import { readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';

import { afterEach, describe, expect, it } from 'vitest';

import { blogSourcePath, writeMarkdownMirrors } from './markdown-mirrors.mjs';
import { pageHtml, tempDirs } from './test-utils.mjs';

const dirs = tempDirs();
afterEach(() => dirs.cleanup());

const read = (out, file) => readFile(join(out, file), 'utf8');

const POST = `export const article = {
  title: 'Introducing Waffuru',
  description: 'Why we are building the stack.',
  date: '2026-10-20',
};

Hello.

\`\`\`sh
curl -fsSL https://waffuru.ai/iron/install.sh | sh
\`\`\`
`;

describe('writeMarkdownMirrors', () => {
  it('writes a twin next to every page, with front matter', async () => {
    const out = await dirs.make({
      'en.html': pageHtml({
        title: 'Waffuru',
        description: 'Home page.',
        body: '<h1>Raw math, <em>pressed</em> into silicon.</h1><p>Hi.</p>',
        canonical: 'https://waffuru.ai',
      }),
      'ja.html': pageHtml({
        lang: 'ja',
        title: 'Waffuru',
        body: '<h1>こんにちは</h1>',
        canonical: 'https://waffuru.ai/ja',
      }),
      'en/about.html': pageHtml({ canonical: 'https://waffuru.ai/about' }),
      'es/legal/terms.html': pageHtml({
        lang: 'es',
        title: 'Términos · Waffuru',
        canonical: 'https://waffuru.ai/legal/terms',
        body: '<h1>Términos</h1>',
      }),
      'en/404.html': pageHtml({ title: 'Lost · Waffuru' }),
      '404.html': pageHtml(),
      '_not-found.html': pageHtml(),
    });
    const root = await dirs.make();
    await writeMarkdownMirrors({ root, out });

    expect(await read(out, 'en.md')).toBe(
      '---\ntitle: "Waffuru"\ndescription: "Home page."\nurl: "https://waffuru.ai"\nlanguage: "en"\n---\n\n# Raw math, *pressed* into silicon.\n\nHi.\n',
    );
    expect(await read(out, 'ja.md')).toContain('url: "https://waffuru.ai/ja"');
    expect(await read(out, 'ja.md')).toContain('language: "ja"');
    expect(await read(out, 'en/about.md')).toContain(
      'title: "About"\ndescription: "Who we are."\nurl: "https://waffuru.ai/about"',
    );
    // A page that canonicalises to English says so.
    expect(await read(out, 'es/legal/terms.md')).toContain(
      'url: "https://waffuru.ai/legal/terms"\nlanguage: "es"',
    );
    const files = (await readdir(out, { recursive: true })).filter((file) =>
      file.endsWith('.md'),
    );
    expect(files.sort()).toEqual([
      'en.md',
      'en/about.md',
      'es/legal/terms.md',
      'ja.md',
    ]);
  });

  it('converts blog posts from their MDX source, per locale', async () => {
    const out = await dirs.make({
      'en/blog/introducing-waffuru.html': pageHtml({
        title: 'Introducing Waffuru · Waffuru',
        canonical: 'https://waffuru.ai/blog/introducing-waffuru',
        body: '<h1>Rendered HTML</h1>',
      }),
      'es/blog/introducing-waffuru.html': pageHtml({
        lang: 'es',
        title: 'Presentamos Waffuru · Waffuru',
        canonical: 'https://waffuru.ai/es/blog/introducing-waffuru',
        body: '<h1>HTML</h1>',
      }),
      'fr/blog/introducing-waffuru.html': pageHtml({
        lang: 'fr',
        title: 'Voici Waffuru · Waffuru',
        canonical: 'https://waffuru.ai/fr/blog/introducing-waffuru',
        body: '<h1>Voici <em>Waffuru</em></h1>',
      }),
    });
    const root = await dirs.make({
      'src/content/blog/introducing-waffuru/page.mdx': POST,
      'src/content/blog/introducing-waffuru/page.es.mdx': POST.replace(
        'Hello.',
        'Hola.',
      ).replace('Introducing Waffuru', 'Presentamos Waffuru'),
    });
    await writeMarkdownMirrors({ root, out });

    const en = await read(out, 'en/blog/introducing-waffuru.md');
    expect(en).toContain('title: "Introducing Waffuru"');
    expect(en).toContain('date: 2026-10-20');
    expect(en).toContain('# Introducing Waffuru\n\nHello.');
    expect(en).toContain('```sh\ncurl -fsSL');
    expect(en).not.toContain('Rendered HTML');

    expect(await read(out, 'es/blog/introducing-waffuru.md')).toContain(
      '# Presentamos Waffuru\n\nHola.',
    );
    // No page.fr.mdx: the French page converts from its HTML.
    expect(await read(out, 'fr/blog/introducing-waffuru.md')).toContain(
      '# Voici *Waffuru*',
    );
  });

  it('works when the blog directory does not exist yet', async () => {
    const out = await dirs.make({
      'en/blog/hello.html': pageHtml({ body: '<h1>Hello</h1>' }),
    });
    const root = await dirs.make();
    await expect(writeMarkdownMirrors({ root, out })).resolves.toBeUndefined();
    expect(await read(out, 'en/blog/hello.md')).toContain('# Hello');
  });
});

describe('blogSourcePath', () => {
  it('maps blog post pages onto their MDX file and nothing else', () => {
    const page = (path, locale = 'en') => ({ path, locale });
    expect(blogSourcePath('/r', page('/blog/hello'))).toBe(
      '/r/src/content/blog/hello/page.mdx',
    );
    expect(blogSourcePath('/r', page('/blog/hello', 'ko'))).toBe(
      '/r/src/content/blog/hello/page.ko.mdx',
    );
    expect(blogSourcePath('/r', page('/blog'))).toBeNull();
    expect(blogSourcePath('/r', page('/about'))).toBeNull();
    expect(blogSourcePath('/r', page('/blog/..'))).toBeNull();
    expect(blogSourcePath('/r', page('/blog/a/b'))).toBeNull();
  });
});
