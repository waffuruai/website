#!/usr/bin/env node
/**
 * Site-wide SEO and agent-readiness checker for a running preview. Zero
 * dependencies (Node fetch). Start the site first (`pnpm preview` serves the
 * real Worker on http://127.0.0.1:8787), then:
 *
 *   pnpm site:check
 *   pnpm site:check --base https://waffuru-site.<account>.workers.dev
 *
 * Crawls every <loc> in /sitemap.xml (rewritten onto --base) plus the hreflang
 * alternates those pages advertise. Per page it checks the h1, title and
 * description, canonical, language, reciprocal hreflang, share image,
 * markdown twin and `Accept: text/markdown` negotiation, JSON-LD and image
 * alts; then every internal link, the discovery files (robots, llms.txt,
 * sitemap, security.txt, api-catalog, agent skills) and that unknown URLs
 * return 404. Exits 1 when any check fails; warnings never fail the run.
 */
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

import { LOCALES, LOCALE_LANG } from './postbuild/site.mjs';

export const LIMITS = {
  titleMin: 3,
  titleMax: 70,
  /** Latin-script locales. */
  descMin: 50,
  descMax: 160,
  /** zh, ja and ko pack more into a character. */
  cjkDescMin: 20,
  cjkDescMax: 110,
  htmlWarnBytes: 400 * 1024,
};

const PRODUCTION_HOST = 'waffuru.ai';
const DEFAULT_BASE = 'http://127.0.0.1:8787';
const UA = 'waffuru-site-check/1.0';

/* -------------------------------------------------------------------------- */
/* Parsing helpers (pure, unit tested)                                        */
/* -------------------------------------------------------------------------- */

