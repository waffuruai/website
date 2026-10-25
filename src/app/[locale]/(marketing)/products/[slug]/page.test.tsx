import { render } from '@testing-library/react';
import { notFound } from 'next/navigation';
import { describe, expect, it, vi } from 'vitest';

import ProductRoute, {
  dynamicParams,
  generateMetadata,
  generateStaticParams,
} from '@/app/[locale]/(marketing)/products/[slug]/page';
import { productCopy } from '@/content/pages/products';
import { withDictionary } from '@/i18n/test-utils';

const params = (slug: string, locale = 'en') =>
  Promise.resolve({ locale, slug });

describe('/products/[slug] route', () => {
  it('prerenders exactly the four products and nothing else', () => {
    expect(generateStaticParams()).toEqual([
      { slug: 'iron' },
      { slug: 'butter' },
      { slug: 'waffle' },
      { slug: 'syrup' },
    ]);
    expect(dynamicParams).toBe(false);
  });

  it.each([
    ['iron', 'Iron'],
    ['butter', 'Butter'],
    ['waffle', 'Waffle'],
    ['syrup', 'Syrup'],
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

  it.each(['iron', 'butter', 'waffle', 'syrup'] as const)(
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
      waffle: 'GPU fleet management',
      syrup: 'local RAG',
    } as const;
    for (const [slug, keyword] of Object.entries(wanted)) {
      const { keywords } = await generateMetadata({ params: params(slug) });
      expect(keywords).toContain(keyword);
    }
  });

  it('answers an unknown slug with a 404', async () => {
    vi.mocked(notFound).mockClear();
    await ProductRoute({ params: params('copper') });
    expect(notFound).toHaveBeenCalledTimes(1);
  });
});
