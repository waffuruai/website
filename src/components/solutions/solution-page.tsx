import { CtaCard } from '@/components/sections/cta-card';
import { Faq } from '@/components/sections/faq';
import { PageHero } from '@/components/sections/page-hero';
import { plainText } from '@/components/sections/accent';
import { JsonLd } from '@/components/seo/json-ld';
import {
  Breadcrumb,
  type BreadcrumbItem,
} from '@/components/solutions/breadcrumb';
import { CodeSample } from '@/components/solutions/code-sample';
import { Problem } from '@/components/solutions/problem';
import { StackFit } from '@/components/solutions/stack-fit';
import { UseCases } from '@/components/solutions/use-cases';
import { WhereWeAre } from '@/components/solutions/where-we-are';
import type {
  SolutionPage as SolutionPageContent,
  SolutionsShared,
} from '@/content/pages/solutions/types';
import { mailto, site } from '@/content/site';
import { localizePath, type Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/dictionaries/en';
import { breadcrumbs, service } from '@/lib/json-ld';

/** UI strings the template needs from the dictionary. */
export type SolutionCommon = Pick<
  Dictionary['common'],
  'talkToUs' | 'requestAccess' | 'faqHeading'
>;

/**
 * The one template behind /solutions/<audience> and /industries/<sector>:
 * breadcrumb, hero, the problem, use cases, how the stack fits, where we
 * are, FAQ and the closing call to action. Content comes from
 * `src/content/pages/solutions` or `src/content/pages/industries`; the
 * visible breadcrumb, Service and BreadcrumbList JSON-LD say the same thing.
 */
export function SolutionPage({
  path,
  parent,
  page,
  shared,
  locale,
  common,
}: {
  /** This page's route, unprefixed ("/solutions/enterprise"). */
  path: string;
  /** The section crumb between Home and this page ("Solutions"). */
  parent: BreadcrumbItem;
  page: SolutionPageContent;
  shared: SolutionsShared;
  locale: Locale;
  common: SolutionCommon;
}) {
  const trail = [
    { label: shared.breadcrumb.home, href: '/' },
    parent,
    { label: page.name, href: path },
  ];
  const actions = [
    { label: common.talkToUs, href: mailto('Sales') },
    {
      label: common.requestAccess,
      href: site.urls.earlyAccess,
      variant: 'outline' as const,
    },
  ];

  return (
    <>
      <Breadcrumb label={shared.breadcrumb.label} items={trail} />
      <PageHero
        label={page.name}
        title={page.hero.title}
        lede={page.hero.lede}
        actions={actions}
        className="pt-8 md:pt-12"
      />
      <Problem id="problem" label={shared.sections.problem} {...page.problem} />
      <UseCases
        id="use-cases"
        label={shared.sections.useCases}
        title={page.useCases.title}
        intro={page.useCases.intro}
        items={page.useCases.items}
        tags={shared.tags}
      />
      {page.sample && (
        <CodeSample
          id="sample"
          label={shared.products.iron.role}
          sample={page.sample}
        />
      )}
      <StackFit
        id="stack"
        label={shared.sections.stackFit}
        title={page.stackFit.title}
        intro={page.stackFit.intro}
        items={page.stackFit.items}
        products={shared.products}
      />
      <WhereWeAre
        id="where-we-are"
        label={shared.sections.whereWeAre}
        title={page.whereWeAre.title}
        lede={page.whereWeAre.lede}
        notes={page.whereWeAre.notes}
        hardware={shared.hardware}
      />
      <Faq
        heading={common.faqHeading}
        items={page.faq}
        className="pt-[72px] md:pt-[120px]"
      />
      <CtaCard title={page.cta.title} body={page.cta.body} actions={actions} />
      <JsonLd
        data={[
          service({
            name: plainText(page.seo.title),
            description: page.seo.description,
            path: localizePath(path, locale),
            serviceType: page.serviceType,
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
