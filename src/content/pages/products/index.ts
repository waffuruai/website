import { butter } from '@/content/pages/products/butter';
import { productFacts } from '@/content/pages/products/facts';
import { iron } from '@/content/pages/products/iron';
import { productsOverview } from '@/content/pages/products/overview';
import { productsShared } from '@/content/pages/products/shared';
import { syrup } from '@/content/pages/products/syrup';
import {
  productSlugs,
  type ProductCopy,
  type ProductFacts,
  type ProductSlug,
} from '@/content/pages/products/types';
import { waffle } from '@/content/pages/products/waffle';
import type { Localized } from '@/content/types';
import type { Locale } from '@/i18n/config';
import { localize } from '@/lib/content';

export * from '@/content/pages/products/facts';
export * from '@/content/pages/products/types';
export { productsOverview, productsShared };

/** Per-product copy, keyed by slug. */
export const productCopy: Record<ProductSlug, Localized<ProductCopy>> = {
  iron,
  butter,
  waffle,
  syrup,
};

export const isProductSlug = (value: string): value is ProductSlug =>
  (productSlugs as readonly string[]).includes(value);

/** What the overview and the cross-links show about a product. */
export type ProductSummary = ProductFacts &
  Pick<ProductCopy, 'layer' | 'tagline' | 'summary'>;

export function productSummary(
  slug: ProductSlug,
  locale: Locale,
): ProductSummary {
  const { layer, tagline, summary } = localize(productCopy[slug], locale);
  return { ...productFacts[slug], layer, tagline, summary };
}
