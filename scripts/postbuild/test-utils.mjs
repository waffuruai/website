/* Fixtures shared by the postbuild tests (not itself a test). */
import { mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';

/** A page the way Next writes it: metadata in the head, content in main. */
export const pageHtml = ({
  lang = 'en',
  title = 'About · Waffuru',
  description = 'Who we are.',
  canonical,
  body = '<h1>About</h1>',
} = {}) =>
  `<!DOCTYPE html><html lang="${lang}"><head><meta charSet="utf-8"/><title>${title}</title><meta name="description" content="${description}"/>${
    canonical ? `<link rel="canonical" href="${canonical}"/>` : ''
  }</head><body><header><nav><a href="/">Home</a></nav></header><main id="main">${body}</main><footer>© Waffuru</footer></body></html>`;

/**
 * Temporary directories for a test file: `make(files)` writes `{ path:
 * contents }` into a fresh one; call `cleanup()` in `afterEach`.
 */
export function tempDirs() {
  const dirs = [];
  return {
    async make(files = {}) {
      const dir = await mkdtemp(join(tmpdir(), 'waffuru-'));
      dirs.push(dir);
      for (const [file, contents] of Object.entries(files)) {
        await mkdir(dirname(join(dir, file)), { recursive: true });
        await writeFile(join(dir, file), contents);
      }
      return dir;
    },
    async cleanup() {
      await Promise.all(
        dirs.splice(0).map((dir) => rm(dir, { recursive: true, force: true })),
      );
    },
  };
}
