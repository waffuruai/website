'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

import {
  useConsentCategory,
  useConsentValue,
} from '@/components/consent/use-consent';
import { localeInfo } from '@/i18n/config';
import { useLocale } from '@/i18n/dictionary-provider';
import {
  grantAnalytics,
  initAnalytics,
  loadGtag,
  revokeAnalytics,
  trackPageView,
} from '@/lib/analytics';
import { initConsent, isConsentResolved } from '@/lib/consent';
import { useSettled } from '@/lib/use-settled';

/**
 * How long an idle visitor waits for gtag.js. Interaction loads it at once;
 * this only covers a visitor who never scrolls, taps or moves the pointer.
 */
const GTAG_DELAY_MS = 3_000;

/**
 * Google Analytics 4, gated by consent (`src/lib/consent.ts` decides per
 * region). Renders nothing. In a production build with a valid
 * `NEXT_PUBLIC_GA_ID` it defines `gtag` and the Consent Mode defaults at
 * once; gtag.js itself is injected only after analytics consent AND the page
 * has settled. Page views are sent by hand on load and on client navigation.
 * Consent changes apply straight away, without a reload.
 */
export function Analytics() {
  const pathname = usePathname();
  const locale = useLocale();
  const analytics = useConsentCategory('analytics');
  const resolved = useConsentValue(isConsentResolved, false);
  const settled = useSettled(GTAG_DELAY_MS);

  useEffect(() => {
    void initConsent();
  }, []);

  useEffect(() => {
    initAnalytics();
  }, []);

  // Wait for the region before treating "off" as a refusal: a visitor in a
  // notice region is "off" for a moment only because it is not known yet.
  useEffect(() => {
    if (analytics) grantAnalytics();
    else if (resolved) revokeAnalytics();
  }, [analytics, resolved]);

  useEffect(() => {
    if (analytics && settled) loadGtag();
  }, [analytics, settled]);

  useEffect(() => {
    if (!analytics) return;
    trackPageView({ pathname, language: localeInfo[locale].lang });
  }, [analytics, pathname, locale]);

  return null;
}
