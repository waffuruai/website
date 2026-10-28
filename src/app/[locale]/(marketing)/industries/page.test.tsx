import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { industriesOverview } from '@/content/pages/industries/overview';
import { industries, industrySlugs } from '@/content/pages/industries/registry';
import { solutionsShared } from '@/content/pages/solutions/shared';
import { mailto, site } from '@/content/site';
import type { Locale } from '@/i18n/config';
import { withDictionary } from '@/i18n/test-utils';

import IndustriesPage, { generateMetadata } from './page';

const params = (locale = 'en') => Promise.resolve({ locale });

async function renderIndex(locale: Locale = 'en') {
  const ui = await IndustriesPage({ params: params(locale) });
  return render(withDictionary(ui, locale));
}

/** JSON-LD objects in the rendered page, by @type. */
function jsonLd(container: HTMLElement) {
  const [script] = container.querySelectorAll(
    'script[type="application/ld+json"]',
  );
  return (
    JSON.parse(script?.textContent ?? '[]') as Record<string, unknown>[]
  ).reduce<Record<string, Record<string, unknown>>>((byType, item) => {
    byType[item['@type'] as string] = item;
    return byType;
  }, {});
}

describe('/industries', () => {
  it('has one h1 and links to all five sector pages', async () => {
    await renderIndex();
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);

    const cards = screen.getByRole('region', { name: /Find your sector/ });
    const hrefs = within(cards)
      .getAllByRole('link')
      .map((link) => link.getAttribute('href'));
    expect(hrefs).toEqual(industrySlugs.map((slug) => `/industries/${slug}`));

    for (const slug of industrySlugs) {
      const { title } = industries[slug].en.card;
      expect(
        within(cards).getByRole('heading', {
          level: 3,
          name: title.replace(/\*/g, ''),
        }),
      ).toBeTruthy();
    }
  });

  it('names the products each sector uses', async () => {
    await renderIndex();
    for (const slug of industrySlugs) {
      const names = industries[slug].en.stackFit.items
        .map((item) => solutionsShared.en.products[item.product].name)
        .join(' · ');
      expect(screen.getAllByText(names).length).toBeGreaterThan(0);
    }
  });

  it('shows the three shared value props', async () => {
    await renderIndex();
    for (const item of industriesOverview.en.values.items) {
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

  it('shows Home / Industries and emits matching WebPage and BreadcrumbList data', async () => {
    const { container } = await renderIndex();
    const nav = screen.getByRole('navigation', { name: 'Breadcrumb' });
    expect(
      within(nav)
        .getAllByRole('listitem')
        .map((item) => item.textContent?.replace(/\s*\/$/, '')),
    ).toEqual(['Home', 'Industries']);

    const data = jsonLd(container);
    expect(Object.keys(data)).toEqual(['WebPage', 'BreadcrumbList']);
    expect(data.WebPage?.url).toBe(`${site.url}/industries`);
    expect(
      (data.BreadcrumbList?.itemListElement as { name: string }[]).map(
        (entry) => entry.name,
      ),
    ).toEqual(['Home', 'Industries']);
  });

  it('localizes card links and the breadcrumb', async () => {
    await renderIndex('ja');
    expect(
      screen
        .getAllByRole('link')
        .some(
          (link) =>
            link.getAttribute('href') === '/ja/industries/life-sciences',
        ),
    ).toBe(true);
    const nav = screen.getByRole('navigation', {
      name: solutionsShared.ja!.breadcrumb.label,
    });
    expect(within(nav).getByText('業界')).toBeTruthy();
  });

  it('sets metadata with the index keywords', async () => {
    const metadata = await generateMetadata({ params: params() });
    expect(metadata.title).toBe(industriesOverview.en.seo.title);
    expect(metadata.keywords).toEqual(industriesOverview.en.seo.keywords);
    expect(metadata.alternates?.canonical).toBe('/industries');
  });
});
