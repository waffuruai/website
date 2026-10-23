/**
 * Google Analytics 4, loaded under the CSP (no inline scripts) and only with
 * the visitor's consent. See `docs/analytics-and-cookies.md` for the flow.
 *
 * GA is "configured" only in a production build with a valid measurement id
 * (`NEXT_PUBLIC_GA_ID`). Everywhere else every function here does nothing.
 * `initAnalytics()` defines `dataLayer`, `gtag` and the Consent Mode v2
 * defaults (all denied) from bundled code; `loadGtag()` then injects the
 * external gtag.js, and the Analytics component only calls it once analytics
 * consent is granted. Until then, and after an opt-out, no request leaves.
 */

import { defaultLocale, splitLocale } from '@/i18n/config';
import { hasAnalyticsConsent } from '@/lib/consent';

export type AnalyticsEvent = {
  category: string;
  action: string;
  label?: string;
  [param: string]: string | number | undefined;
};

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

const GA_ID_PATTERN = /^G-[A-Z0-9]+$/;
const GTAG_SRC = 'https://www.googletagmanager.com/gtag/js';

/**
 * The GA4 measurement id, or null when GA must not run: not a production
 * build, or `NEXT_PUBLIC_GA_ID` missing or malformed. Both variables are
 * referenced literally so Next inlines them at build time.
 */
export function gaMeasurementId(): string | null {
  if (process.env.NODE_ENV !== 'production') return null;
  const id = process.env.NEXT_PUBLIC_GA_ID;
  return id && GA_ID_PATTERN.test(id) ? id : null;
}

/** GA may run here (production build, valid id) and the visitor consents. */
export const analyticsEnabled = () =>
  typeof window !== 'undefined' &&
  gaMeasurementId() !== null &&
  hasAnalyticsConsent();

/** GA4 settings that hold in every tier. `_ga` lasts 13 months at most. */
export const GA_CONFIG = {
  send_page_view: false,
  allow_google_signals: false,
  allow_ad_personalization_signals: false,
  cookie_expires: 13 * 30 * 24 * 60 * 60,
} as const;

/** Consent Mode v2 defaults: everything denied until the visitor says yes. */
export const CONSENT_MODE_DEFAULT = {
  analytics_storage: 'denied',
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  wait_for_update: 500,
} as const;

/** Local builds send hits to GA DebugView instead of the live reports. */
const isLocalHost = () =>
  window.location.hostname === 'localhost' ||
  window.location.hostname === '127.0.0.1';

/** What GA last heard from `consent update`; the default is denied. */
let consentMode: 'granted' | 'denied' = 'denied';

/**
 * Google's documented opt-out switch: while `window['ga-disable-<id>']` is
 * true, gtag.js collects nothing, even if it is already loaded.
 */
const setCollectionDisabled = (id: string, disabled: boolean) => {
  (window as unknown as Record<string, unknown>)[`ga-disable-${id}`] = disabled;
};

/**
 * Defines `dataLayer` and `gtag`, then queues the Consent Mode defaults
 * (denied), `js` and `config`. Nothing is requested: gtag.js is not loaded
 * yet and collection is switched off. Safe to call repeatedly. Returns the
 * measurement id, or null when GA is not configured.
 */
export function initAnalytics(): string | null {
  const id = typeof window === 'undefined' ? null : gaMeasurementId();
  if (!id) return null;
  if (typeof window.gtag === 'function') return id;

  window.dataLayer = window.dataLayer ?? [];
  // gtag.js reads `arguments` objects off the queue, not arrays.
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer?.push(arguments);
  };
  consentMode = 'denied';
  setCollectionDisabled(id, true);

  window.gtag('consent', 'default', CONSENT_MODE_DEFAULT);
  window.gtag('js', new Date());
  window.gtag('config', id, {
    ...GA_CONFIG,
    ...(isLocalHost() ? { debug_mode: true } : {}),
  });
  return id;
}

