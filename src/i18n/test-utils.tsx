import { type Locale } from '@/i18n/config';
import en from '@/i18n/dictionaries/en';
import es from '@/i18n/dictionaries/es';
import fr from '@/i18n/dictionaries/fr';
import ja from '@/i18n/dictionaries/ja';
import ko from '@/i18n/dictionaries/ko';
import zh from '@/i18n/dictionaries/zh';
import { DictionaryProvider } from '@/i18n/dictionary-provider';

const dictionaries = { en, es, fr, zh, ja, ko };

/** Test helper: wraps `ui` in the dictionary provider for `locale`. */
export const withDictionary = (ui: React.ReactNode, locale: Locale = 'en') => (
  <DictionaryProvider locale={locale} dictionary={dictionaries[locale]}>
    {ui}
  </DictionaryProvider>
);
