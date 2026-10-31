import { readFile } from 'node:fs/promises';
import path from 'node:path';

import type { Metadata } from 'next';

import { PolicyLink } from '@/components/legal/policy-link';
import { JsonLd } from '@/components/seo/json-ld';
import { site } from '@/content/site';
import { resolveLocale, type LocaleParams } from '@/i18n/server';
import { extractHeadings } from '@/lib/headings';
import { breadcrumbs, webPage } from '@/lib/json-ld';
import type { PolicyModule } from '@/lib/legal';
import { createMetadata } from '@/lib/seo';

const PATH = '/security';

/** The policy's MDX, relative to the project root (for its headings). */
const SOURCE = 'src/content/security/page.mdx';

/*
 * The vulnerability disclosure policy: English-only policy text like the
 * legal pages, served in every locale under the English canonical URL, and
 * linked from security.txt, the support page and the footer.
 */
const loadPolicy = () =>
  import('@/content/security/page.mdx') as Promise<PolicyModule>;

export async function generateMetadata({
  params,
}: {
  params: LocaleParams;
}): Promise<Metadata> {
  const [{ policy }, locale] = await Promise.all([
    loadPolicy(),
    resolveLocale(params),
  ]);
  return createMetadata({
    title: policy.title,
    description: policy.description,
    keywords: policy.keywords,
    path: PATH,
    locale,
    localized: false,
  });
}

export default async function SecurityPolicyPage() {
  const { policy, default: Content } = await loadPolicy();
  const headings = extractHeadings(
    await readFile(path.join(process.cwd(), SOURCE), 'utf8'),
  );

  return (
    <>
      <Content headings={headings} components={{ a: PolicyLink }} />
      <JsonLd
        data={[
          webPage({
            name: policy.title,
            description: policy.description,
            path: PATH,
          }),
          breadcrumbs([
            { name: site.name, path: '/' },
            { name: policy.title, path: PATH },
          ]),
        ]}
      />
    </>
  );
}
