// @vitest-environment node
import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { afterEach, describe, expect, it } from 'vitest';

import { guardReservedPaths, installerProducts } from './guard.mjs';

const ROOT = fileURLToPath(new URL('../..', import.meta.url));
let out;

afterEach(async () => {
  if (out) await rm(out, { recursive: true, force: true });
});

const makeOut = async (files) => {
  out = await mkdtemp(join(tmpdir(), 'guard-'));
  for (const file of files) {
    await mkdir(join(out, file, '..'), { recursive: true });
    await writeFile(join(out, file), '');
  }
  return out;
};

describe('guardReservedPaths', () => {
  it('passes when product pages live under /products', async () => {
    await makeOut(['en/products/iron.html', 'ja/products/butter.html']);
    await expect(
      guardReservedPaths({ root: ROOT, out }),
    ).resolves.toBeUndefined();
  });

  it('fails when a page claims an installer path, in any locale', async () => {
    await makeOut(['en/iron.html', 'ko/butter.html']);
    await expect(guardReservedPaths({ root: ROOT, out })).rejects.toThrow(
      /en\/iron\.html.*ko\/butter\.html/,
    );
  });

  it('reads the products from the release manifest', async () => {
    expect(await installerProducts(ROOT)).toEqual(
      expect.arrayContaining(['wrunner', 'wci', 'iron', 'butter']),
    );
  });

  it('checks every locale the site builds', async () => {
    const config = await readFile(join(ROOT, 'src/i18n/config.ts'), 'utf8');
    const guard = await readFile(
      join(ROOT, 'scripts/postbuild/guard.mjs'),
      'utf8',
    );
    const list = (source, name) =>
      source
        .match(new RegExp(`${name} = \\[([^\\]]+)\\]`))[1]
        .replace(/\s/g, '');
    expect(list(guard, 'LOCALES')).toBe(list(config, 'locales'));
  });
});
