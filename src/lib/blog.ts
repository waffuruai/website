import { glob } from 'node:fs/promises';

import {
  defaultLocale,
  isLocale,
  localeInfo,
  localizePath,
  type Locale,
} from '@/i18n/config';
import { slugify, type Heading } from '@/lib/headings';

/**
 * The blog is markdown-driven: each post is a folder under `src/content/blog`
 * holding `page.mdx` (English, the source of truth) and optional translated
 * siblings, `page.<locale>.mdx`. A locale only has a page for a post when its
 * file exists; everywhere else the post links to the English URL.
 */
export const BLOG_DIRECTORY = './src/content/blog';

/** Post categories, in the order the filter shows them. */
export const BLOG_CATEGORIES = [
  'Company',
  'Product',
  'Engineering',
  'Research',
] as const;

export type BlogCategory = (typeof BLOG_CATEGORIES)[number];

export const isBlogCategory = (value: unknown): value is BlogCategory =>
  typeof value === 'string' &&
  (BLOG_CATEGORIES as readonly string[]).includes(value);

/** What each post exports as `article`. Translations keep the same shape. */
export interface Article {
  title: string;
  description: string;
  /** Team slug from `src/content/team.ts`, e.g. `eric-kryski`. */
  author: string;
  /** ISO date, `YYYY-MM-DD`. */
  date: string;
  published: boolean;
  /** Always the English category name, in every locale (it is the filter key). */
  category: BlogCategory;
  tags?: string[];
  keywords?: string[];
  /** `<Picture>` manifest key for the cover, e.g. `blog/some-post`. */
  image?: string;
}

/** Exported by the reading-time remark plugin (`src/mdx/`). */
export type ReadingTime = { words: number; minutes: number };

/** What an MDX post module exports. */
export type PostModule = {
  default: React.ComponentType<{ locale?: Locale }>;
  article: Article;
  readingTime: ReadingTime;
  /** The `##` headings, from the TOC rehype plugin. */
  toc: Heading[];
};

/**
 * A post as shown in one locale: its metadata in that locale when translated,
 * otherwise in English.
 */
export type Post = Article & {
  slug: string;
  /** Language the text is in: the requested locale, or English as fallback. */
  locale: Locale;
  /** Every locale the post has a page in (English first). */
  locales: Locale[];
  readingTime: ReadingTime;
};

/**
 * Imports a post's MDX module (content component and exports). One pattern
 * (any `.mdx` directly inside a post folder) that always matches the English
 * files, so the bundler can resolve it before any translation exists.
 */
export function importPostModule(slug: string, locale: Locale = defaultLocale) {
  const file = locale === defaultLocale ? 'page' : `page.${locale}`;
  return import(`@/content/blog/${slug}/${file}.mdx`) as Promise<PostModule>;
}

/** Drafts are visible (and routable) outside production builds only. */
export const showDrafts = () => process.env.NODE_ENV !== 'production';

/* Pure helpers -------------------------------------------------------- */

/** Newest first; same-day posts fall back to slug order so builds are stable. */
export function sortPosts<T extends { date: string; slug: string }>(
  posts: readonly T[],
) {
  return [...posts].sort(
    (a, z) => z.date.localeCompare(a.date) || a.slug.localeCompare(z.slug),
  );
}

/** The posts a visitor may see: everything in development, published only otherwise. */
export const visiblePosts = <T extends { published: boolean }>(
  posts: readonly T[],
  drafts: boolean,
) => posts.filter((post) => drafts || post.published);

/**
 * Picks related posts by shared tags (weighted highest), then shared
 * category, then recency. `posts` should be newest first.
 */
export function pickRelated<T extends Pick<Post, 'slug' | 'tags' | 'category'>>(
  posts: readonly T[],
  current: Pick<Post, 'slug' | 'tags' | 'category'>,
  limit = 3,
) {
  const tags = new Set(current.tags ?? []);
  const score = (post: T) =>
    (post.tags ?? []).filter((tag) => tags.has(tag)).length * 2 +
    (post.category === current.category ? 3 : 0);

  return posts
    .filter((post) => post.slug !== current.slug)
    .map((post, index) => ({ post, index, score: score(post) }))
    .sort((a, z) => z.score - a.score || a.index - z.index)
    .slice(0, limit)
    .map(({ post }) => post);
}

/** Categories that have posts, in `BLOG_CATEGORIES` order. */
export const categoriesOf = (posts: readonly { category: BlogCategory }[]) =>
  BLOG_CATEGORIES.filter((category) =>
    posts.some((post) => post.category === category),
  );

/** URL segment for a category ("Company" → "company"). */
export const categorySlug = (category: BlogCategory) => slugify(category);

export const categoryFromSlug = (value: string) =>
  BLOG_CATEGORIES.find((category) => categorySlug(category) === value);

