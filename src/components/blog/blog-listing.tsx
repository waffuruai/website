import { Rss } from 'lucide-react';

import { CategoryFilter } from '@/components/blog/category-filter';
import { PostCard } from '@/components/blog/post-card';
import { PageHero } from '@/components/sections/page-hero';
import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/dictionaries/en';
import { categoriesOf, type BlogCategory, type Post } from '@/lib/blog';

/**
 * The blog index and the category pages: hero, category filter, RSS link and
 * the post grid. `posts` is every post (as shown in `locale`); `category`
 * narrows the grid and heads the page.
 */
export function BlogListing({
  posts,
  locale,
  blog,
  category,
}: {
  posts: Post[];
  locale: Locale;
  blog: Dictionary['blog'];
  category?: BlogCategory;
}) {
  const shown = category
    ? posts.filter((post) => post.category === category)
    : posts;

  return (
    <>
      <PageHero
        label={category ? blog.heading : undefined}
        title={category ? blog.categories[category] : blog.heading}
        lede={blog.description}
      />
      <section className="mx-auto max-w-site px-site pb-20 md:pb-28">
        <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-4">
          <CategoryFilter
            categories={categoriesOf(posts)}
            active={category}
            allLabel={blog.all}
            names={blog.categories}
            label={blog.heading}
          />
          {/* The feed is English-only at one URL, so a plain link, not localized. */}
          <a
            href="/blog/feed.xml"
            type="application/rss+xml"
            hrefLang="en"
            className="inline-flex items-center gap-2 label-mono text-soft hover:text-foreground"
          >
            <Rss aria-hidden className="size-4" />
            {blog.rss}
          </a>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {shown.map((post, index) => (
            <PostCard
              key={post.slug}
              post={post}
              locale={locale}
              blog={blog}
              // The newest post gets the wide card.
              featured={index === 0}
              priority={index < 3}
            />
          ))}
        </div>
      </section>
    </>
  );
}
