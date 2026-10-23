import { CapabilityGrid } from '@/components/products/capability-grid';
import { CodeSection } from '@/components/products/code-section';
import { PlatformTiers } from '@/components/products/platform-tiers';
import { ProductHeroPanel } from '@/components/products/product-hero-panel';
import { ProductStory } from '@/components/products/product-story';
import { SpecList } from '@/components/products/spec-list';
import { StackLinks } from '@/components/products/stack-links';
import { JsonLd } from '@/components/seo/json-ld';
import { CtaCard } from '@/components/sections/cta-card';
import { Faq } from '@/components/sections/faq';
import { PageHero } from '@/components/sections/page-hero';
import {
  productCopy,
  productFacts,
  productSummary,
  productsBottomUp,
  productsShared,
  type ProductSlug,
} from '@/content/pages/products';
import { mailto, site } from '@/content/site';
import type { Cta } from '@/content/types';
import { localizePath, type Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/dictionaries/en';
import { localize } from '@/lib/content';
import { breadcrumbs, softwareApplication } from '@/lib/json-ld';

/**
 * One template for every product page, driven by typed content: hero with the
 * product's motif, problem to outcome, capabilities, an optional code sample,
 * technical specifics, hardware tiers where they matter, links to the rest
 * of the stack, the FAQ and the closing call to action.
 */
export function ProductPage({
  slug,
  locale,
  dictionary,
}: {
  slug: ProductSlug;
  locale: Locale;
  dictionary: Dictionary;
}) {
  const facts = productFacts[slug];
  const copy = localize(productCopy[slug], locale);
  const shared = localize(productsShared, locale);
  const { common, nav } = dictionary;

  const path = localizePath(facts.path, locale);
  const others = productsBottomUp
    .filter((product) => product.slug !== slug)
    .map((product) => productSummary(product.slug, locale));

  const actions: Cta[] = [
    { label: common.requestAccess, href: site.urls.earlyAccess },
    facts.secondaryCta === 'docs'
      ? {
          label: copy.cta.docsLabel ?? nav.items.docs.label,
          href: site.urls.docs,
          variant: 'outline',
        }
      : {
          label: common.talkToUs,
          href: mailto('Sales'),
          variant: 'outline',
        },
  ];

  return (
    <>
      <PageHero
        label={`${facts.index} · ${copy.layer}`}
        title={copy.hero.title}
        lede={copy.hero.lede}
        actions={actions}
        className="pb-12 md:pb-16"
      >
        <ProductHeroPanel
          slug={slug}
          highlights={copy.hero.highlights}
          statusLabel={shared.statusLabel}
        />
      </PageHero>

      <ProductStory story={copy.story} shared={shared} />
      <CapabilityGrid capabilities={copy.capabilities} />
      {facts.code && copy.code && (
        <CodeSection copy={copy.code} sample={facts.code} />
      )}
      <SpecList specs={copy.specs} inProgressLabel={common.inProgress} />
      {copy.platforms && (
        <PlatformTiers
          platforms={copy.platforms}
          shared={shared}
          inProgressLabel={common.inProgress}
        />
      )}
      <StackLinks
        stack={copy.stack}
        others={others}
        learnMoreLabel={common.learnMore}
        allProductsLabel={nav.allProducts}
      />
      <Faq heading={common.faqHeading} items={copy.faq} />
      <CtaCard title={copy.cta.title} body={copy.cta.body} actions={actions} />

      <JsonLd
        data={[
          softwareApplication({
            name: facts.name,
            description: copy.seo.description,
            path,
          }),
          breadcrumbs([
            { name: site.name, path: localizePath('/', locale) },
            { name: nav.products, path: localizePath('/products', locale) },
            { name: facts.name, path },
          ]),
        ]}
      />
    </>
  );
}
