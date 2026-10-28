import type { Metadata } from 'next';

import { HiringCallout } from '@/components/about/hiring-callout';
import { TeamTeaser } from '@/components/about/team-teaser';
import { ThesesList } from '@/components/about/theses-list';
import { ValuesGrid } from '@/components/about/values-grid';
import { WhyWeBuild } from '@/components/about/why-we-build';
import { JsonLd } from '@/components/seo/json-ld';
import { CtaCard } from '@/components/sections/cta-card';
import { PageHero } from '@/components/sections/page-hero';
import { about } from '@/content/pages/about';
import { mailto, site } from '@/content/site';
import { localizePath } from '@/i18n/config';
import { getDictionary, resolveLocale, type LocaleParams } from '@/i18n/server';
import { localize } from '@/lib/content';
import { aboutPage, breadcrumbs } from '@/lib/json-ld';
import { createMetadata } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: LocaleParams;
}): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const { seo } = localize(about, locale);
  return createMetadata({
    title: seo.title,
    description: seo.description,
    path: '/about',
    locale,
    keywords: seo.keywords,
  });
}

/** About: the mission, why we build, what we believe and value, the team, hiring. */
export default async function AboutPage({ params }: { params: LocaleParams }) {
  const locale = await resolveLocale(params);
  const dictionary = await getDictionary(locale);
  const content = localize(about, locale);
  const path = localizePath('/about', locale);

  return (
    <>
      <PageHero
        label={content.hero.label}
        title={content.hero.title}
        lede={content.hero.lede}
        actions={content.hero.actions}
      >
        <p className="wf-rise flex max-w-[640px] items-baseline gap-3 text-[15px] leading-[1.6] text-pretty text-muted-foreground">
          <span
            lang="ja"
            className="shrink-0 font-serif text-lg text-brand-ink"
          >
            ワッフル
          </span>
          {content.hero.name}
        </p>
      </PageHero>
      <WhyWeBuild content={content.why} />
      <ThesesList content={content.beliefs} />
      <ValuesGrid content={content.values} />
      <TeamTeaser content={content.teamTeaser} />
      <HiringCallout content={content.hiring} />
      <CtaCard
        title={content.cta.title}
        body={content.cta.body}
        actions={[
          {
            label: dictionary.common.requestAccess,
            href: site.urls.earlyAccess,
          },
          {
            label: dictionary.common.talkToUs,
            href: mailto('Sales'),
            variant: 'outline',
          },
        ]}
      />
      <JsonLd
        data={[
          aboutPage({
            name: content.seo.title,
            description: content.seo.description,
            path,
          }),
          breadcrumbs([
            { name: site.name, path: localizePath('/', locale) },
            { name: dictionary.nav.items.about.label, path },
          ]),
        ]}
      />
    </>
  );
}