/** Route path (no locale prefix) of a post, or of a category's posts. */
export const postPath = (slug: string) => `/blog/${slug}`;
export const categoryPath = (category: BlogCategory) =>
  `/blog/category/${categorySlug(category)}`;

/**
 * Where a post links from a page in `locale`: its localized page when that
 * locale has one, otherwise the English page (`translated: false`).
 */
export function postLink(post: Pick<Post, 'slug' | 'locales'>, locale: Locale) {
  const translated = post.locales.includes(locale);
  return {
    href: localizePath(
      postPath(post.slug),
      translated ? locale : defaultLocale,
    ),
    translated,
  };
}

/** `YYYY-MM-DD` as a long date in the visitor's language. */
export function formatPostDate(date: string, locale: Locale = defaultLocale) {
  return new Intl.DateTimeFormat(localeInfo[locale].lang, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${date}T00:00:00Z`));
}

/* Content on disk ------------------------------------------------------ */

type Version = { article: Article; readingTime: ReadingTime };

/** One post folder: every locale version that may be shown. */
type PostSource = {
  slug: string;
  versions: Partial<Record<Locale, Version>>;
};

const POST_FILE = /^([^/\\]+)[/\\]page(?:\.([a-z]{2}))?\.mdx$/;

/** English first, the other locales in the order given. */
const englishFirst = (locales: readonly Locale[]) =>
  [...locales].sort((a, z) => +(z === defaultLocale) - +(a === defaultLocale));

/** Locales with a file for each post slug, English first. */
export async function listPostFiles(
  directory = BLOG_DIRECTORY,
): Promise<Map<string, Locale[]>> {
  const found = new Map<string, Locale[]>();
  for await (const entry of glob('*/page*.mdx', { cwd: directory })) {
    const match = POST_FILE.exec(entry);
    if (!match) continue;
    const [, slug = '', code] = match;
    // `page.mdx` is English; `page.<locale>.mdx` a translation.
    const locale = code ?? defaultLocale;
    if (!isLocale(locale) || (code && locale === defaultLocale)) continue;
    found.set(slug, [...(found.get(slug) ?? []), locale]);
  }
  // English is the source of truth: a folder without it is not a post.
  return new Map(
    [...found]
      .filter(([, locales]) => locales.includes(defaultLocale))
      .map(([slug, locales]) => [slug, englishFirst(locales)]),
  );
}

async function readSources(drafts: boolean): Promise<PostSource[]> {
  const files = await listPostFiles();
  const sources = await Promise.all(
    [...files].map(async ([slug, locales]): Promise<PostSource> => {
      const versions: PostSource['versions'] = {};
      await Promise.all(
        locales.map(async (locale) => {
          const { article, readingTime } = await importPostModule(slug, locale);
          if (drafts || article.published)
            versions[locale] = { article, readingTime };
        }),
      );
      return { slug, versions };
    }),
  );
  // A post exists only while its English version is visible.
  return sources.filter((source) => source.versions[defaultLocale]);
}

let cached: Promise<PostSource[]> | undefined;

/** Reads once per production build; in development every call sees new files. */
function sources() {
  const drafts = showDrafts();
  if (drafts) return readSources(drafts);
  return (cached ??= readSources(drafts));
}

/** A source resolved for one locale. */
function resolve(source: PostSource, locale: Locale): Post {
  const language = source.versions[locale] ? locale : defaultLocale;
  const version = source.versions[language] as Version;
  const locales = englishFirst(Object.keys(source.versions) as Locale[]);
  return {
    ...version.article,
    slug: source.slug,
    locale: language,
    locales,
    readingTime: version.readingTime,
  };
}

/**
 * Every post a visitor to `locale` may see, newest first. Posts without a
 * translation come back in English (`post.locale === 'en'`).
 */
export async function getPosts(locale: Locale = defaultLocale) {
  const all = await sources();
  return sortPosts(all.map((source) => resolve(source, locale)));
}

/** One post as shown in `locale`, or `undefined` when there is none. */
export async function getPost(slug: string, locale: Locale = defaultLocale) {
  const source = (await sources()).find((entry) => entry.slug === slug);
  return source ? resolve(source, locale) : undefined;
}

/** Up to `limit` posts related to `slug`, as shown in `locale`. */
export async function getRelatedPosts(
  slug: string,
  locale: Locale = defaultLocale,
  limit = 3,
) {
  const posts = await getPosts(locale);
  const current = posts.find((post) => post.slug === slug);
  return current ? pickRelated(posts, current, limit) : [];
}

/** `generateStaticParams` for post pages: only locales that have the file. */
export async function getPostParams() {
  return (await sources()).flatMap((source) =>
    (Object.keys(source.versions) as Locale[]).map((locale) => ({
      locale,
      slug: source.slug,
    })),
  );
}
