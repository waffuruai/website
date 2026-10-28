import type {
  SolutionPage,
  SolutionsOverview,
} from '@/content/pages/solutions/types';

/*
 * Content model for the Industries pages. They share the Solutions content
 * model and template (`components/solutions/solution-page.tsx`), so a sector
 * page is a `SolutionPage` with a different route and breadcrumb. The slugs
 * live here, apart from the copy, so client code (the nav) can import them
 * without pulling every page's copy into the bundle.
 */

/** Route slugs, in the order the overview and navigation list them. */
export const industrySlugs = [
  'cloud-infrastructure',
  'financial-services',
  'life-sciences',
  'government',
  'military',
] as const;

export type IndustrySlug = (typeof industrySlugs)[number];

export const industryPath = (slug: IndustrySlug) => `/industries/${slug}`;

/** One sector page; every `title` accepts `*word*` for the gold accent. */
export type IndustryPage = SolutionPage;

/** /industries: hero, one card per sector, shared value props, CTA. */
export type IndustriesOverview = SolutionsOverview;
