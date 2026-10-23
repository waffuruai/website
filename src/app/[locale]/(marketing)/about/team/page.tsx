import type { Metadata } from 'next';

import { HiringCallout } from '@/components/about/hiring-callout';
import { JsonLd } from '@/components/seo/json-ld';
import { CtaCard } from '@/components/sections/cta-card';
import { PageHero } from '@/components/sections/page-hero';
import { photoPath } from '@/components/team/photo-url';
import { TeamGrid } from '@/components/team/team-grid';
import { about } from '@/content/pages/about';
import { teamPage } from '@/content/pages/team';
import { mailto, site } from '@/content/site';
import { team, teamCopy, visibleLinks } from '@/content/team';
import { localizePath } from '@/i18n/config';
import { getDictionary, resolveLocale, type LocaleParams } from '@/i18n/server';
import { localize } from '@/lib/content';
import { breadcrumbs, person } from '@/lib/json-ld';
import { createMetadata } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: LocaleParams;
}): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const { seo } = localize(teamPage, locale);
  return createMetadata({
    title: seo.title,
    description: seo.description,
    path: '/about/team',
    locale,
    keywords: seo.keywords,
  });
}

/** Team: who is in the kitchen, with a card per person, then hiring. */
export default async function TeamPage({ params }: { params: LocaleParams }) {
  const locale = await resolveLocale(params);
  const dictionary = await getDictionary(locale);
  const content = localize(teamPage, locale);
  const copy = localize(teamCopy, locale);
  const path = localizePath('/about/team', locale);

  const people = team.flatMap((member) => {
    const memberCopy = copy[member.slug];
    if (!memberCopy) return [];
    return [
      person({
        name: member.name,
        jobTitle: memberCopy.role,
        description: memberCopy.bio,
        image: photoPath(member),
        sameAs: visibleLinks(member).map(([, href]) => href),
      }),
    ];
  });

  return (
    <>
      <PageHero
        label={content.hero.label}
        title={content.hero.title}
        lede={content.hero.lede}
        className="pb-12 md:pb-16"
      />
      <div className="max-w-site px-site mx-auto pb-12 md:pb-20">
        <TeamGrid
          locale={locale}
          labels={{
            portraitAlt: content.portraitAlt,
            linkAria: content.linkAria,
            linkNames: content.linkNames,
          }}
        />
      </div>
      <HiringCallout content={localize(about, locale).hiring} />
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
          ...people,
          breadcrumbs([
            { name: site.name, path: localizePath('/', locale) },
            {
              name: dictionary.nav.items.about.label,
              path: localizePath('/about', locale),
            },
            { name: dictionary.nav.items.team.label, path },
          ]),
        ]}
      />
    </>
  );
}
