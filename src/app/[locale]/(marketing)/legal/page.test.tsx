import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { locales } from '@/i18n/config';
import { withDictionary } from '@/i18n/test-utils';

import LegalIndexPage, { generateMetadata } from './page';

async function renderPage(locale: 'en' | 'ja' = 'en') {
  const page = await LegalIndexPage();
  return render(withDictionary(page, locale));
}

describe('/legal', () => {
  it('lists the three policies with their dates, in English', async () => {
    const { container } = await renderPage();
    expect(container.firstElementChild?.getAttribute('lang')).toBe('en');
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);

    const items = within(screen.getByRole('list')).getAllByRole('listitem');
    expect(items.map((item) => item.querySelector('a')?.textContent)).toEqual([
      expect.stringContaining('Terms of use'),
      expect.stringContaining('Privacy policy'),
      expect.stringContaining('Cookie policy'),
    ]);
    for (const item of items) {
      expect(item.querySelector('time')?.textContent).toBe('October 26, 2026');
    }
  });

  it('links every policy within the visitor’s locale', async () => {
    await renderPage('en');
    const english = screen
      .getAllByRole('link')
      .map((link) => link.getAttribute('href'));
    expect(english).toEqual(
      expect.arrayContaining([
        '/legal/terms',
        '/legal/privacy',
        '/legal/cookies',
      ]),
    );

    await renderPage('ja');
    const japanese = screen
      .getAllByRole('link')
      .map((link) => link.getAttribute('href'));
    expect(japanese).toEqual(
      expect.arrayContaining([
        '/ja/legal/terms',
        '/ja/legal/privacy',
        '/ja/legal/cookies',
      ]),
    );
  });

  it('emits a web page and breadcrumbs for the English URL', async () => {
    const { container } = await renderPage();
    const nodes = [
      ...container.querySelectorAll('script[type="application/ld+json"]'),
    ].flatMap((script) => {
      const data = JSON.parse(script.textContent ?? 'null');
      return Array.isArray(data) ? data : [data];
    });
    expect(nodes.map((node) => node['@type'])).toEqual([
      'WebPage',
      'BreadcrumbList',
    ]);
    expect(nodes[0].url).toBe('https://waffuru.ai/legal');
    expect(nodes[0].name).toBe('The fine print.');
  });

  it('is canonical at the English URL in every locale', async () => {
    for (const locale of locales) {
      const metadata = await generateMetadata({
        params: Promise.resolve({ locale }),
      });
      expect(metadata.title).toBe('Legal');
      expect(metadata.alternates?.canonical).toBe('/legal');
      expect(metadata.alternates?.languages).toEqual({
        'x-default': '/legal',
      });
    }
  });
});
