import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { PolicyLink } from '@/components/legal/policy-link';
import { JsonLd } from '@/components/seo/json-ld';
import { legalCopy } from '@/content/legal';
import { site } from '@/content/site';
import { locales } from '@/i18n/config';
import { resolveLocale } from '@/i18n/server';
import { breadcrumbs, webPage } from '@/lib/json-ld';
import { getAllPolicies, loadPolicy, loadPolicyHeadings } from '@/lib/legal';
import { createMetadata } from '@/lib/seo';

type Params = Promise<{ locale: string; slug: string }>;

// Only published policies exist, in every locale: the footer links to
// /<locale>/legal/<slug> everywhere, and each of those renders the English
// text. Anything else is a 404 (no fallback rendering at request time).
export const dynamicParams = false;

export async function generateStaticParams() {
  const policies = await getAllPolicies();
  return locales.flatMap((locale) =>
    policies.map(({ slug }) => ({ locale, slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const [{ slug }, locale] = await Promise.all([params, resolveLocale(params)]);
  const loaded = await loadPolicy(slug);
  if (!loaded) return {};
  const { policy } = loaded;
  return createMetadata({
    title: policy.title,
    description: policy.description,
    keywords: policy.keywords,
    path: `/legal/${slug}`,
    locale,
    // English-only: canonical and x-default are the English URL, and no
    // hreflang alternates are advertised.
    localized: false,
  });
}

export default async function PolicyPage({ params }: { params: Params }) {
  const { slug } = await params;
  const loaded = await loadPolicy(slug);
  if (!loaded) notFound();
  const { policy, default: Content } = loaded;
  const headings = await loadPolicyHeadings(slug);
  const path = `/legal/${slug}`;

  return (
    <>
      <Content headings={headings} components={{ a: PolicyLink }} />
      <JsonLd
        data={[
          webPage({
            name: policy.title,
            description: policy.description,
            path,
          }),
          breadcrumbs([
            { name: site.name, path: '/' },
            { name: legalCopy.breadcrumb, path: '/legal' },
            { name: policy.title, path },
          ]),
        ]}
      />
    </>
  );
}
