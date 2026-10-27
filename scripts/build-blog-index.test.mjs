// @vitest-environment node
import {
  copyFile,
  mkdir,
  mkdtemp,
  readFile,
  realpath,
  rm,
  writeFile,
} from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { afterEach, describe, expect, it } from 'vitest';

import { renderIndex, renderLocales, scanPosts } from './build-blog-index.mjs';

let dir;
afterEach(async () => {
  if (dir) await rm(dir, { recursive: true, force: true });
});

describe('blog index', () => {
  it('finds each post and its translations, ignoring other files', async () => {
    dir = await mkdtemp(join(tmpdir(), 'blog-'));
    await mkdir(join(dir, 'b-post'));
    await mkdir(join(dir, 'a-post'));
    for (const file of ['page.mdx', 'page.ja.mdx', 'notes.md', 'cover.png']) {
      await writeFile(join(dir, 'b-post', file), '');
    }
    await writeFile(join(dir, 'a-post', 'page.mdx'), '');
    await writeFile(join(dir, 'README.md'), '');
    expect(await scanPosts(dir)).toEqual({
      'a-post': { en: 'page.mdx' },
      'b-post': { en: 'page.mdx', ja: 'page.ja.mdx' },
    });
  });

  it('renders literal imports, English first', () => {
    const text = renderIndex({
      post: { ko: 'page.ko.mdx', en: 'page.mdx', es: 'page.es.mdx' },
    });
    expect(text).toContain(
      "    en: () => import('@/content/blog/post/page.mdx'),\n    es: () => import('@/content/blog/post/page.es.mdx'),\n    ko: () => import('@/content/blog/post/page.ko.mdx'),",
    );
    expect(text).not.toContain('${');
  });

  it('lists the locales each post is written in, English first', () => {
    const text = renderLocales({
      post: { ko: 'page.ko.mdx', en: 'page.mdx' },
      solo: { en: 'page.mdx' },
    });
    expect(text).toContain("  'post': ['en', 'ko'],");
    expect(text).toContain("  'solo': ['en'],");
    expect(text).not.toContain('import(');
  });

  it('runs as a CLI from a checkout path containing spaces', async () => {
    dir = await realpath(await mkdtemp(join(tmpdir(), 'website blog ')));
    await mkdir(join(dir, 'scripts'));
    await mkdir(join(dir, 'src/content/blog/example'), { recursive: true });
    await writeFile(join(dir, 'src/content/blog/example/page.mdx'), '');
    const script = join(dir, 'scripts/build-blog-index.mjs');
    await copyFile(new URL('./build-blog-index.mjs', import.meta.url), script);
    execFileSync(process.execPath, [script], { cwd: dir });
    expect(
      await readFile(join(dir, 'src/generated/blog-posts.ts'), 'utf8'),
    ).toContain('@/content/blog/example/page.mdx');
  });

  it('handles a missing blog folder', async () => {
    expect(await scanPosts('/definitely/not/here')).toEqual({});
  });
});
