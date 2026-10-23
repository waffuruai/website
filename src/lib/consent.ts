/**
 * Region-aware cookie consent for analytics (GA4), the one optional category.
 *
 * Tiers, from the visitor's country and subdivision (`GET /api/geo`):
 * - `strict`: EU/EEA, UK, Switzerland and Quebec. Nothing optional loads
 *   until the visitor opts in.
 * - `notice`: everywhere else. Analytics is on by notice, with an opt-out.
 * - `unknown`: no location (local dev, failed lookup, Canada without a
 *   province). Behaves as `strict`.
 *
 * The visitor's choice lives in `localStorage[CONSENT_STORAGE_KEY]` with a
 * `version`. Bump `CONSENT_VERSION` when a fresh choice is needed: older
 * records are ignored, so the banner shows again. A Global Privacy Control
 * signal (`navigator.globalPrivacyControl === true`) always means analytics
 * is off and nothing is asked. Necessary storage (theme, language, this
 * choice and the session's region) is not gated.
 */

import { parseGeo, UNKNOWN_GEO, type Geo } from '@/lib/visitor-geo';

export const CONSENT_STORAGE_KEY = 'waffuru:consent';
export const GEO_STORAGE_KEY = 'waffuru:geo';
export const CONSENT_VERSION = 1;

export type ConsentCategories = { analytics: boolean };
export type ConsentCategory = keyof ConsentCategories;
export type ConsentSource = 'explicit' | 'implied' | 'gpc';
export type StoredConsent = ConsentCategories & {
  source: ConsentSource;
  version: number;
  ts: number;
};
export type ConsentTier = 'strict' | 'notice' | 'unknown';

/** EU member states (with outermost regions and Åland), EEA, UK, Switzerland. */
const STRICT_COUNTRIES = new Set([
  'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR',
  'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'PL', 'PT', 'RO', 'SK', 'SI',
  'ES', 'SE', 'AX', 'GF', 'GP', 'MQ', 'RE', 'YT', 'MF',
  'IS', 'LI', 'NO',
  'GB', 'CH',
]); // prettier-ignore

const NONE: ConsentCategories = { analytics: false };

declare global {
  interface Navigator {
    globalPrivacyControl?: boolean;
  }
}

const listeners = new Set<() => void>();
let settingsOpen = false;
/** The control that opened the settings, so focus can return to it. */
let settingsOpener: HTMLElement | null = null;
/** Closed with the X or Escape: hides the banner for this page view only. */
let bannerDismissed = false;
/** Fallback when storage is blocked, so a choice holds for this page view. */
let memoryRecord: StoredConsent | null = null;
/** `undefined` until `/api/geo` (or the session cache) answers. */
let geo: Geo | undefined;
let geoRequest: Promise<void> | null = null;

const emit = () => listeners.forEach((listener) => listener());

/** The consent tier for a location. Canada needs a province to be `notice`. */
export const consentTier = (location: Geo | null | undefined): ConsentTier => {
  const country = location?.country;
  if (!country) return 'unknown';
  if (STRICT_COUNTRIES.has(country)) return 'strict';
  if (country === 'CA') {
    if (!location.region) return 'unknown';
    return location.region === 'QC' ? 'strict' : 'notice';
  }
  return 'notice';
};

/** What applies by notice, before the visitor says anything. */
export const impliedConsent = (
  location: Geo | null | undefined,
): ConsentCategories => ({ analytics: consentTier(location) === 'notice' });

/** True when the browser sends the Global Privacy Control opt-out signal. */
export const hasGlobalPrivacyControl = () =>
  typeof navigator !== 'undefined' && navigator.globalPrivacyControl === true;

const isSource = (value: unknown): value is ConsentSource =>
  value === 'explicit' || value === 'implied' || value === 'gpc';

/**
 * The stored record for the current version, or null. Falls back to the
 * in-memory record when storage is unavailable.
 */
export const readStoredConsent = (): StoredConsent | null => {
  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<StoredConsent> | null;
    if (
      !parsed ||
      parsed.version !== CONSENT_VERSION ||
      typeof parsed.analytics !== 'boolean' ||
      !isSource(parsed.source)
    ) {
      return null;
    }
    return parsed as StoredConsent;
  } catch {
    return memoryRecord;
  }
};

/**
 * A record the visitor made. A `gpc` record lapses once GPC is off, and an
 * `implied` one (the notice's OK) only counts where notice is enough, so it
 * never carries over into an opt-in region.
 */
const visitorChoice = (): StoredConsent | null => {
  const stored = readStoredConsent();
  if (!stored) return null;
  if (stored.source === 'gpc' && !hasGlobalPrivacyControl()) return null;
  if (stored.source === 'implied' && consentTier(geo) !== 'notice') return null;
  return stored;
};

/** The categories in effect in the browser (GPC wins, then the choice). */
export const getConsentCategories = (): ConsentCategories => {
  if (typeof window === 'undefined') return NONE;
  if (hasGlobalPrivacyControl()) return NONE;
  const stored = visitorChoice();
  if (stored) return { analytics: stored.analytics };
  return geo ? impliedConsent(geo) : NONE;
};

