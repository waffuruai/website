import { render, screen, within } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { industries, industrySlugs } from '@/content/pages/industries/registry';
import { mailto, site } from '@/content/site';
import type { Locale } from '@/i18n/config';
import { withDictionary } from '@/i18n/test-utils';

import IndustryRoute, {
  dynamicParams,
  generateMetadata,
  generateStaticParams,
} from './page';

const params = (slug: string, locale = 'en') =>
  Promise.resolve({ locale, slug });

async function renderRoute(slug: string, locale: Locale = 'en') {
  const ui = await IndustryRoute({ params: params(slug, locale) });
  return render(withDictionary(ui, locale));
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

describe('/industries/[slug] route', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('prerenders exactly the five sectors and nothing else', () => {
    expect(generateStaticParams()).toEqual([
      { slug: 'cloud-infrastructure' },
      { slug: 'financial-services' },
      { slug: 'life-sciences' },
      { slug: 'government' },
      { slug: 'military' },
    ]);
    expect(dynamicParams).toBe(false);
  });

  describe.each(industrySlugs)('%s', (slug) => {
    const page = industries[slug].en;

    it('renders the h1, the use cases and the Sales mailto', async () => {
      await renderRoute(slug);

      expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
      expect(screen.getByRole('heading', { level: 1 }).textContent).toBe(
        page.hero.title.replace(/\*/g, ''),
      );
      for (const useCase of page.useCases.items) {
        expect(
          screen.getByRole('heading', { level: 3, name: useCase.title }),
        ).toBeTruthy();
      }
      expect(
        screen
          .getAllByRole('link', { name: /Talk to us/ })
          .every((link) => link.getAttribute('href') === mailto('Sales')),
      ).toBe(true);
    });

    it('shows Home / Industries / sector and the same trail in JSON-LD', async () => {
      const { container } = await renderRoute(slug);
      const data = jsonLd(container);
      expect(data.Service?.url).toBe(`${site.url}/industries/${slug}`);
      expect(data.Service?.serviceType).toBe(page.serviceType);

      const listed = (
        data.BreadcrumbList?.itemListElement as { name: string }[]
      ).map((entry) => entry.name);
      const nav = screen.getByRole('navigation', { name: 'Breadcrumb' });
      const shown = within(nav)
        .getAllByRole('listitem')
        .map((item) => item.textContent?.replace(/\s*\/$/, ''));
      expect(listed).toEqual(['Home', 'Industries', page.name]);
      expect(shown).toEqual(listed);
      expect(
        within(nav)
          .getByRole('link', { name: 'Industries' })
          .getAttribute('href'),
      ).toBe('/industries');
    });

    it('sets metadata from the page content', async () => {
      const metadata = await generateMetadata({ params: params(slug) });
      expect(metadata.title).toBe(page.seo.title);
      expect(metadata.description).toBe(page.seo.description);
      expect(metadata.keywords).toEqual(page.seo.keywords);
      expect(metadata.alternates?.canonical).toBe(`/industries/${slug}`);
    });
  });

  it('localizes the canonical URL and the JSON-LD', async () => {
    const metadata = await generateMetadata({
      params: params('government', 'fr'),
    });
    expect(metadata.alternates?.canonical).toBe('/fr/industries/government');

    const { container } = await renderRoute('government', 'fr');
    expect(jsonLd(container).Service?.url).toBe(
      `${site.url}/fr/industries/government`,
    );
  });

  it('links Pantry from the military page once Pantry is published', async () => {
    vi.stubEnv('NEXT_PUBLIC_SHOW_UNRELEASED', '1');
    await renderRoute('military');
    expect(
      screen.getByRole('link', { name: /Explore Pantry/ }).getAttribute('href'),
    ).toBe('/products/pantry');
  });

  it('keeps the Pantry mention, linked only once Pantry launches', async () => {
    vi.stubEnv('NEXT_PUBLIC_SHOW_UNRELEASED', '0');
    await renderRoute('military');
    expect(
      screen.queryByRole('link', { name: /Explore Pantry/ }) !== null,
    ).toBe(site.launched.pantry);
    expect(
      screen.getByText(/Pantry, our free and open-source scanner/),
    ).toBeTruthy();
  });

  it('has no Pantry link on the other sector pages', async () => {
    vi.stubEnv('NEXT_PUBLIC_SHOW_UNRELEASED', '1');
    await renderRoute('government');
    expect(screen.queryByRole('link', { name: /Pantry/ })).toBeNull();
  });
});
