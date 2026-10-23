import { CtaCard } from '@/components/sections/cta-card';
import { PageHero } from '@/components/sections/page-hero';
import { JsonLd } from '@/components/seo/json-ld';
import { Breadcrumb } from '@/components/solutions/breadcrumb';
import { SectionOpener } from '@/components/solutions/section-opener';
import { SolutionCard } from '@/components/solutions/solution-card';
import { ValueBand } from '@/components/solutions/value-band';
import { solutionPath } from '@/content/pages/solutions/registry';
import type {
  SolutionPage,
  SolutionSlug,
  SolutionsOverview as SolutionsOverviewContent,
  SolutionsShared,
} from '@/content/pages/solutions/types';
import { mailto, site } from '@/content/site';
import { localeInfo, localizePath, type Locale } from '@/i18n/config';
import { breadcrumbs, webPage } from '@/lib/json-ld';

import type { SolutionCommon } from './solution-page';

/**
 * /solutions: hero, one card per audience, the three value props every
 * audience shares, and the closing call to action.
 */
export function SolutionsOverview({
  overview,
  entries,
  shared,
  locale,
  common,
}: {
  overview: SolutionsOverviewContent;
  /** Audience pages in display order. */
  entries: { slug: SolutionSlug; page: SolutionPage }[];
  shared: SolutionsShared;
  locale: Locale;
  common: SolutionCommon;
}) {
  const path = localizePath('/solutions', locale);
  const trail = [
    { label: shared.breadcrumb.home, href: '/' },
    { label: shared.breadcrumb.solutions, href: '/solutions' },
  ];

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
        className="max-w-site px-site mx-auto"
      >
        <div className="border-foreground/12 border-t pt-[72px] md:pt-[120px]">
          <SectionOpener
            id="audiences"
            label={overview.cards.label}
            title={overview.cards.title}
            intro={overview.cards.intro}
          />
          <ul className="grid gap-5 md:grid-cols-2">
            {entries.map(({ slug, page }) => (
              <li key={slug}>
                <SolutionCard
                  href={solutionPath(slug)}
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
