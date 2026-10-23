import { readdir } from 'node:fs/promises';
import { join, relative, sep } from 'node:path';

/** Every `.html` file under `dir`, as paths relative to it (POSIX slashes). */
export async function htmlFiles(dir) {
  const entries = await readdir(dir, { recursive: true, withFileTypes: true });
  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith('.html'))
    .map((entry) =>
      relative(dir, join(entry.parentPath, entry.name)).split(sep).join('/'),
    )
    .sort();
}
