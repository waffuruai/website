import type { Localized } from '@/content/types';
import { locales, type Locale } from '@/i18n/config';

/**
 * Picks the entry for `locale`, falling back to English. Marketing pages ship
 * in every locale (`content/locale-parity.test.ts` enforces it), so a
 * fallback here means a translation is missing, not a design choice.
 */
export function localize<T>(entry: Localized<T>, locale: Locale): T {
  return (entry[locale] as T | undefined) ?? entry.en;
}

/** Locales an entry is actually written in (not fallbacks). */
export function writtenLocales<T>(entry: Localized<T>): Locale[] {
  return locales.filter((locale) => entry[locale] !== undefined);
}
