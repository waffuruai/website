import type { Metadata } from 'next';

import { site } from '@/content/site';
import {
  defaultLocale,
  localeInfo,
  localizePath,
  locales,
  type Locale,
} from '@/i18n/config';

/** Share card size; every generated card uses it. */
export const OG_IMAGE_SIZE = { width: 1200, height: 630 } as const;

/** Absolute URL for a site path. */
export const absoluteUrl = (path: string) => new URL(path, site.url).href;

/**
 * Locales whose share cards render their own text. Chinese and Japanese
 * pages reuse the English card: the card renderer ships Latin fonts only.
 */
const OG_TEXT_LOCALES: readonly Locale[] = ['en', 'es', 'fr'];

/**
 * Path of the generated share card for a page (`scripts/og-images.mjs` renders
 * one per built page from its title and description).
 */
export function ogImagePath(path: string, locale: Locale): string {
  const cardLocale = OG_TEXT_LOCALES.includes(locale) ? locale : defaultLocale;
  const slug = path === '/' ? '/index' : path.replace(/\/$/, '');
  return `/og/${cardLocale}${slug}.png`;
}

type CreateMetadataOptions = {
  title?: string;
  description: string;
  /** Route path without a locale prefix, e.g. `/about`. */
  path: string;
  locale?: Locale;
  keywords?: string[];
  /** Overrides the generated share card (path or absolute URL). */
  image?: { src: string; alt?: string; width?: number; height?: number };
  /** Utility pages: keep out of search results. */
  noindex?: boolean;
  /**
   * `false` for English-only pages (legal, untranslated posts): canonical
   * points at the English URL and only `x-default` is advertised.
   */
  localized?: boolean;
  /** Locales the page really exists in, when not all of them. */
  availableLocales?: readonly Locale[];
  type?: 'website' | 'article';
};

/**
 * Page metadata with canonical URL, `hreflang` alternates, a markdown
 * alternate for agents, Open Graph and Twitter cards. Relative URLs resolve
 * against `metadataBase` (root layout).
 */
export function createMetadata({
  title,
  description,
  path,
  locale = defaultLocale,
  keywords,
  image,
  noindex = false,
  localized = true,
  availableLocales = locales,
  type = 'website',
}: CreateMetadataOptions): Metadata {
  // The root layout template appends "· Waffuru"; strip a duplicate suffix.
  title = title?.replace(/\s*[|·\-–—:]\s*Waffuru\s*$/i, '').trim() || undefined;
  const pageLocale = localized ? locale : defaultLocale;
  const englishPath = localizePath(path, defaultLocale);
  const canonical = localizePath(path, pageLocale);
  const languages: Record<string, string> = localized
    ? Object.fromEntries(
        availableLocales.map(
          (code) => [localeInfo[code].lang, localizePath(path, code)] as const,
        ),
      )
    : {};
  languages['x-default'] = englishPath;

  const share = image ?? {
    src: ogImagePath(path, pageLocale),
    ...OG_IMAGE_SIZE,
  };
  const images = [
    {
      url: share.src,
      alt: share.alt || title || site.name,
      ...(share.width && share.height
        ? { width: share.width, height: share.height }
        : {}),
    },
  ];
  // Every page has a prebuilt markdown twin for agents (scripts/postbuild).
  const markdown = canonical === '/' ? '/index.md' : `${canonical}.md`;

  return {
    ...(title ? { title } : {}),
    description,
    ...(keywords?.length ? { keywords } : {}),
    alternates: {
      canonical,
      languages,
      types: { 'text/markdown': markdown },
    },
    openGraph: {
      type,
      siteName: site.name,
      title: title ?? site.name,
      description,
      url: canonical,
      locale: localeInfo[pageLocale].og,
      ...(localized
        ? {
            alternateLocale: availableLocales
              .filter((code) => code !== locale)
              .map((code) => localeInfo[code].og),
          }
        : {}),
      images,
    },
    twitter: {
      card: 'summary_large_image',
      site: site.socials.xHandle,
      title: title ?? site.name,
      description,
      images: images.map((entry) => entry.url),
    },
    robots: noindex
      ? { index: false, follow: true }
      : { index: true, follow: true },
  };
}
