import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { CookieBanner } from '@/components/consent/cookie-banner';
import { Analytics } from '@/components/providers/analytics';
import type { Locale } from '@/i18n/config';
import en from '@/i18n/dictionaries/en';
import { withDictionary } from '@/i18n/test-utils';
import {
  CONSENT_STORAGE_KEY,
  CONSENT_VERSION,
  GEO_STORAGE_KEY,
  resetConsentState,
} from '@/lib/consent';

const ID = 'G-TEST123';

// The route the page is on, and whether the page has "settled" (loaded and
// interacted with, or timed out): both are driven by the tests.
const page = vi.hoisted(() => ({ pathname: '/en', settled: true }));
vi.mock('next/navigation', () => ({
  usePathname: () => page.pathname,
}));
vi.mock('@/lib/use-settled', () => ({ useSettled: () => page.settled }));

/** A production build with a measurement id (the only way GA runs). */
const production = (id: string | null = ID) => {
  vi.stubEnv('NODE_ENV', 'production');
  vi.stubEnv('NEXT_PUBLIC_GA_ID', id ?? undefined);
};

const serveFrom = (hostname: string) =>
  vi.stubGlobal('location', { hostname, href: `https://${hostname}/` });

/** Seeds the session geo cache so the region resolves on mount. */
const visitFrom = (country: string | null, region: string | null = null) =>
  window.sessionStorage.setItem(
    GEO_STORAGE_KEY,
    JSON.stringify({ country, region }),
  );

const store = (record: Record<string, unknown>) =>
  window.localStorage.setItem(
    CONSENT_STORAGE_KEY,
    JSON.stringify({ version: CONSENT_VERSION, ts: 1, ...record }),
  );

const setGpc = (value: boolean | undefined) =>
  Object.defineProperty(window.navigator, 'globalPrivacyControl', {
    value,
    configurable: true,
  });

const queued = () =>
  (window.dataLayer ?? []).map((entry) =>
    Array.from(entry as ArrayLike<unknown>),
  );
const commands = (name: string) => queued().filter(([cmd]) => cmd === name);
const pageViews = () =>
  commands('event')
    .filter(([, name]) => name === 'page_view')
    .map(([, , params]) => params as Record<string, unknown>);
const gtagScripts = () =>
  document.querySelectorAll('script[src*="googletagmanager.com"]');
const disabled = () =>
  (window as unknown as Record<string, unknown>)[`ga-disable-${ID}`];

const ui = (locale: Locale = 'en') =>
  withDictionary(
    <>
      <Analytics />
      <CookieBanner />
    </>,
    locale,
  );

const setup = (locale: Locale = 'en') => render(ui(locale));
const button = (name: string) => screen.getByRole('button', { name });

