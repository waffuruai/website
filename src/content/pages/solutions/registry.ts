import type { Localized } from '@/content/types';
import type { Locale } from '@/i18n/config';
import { localize } from '@/lib/content';

import { aiCompanies } from './ai-companies';
import { enterprise } from './enterprise';
import { neoclouds } from './neoclouds';
import { smallBusiness } from './small-business';
import type { SolutionPage, SolutionSlug } from './types';

/** Route slugs, in the order the overview and navigation list them. */
export const solutionSlugs = [
  'small-business',
  'enterprise',
  'neoclouds',
  'ai-companies',
] as const satisfies readonly SolutionSlug[];

export const solutions: Record<SolutionSlug, Localized<SolutionPage>> = {
  'small-business': smallBusiness,
  enterprise,
  neoclouds,
  'ai-companies': aiCompanies,
};

export const isSolutionSlug = (value: string): value is SolutionSlug =>
  (solutionSlugs as readonly string[]).includes(value);

/** The audience page for `slug` in `locale`, or undefined for unknown slugs. */
export function getSolution(
  slug: string,
  locale: Locale,
): SolutionPage | undefined {
  return isSolutionSlug(slug) ? localize(solutions[slug], locale) : undefined;
}

export const solutionPath = (slug: SolutionSlug) => `/solutions/${slug}`;
