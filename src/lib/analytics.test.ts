import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import {
  CONSENT_MODE_DEFAULT,
  GA_CONFIG,
  analyticsEnabled,
  clearGaCookies,
  gaCookieDomains,
  gaMeasurementId,
  grantAnalytics,
  initAnalytics,
  loadGtag,
  publicPath,
  revokeAnalytics,
  trackEvent,
  trackPageView,
} from '@/lib/analytics';
import {
  GEO_STORAGE_KEY,
  acceptConsent,
  initConsent,
  resetConsentState,
  saveConsent,
} from '@/lib/consent';

const ID = 'G-TEST123';

/** A production build with a measurement id (the only way GA runs). */
const production = (id: string | null = ID) => {
  vi.stubEnv('NODE_ENV', 'production');
  vi.stubEnv('NEXT_PUBLIC_GA_ID', id ?? undefined);
};

/** Pretends the page is served from `hostname` (jsdom runs on localhost). */
const serveFrom = (hostname: string) =>
  vi.stubGlobal('location', {
    hostname,
    href: `https://${hostname}/about`,
  });

/** What gtag queued, as plain arrays (gtag pushes `arguments` objects). */
const queued = () =>
  (window.dataLayer ?? []).map((entry) =>
    Array.from(entry as ArrayLike<unknown>),
  );
const commands = (name: string) => queued().filter(([cmd]) => cmd === name);
const gtagScripts = () =>
  document.querySelectorAll('script[src*="googletagmanager.com/gtag/js"]');

/** Resolves the visitor's region, as `/api/geo` would. */
const visitFrom = async (country: string | null, region?: string) => {
  window.sessionStorage.setItem(
    GEO_STORAGE_KEY,
    JSON.stringify({ country, region: region ?? null }),
  );
  await initConsent();
};

const clearCookies = () => {
  for (const cookie of document.cookie.split(';')) {
    const name = cookie.split('=')[0]?.trim();
    if (name) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    }
  }
};

beforeEach(() => {
  window.localStorage.clear();
  window.sessionStorage.clear();
  resetConsentState();
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  delete window.gtag;
  delete window.dataLayer;
  delete (window as unknown as Record<string, unknown>)[`ga-disable-${ID}`];
  document.head.querySelectorAll('script').forEach((el) => el.remove());
  clearCookies();
});

describe('gaMeasurementId', () => {
  it('is null outside a production build, even with a valid id', () => {
    vi.stubEnv('NEXT_PUBLIC_GA_ID', ID);
    for (const mode of ['test', 'development']) {
      vi.stubEnv('NODE_ENV', mode);
      expect(gaMeasurementId()).toBeNull();
    }
  });

  it('is null in production without an id', () => {
    production(null);
    expect(gaMeasurementId()).toBeNull();
    production('');
    expect(gaMeasurementId()).toBeNull();
  });

  it('is null for a malformed id', () => {
    for (const bad of [
      'UA-12345-1',
      'g-abc123',
      'G-abc123',
      'G-',
      'G-ABC 123',
      'G-ABC123"></script>',
      ' G-ABC123',
      'GTM-ABC123',
    ]) {
      production(bad);
      expect(gaMeasurementId(), bad).toBeNull();
    }
  });

  it('is the id in production when it is valid', () => {
    production('G-CJS2GCF4EQ');
    expect(gaMeasurementId()).toBe('G-CJS2GCF4EQ');
  });
});

describe('initAnalytics', () => {
  it('does nothing when GA is not configured', () => {
    expect(initAnalytics()).toBeNull();
    expect(window.gtag).toBeUndefined();
    expect(window.dataLayer).toBeUndefined();

    production('nope');
    expect(initAnalytics()).toBeNull();
    expect(window.gtag).toBeUndefined();
    expect(gtagScripts()).toHaveLength(0);
  });

  it('queues Consent Mode v2 defaults (denied), then js and config', () => {
    production();
    expect(initAnalytics()).toBe(ID);

    const [defaults, js, config, ...rest] = queued();
    expect(defaults).toEqual(['consent', 'default', CONSENT_MODE_DEFAULT]);
    expect(CONSENT_MODE_DEFAULT).toEqual({
      analytics_storage: 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      wait_for_update: 500,
    });
    expect(js?.[0]).toBe('js');
    expect(js?.[1]).toBeInstanceOf(Date);
    expect(config?.slice(0, 2)).toEqual(['config', ID]);
    expect(rest).toEqual([]);
  });

  it('configures GA with no signals, no auto page view and a 13 month cookie', () => {
    production();
    serveFrom('waffuru.ai');
    initAnalytics();
    expect(commands('config')[0]?.[2]).toEqual({
      send_page_view: false,
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
      cookie_expires: 13 * 30 * 24 * 60 * 60,
    });
    expect(GA_CONFIG.cookie_expires).toBe(33_696_000);
  });

  it('requests nothing: no script, and collection stays disabled', () => {
    production();
    initAnalytics();
    expect(gtagScripts()).toHaveLength(0);
    expect(
      (window as unknown as Record<string, unknown>)[`ga-disable-${ID}`],
    ).toBe(true);
  });

  it('is idempotent', () => {
    production();
    initAnalytics();
    const length = queued().length;
    initAnalytics();
    expect(queued()).toHaveLength(length);
  });

  it('sends debug_mode on localhost and 127.0.0.1 only', () => {
    production();
    for (const [host, debug] of [
      ['localhost', true],
      ['127.0.0.1', true],
      ['waffuru.ai', false],
      ['www.waffuru.ai', false],
      ['localhost.waffuru.ai', false],
    ] as const) {
      delete window.gtag;
      delete window.dataLayer;
      serveFrom(host);
      initAnalytics();
      const config = commands('config')[0]?.[2] as Record<string, unknown>;
      expect(config.debug_mode, host).toBe(debug ? true : undefined);
    }
  });
});

