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
        className="mx-auto max-w-site px-site pb-16 md:pb-24"
      >
        <ul className="border-t border-foreground/12">
          {policies.map((policy) => (
            <li key={policy.slug} className="border-b border-foreground/12">
              <LocalizedLink
                href={`/legal/${policy.slug}`}
                className="group grid gap-x-12 gap-y-3 py-8 text-foreground hover:text-foreground md:grid-cols-[1fr_1.4fr_auto] md:items-baseline md:py-10"
              >
                <span className="font-serif text-4xl leading-none tracking-[-0.01em] md:text-5xl">
                  {policy.title}
                </span>
                <span className="max-w-[560px] text-base leading-[1.6] text-soft">
                  {policy.description}
                  <span className="mt-3 block label-mono text-muted-foreground">
                    {legalCopy.lastUpdated}{' '}
                    <time dateTime={policy.date}>
                      {formatPolicyDate(policy.date)}
                    </time>
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className="hidden text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-foreground md:block"
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
