import { readFile, stat } from 'node:fs/promises';
import { join } from 'node:path';

import { getLinks, stripScripts } from '../check-site.mjs';
import { installerProducts } from './guard.mjs';
import { htmlFiles } from './html-files.mjs';
import { DEFAULT_LOCALE, LOCALES, SITE_URL } from './site.mjs';

const exists = (path) =>
  stat(path).then(
    (info) => info.isFile(),
    () => false,
  );

/** Every `id` on a page, for checking `#fragment` links. */
const idsOf = (html) =>
  new Set([...stripScripts(html).matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));

/**
 * The built file a same-site path is served from, or null when the path is
 * not ours to check (installers, the API, Next's assets). Pages map onto
 * `out/<locale>/…​.html` (English is unprefixed); files are looked up as is
 * and under `out/en`, the way the Worker serves them.
 */
export function targetsOf(pathname, installers) {
  const [, first = ''] = pathname.split('/');
  if (installers.includes(first) || ['api', '_next'].includes(first)) {
    return null;
  }
  const clean = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
  const last = clean.slice(clean.lastIndexOf('/') + 1);
  if (last.includes('.')) return [clean, `/${DEFAULT_LOCALE}${clean}`];
  if (LOCALES.includes(first) && first !== DEFAULT_LOCALE) {
    return [`${clean}.html`];
  }
  return [
    clean === '/'
      ? `/${DEFAULT_LOCALE}.html`
      : `/${DEFAULT_LOCALE}${clean}.html`,
  ];
}

/**
 * Fails the build on any link to a page that was not built: an unlaunched
 * section, a typo or a removed page. Checks every same-site `<a href>` in
 * every built page, and `#fragment` targets on the page they point at.
 * Runs last, after everything that writes pages or files.
 */
export async function checkLinks({ root, out }) {
  const installers = await installerProducts(root);
  const files = await htmlFiles(out);
  const pages = new Map();
  const load = async (file) => {
    if (!pages.has(file)) {
      pages.set(
        file,
        await readFile(join(out, file), 'utf8').catch(() => null),
      );
    }
    return pages.get(file);
  };

  const broken = [];
  for (const file of files) {
    const html = await load(file);
    for (const href of new Set(getLinks(html))) {
      let url;
      try {
        url = new URL(href, `${SITE_URL}/${file}`);
      } catch {
        continue;
      }
      if (url.origin !== SITE_URL) continue;
      const fragment = decodeURIComponent(url.hash.slice(1));
      const samePage = href.startsWith('#');

      const targets = samePage
        ? [`/${file}`]
        : targetsOf(decodeURIComponent(url.pathname), installers);
      if (!targets) continue;

      let found = null;
      for (const target of targets) {
        if (await exists(join(out, target))) {
          found = target;
          break;
        }
      }
      if (!found) {
        broken.push(`${file} → ${href}`);
        continue;
      }
      if (fragment && found.endsWith('.html')) {
        const page = await load(found.slice(1));
        if (page && !idsOf(page).has(fragment)) {
          broken.push(`${file} → ${href} (no #${fragment})`);
        }
      }
    }
  }

  if (broken.length) {
    throw new Error(
      `Links to pages or anchors that were not built:\n  ${broken.join('\n  ')}`,
    );
  }
}
