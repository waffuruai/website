import { PostCard } from '@/components/blog/post-card';
import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/dictionaries/en';
import type { Post } from '@/lib/blog';

/** "Keep reading": up to three related posts. */
export function RelatedPosts({
  posts,
  locale,
  blog,
}: {
  posts: Post[];
  locale: Locale;
  blog: Dictionary['blog'];
}) {
  if (!posts.length) return null;

  return (
    <section
      aria-labelledby="related-posts"
      data-section="related-posts"
      className="border-foreground/10 mt-20 border-t pt-14"
    >
      <h2
        id="related-posts"
        className="heading-section text-[clamp(36px,4.5vw,56px)]"
      >
        {blog.related}
      </h2>
      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard
            key={post.slug}
            post={post}
            locale={locale}
            blog={blog}
            headingAs="h3"
          />
        ))}
      </div>
    </section>
  );
}
