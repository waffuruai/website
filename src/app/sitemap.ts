import { readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';

import type { MetadataRoute } from 'next';

import { internalNavHrefs, publishedNavigation } from '@/content/navigation';
import { site } from '@/content/site';
import {
  defaultLocale,
  localeInfo,
  localizePath,
  locales,
  type Locale,
} from '@/i18n/config';
import { isPublishedPath } from '@/lib/launch';

export const dynamic = 'force-static';

type Entry = MetadataRoute.Sitemap[number];

/**
 * Legal pages are written once, in English. They are built in every locale
 * but canonicalise to the English URL, so only that one is listed.
 */
const LEGAL_PATHS = [
  '/legal',
  '/legal/terms',
  '/legal/privacy',
  '/legal/cookies',
];

/** Absolute URL for a locale's version of a route; the home page has no slash. */
function urlFor(route: string, locale: Locale): string {
  const localized = localizePath(route, locale);
  return localized === '/' ? site.url : `${site.url}${localized}`;
}

/**
 * One entry per locale the page exists in. When it exists in more than one,
 * each entry lists every version as an `hreflang` alternate (itself
 * included) plus `x-default`, which points at the default locale's URL (or
 * the first locale written). A page in a single locale has no alternates.
 */
function entries(
  route: string,
  available: readonly Locale[],
  lastModified?: Partial<Record<Locale, string>>,
): Entry[] {
  const written = locales.filter((locale) => available.includes(locale));
  if (!written.length) return [];
  const fallback = written.includes(defaultLocale) ? defaultLocale : written[0];

  const alternates =
    written.length > 1
      ? {
          languages: {
            ...Object.fromEntries(
              written.map((locale) => [
                localeInfo[locale].lang,
                urlFor(route, locale),
              ]),
            ),
            'x-default': urlFor(route, fallback),
          },
        }
      : undefined;

  return written.map((locale) => ({
    url: urlFor(route, locale),
    ...(lastModified?.[locale] ? { lastModified: lastModified[locale] } : {}),
    ...(alternates ? { alternates } : {}),
  }));
}

/* Blog posts ------------------------------------------------------------------ */

type Post = {
  slug: string;
  locales: Locale[];
  /** `updated`, else `date`, from each locale's `article` export. */
  lastModified: Partial<Record<Locale, string>>;
  date: string;
};

const KEY_DATE =
  /\b(?:date|published|publishedAt)\s*:\s*(?:new Date\(\s*)?['"`](\d{4}-\d{2}-\d{2})/;
const KEY_UPDATED =
  /\b(?:updated|modified|updatedAt|modifiedAt)\s*:\s*(?:new Date\(\s*)?['"`](\d{4}-\d{2}-\d{2})/;
/** A post marked `draft: true` or `published: false` is not listed. */
const DRAFT = /\bdraft\s*:\s*true\b|\bpublished\s*:\s*false\b/;

/** The dates and draft flag in a post's `export const article = {...}`. */
function readArticle(source: string) {
  const block =
    source.match(/export\s+const\s+article\s*=\s*\{[\s\S]*?\n\}/)?.[0] ??
    source.slice(0, 2000);
  const date = block.match(KEY_DATE)?.[1];
  const updated = block.match(KEY_UPDATED)?.[1];
  return { date, updated, draft: DRAFT.test(block) };
}

/**
 * Posts under src/content/blog: `<slug>/page.mdx` is English and
 * `<slug>/page.<locale>.mdx` a translation. A post with no translation is
 * listed in English only. A missing directory is no posts.
 */
function readPosts(): Post[] {
  const dir = path.join(process.cwd(), 'src/content/blog');
  let slugs: string[];
  try {
    slugs = readdirSync(dir, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name);
  } catch {
    return [];
  }

  const posts: Post[] = [];
  for (const slug of slugs.sort()) {
    const files = readdirSync(path.join(dir, slug));
    const written: Locale[] = [];
    const lastModified: Partial<Record<Locale, string>> = {};
    let date = '';
    for (const locale of locales) {
      const file = locale === defaultLocale ? 'page.mdx' : `page.${locale}.mdx`;
      if (!files.includes(file)) continue;
      const article = readArticle(
        readFileSync(path.join(dir, slug, file), 'utf8'),
      );
      if (article.draft) continue;
      written.push(locale);
      const modified = article.updated ?? article.date;
      if (modified) lastModified[locale] = modified;
      if (!date && article.date) date = article.date;
    }
    if (written.length) {
      posts.push({ slug, locales: written, lastModified, date });
    }
  }
  // Newest first.
  return posts.sort((a, z) => z.date.localeCompare(a.date));
}

/* Sitemap ---------------------------------------------------------------------- */

/**
 * sitemap.xml: the home page and every published page in the navigation in
 * all locales, the legal pages in English, and the blog posts in the
 * locales they are written in. 404s, unlaunched sections and non-page files
 * are never listed.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = new Set<string>(['/']);
  for (const href of internalNavHrefs(publishedNavigation())) {
    const route = href.split(/[?#]/)[0] || '/';
    if (
      !route.startsWith('/legal') &&
      !route.startsWith('/api') &&
      isPublishedPath(route)
    ) {
      routes.add(route);
    }
  }

  return [
    ...[...routes].flatMap((route) => entries(route, locales)),
    ...LEGAL_PATHS.flatMap((route) => entries(route, [defaultLocale])),
    ...readPosts().flatMap((post) =>
      entries(`/blog/${post.slug}`, post.locales, post.lastModified),
    ),
  ];
}
