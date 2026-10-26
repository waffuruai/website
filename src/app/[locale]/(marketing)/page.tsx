import { SpeculativeResearch } from '@/components/home/speculative-research';
import { speculativeResearch } from '@/content/pages/speculative-research';
import type { Metadata } from 'next';

import { FilmGrain } from '@/components/home/film-grain';
import { Hero } from '@/components/home/hero';
import { KernelCode } from '@/components/home/kernel-code';
import { Models } from '@/components/home/models';
import { Stack } from '@/components/home/stack';
import { TeamTeaser } from '@/components/home/team-teaser';
import { ToolResearch } from '@/components/home/tool-research';
import { NewsletterSignup } from '@/components/newsletter/newsletter-signup';
import { JsonLd } from '@/components/seo/json-ld';
import { CtaCard } from '@/components/sections/cta-card';
import { home } from '@/content/pages/home';
import { toolResearch } from '@/content/pages/tool-research';
import { mailto, site } from '@/content/site';
import { teamCopy } from '@/content/team';
import { localeInfo, localizePath } from '@/i18n/config';
import { getDictionary, resolveLocale, type LocaleParams } from '@/i18n/server';
import { localize } from '@/lib/content';
import { webPage } from '@/lib/json-ld';
import { createMetadata } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: LocaleParams;
}): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const { meta } = await getDictionary(locale);
  const { seo } = localize(home, locale);
  return {
    ...createMetadata({
      title: meta.defaultTitle,
      description: meta.defaultDescription,
      path: '/',
      locale,
      keywords: seo.keywords,
    }),
    // The home title stands alone: no "· Waffuru" template suffix.
    title: { absolute: meta.defaultTitle },
  };
}

/**
 * Home: the After Hours page, section by section. The stack comes right after
 * the hero (the product is the point); the measured research follows it.
 */
export default async function HomePage({ params }: { params: LocaleParams }) {
  const locale = await resolveLocale(params);
  const { common, meta } = await getDictionary(locale);
  const content = localize(home, locale);

  return (
    <div className="relative overflow-x-clip">
      <JsonLd
        data={webPage({
          name: meta.defaultTitle,
          description: meta.defaultDescription,
          path: localizePath('/', locale),
          locale: localeInfo[locale].lang,
        })}
      />
      <FilmGrain />
      <Hero
        content={content.hero}
        primary={{ label: common.requestAccess, href: site.urls.earlyAccess }}
      />
      <Stack content={content.stack} privateLabel={common.private} />
      <SpeculativeResearch content={localize(speculativeResearch, locale)} />
      <ToolResearch content={localize(toolResearch, locale)} locale={locale} />
      <Models content={content.models} />
      <KernelCode content={content.kernel} />
      <TeamTeaser content={content.team} copy={localize(teamCopy, locale)} />
      <CtaCard
        title={content.cta.title}
        body={content.cta.body}
        actions={[
          { label: common.requestAccess, href: site.urls.earlyAccess },
          {
            label: common.talkToUs,
            href: mailto('Sales'),
            variant: 'outline',
          },
        ]}
      >
        <NewsletterSignup />
      </CtaCard>
    </div>
  );
}
