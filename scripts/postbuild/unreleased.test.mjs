// @vitest-environment node
import { readdir } from 'node:fs/promises';
import { join, relative } from 'node:path';

import { afterEach, describe, expect, it } from 'vitest';

import { tempDirs } from './test-utils.mjs';
import { pruneUnreleased } from './unreleased.mjs';

const { make, cleanup } = tempDirs();
afterEach(cleanup);

/** The files Next writes for one page. */
const page = (locale, route) => ({
  [`${locale}${route}.html`]: '<html></html>',
  [`${locale}${route}.txt`]: 'rsc',
  [`${locale}${route}/__next._tree.txt`]: 'rsc',
  [`${locale}${route}/__next._full.txt`]: 'rsc',
});

const listing = async (dir) =>
  (await readdir(dir, { recursive: true, withFileTypes: true }))
    .filter((entry) => entry.isFile())
    .map((entry) => relative(dir, join(entry.parentPath, entry.name)))
    .sort();

const pantryOnly = {
  pantry: true,
  stack: false,
  solutions: false,
  industries: false,
};

const fixture = () =>
  make({
    ...page('en', '/products'),
    ...page('en', '/products/iron'),
    ...page('en', '/products/pantry'),
    ...page('ja', '/products/pantry'),
    ...page('ja', '/industries'),
    ...page('ja', '/industries/government'),
    ...page('es', '/solutions/neoclouds'),
    ...page('en', '/about'),
  });

describe('pruneUnreleased', () => {
  it('deletes unlaunched pages in every locale and keeps the rest', async () => {
    const out = await fixture();
    const routes = await pruneUnreleased({
      out,
      env: {},
      launched: pantryOnly,
    });
    expect(routes).toContain('/products/iron');
    expect(routes).not.toContain('/products/pantry');

    expect(await listing(out)).toEqual(
      [
        ...Object.keys(page('en', '/products/pantry')),
        ...Object.keys(page('ja', '/products/pantry')),
        ...Object.keys(page('en', '/about')),
      ].sort(),
    );
    // Emptied folders go too.
    await expect(readdir(join(out, 'ja/industries'))).rejects.toThrow();
    await expect(readdir(join(out, 'en/products/iron'))).rejects.toThrow();
  });

  it('keeps everything when the build shows unreleased sections', async () => {
    const out = await fixture();
    const before = await listing(out);
    const routes = await pruneUnreleased({
      out,
      env: { NEXT_PUBLIC_SHOW_UNRELEASED: '1' },
      launched: pantryOnly,
    });
    expect(routes).toEqual([]);
    expect(await listing(out)).toEqual(before);
  });
});
