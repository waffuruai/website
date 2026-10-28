import type { Localized } from '@/content/types';
import type { Locale } from '@/i18n/config';
import { localize } from '@/lib/content';

import { cloudInfrastructure } from './cloud-infrastructure';
import { financialServices } from './financial-services';
import { government } from './government';
import { lifeSciences } from './life-sciences';
import { military } from './military';
import {
  industryPath,
  industrySlugs,
  type IndustryPage,
  type IndustrySlug,
} from './types';

// The slugs live in `types.ts` so client code (the nav) can import them
// without pulling every sector's copy into the bundle.
export { industryPath, industrySlugs };

export const industries: Record<IndustrySlug, Localized<IndustryPage>> = {
  'cloud-infrastructure': cloudInfrastructure,
  'financial-services': financialServices,
  'life-sciences': lifeSciences,
  government,
  military,
};

export const isIndustrySlug = (value: string): value is IndustrySlug =>
  (industrySlugs as readonly string[]).includes(value);

/** The sector page for `slug` in `locale`, or undefined for unknown slugs. */
export function getIndustry(
  slug: string,
  locale: Locale,
): IndustryPage | undefined {
  return isIndustrySlug(slug) ? localize(industries[slug], locale) : undefined;
}
