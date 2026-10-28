import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { solutionsOverview } from '@/content/pages/solutions/overview';
import { solutionSlugs, solutions } from '@/content/pages/solutions/registry';
import { mailto, site } from '@/content/site';
import type { Locale } from '@/i18n/config';
import { withDictionary } from '@/i18n/test-utils';

import SolutionsPage, { generateMetadata } from './page';

const params = (locale = 'en') => Promise.resolve({ locale });

async function renderIndex(locale: Locale = 'en') {
  const ui = await SolutionsPage({ params: params(locale) });
  return render(withDictionary(ui, locale));
}

describe('/solutions', () => {
  it('has one h1 and links to all four audience pages', async () => {
    await renderIndex();
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);

    const cards = screen.getByRole('region', {
      name: /Find your seat/,
    });
    const hrefs = within(cards)
      .getAllByRole('link')
      .map((link) => link.getAttribute('href'));
    expect(hrefs).toEqual(solutionSlugs.map((slug) => `/solutions/${slug}`));

    for (const slug of solutionSlugs) {
      const { title } = solutions[slug].en.card;
      expect(
        within(cards).getByRole('heading', {
          level: 3,
          name: title.replace(/\*/g, ''),
        }),
      ).toBeTruthy();
    }
  });

  it('names the products each audience uses', async () => {
    await renderIndex();
    expect(screen.getByText('Iron · Butter · Whisk · Syrup')).toBeTruthy();
    expect(screen.getByText('Butter · Whisk · Syrup')).toBeTruthy();
  });

  it('shows the three shared value props', async () => {
    await renderIndex();
    for (const item of solutionsOverview.en.values.items) {
      expect(
        screen.getByRole('heading', {
          level: 3,
          name: item.title.replace(/\*/g, ''),
        }),
      ).toBeTruthy();
    }
  });

  it('closes with Sales and early access', async () => {
    await renderIndex();
    expect(
      screen.getByRole('link', { name: /Talk to us/ }).getAttribute('href'),
    ).toBe(mailto('Sales'));
    expect(
      screen
        .getByRole('link', { name: /Request early access/ })
        .getAttribute('href'),
    ).toBe(site.urls.earlyAccess);
  });

  it('emits WebPage and BreadcrumbList data', async () => {
    const { container } = await renderIndex();
    const [script] = container.querySelectorAll(
      'script[type="application/ld+json"]',
    );
    const types = JSON.parse(script?.textContent ?? '[]').map(
      (item: { '@type': string }) => item['@type'],
    );
    expect(types).toEqual(['WebPage', 'BreadcrumbList']);
  });

  it('localizes card links', async () => {
    await renderIndex('ja');
    expect(
      screen
        .getAllByRole('link')
        .some(
          (link) => link.getAttribute('href') === '/ja/solutions/neoclouds',
        ),
    ).toBe(true);
  });

  it('sets metadata with the index keywords', async () => {
    const metadata = await generateMetadata({ params: params() });
    expect(metadata.title).toBe('AI inference solutions');
    expect(metadata.keywords).toEqual([
      'AI inference solutions',
      'local-first AI',
    ]);
    expect(metadata.alternates?.canonical).toBe('/solutions');
  });
});
