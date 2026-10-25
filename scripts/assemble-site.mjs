#!/usr/bin/env node
/**
 * Assembles `_site/`, the directory the Worker serves as static assets: the
 * Next.js export (`out/`) plus Cloudflare's `_headers` rules. In CI the
 * release receiver then adds the verified installers
 * (`scripts/fetch-releases.sh releases/products.json _site`).
 *
 *   node scripts/assemble-site.mjs
 */
import { cp, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));

await rm(`${ROOT}_site`, { recursive: true, force: true });
await cp(`${ROOT}out`, `${ROOT}_site`, { recursive: true });
console.log('assembled _site/ from out/');
