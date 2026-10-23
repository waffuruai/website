import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { BlogListing } from '@/components/blog/blog-listing';
import { JsonLd } from '@/components/seo/json-ld';
import { site } from '@/content/site';
import { localizePath, locales } from '@/i18n/config';
import { getDictionary, resolveLocale } from '@/i18n/server';
import {
  categoriesOf,
  categoryFromSlug,
  categoryPath,
  categorySlug,
  getPosts,
} from '@/lib/blog';
import { breadcrumbs, webPage } from '@/lib/json-ld';
import { createMetadata } from '@/lib/seo';

type Params = Promise<{ locale: string; category: string }>;

// Category pages are static routes, one per category that has posts, in
// every locale (no query strings in a static export).
export const dynamicParams = false;

export async function generateStaticParams() {
  const categories = categoriesOf(await getPosts());
  return locales.flatMap((locale) =>
    categories.map((category) => ({
      locale,
      category: categorySlug(category),
    })),
  );
}

async function load(params: Params) {
  const { category: slug } = await params;
  const category = categoryFromSlug(slug);
  if (!category) notFound();
  const locale = await resolveLocale(params);
  const [{ blog }, posts] = await Promise.all([
    getDictionary(locale),
    getPosts(locale),
  ]);
  return { category, locale, blog, posts };
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { category, locale, blog } = await load(params);
  return createMetadata({
    title: `${blog.categories[category]} · ${blog.heading}`,
    description: blog.description,
    path: categoryPath(category),
    locale,
  });
}

export default async function BlogCategoryPage({ params }: { params: Params }) {
  const { category, locale, blog, posts } = await load(params);
  const path = localizePath(categoryPath(category), locale);

  return (
    <>
      <BlogListing
        posts={posts}
        locale={locale}
        blog={blog}
        category={category}
      />
      <JsonLd
        data={[
          webPage({
            name: `${blog.categories[category]} · ${blog.heading}`,
            description: blog.description,
            path,
            locale,
          }),
          breadcrumbs([
            { name: site.name, path: localizePath('/', locale) },
            { name: blog.heading, path: localizePath('/blog', locale) },
            { name: blog.categories[category], path },
          ]),
        ]}
      />
    </>
  );
}
