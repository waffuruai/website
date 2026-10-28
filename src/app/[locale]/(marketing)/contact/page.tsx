import type { Metadata } from 'next';

import { Callouts } from '@/components/contact/callouts';
import { NewsletterSignup } from '@/components/newsletter/newsletter-signup';
import { JsonLd } from '@/components/seo/json-ld';
import { CtaCard } from '@/components/sections/cta-card';
import { PageHero } from '@/components/sections/page-hero';
import { contact } from '@/content/pages/contact';
import { site } from '@/content/site';
import { localizePath } from '@/i18n/config';
import { getDictionary, resolveLocale, type LocaleParams } from '@/i18n/server';
import { localize } from '@/lib/content';
import { breadcrumbs, contactPage } from '@/lib/json-ld';
import { createMetadata } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: LocaleParams;
}): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const { seo } = localize(contact, locale);
  return createMetadata({
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    path: '/contact',
    locale,
  });
}

/** The lede with our address, wherever it falls, as a gold mailto link. */
function linkEmail(lede: string) {
  const email = site.emails.hello;
  const [before, ...after] = lede.split(email);
  if (after.length === 0) return lede;
  return (
    <>
      {before}
      <a
        href={`mailto:${email}`}
        className="text-brand-ink underline decoration-brand-ink/40 underline-offset-4 transition-colors hover:decoration-brand-ink"
      >
        {email}
      </a>
      {after.join(email)}
    </>
  );
}

export default async function ContactPage({
  params,
}: {
  params: LocaleParams;
}) {
  const locale = await resolveLocale(params);
  const { common } = await getDictionary(locale);
  const { seo, hero, callouts, earlyAccess } = localize(contact, locale);
  const path = localizePath('/contact', locale);

  return (
    <>
      <PageHero
        label={hero.label}
        title={hero.title}
        lede={linkEmail(hero.lede)}
      />
      <Callouts {...callouts} />
      <section className="mx-auto max-w-site px-site pb-16 md:pb-24">
        <div className="border-t border-foreground/12 pt-12 md:pt-16">
          <NewsletterSignup className="max-w-xl" />
        </div>
      </section>
      <CtaCard
        title={earlyAccess.title}
        body={earlyAccess.body}
        actions={[{ label: common.requestAccess, href: site.urls.earlyAccess }]}
      />
      <JsonLd
        data={[
          contactPage({
            name: seo.title ?? hero.label,
            description: seo.description,
            path,
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
