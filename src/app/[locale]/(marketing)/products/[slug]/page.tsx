import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { ProductPage } from '@/components/products/product-page';
import { KernelCode } from '@/components/research/kernel-code';
import { Models } from '@/components/research/models';
import { kernelCode } from '@/content/pages/kernel-code';
import { models } from '@/content/pages/models';
import {
  isProductSlug,
  productCopy,
  productFacts,
  productSlugs,
  type ProductSlug,
} from '@/content/pages/products';
import type { Locale } from '@/i18n/config';
import { getDictionary, resolveLocale } from '@/i18n/server';
import { localize } from '@/lib/content';
import { createMetadata } from '@/lib/seo';

type ProductParams = Promise<{ locale: string; slug: string }>;

// Only the four products exist; the locale comes from the parent segment.
export const dynamicParams = false;

export function generateStaticParams() {
  return productSlugs.map((slug) => ({ slug }));
}

/**
 * The research sections a product page carries, each reading its own content
 * file. Iron: the kernel, its backends and how far each is tuned; Syrup and Whisk have none yet.
 */
const research: Partial<
  Record<ProductSlug, (locale: Locale) => React.ReactNode>
> = {
  iron: (locale) => <KernelCode content={localize(kernelCode, locale)} />,
};

/** Sections right after the story: Butter shows the models it runs. */
const afterStory: Partial<
  Record<ProductSlug, (locale: Locale) => React.ReactNode>
> = {
  butter: (locale) => <Models content={localize(models, locale)} />,
};

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

/** /products/iron, /products/butter, /products/syrup, /products/whisk. */
export default async function ProductRoute({
  params,
}: {
  params: ProductParams;
}) {
  const { slug } = await params;
  if (!isProductSlug(slug)) notFound();
  const locale = await resolveLocale(params);
  const dictionary = await getDictionary(locale);
  return (
    <ProductPage
      slug={slug}
      locale={locale}
      dictionary={dictionary}
      afterStory={afterStory[slug]?.(locale)}
    >
      {research[slug]?.(locale)}
    </ProductPage>
  );
}
