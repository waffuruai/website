import { render, screen, within } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import HomePage, { generateMetadata } from '@/app/[locale]/(marketing)/page';
import { home } from '@/content/pages/home';
import { pantryFacts } from '@/content/pages/pantry/facts';
import { site } from '@/content/site';
import en from '@/i18n/dictionaries/en';
import { withDictionary } from '@/i18n/test-utils';

// The real <Picture> reads the image manifest that `pnpm images` generates.
vi.mock('@/components/picture', () => ({
  Picture: ({ name, alt }: { name: string; alt: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={`/img/${name}.jpg`} alt={alt} />
  ),
}));

const params = (locale: string) => Promise.resolve({ locale });

const renderPage = async (locale = 'en') =>
  render(withDictionary(await HomePage({ params: params(locale) })));

describe('HomePage', () => {
  it('has one h1 and the sections in order', async () => {
    const { container } = await renderPage();
    expect(container.querySelectorAll('h1')).toHaveLength(1);
    expect(
      [...container.querySelectorAll('h1, h2')].map((heading) =>
        heading.textContent?.replace(/\s+/g, ' ').trim(),
      ),
    ).toEqual([
      'More intelligence on hardware you already own.',
      'Know what’s exposed. Patch it fast.',
      'From silicon to answer.',
      'A seat at the table.',
      'Why we’re cooking.',
      'Who’s in the kitchen.',
      'Reserve your seat.',
    ]);
  });

  it('leads with Pantry, then the stack, and leaves research to the product pages', async () => {
    const { container } = await renderPage();
    const ids = [...container.querySelectorAll('section')]
      .map((section) => section.id)
      .filter(Boolean);
    expect(ids.slice(0, 4)).toEqual(['pantry', 'stack', 'who', 'why']);
    for (const research of [
      'native-inference',
      'aura',
      'quantized-models',
      'tool-reliability',
      'models',
    ]) {
      expect(ids).not.toContain(research);
    }
    expect(
      screen
        .getByRole('link', { name: /see how it works/i })
        .getAttribute('href'),
    ).toBe('#stack');
  });

  it('points every way into Pantry at its page', async () => {
    await renderPage();
    expect(
      screen
        .getByRole('link', { name: new RegExp(home.en.hero.launch.text) })
        .getAttribute('href'),
    ).toBe(pantryFacts.path);
    const secure = screen.getAllByRole('link', { name: /secure your system/i });
    // The Pantry section and the closing card.
    expect(secure).toHaveLength(2);
    for (const link of secure) {
      expect(link.getAttribute('href')).toBe(`${pantryFacts.path}#install`);
    }
  });

  it('shows the stack as a flow, with no deep links into unlaunched pages', async () => {
    const { container } = await renderPage();
    const stack = container.querySelector('#stack')!;
    for (const layer of home.en.stack.flow.layers) {
      expect(stack.textContent).toContain(layer.role);
    }
    expect(stack.querySelectorAll('a')).toHaveLength(0);
  });

  it('paints the film grain over the top, hidden from assistive tech', async () => {
    const { container } = await renderPage();
    const grain = container.querySelector('svg.wf-grain');
    expect(grain?.getAttribute('aria-hidden')).toBe('true');
    expect(grain?.querySelector('feTurbulence')).not.toBeNull();
  });

  it('sends early access to the form', async () => {
    await renderPage();
    const access = screen.getAllByRole('link', {
      name: /request early access/i,
    });
    // The hero and the closing card.
    expect(access).toHaveLength(2);
    for (const link of access) {
      expect(link.getAttribute('href')).toBe(site.urls.earlyAccess);
    }
  });

  it('links each audience on once its page is live, and the team', async () => {
    await renderPage();
    const linked = home.en.audiences.items.filter((item) => item.href);
    expect(
      screen
        .getAllByRole('link', { name: /^see how:/i })
        .map((link) => link.getAttribute('href')),
    ).toEqual(linked.map((item) => item.href));
    expect(
      screen.getByRole('link', { name: /meet the team/i }).getAttribute('href'),
    ).toBe('/about/team');
  });

  it('ends with the closing card and the newsletter signup', async () => {
    await renderPage();
    const cta = screen.getByRole('heading', {
      name: 'Reserve your seat.',
    }).parentElement!;
    expect(within(cta).getByText(home.en.cta.body)).toBeTruthy();
    expect(within(cta).getByText(en.newsletter.heading)).toBeTruthy();
  });

  it('emits WebPage structured data for the page it shows', async () => {
    const { container } = await renderPage();
    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const data = JSON.parse(script?.textContent ?? '{}');
    expect(data['@type']).toBe('WebPage');
    expect(data.name).toBe(en.meta.defaultTitle);
    expect(data.url).toBe(`${site.url}/`);
  });
});

describe('home metadata', () => {
  it('keeps the absolute title, description and search keywords', async () => {
    const metadata = await generateMetadata({ params: params('en') });
    expect(metadata.title).toEqual({ absolute: en.meta.defaultTitle });
    expect(metadata.description).toBe(en.meta.defaultDescription);
    expect(metadata.keywords).toEqual(
      expect.arrayContaining([
        'private AI',
        'local AI',
        'local LLM inference',
        'vulnerability scanner',
        'Pantry',
      ]),
    );
    expect(metadata.alternates?.canonical).toBe('/');
    expect(metadata.openGraph?.title).toBe(en.meta.defaultTitle);
  });

  it('canonicalises each locale to its own home', async () => {
    const metadata = await generateMetadata({ params: params('es') });
    expect(metadata.alternates?.canonical).toBe('/es');
  });
});
