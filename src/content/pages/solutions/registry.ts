import type { Localized } from '@/content/types';
import type { Locale } from '@/i18n/config';
import { localize } from '@/lib/content';

import { aiCompanies } from './ai-companies';
import { enterprise } from './enterprise';
import { neoclouds } from './neoclouds';
import { smallBusiness } from './small-business';
import {
  solutionPath,
  solutionSlugs,
  type SolutionPage,
  type SolutionSlug,
} from './types';

// The slugs live in `types.ts` so client code (the nav) can import them
// without pulling every audience's copy into the bundle.
export { solutionPath, solutionSlugs };

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
