#!/usr/bin/env node
/**
 * Runs after `next build` has written the static export to `out/`. Each step
 * is its own module under `scripts/postbuild/` (with a colocated test) and
 * reads or writes `out/`. Order matters: later steps may read what earlier
 * ones wrote.
 *
 *   node scripts/postbuild.mjs
 */
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { copyNotFound } from './postbuild/not-found.mjs';
import { guardReservedPaths } from './postbuild/guard.mjs';
import { checkLinks } from './postbuild/links.mjs';
import { writeMarkdownMirrors } from './postbuild/markdown-mirrors.mjs';
import { writeLlmsTxt } from './postbuild/llms-txt.mjs';
import { writeOgImages } from './postbuild/og-images.mjs';
import { pruneUnreleased } from './postbuild/unreleased.mjs';
import { writeWellKnown } from './postbuild/well-known.mjs';

const ROOT = fileURLToPath(new URL('..', import.meta.url));

// `next build` read these .env files; load them too, in Next's order, so the
// prune sees the same NEXT_PUBLIC_SHOW_UNRELEASED. The shell's env and
// earlier files win (loadEnvFile never overwrites a variable).
for (const file of [
  '.env.production.local',
  '.env.local',
  '.env.production',
  '.env',
]) {
  try {
    process.loadEnvFile(join(ROOT, file));
  } catch {
    // No such file.
  }
}

/**
 * Each step receives `{ root, out }` and may be async. Unlaunched pages go
 * first, so nothing after them mirrors, lists or draws them. The markdown
 * mirrors come before llms.txt (llms-full.txt concatenates them). Links are
 * checked last, against everything that was written.
 */
const STEPS = [
  ['404 page', copyNotFound],
  ['reserved installer paths', guardReservedPaths],
  ['unlaunched pages', pruneUnreleased],
  ['markdown mirrors', writeMarkdownMirrors],
  ['llms.txt', writeLlmsTxt],
  ['share images', writeOgImages],
  ['well-known files', writeWellKnown],
  ['internal links', checkLinks],
];

for (const [name, step] of STEPS) {
  const started = Date.now();
  await step({ root: ROOT, out: `${ROOT}out` });
  console.log(`postbuild: ${name} (${Date.now() - started}ms)`);
}
