import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { SolutionPage } from '@/components/solutions/solution-page';
import {
  getIndustry,
  industryPath,
  industrySlugs,
  isIndustrySlug,
} from '@/content/pages/industries/registry';
import { solutionsShared } from '@/content/pages/solutions/shared';
import { getDictionary, resolveLocale } from '@/i18n/server';
import { localize } from '@/lib/content';
import { createMetadata } from '@/lib/seo';

/*
 * One route per sector: /industries/cloud-infrastructure,
 * /financial-services, /life-sciences, /government and /military, rendered
 * by the Solutions template. The `[locale]` segment comes from the parent
 * layout's static params; this one only lists the slugs.
 */
export const dynamicParams = false;

export const generateStaticParams = () =>
  industrySlugs.map((slug) => ({ slug }));

type IndustryParams = Promise<{ locale: string; slug: string }>;

export async function generateMetadata({
  params,
}: {
  params: IndustryParams;
}): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const { slug } = await params;
  const page = getIndustry(slug, locale);
  if (!page || !isIndustrySlug(slug)) notFound();
  return createMetadata({
    title: page.seo.title,
    description: page.seo.description,
    path: industryPath(slug),
    locale,
    keywords: page.seo.keywords,
  });
}

export default async function IndustryRoute({
  params,
}: {
  params: IndustryParams;
}) {
  const locale = await resolveLocale(params);
  const { slug } = await params;
  const page = getIndustry(slug, locale);
  if (!page || !isIndustrySlug(slug)) notFound();
  const { common, nav } = await getDictionary(locale);

  return (
    <SolutionPage
      path={industryPath(slug)}
      parent={{ label: nav.industries, href: '/industries' }}
      page={page}
      shared={localize(solutionsShared, locale)}
      locale={locale}
      common={common}
    />
  );
}
