import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { ProductPage } from '@/components/products/product-page';
import { Aura } from '@/components/research/aura';
import { KernelCode } from '@/components/research/kernel-code';
import { Models } from '@/components/research/models';
import { QuantizedModels } from '@/components/research/quantized-models';
import { SpeculativeResearch } from '@/components/research/speculative-research';
import { ToolResearch } from '@/components/research/tool-research';
import { aura } from '@/content/pages/aura';
import { kernelCode } from '@/content/pages/kernel-code';
import { models } from '@/content/pages/models';
import {
  isProductSlug,
  productCopy,
  productFacts,
  productSlugs,
  type ProductSlug,
} from '@/content/pages/products';
import { quantizedModels } from '@/content/pages/quantized-models';
import { speculativeResearch } from '@/content/pages/speculative-research';
import { toolResearch } from '@/content/pages/tool-research';
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
 * file. Butter: how fast (speculative decoding), how much context fits
 * (AURA), the quantized models, how reliable tool calls are, and the labs it
 * runs. Iron: the kernel, its backends and how far each is tuned. Waffle and
 * Syrup have none yet.
 */
const research: Partial<
  Record<ProductSlug, (locale: Locale) => React.ReactNode>
> = {
  butter: (locale) => (
    <>
      <SpeculativeResearch content={localize(speculativeResearch, locale)} />
      <Aura content={localize(aura, locale)} />
      <QuantizedModels content={localize(quantizedModels, locale)} />
      <ToolResearch content={localize(toolResearch, locale)} locale={locale} />
      <Models content={localize(models, locale)} />
    </>
  ),
  iron: (locale) => <KernelCode content={localize(kernelCode, locale)} />,
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
  return (
    <ProductPage slug={slug} locale={locale} dictionary={dictionary}>
      {research[slug]?.(locale)}
    </ProductPage>
  );
}
