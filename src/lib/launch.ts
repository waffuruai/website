import { industryPath, industrySlugs } from '@/content/pages/industries/types';
import { pantryFacts } from '@/content/pages/pantry/facts';
import { productSlugs } from '@/content/pages/products/types';
import { solutionPath, solutionSlugs } from '@/content/pages/solutions/types';
import { site } from '@/content/site';
import { splitLocale } from '@/i18n/config';

/*
 * Launch gating. A section of the site (`site.launched`) is either live or
 * unreleased. Unreleased sections still build, and show in dev and tests so
 * they can be reviewed; production hides their links and the postbuild prune
 * deletes their pages. Safe to import from client components: it reads only
 * slugs and the inlined env.
 */

export type LaunchSection = keyof typeof site.launched;
export type Launched = Record<LaunchSection, boolean>;

/** Every route each section owns, unprefixed (no locale). */
export const sectionRoutes: Record<LaunchSection, readonly string[]> = {
  pantry: [pantryFacts.path],
  stack: ['/products', ...productSlugs.map((slug) => `/products/${slug}`)],
  solutions: ['/solutions', ...solutionSlugs.map(solutionPath)],
  industries: ['/industries', ...industrySlugs.map(industryPath)],
};

const sections = Object.keys(sectionRoutes) as LaunchSection[];

/**
 * Whether this build shows unreleased sections: `NEXT_PUBLIC_SHOW_UNRELEASED`
 * set to `1` or `0` decides, else everything but production does. Read
 * literally so Next inlines it into client bundles.
 */
export function showUnreleased(): boolean {
  const flag = process.env.NEXT_PUBLIC_SHOW_UNRELEASED;
  if (flag === '1') return true;
  if (flag === '0') return false;
  return process.env.NODE_ENV !== 'production';
}

export type LaunchOptions = { launched?: Launched; unreleased?: boolean };

/** Whether `section` is visible in this build. */
export function isPublished(
  section: LaunchSection,
  {
    launched = site.launched,
    unreleased = showUnreleased(),
  }: LaunchOptions = {},
): boolean {
  return unreleased || launched[section];
}

/** The section that owns `route` (unprefixed, no hash or query), if any. */
export function sectionOf(route: string): LaunchSection | undefined {
  return sections.find((section) => sectionRoutes[section].includes(route));
}

/**
 * Whether a link to `href` leads to a page this build publishes. External
 * links, hashes and routes no section owns are always published.
 */
export function isPublishedPath(
  href: string,
  options?: LaunchOptions,
): boolean {
  if (!href.startsWith('/') || href.startsWith('//')) return true;
  const { path } = splitLocale(href.split(/[?#]/)[0] || '/');
  const route = path.length > 1 ? path.replace(/\/+$/, '') : path;
  const section = sectionOf(route);
  return !section || isPublished(section, options);
}

/** Routes this build must not ship, for the postbuild prune. */
export function unreleasedRoutes(options?: LaunchOptions): string[] {
  return sections
    .filter((section) => !isPublished(section, options))
    .flatMap((section) => sectionRoutes[section]);
}
