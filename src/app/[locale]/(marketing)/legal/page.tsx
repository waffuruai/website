import type { Metadata } from 'next';

import { LocalizedLink } from '@/components/localized-link';
import { JsonLd } from '@/components/seo/json-ld';
import { plainText } from '@/components/sections/accent';
import { PageHero } from '@/components/sections/page-hero';
import { legalCopy } from '@/content/legal';
import { site } from '@/content/site';
import { resolveLocale, type LocaleParams } from '@/i18n/server';
import { breadcrumbs, webPage } from '@/lib/json-ld';
import { formatPolicyDate, getAllPolicies } from '@/lib/legal';
import { createMetadata } from '@/lib/seo';

const PATH = '/legal';

// The policies are English-only legal text, but every locale serves this
// page (the footer links to it): canonical and x-default are the English URL.
export async function generateMetadata({
  params,
}: {
  params: LocaleParams;
}): Promise<Metadata> {
  return createMetadata({
    title: legalCopy.label,
    description: legalCopy.description,
    path: PATH,
    locale: await resolveLocale(params),
    localized: false,
  });
}

export default async function LegalIndexPage() {
  const policies = await getAllPolicies();

  return (
    <div lang="en" data-section="legal-index">
      <PageHero
        label={legalCopy.label}
        title={legalCopy.title}
        lede={legalCopy.description}
      />
      <section
        aria-label={legalCopy.label}
        className="max-w-site px-site mx-auto pb-16 md:pb-24"
      >
        <ul className="border-foreground/12 border-t">
          {policies.map((policy) => (
            <li key={policy.slug} className="border-foreground/12 border-b">
              <LocalizedLink
                href={`/legal/${policy.slug}`}
                className="group text-foreground hover:text-foreground grid gap-x-12 gap-y-3 py-8 md:grid-cols-[1fr_1.4fr_auto] md:items-baseline md:py-10"
              >
                <span className="font-serif text-4xl leading-none tracking-[-0.01em] md:text-5xl">
                  {policy.title}
                </span>
                <span className="text-soft max-w-[560px] text-base leading-[1.6]">
                  {policy.description}
                  <span className="label-mono text-muted-foreground mt-3 block">
                    {legalCopy.lastUpdated}{' '}
                    <time dateTime={policy.date}>
                      {formatPolicyDate(policy.date)}
                    </time>
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className="text-muted-foreground group-hover:text-foreground hidden transition-transform group-hover:translate-x-1 md:block"
                >
                  →
                </span>
              </LocalizedLink>
            </li>
          ))}
        </ul>
      </section>
      <JsonLd
        data={[
          webPage({
            name: plainText(legalCopy.title),
            description: legalCopy.description,
            path: PATH,
          }),
          breadcrumbs([
            { name: site.name, path: '/' },
            { name: legalCopy.breadcrumb, path: PATH },
          ]),
        ]}
      />
    </div>
  );
}
