import { AudienceCards } from '@/components/products/audience-cards';
import { StackDiagram } from '@/components/products/stack-diagram';
import { UseOneOrAll } from '@/components/products/use-one-or-all';
import { JsonLd } from '@/components/seo/json-ld';
import { CtaCard } from '@/components/sections/cta-card';
import { PageHero } from '@/components/sections/page-hero';
import {
  productSummary,
  productsBottomUp,
  productsOverview,
  productsTopDown,
} from '@/content/pages/products';
import { mailto, site } from '@/content/site';
import type { Cta } from '@/content/types';
import { localeInfo, localizePath, type Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/dictionaries/en';
import { localize } from '@/lib/content';
import { breadcrumbs, webPage } from '@/lib/json-ld';

/**
 * /products: the Waffuru stack. The four layers as a stack from Syrup (04)
 * down to Iron (01), what each does alone and together, who it is for.
 */
export function ProductsOverview({
  locale,
  dictionary,
}: {
  locale: Locale;
  dictionary: Dictionary;
}) {
  const copy = localize(productsOverview, locale);
  const { common, nav } = dictionary;
  const path = localizePath('/products', locale);

  const topDown = productsTopDown.map((p) => productSummary(p.slug, locale));
  const bottomUp = productsBottomUp.map((p) => productSummary(p.slug, locale));

  const requestAccess: Cta = {
    label: common.requestAccess,
    href: site.urls.earlyAccess,
  };

  return (
    <>
      <PageHero
        label={copy.hero.label}
        title={copy.hero.title}
        lede={copy.hero.lede}
        actions={[requestAccess]}
        className="pb-4 md:pb-8"
      />
      <StackDiagram
        layers={copy.layers}
        products={topDown}
        privateLabel={common.private}
      />
      <UseOneOrAll together={copy.together} products={bottomUp} />
      <AudienceCards audience={copy.audience} nav={nav} />
      <CtaCard
        title={copy.cta.title}
        body={copy.cta.body}
        actions={[
          requestAccess,
          {
            label: common.talkToUs,
            href: mailto('Sales'),
            variant: 'outline',
          },
        ]}
      />

      <JsonLd
        data={[
          webPage({
            name: copy.seo.title,
            description: copy.seo.description,
            path,
            locale: localeInfo[locale].lang,
          }),
          breadcrumbs([
            { name: site.name, path: localizePath('/', locale) },
            { name: nav.products, path },
          ]),
        ]}
      />
    </>
  );
}
