import type { Metadata } from 'next';

import { HelpLinks } from '@/components/contact/help-links';
import { JsonLd } from '@/components/seo/json-ld';
import { CtaCard } from '@/components/sections/cta-card';
import { Faq } from '@/components/sections/faq';
import { PageHero } from '@/components/sections/page-hero';
import { support } from '@/content/pages/support';
import { mailto, site } from '@/content/site';
import { localeInfo, localizePath } from '@/i18n/config';
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
  const { seo } = localize(support, locale);
  return createMetadata({
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    path: '/support',
    locale,
  });
}

export default async function SupportPage({
  params,
}: {
  params: LocaleParams;
}) {
  const locale = await resolveLocale(params);
  const { common } = await getDictionary(locale);
  const { seo, hero, links, faq, cta } = localize(support, locale);
  const path = localizePath('/support', locale);

  return (
    <>
      <PageHero label={hero.label} title={hero.title} lede={hero.lede} />
      <HelpLinks {...links} newTabLabel={common.opensInNewTab} />
      <Faq heading={common.faqHeading} items={faq} />
      <CtaCard
        title={cta.title}
        body={cta.body}
        actions={[
          { label: cta.email, href: mailto('Support') },
          { label: cta.docs, href: site.urls.docs, variant: 'outline' },
        ]}
      />
      <JsonLd
        data={[
          webPage({
            name: seo.title ?? hero.label,
            description: seo.description,
            path,
            locale: localeInfo[locale].lang,
          }),
          breadcrumbs([
            { name: site.name, path: localizePath('/', locale) },
            { name: hero.label, path },
          ]),
        ]}
      />
    </>
  );
}
