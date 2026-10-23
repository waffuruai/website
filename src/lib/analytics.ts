/**
 * Analytics events. GA4 loads only with consent and only in production builds
 * (see `src/components/providers/analytics.tsx`); until then `trackEvent` is
 * a no-op, so components can call it unconditionally.
 */

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

/** Sends a GA4 event when gtag is loaded; otherwise does nothing. */
export function trackEvent({
  category,
  action,
  label,
  ...params
}: AnalyticsEvent) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function')
    return;
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    ...params,
  });
}
