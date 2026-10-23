import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

import mdx from '@mdx-js/rollup';
import type { PluggableList } from 'unified';
import { describe, expect, it } from 'vitest';

import { mdxOptions } from './options.mjs';

type PluginEntry = string | [string, ...unknown[]];

/** The options as plain data: names, absolute paths and JSON options. */
const options = mdxOptions as unknown as {
  remarkPlugins: PluginEntry[];
  rehypePlugins: PluginEntry[];
};

/** Resolves entries the way @next/mdx's loader does: by module name or path. */
async function load(entry: PluginEntry) {
  const [name, ...rest] = Array.isArray(entry) ? entry : [entry];
  const mod = await import(/* @vite-ignore */ name as string);
  return [mod.default ?? mod, ...rest];
}

async function compile(source: string, file = 'page.mdx') {
  const plugin = mdx({
    remarkPlugins: (await Promise.all(
      options.remarkPlugins.map(load),
    )) as PluggableList,
    rehypePlugins: (await Promise.all(
      options.rehypePlugins.map(load),
    )) as PluggableList,
    providerImportSource: '@mdx-js/react',
  });
  const result = await plugin.transform(source, path.resolve(file));
  return result?.code ?? '';
}

describe('mdxOptions', () => {
  it('survives JSON serialisation (Turbopack passes loader options as JSON)', () => {
    expect(JSON.parse(JSON.stringify(mdxOptions))).toEqual(mdxOptions);
  });

  it('references plugins by module name or by absolute path to a real file', () => {
    const entries = [...options.remarkPlugins, ...options.rehypePlugins];
    for (const entry of entries) {
      const name = Array.isArray(entry) ? entry[0] : entry;
      expect(typeof name).toBe('string');
      if (path.isAbsolute(name)) expect(existsSync(name), name).toBe(true);
    }
  });

  it('runs slug before the table of contents, and highlighting', () => {
    const names = options.rehypePlugins.map((entry) =>
      path.basename(String(Array.isArray(entry) ? entry[0] : entry)),
    );
    expect(names.indexOf('rehype-slug')).toBeLessThan(
      names.indexOf('rehype-toc.mjs'),
    );
    expect(names).toContain('rehype-pretty-code');
  });
});

describe('compiled post', () => {
  it('exports reading time and headings, and highlights at build time', async () => {
    const code = await compile(
      [
        '## First *one*',
        '',
        'Some words to read here.',
        '',
        '```rust title="unary.rs"',
        'pub fn iron_exp() {}',
        '```',
        '',
        '```sh',
        'curl -fsSL https://waffuru.ai/iron/install.sh | sh',
        '```',
        '',
        '## Second',
        '',
        '## First one',
      ].join('\n'),
    );

    // Exported by the local plugins, no regex re-reading of the source.
    expect(code).toContain('export const readingTime = {');
    expect(code).toMatch(/"minutes": 1/);
    // Duplicate headings get distinct ids from rehype-slug, and the TOC uses them.
    expect(code).toContain('export const toc = [{');
    for (const id of ['first-one', 'second', 'first-one-1']) {
      expect(code).toContain(`"id": "${id}"`);
    }
    // Highlighted by Shiki into CSS variables, not by script at runtime.
    expect(code).toContain('"data-rehype-pretty-code-figure"');
    expect(code).toContain('"data-rehype-pretty-code-title"');
    expect(code).toContain('children: "unary.rs"');
    expect(code).toContain('"data-language": "rust"');
    expect(code).toContain('"data-language": "sh"');
    expect(code).toContain('"--shiki-dark"');
    expect(code).toContain('"--shiki-light"');
  });

  it('compiles the launch post with the real options', async () => {
    const file = 'src/content/blog/introducing-waffuru/page.mdx';
    const code = await compile(readFileSync(file, 'utf8'), file);

    const words = Number(/"words": (\d+)/.exec(code)?.[1]);
    expect(words).toBeGreaterThanOrEqual(900);
    expect(words).toBeLessThanOrEqual(1300);

    const ids = [...code.matchAll(/"id": "([a-z0-9-]+)"/g)].map((m) => m[1]);
    expect(ids).toEqual([
      'why-now',
      'what-we-are-building',
      'what-we-value',
      'whos-in-the-kitchen',
      'where-we-are',
      'follow-along',
    ]);

    // Both blocks are highlighted, and the Rust one carries its file name.
    expect(code).toContain('children: "unary.rs"');
    expect(code).toContain('"data-language": "rust"');
    expect(code).toContain('"data-language": "sh"');
    expect(code).toContain('export const article');
  });
});
