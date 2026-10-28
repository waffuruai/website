import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { STEP_MS } from '@/components/pantry/pantry-flow';
import { pantryFacts } from '@/content/pages/pantry/facts';
import { pantry } from '@/content/pages/pantry/pantry';
import { pantrySteps } from '@/content/pages/pantry/types';
import { mailto } from '@/content/site';
import { withDictionary } from '@/i18n/test-utils';

import PantryRoute, { generateMetadata } from './page';

const params = (locale: string) => Promise.resolve({ locale });
const copy = pantry.en;

async function renderPage(locale: 'en' | 'ja' = 'en') {
  const page = await PantryRoute({ params: params(locale) });
  return render(withDictionary(page, locale));
}

const jsonLd = (container: HTMLElement) =>
  [...container.querySelectorAll('script[type="application/ld+json"]')].flatMap(
    (script) => {
      const data = JSON.parse(script.textContent ?? 'null');
      return Array.isArray(data) ? data : [data];
    },
  );

afterEach(() => {
  vi.useRealTimers();
});

describe('/products/pantry', () => {
  it('has one h1 and leads with securing your system', async () => {
    await renderPage();
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
    const install = screen.getAllByRole('link', { name: /Secure your system/ });
    expect(install[0].getAttribute('href')).toBe('#install');
    expect(document.getElementById('install')).toBeTruthy();
  });

  it('links the deep dive, the source and the Windows intake', async () => {
    await renderPage();
    expect(
      screen
        .getAllByRole('link', { name: /Learn more/ })[0]
        .getAttribute('href'),
    ).toBe(pantryFacts.post);
    expect(
      screen
        .getAllByRole('link', { name: /View the source/ })[0]
        .getAttribute('href'),
    ).toBe(pantryFacts.repo);
    expect(
      screen
        .getByRole('link', { name: /Tell us you need it/ })
        .getAttribute('href'),
    ).toBe(mailto('Pantry on Windows'));
  });

  it('offers every install route with its exact command', async () => {
    const { container } = await renderPage();
    const text = container.textContent ?? '';
    expect(text).toContain(pantryFacts.install.mise);
    expect(text).toContain(pantryFacts.install.script);
    expect(text).toContain('packslip verify');
    expect(text).toContain('gh attestation verify');
    expect(copy.install.methods.map((method) => method.id)).toEqual([
      'mise',
      'script',
      'verify',
    ]);
  });

  it('describes the free, open-source app in JSON-LD', async () => {
    const { container } = await renderPage();
    const app = jsonLd(container).find(
      (item) => item['@type'] === 'SoftwareApplication',
    );
    expect(app).toMatchObject({
      name: 'Pantry',
      isAccessibleForFree: true,
      codeRepository: pantryFacts.repo,
      operatingSystem: 'macOS, Linux',
      url: 'https://waffuru.ai/products/pantry',
    });
  });

  it('keeps product and command names in every locale', async () => {
    await renderPage('ja');
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
    for (const locale of ['es', 'fr', 'zh', 'ja', 'ko'] as const) {
      const page = pantry[locale];
      expect(page, locale).toBeDefined();
      expect(JSON.stringify(page)).toContain('wpantry');
    }
  });

  it('builds metadata for the page', async () => {
    const metadata = await generateMetadata({ params: params('en') });
    expect(metadata.title).toBeTruthy();
    expect(metadata.alternates?.canonical).toContain('/products/pantry');
  });
});

describe('How it works', () => {
  it('steps through install, scan, cache and fix', async () => {
    await renderPage();
    const tabs = screen.getAllByRole('tab');
    expect(tabs).toHaveLength(pantrySteps.length);
    expect(tabs[0].getAttribute('aria-selected')).toBe('true');

    fireEvent.click(tabs[1]);
    expect(tabs[1].getAttribute('aria-selected')).toBe('true');
    expect(screen.getByRole('tabpanel').textContent).toContain(
      'CVE-2024-27983',
    );

    fireEvent.keyDown(tabs[1], { key: 'ArrowDown' });
    expect(tabs[2].getAttribute('aria-selected')).toBe('true');
    fireEvent.keyDown(tabs[2], { key: 'End' });
    expect(tabs[3].getAttribute('aria-selected')).toBe('true');
    expect(screen.getByRole('tabpanel').textContent).toContain(
      'wpantry --update',
    );
  });

  it('plays on its own and pauses on request', async () => {
    vi.useFakeTimers();
    await renderPage();
    const play = screen.getByRole('button', { name: copy.how.play });
    fireEvent.click(play);
    const tabs = screen.getAllByRole('tab');
    act(() => {
      vi.advanceTimersByTime(STEP_MS);
    });
    expect(tabs[1].getAttribute('aria-selected')).toBe('true');
    fireEvent.click(screen.getByRole('button', { name: copy.how.pause }));
    act(() => {
      vi.advanceTimersByTime(STEP_MS * 2);
    });
    expect(tabs[1].getAttribute('aria-selected')).toBe('true');
  });

  it('shows every step’s copy in the HTML, so nothing hides behind a tab', async () => {
    const { container } = await renderPage();
    for (const step of copy.how.steps) {
      expect(container.textContent).toContain(step.body);
    }
  });
});
