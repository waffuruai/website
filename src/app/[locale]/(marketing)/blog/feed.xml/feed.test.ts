import { describe, expect, it } from 'vitest';

import { buildFeed, escapeXml, type FeedPost } from './feed';

const base: FeedPost = {
  slug: 'introducing-waffuru',
  title: 'Introducing Waffuru',
  description: 'Why we started.',
  author: 'Eric Kryski',
  category: 'Company',
  date: '2026-10-26',
};

const parse = (xml: string) =>
  new DOMParser().parseFromString(xml, 'application/xml');

describe('escapeXml', () => {
  it('escapes the five XML specials', () => {
    expect(escapeXml(`Tom & Jerry <b>"hi"</b> it's`)).toBe(
      'Tom &amp; Jerry &lt;b&gt;&quot;hi&quot;&lt;/b&gt; it&apos;s',
    );
  });

  it('escapes the ampersand first, so entities are not double-escaped wrongly', () => {
    expect(escapeXml('&lt;')).toBe('&amp;lt;');
  });

  it('drops characters XML 1.0 cannot carry', () => {
    expect(escapeXml('a\u0000b\u0008c\u000Bd\u001Fe')).toBe('abcde');
    // Tabs, newlines and carriage returns are allowed.
    expect(escapeXml('a\tb\nc\rd')).toBe('a\tb\nc\rd');
  });
});

describe('buildFeed', () => {
  const feed = buildFeed({
    title: 'Waffuru Blog',
    description: 'News & notes',
    posts: [base],
  });

  it('is an RSS 2.0 feed with absolute links and a self link', () => {
    const doc = parse(feed);
    expect(doc.querySelector('parsererror')).toBeNull();
    expect(doc.documentElement.getAttribute('version')).toBe('2.0');
    expect(doc.querySelector('channel > link')?.textContent).toBe(
      'https://waffuru.ai/blog',
    );
    expect(doc.querySelector('channel > language')?.textContent).toBe('en');
    expect(feed).toContain(
      'href="https://waffuru.ai/blog/feed.xml" rel="self"',
    );

    const item = doc.querySelector('item');
    expect(item?.querySelector('link')?.textContent).toBe(
      'https://waffuru.ai/blog/introducing-waffuru',
    );
    expect(item?.querySelector('guid')?.textContent).toBe(
      'https://waffuru.ai/blog/introducing-waffuru',
    );
    expect(item?.querySelector('category')?.textContent).toBe('Company');
    expect(item?.querySelector('pubDate')?.textContent).toBe(
      'Mon, 26 Oct 2026 00:00:00 GMT',
    );
  });

  it('escapes post content and still parses as XML', () => {
    const hostile = buildFeed({
      title: 'Blog & <Friends>',
      description: '"Quoted" & \'apostrophes\'',
      posts: [
        {
          ...base,
          title: 'R&D <script>alert("x")</script> ]]> done',
          description: 'Fish & chips < 5 > 3',
          author: 'A "B" & C',
          category: 'Research',
        },
      ],
    });
    // Nothing from the content may open a tag.
    expect(hostile).not.toContain('<script>');
    expect(hostile).not.toContain(']]>');
    expect(hostile).toContain(
      '<title>R&amp;D &lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt; ]]&gt; done</title>',
    );

    const doc = parse(hostile);
    expect(doc.querySelector('parsererror')).toBeNull();
    // ...and the text survives a round trip.
    expect(doc.querySelector('item > title')?.textContent).toBe(
      'R&D <script>alert("x")</script> ]]> done',
    );
    expect(doc.querySelector('item > description')?.textContent).toBe(
      'Fish & chips < 5 > 3',
    );
    expect(doc.querySelector('channel > title')?.textContent).toBe(
      'Blog & <Friends>',
    );
  });

  it('keeps the posts in the order given and dates the feed by the newest', () => {
    const xml = buildFeed({
      title: 'Blog',
      description: 'd',
      posts: [
        { ...base, slug: 'new', date: '2026-11-02' },
        { ...base, slug: 'old', date: '2026-10-26' },
      ],
    });
    const doc = parse(xml);
    expect(
      [...doc.querySelectorAll('item > link')].map((n) => n.textContent),
    ).toEqual(['https://waffuru.ai/blog/new', 'https://waffuru.ai/blog/old']);
    expect(doc.querySelector('lastBuildDate')?.textContent).toBe(
      'Mon, 02 Nov 2026 00:00:00 GMT',
    );
    // Deterministic: same content, same file.
    expect(xml).toBe(
      buildFeed({
        title: 'Blog',
        description: 'd',
        posts: [
          { ...base, slug: 'new', date: '2026-11-02' },
          { ...base, slug: 'old', date: '2026-10-26' },
        ],
      }),
    );
  });

  it('still produces a valid feed with no posts', () => {
    const doc = parse(
      buildFeed({ title: 'Blog', description: 'd', posts: [] }),
    );
    expect(doc.querySelector('parsererror')).toBeNull();
    expect(doc.querySelectorAll('item')).toHaveLength(0);
    expect(doc.querySelector('lastBuildDate')).toBeNull();
  });
});