export const decodeEntities = (text) =>
  text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) =>
      String.fromCodePoint(parseInt(hex, 16)),
    )
    .replace(/&#(\d+);/g, (_, digits) => String.fromCodePoint(Number(digits)));

/** Attributes of a single opening tag: lower-cased names, entities decoded. */
export function parseAttrs(tag) {
  const attrs = {};
  const pattern =
    /([^\s"'<>/=]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'>]+)))?/g;
  const inner = tag.replace(/^<\s*[a-zA-Z0-9:-]+/, '').replace(/\/?>$/, '');
  for (const match of inner.matchAll(pattern)) {
    const value = match[2] ?? match[3] ?? match[4] ?? '';
    attrs[match[1].toLowerCase()] = decodeEntities(value);
  }
  return attrs;
}

/** Every `<loc>` in a sitemap, and the `xhtml:link` alternates. */
export function parseSitemap(xml) {
  const locs = [...xml.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/g)].map((match) =>
    decodeEntities(match[1]),
  );
  const alternates = [...xml.matchAll(/<xhtml:link\b[^>]*>/g)]
    .map((match) => parseAttrs(match[0]).href)
    .filter(Boolean);
  return { locs, alternates };
}

/** HTML without script and style bodies, so text checks ignore RSC payloads. */
export const stripScripts = (html) =>
  html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, '');

export const countH1 = (html) =>
  (stripScripts(html).match(/<h1[\s>]/gi) ?? []).length;

export function getTitle(html) {
  const match = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  return match ? decodeEntities(match[1]).trim() : null;
}

/** `Foo · Waffuru · Waffuru`: the brand suffix appended twice. */
export const hasDoubledBrand = (title) =>
  /(?:[|·–—-]\s*Waffuru\s*){2}$/i.test(title);

function findTags(html, name) {
  return [...html.matchAll(new RegExp(`<${name}\\b[^>]*>`, 'gi'))].map(
    (match) => parseAttrs(match[0]),
  );
}

/** A `<meta>` value by `name` or `property` (Open Graph uses `property`). */
export function getMeta(html, key) {
  const wanted = key.toLowerCase();
  const meta = findTags(html, 'meta').find(
    (attrs) =>
      (attrs.name ?? attrs.property ?? '').toLowerCase() === wanted ||
      (attrs.property ?? '').toLowerCase() === wanted,
  );
  return meta && meta.content !== undefined ? meta.content.trim() : null;
}

export const getMetaDescription = (html) => getMeta(html, 'description');

export function getCanonical(html) {
  const link = findTags(html, 'link').find(
    (attrs) => (attrs.rel ?? '').toLowerCase() === 'canonical',
  );
  return link?.href ?? null;
}

/** `[{ lang, href }]` from `<link rel="alternate" hreflang>` (React: `hrefLang`). */
export function getHreflangs(html) {
  return findTags(html, 'link')
    .filter(
      (attrs) =>
        (attrs.rel ?? '').toLowerCase() === 'alternate' && attrs.hreflang,
    )
    .map((attrs) => ({ lang: attrs.hreflang, href: attrs.href }));
}

/** The `href` of `<link rel="alternate" type="text/markdown">`, if any. */
export function getMarkdownAlternate(html) {
  const link = findTags(html, 'link').find(
    (attrs) =>
      (attrs.rel ?? '').toLowerCase() === 'alternate' &&
      (attrs.type ?? '').toLowerCase() === 'text/markdown',
  );
  return link?.href ?? null;
}

export const getHtmlLang = (html) => {
  const match = html.match(/<html\b[^>]*>/i);
  return match ? (parseAttrs(match[0]).lang ?? null) : null;
};

/** Parsed JSON-LD blocks: `{ ok, data?, error? }` each. */
export function getJsonLd(html) {
  return [
    ...html.matchAll(
      /<script\b[^>]*type\s*=\s*["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi,
    ),
  ].map((match) => {
    try {
      return { ok: true, data: JSON.parse(match[1]) };
    } catch (error) {
      return { ok: false, error: String(error.message ?? error) };
    }
  });
}

/** True when a JSON-LD value (object, array or @graph) carries an `@type`. */
export function hasSchemaType(data) {
  if (Array.isArray(data)) return data.length > 0 && data.every(hasSchemaType);
  if (!data || typeof data !== 'object') return false;
  if (Array.isArray(data['@graph'])) return hasSchemaType(data['@graph']);
  return Boolean(data['@type']);
}

export const getLinks = (html) =>
  findTags(stripScripts(html), 'a')
    .map((attrs) => attrs.href)
    .filter((href) => href !== undefined);

/**
 * Normalises an href to a same-site absolute URL on `base`, or `null` when it
 * is external or not navigable. `siteOrigins` are extra origins treated as
 * internal (the production origin in canonicals and the sitemap).
 */
export function resolveInternal(href, pageUrl, base, siteOrigins = []) {
  const trimmed = (href ?? '').trim();
  if (!trimmed || trimmed.startsWith('#')) return null;
  if (/^(mailto|tel|javascript|data|sms|blob):/i.test(trimmed)) return null;
  let url;
  try {
    url = new URL(trimmed, pageUrl);
  } catch {
    return null;
  }
  if (!/^https?:$/.test(url.protocol)) return null;
  const baseUrl = new URL(base);
  const internal =
    url.origin === baseUrl.origin || siteOrigins.includes(url.origin);
  if (!internal) return null;
  url.hash = '';
  return new URL(url.pathname + url.search, baseUrl).href;
}

/** Same URL with the root's trailing slash and a trailing `/` normalised away. */
export function normalizeUrl(url) {
  const parsed = new URL(url);
  parsed.hash = '';
  const path = parsed.pathname.replace(/\/+$/, '') || '/';
  return `${parsed.origin}${path}${parsed.search}`;
}

export function getImages(html) {
  return findTags(stripScripts(html), 'img').map((attrs) => ({
    src: attrs.src ?? attrs['data-src'] ?? '',
    hasAlt: 'alt' in attrs,
    alt: attrs.alt ?? '',
    decorative:
      attrs['aria-hidden'] === 'true' ||
      attrs.role === 'presentation' ||
      attrs.role === 'none',
  }));
}

/** The locale a path belongs to: `/ja/about` is `ja`, `/about` is `en`. */
export function localeOfPath(pathname) {
  const first = pathname.split('/')[1]?.replace(/\.(md|txt)$/, '');
  return LOCALES.includes(first) ? first : 'en';
}

/** The description length a page in `locale` should have. */
export function descriptionLimits(locale) {
  return ['zh', 'ja', 'ko'].includes(locale)
    ? { min: LIMITS.cjkDescMin, max: LIMITS.cjkDescMax }
    : { min: LIMITS.descMin, max: LIMITS.descMax };
}

/** Groups of a robots.txt as `{ agents, allow, disallow, signals }`. */
export function parseRobots(text) {
  const groups = [];
  let current = null;
  let lastWasAgent = false;
  for (const raw of text.split(/\r?\n/)) {
    const line = raw.replace(/#.*/, '').trim();
    if (!line) continue;
    const index = line.indexOf(':');
    if (index < 0) continue;
    const key = line.slice(0, index).trim().toLowerCase();
    const value = line.slice(index + 1).trim();
    if (key === 'user-agent') {
      if (!current || !lastWasAgent) {
        current = { agents: [], allow: [], disallow: [], signals: [] };
        groups.push(current);
      }
      current.agents.push(value.toLowerCase());
      lastWasAgent = true;
      continue;
    }
    lastWasAgent = false;
    if (!current) continue;
    if (key === 'allow') current.allow.push(value);
    if (key === 'disallow') current.disallow.push(value);
    if (key === 'content-signal') current.signals.push(value);
  }
  return groups;
}

/** Whether `agent` may fetch `/` per robots.txt (specific group beats `*`). */
export function robotsAllowsRoot(text, agent) {
  const groups = parseRobots(text);
  const name = agent.toLowerCase();
  const group =
    groups.find((entry) => entry.agents.includes(name)) ??
    groups.find((entry) => entry.agents.includes('*'));
  if (!group) return true;
  if (group.allow.some((path) => path === '/')) return true;
  return !group.disallow.some((path) => path === '/');
}

/** Every absolute `https://` link in an llms.txt style markdown file. */
export const markdownLinks = (text) =>
  [...text.matchAll(/\]\((https?:\/\/[^)\s]+)\)/g)].map((match) => match[1]);

/** `Expires` of a security.txt as a Date, or null. */
export function securityExpires(text) {
  const value = text.match(/^Expires:\s*(.+)$/im)?.[1];
  const date = value ? new Date(value.trim()) : null;
  return date && !Number.isNaN(date.getTime()) ? date : null;
}

/* -------------------------------------------------------------------------- */
/* Network                                                                    */
/* -------------------------------------------------------------------------- */

async function get(
  url,
  { headers = {}, redirect = 'manual', body = true } = {},
) {
  const res = await fetch(url, {
    redirect,
    headers: { 'user-agent': UA, ...headers },
    signal: AbortSignal.timeout(20_000),
  });
  let bytes = Buffer.alloc(0);
  if (body) bytes = Buffer.from(await res.arrayBuffer());
  else await res.body?.cancel();
  return {
    status: res.status,
    location: res.headers.get('location'),
    type: res.headers.get('content-type') ?? '',
    headers: Object.fromEntries(res.headers),
    text: bytes.toString('utf8'),
    bytes,
  };
}

const safeGet = (url, options) =>
  get(url, options).catch((error) => ({
    status: 0,
    location: null,
    type: '',
    headers: {},
    text: '',
    bytes: Buffer.alloc(0),
    error,
  }));

/** Follows redirects manually: `{ hops, final, status }`. */
async function follow(url, max = 6) {
  let current = url;
  let hops = 0;
  for (;;) {
    const res = await get(current, { body: false });
    if (res.status >= 300 && res.status < 400 && res.location) {
      hops += 1;
      if (hops > max) return { hops, final: current, status: res.status };
      current = new URL(res.location, current).href;
      continue;
    }
    return { hops, final: current, status: res.status };
  }
}

async function pool(items, size, fn) {
  const results = new Array(items.length);
  let next = 0;
  await Promise.all(
    Array.from({ length: Math.min(size, items.length) }, async () => {
      while (next < items.length) {
        const index = next++;
        results[index] = await fn(items[index], index);
      }
    }),
  );
  return results;
}

/** Product prefixes the release receiver owns; absent from a local preview. */
function installerPrefixes() {
  try {
    const manifest = JSON.parse(
      readFileSync(
        new URL('../releases/products.json', import.meta.url),
        'utf8',
      ),
    );
    return manifest.map((entry) => `/${entry.product}/`);
  } catch {
    return [];
  }
}

/* -------------------------------------------------------------------------- */
/* Page checks                                                                */
/* -------------------------------------------------------------------------- */

/**
 * Checks one page's HTML. Returns `{ fails, warns, links, hreflangs, ... }`;
 * cross-page checks (reciprocal hreflang, shared image and markdown
 * fetches) happen in `run`.
 */
export function checkPage(url, res, ctx) {
  const fails = [];
  const warns = [];
  const html = res.text;
  const pathname = new URL(url).pathname;

  if (res.status !== 200) {
    fails.push(`status ${res.status}`);
    return { fails, warns, links: [], hreflangs: [] };
  }
  if (!/text\/html/i.test(res.type)) {
    fails.push(`content-type "${res.type}" (expected text/html)`);
  }

  const h1 = countH1(html);
  if (h1 !== 1) fails.push(`${h1} <h1> (expected 1)`);

  const title = getTitle(html);
  if (!title) fails.push('missing <title>');
  else {
    if (title.length < LIMITS.titleMin || title.length > LIMITS.titleMax) {
      fails.push(
        `title ${title.length} chars (want ${LIMITS.titleMin}-${LIMITS.titleMax})`,
      );
    }
    if (hasDoubledBrand(title))
      fails.push(`doubled brand in title: "${title}"`);
  }

  const locale = localeOfPath(pathname);
  const description = getMetaDescription(html);
  if (!description) fails.push('missing meta description');
  else {
    const { min, max } = descriptionLimits(locale);
    if (description.length < min || description.length > max) {
      fails.push(
        `meta description ${description.length} chars (want ${min}-${max})`,
      );
    }
  }

  const canonical = getCanonical(html);
  if (!canonical) fails.push('missing canonical');
  else {
    const resolved = resolveInternal(canonical, url, ctx.base, ctx.siteOrigins);
    if (!resolved) fails.push(`canonical ${canonical} is not on this site`);
    else if (
      ctx.canonicalMustMatch &&
      normalizeUrl(resolved) !== normalizeUrl(url)
    ) {
      fails.push(`canonical ${canonical} does not point at the page itself`);
    }
  }

  const lang = getHtmlLang(html);
  if (lang !== LOCALE_LANG[locale]) {
    fails.push(`<html lang="${lang}"> (expected ${LOCALE_LANG[locale]})`);
  }

  const hreflangs = getHreflangs(html).map((entry) => ({
    lang: entry.lang,
    href: resolveInternal(entry.href, url, ctx.base, ctx.siteOrigins),
  }));
  if (hreflangs.length) {
    if (!hreflangs.some((entry) => entry.lang === 'x-default')) {
      fails.push('hreflang lacks x-default');
    }
    for (const entry of hreflangs) {
      if (!entry.href)
        fails.push(`hreflang ${entry.lang} is not an on-site URL`);
      else if (
        entry.lang !== 'x-default' &&
        !Object.values(LOCALE_LANG).includes(entry.lang)
      ) {
        fails.push(`hreflang "${entry.lang}" is not a locale we serve`);
      }
    }
    // A page with translations lists every version, itself included. An
    // English-only page advertises only x-default.
    const languages = hreflangs.filter((entry) => entry.lang !== 'x-default');
    if (languages.length) {
      const own = languages.find(
        (entry) => entry.href && normalizeUrl(entry.href) === normalizeUrl(url),
      );
      if (!own) fails.push('hreflang set does not include the page itself');
      else if (own.lang !== lang) {
        fails.push(
          `hreflang for itself is ${own.lang}, <html lang> is ${lang}`,
        );
      }
    }
  }

  for (const [index, block] of getJsonLd(html).entries()) {
    if (!block.ok) fails.push(`JSON-LD #${index + 1} invalid: ${block.error}`);
    else if (!hasSchemaType(block.data))
      fails.push(`JSON-LD #${index + 1} has no @type`);
  }

  let emptyAlt = 0;
  for (const img of getImages(html)) {
    if (!img.hasAlt) fails.push(`<img> without alt: ${img.src.slice(0, 80)}`);
    else if (img.alt.trim() === '' && !img.decorative) emptyAlt += 1;
  }
  if (emptyAlt)
    warns.push(`${emptyAlt} <img alt=""> without aria-hidden on the element`);

  const bytes = Buffer.byteLength(html);
  if (bytes > LIMITS.htmlWarnBytes) {
    warns.push(
      `HTML ${(bytes / 1024).toFixed(0)} KB (> ${LIMITS.htmlWarnBytes / 1024} KB)`,
    );
  }

  const image = getMeta(html, 'og:image');
  if (!image) fails.push('missing og:image');
  const markdown = getMarkdownAlternate(html);
  if (!markdown)
    fails.push('missing <link rel="alternate" type="text/markdown">');

  return {
    fails,
    warns,
    title,
    description,
    locale,
    hreflangs,
    ogImage: image
      ? resolveInternal(image, url, ctx.base, ctx.siteOrigins)
      : null,
    markdownHref: markdown
      ? resolveInternal(markdown, url, ctx.base, ctx.siteOrigins)
      : null,
    links: getLinks(html)
      .map((href) => resolveInternal(href, url, ctx.base, ctx.siteOrigins))
      .filter(Boolean),
  };
}

/* -------------------------------------------------------------------------- */
/* Main                                                                       */
/* -------------------------------------------------------------------------- */

export function parseArgs(argv, env = process.env) {
  const args = {
    base: env.SITE_BASE || DEFAULT_BASE,
    concurrency: 8,
    verbose: false,
  };
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === '--base') args.base = argv[++i];
    else if (argv[i] === '--concurrency') args.concurrency = Number(argv[++i]);
    else if (argv[i] === '--verbose') args.verbose = true;
  }
  args.base = args.base.replace(/\/+$/, '');
  return args;
}

