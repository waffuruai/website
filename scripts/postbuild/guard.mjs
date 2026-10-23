import { readFile, stat } from 'node:fs/promises';
import { join } from 'node:path';

const LOCALES = ['en', 'es', 'fr', 'zh', 'ja'];

const exists = (path) =>
  stat(path).then(
    () => true,
    () => false,
  );

/** Product names the release receiver publishes installers under. */
export async function installerProducts(root) {
  const manifest = JSON.parse(
    await readFile(join(root, 'releases/products.json'), 'utf8'),
  );
  return manifest.map((entry) => entry.product);
}

/**
 * Fails the build if the site claims a path the release receiver owns.
 * `scripts/fetch-releases.sh` merges installers into `/<product>/`, so a page
 * at `/iron` (or `/en/iron`, which the Worker serves as `/iron`) would mix
 * with installer files. Product pages live under `/products/<name>`.
 */
export async function guardReservedPaths({ root, out }) {
  const clashes = [];
  for (const product of await installerProducts(root)) {
    for (const prefix of ['', ...LOCALES.map((l) => `${l}/`)]) {
      for (const candidate of [
        `${prefix}${product}`,
        `${prefix}${product}.html`,
      ]) {
        if (await exists(join(out, candidate))) clashes.push(candidate);
      }
    }
  }
  if (clashes.length) {
    throw new Error(
      `Site output collides with installer paths: ${clashes.join(', ')}`,
    );
  }
}
