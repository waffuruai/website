import { notFound } from 'next/navigation';

import { isLocale, locales, type Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/dictionaries/en';

// Each dictionary is its own chunk, so a page only loads the locale it renders.
const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import('@/i18n/dictionaries/en').then((m) => m.default),
  es: () => import('@/i18n/dictionaries/es').then((m) => m.default),
  fr: () => import('@/i18n/dictionaries/fr').then((m) => m.default),
  zh: () => import('@/i18n/dictionaries/zh').then((m) => m.default),
  ja: () => import('@/i18n/dictionaries/ja').then((m) => m.default),
  ko: () => import('@/i18n/dictionaries/ko').then((m) => m.default),
};

/** Loads the UI dictionary for a locale (server components only). */
export const getDictionary = (locale: Locale): Promise<Dictionary> =>
  dictionaries[locale]();

/** Route params shared by every page and layout under `app/[locale]`. */
export type LocaleParams = Promise<{ locale: string }>;

/** Static params for every locale; used by layouts and simple pages. */
export const localeParams = () => locales.map((locale) => ({ locale }));

/** Reads and validates the `[locale]` segment; unknown locales 404. */
export async function resolveLocale(params: LocaleParams): Promise<Locale> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return locale;
}
