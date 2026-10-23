import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import {
  CONSENT_STORAGE_KEY,
  CONSENT_VERSION,
  GEO_STORAGE_KEY,
  acceptConsent,
  acknowledgeConsentNotice,
  closeConsentSettings,
  consentTier,
  declineConsent,
  dismissConsentBanner,
  getConsentCategories,
  getConsentTier,
  getSettingsDefaults,
  hasAnalyticsConsent,
  impliedConsent,
  initConsent,
  isConsentBannerOpen,
  isConsentResolved,
  isConsentSettingsOpen,
  openConsentSettings,
  readStoredConsent,
  resetConsentState,
  saveConsent,
  subscribeConsent,
} from '@/lib/consent';
import type { Geo } from '@/lib/visitor-geo';

const setGpc = (value: boolean | undefined) =>
  Object.defineProperty(window.navigator, 'globalPrivacyControl', {
    value,
    configurable: true,
  });

/** Seeds the session geo cache, as `/api/geo` would, and resolves it. */
const visitFrom = async (
  country: string | null,
  region: string | null = null,
) => {
  window.sessionStorage.setItem(
    GEO_STORAGE_KEY,
    JSON.stringify({ country, region }),
  );
  await initConsent();
};

const stored = () =>
  JSON.parse(window.localStorage.getItem(CONSENT_STORAGE_KEY) ?? 'null');

describe('storage keys', () => {
  it('are namespaced to waffuru, at version 1', () => {
    expect(CONSENT_STORAGE_KEY).toBe('waffuru:consent');
    expect(GEO_STORAGE_KEY).toBe('waffuru:geo');
    expect(CONSENT_VERSION).toBe(1);
  });
});

describe('consent tiers', () => {
  const geo = (country: string | null, region: string | null = null): Geo => ({
    country,
    region,
  });

  it('is strict in the EU/EEA, UK, Switzerland and Quebec', () => {
    for (const country of ['DE', 'FR', 'IE', 'NO', 'IS', 'LI', 'GB', 'CH']) {
      expect(consentTier(geo(country))).toBe('strict');
    }
    expect(consentTier(geo('CA', 'QC'))).toBe('strict');
  });

  it('is notice in the rest of Canada and the rest of the world', () => {
    expect(consentTier(geo('CA', 'AB'))).toBe('notice');
    expect(consentTier(geo('CA', 'ON'))).toBe('notice');
    expect(consentTier(geo('US', 'CA'))).toBe('notice');
    expect(consentTier(geo('JP'))).toBe('notice');
  });

  it('is unknown without a country, or in Canada without a province', () => {
    expect(consentTier(geo(null))).toBe('unknown');
    expect(consentTier(undefined)).toBe('unknown');
    expect(consentTier(null)).toBe('unknown');
    expect(consentTier(geo('CA'))).toBe('unknown');
  });

  it('implies analytics by notice only', () => {
    expect(impliedConsent(geo('US'))).toEqual({ analytics: true });
    expect(impliedConsent(geo('CA', 'BC'))).toEqual({ analytics: true });
    expect(impliedConsent(geo('DE'))).toEqual({ analytics: false });
    expect(impliedConsent(geo('CA', 'QC'))).toEqual({ analytics: false });
    expect(impliedConsent(geo(null))).toEqual({ analytics: false });
  });
});

