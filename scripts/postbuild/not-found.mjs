import { copyFile } from 'node:fs/promises';
import { join } from 'node:path';

/**
 * Cloudflare serves the nearest `404.html` for a missing path. Each locale has
 * its own (`out/<locale>/404.html`, from the `[...rest]` route); this puts
 * the English one at the root for every unprefixed URL.
 */
export async function copyNotFound({ out }) {
  await copyFile(join(out, 'en/404.html'), join(out, '404.html'));
}
