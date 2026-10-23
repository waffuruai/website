'use client';

import { useSyncExternalStore } from 'react';

import {
  getConsentCategories,
  subscribeConsent,
  type ConsentCategory,
} from '@/lib/consent';

/**
 * Reads a value from the consent store. `server` is what the server and the
 * hydration pass see (storage is only read in the browser), so markup never
 * mismatches.
 */
export function useConsentValue<T>(read: () => T, server: T): T {
  return useSyncExternalStore(subscribeConsent, read, () => server);
}

/** Whether a consent category is on; `false` on the server and in hydration. */
export const useConsentCategory = (category: ConsentCategory): boolean =>
  useConsentValue(() => getConsentCategories()[category], false);