describe('consent store', () => {
  beforeEach(() => {
    window.localStorage.clear();
    window.sessionStorage.clear();
    resetConsentState();
  });

  afterEach(() => {
    setGpc(undefined);
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it('keeps analytics off and the banner closed until the region is known', () => {
    expect(getConsentCategories()).toEqual({ analytics: false });
    expect(isConsentBannerOpen()).toBe(false);
    expect(isConsentResolved()).toBe(false);
    expect(getConsentTier()).toBe('unknown');
  });

  it('strict: off, banner open, Accept turns it on and stores the record', async () => {
    await visitFrom('DE');
    expect(getConsentTier()).toBe('strict');
    expect(hasAnalyticsConsent()).toBe(false);
    expect(isConsentBannerOpen()).toBe(true);

    const listener = vi.fn();
    const unsubscribe = subscribeConsent(listener);
    acceptConsent();
    unsubscribe();

    expect(listener).toHaveBeenCalled();
    expect(hasAnalyticsConsent()).toBe(true);
    expect(isConsentBannerOpen()).toBe(false);
    expect(stored()).toMatchObject({
      analytics: true,
      source: 'explicit',
      version: CONSENT_VERSION,
    });
  });

  it('strict: Decline stores an explicit refusal and closes the banner', async () => {
    await visitFrom('GB');
    declineConsent();
    expect(hasAnalyticsConsent()).toBe(false);
    expect(isConsentBannerOpen()).toBe(false);
    expect(stored()).toMatchObject({ analytics: false, source: 'explicit' });
  });

  it('unknown behaves as strict', async () => {
    await visitFrom(null);
    expect(getConsentTier()).toBe('unknown');
    expect(isConsentResolved()).toBe(true);
    expect(hasAnalyticsConsent()).toBe(false);
    expect(isConsentBannerOpen()).toBe(true);
  });

  it('Canada without a province behaves as strict', async () => {
    await visitFrom('CA');
    expect(getConsentTier()).toBe('unknown');
    expect(hasAnalyticsConsent()).toBe(false);
    expect(isConsentBannerOpen()).toBe(true);
  });

  it('notice: analytics is on by notice, OK keeps it as an implied record', async () => {
    await visitFrom('US', 'CA');
    expect(getConsentTier()).toBe('notice');
    expect(getConsentCategories()).toEqual({ analytics: true });
    expect(isConsentBannerOpen()).toBe(true);

    acknowledgeConsentNotice();
    expect(isConsentBannerOpen()).toBe(false);
    expect(hasAnalyticsConsent()).toBe(true);
    expect(stored()).toMatchObject({ analytics: true, source: 'implied' });
  });

  it('notice: Opt out turns analytics off', async () => {
    await visitFrom('US');
    declineConsent();
    expect(hasAnalyticsConsent()).toBe(false);
    expect(isConsentBannerOpen()).toBe(false);
    expect(stored()).toMatchObject({ analytics: false, source: 'explicit' });
  });

  it('does not carry an implied OK into an opt-in region', async () => {
    await visitFrom('US');
    acknowledgeConsentNotice();
    expect(hasAnalyticsConsent()).toBe(true);

    // Same browser, now in Germany (a new session resolves a new region).
    resetConsentState();
    await visitFrom('DE');
    expect(hasAnalyticsConsent()).toBe(false);
    expect(isConsentBannerOpen()).toBe(true);
  });

  it('keeps an explicit choice across regions', async () => {
    await visitFrom('DE');
    acceptConsent();
    resetConsentState();
    await visitFrom('US');
    expect(hasAnalyticsConsent()).toBe(true);
    expect(isConsentBannerOpen()).toBe(false);
  });

  it('settings default to what is in effect, never to a preselected yes', async () => {
    await visitFrom('DE');
    expect(getSettingsDefaults()).toEqual({ analytics: false });

    saveConsent({ analytics: true });
    expect(getSettingsDefaults()).toEqual({ analytics: true });

    declineConsent();
    expect(getSettingsDefaults()).toEqual({ analytics: false });

    resetConsentState();
    window.localStorage.clear();
    await visitFrom('US');
    expect(getSettingsDefaults()).toEqual({ analytics: true });
  });

  it('fetches the region once and caches it for the session', async () => {
    const fetchMock = vi.fn(
      async () =>
        new Response(JSON.stringify({ country: 'CA', region: 'QC' }), {
          status: 200,
        }),
    );
    vi.stubGlobal('fetch', fetchMock);
    await Promise.all([initConsent(), initConsent()]);
    await initConsent();

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith('/api/geo', { cache: 'no-store' });
    expect(getConsentTier()).toBe('strict');
    expect(
      JSON.parse(window.sessionStorage.getItem(GEO_STORAGE_KEY) ?? '{}'),
    ).toEqual({ country: 'CA', region: 'QC' });
  });

  it('ignores malformed codes in the lookup answer', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(
        async () =>
          new Response(JSON.stringify({ country: '<script>', region: 'QC' })),
      ),
    );
    await initConsent();
    expect(getConsentTier()).toBe('unknown');
  });

  it('falls back to unknown (strict) when the lookup fails', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => {
        throw new Error('offline');
      }),
    );
    await initConsent();
    expect(getConsentTier()).toBe('unknown');
    expect(isConsentResolved()).toBe(true);
    expect(isConsentBannerOpen()).toBe(true);
    expect(hasAnalyticsConsent()).toBe(false);
  });

  it('falls back to unknown when the endpoint answers an error (local dev)', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => new Response('Not found', { status: 404 })),
    );
    await initConsent();
    expect(getConsentTier()).toBe('unknown');
    expect(window.sessionStorage.getItem(GEO_STORAGE_KEY)).toBeNull();
    expect(isConsentBannerOpen()).toBe(true);
  });

  describe('stored record', () => {
    const put = (value: unknown) =>
      window.localStorage.setItem(
        CONSENT_STORAGE_KEY,
        typeof value === 'string' ? value : JSON.stringify(value),
      );

    it('is read when it is the current version', async () => {
      put({ analytics: true, source: 'explicit', version: 1, ts: 1 });
      await visitFrom('DE');
      expect(readStoredConsent()).toMatchObject({ analytics: true });
      expect(hasAnalyticsConsent()).toBe(true);
      expect(isConsentBannerOpen()).toBe(false);
    });

    it('is ignored when it is from another version', async () => {
      put({ analytics: true, source: 'explicit', version: 0, ts: 1 });
      await visitFrom('DE');
      expect(readStoredConsent()).toBeNull();
      expect(hasAnalyticsConsent()).toBe(false);
      expect(isConsentBannerOpen()).toBe(true);

      put({ analytics: true, source: 'explicit', version: 2, ts: 1 });
      expect(readStoredConsent()).toBeNull();
    });

    it('is ignored when it is malformed', async () => {
      await visitFrom('DE');
      for (const bad of [
        'not json',
        'null',
        { version: 1, ts: 1 },
        { analytics: 'yes', source: 'explicit', version: 1, ts: 1 },
        { analytics: true, source: 'nope', version: 1, ts: 1 },
        { choice: 'accepted', version: 1, ts: 1 },
      ]) {
        put(bad);
        expect(readStoredConsent()).toBeNull();
        expect(isConsentBannerOpen()).toBe(true);
      }
    });
  });

  it('treats Global Privacy Control as declined everywhere, with no banner', async () => {
    acceptConsent();
    setGpc(true);
    await visitFrom('US');
    expect(getConsentCategories()).toEqual({ analytics: false });
    expect(isConsentBannerOpen()).toBe(false);
    expect(stored()).toMatchObject({ analytics: false, source: 'gpc' });

    // The GPC record lapses once the signal is gone, so the visitor is asked.
    setGpc(undefined);
    expect(isConsentBannerOpen()).toBe(true);
  });

  it('opens settings from any tier and hides the banner meanwhile', async () => {
    await visitFrom('FR');
    openConsentSettings();
    expect(isConsentSettingsOpen()).toBe(true);
    expect(isConsentBannerOpen()).toBe(false);

    closeConsentSettings();
    expect(isConsentSettingsOpen()).toBe(false);
    expect(isConsentBannerOpen()).toBe(true);

    openConsentSettings();
    saveConsent({ analytics: true });
    expect(isConsentSettingsOpen()).toBe(false);
    expect(hasAnalyticsConsent()).toBe(true);
  });

  it('dismissing the banner records no choice', async () => {
    await visitFrom('DE');
    dismissConsentBanner();
    expect(isConsentBannerOpen()).toBe(false);
    expect(window.localStorage.getItem(CONSENT_STORAGE_KEY)).toBeNull();
    expect(hasAnalyticsConsent()).toBe(false);

    // A notice visitor who dismisses keeps what applies by notice.
    resetConsentState();
    await visitFrom('US');
    dismissConsentBanner();
    expect(isConsentBannerOpen()).toBe(false);
    expect(hasAnalyticsConsent()).toBe(true);
    expect(window.localStorage.getItem(CONSENT_STORAGE_KEY)).toBeNull();
  });

  it('holds a choice for the page view when storage is blocked', async () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('blocked');
    });
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('blocked');
    });
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => new Response(JSON.stringify({ country: 'DE' }))),
    );
    await initConsent();
    expect(isConsentBannerOpen()).toBe(true);
    acceptConsent();
    expect(hasAnalyticsConsent()).toBe(true);
    expect(isConsentBannerOpen()).toBe(false);
  });
});
