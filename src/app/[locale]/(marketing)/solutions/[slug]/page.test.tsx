import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { solutionSlugs, solutions } from '@/content/pages/solutions/registry';
import { mailto } from '@/content/site';
import { withDictionary } from '@/i18n/test-utils';

import SolutionRoute, {
  dynamicParams,
  generateMetadata,
  generateStaticParams,
} from './page';

const params = (slug: string, locale = 'en') =>
  Promise.resolve({ locale, slug });

describe('/solutions/[slug] route', () => {
  it('prerenders exactly the four audiences and nothing else', () => {
    expect(generateStaticParams()).toEqual([
      { slug: 'small-business' },
      { slug: 'enterprise' },
      { slug: 'neoclouds' },
      { slug: 'ai-companies' },
    ]);
    expect(dynamicParams).toBe(false);
  });

  describe.each(solutionSlugs)('%s', (slug) => {
    it('renders the h1, the use cases and the Sales mailto', async () => {
      const ui = await SolutionRoute({ params: params(slug) });
      render(withDictionary(ui));
      const page = solutions[slug].en;

      expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
      for (const useCase of page.useCases.items) {
        expect(screen.getByText(useCase.title)).toBeTruthy();
      }
      expect(
        screen
          .getAllByRole('link', { name: /Talk to us/ })
          .every((link) => link.getAttribute('href') === mailto('Sales')),
      ).toBe(true);
    });

    it('sets metadata from the page content', async () => {
      const page = solutions[slug].en;
      const metadata = await generateMetadata({ params: params(slug) });
      expect(metadata.title).toBe(page.seo.title);
      expect(metadata.description).toBe(page.seo.description);
      expect(metadata.keywords).toEqual(page.seo.keywords);
      expect(metadata.alternates?.canonical).toBe(`/solutions/${slug}`);
    });
  });

  it('localizes the canonical URL', async () => {
    const metadata = await generateMetadata({
      params: params('enterprise', 'es'),
    });
    expect(metadata.alternates?.canonical).toBe('/es/solutions/enterprise');
  });
});
