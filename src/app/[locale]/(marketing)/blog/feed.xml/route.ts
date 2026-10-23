import { site } from '@/content/site';
import { getMember } from '@/content/team';
import en from '@/i18n/dictionaries/en';
import { getPosts } from '@/lib/blog';

import { buildFeed } from './feed';

export const dynamic = 'force-static';

// One feed, English posts, at /blog/feed.xml (the Worker serves out/en/…).
export const dynamicParams = false;

export function generateStaticParams() {
  return [{ locale: 'en' }];
}

/** RSS 2.0 feed of the published English posts. */
export async function GET() {
  const posts = (await getPosts('en')).filter((post) => post.published);
  const xml = buildFeed({
    title: `${site.name} ${en.blog.heading}`,
    description: en.blog.description,
    posts: posts.map((post) => ({
      slug: post.slug,
      title: post.title,
      description: post.description,
      author: getMember(post.author)?.name ?? site.name,
      category: post.category,
      date: post.date,
    })),
  });

  return new Response(xml, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  });
}
