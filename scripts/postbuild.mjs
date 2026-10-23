#!/usr/bin/env node
/**
 * Runs after `next build` has written the static export to `out/`. Each step
 * is its own module under `scripts/postbuild/` (with a colocated test) and
 * reads or writes `out/`. Order matters: later steps may read what earlier
 * ones wrote (the CSP manifest hashes the final HTML, so it runs last).
 *
 *   node scripts/postbuild.mjs
 */
import { fileURLToPath } from 'node:url';

import { copyNotFound } from './postbuild/not-found.mjs';
import { guardReservedPaths } from './postbuild/guard.mjs';
import { writeCspManifest } from './postbuild/csp.mjs';

const ROOT = fileURLToPath(new URL('..', import.meta.url));

/** Each step receives `{ root, out }` and may be async. */
const STEPS = [
  ['404 page', copyNotFound],
  ['reserved installer paths', guardReservedPaths],
  ['CSP manifest', writeCspManifest],
];

for (const [name, step] of STEPS) {
  const started = Date.now();
  await step({ root: ROOT, out: `${ROOT}out` });
  console.log(`postbuild: ${name} (${Date.now() - started}ms)`);
}
