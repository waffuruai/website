import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { CookieBanner } from '@/components/consent/cookie-banner';
import { CookieSettingsButton } from '@/components/consent/cookie-settings-button';
import { CookieSettingsDialog } from '@/components/consent/cookie-settings-dialog';
import en from '@/i18n/dictionaries/en';
import ja from '@/i18n/dictionaries/ja';
import type { Locale } from '@/i18n/config';
import { withDictionary } from '@/i18n/test-utils';
import {
  CONSENT_STORAGE_KEY,
  CONSENT_VERSION,
  GEO_STORAGE_KEY,
  initConsent,
  resetConsentState,
} from '@/lib/consent';

const t = en.consent;

// Radix Switch measures itself with ResizeObserver, which jsdom lacks.
class ResizeObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
}

/** Seeds the session geo cache so the region resolves on mount. */
const visitFrom = (country: string | null, region: string | null = null) =>
  window.sessionStorage.setItem(
    GEO_STORAGE_KEY,
    JSON.stringify({ country, region }),
  );

const setGpc = (value: boolean | undefined) =>
  Object.defineProperty(window.navigator, 'globalPrivacyControl', {
    value,
    configurable: true,
  });

const store = (record: Record<string, unknown>) =>
  window.localStorage.setItem(
    CONSENT_STORAGE_KEY,
    JSON.stringify({ version: CONSENT_VERSION, ts: 1, ...record }),
  );

const stored = () =>
  JSON.parse(window.localStorage.getItem(CONSENT_STORAGE_KEY) ?? 'null');

/** The consent UI as mounted in the layout, plus the footer control. */
async function setup(locale: Locale = 'en') {
  const view = render(
    withDictionary(
      <>
        <CookieBanner />
        <CookieSettingsDialog />
        <CookieSettingsButton />
      </>,
      locale,
    ),
  );
  // The Analytics component resolves the region in production; do it here.
  await act(async () => {
    await initConsent();
  });
  return view;
}

const banner = (label = t.label) =>
  screen.queryByRole('region', { name: label });
const dialog = () => screen.queryByRole('dialog');
const button = (name: string) => screen.getByRole('button', { name });
const analyticsSwitch = () =>
  screen.getByRole('switch', { name: t.analyticsLabel });

