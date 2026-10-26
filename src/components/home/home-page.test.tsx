import { render, screen, within } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import HomePage, { generateMetadata } from '@/app/[locale]/(marketing)/page';
import { home } from '@/content/pages/home';
import { mailto, site } from '@/content/site';
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
      'Raw math, pressed into silicon.',
      'The stack.',
      '27B.16 requests. One Mac.',
      'More context per gigabyte.',
      'Smaller models, quantized with care.',
      'Fewer wrong arguments.Cheaper correct ones.',
      'Models on the menu.',
      'You write this.Iron writes the rest.',
      'Who’s in the kitchen.',
      'Pull up a seat.',
    ]);
  });

  it('puts the stack right after the hero and the research after the stack', async () => {
    const { container } = await renderPage();
    const ids = [...container.querySelectorAll('section[id]')].map(
      (section) => section.id,
    );
    expect(ids.indexOf('stack')).toBeLessThan(ids.indexOf('native-inference'));
    expect(ids.indexOf('native-inference')).toBeLessThan(ids.indexOf('aura'));
    expect(ids.indexOf('aura')).toBeLessThan(ids.indexOf('quantized-models'));
    expect(ids.indexOf('quantized-models')).toBeLessThan(
      ids.indexOf('tool-reliability'),
    );
    expect(ids.indexOf('tool-reliability')).toBeLessThan(ids.indexOf('models'));
    expect(
      screen.getByRole('link', { name: /see the stack/i }).getAttribute('href'),
    ).toBe('#stack');
  });

  it('paints the film grain over the top, hidden from assistive tech', async () => {
    const { container } = await renderPage();
    const grain = container.querySelector('svg.wf-grain');
    expect(grain?.getAttribute('aria-hidden')).toBe('true');
    expect(grain?.querySelector('feTurbulence')).not.toBeNull();
  });

  it('sends early access to the form and sales to email', async () => {
    await renderPage();
    const access = screen.getAllByRole('link', {
      name: /request early access/i,
    });
    // The hero and the closing card.
    expect(access).toHaveLength(2);
    for (const link of access) {
      expect(link.getAttribute('href')).toBe(site.urls.earlyAccess);
    }
    expect(
      screen.getByRole('link', { name: /talk to us/i }).getAttribute('href'),
    ).toBe(mailto('Sales'));
  });

  it('links the stack to its product pages and the team to its page', async () => {
    await renderPage();
    for (const name of ['Syrup', 'Waffle', 'Butter', 'Iron']) {
      expect(screen.getByRole('link', { name }).getAttribute('href')).toBe(
        `/products/${name.toLowerCase()}`,
      );
    }
    expect(
      screen.getByRole('link', { name: /meet the team/i }).getAttribute('href'),
    ).toBe('/about/team');
  });

  it('ends with the closing card and the newsletter signup', async () => {
    await renderPage();
    const cta = screen.getByRole('heading', {
      name: 'Pull up a seat.',
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
        'local LLM inference',
        'GPU kernels',
        'inference engine',
        'Apple silicon',
        'Metal',
        'CUDA',
        'ROCm',
        'Vulkan',
        'GPU fleet management',
        'neocloud',
        'on-device AI',
        'private AI',
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
