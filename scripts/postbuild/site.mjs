/*
 * Site facts the postbuild steps need, mirrored from the TypeScript sources
 * (`src/content/site.ts`, `src/i18n/config.ts`, `src/lib/seo.ts`) because Node
 * cannot import those (path aliases, TypeScript). `site.test.mjs` fails if
 * they drift.
 */

export const SITE_URL = 'https://waffuru.ai';

export const SITE = {
  name: 'Waffuru',
  mission: 'Democratize access to intelligence.',
  description:
    'Waffuru builds GPU kernels (Iron), an inference engine (Butter), a GPU control plane (Waffle) and a memory layer (Syrup) that run models fast on the hardware you already own.',
  earlyAccessUrl: 'https://forms.gle/SHaVSRRWmZKy8UJy7',
  email: 'hello@waffuru.ai',
};

export const DEFAULT_LOCALE = 'en';
export const LOCALES = ['en', 'es', 'fr', 'zh', 'ja', 'ko'];

/** BCP 47 tag per locale (`<html lang>`, `hreflang`). */
export const LOCALE_LANG = {
  en: 'en',
  es: 'es',
  fr: 'fr',
  zh: 'zh-CN',
  ja: 'ja',
  ko: 'ko',
};

/** Locales whose share cards render their own text (the others use English). */
export const OG_LOCALES = ['en', 'es', 'fr'];

/** The public path of `path` (`/about`) in `locale`; English is unprefixed. */
export function localizedPath(path, locale) {
  const clean = path === '/' ? '' : path.replace(/\/$/, '');
  if (locale === DEFAULT_LOCALE) return clean || '/';
  return `/${locale}${clean}`;
}

/** The absolute public URL of a page; the home page has no trailing slash. */
export function publicUrl(path, locale = DEFAULT_LOCALE) {
  const localized = localizedPath(path, locale);
  return localized === '/' ? SITE_URL : `${SITE_URL}${localized}`;
}

/** The markdown twin's public path (`/about.md`; the home page is `/index.md`). */
export const markdownPath = (path) =>
  path === '/' ? '/index.md' : `${path}.md`;
