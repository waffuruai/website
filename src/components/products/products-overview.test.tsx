import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { ProductsOverview } from '@/components/products/products-overview';
import { plainText } from '@/components/sections/accent';
import {
  audienceHrefs,
  audienceKeys,
  productCopy,
  productFacts,
  productSlugs,
  productsOverview,
} from '@/content/pages/products';
import { mailto, site } from '@/content/site';
import en from '@/i18n/dictionaries/en';
import { withDictionary } from '@/i18n/test-utils';

const renderOverview = () =>
  render(withDictionary(<ProductsOverview locale="en" dictionary={en} />));

const copy = productsOverview.en;

describe('ProductsOverview', () => {
  it('has one h1, “The Waffuru stack”', () => {
    const { container } = renderOverview();
    const h1s = container.querySelectorAll('h1');
    expect(h1s).toHaveLength(1);
    expect(h1s[0]?.textContent).toBe(plainText(copy.hero.title));
    expect(h1s[0]?.textContent).toBe('The Waffuru stack.');
  });

  it('stacks the layers from Whisk (04) down to Iron (01)', () => {
    renderOverview();
    const stack = screen.getByRole('list', { name: copy.layers.listLabel });
    const layers = within(stack).getAllByRole('listitem');
    expect(
      layers.map((layer) => layer.querySelector('h3')?.textContent),
    ).toEqual(['Whisk', 'Syrup', 'Butter', 'Iron']);
    expect(
      layers.map((layer) => layer.querySelector('p')?.textContent),
    ).toEqual([
      '04 · Memory',
      '03 · Control plane',
      '02 · Serving',
      '01 · Kernels',
    ]);
  });

  it('links every layer to its page and shows its one-line pitch', () => {
    renderOverview();
    const stack = screen.getByRole('list', { name: copy.layers.listLabel });
    for (const slug of productSlugs) {
      const { name, path } = productFacts[slug];
      const link = within(stack).getByRole('link', { name });
      expect(link.getAttribute('href')).toBe(path);
      expect(
        within(stack).getByText(productCopy[slug].en.tagline),
      ).toBeTruthy();
    }
  });

  it('puts the backends at the base of the stack', () => {
    const { container } = renderOverview();
    for (const backend of copy.layers.metal.backends) {
      expect(container.textContent).toContain(backend);
    }
  });

  it('says each product works alone, and all four together', () => {
    const { container } = renderOverview();
    expect(
      screen.getByRole('heading', { level: 2, name: 'Use one, or all four.' }),
    ).toBeTruthy();
    for (const line of Object.values(copy.together.alone)) {
      expect(container.textContent).toContain(line);
    }
    expect(container.textContent).toContain(copy.together.all);
  });

  it('links each audience to its solutions page', () => {
    renderOverview();
    for (const key of audienceKeys) {
      const link = screen.getByRole('link', { name: en.nav.items[key].label });
      expect(link.getAttribute('href')).toBe(audienceHrefs[key]);
    }
  });

  it('closes with early access and a way to talk to sales', () => {
    renderOverview();
    const access = screen.getAllByRole('link', {
      name: /request early access/i,
    });
    expect(access.map((link) => link.getAttribute('href'))).toEqual([
      site.urls.earlyAccess,
      site.urls.earlyAccess,
    ]);
    expect(
      screen
        .getByRole('link', { name: en.common.talkToUs })
        .getAttribute('href'),
    ).toBe(mailto('Sales'));
  });

  it('never skips a heading level', () => {
    const { container } = renderOverview();
    const levels = [...container.querySelectorAll('h1, h2, h3, h4')].map(
      (heading) => Number(heading.tagName.slice(1)),
    );
    expect(levels[0]).toBe(1);
    levels.slice(1).forEach((level, index) => {
      expect(level - levels[index]!).toBeLessThanOrEqual(1);
    });
  });

  it('describes the page and its breadcrumbs in structured data', () => {
    const { container } = renderOverview();
    const data = [
      ...container.querySelectorAll('script[type="application/ld+json"]'),
    ].flatMap((script) => [JSON.parse(script.textContent ?? '[]')].flat());
    expect(data.map((d) => d['@type'])).toEqual(['WebPage', 'BreadcrumbList']);
    expect(data[0].url).toBe(`${site.url}/products`);
    expect(
      data[1].itemListElement.map((item: { name: string }) => item.name),
    ).toEqual(['Waffuru', 'Products']);
  });
});
