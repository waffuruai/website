import Link from 'next/link';

import { AuthorByline } from '@/components/blog/author-byline';
import { PostCover } from '@/components/blog/cover';
import { interpolate, type Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/dictionaries/en';
import { formatPostDate, postLink, showDrafts, type Post } from '@/lib/blog';
import { cn } from '@/lib/utils';

/**
 * A post on the blog index: category, date and reading time, serif title,
 * excerpt, author. The whole card is one link. When the post has no page in
 * the visitor's language it links to the English page and says so.
 */
export function PostCard({
  post,
  locale,
  blog,
  featured = false,
  priority = false,
  headingAs: Heading = 'h2',
}: {
  post: Post;
  /** The language of the page showing the card. */
  locale: Locale;
  blog: Dictionary['blog'];
  /** Full-width card for the newest post. */
  featured?: boolean;
  priority?: boolean;
  /** Heading level of the title, to fit the page's outline. */
  headingAs?: 'h2' | 'h3';
}) {
  const { href, translated } = postLink(post, locale);
  // Untranslated posts keep their English text inside a localized page.
  const textLang = translated ? undefined : post.locale;

  return (
    <article
      data-post={post.slug}
      className={cn(
        'group border-foreground/10 bg-card hover:border-foreground/30 relative flex flex-col gap-6 rounded-3xl border p-6 transition-colors md:p-8',
        featured && 'lg:col-span-3 lg:p-12',
      )}
    >
      {post.image && (
        <PostCover
          name={post.image}
          sizes={
            featured
              ? '(min-width: 1360px) 1240px, 100vw'
              : '(min-width: 1024px) 400px, (min-width: 720px) 50vw, 100vw'
          }
          priority={priority}
        />
      )}
      <div className="label-mono text-soft flex flex-wrap items-center gap-x-5 gap-y-1">
        <span className="text-brand-ink">{post.category}</span>
        <time dateTime={post.date}>{formatPostDate(post.date, locale)}</time>
        <span>
          {interpolate(blog.readingTime, { minutes: post.readingTime.minutes })}
        </span>
        {!post.published && showDrafts() && (
          <span className="border-brand-ink/50 text-brand-ink rounded-full border px-2 py-0.5">
            Draft
          </span>
        )}
      </div>
      <div className="flex flex-col gap-4" lang={textLang}>
        <Heading
          className={cn(
            'font-serif leading-[1.05] tracking-[-0.02em] text-balance',
            featured
              ? 'max-w-[900px] text-[clamp(36px,4.5vw,64px)]'
              : 'text-[clamp(28px,3vw,38px)]',
          )}
        >
          <Link
            href={href}
            hrefLang={post.locale}
            className="focus-visible:ring-ring rounded-sm outline-none after:absolute after:inset-0 after:rounded-3xl focus-visible:ring-2"
          >
            {post.title}
          </Link>
        </Heading>
        <p
          className={cn(
            'text-soft leading-[1.6] text-pretty',
            featured ? 'max-w-[720px] text-lg' : 'line-clamp-4 text-base',
          )}
        >
          {post.description}
        </p>
      </div>
      {!translated && (
        <p className="label-mono text-muted-foreground">{blog.englishOnly}</p>
      )}
      <AuthorByline
        author={post.author}
        locale={locale}
        blog={blog}
        size="sm"
        className="mt-auto"
      />
    </article>
  );
}