/**
 * Injects gtag.js. Does nothing without consent, so a caller cannot load it
 * by mistake. Events queued in `dataLayer` are sent when it runs.
 */
export function loadGtag(): void {
  const id = gaMeasurementId();
  if (!id || !analyticsEnabled()) return;
  if (document.querySelector(`script[src^="${GTAG_SRC}"]`)) return;

  const script = document.createElement('script');
  script.async = true;
  script.src = `${GTAG_SRC}?id=${id}`;
  document.head.appendChild(script);
}

/** Analytics consent granted: let GA collect. */
export function grantAnalytics(): void {
  const id = gaMeasurementId();
  if (!id || typeof window.gtag !== 'function') return;
  setCollectionDisabled(id, false);
  if (consentMode === 'granted') return;
  consentMode = 'granted';
  window.gtag('consent', 'update', { analytics_storage: 'granted' });
}

/**
 * Analytics consent not given (declined, opted out, GPC, or an opt-in region
 * with no answer): stop collection and remove any GA cookies.
 */
export function revokeAnalytics(): void {
  const id = gaMeasurementId();
  if (!id || typeof window.gtag !== 'function') return;
  setCollectionDisabled(id, true);
  if (consentMode === 'granted') {
    consentMode = 'denied';
    window.gtag('consent', 'update', { analytics_storage: 'denied' });
  }
  clearGaCookies();
}

/** `_ga` and `_ga_<container>`: the cookies gtag.js sets. */
const GA_COOKIE = /^_ga(_.+)?$/;

/**
 * The `Domain` attributes GA's cookies may carry for a host: none (host
 * only), the host itself and each parent domain (GA defaults to the
 * registrable domain). IP addresses and single labels only get host-only.
 */
export function gaCookieDomains(hostname: string): (string | undefined)[] {
  const domains: (string | undefined)[] = [undefined];
  const labels = hostname.split('.');
  const isIp = hostname.includes(':') || /^\d+(\.\d+){3}$/.test(hostname);
  if (isIp || labels.length < 2) return domains;
  for (let i = 0; i <= labels.length - 2; i++) {
    domains.push(labels.slice(i).join('.'));
  }
  return domains;
}

/** Deletes GA's cookies on this host and its parent domains. */
export function clearGaCookies(): void {
  if (typeof document === 'undefined') return;
  const names = document.cookie
    .split(';')
    .map((cookie) => cookie.split('=')[0]?.trim() ?? '')
    .filter((name) => GA_COOKIE.test(name));

  for (const name of names) {
    for (const domain of gaCookieDomains(window.location.hostname)) {
      document.cookie = [
        `${name}=`,
        'expires=Thu, 01 Jan 1970 00:00:00 GMT',
        'max-age=0',
        'path=/',
        ...(domain ? [`domain=${domain}`] : []),
      ].join('; ');
    }
  }
}

/**
 * The public path for a pathname: the build prefixes English with `/en`,
 * but visitors see `/about`. Other locales keep their prefix (`/ja/about`).
 */
export function publicPath(pathname: string): string {
  const { locale, path } = splitLocale(pathname);
  return locale === null || locale === defaultLocale ? path : pathname;
}

/** Sends a GA4 `page_view` for the current page when analytics is allowed. */
export function trackPageView({
  pathname,
  language,
}: {
  pathname: string;
  /** BCP 47 tag of the page (`<html lang>`), reported as `page_language`. */
  language: string;
}): void {
  if (!analyticsEnabled() || typeof window.gtag !== 'function') return;
  window.gtag('event', 'page_view', {
    page_path: publicPath(pathname),
    page_location: window.location.href,
    page_title: document.title,
    page_language: language,
  });
}

/** Sends a GA4 event when analytics is allowed; otherwise does nothing. */
export function trackEvent({
  category,
  action,
  label,
  ...params
}: AnalyticsEvent): void {
  if (!analyticsEnabled() || typeof window.gtag !== 'function') return;
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    ...params,
  });
}
