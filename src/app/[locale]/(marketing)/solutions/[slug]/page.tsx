import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { SolutionPage } from '@/components/solutions/solution-page';
import {
  getSolution,
  isSolutionSlug,
  solutionPath,
  solutionSlugs,
} from '@/content/pages/solutions/registry';
import { solutionsShared } from '@/content/pages/solutions/shared';
import { getDictionary, resolveLocale } from '@/i18n/server';
import { localize } from '@/lib/content';
import { createMetadata } from '@/lib/seo';

/*
 * One route per audience: /solutions/small-business, /enterprise,
 * /neoclouds and /ai-companies. The `[locale]` segment comes from the
 * parent layout's static params; this one only lists the slugs.
 */
export const dynamicParams = false;

export const generateStaticParams = () =>
  solutionSlugs.map((slug) => ({ slug }));

type SolutionParams = Promise<{ locale: string; slug: string }>;

export async function generateMetadata({
  params,
}: {
  params: SolutionParams;
}): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const { slug } = await params;
  const page = getSolution(slug, locale);
  if (!page || !isSolutionSlug(slug)) notFound();
  return createMetadata({
    title: page.seo.title,
    description: page.seo.description,
    path: solutionPath(slug),
    locale,
    keywords: page.seo.keywords,
  });
}

export default async function SolutionRoute({
  params,
}: {
  params: SolutionParams;
}) {
  const locale = await resolveLocale(params);
  const { slug } = await params;
  const page = getSolution(slug, locale);
  if (!page || !isSolutionSlug(slug)) notFound();
  const { common } = await getDictionary(locale);

  return (
    <SolutionPage
      slug={slug}
      page={page}
      shared={localize(solutionsShared, locale)}
      locale={locale}
      common={common}
    />
  );
}
