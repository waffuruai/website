import { CtaCard } from '@/components/sections/cta-card';
import { PageHero } from '@/components/sections/page-hero';
import { JsonLd } from '@/components/seo/json-ld';
import {
  Breadcrumb,
  type BreadcrumbItem,
} from '@/components/solutions/breadcrumb';
import { SectionOpener } from '@/components/solutions/section-opener';
import { SolutionCard } from '@/components/solutions/solution-card';
import { ValueBand } from '@/components/solutions/value-band';
import type {
  SolutionPage,
  SolutionsOverview as SolutionsOverviewContent,
  SolutionsShared,
} from '@/content/pages/solutions/types';
import { mailto, site } from '@/content/site';
import { localeInfo, localizePath, type Locale } from '@/i18n/config';
import { breadcrumbs, webPage } from '@/lib/json-ld';

import type { SolutionCommon } from './solution-page';

/**
 * /solutions and /industries: hero, one card per page in the section, the
 * three value props they all share, and the closing call to action.
 */
export function SolutionsOverview({
  overview,
  section,
  entries,
  shared,
  locale,
  common,
}: {
  overview: SolutionsOverviewContent;
  /** This page's crumb and unprefixed route ("Solutions", "/solutions"). */
  section: BreadcrumbItem;
  /** The section's pages in display order, each with its route. */
  entries: { href: string; page: SolutionPage }[];
  shared: SolutionsShared;
  locale: Locale;
  common: SolutionCommon;
}) {
  const path = localizePath(section.href, locale);
  const trail = [{ label: shared.breadcrumb.home, href: '/' }, section];

  return (
    <>
      <Breadcrumb label={shared.breadcrumb.label} items={trail} />
      <PageHero
        label={overview.hero.label}
        title={overview.hero.title}
        lede={overview.hero.lede}
        className="pt-8 md:pt-12"
      />
      <section
        aria-labelledby="audiences"
        className="mx-auto max-w-site px-site"
      >
        <div className="border-t border-foreground/12 pt-[72px] md:pt-[120px]">
          <SectionOpener
            id="audiences"
            label={overview.cards.label}
            title={overview.cards.title}
            intro={overview.cards.intro}
          />
          <ul className="grid gap-5 md:grid-cols-2">
            {entries.map(({ href, page }) => (
              <li key={href}>
                <SolutionCard
                  href={href}
                  title={page.card.title}
                  summary={page.card.summary}
                  products={page.stackFit.items.map(
                    (item) => shared.products[item.product].name,
                  )}
                />
              </li>
            ))}
          </ul>
        </div>
      </section>
      <ValueBand
        id="value-props"
        label={overview.values.label}
        title={overview.values.title}
        intro={overview.values.intro}
        items={overview.values.items}
        tags={shared.tags}
      />
      <CtaCard
        className="pt-[72px] md:pt-[120px]"
        title={overview.cta.title}
        body={overview.cta.body}
        actions={[
          { label: common.talkToUs, href: mailto('Sales') },
          {
            label: common.requestAccess,
            href: site.urls.earlyAccess,
            variant: 'outline',
          },
        ]}
      />
      <JsonLd
        data={[
          webPage({
            name: overview.seo.title,
            description: overview.seo.description,
            path,
            locale: localeInfo[locale].lang,
          }),
          breadcrumbs(
            trail.map((item) => ({
              name: item.label,
              path: localizePath(item.href, locale),
            })),
          ),
        ]}
      />
    </>
  );
}
