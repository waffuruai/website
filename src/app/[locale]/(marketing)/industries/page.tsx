import type { Metadata } from 'next';

import { SolutionsOverview } from '@/components/solutions/solutions-overview';
import { industriesOverview } from '@/content/pages/industries/overview';
import {
  getIndustry,
  industryPath,
  industrySlugs,
} from '@/content/pages/industries/registry';
import { solutionsShared } from '@/content/pages/solutions/shared';
import { getDictionary, resolveLocale, type LocaleParams } from '@/i18n/server';
import { localize } from '@/lib/content';
import { createMetadata } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: LocaleParams;
}): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const { seo } = localize(industriesOverview, locale);
  return createMetadata({
    title: seo.title,
    description: seo.description,
    path: '/industries',
    locale,
    keywords: seo.keywords,
  });
}

/**
 * /industries: the five sectors and the three answers they share. Same
 * template as /solutions; the breadcrumb label is the nav's "Industries".
 */
export default async function IndustriesPage({
  params,
}: {
  params: LocaleParams;
}) {
  const locale = await resolveLocale(params);
  const { common, nav } = await getDictionary(locale);
  const entries = industrySlugs.flatMap((slug) => {
    const page = getIndustry(slug, locale);
    return page ? [{ href: industryPath(slug), page }] : [];
  });

  return (
    <SolutionsOverview
      overview={localize(industriesOverview, locale)}
      section={{ label: nav.industries, href: '/industries' }}
      entries={entries}
      shared={localize(solutionsShared, locale)}
      locale={locale}
      common={common}
    />
  );
}
