import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { ProductPage } from '@/components/products/product-page';
import { plainText } from '@/components/sections/accent';
import {
  productCopy,
  productFacts,
  productSlugs,
  type ProductSlug,
} from '@/content/pages/products';
import { mailto, site } from '@/content/site';
import en from '@/i18n/dictionaries/en';
import { withDictionary } from '@/i18n/test-utils';

const renderPage = (slug: ProductSlug) =>
  render(
    withDictionary(<ProductPage slug={slug} locale="en" dictionary={en} />),
  );

const hrefs = (container: HTMLElement) =>
  [...container.querySelectorAll('a')].map((a) => a.getAttribute('href'));

/** Every JSON-LD node on the page (a script may hold one node or a list). */
const jsonLd = (container: HTMLElement) =>
  [...container.querySelectorAll('script[type="application/ld+json"]')].flatMap(
    (script) =>
      [JSON.parse(script.textContent ?? '[]')].flat() as Record<
        string,
        unknown
      >[],
  );

describe.each(productSlugs)('ProductPage: %s', (slug) => {
  const copy = productCopy[slug].en;
  const facts = productFacts[slug];

  it('has exactly one h1, with the title and the layer label', () => {
    const { container } = renderPage(slug);
    const h1s = container.querySelectorAll('h1');
    expect(h1s).toHaveLength(1);
    expect(h1s[0]?.textContent).toBe(plainText(copy.hero.title));
    expect(h1s[0]?.querySelector('em')).not.toBeNull();
    expect(container.textContent).toContain(`${facts.index} · ${copy.layer}`);
  });

  it('never skips a heading level', () => {
    const { container } = renderPage(slug);
    const levels = [...container.querySelectorAll('h1, h2, h3, h4')].map(
      (heading) => Number(heading.tagName.slice(1)),
    );
    expect(levels[0]).toBe(1);
    levels.slice(1).forEach((level, index) => {
      expect(level - levels[index]!).toBeLessThanOrEqual(1);
    });
  });

  it('lists every technical specific as a term and a detail', () => {
    const { container } = renderPage(slug);
    const terms = [...container.querySelectorAll('dl dt')].map(
      (dt) => dt.textContent,
    );
    for (const row of copy.specs.rows) expect(terms).toContain(row.term);
    for (const row of copy.specs.rows) {
      const dt = [...container.querySelectorAll('dt')].find(
        (el) => el.textContent === row.term,
      );
      const detail = dt?.nextElementSibling?.textContent ?? '';
      if (row.detail) expect(detail).toContain(row.detail);
    }
  });

  it('asks for early access in the hero and again in the closing card', () => {
    const { container } = renderPage(slug);
    const access = screen.getAllByRole('link', {
      name: /request early access/i,
    });
    expect(access).toHaveLength(2);
    for (const link of access) {
      expect(link.getAttribute('href')).toBe(site.urls.earlyAccess);
    }
    expect(container.querySelectorAll('section').length).toBeGreaterThan(5);
  });

  it(
    facts.secondaryCta === 'docs'
      ? 'offers the docs as the second action'
      : 'offers “Talk to us” as the second action',
    () => {
      renderPage(slug);
      const expected =
        facts.secondaryCta === 'docs'
          ? { name: copy.cta.docsLabel!, href: site.urls.docs }
          : { name: en.common.talkToUs, href: mailto('Sales') };
      const links = screen.getAllByRole('link', { name: expected.name });
      expect(links).toHaveLength(2);
      for (const link of links) {
        expect(link.getAttribute('href')).toBe(expected.href);
      }
      // The other secondary action must not appear.
      const other =
        facts.secondaryCta === 'docs' ? en.common.talkToUs : /read the docs/i;
      expect(screen.queryAllByRole('link', { name: other })).toHaveLength(0);
    },
  );

  it('links to the other three products and back to the overview', () => {
    const { container } = renderPage(slug);
    const found = hrefs(container);
    for (const other of productSlugs.filter((s) => s !== slug)) {
      expect(found).toContain(`/products/${other}`);
    }
    expect(found).not.toContain(`/products/${slug}`);
    expect(found).toContain('/products');
  });

  it('shows hardware tiers and the code panel only where they belong', () => {
    const { container } = renderPage(slug);
    expect(Boolean(container.querySelector('#platforms'))).toBe(
      Boolean(copy.platforms),
    );
    expect(Boolean(container.querySelector('pre'))).toBe(Boolean(facts.code));
    if (facts.code) {
      const panel = container.querySelector('pre')!;
      expect(panel.textContent).toBe(facts.code.source);
      expect(container.textContent).toContain(facts.code.label);
    }
  });

  it('renders every FAQ answer and the matching structured data', () => {
    const { container } = renderPage(slug);
    expect(container.querySelectorAll('details')).toHaveLength(copy.faq.length);
    const types = jsonLd(container).map((data) => data['@type']);
    expect(types).toEqual(
      expect.arrayContaining([
        'SoftwareApplication',
        'BreadcrumbList',
        'FAQPage',
      ]),
    );
    expect(types).not.toContain('Review');
    expect(types).not.toContain('AggregateRating');
  });

  it('describes the product and its place in the breadcrumbs', () => {
    const { container } = renderPage(slug);
    const data = jsonLd(container);
    const app = data.find((d) => d['@type'] === 'SoftwareApplication')!;
    expect(app.name).toBe(facts.name);
    expect(app.url).toBe(`${site.url}${facts.path}`);
    const crumbs = data.find((d) => d['@type'] === 'BreadcrumbList')!;
    const items = crumbs.itemListElement as { name: string; item: string }[];
    expect(items.map((item) => item.name)).toEqual([
      'Waffuru',
      'Products',
      facts.name,
    ]);
  });
});

describe('ProductPage: locale', () => {
  it('prefixes internal links and structured-data URLs for other locales', () => {
    const { container } = render(
      withDictionary(
        <ProductPage slug="iron" locale="ja" dictionary={en} />,
        'ja',
      ),
    );
    expect(hrefs(container)).toContain('/ja/products/butter');
    const app = jsonLd(container).find(
      (d) => d['@type'] === 'SoftwareApplication',
    );
    expect(app?.url).toBe(`${site.url}/ja/products/iron`);
  });
});

describe('Iron’s page', () => {
  it('shows the kernel in a panel with its file name and label', () => {
    renderPage('iron');
    const panel = screen.getByRole('region', { name: /unary\.rs/ });
    expect(within(panel).getByText('iron_exp')).toBeTruthy();
    expect(screen.getByText('iron · rust dsl')).toBeTruthy();
  });

  it('spells out the three hardware tiers', () => {
    renderPage('iron');
    for (const tier of ['Primary', 'Secondary', 'Runs']) {
      expect(screen.getAllByText(tier).length).toBeGreaterThan(0);
    }
    expect(screen.getByRole('heading', { name: 'Apple · Metal' })).toBeTruthy();
  });
});

describe('Butter’s page', () => {
  it('labels its snippet as illustrative, not a benchmark', () => {
    renderPage('butter');
    expect(screen.getByText(/not a benchmark/i)).toBeTruthy();
    expect(screen.getByText('butter · illustrative')).toBeTruthy();
  });

  it('marks DeepSeek V4 as in progress', () => {
    const { container } = renderPage('butter');
    expect(container.textContent).toContain('V4 · In progress');
  });
});
