import type { Metadata } from 'next';

import { ProductsOverview } from '@/components/products/products-overview';
import { productsOverview } from '@/content/pages/products';
import { getDictionary, resolveLocale, type LocaleParams } from '@/i18n/server';
import { localize } from '@/lib/content';
import { createMetadata } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: LocaleParams;
}): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const { seo } = localize(productsOverview, locale);
  return createMetadata({
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    path: '/products',
    locale,
  });
}

/** /products: the Waffuru stack. */
export default async function ProductsPage({
  params,
}: {
  params: LocaleParams;
}) {
  const locale = await resolveLocale(params);
  const dictionary = await getDictionary(locale);
  return <ProductsOverview locale={locale} dictionary={dictionary} />;
}
