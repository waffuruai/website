import type { Metadata } from 'next';

import { BlogListing } from '@/components/blog/blog-listing';
import { JsonLd } from '@/components/seo/json-ld';
import { site } from '@/content/site';
import { localizePath } from '@/i18n/config';
import { getDictionary, resolveLocale, type LocaleParams } from '@/i18n/server';
import { getPosts } from '@/lib/blog';
import { breadcrumbs, webPage } from '@/lib/json-ld';
import { createMetadata } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: LocaleParams;
}): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const { blog } = await getDictionary(locale);
  return createMetadata({
    title: blog.heading,
    description: blog.description,
    path: '/blog',
    locale,
  });
}

/** Every post in every locale; posts without a translation link to English. */
export default async function BlogIndexPage({
  params,
}: {
  params: LocaleParams;
}) {
  const locale = await resolveLocale(params);
  const [{ blog }, posts] = await Promise.all([
    getDictionary(locale),
    getPosts(locale),
  ]);
  const path = localizePath('/blog', locale);

  return (
    <>
      <BlogListing posts={posts} locale={locale} blog={blog} />
      <JsonLd
        data={[
          webPage({
            name: blog.heading,
            description: blog.description,
            path,
            locale,
          }),
          breadcrumbs([
            { name: site.name, path: localizePath('/', locale) },
            { name: blog.heading, path },
          ]),
        ]}
      />
    </>
  );
}
