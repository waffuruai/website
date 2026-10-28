import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import ProductsPage, {
  generateMetadata,
} from '@/app/[locale]/(marketing)/products/page';
import { productsOverview } from '@/content/pages/products';
import { withDictionary } from '@/i18n/test-utils';

const params = (locale = 'en') => Promise.resolve({ locale });

describe('/products route', () => {
  it('renders the overview with links to all four products', async () => {
    const element = await ProductsPage({ params: params() });
    const { container } = render(withDictionary(element));
    expect(container.querySelectorAll('h1')).toHaveLength(1);
    const hrefs = [...container.querySelectorAll('a')].map((a) =>
      a.getAttribute('href'),
    );
    for (const slug of ['iron', 'butter', 'syrup', 'whisk']) {
      expect(hrefs).toContain(`/products/${slug}`);
    }
  });

  it('builds metadata from the overview content', async () => {
    const { seo } = productsOverview.en;
    const metadata = await generateMetadata({ params: params() });
    expect(metadata.description).toBe(seo.description);
    expect(metadata.keywords).toEqual(seo.keywords);
    expect(metadata.alternates?.canonical).toBe('/products');
  });

  it('localizes the canonical URL', async () => {
    const metadata = await generateMetadata({ params: params('ko') });
    expect(metadata.alternates?.canonical).toBe('/ko/products');
  });
});
