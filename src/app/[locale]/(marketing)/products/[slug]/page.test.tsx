import { render } from '@testing-library/react';
import { notFound } from 'next/navigation';
import { describe, expect, it, vi } from 'vitest';

import ProductRoute, {
  dynamicParams,
  generateMetadata,
  generateStaticParams,
} from '@/app/[locale]/(marketing)/products/[slug]/page';
import { productCopy } from '@/content/pages/products';
import type { Locale } from '@/i18n/config';
import { withDictionary } from '@/i18n/test-utils';

const params = (slug: string, locale = 'en') =>
  Promise.resolve({ locale, slug });

describe('/products/[slug] route', () => {
  it('prerenders exactly the four products and nothing else', () => {
    expect(generateStaticParams()).toEqual([
      { slug: 'iron' },
      { slug: 'butter' },
      { slug: 'syrup' },
      { slug: 'whisk' },
    ]);
    expect(dynamicParams).toBe(false);
  });

  it.each([
    ['iron', 'Iron'],
    ['butter', 'Butter'],
    ['syrup', 'Syrup'],
    ['whisk', 'Whisk'],
  ])('renders %s with its h1, specs and call to action', async (slug, name) => {
    const element = await ProductRoute({ params: params(slug) });
    const { container } = render(withDictionary(element));
    expect(container.querySelectorAll('h1')).toHaveLength(1);
    expect(container.querySelector('h1')?.textContent).toBeTruthy();
    expect(container.textContent).toContain(name);
    expect(container.querySelectorAll('dl dt').length).toBeGreaterThan(4);
    expect(
      container.querySelector('a[href^="https://forms.gle/"]'),
    ).not.toBeNull();
  });

  it.each(['iron', 'butter', 'syrup', 'whisk'] as const)(
    'builds metadata for %s from its content',
    async (slug) => {
      const { seo } = productCopy[slug].en;
      const metadata = await generateMetadata({ params: params(slug) });
      expect(metadata.description).toBe(seo.description);
      expect(metadata.keywords).toEqual(seo.keywords);
      expect(metadata.alternates?.canonical).toBe(`/products/${slug}`);
      expect(metadata.alternates?.languages).toHaveProperty('x-default');
    },
  );

  it('points other locales at their own URL', async () => {
    const metadata = await generateMetadata({ params: params('iron', 'fr') });
    expect(metadata.alternates?.canonical).toBe('/fr/products/iron');
  });

  it('gives the brief’s keywords to each page', async () => {
    const wanted = {
      iron: 'Rust GPU kernel DSL',
      butter: 'LLM inference engine',
      syrup: 'GPU fleet management',
      whisk: 'local RAG',
    } as const;
    for (const [slug, keyword] of Object.entries(wanted)) {
      const { keywords } = await generateMetadata({ params: params(slug) });
      expect(keywords).toContain(keyword);
    }
  });

  const renderRoute = async (slug: string, locale: Locale = 'en') =>
    render(
      withDictionary(
        await ProductRoute({ params: params(slug, locale) }),
        locale,
      ),
    );

  const sectionIds = (container: HTMLElement) =>
    [...container.querySelectorAll('section')].map(
      (section) => section.id || section.getAttribute('aria-labelledby'),
    );

  it('gives Butter its research after its own sections and before the specifics', async () => {
    const { container } = await renderRoute('butter');
    const ids = sectionIds(container);
    const research = [
      'native-inference',
      'aura',
      'quantized-models',
      'tool-reliability',
      'models',
    ];
    const at = research.map((id) => ids.indexOf(id));
    expect(at).toEqual([...at].sort((a, b) => a - b));
    expect(at[0]).toBe(ids.indexOf('quirks') + 1);
    expect(ids.indexOf('specs')).toBe(at.at(-1)! + 1);
    // The numbers and their test conditions are on the same page.
    expect(container.textContent).toContain(
      'See test conditions and limitations',
    );
  });

  it('gives Iron one kernel, with its tiers, and no second code sample', async () => {
    const { container } = await renderRoute('iron');
    expect(container.querySelectorAll('pre')).toHaveLength(1);
    expect(container.querySelector('pre')?.textContent).toContain(
      'pub fn iron_exp<T>',
    );
    expect(
      [...container.querySelectorAll('h2')].map(
        (heading) => heading.textContent,
      ),
    ).toContain('You write this.Iron writes the rest.');
    expect(container.querySelector('#platforms')).toBeNull();
    const tiers = [...container.querySelectorAll('h4')].map(
      (heading) => heading.textContent,
    );
    expect(tiers).toEqual([
      'Apple · Metal',
      'NVIDIA · CUDA',
      'AMD ROCm · Vulkan',
    ]);
  });

  it.each(['syrup', 'whisk'])('adds no research to %s', async (slug) => {
    const { container } = await renderRoute(slug);
    for (const id of ['native-inference', 'aura', 'models']) {
      expect(container.querySelector(`#${id}`)).toBeNull();
    }
    expect(container.querySelector('pre')).toBeNull();
  });

  it.each(['iron', 'butter'])(
    'keeps every id on the %s page unique and the outline in order',
    async (slug) => {
      const { container } = await renderRoute(slug);
      const ids = [...container.querySelectorAll('[id]')].map((el) => el.id);
      expect(ids.filter((id, index) => ids.indexOf(id) !== index)).toEqual([]);
      // The research sections slot into the outline without skipping a level.
      const levels = [...container.querySelectorAll('h1, h2, h3, h4')].map(
        (heading) => Number(heading.tagName.slice(1)),
      );
      expect(container.querySelectorAll('h1')).toHaveLength(1);
      levels.slice(1).forEach((level, index) => {
        expect(level - levels[index]!).toBeLessThanOrEqual(1);
      });
    },
  );

  it('localizes the research with the page', async () => {
    const { container } = await renderRoute('butter', 'ja');
    expect(container.textContent).toContain('試験条件と制限を見る');
  });

  it('answers an unknown slug with a 404', async () => {
    vi.mocked(notFound).mockClear();
    await ProductRoute({ params: params('copper') });
    expect(notFound).toHaveBeenCalledTimes(1);
  });
});
