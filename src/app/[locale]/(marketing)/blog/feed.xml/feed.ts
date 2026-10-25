import { absoluteUrl } from '@/lib/seo';

/** What the feed needs of a post (English posts only). */
export type FeedPost = {
  slug: string;
  title: string;
  description: string;
  /** Author's display name. */
  author: string;
  category: string;
  /** ISO date, `YYYY-MM-DD`. */
  date: string;
};

/** Control characters XML 1.0 forbids, even escaped. */
const INVALID_XML = /[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g;

/** Escapes text for use inside an element or attribute. */
export const escapeXml = (value: string) =>
  value
    .replace(INVALID_XML, '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

/** RFC 822 date at midnight UTC, as RSS wants it. */
const pubDate = (date: string) => new Date(`${date}T00:00:00Z`).toUTCString();

/**
 * RSS 2.0 feed of the given posts (newest first). Everything that comes from
 * content is escaped; the build date is the newest post's, so the same
 * content always produces the same file.
 */
export function buildFeed({
  title,
  description,
  posts,
}: {
  title: string;
  description: string;
  posts: FeedPost[];
}) {
  const home = absoluteUrl('/blog');
  const self = absoluteUrl('/blog/feed.xml');
  const items = posts.map((post) => {
    const url = absoluteUrl(`/blog/${post.slug}`);
    return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${escapeXml(url)}</link>
      <guid isPermaLink="true">${escapeXml(url)}</guid>
      <description>${escapeXml(post.description)}</description>
      <category>${escapeXml(post.category)}</category>
      <dc:creator>${escapeXml(post.author)}</dc:creator>
      <pubDate>${pubDate(post.date)}</pubDate>
    </item>`;
  });
  const latest = posts[0]
    ? `\n    <lastBuildDate>${pubDate(posts[0].date)}</lastBuildDate>`
    : '';

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${escapeXml(title)}</title>
    <link>${escapeXml(home)}</link>
    <description>${escapeXml(description)}</description>
    <language>en</language>${latest}
    <atom:link href="${escapeXml(self)}" rel="self" type="application/rss+xml" />
${items.join('\n')}
  </channel>
</rss>
`;
}