describe('cookie consent UI', () => {
  beforeEach(() => {
    vi.stubGlobal('ResizeObserver', ResizeObserverStub);
    window.localStorage.clear();
    window.sessionStorage.clear();
    resetConsentState();
  });

  afterEach(() => {
    setGpc(undefined);
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  describe('banner, opt-in regions (EU/EEA, UK, CH, Quebec, unknown)', () => {
    it('shows Accept / Decline and the policy link', async () => {
      visitFrom('DE');
      await setup();
      expect(banner()).not.toBeNull();
      expect(screen.getByText(t.label)).toBeTruthy();
      expect(screen.getByText(t.message, { exact: false })).toBeTruthy();
      expect(
        screen.getByRole('link', { name: t.policyLink }).getAttribute('href'),
      ).toBe('/legal/cookies');
      expect(button(t.accept)).toBeTruthy();
      expect(button(t.decline)).toBeTruthy();
      expect(screen.queryByRole('button', { name: t.ok })).toBeNull();
      expect(screen.queryByRole('button', { name: t.optOut })).toBeNull();
    });

    it('is a fixed card, so it never shifts the page', async () => {
      visitFrom('DE');
      await setup();
      expect(banner()?.className).toMatch(/\bfixed\b/);
      expect(banner()?.getAttribute('aria-modal')).toBeNull();
    });

    it('Accept stores an explicit yes and hides the banner', async () => {
      visitFrom('FR');
      await setup();
      fireEvent.click(button(t.accept));
      expect(banner()).toBeNull();
      expect(stored()).toMatchObject({
        analytics: true,
        source: 'explicit',
        version: CONSENT_VERSION,
      });
    });

    it('Decline stores an explicit no and hides the banner', async () => {
      visitFrom('GB');
      await setup();
      fireEvent.click(button(t.decline));
      expect(banner()).toBeNull();
      expect(stored()).toMatchObject({ analytics: false, source: 'explicit' });
    });

    it.each([
      ['Quebec', 'CA', 'QC'],
      ['Switzerland', 'CH', null],
      ['unknown location', null, null],
      ['Canada without a province', 'CA', null],
    ])('%s gets the opt-in banner', async (_name, country, region) => {
      visitFrom(country, region);
      await setup();
      expect(button(t.accept)).toBeTruthy();
      expect(button(t.decline)).toBeTruthy();
    });

    it('shows nothing until the region is known, then the opt-in banner', async () => {
      let answer: (value: Response) => void = () => {};
      vi.stubGlobal(
        'fetch',
        vi.fn(() => new Promise<Response>((resolve) => (answer = resolve))),
      );
      render(withDictionary(<CookieBanner />));
      const pending = initConsent();
      expect(banner()).toBeNull();

      await act(async () => {
        answer(new Response(JSON.stringify({ country: 'DE', region: null })));
        await pending;
      });
      expect(banner()).not.toBeNull();
    });

    it('asks again when the stored choice is from another version', async () => {
      visitFrom('DE');
      window.localStorage.setItem(
        CONSENT_STORAGE_KEY,
        JSON.stringify({ analytics: true, source: 'explicit', version: 0 }),
      );
      await setup();
      expect(banner()).not.toBeNull();
    });

    it('stays closed once a current choice is stored', async () => {
      visitFrom('DE');
      store({ analytics: false, source: 'explicit' });
      await setup();
      expect(banner()).toBeNull();
    });
  });

  describe('banner, notice regions', () => {
    it('shows the notice with OK / Opt out, not Accept / Decline', async () => {
      visitFrom('US', 'NY');
      await setup();
      expect(screen.getByText(t.noticeMessage, { exact: false })).toBeTruthy();
      expect(button(t.ok)).toBeTruthy();
      expect(button(t.optOut)).toBeTruthy();
      expect(screen.queryByRole('button', { name: t.accept })).toBeNull();
      expect(screen.queryByRole('button', { name: t.decline })).toBeNull();
    });

    it('OK keeps analytics on as an implied record', async () => {
      visitFrom('JP');
      await setup();
      fireEvent.click(button(t.ok));
      expect(banner()).toBeNull();
      expect(stored()).toMatchObject({ analytics: true, source: 'implied' });
    });

    it('Opt out turns analytics off', async () => {
      visitFrom('CA', 'ON');
      await setup();
      fireEvent.click(button(t.optOut));
      expect(banner()).toBeNull();
      expect(stored()).toMatchObject({ analytics: false, source: 'explicit' });
    });
  });

  describe('closing the banner', () => {
    it('the close button hides it without recording a choice', async () => {
      visitFrom('DE');
      await setup();
      fireEvent.click(button(t.dismiss));
      expect(banner()).toBeNull();
      expect(window.localStorage.getItem(CONSENT_STORAGE_KEY)).toBeNull();
    });

    it('Escape hides it without recording a choice', async () => {
      visitFrom('DE');
      await setup();
      fireEvent.keyDown(document.body, { key: 'Escape' });
      expect(banner()).toBeNull();
      expect(window.localStorage.getItem(CONSENT_STORAGE_KEY)).toBeNull();
    });

    it('Escape is left alone when something else handled it or the visitor is typing', async () => {
      visitFrom('DE');
      await setup();

      const handled = new KeyboardEvent('keydown', {
        key: 'Escape',
        bubbles: true,
        cancelable: true,
      });
      handled.preventDefault();
      document.body.dispatchEvent(handled);
      expect(banner()).not.toBeNull();

      const input = document.body.appendChild(document.createElement('input'));
      fireEvent.keyDown(input, { key: 'Escape' });
      expect(banner()).not.toBeNull();
      input.remove();

      fireEvent.keyDown(document.body, { key: 'Enter' });
      expect(banner()).not.toBeNull();
    });
  });

  it('shows no banner at all with Global Privacy Control on', async () => {
    setGpc(true);
    visitFrom('DE');
    await setup();
    expect(banner()).toBeNull();
    expect(stored()).toMatchObject({ analytics: false, source: 'gpc' });
  });

  it('speaks and links in the page locale', async () => {
    visitFrom('FR');
    await setup('ja');
    expect(banner(ja.consent.label)).not.toBeNull();
    expect(button(ja.consent.accept)).toBeTruthy();
    expect(
      screen
        .getByRole('link', { name: ja.consent.policyLink })
        .getAttribute('href'),
    ).toBe('/ja/legal/cookies');
  });

  describe('settings dialog', () => {
    it('opens from the footer button with the switch off in an opt-in region', async () => {
      visitFrom('DE');
      await setup();
      const user = userEvent.setup();
      expect(dialog()).toBeNull();

      await user.click(button(t.settings));
      const open = screen.getByRole('dialog', { name: t.settings });
      expect(open).toBeTruthy();
      expect(
        screen.getByText(t.settingsDescription, { exact: false }),
      ).toBeTruthy();
      expect(analyticsSwitch().getAttribute('aria-checked')).toBe('false');
      expect(analyticsSwitch().getAttribute('aria-describedby')).toBeTruthy();
      expect(screen.getByText(t.analyticsDescription)).toBeTruthy();
      // The banner steps aside while the dialog is open.
      expect(banner()).toBeNull();
    });

    it('turning the switch on and saving stores a yes and closes everything', async () => {
      visitFrom('DE');
      await setup();
      const user = userEvent.setup();
      await user.click(button(t.settings));
      await user.click(analyticsSwitch());
      expect(analyticsSwitch().getAttribute('aria-checked')).toBe('true');
      // Nothing is stored until Save.
      expect(window.localStorage.getItem(CONSENT_STORAGE_KEY)).toBeNull();

      await user.click(button(t.save));
      expect(dialog()).toBeNull();
      expect(banner()).toBeNull();
      expect(stored()).toMatchObject({ analytics: true, source: 'explicit' });
    });

    it('starts from the stored choice, and Save can turn it off', async () => {
      visitFrom('DE');
      store({ analytics: true, source: 'explicit' });
      await setup();
      const user = userEvent.setup();
      await user.click(button(t.settings));
      expect(analyticsSwitch().getAttribute('aria-checked')).toBe('true');

      await user.click(analyticsSwitch());
      await user.click(button(t.save));
      expect(dialog()).toBeNull();
      expect(stored()).toMatchObject({ analytics: false, source: 'explicit' });
    });

    it('starts on in a notice region, where analytics applies by notice', async () => {
      visitFrom('US');
      await setup();
      const user = userEvent.setup();
      await user.click(button(t.settings));
      expect(analyticsSwitch().getAttribute('aria-checked')).toBe('true');
    });

    it('can be labelled by its text, not only by the switch', async () => {
      visitFrom('DE');
      await setup();
      const user = userEvent.setup();
      await user.click(button(t.settings));
      await user.click(screen.getByText(t.analyticsLabel));
      expect(analyticsSwitch().getAttribute('aria-checked')).toBe('true');
    });

    it('Escape closes it without saving, and the banner comes back', async () => {
      visitFrom('DE');
      await setup();
      const user = userEvent.setup();
      await user.click(button(t.settings));
      await user.click(analyticsSwitch());
      await user.keyboard('{Escape}');

      expect(dialog()).toBeNull();
      expect(window.localStorage.getItem(CONSENT_STORAGE_KEY)).toBeNull();
      expect(banner()).not.toBeNull();
    });

    it('the close button closes it without saving', async () => {
      visitFrom('DE');
      await setup();
      const user = userEvent.setup();
      await user.click(button(t.settings));
      await user.click(
        screen.getByRole('button', { name: t.dismiss, hidden: false }),
      );
      expect(dialog()).toBeNull();
      expect(window.localStorage.getItem(CONSENT_STORAGE_KEY)).toBeNull();
    });

    it('keeps focus inside while open and returns it to the footer button', async () => {
      visitFrom('DE');
      await setup();
      const user = userEvent.setup();
      const trigger = button(t.settings);
      await user.click(trigger);

      const open = screen.getByRole('dialog');
      expect(open.contains(document.activeElement)).toBe(true);
      // Tab around the whole dialog: focus never leaves it.
      for (let i = 0; i < 6; i++) {
        await user.tab();
        expect(open.contains(document.activeElement)).toBe(true);
      }

      await user.keyboard('{Escape}');
      await waitFor(() => expect(document.activeElement).toBe(trigger));
    });

    it('explains Global Privacy Control instead of offering a switch', async () => {
      setGpc(true);
      visitFrom('US');
      await setup();
      const user = userEvent.setup();
      await user.click(button(t.settings));

      expect(screen.getByRole('dialog')).toBeTruthy();
      expect(screen.getByText(t.gpcNotice, { exact: false })).toBeTruthy();
      expect(screen.queryByRole('switch')).toBeNull();
      expect(screen.queryByRole('button', { name: t.save })).toBeNull();

      // Two controls close it: the corner X and the Close button.
      const closers = screen.getAllByRole('button', { name: t.dismiss });
      await user.click(closers[closers.length - 1]!);
      expect(dialog()).toBeNull();
      expect(stored()).toMatchObject({ analytics: false, source: 'gpc' });
    });

    it('is labelled in the page locale', async () => {
      visitFrom('DE');
      await setup('ja');
      const user = userEvent.setup();
      await user.click(button(ja.consent.settings));
      expect(
        screen.getByRole('dialog', { name: ja.consent.settings }),
      ).toBeTruthy();
      expect(
        screen.getByRole('switch', { name: ja.consent.analyticsLabel }),
      ).toBeTruthy();
    });
  });

  it('the footer button keeps its className and announces a dialog', () => {
    render(withDictionary(<CookieSettingsButton className="foot" />));
    const control = screen.getByRole('button', { name: t.settings });
    expect(control.className).toBe('foot');
    expect(control.getAttribute('aria-haspopup')).toBe('dialog');
  });
});
