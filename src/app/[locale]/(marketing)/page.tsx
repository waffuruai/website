import type { Metadata } from 'next';

import { Audiences } from '@/components/home/audiences';
import { Beliefs } from '@/components/home/beliefs';
import { FilmGrain } from '@/components/home/film-grain';
import { Hero } from '@/components/home/hero';
import { PantryTeaser } from '@/components/home/pantry-teaser';
import { StackSection } from '@/components/home/stack-section';
import { TeamTeaser } from '@/components/home/team-teaser';
import { NewsletterSignup } from '@/components/newsletter/newsletter-signup';
import { JsonLd } from '@/components/seo/json-ld';
import { CtaCard } from '@/components/sections/cta-card';
import { home } from '@/content/pages/home';
import { pantryFacts } from '@/content/pages/pantry/facts';
import { site } from '@/content/site';
import { teamCopy } from '@/content/team';
import { localeInfo, localizePath } from '@/i18n/config';
import { getDictionary, resolveLocale, type LocaleParams } from '@/i18n/server';
import { localize } from '@/lib/content';
import { webPage } from '@/lib/json-ld';
import { isPublished } from '@/lib/launch';
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
 * Home: who we are and what you get, for every audience, kept simple. The
 * hero says the value in one line; Pantry, the product you can use today,
 * comes next; then the stack as the path a request takes, who it is for, why
 * we build it, the team and the closing card. The detail and the measured
 * research live on the product pages, so people dig in from here.
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
      {isPublished('pantry') && <PantryTeaser content={content.pantry} />}
      <StackSection content={content.stack} />
      <Audiences content={content.audiences} />
      <Beliefs content={content.beliefs} />
      <TeamTeaser content={content.team} copy={localize(teamCopy, locale)} />
      <CtaCard
        title={content.cta.title}
        body={content.cta.body}
        actions={[
          ...(isPublished('pantry')
            ? [
                {
                  label: content.pantry.primary,
                  href: `${pantryFacts.path}#install`,
                },
              ]
            : []),
          {
            label: common.requestAccess,
            href: site.urls.earlyAccess,
            variant: 'outline' as const,
          },
        ]}
      >
        <NewsletterSignup />
      </CtaCard>
    </div>
  );
}