describe('loadGtag', () => {
  it('does not load gtag.js without consent', async () => {
    production();
    initAnalytics();
    loadGtag();
    expect(gtagScripts()).toHaveLength(0);

    await visitFrom('DE');
    loadGtag();
    expect(gtagScripts()).toHaveLength(0);
  });

  it('does not load gtag.js after a refusal', async () => {
    production();
    initAnalytics();
    await visitFrom('US');
    saveConsent({ analytics: false });
    loadGtag();
    expect(gtagScripts()).toHaveLength(0);
  });

  it('loads gtag.js once, async, as an external script, with consent', async () => {
    production();
    initAnalytics();
    await visitFrom('DE');
    acceptConsent();
    loadGtag();
    loadGtag();

    const scripts = gtagScripts();
    expect(scripts).toHaveLength(1);
    const script = scripts[0] as HTMLScriptElement;
    expect(script.src).toBe(
      `https://www.googletagmanager.com/gtag/js?id=${ID}`,
    );
    expect(script.async).toBe(true);
    // Nothing inline: the CSP only runs scripts carrying the Worker's nonce.
    expect(script.textContent).toBe('');
  });

  it('loads on notice-region consent too', async () => {
    production();
    initAnalytics();
    await visitFrom('US', 'CA');
    loadGtag();
    expect(gtagScripts()).toHaveLength(1);
  });

  it('never loads when GA is not configured', async () => {
    await visitFrom('US');
    loadGtag();
    expect(gtagScripts()).toHaveLength(0);

    production('bad');
    loadGtag();
    expect(gtagScripts()).toHaveLength(0);
  });
});

describe('grantAnalytics and revokeAnalytics', () => {
  const disabled = () =>
    (window as unknown as Record<string, unknown>)[`ga-disable-${ID}`];

  it('grant sends one Consent Mode update and re-enables collection', () => {
    production();
    initAnalytics();
    grantAnalytics();
    grantAnalytics();
    expect(commands('consent').slice(1)).toEqual([
      ['consent', 'update', { analytics_storage: 'granted' }],
    ]);
    expect(disabled()).toBe(false);
  });

  it('revoke updates to denied, disables collection and deletes GA cookies', () => {
    production();
    initAnalytics();
    grantAnalytics();
    document.cookie = '_ga=GA1.1.1.1; path=/';
    document.cookie = `_ga_${ID.slice(2)}=GS2.1.s1; path=/`;
    document.cookie = 'theme=dark; path=/';

    revokeAnalytics();
    expect(commands('consent').slice(1)).toEqual([
      ['consent', 'update', { analytics_storage: 'granted' }],
      ['consent', 'update', { analytics_storage: 'denied' }],
    ]);
    expect(disabled()).toBe(true);
    expect(document.cookie).toBe('theme=dark');
  });

  it('revoke without a prior grant still clears cookies, but queues no update', () => {
    production();
    initAnalytics();
    document.cookie = '_ga=GA1.1.1.1; path=/';
    revokeAnalytics();
    expect(commands('consent')).toHaveLength(1);
    expect(document.cookie).toBe('');
  });

  it('do nothing when GA is not configured', () => {
    document.cookie = '_ga=GA1.1.1.1; path=/';
    grantAnalytics();
    revokeAnalytics();
    expect(window.dataLayer).toBeUndefined();
    // Other local apps on localhost may own `_ga`: leave it alone.
    expect(document.cookie).toBe('_ga=GA1.1.1.1');
  });
});

