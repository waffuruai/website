import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { coverSrc } from '@/components/blog/cover';
import { site } from '@/content/site';
import { resolveLocale } from '@/i18n/server';
import { getPost, getPostParams, importPostModule, postPath } from '@/lib/blog';
import { createMetadata } from '@/lib/seo';

type Params = Promise<{ locale: string; slug: string }>;

// A locale gets a page for a post only where that locale's file exists
// (`page.mdx` is English, `page.<locale>.mdx` a translation). Drafts are
// generated outside production only.
export const dynamicParams = false;
export const generateStaticParams = getPostParams;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const [{ slug }, locale] = await Promise.all([params, resolveLocale(params)]);
  const post = await getPost(slug, locale);
  if (!post) notFound();
  const metadata = createMetadata({
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    image: post.image ? { src: coverSrc(post.image) } : undefined,
    path: postPath(slug),
    locale,
    // hreflang lists only the translations that really exist.
    availableLocales: post.locales,
    type: 'article',
    noindex: !post.published,
  });
  // The root template appends " · Waffuru"; skip it when the title says so.
  return post.title.includes(site.name)
    ? { ...metadata, title: { absolute: post.title } }
    : metadata;
}

/** Blog post: the MDX default export renders inside `ArticleLayout`. */
export default async function BlogPostPage({ params }: { params: Params }) {
  const [{ slug }, locale] = await Promise.all([params, resolveLocale(params)]);
  const { default: Content } = await importPostModule(slug, locale);
  return <Content locale={locale} />;
}
