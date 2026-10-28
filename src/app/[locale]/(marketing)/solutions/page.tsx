import type { Metadata } from 'next';

import { SolutionsOverview } from '@/components/solutions/solutions-overview';
import { solutionsOverview } from '@/content/pages/solutions/overview';
import {
  getSolution,
  solutionPath,
  solutionSlugs,
} from '@/content/pages/solutions/registry';
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
  const { seo } = localize(solutionsOverview, locale);
  return createMetadata({
    title: seo.title,
    description: seo.description,
    path: '/solutions',
    locale,
    keywords: seo.keywords,
  });
}

/** /solutions: the four audiences and the three reasons they share. */
export default async function SolutionsPage({
  params,
}: {
  params: LocaleParams;
}) {
  const locale = await resolveLocale(params);
  const { common } = await getDictionary(locale);
  const shared = localize(solutionsShared, locale);
  const entries = solutionSlugs.flatMap((slug) => {
    const page = getSolution(slug, locale);
    return page ? [{ href: solutionPath(slug), page }] : [];
  });

  return (
    <SolutionsOverview
      overview={localize(solutionsOverview, locale)}
      section={{ label: shared.breadcrumb.solutions, href: '/solutions' }}
      entries={entries}
      shared={shared}
      locale={locale}
      common={common}
    />
  );
}
