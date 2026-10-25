import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

import { attribute, decodeEntities } from './html-to-markdown.mjs';
import { htmlFiles } from './html-files.mjs';
import { LOCALES, SITE, localizedPath, publicUrl } from './site.mjs';

/**
 * Which built page a file is: `en.html` is the English home page, and
 * `en/about/team.html` is `/about/team` in English. Anything that is not a
 * page of a locale (the root `404.html`, `_not-found`, 404 pages, stray HTML
 * in asset folders) is `null`.
 */
export function pageOfFile(file) {
  const parts = file.replace(/\.html$/, '').split('/');
  const [locale, ...rest] = parts;
  if (!LOCALES.includes(locale)) return null;
  const path = rest.length ? `/${rest.join('/')}` : '/';
  if (rest.at(-1) === '404' || rest.some((part) => part.startsWith('_'))) {
    return null;
  }
  return { locale, path: path.replace(/\/index$/, '') || '/' };
}

const BRAND_SUFFIX = new RegExp(`\\s*[|·–—-]\\s*${SITE.name}\\s*$`, 'i');

/** `<title>` without the " · Waffuru" the root layout appends. */
export const cleanTitle = (title) =>
  title.replace(BRAND_SUFFIX, '').trim() || title.trim();

/** The head facts every output step needs, read from a page's HTML. */
export function headInfo(html) {
  const end = html.search(/<\/head>/i);
  const head = end === -1 ? html : html.slice(0, end);
  const rawTitle = head.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? '';
  const tags = (name) =>
    [...head.matchAll(new RegExp(`<${name}\\b([^>]*)>`, 'gi'))].map(
      (found) => found[1],
    );
  const description = tags('meta').find(
    (attributes) =>
      attribute(attributes, 'name')?.toLowerCase() === 'description',
  );
  const canonical = tags('link').find(
    (attributes) => attribute(attributes, 'rel')?.toLowerCase() === 'canonical',
  );
  const lang = html.match(/<html\b([^>]*)>/i)?.[1];
  return {
    title: cleanTitle(decodeEntities(rawTitle).replace(/\s+/g, ' ')),
    description: (
      (description && attribute(description, 'content')) ||
      ''
    ).trim(),
    canonical: canonical ? attribute(canonical, 'href') : undefined,
    lang: lang ? attribute(lang, 'lang') : undefined,
  };
}

/**
 * Every built page under `out/`, in a stable order: `{ file, locale, path,
 * html, url, title, description, lang }`. `url` is the page's public
 * canonical URL (from its `<link rel="canonical">`, else computed). Pass
 * `locales` to keep only some.
 */
export async function builtPages(out, { locales } = {}) {
  const pages = [];
  for (const file of await htmlFiles(out)) {
    const page = pageOfFile(file);
    if (!page || (locales && !locales.includes(page.locale))) continue;
    const html = await readFile(join(out, file), 'utf8');
    const head = headInfo(html);
    pages.push({
      file,
      ...page,
      html,
      url: head.canonical || publicUrl(page.path, page.locale),
      title: head.title,
      description: head.description,
      lang: head.lang,
    });
  }
  return pages;
}

/** Route of the page in `locale` (`/es/about`), as the Worker serves it. */
export const routeOf = (page) => localizedPath(page.path, page.locale);
