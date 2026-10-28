import { existsSync } from 'node:fs';
import { mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';

import { afterEach, describe, expect, it, vi } from 'vitest';

import {
  BLOG_CATEGORIES,
  categoriesOf,
  categoryFromSlug,
  categoryPath,
  categorySlug,
  formatPostDate,
  getPost,
  getPostParams,
  getPosts,
  getRelatedPosts,
  listPostFiles,
  pickRelated,
  postLink,
  showDrafts,
  sortPosts,
  visiblePosts,
  type Post,
} from '@/lib/blog';
import { defaultLocale, locales, type Locale } from '@/i18n/config';

// Posts import the layout; the listing tests only need their exports.
vi.mock('@/components/blog/article-layout', () => ({
  ArticleLayout: () => null,
}));

afterEach(() => vi.unstubAllEnvs());

const post = (overrides: Partial<Post> & { slug: string }): Post => ({
  title: overrides.slug,
  description: 'A description that is long enough.',
  author: 'eric-kryski',
  date: '2026-01-01',
  published: true,
  category: 'Company',
  locale: 'en',
  locales: ['en'],
  readingTime: { words: 400, minutes: 2 },
  ...overrides,
});

describe('visibility', () => {
  const posts = [
    post({ slug: 'live' }),
    post({ slug: 'draft', published: false }),
  ];

  it('shows drafts only outside production', () => {
    vi.stubEnv('NODE_ENV', 'development');
    expect(showDrafts()).toBe(true);
    vi.stubEnv('NODE_ENV', 'production');
    expect(showDrafts()).toBe(false);
  });

  it('keeps only published posts when drafts are off', () => {
    expect(visiblePosts(posts, false).map((p) => p.slug)).toEqual(['live']);
    expect(visiblePosts(posts, true).map((p) => p.slug)).toEqual([
      'live',
      'draft',
    ]);
  });
});

describe('sortPosts', () => {
  it('orders newest first and breaks ties by slug', () => {
    const sorted = sortPosts([
      post({ slug: 'b', date: '2026-02-01' }),
      post({ slug: 'old', date: '2025-12-31' }),
      post({ slug: 'a', date: '2026-02-01' }),
      post({ slug: 'new', date: '2026-03-01' }),
    ]);
    expect(sorted.map((p) => p.slug)).toEqual(['new', 'a', 'b', 'old']);
  });

  it('does not mutate its input', () => {
    const input = [
      post({ slug: 'a', date: '2026-01-01' }),
      post({ slug: 'b', date: '2026-02-01' }),
    ];
    sortPosts(input);
    expect(input.map((p) => p.slug)).toEqual(['a', 'b']);
  });
});

describe('pickRelated', () => {
  const current = post({
    slug: 'current',
    category: 'Engineering',
    tags: ['rust', 'metal'],
  });

  it('never suggests the post itself', () => {
    expect(pickRelated([current], current)).toEqual([]);
  });

  it('weights shared tags (2 each) over a shared category (3)', () => {
    const sameCategory = post({
      slug: 'same-category',
      category: 'Engineering',
    });
    const twoTags = post({
      slug: 'two-tags',
      category: 'Research',
      tags: ['rust', 'metal'],
    });
    const oneTag = post({
      slug: 'one-tag',
      category: 'Research',
      tags: ['rust'],
    });
    const unrelated = post({ slug: 'unrelated', category: 'Research' });

    const picked = pickRelated(
      [unrelated, oneTag, sameCategory, twoTags],
      current,
    ).map((p) => p.slug);
    // two tags = 4, category = 3, one tag = 2, nothing = 0
    expect(picked).toEqual(['two-tags', 'same-category', 'one-tag']);
  });

  it('falls back to recency (input order) on equal scores, and honours the limit', () => {
    const posts = ['n1', 'n2', 'n3', 'n4'].map((slug) =>
      post({ slug, category: 'Research' }),
    );
    expect(pickRelated(posts, current, 2).map((p) => p.slug)).toEqual([
      'n1',
      'n2',
    ]);
  });
});

describe('categories', () => {
  it('lists only categories that have posts, in the configured order', () => {
    const posts = [
      post({ slug: 'a', category: 'Research' }),
      post({ slug: 'b', category: 'Company' }),
      post({ slug: 'c', category: 'Research' }),
    ];
    expect(categoriesOf(posts)).toEqual(['Company', 'Research']);
    expect(categoriesOf([])).toEqual([]);
  });

  it('round-trips between names and URL segments', () => {
    for (const category of BLOG_CATEGORIES) {
      expect(categoryFromSlug(categorySlug(category))).toBe(category);
    }
    expect(categorySlug('Company')).toBe('company');
    expect(categoryPath('Engineering')).toBe('/blog/category/engineering');
    expect(categoryFromSlug('nope')).toBeUndefined();
  });
});

describe('postLink', () => {
  const translated = {
    slug: 'hello',
    locales: ['en', 'ja'] as Post['locales'],
  };

  it('links to the localized page when the locale has a translation', () => {
    expect(postLink(translated, 'ja')).toEqual({
      href: '/ja/blog/hello',
      translated: true,
    });
    expect(postLink(translated, 'en')).toEqual({
      href: '/blog/hello',
      translated: true,
    });
  });

  it('falls back to the English URL when it has none', () => {
    expect(postLink(translated, 'fr')).toEqual({
      href: '/blog/hello',
      translated: false,
    });
  });
});

describe('formatPostDate', () => {
  it('formats in the visitor language without shifting the day', () => {
    expect(formatPostDate('2026-10-26', 'en')).toBe('October 26, 2026');
    expect(formatPostDate('2026-10-26', 'fr')).toBe('26 octobre 2026');
    expect(formatPostDate('2026-01-01', 'en')).toBe('January 1, 2026');
  });
});

describe('listPostFiles', () => {
  let dir: string | undefined;
  afterEach(async () => {
    if (dir) await rm(dir, { recursive: true, force: true });
    dir = undefined;
  });

  async function fixture(files: string[]) {
    dir = await mkdtemp(path.join(tmpdir(), 'blog-'));
    for (const file of files) {
      await mkdir(path.dirname(path.join(dir, file)), { recursive: true });
      await writeFile(path.join(dir, file), '');
    }
    return dir;
  }

  it('finds each post and the locales that have a file, English first', async () => {
    const root = await fixture([
      'hello/page.mdx',
      'hello/page.ja.mdx',
      'hello/page.es.mdx',
      'solo/page.mdx',
    ]);
    const files = await listPostFiles(root);
    expect([...files.keys()].sort()).toEqual(['hello', 'solo']);
    expect(files.get('hello')?.[0]).toBe('en');
    expect([...(files.get('hello') ?? [])].sort()).toEqual(['en', 'es', 'ja']);
    expect(files.get('solo')).toEqual(['en']);
  });

  it('ignores folders without an English page, unknown locales and other files', async () => {
    const root = await fixture([
      'only-ja/page.ja.mdx',
      'odd/page.mdx',
      'odd/page.xx.mdx',
      'odd/page.en.mdx',
      'odd/notes.mdx',
      'odd/cover.jpg',
    ]);
    const files = await listPostFiles(root);
    expect([...files.keys()]).toEqual(['odd']);
    expect(files.get('odd')).toEqual(['en']);
  });
});

describe('posts on disk', () => {
  // The launch post is translated one `page.<locale>.mdx` at a time.
  const LAUNCH_DIRECTORY = 'src/content/blog/introducing-waffuru';
  const translated = locales.filter(
    (locale) =>
      locale !== defaultLocale &&
      existsSync(`${LAUNCH_DIRECTORY}/page.${locale}.mdx`),
  );
  const sorted = (list: readonly Locale[]) => [...list].sort();

  it('has the launch post, published, in English and every translation on disk', async () => {
    const launch = await getPost('introducing-waffuru');
    expect(launch).toMatchObject({
      slug: 'introducing-waffuru',
      author: 'eric-kryski',
      date: '2026-10-28',
      category: 'Company',
      published: true,
      locale: 'en',
    });
    expect(launch?.locales[0]).toBe('en');
    expect(sorted(launch?.locales ?? [])).toEqual(
      sorted(['en', ...translated]),
    );
  });

  it('serves each locale its translation, or the English post when it has none', async () => {
    for (const locale of locales) {
      const posts = await getPosts(locale);
      const launch = posts.find((p) => p.slug === 'introducing-waffuru');
      expect(launch?.locale, locale).toBe(
        translated.includes(locale) ? locale : 'en',
      );
      expect(sorted(launch?.locales ?? []), locale).toEqual(
        sorted(['en', ...translated]),
      );
    }
  });

  it('lists posts newest first', async () => {
    const dates = (await getPosts()).map((p) => p.date);
    expect(dates).toEqual([...dates].sort().reverse());
  });

  it('generates a page per real (locale, slug) pair only', async () => {
    const params = await getPostParams();
    expect(params).toContainEqual({
      locale: 'en',
      slug: 'introducing-waffuru',
    });
    expect(
      params
        .filter((p) => p.locale !== 'en')
        .map((p) => p.locale)
        .sort(),
    ).toEqual(sorted(translated));
  });

  it('relates real posts to each other, never to themselves', async () => {
    const related = await getRelatedPosts('introducing-pantry');
    expect(related.map((post) => post.slug)).toContain('introducing-waffuru');
    expect(related.map((post) => post.slug)).not.toContain(
      'introducing-pantry',
    );
    expect(await getRelatedPosts('missing')).toEqual([]);
  });
});
