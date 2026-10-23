'use client';

import { createContext, useContext } from 'react';

import { defaultLocale, type Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/dictionaries/en';

type DictionaryContextValue = { locale: Locale; dictionary: Dictionary };

// No default value: importing a dictionary here would ship it to every page.
const DictionaryContext = createContext<DictionaryContextValue | null>(null);

/** Makes the active locale's dictionary available to client components. */
export function DictionaryProvider({
  locale,
  dictionary,
  children,
}: DictionaryContextValue & { children: React.ReactNode }) {
  return (
    <DictionaryContext.Provider value={{ locale, dictionary }}>
      {children}
    </DictionaryContext.Provider>
  );
}

function useDictionaryContext() {
  const value = useContext(DictionaryContext);
  if (!value) {
    throw new Error('useDictionary must be used inside <DictionaryProvider>');
  }
  return value;
}

/** The UI dictionary for the current locale (client components). */
export const useDictionary = () => useDictionaryContext().dictionary;

/** The current locale (client components); English outside a provider. */
export const useLocale = () =>
  useContext(DictionaryContext)?.locale ?? defaultLocale;
