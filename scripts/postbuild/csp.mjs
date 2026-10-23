import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';

import { htmlFiles } from './html-files.mjs';

/** Inline `<script>` elements: no `src`, any type but JSON data blocks. */
const INLINE_SCRIPT = /<script\b([^>]*)>([\s\S]*?)<\/script>/gi;
const DATA_TYPE = /\btype\s*=\s*["']?application\/(ld\+)?json/i;
const HAS_SRC = /\bsrc\s*=/i;

/** `sha256-…` source expressions for every inline script in `html`. */
export function inlineScriptHashes(html) {
  const hashes = new Set();
  for (const [, attributes, body] of html.matchAll(INLINE_SCRIPT)) {
    if (HAS_SRC.test(attributes) || DATA_TYPE.test(attributes)) continue;
    if (!body) continue;
    const digest = createHash('sha256').update(body, 'utf8').digest('base64');
    hashes.add(`'sha256-${digest}'`);
  }
  return [...hashes];
}

/**
 * Writes `worker/generated/csp.json`: for every built page (keyed by its asset
 * path without `.html`, e.g. `/en/about`), the hashes of its inline scripts.
 * The Worker turns them into a per-page `script-src`, so no inline script
 * runs unless it is byte-for-byte what the build produced.
 */
export async function writeCspManifest({ root, out }) {
  const manifest = {};
  for (const file of await htmlFiles(out)) {
    const html = await readFile(join(out, file), 'utf8');
    manifest[`/${file.replace(/\.html$/, '')}`] = inlineScriptHashes(html);
  }
  const target = join(root, 'worker/generated/csp.json');
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, `${JSON.stringify(manifest)}\n`);
}