/**
 * What the settings panel shows when it opens: exactly what is in effect now
 * (the visitor's choice, or what applies by notice), so the switch never
 * proposes consent the visitor has not given. Nothing changes until Save.
 */
export const getSettingsDefaults = (): ConsentCategories =>
  getConsentCategories();

export const hasAnalyticsConsent = () => getConsentCategories().analytics;

/** The visitor's tier; `unknown` until the location is known. */
export const getConsentTier = (): ConsentTier => consentTier(geo);

/** True once the location is known (or its lookup has failed). */
export const isConsentResolved = () => geo !== undefined;

const writeRecord = (categories: ConsentCategories, source: ConsentSource) => {
  const record: StoredConsent = {
    analytics: categories.analytics,
    source,
    version: CONSENT_VERSION,
    ts: Date.now(),
  };
  memoryRecord = record;
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(record));
  } catch {
    // Storage blocked: `memoryRecord` holds the choice for this page view.
  }
};

/** Stores a choice, closes the banner and settings, notifies subscribers. */
export const saveConsent = (
  categories: ConsentCategories,
  source: ConsentSource = 'explicit',
) => {
  writeRecord(categories, source);
  settingsOpen = false;
  emit();
};

/** Strict banner "Accept". */
export const acceptConsent = () => saveConsent({ analytics: true });

/** Strict banner "Decline" and notice banner "Opt out". */
export const declineConsent = () => saveConsent(NONE);

/** Notice banner "OK": keeps what applies by notice for this region. */
export const acknowledgeConsentNotice = () =>
  saveConsent(impliedConsent(geo), 'implied');

const readCachedGeo = (): Geo | null => {
  try {
    const raw = window.sessionStorage.getItem(GEO_STORAGE_KEY);
    return raw ? parseGeo(JSON.parse(raw)) : null;
  } catch {
    return null;
  }
};

const fetchGeo = async (): Promise<Geo> => {
  try {
    const response = await fetch('/api/geo', { cache: 'no-store' });
    if (!response.ok) return UNKNOWN_GEO;
    const location = parseGeo(await response.json());
    try {
      window.sessionStorage.setItem(GEO_STORAGE_KEY, JSON.stringify(location));
    } catch {
      // Storage blocked: looked up again on the next full page load.
    }
    return location;
  } catch {
    return UNKNOWN_GEO;
  }
};

/**
 * Browser-only setup: records a GPC signal, then resolves the visitor's
 * location (session cache first, then `/api/geo`). Safe to call repeatedly.
 */
export const initConsent = (): Promise<void> => {
  if (hasGlobalPrivacyControl() && readStoredConsent()?.source !== 'gpc') {
    writeRecord(NONE, 'gpc');
    emit();
  }
  if (geo) return Promise.resolve();
  const cached = readCachedGeo();
  if (cached) {
    geo = cached;
    emit();
    return Promise.resolve();
  }
  geoRequest ??= fetchGeo().then((location) => {
    geo = location;
    emit();
  });
  return geoRequest;
};

/**
 * Opens the cookie settings panel (footer "Cookie settings"). Pass the
 * control that was activated so focus goes back to it when the panel closes.
 */
export const openConsentSettings = (opener?: HTMLElement | null) => {
  settingsOpener = opener ?? null;
  settingsOpen = true;
  emit();
};

/** The control that opened the settings panel, if it said so. */
export const getSettingsOpener = () => settingsOpener;

/** Closes the settings panel without saving. */
export const closeConsentSettings = () => {
  settingsOpen = false;
  emit();
};

export const isConsentSettingsOpen = () => settingsOpen;

/**
 * Hides the banner for this page view without recording a choice: a strict
 * visitor stays opted out, and is asked again on the next visit.
 */
export const dismissConsentBanner = () => {
  bannerDismissed = true;
  emit();
};

/**
 * The banner shows once the location is known, until a choice is made or it
 * is dismissed. It never shows with GPC on, or while settings are open.
 */
export const isConsentBannerOpen = () =>
  !settingsOpen &&
  !bannerDismissed &&
  geo !== undefined &&
  !hasGlobalPrivacyControl() &&
  visitorChoice() === null;

/** Clears in-memory state (tests only; storage is left alone). */
export const resetConsentState = () => {
  settingsOpen = false;
  settingsOpener = null;
  bannerDismissed = false;
  memoryRecord = null;
  geo = undefined;
  geoRequest = null;
  emit();
};

/** `useSyncExternalStore` subscriber: local changes and other tabs. */
export const subscribeConsent = (listener: () => void) => {
  listeners.add(listener);
  const onStorage = (event: StorageEvent) => {
    if (event.key === CONSENT_STORAGE_KEY) listener();
  };
  window.addEventListener('storage', onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener('storage', onStorage);
  };
};
