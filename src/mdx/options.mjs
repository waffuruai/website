import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { waffuruDark, waffuruLight } from './themes.mjs';

const dir = path.dirname(fileURLToPath(import.meta.url));

/** Absolute path of a plugin that lives next to this file. */
const local = (file) => path.resolve(dir, file);

/**
 * MDX compiler options shared by Next (Turbopack and webpack) and tests.
 *
 * Turbopack serialises loader options to JSON, so every plugin is a module
 * name or absolute path with JSON options: no functions, no plugin instances.
 * Anything function-shaped lives in a local plugin module under `src/mdx/`.
 *
 * @type {NonNullable<import('@next/mdx').NextMDXOptions['options']>}
 */
export const mdxOptions = {
  remarkPlugins: [['remark-gfm'], [local('remark-reading-time.mjs')]],
  rehypePlugins: [
    ['rehype-slug'],
    // After slug: reads the ids the page will carry.
    [local('rehype-toc.mjs')],
    [
      'rehype-pretty-code',
      {
        // Build-time highlighting. Two themes make Shiki emit CSS variables
        // per token (`--shiki-dark` / `--shiki-light`) and no inline colour;
        // `code-block.css` picks one per site theme (dark is the default,
        // `.light` switches), so there is no highlighter JS at runtime.
        theme: { dark: waffuruDark, light: waffuruLight },
        keepBackground: false,
        defaultLang: { block: 'text' },
      },
    ],
  ],
};
