/*
 * Content model for the Industries pages. The slugs live here, apart from
 * the copy, so client code (the nav) can import them without pulling every
 * page's copy into the bundle.
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
