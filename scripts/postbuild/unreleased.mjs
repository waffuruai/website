import { readdir, rm, rmdir } from 'node:fs/promises';
import { join } from 'node:path';

import { LOCALES, unreleasedRoutes } from './site.mjs';

/**
 * The files one route's page is built as, in one locale: `<locale><route>`
 * `.html` and `.txt`, plus the `__next.*` segment payloads directly inside
 * `<locale><route>/`. Pages nested under the route stay (`/products/pantry`
 * lives inside `/products`).
 */
async function pageFiles(out, locale, route) {
  const base = join(out, `${locale}${route}`);
  const files = [`${base}.html`, `${base}.txt`];
  const entries = await readdir(base, { withFileTypes: true }).catch(() => []);
  for (const entry of entries) {
    if (entry.isFile() && entry.name.startsWith('__next.')) {
      files.push(join(base, entry.name));
    }
  }
  return files;
}

/**
 * Deletes the pages of sections that have not launched (`site.launched`)
 * from `out/`, in every locale, so production never serves them. Runs before
 * the markdown mirrors, llms.txt and share cards, which follow what is left.
 * `NEXT_PUBLIC_SHOW_UNRELEASED=1` keeps everything (previews of unlaunched
 * work). Returns the routes it pruned.
 */
export async function pruneUnreleased({ out, env = process.env, launched }) {
  const routes = unreleasedRoutes({
    launched,
    unreleased: env.NEXT_PUBLIC_SHOW_UNRELEASED === '1',
  });
  for (const route of routes) {
    for (const locale of LOCALES) {
      for (const file of await pageFiles(out, locale, route)) {
        await rm(file, { force: true });
      }
      // Gone once it is empty; deepest routes run first, so parents follow.
      await rmdir(join(out, `${locale}${route}`)).catch(() => {});
    }
  }
  return routes;
}
