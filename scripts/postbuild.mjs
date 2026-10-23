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
import { writeMarkdownMirrors } from './postbuild/markdown-mirrors.mjs';
import { writeLlmsTxt } from './postbuild/llms-txt.mjs';
import { writeOgImages } from './postbuild/og-images.mjs';
import { writeWellKnown } from './postbuild/well-known.mjs';
import { writeCspManifest } from './postbuild/csp.mjs';

const ROOT = fileURLToPath(new URL('..', import.meta.url));

/**
 * Each step receives `{ root, out }` and may be async. The markdown mirrors
 * come before llms.txt (llms-full.txt concatenates them), and the CSP
 * manifest stays last: it hashes the final HTML.
 */
const STEPS = [
  ['404 page', copyNotFound],
  ['reserved installer paths', guardReservedPaths],
  ['markdown mirrors', writeMarkdownMirrors],
  ['llms.txt', writeLlmsTxt],
  ['share images', writeOgImages],
  ['well-known files', writeWellKnown],
  ['CSP manifest', writeCspManifest],
];

for (const [name, step] of STEPS) {
  const started = Date.now();
  await step({ root: ROOT, out: `${ROOT}out` });
  console.log(`postbuild: ${name} (${Date.now() - started}ms)`);
}
