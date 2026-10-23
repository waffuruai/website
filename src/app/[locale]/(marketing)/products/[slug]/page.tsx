import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { ProductPage } from '@/components/products/product-page';
import {
  isProductSlug,
  productCopy,
  productFacts,
  productSlugs,
} from '@/content/pages/products';
import { getDictionary, resolveLocale } from '@/i18n/server';
import { localize } from '@/lib/content';
import { createMetadata } from '@/lib/seo';

type ProductParams = Promise<{ locale: string; slug: string }>;

// Only the four products exist; the locale comes from the parent segment.
export const dynamicParams = false;

export function generateStaticParams() {
  return productSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: ProductParams;
}): Promise<Metadata> {
  const { slug } = await params;
  if (!isProductSlug(slug)) notFound();
  const locale = await resolveLocale(params);
  const { seo } = localize(productCopy[slug], locale);
  return createMetadata({
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    path: productFacts[slug].path,
    locale,
  });
}

/** /products/iron, /products/butter, /products/waffle, /products/syrup. */
export default async function ProductRoute({
  params,
}: {
  params: ProductParams;
}) {
  const { slug } = await params;
  if (!isProductSlug(slug)) notFound();
  const locale = await resolveLocale(params);
  const dictionary = await getDictionary(locale);
  return <ProductPage slug={slug} locale={locale} dictionary={dictionary} />;
}
