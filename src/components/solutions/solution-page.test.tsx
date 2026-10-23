import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { SolutionPage } from '@/components/solutions/solution-page';
import { solutionSlugs, solutions } from '@/content/pages/solutions/registry';
import { solutionsShared } from '@/content/pages/solutions/shared';
import { mailto, site } from '@/content/site';
import type { Locale } from '@/i18n/config';
import en from '@/i18n/dictionaries/en';
import { withDictionary } from '@/i18n/test-utils';

const shared = solutionsShared.en;

function renderPage(
  slug: (typeof solutionSlugs)[number],
  locale: Locale = 'en',
) {
  return render(
    withDictionary(
      <SolutionPage
        slug={slug}
        page={solutions[slug].en}
        shared={shared}
        locale={locale}
        common={en.common}
      />,
      locale,
    ),
  );
}

/** JSON-LD objects in the rendered page, by @type. */
function jsonLd(container: HTMLElement) {
  return [...container.querySelectorAll('script[type="application/ld+json"]')]
    .flatMap((script) => {
      const data = JSON.parse(script.textContent ?? 'null');
      return Array.isArray(data) ? data : [data];
    })
    .reduce<Record<string, Record<string, unknown>>>((byType, item) => {
      byType[item['@type']] = item;
      return byType;
    }, {});
}

describe.each(solutionSlugs)('SolutionPage: %s', (slug) => {
  const page = solutions[slug].en;

  it('renders one h1 and an ordered heading outline', () => {
    renderPage(slug);
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);

    const levels = screen
      .getAllByRole('heading')
      .map((heading) => Number(heading.tagName.slice(1)));
    expect(levels[0]).toBe(1);
    levels.forEach((level, index) => {
      if (index > 0) expect(level - levels[index - 1]!).toBeLessThanOrEqual(1);
    });
  });

  it('shows the audience as the hero label and the hero title', () => {
    renderPage(slug);
    const h1 = screen.getByRole('heading', { level: 1 });
    expect(h1.textContent).toBe(page.hero.title.replace(/\*/g, ''));
    expect(h1.querySelector('em')).not.toBeNull();
    expect(screen.getAllByText(page.name).length).toBeGreaterThan(0);
  });

  it('renders every use case as a job to be done', () => {
    renderPage(slug);
    for (const useCase of page.useCases.items) {
      expect(
        screen.getByRole('heading', { level: 3, name: useCase.title }),
      ).toBeTruthy();
      expect(screen.getByText(useCase.body)).toBeTruthy();
    }
  });

  it('maps products to needs and links each product page', () => {
    renderPage(slug);
    for (const item of page.stackFit.items) {
      const info = shared.products[item.product];
      expect(
        screen.getByRole('heading', { level: 3, name: info.name }),
      ).toBeTruthy();
      expect(screen.getByText(item.need)).toBeTruthy();
      expect(
        screen
          .getByRole('link', { name: new RegExp(info.linkLabel) })
          .getAttribute('href'),
      ).toBe(info.href);
    }
  });

  it('ends with Talk to us (Sales) and early access', () => {
    renderPage(slug);
    const sales = screen.getAllByRole('link', { name: /Talk to us/ });
    expect(sales.length).toBeGreaterThanOrEqual(2);
    for (const link of sales) {
      expect(link.getAttribute('href')).toBe(mailto('Sales'));
    }
    const access = screen.getAllByRole('link', {
      name: /Request early access/,
    });
    for (const link of access) {
      expect(link.getAttribute('href')).toBe(site.urls.earlyAccess);
    }
    expect(access.length).toBeGreaterThanOrEqual(2);
  });

  it('renders the FAQ with matching FAQPage data', () => {
    const { container } = renderPage(slug);
    expect(container.querySelectorAll('details')).toHaveLength(page.faq.length);
    const data = jsonLd(container);
    expect(
      (data.FAQPage?.mainEntity as { name: string }[]).map(
        (question) => question.name,
      ),
    ).toEqual(page.faq.map((item) => item.question));
  });

  it('emits Service and BreadcrumbList data matching the visible trail', () => {
    const { container } = renderPage(slug);
    const data = jsonLd(container);
    expect(data.Service?.url).toBe(`${site.url}/solutions/${slug}`);
    expect(data.Service?.serviceType).toBe(page.serviceType);

    const listed = (
      data.BreadcrumbList?.itemListElement as { name: string }[]
    ).map((entry) => entry.name);
    const nav = screen.getByRole('navigation', { name: 'Breadcrumb' });
    const shown = within(nav)
      .getAllByRole('listitem')
      .map((item) => item.textContent?.replace(/\s*\/$/, ''));
    expect(listed).toEqual(['Home', 'Solutions', page.name]);
    expect(shown).toEqual(listed);
  });

  it('points JSON-LD at the localized URL', () => {
    const { container } = renderPage(slug, 'ja');
    const data = jsonLd(container);
    expect(data.Service?.url).toBe(`${site.url}/ja/solutions/${slug}`);
  });

  it('says where we are: early access and the hardware tiers', () => {
    renderPage(slug);
    expect(screen.getByText('Primary')).toBeTruthy();
    expect(screen.getByText('Secondary')).toBeTruthy();
    expect(screen.getByText('Runs')).toBeTruthy();
    expect(
      screen.getByText('Enterprise datacenter GPUs · in progress'),
    ).toBeTruthy();
  });
});

describe('SolutionPage: code sample', () => {
  it('shows a kernel only on the AI companies page', () => {
    const { container } = renderPage('ai-companies');
    expect(container.querySelector('pre code')?.textContent).toContain(
      'pub fn iron_exp<T>',
    );
    expect(screen.getByText('unary.rs')).toBeTruthy();
  });

  it('leaves it out elsewhere', () => {
    const { container } = renderPage('enterprise');
    expect(container.querySelector('pre')).toBeNull();
  });
});