describe('GA cookies', () => {
  it('deletes _ga and _ga_* but nothing else', () => {
    document.cookie = '_ga=1; path=/';
    document.cookie = '_ga_ABC123=2; path=/';
    document.cookie = '_gat=3; path=/';
    document.cookie = 'waffuru-locale=ja; path=/';
    document.cookie = 'ga=4; path=/';
    clearGaCookies();
    expect(document.cookie.split('; ').sort()).toEqual([
      '_gat=3',
      'ga=4',
      'waffuru-locale=ja',
    ]);
  });

  it('targets the host and each parent domain', () => {
    expect(gaCookieDomains('www.waffuru.ai')).toEqual([
      undefined,
      'www.waffuru.ai',
      'waffuru.ai',
    ]);
    expect(gaCookieDomains('waffuru.ai')).toEqual([undefined, 'waffuru.ai']);
    expect(gaCookieDomains('localhost')).toEqual([undefined]);
    expect(gaCookieDomains('127.0.0.1')).toEqual([undefined]);
    expect(gaCookieDomains('::1')).toEqual([undefined]);
  });

  it('writes an expired cookie for every host and parent domain', () => {
    serveFrom('www.waffuru.ai');
    document.cookie = '_ga=1; path=/';
    const set = vi.spyOn(document, 'cookie', 'set');
    clearGaCookies();
    const writes = set.mock.calls.map(([value]) => value);
    expect(writes).toHaveLength(3);
    for (const write of writes) {
      expect(write).toMatch(/^_ga=; expires=Thu, 01 Jan 1970/);
      expect(write).toContain('path=/');
    }
    expect(
      writes
        .filter((w) => w.includes('domain='))
        .map((w) => /domain=([^;]+)/.exec(w)?.[1]),
    ).toEqual(['www.waffuru.ai', 'waffuru.ai']);
    set.mockRestore();
  });
});

describe('page views and events', () => {
  const setUp = async () => {
    production();
    initAnalytics();
    await visitFrom('US', 'NY');
  };

  it('publicPath strips the build’s /en prefix and keeps other locales', () => {
    expect(publicPath('/en')).toBe('/');
    expect(publicPath('/en/')).toBe('/');
    expect(publicPath('/en/about')).toBe('/about');
    expect(publicPath('/en/products/butter')).toBe('/products/butter');
    expect(publicPath('/about')).toBe('/about');
    expect(publicPath('/')).toBe('/');
    expect(publicPath('/ja')).toBe('/ja');
    expect(publicPath('/ja/about')).toBe('/ja/about');
    expect(publicPath('/zh/blog/hello')).toBe('/zh/blog/hello');
    expect(publicPath('/english')).toBe('/english');
  });

  it('sends page_view with the public path and the page language', async () => {
    await setUp();
    document.title = 'About · Waffuru';
    trackPageView({ pathname: '/en/about', language: 'en' });
    expect(commands('event')).toEqual([
      [
        'event',
        'page_view',
        expect.objectContaining({
          page_path: '/about',
          page_title: 'About · Waffuru',
          page_language: 'en',
        }),
      ],
    ]);
  });

  it('keeps the locale prefix and reports the BCP 47 language', async () => {
    await setUp();
    trackPageView({ pathname: '/zh/about', language: 'zh-CN' });
    expect(commands('event')[0]?.[2]).toMatchObject({
      page_path: '/zh/about',
      page_language: 'zh-CN',
    });
  });

  it('sends no page_view without consent', async () => {
    production();
    initAnalytics();
    await visitFrom('DE');
    trackPageView({ pathname: '/en', language: 'en' });
    expect(commands('event')).toEqual([]);
  });

  it('trackEvent maps the AnalyticsEvent onto a GA4 event', async () => {
    await setUp();
    trackEvent({
      category: 'UI',
      action: 'locale_switch',
      label: 'ja',
      from_locale: 'en',
    });
    expect(commands('event')).toEqual([
      [
        'event',
        'locale_switch',
        { event_category: 'UI', event_label: 'ja', from_locale: 'en' },
      ],
    ]);
  });

  it('trackEvent is a no-op without consent, a configured id, or gtag', async () => {
    production();
    initAnalytics();
    await visitFrom('DE');
    trackEvent({ category: 'UI', action: 'theme_switch', label: 'dark' });
    expect(commands('event')).toEqual([]);

    // Not configured: never throws, never queues.
    delete window.gtag;
    delete window.dataLayer;
    vi.stubEnv('NODE_ENV', 'test');
    acceptConsent();
    expect(() =>
      trackEvent({ category: 'UI', action: 'theme_switch' }),
    ).not.toThrow();
    expect(window.dataLayer).toBeUndefined();
    expect(analyticsEnabled()).toBe(false);
  });
});