describe('Analytics', () => {
  beforeEach(() => {
    window.localStorage.clear();
    window.sessionStorage.clear();
    resetConsentState();
    page.pathname = '/en';
    page.settled = true;
  });

  afterEach(() => {
    setGpc(undefined);
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
    delete window.gtag;
    delete window.dataLayer;
    delete (window as unknown as Record<string, unknown>)[`ga-disable-${ID}`];
    document.head.querySelectorAll('script').forEach((el) => el.remove());
    document.cookie = '_ga=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
    document.cookie = `_ga_TEST123=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
  });

  it('renders nothing itself', () => {
    production();
    visitFrom('US');
    const { container } = render(withDictionary(<Analytics />));
    expect(container.innerHTML).toBe('');
  });

  describe('is inert unless GA is configured', () => {
    it('outside a production build', () => {
      // NODE_ENV is "test" here; a valid id alone is not enough.
      vi.stubEnv('NEXT_PUBLIC_GA_ID', ID);
      visitFrom('US');
      setup();
      expect(window.gtag).toBeUndefined();
      expect(window.dataLayer).toBeUndefined();
      expect(gtagScripts()).toHaveLength(0);
    });

    it.each([
      ['missing', null],
      ['empty', ''],
      ['a Universal Analytics id', 'UA-12345-1'],
      ['lowercase', 'g-test123'],
      ['not an id', 'nope'],
    ])('in production when the id is %s', (_name, id) => {
      production(id);
      visitFrom('US');
      store({ analytics: true, source: 'explicit' });
      setup();
      expect(window.gtag).toBeUndefined();
      expect(window.dataLayer).toBeUndefined();
      expect(gtagScripts()).toHaveLength(0);
    });

    it('still shows the banner and records choices', async () => {
      visitFrom('DE');
      setup();
      expect(
        screen.getByRole('region', { name: en.consent.label }),
      ).toBeTruthy();
      fireEvent.click(button(en.consent.accept));
      expect(window.localStorage.getItem(CONSENT_STORAGE_KEY)).toContain(
        '"analytics":true',
      );
      expect(gtagScripts()).toHaveLength(0);
    });
  });

  describe('opt-in regions (EU/EEA, UK, CH, Quebec, unknown)', () => {
    it('defines gtag with denied defaults but requests nothing before consent', () => {
      production();
      visitFrom('DE');
      setup();

      expect(typeof window.gtag).toBe('function');
      expect(commands('consent')).toEqual([
        [
          'consent',
          'default',
          expect.objectContaining({
            analytics_storage: 'denied',
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            wait_for_update: 500,
          }),
        ],
      ]);
      expect(gtagScripts()).toHaveLength(0);
      expect(pageViews()).toEqual([]);
      expect(disabled()).toBe(true);
    });

    it('Accept grants consent, sends the page view and loads gtag.js', () => {
      production();
      visitFrom('DE');
      page.pathname = '/en/about';
      setup();
      fireEvent.click(button(en.consent.accept));

      expect(commands('consent')[1]).toEqual([
        'consent',
        'update',
        { analytics_storage: 'granted' },
      ]);
      expect(disabled()).toBe(false);
      expect(pageViews()).toHaveLength(1);
      expect(gtagScripts()).toHaveLength(1);
      expect((gtagScripts()[0] as HTMLScriptElement).src).toBe(
        `https://www.googletagmanager.com/gtag/js?id=${ID}`,
      );
    });

    it('queues js and config before the first event, as gtag.js expects', () => {
      production();
      visitFrom('FR');
      setup();
      fireEvent.click(button(en.consent.accept));
      const order = queued().map(([cmd, name]) =>
        cmd === 'event' ? name : cmd,
      );
      expect(order).toEqual([
        'consent',
        'js',
        'config',
        'consent',
        'page_view',
      ]);
    });

    it('Decline loads nothing, sends nothing and removes GA cookies', () => {
      production();
      visitFrom('GB');
      document.cookie = '_ga=GA1.1.1.1; path=/';
      document.cookie = '_ga_TEST123=GS2.1.s1; path=/';
      setup();
      fireEvent.click(button(en.consent.decline));

      expect(gtagScripts()).toHaveLength(0);
      expect(pageViews()).toEqual([]);
      expect(commands('consent')).toHaveLength(1);
      expect(disabled()).toBe(true);
      expect(document.cookie).toBe('');
    });

    it('applies a stored yes before the region is known', async () => {
      production();
      let answer: (value: Response) => void = () => {};
      vi.stubGlobal(
        'fetch',
        vi.fn(() => new Promise<Response>((resolve) => (answer = resolve))),
      );
      store({ analytics: true, source: 'explicit' });
      document.cookie = '_ga=GA1.1.1.1; path=/';
      setup();
      // A returning visitor with a stored yes: collection starts straight
      // away, since an explicit choice does not depend on the region.
      expect(pageViews()).toHaveLength(1);
      await act(async () => {
        answer(new Response(JSON.stringify({ country: 'DE', region: null })));
      });
      expect(document.cookie).toContain('_ga=');
    });

    it('waits for the region before treating "off" as a refusal', async () => {
      production();
      let answer: (value: Response) => void = () => {};
      vi.stubGlobal(
        'fetch',
        vi.fn(() => new Promise<Response>((resolve) => (answer = resolve))),
      );
      document.cookie = '_ga=GA1.1.1.1; path=/';
      setup();
      // Region unknown: analytics is off but nothing is revoked yet.
      expect(document.cookie).toContain('_ga=');

      await act(async () => {
        answer(new Response(JSON.stringify({ country: 'US', region: 'NY' })));
      });
      // Notice region: on by notice, so the cookie is kept and GA loads.
      expect(document.cookie).toContain('_ga=');
      expect(gtagScripts()).toHaveLength(1);
    });

    it('stays off when the lookup fails (unknown is strict)', async () => {
      production();
      vi.stubGlobal(
        'fetch',
        vi.fn(async () => new Response('nope', { status: 404 })),
      );
      document.cookie = '_ga=GA1.1.1.1; path=/';
      await act(async () => {
        setup();
      });
      expect(gtagScripts()).toHaveLength(0);
      expect(pageViews()).toEqual([]);
      expect(document.cookie).toBe('');
      expect(button(en.consent.accept)).toBeTruthy();
    });

    it('ignores a stored choice from an older version', () => {
      production();
      visitFrom('DE');
      window.localStorage.setItem(
        CONSENT_STORAGE_KEY,
        JSON.stringify({ analytics: true, source: 'explicit', version: 0 }),
      );
      setup();
      expect(gtagScripts()).toHaveLength(0);
      expect(button(en.consent.accept)).toBeTruthy();
    });
  });

  describe('notice regions', () => {
    it('analytics is on by notice: gtag.js loads and a page view is sent', () => {
      production();
      visitFrom('US', 'CA');
      setup();
      expect(gtagScripts()).toHaveLength(1);
      expect(pageViews()).toHaveLength(1);
      expect(commands('consent')[1]).toEqual([
        'consent',
        'update',
        { analytics_storage: 'granted' },
      ]);
      expect(button(en.consent.ok)).toBeTruthy();
    });

    it('OK keeps it on', () => {
      production();
      visitFrom('JP');
      setup();
      fireEvent.click(button(en.consent.ok));
      expect(gtagScripts()).toHaveLength(1);
      expect(disabled()).toBe(false);
      expect(commands('consent')).toHaveLength(2);
    });

    it('Opt out denies consent, disables collection and removes GA cookies', () => {
      production();
      visitFrom('MX');
      document.cookie = '_ga=GA1.1.1.1; path=/';
      document.cookie = '_ga_TEST123=GS2.1.s1; path=/';
      setup();
      expect(disabled()).toBe(false);

      fireEvent.click(button(en.consent.optOut));
      expect(commands('consent').at(-1)).toEqual([
        'consent',
        'update',
        { analytics_storage: 'denied' },
      ]);
      expect(disabled()).toBe(true);
      expect(document.cookie).toBe('');
    });

    it('sends no more page views after an opt out', () => {
      production();
      visitFrom('US');
      const view = setup();
      expect(pageViews()).toHaveLength(1);
      fireEvent.click(button(en.consent.optOut));

      page.pathname = '/en/pricing';
      view.rerender(ui());
      expect(pageViews()).toHaveLength(1);
    });
  });

  it('Global Privacy Control keeps analytics off, even with a stored yes', () => {
    production();
    setGpc(true);
    visitFrom('US');
    store({ analytics: true, source: 'explicit' });
    document.cookie = '_ga=GA1.1.1.1; path=/';
    setup();

    expect(gtagScripts()).toHaveLength(0);
    expect(pageViews()).toEqual([]);
    expect(disabled()).toBe(true);
    expect(document.cookie).toBe('');
    expect(screen.queryByRole('region', { name: en.consent.label })).toBeNull();
  });

  it('holds gtag.js back until the page has settled', () => {
    production();
    page.settled = false;
    visitFrom('US');
    const view = setup();
    // The queue and consent state are ready; the script is not requested.
    expect(gtagScripts()).toHaveLength(0);
    expect(pageViews()).toHaveLength(1);

    page.settled = true;
    view.rerender(ui());
    expect(gtagScripts()).toHaveLength(1);
  });

  describe('debug_mode', () => {
    it.each(['localhost', '127.0.0.1'])('is on at %s', (host) => {
      production();
      serveFrom(host);
      visitFrom('US');
      setup();
      expect(commands('config')[0]?.[2]).toMatchObject({ debug_mode: true });
    });

    it('is off on the real site', () => {
      production();
      serveFrom('waffuru.ai');
      visitFrom('US');
      setup();
      expect(commands('config')[0]?.[2]).not.toHaveProperty('debug_mode');
      expect(commands('config')[0]?.[2]).toMatchObject({
        send_page_view: false,
        allow_google_signals: false,
        allow_ad_personalization_signals: false,
      });
    });
  });

  describe('page views', () => {
    it('strip the build’s /en prefix', () => {
      production();
      visitFrom('US');
      page.pathname = '/en/products/butter';
      setup();
      expect(pageViews()).toEqual([
        expect.objectContaining({
          page_path: '/products/butter',
          page_language: 'en',
        }),
      ]);
    });

    it('report the home page as /', () => {
      production();
      visitFrom('US');
      page.pathname = '/en';
      setup();
      expect(pageViews()[0]?.page_path).toBe('/');
    });

    it('accept the unprefixed path the browser reports', () => {
      production();
      visitFrom('US');
      page.pathname = '/about';
      setup();
      expect(pageViews()[0]?.page_path).toBe('/about');
    });

    it('keep other locales’ prefix and report the page language', () => {
      production();
      visitFrom('US');
      page.pathname = '/ja/about';
      setup('ja');
      expect(pageViews()).toEqual([
        expect.objectContaining({
          page_path: '/ja/about',
          page_language: 'ja',
        }),
      ]);
    });

    it('use the BCP 47 tag for Chinese', () => {
      production();
      visitFrom('US');
      page.pathname = '/zh';
      setup('zh');
      expect(pageViews()[0]).toMatchObject({
        page_path: '/zh',
        page_language: 'zh-CN',
      });
    });

    it('are sent on client navigation, once per route', () => {
      production();
      visitFrom('US');
      const view = setup();
      expect(pageViews()).toHaveLength(1);

      page.pathname = '/en/about';
      view.rerender(ui());
      expect(pageViews().map((view) => view.page_path)).toEqual([
        '/',
        '/about',
      ]);

      // A re-render on the same route is not a new page view.
      view.rerender(ui());
      expect(pageViews()).toHaveLength(2);
    });

    it('start when consent is granted, for the page being read', () => {
      production();
      visitFrom('DE');
      page.pathname = '/en/blog';
      setup();
      expect(pageViews()).toEqual([]);
      fireEvent.click(button(en.consent.accept));
      expect(pageViews().map((view) => view.page_path)).toEqual(['/blog']);
    });
  });
});
