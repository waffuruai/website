import { ArrowLeft } from 'lucide-react';
import { notFound } from 'next/navigation';

import { AuthorByline, getAuthor } from '@/components/blog/author-byline';
import { PostCover, coverSrc } from '@/components/blog/cover';
import { Prose } from '@/components/blog/prose';
import { RelatedPosts } from '@/components/blog/related-posts';
import { ShareLinks } from '@/components/blog/share-links';
import { TableOfContents, hasToc } from '@/components/blog/table-of-contents';
import { LocalizedLink } from '@/components/localized-link';
import { JsonLd } from '@/components/seo/json-ld';
import { site } from '@/content/site';
import { defaultLocale, localizePath, type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/server';
import {
  categoryPath,
  getRelatedPosts,
  importPostModule,
  postPath,
  showDrafts,
  type Article,
} from '@/lib/blog';
import { article as articleJsonLd, breadcrumbs } from '@/lib/json-ld';
import { absoluteUrl } from '@/lib/seo';
import { cn } from '@/lib/utils';

/**
 * Layout for blog posts: the default export of each post's MDX wraps its
 * content in this. `locale` arrives from the page route through the MDX
 * component's props. Drafts 404 in production and carry a label in
 * development. Reading time and the table of contents come from the post
 * module itself (exported by the MDX plugins), so nothing re-reads source.
 */
export async function ArticleLayout({
  article,
  slug,
  locale = defaultLocale,
  children,
}: {
  article: Article;
  slug: string;
  locale?: Locale;
  children: React.ReactNode;
}) {
  if (!article.published && !showDrafts()) notFound();

  const [dictionary, post, related] = await Promise.all([
    getDictionary(locale),
    importPostModule(slug, locale),
    getRelatedPosts(slug, locale),
  ]);
  const { blog } = dictionary;
  const { member } = getAuthor(article.author, locale);
  const toc = hasToc(post.toc);
  const path = localizePath(postPath(slug), locale);

  return (
    <div className="mx-auto max-w-site px-site pt-10 pb-20 md:pt-16 md:pb-28">
      <article
        data-section="article"
        className={cn('mx-auto', toc ? 'max-w-[1040px]' : 'max-w-[720px]')}
      >
        <LocalizedLink
          href="/blog"
          className="inline-flex items-center gap-2 rounded-sm label-mono text-soft outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
        >
          <ArrowLeft aria-hidden className="size-4" />
          {blog.backToBlog}
        </LocalizedLink>

        <header className="mt-10 flex max-w-[720px] flex-col gap-6">
          <div className="flex flex-wrap items-center gap-3 label-mono">
            <LocalizedLink
              href={categoryPath(article.category)}
              className="text-brand-ink underline-offset-4 hover:underline"
            >
              {blog.categories[article.category]}
            </LocalizedLink>
            {!article.published && (
              <span className="rounded-full border border-brand-ink/50 px-2 py-0.5 text-brand-ink">
                Draft
              </span>
            )}
          </div>
          <h1 className="font-serif text-[clamp(40px,5.4vw,68px)] leading-[0.98] tracking-[-0.02em] text-balance">
            {article.title}
          </h1>
          <p className="text-xl leading-[1.5] text-pretty text-soft">
            {article.description}
          </p>
          <AuthorByline
            author={article.author}
            locale={locale}
            blog={blog}
            date={article.date}
            readingMinutes={post.readingTime.minutes}
            className="mt-2"
          />
        </header>

        {article.image && (
          <div className="mt-12">
            <PostCover
              name={article.image}
              sizes="(min-width: 1088px) 1040px, 100vw"
              priority
            />
          </div>
        )}

        <div
          className={cn(
            'mt-12',
            toc &&
              'lg:grid lg:grid-cols-[minmax(0,720px)_minmax(0,1fr)] lg:gap-16',
          )}
        >
          <div className="min-w-0">
            <TableOfContents
              headings={post.toc}
              title={blog.onThisPage}
              variant="inline"
              className="mb-10"
            />
            <Prose data-mdx-content="">{children}</Prose>
            <footer className="mt-14 flex flex-wrap items-center justify-between gap-6 border-t border-foreground/10 pt-8">
              <ShareLinks
                title={article.title}
                url={absoluteUrl(path)}
                blog={blog}
              />
              <LocalizedLink
                href="/blog"
                className="inline-flex items-center gap-2 label-mono text-soft hover:text-foreground"
              >
                <ArrowLeft aria-hidden className="size-4" />
                {blog.backToBlog}
              </LocalizedLink>
            </footer>
          </div>
          {toc && (
            <div className="hidden lg:block">
              <TableOfContents
                headings={post.toc}
                title={blog.onThisPage}
                variant="sidebar"
              />
            </div>
          )}
        </div>
      </article>

      <div className="mx-auto max-w-[1040px]">
        <RelatedPosts posts={related} locale={locale} blog={blog} />
      </div>

      <JsonLd
        data={[
          {
            ...articleJsonLd({
              title: article.title,
              description: article.description,
              path,
              date: article.date,
              author: member.name,
              authorUrl: absoluteUrl(localizePath('/about/team', locale)),
              image: article.image ? coverSrc(article.image) : undefined,
              keywords: article.keywords,
            }),
            inLanguage: locale,
          },
          breadcrumbs([
            { name: site.name, path: localizePath('/', locale) },
            { name: blog.heading, path: localizePath('/blog', locale) },
            { name: article.title, path },
          ]),
        ]}
      />
    </div>
  );
}