export async function run(argv = process.argv.slice(2)) {
  const args = parseArgs(argv);
  const base = args.base;
  const failures = [];
  const warnings = [];
  const fail = (area, target, message) =>
    failures.push({ area, target, message });
  const warn = (area, target, message) =>
    warnings.push({ area, target, message });
  const abs = (path) => new URL(path, base).href;
  const production = new URL(base).hostname === PRODUCTION_HOST;
  const installers = installerPrefixes();

  /* Sitemap. */
  const sitemap = await safeGet(abs('/sitemap.xml'));
  if (sitemap.status !== 200) {
    const reason = sitemap.error
      ? `could not reach ${base} (${sitemap.error.cause?.code ?? sitemap.error.message}); is \`pnpm preview\` running?`
      : `status ${sitemap.status}`;
    fail('sitemap', '/sitemap.xml', reason);
    return { failures, warnings, pages: 0, links: 0, base };
  }
  if (!/xml/i.test(sitemap.type)) {
    fail(
      'sitemap',
      '/sitemap.xml',
      `content-type "${sitemap.type}" (expected xml)`,
    );
  }
  const { locs, alternates } = parseSitemap(sitemap.text);
  const siteOrigins = [
    ...new Set([...locs, ...alternates].map((loc) => new URL(loc).origin)),
  ].filter((origin) => origin !== new URL(base).origin);
  const toBase = (url) => resolveInternal(url, base, base, siteOrigins);
  const sitemapPages = new Set(locs.map(toBase).filter(Boolean));
  if (!sitemapPages.size) fail('sitemap', '/sitemap.xml', 'no <loc> entries');

  /* Pages: the sitemap, then any hreflang alternates discovered. */
  const results = new Map();
  const linkSources = new Map();
  const crawl = async (urls) => {
    await pool(urls, args.concurrency, async (url) => {
      const res = await safeGet(url);
      const result = res.error
        ? {
            fails: [`fetch error: ${res.error.message}`],
            warns: [],
            links: [],
            hreflangs: [],
          }
        : checkPage(url, res, {
            base,
            siteOrigins,
            canonicalMustMatch: sitemapPages.has(url),
          });
      results.set(url, result);
      for (const link of result.links) {
        if (!linkSources.has(link)) linkSources.set(link, new Set());
        linkSources.get(link).add(new URL(url).pathname);
      }
    });
  };
  await crawl([...sitemapPages]);
  const extra = new Set();
  for (const result of results.values()) {
    for (const { href } of result.hreflangs) {
      if (href && !results.has(href)) extra.add(href);
    }
  }
  if (extra.size) await crawl([...extra]);

  /* Reciprocal hreflang: if A lists B, B must list A. */
  const byUrl = new Map(
    [...results].map(([url, result]) => [normalizeUrl(url), result]),
  );
  for (const [url, result] of results) {
    for (const { lang, href } of result.hreflangs) {
      // x-default is a fallback, not a translation pair.
      if (!href || lang === 'x-default') continue;
      if (normalizeUrl(href) === normalizeUrl(url)) continue;
      const other = byUrl.get(normalizeUrl(href));
      if (!other) continue;
      const lists = other.hreflangs.some(
        (entry) => entry.href && normalizeUrl(entry.href) === normalizeUrl(url),
      );
      if (!lists) {
        result.fails.push(
          `hreflang ${lang} -> ${new URL(href).pathname} does not link back`,
        );
      }
    }
  }

  /* Duplicate titles and descriptions within a locale. */
  const seen = new Map();
  for (const [url, result] of results) {
    for (const [kind, value] of [
      ['title', result.title],
      ['description', result.description],
    ]) {
      if (!value) continue;
      const key = `${kind}|${result.locale}|${value}`;
      if (!seen.has(key)) seen.set(key, []);
      seen.get(key).push(new URL(url).pathname);
    }
  }
  for (const [key, paths] of seen) {
    if (paths.length > 1) {
      warn(
        'page',
        paths[0],
        `${key.split('|')[0]} shared with ${paths.slice(1).join(', ')}`,
      );
    }
  }

  /* Share images, once per URL. */
  const images = [
    ...new Set([...results.values()].map((r) => r.ogImage).filter(Boolean)),
  ];
  const imageSources = new Map();
  for (const [url, result] of results) {
    if (result.ogImage) {
      if (!imageSources.has(result.ogImage))
        imageSources.set(result.ogImage, new URL(url).pathname);
    }
  }
  await pool(images, args.concurrency, async (image) => {
    const res = await safeGet(image, { body: false });
    const target = `${new URL(image).pathname} (from ${imageSources.get(image)})`;
    if (res.status !== 200) fail('og', target, `status ${res.status}`);
    else if (!/^image\/png/i.test(res.type)) {
      fail('og', target, `content-type "${res.type}" (expected image/png)`);
    }
  });

  /* Markdown twins and Accept: text/markdown negotiation, per page. */
  await pool([...results.keys()], args.concurrency, async (url) => {
    const path = new URL(url).pathname;
    if (results.get(url).fails.some((message) => message.startsWith('status')))
      return;
    const negotiated = await safeGet(url, {
      headers: { accept: 'text/markdown' },
    });
    if (negotiated.status !== 200) {
      fail(
        'markdown',
        path,
        `Accept: text/markdown returned ${negotiated.status}`,
      );
    } else {
      if (!/^text\/markdown/i.test(negotiated.type)) {
        fail(
          'markdown',
          path,
          `Accept: text/markdown returned "${negotiated.type}"`,
        );
      }
      if (!/\baccept\b/i.test(negotiated.headers.vary ?? '')) {
        fail('markdown', path, 'markdown response lacks Vary: Accept');
      }
      if (!negotiated.text.trimStart().startsWith('---')) {
        fail('markdown', path, 'markdown response has no front matter');
      }
    }
    const href = results.get(url).markdownHref;
    if (href) {
      const twin = await safeGet(href, { body: false });
      if (twin.status !== 200)
        fail(
          'markdown',
          path,
          `${new URL(href).pathname} returned ${twin.status}`,
        );
      else if (!/^text\/markdown/i.test(twin.type)) {
        fail('markdown', path, `${new URL(href).pathname} is "${twin.type}"`);
      }
    }
  });

  for (const [url, result] of results) {
    const path = new URL(url).pathname;
    result.fails.forEach((message) => fail('page', path, message));
    result.warns.forEach((message) => warn('page', path, message));
  }

  /* Internal links: each unique URL once. Installers only exist once CI adds them. */
  const linkUrls = [...linkSources.keys()].filter((link) => {
    if (results.has(link)) return false;
    const path = new URL(link).pathname;
    return (
      !installers.some((prefix) => path.startsWith(prefix)) &&
      !path.startsWith('/api/')
    );
  });
  await pool(linkUrls, args.concurrency, async (link) => {
    const result = await follow(link).catch((error) => ({
      status: 0,
      hops: 0,
      error,
    }));
    const from = [...linkSources.get(link)].slice(0, 3).join(', ');
    const target = `${new URL(link).pathname}${new URL(link).search}`;
    if (result.status !== 200) {
      fail(
        'link',
        target,
        `resolves ${result.status || result.error?.message} (linked from ${from})`,
      );
    } else if (result.hops > 1) {
      warn(
        'link',
        target,
        `redirect chain of ${result.hops} hops (linked from ${from})`,
      );
    }
  });

  /* The home page: discovery headers and indexing. */
  const home = await safeGet(abs('/'));
  const link = home.headers.link ?? '';
  for (const [rel, why] of [
    ['api-catalog', 'API catalog'],
    ['text/markdown', 'markdown twin'],
    ['describedby', 'llms.txt'],
  ]) {
    if (!link.includes(rel))
      fail('headers', '/', `Link header lacks the ${why} (${rel})`);
  }
  const noindex = /noindex/i.test(home.headers['x-robots-tag'] ?? '');
  if (production && noindex)
    fail('headers', '/', 'production home page is noindex');
  if (!production && !noindex) {
    fail(
      'headers',
      '/',
      'non-production home page lacks X-Robots-Tag: noindex',
    );
  }

  /* robots.txt. */
  const robots = await safeGet(abs('/robots.txt'));
  if (robots.status !== 200)
    fail('robots', '/robots.txt', `status ${robots.status}`);
  else {
    if (!/^text\/plain/i.test(robots.type)) {
      fail(
        'robots',
        '/robots.txt',
        `content-type "${robots.type}" (expected text/plain)`,
      );
    }
    if (production) {
      const groups = parseRobots(robots.text);
      const everyone = groups.find((group) => group.agents.includes('*'));
      if (!robotsAllowsRoot(robots.text, '*'))
        fail('robots', '/robots.txt', 'does not allow /');
      if (!everyone?.signals.some((signal) => /ai-train=no/.test(signal))) {
        fail('robots', '/robots.txt', 'no Content-Signal with ai-train=no');
      }
      if (
        !/^Sitemap:\s*https:\/\/waffuru\.ai\/sitemap\.xml/im.test(robots.text)
      ) {
        fail('robots', '/robots.txt', 'no Sitemap line');
      }
      for (const agent of ['Googlebot', 'ChatGPT-User', 'Claude-User']) {
        if (!robotsAllowsRoot(robots.text, agent))
          fail('robots', '/robots.txt', `blocks ${agent}`);
      }
      for (const agent of ['GPTBot', 'ClaudeBot', 'Google-Extended']) {
        if (robotsAllowsRoot(robots.text, agent))
          fail('robots', '/robots.txt', `allows ${agent}`);
      }
    } else if (robotsAllowsRoot(robots.text, '*')) {
      fail(
        'robots',
        '/robots.txt',
        'a non-production host must disallow everything',
      );
    }
  }

  /* Plain files. */
  const textFiles = [
    ['/llms.txt', /^text\/plain/i],
    ['/llms-full.txt', /^text\/plain/i],
    ['/.well-known/security.txt', /^text\/plain/i],
  ];
  const fetched = {};
  await pool(textFiles, args.concurrency, async ([path, type]) => {
    const res = await safeGet(abs(path));
    fetched[path] = res;
    if (res.status !== 200) fail('file', path, `status ${res.status}`);
    else {
      if (!type.test(res.type))
        fail('file', path, `content-type "${res.type}"`);
      if (!res.text.trim()) fail('file', path, 'empty body');
    }
  });

  const llms = fetched['/llms.txt'];
  if (llms?.status === 200) {
    if (!/^# \S/.test(llms.text))
      fail('file', '/llms.txt', 'does not start with an H1');
    if (!/^> \S/m.test(llms.text))
      fail('file', '/llms.txt', 'has no blockquote summary');
    const targets = [
      ...new Set(markdownLinks(llms.text).map(toBase).filter(Boolean)),
    ].filter(
      (target) =>
        !installers.some((prefix) =>
          new URL(target).pathname.startsWith(prefix),
        ),
    );
    await pool(targets, args.concurrency, async (target) => {
      const res = await safeGet(target, { body: false });
      if (res.status !== 200)
        fail(
          'file',
          '/llms.txt',
          `${new URL(target).pathname} returned ${res.status}`,
        );
    });
  }

  const security = fetched['/.well-known/security.txt'];
  if (security?.status === 200) {
    if (!/^Contact:/im.test(security.text))
      fail('file', '/.well-known/security.txt', 'no Contact');
    const expires = securityExpires(security.text);
    if (!expires) fail('file', '/.well-known/security.txt', 'no valid Expires');
    else if (expires.getTime() < Date.now())
      fail('file', '/.well-known/security.txt', 'Expires is in the past');
  }

  const catalog = await safeGet(abs('/.well-known/api-catalog'));
  if (catalog.status !== 200)
    fail('file', '/.well-known/api-catalog', `status ${catalog.status}`);
  else {
    if (!/application\/linkset\+json/i.test(catalog.type)) {
      fail(
        'file',
        '/.well-known/api-catalog',
        `content-type "${catalog.type}" (expected application/linkset+json)`,
      );
    }
    try {
      const parsed = JSON.parse(catalog.text);
      if (!Array.isArray(parsed.linkset) || !parsed.linkset.length) {
        fail('file', '/.well-known/api-catalog', 'no linkset entries');
      }
    } catch (error) {
      fail(
        'file',
        '/.well-known/api-catalog',
        `invalid JSON: ${error.message}`,
      );
    }
  }

  const skills = await safeGet(abs('/.well-known/agent-skills/index.json'));
  if (skills.status !== 200)
    fail(
      'file',
      '/.well-known/agent-skills/index.json',
      `status ${skills.status}`,
    );
  else {
    let index;
    try {
      index = JSON.parse(skills.text);
    } catch (error) {
      fail(
        'file',
        '/.well-known/agent-skills/index.json',
        `invalid JSON: ${error.message}`,
      );
    }
    if (index) {
      if (!index.$schema)
        fail('file', '/.well-known/agent-skills/index.json', 'no $schema');
      if (!Array.isArray(index.skills) || !index.skills.length) {
        fail('file', '/.well-known/agent-skills/index.json', 'no skills');
      }
      await pool(index.skills ?? [], args.concurrency, async (skill) => {
        const target = skill.url ?? '';
        for (const key of ['name', 'type', 'description', 'url', 'digest']) {
          if (!skill[key])
            fail(
              'file',
              '/.well-known/agent-skills/index.json',
              `skill ${skill.name ?? '?'} has no ${key}`,
            );
        }
        if (!skill.url) return;
        const res = await safeGet(new URL(skill.url, abs('/')).href);
        if (res.status !== 200) fail('file', target, `status ${res.status}`);
        else {
          const digest = `sha256:${createHash('sha256').update(res.bytes).digest('hex')}`;
          if (digest !== skill.digest)
            fail(
              'file',
              target,
              `digest ${skill.digest} does not match the file (${digest})`,
            );
        }
      });
    }
  }

  /* Unknown URLs are 404s, not soft 404s. */
  for (const path of [
    '/this-page-does-not-exist',
    '/es/this-page-does-not-exist',
    '/this-page-does-not-exist.md',
  ]) {
    const res = await safeGet(abs(path), { body: false });
    if (res.status !== 404)
      fail('404', path, `status ${res.status} (expected 404)`);
  }

  return {
    failures,
    warnings,
    pages: results.size,
    links: linkSources.size,
    base,
  };
}

export function printSummary(result) {
  const { failures, warnings } = result;
  console.log(
    `\nChecked ${result.pages} pages and ${result.links ?? 0} unique internal links on ${result.base ?? ''}\n`,
  );
  const areas = [
    'sitemap',
    'page',
    'markdown',
    'og',
    'link',
    'headers',
    'robots',
    'file',
    '404',
  ];
  const rows = [['area', 'fail', 'warn']];
  for (const area of areas) {
    rows.push([
      area,
      String(failures.filter((item) => item.area === area).length),
      String(warnings.filter((item) => item.area === area).length),
    ]);
  }
  rows.push(['TOTAL', String(failures.length), String(warnings.length)]);
  const widths = [0, 1, 2].map((i) =>
    Math.max(...rows.map((row) => row[i].length)),
  );
  for (const row of rows)
    console.log(row.map((cell, i) => cell.padEnd(widths[i])).join('  '));
  const dump = (label, list) => {
    if (!list.length) return;
    console.log(`\n${label} (${list.length})`);
    for (const item of list)
      console.log(`  [${item.area}] ${item.target}: ${item.message}`);
  };
  dump('FAILURES', failures);
  dump('WARNINGS', warnings);
  console.log(failures.length ? '\nFAILED' : '\nOK');
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) {
  const result = await run();
  printSummary(result);
  process.exit(result.failures.length ? 1 : 0);
}
