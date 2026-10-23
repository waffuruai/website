import type { Metadata } from 'next';

import { MarkSection } from '@/components/brand/mark-section';
import { MotifsSection } from '@/components/brand/motifs-section';
import { PaletteSection } from '@/components/brand/palette-section';
import { TypeSection } from '@/components/brand/type-section';
import { UsageSection } from '@/components/brand/usage-section';
import { WordmarkSection } from '@/components/brand/wordmark-section';
import { JsonLd } from '@/components/seo/json-ld';
import { CtaCard } from '@/components/sections/cta-card';
import { PageHero } from '@/components/sections/page-hero';
import { brand } from '@/content/pages/brand';
import { mailto, site } from '@/content/site';
import { localizePath } from '@/i18n/config';
import { getDictionary, resolveLocale, type LocaleParams } from '@/i18n/server';
import { localize } from '@/lib/content';
import { breadcrumbs, webPage } from '@/lib/json-ld';
import { createMetadata } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: LocaleParams;
}): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const { seo } = localize(brand, locale);
  return createMetadata({
    title: seo.title,
    description: seo.description,
    path: '/brand',
    locale,
    keywords: seo.keywords,
  });
}

/** Brand: a small press kit with the mark, wordmark, palette, type and motifs. */
export default async function BrandPage({ params }: { params: LocaleParams }) {
  const locale = await resolveLocale(params);
  const dictionary = await getDictionary(locale);
  const content = localize(brand, locale);
  const path = localizePath('/brand', locale);

  return (
    <>
      <PageHero
        label={content.hero.label}
        title={content.hero.title}
        lede={content.hero.lede}
        actions={content.hero.actions}
      />
      <MarkSection content={content.mark} />
      <WordmarkSection content={content.wordmark} />
      <PaletteSection content={content.colour} />
      <TypeSection content={content.type} />
      <MotifsSection content={content.motifs} />
      <UsageSection content={content.usage} />
      <CtaCard
        id="press"
        title={content.press.title}
        body={content.press.body}
        actions={[{ label: content.press.cta, href: mailto('Press') }]}
      />
      <JsonLd
        data={[
          webPage({
            name: content.seo.title,
            description: content.seo.description,
            path,
            locale,
          }),
          breadcrumbs([
            { name: site.name, path: localizePath('/', locale) },
            { name: dictionary.nav.items.brand.label, path },
          ]),
        ]}
      />
    </>
  );
}
