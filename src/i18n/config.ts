/**
 * Locale configuration shared by the Worker, layouts, metadata and client
 * components. Zero dependencies, so the Worker can import it too.
 *
 * English is the default and is served unprefixed (`/about`); the other
 * locales live under `/<code>` (`/ja/about`). The build still emits English
 * under `out/en/…`; the Worker maps unprefixed URLs onto those files.
 */
export const locales = ['en', 'es', 'fr', 'zh', 'ja', 'ko'] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

/**
 * Cookie remembering a language: set by the language switcher (an explicit
 * choice) and by the Worker's one-time browser-language redirect. Same name
 * as docs.waffuru.ai's storage key so the two read alike.
 */
export const LOCALE_COOKIE = 'waffuru-locale';

type LocaleInfo = {
  /** BCP 47 tag for `<html lang>` and `hreflang`. */
  lang: string;
  /** `og:locale` value. */
  og: string;
  /** Native name, shown in the language switcher. */
  label: string;
};

export const localeInfo: Record<Locale, LocaleInfo> = {
  en: { lang: 'en', og: 'en_US', label: 'English' },
  es: { lang: 'es', og: 'es_ES', label: 'Español' },
  fr: { lang: 'fr', og: 'fr_FR', label: 'Français' },
  zh: { lang: 'zh-CN', og: 'zh_CN', label: '简体中文' },
  ja: { lang: 'ja', og: 'ja_JP', label: '日本語' },
  ko: { lang: 'ko', og: 'ko_KR', label: '한국어' },
};

export const isLocale = (value: unknown): value is Locale =>
  typeof value === 'string' && (locales as readonly string[]).includes(value);

/** Splits a leading locale segment (`/ja`, `/en`, …) off a pathname. */
export function splitLocale(pathname: string): {
  locale: Locale | null;
  path: string;
} {
  const [, first = '', ...rest] = pathname.split('/');
  if (isLocale(first)) {
    return { locale: first, path: `/${rest.join('/')}` };
  }
  return { locale: null, path: pathname || '/' };
}

/**
 * Builds the public URL path for `path` in `locale`. The default locale is
 * unprefixed; any locale prefix already on `path` is replaced. External
 * URLs, hashes and `mailto:` links are returned unchanged.
 */
export function localizePath(path: string, locale: Locale): string {
  if (!path.startsWith('/') || path.startsWith('//')) return path;

  const match = path.match(/^([^?#]*)(.*)$/);
  const pathname = match?.[1] ?? path;
  const suffix = match?.[2] ?? '';
  const { path: bare } = splitLocale(pathname);
  const clean = bare === '/' ? '' : bare.replace(/\/$/, '');

  if (locale === defaultLocale) return `${clean || '/'}${suffix}`;
  return `/${locale}${clean}${suffix}`;
}

/** Reads a cookie value from a raw `Cookie` header. */
export function readCookie(
  header: string | null | undefined,
  name: string,
): string | undefined {
  return header
    ?.split(';')
    .map((part) => part.trim().split('='))
    .find(([key]) => key === name)?.[1];
}

/**
 * The first supported locale in an `Accept-Language` header, by q-weight,
 * or null when none matches. Region subtags are ignored (`zh-TW` → `zh`).
 */
export function negotiateLocale(
  header: string | null | undefined,
): Locale | null {
  const ranked = (header ?? '')
    .split(',')
    .map((entry) => {
      const [tag = '', ...params] = entry.trim().split(';');
      const q = params.find((p) => p.trim().startsWith('q='));
      return {
        language: tag.trim().toLowerCase().split('-')[0],
        q: q ? Number(q.trim().slice(2)) || 0 : 1,
      };
    })
    .filter(({ language, q }) => language && q > 0)
    .sort((a, z) => z.q - a.q);

  const language = ranked.find((entry) => isLocale(entry.language))?.language;
  return isLocale(language) ? language : null;
}

/** Replaces `{name}` placeholders in a dictionary string. */
export function interpolate(
  template: string,
  values: Record<string, string | number>,
): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in values ? String(values[key]) : match,
  );
}
