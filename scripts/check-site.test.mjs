// @vitest-environment node
import { createHash } from 'node:crypto';
import { createServer } from 'node:http';

import { afterEach, describe, expect, it } from 'vitest';

import {
  checkPage,
  countH1,
  descriptionLimits,
  getCanonical,
  getHreflangs,
  getHtmlLang,
  getImages,
  getJsonLd,
  getLinks,
  getMarkdownAlternate,
  getMeta,
  getMetaDescription,
  getTitle,
  hasDoubledBrand,
  hasSchemaType,
  localeOfPath,
  markdownLinks,
  normalizeUrl,
  parseArgs,
  parseAttrs,
  parseRobots,
  parseSitemap,
  resolveInternal,
  robotsAllowsRoot,
  run,
  securityExpires,
  stripScripts,
} from './check-site.mjs';

const BASE = 'http://127.0.0.1:8787';

describe('check-site parsing helpers', () => {
  it('parses sitemap locs and xhtml alternates', () => {
    const xml = `<urlset><url><loc>https://waffuru.ai/a?x=1&amp;y=2</loc>
      <xhtml:link rel="alternate" hreflang="fr" href="https://waffuru.ai/fr/a" />
      </url><url><loc> https://waffuru.ai/b </loc></url></urlset>`;
    expect(parseSitemap(xml)).toEqual({
      locs: ['https://waffuru.ai/a?x=1&y=2', 'https://waffuru.ai/b'],
      alternates: ['https://waffuru.ai/fr/a'],
    });
  });

  it('parses attributes in all quoting styles, including React hrefLang', () => {
    expect(
      parseAttrs('<link rel="alternate" hrefLang=\'fr\' href=/fr data-x>'),
    ).toEqual({ rel: 'alternate', hreflang: 'fr', href: '/fr', 'data-x': '' });
  });

  it('counts h1s outside scripts only', () => {
    const html = `<h1>a</h1><H1 class="x">b</H1><script>"<h1>rsc</h1>"</script><h10>`;
    expect(countH1(html)).toBe(2);
    expect(stripScripts(html)).not.toContain('rsc');
  });

  it('reads title, description, canonical and Open Graph tags', () => {
    const html = `<head><title>Iron &amp; kernels · Waffuru</title>
      <meta name="description" content="A &quot;good&quot; page"/>
      <meta property="og:image" content="https://waffuru.ai/og/en/index.png"/>
      <link rel="canonical" href="https://waffuru.ai/products/iron"/></head>`;
    expect(getTitle(html)).toBe('Iron & kernels · Waffuru');
    expect(getMetaDescription(html)).toBe('A "good" page');
    expect(getMeta(html, 'og:image')).toBe(
      'https://waffuru.ai/og/en/index.png',
    );
    expect(getCanonical(html)).toBe('https://waffuru.ai/products/iron');
    expect(getTitle('<p>x</p>')).toBeNull();
    expect(getMetaDescription('<p>x</p>')).toBeNull();
    expect(getMeta('<p>x</p>', 'og:image')).toBeNull();
  });

  it('detects a doubled brand suffix but not the brand in the name', () => {
    expect(hasDoubledBrand('Pricing · Waffuru · Waffuru')).toBe(true);
    expect(hasDoubledBrand('Introducing Waffuru · Waffuru')).toBe(false);
    expect(hasDoubledBrand('Introducing Waffuru')).toBe(false);
  });

  it('extracts hreflang alternates, the markdown twin and the html lang', () => {
    const html = `<html lang="zh-CN" class="a"><link rel="alternate" hrefLang="zh-CN" href="/zh/p"/>
      <link rel="alternate" hrefLang="x-default" href="/p"/>
      <link rel="alternate" type="text/markdown" href="/p.md"/><link rel="icon" href="/i.png"/>`;
    expect(getHreflangs(html)).toEqual([
      { lang: 'zh-CN', href: '/zh/p' },
      { lang: 'x-default', href: '/p' },
    ]);
    expect(getMarkdownAlternate(html)).toBe('/p.md');
    expect(getHtmlLang(html)).toBe('zh-CN');
  });

  it('parses JSON-LD and flags broken or untyped blocks', () => {
    const html = `<script type="application/ld+json">{"@type":"Organization"}</script>
      <script type="application/ld+json">{oops}</script>
      <script type="application/ld+json">{"@graph":[{"@type":"A"},{"name":"b"}]}</script>`;
    const blocks = getJsonLd(html);
    expect(blocks.map((block) => block.ok)).toEqual([true, false, true]);
    expect(hasSchemaType(blocks[0].data)).toBe(true);
    expect(hasSchemaType(blocks[2].data)).toBe(false);
    expect(hasSchemaType({ '@graph': [{ '@type': 'A' }] })).toBe(true);
    expect(hasSchemaType([])).toBe(false);
  });

  it('resolves only same-site links onto the base', () => {
    const page = `${BASE}/blog/post`;
    const origins = ['https://waffuru.ai'];
    const resolve = (href) => resolveInternal(href, page, BASE, origins);
    expect(resolve('/about#team')).toBe(`${BASE}/about`);
    expect(resolve('../products')).toBe(`${BASE}/products`);
    expect(resolve('https://waffuru.ai/legal/terms?a=1')).toBe(
      `${BASE}/legal/terms?a=1`,
    );
    expect(resolve('https://example.com/x')).toBeNull();
    expect(resolve('https://docs.waffuru.ai')).toBeNull();
    expect(resolve('mailto:hello@waffuru.ai')).toBeNull();
    expect(resolve('#top')).toBeNull();
    expect(resolve('')).toBeNull();
  });

  it('normalises trailing slashes and hashes for comparison', () => {
    expect(normalizeUrl('https://waffuru.ai/')).toBe('https://waffuru.ai/');
    expect(normalizeUrl('https://waffuru.ai')).toBe('https://waffuru.ai/');
    expect(normalizeUrl('https://waffuru.ai/about/#x')).toBe(
      'https://waffuru.ai/about',
    );
  });

  it('collects anchors ignoring script payloads', () => {
    const html = `<a href="/a">x</a><a name="n">y</a><script>"<a href='/no'>"</script><a href="/b" class="c">z</a>`;
    expect(getLinks(html)).toEqual(['/a', '/b']);
  });

  it('classifies images by alt', () => {
    const html = `<img src="/a.png" alt="A logo"/><img src="/b.png"/>
      <img src="/c.png" alt="" aria-hidden="true"/><img src="/d.png" alt=""/>`;
    expect(
      getImages(html).map((img) => [img.hasAlt, img.alt, img.decorative]),
    ).toEqual([
      [true, 'A logo', false],
      [false, '', false],
      [true, '', true],
      [true, '', false],
    ]);
  });

  it('maps paths to locales and locales to description limits', () => {
    expect(localeOfPath('/ja/about')).toBe('ja');
    expect(localeOfPath('/ja')).toBe('ja');
    expect(localeOfPath('/ja.md')).toBe('ja');
    expect(localeOfPath('/about')).toBe('en');
    expect(localeOfPath('/blog/ja')).toBe('en');
    expect(descriptionLimits('ko').max).toBeLessThan(
      descriptionLimits('en').max,
    );
  });

  it('evaluates robots.txt groups for a given agent', () => {
    const txt = `User-agent: *\nDisallow: /\n\nUser-agent: GPTBot\nUser-agent: ClaudeBot\nAllow: /\nContent-Signal: ai-train=no\nDisallow: /api/\n`;
    expect(parseRobots(txt)).toHaveLength(2);
    expect(parseRobots(txt)[1].signals).toEqual(['ai-train=no']);
    expect(robotsAllowsRoot(txt, 'GPTBot')).toBe(true);
    expect(robotsAllowsRoot(txt, 'Bingbot')).toBe(false);
    expect(
      robotsAllowsRoot('User-agent: *\nDisallow: /private', 'GPTBot'),
    ).toBe(true);
  });

  it('lists markdown links and reads security.txt expiry', () => {
    expect(
      markdownLinks('- [a](https://waffuru.ai/a.md): x\n- [b](/relative)\n'),
    ).toEqual(['https://waffuru.ai/a.md']);
    expect(
      securityExpires(
        'Contact: x\nExpires: 2030-01-01T00:00:00.000Z\n',
      )?.getUTCFullYear(),
    ).toBe(2030);
    expect(securityExpires('Contact: x')).toBeNull();
    expect(securityExpires('Expires: nonsense')).toBeNull();
  });

  it('reads --base, --concurrency and SITE_BASE', () => {
    expect(parseArgs([], {}).base).toBe('http://127.0.0.1:8787');
    expect(parseArgs([], { SITE_BASE: 'http://x:1/' }).base).toBe('http://x:1');
    expect(
      parseArgs(['--base', 'https://a.dev/', '--concurrency', '3'], {}),
    ).toMatchObject({ base: 'https://a.dev', concurrency: 3 });
  });
});

describe('checkPage', () => {
  const ctx = {
    base: BASE,
    siteOrigins: ['https://waffuru.ai'],
    canonicalMustMatch: true,
  };
  const page = (html, status = 200, type = 'text/html; charset=utf-8') => ({
    status,
    type,
    text: html,
  });

  it('fails a page with no content and flags a non-200', () => {
    const result = checkPage(`${BASE}/x`, page('<html lang="en"></html>'), ctx);
    expect(result.fails).toEqual(
      expect.arrayContaining([
        '0 <h1> (expected 1)',
        'missing <title>',
        'missing meta description',
        'missing canonical',
        'missing og:image',
      ]),
    );
    expect(checkPage(`${BASE}/x`, page('', 404), ctx).fails).toEqual([
      'status 404',
    ]);
  });
});

/* A fake site, served over HTTP, to run the whole crawl against. ------------ */

const SHORT =
  'A description of the page that is long enough to pass the check.';

function html({
  lang = 'en',
  title = 'About · Waffuru',
  description = SHORT,
  canonical,
  hreflangs = [],
  h1 = '<h1>Heading</h1>',
  image = 'https://waffuru.ai/og/en/index.png',
  markdown,
  body = '',
}) {
  return `<!DOCTYPE html><html lang="${lang}"><head><title>${title}</title>
<meta name="description" content="${description}"/>
<link rel="canonical" href="${canonical}"/>
${hreflangs.map(([code, href]) => `<link rel="alternate" hrefLang="${code}" href="${href}"/>`).join('\n')}
<link rel="alternate" type="text/markdown" href="${markdown}"/>
<meta property="og:image" content="${image}"/></head>
<body><main>${h1}${body}</main></body></html>`;
}

const ORIGIN = 'https://waffuru.ai';
const text = (body, type = 'text/plain; charset=utf-8') => ({ body, type });
const SKILL = '---\nname: x\ndescription: y\n---\n';

/** A healthy site as `{ path: route }`; tests then break a piece of it. */
function healthySite() {
  const homeSet = [
    ['en', ORIGIN],
    ['es', `${ORIGIN}/es`],
    ['x-default', ORIGIN],
  ];
  const md = (title) => ({
    type: 'text/markdown; charset=utf-8',
    body: `---\ntitle: "${title}"\n---\n\n# ${title}\n`,
    headers: { vary: 'Accept' },
  });
  const route = (htmlOptions, markdownTitle) => ({
    type: 'text/html; charset=utf-8',
    body: html(htmlOptions),
    headers: { 'x-robots-tag': 'noindex, nofollow' },
    markdown: md(markdownTitle),
  });
  const sitemap = [
    ['/', ['en', 'es']],
    ['/es', ['en', 'es']],
    ['/legal', []],
  ];
  return {
    '/sitemap.xml': text(
      `<urlset xmlns:xhtml="http://www.w3.org/1999/xhtml">${sitemap
        .map(
          ([path]) =>
            `<url><loc>${ORIGIN}${path === '/' ? '' : path}</loc></url>`,
        )
        .join('')}</urlset>`,
      'application/xml',
    ),
    '/': {
      ...route(
        {
          title: 'Waffuru',
          canonical: ORIGIN,
          hreflangs: homeSet,
          markdown: `${ORIGIN}/index.md`,
          body: '<a href="/legal">Legal</a> <a href="https://example.com/x">ext</a> <a href="/iron/install.sh">installer</a>',
        },
        'Waffuru',
      ),
      headers: {
        'x-robots-tag': 'noindex, nofollow',
        link: '</.well-known/api-catalog>; rel="api-catalog", <https://docs.waffuru.ai>; rel="service-doc", </index.md>; rel="alternate"; type="text/markdown", </llms.txt>; rel="describedby"',
      },
    },
    '/es': route(
      {
        lang: 'es',
        title: 'Waffuru',
        canonical: `${ORIGIN}/es`,
        hreflangs: homeSet,
        markdown: `${ORIGIN}/es.md`,
      },
      'Waffuru',
    ),
    '/legal': route(
      {
        title: 'Legal · Waffuru',
        canonical: `${ORIGIN}/legal`,
        hreflangs: [['x-default', `${ORIGIN}/legal`]],
        markdown: `${ORIGIN}/legal.md`,
      },
      'Legal',
    ),
    '/index.md': md('Waffuru'),
    '/es.md': md('Waffuru'),
    '/legal.md': md('Legal'),
    '/og/en/index.png': { type: 'image/png', body: 'png' },
    '/robots.txt': text('User-agent: *\nDisallow: /\n'),
    '/llms.txt': text(
      `# Waffuru\n\n> Summary.\n\n## Pages\n\n- [Home](${ORIGIN}/index.md): Home.\n- [Installer](${ORIGIN}/iron/install.sh): Installer.\n`,
    ),
    '/llms-full.txt': text('# Waffuru: full text\n'),
    '/.well-known/security.txt': text(
      'Contact: mailto:hello@waffuru.ai\nExpires: 2099-01-01T00:00:00.000Z\n',
    ),
    '/.well-known/api-catalog': text(
      JSON.stringify({ linkset: [{ anchor: `${ORIGIN}/iron/releases.json` }] }),
      'application/linkset+json',
    ),
    '/.well-known/agent-skills/index.json': text(
      JSON.stringify({
        $schema: 'https://schemas.agentskills.io/discovery/0.2.0/schema.json',
        skills: [
          {
            name: 'x',
            type: 'skill-md',
            description: 'y',
            url: '/.well-known/agent-skills/x/SKILL.md',
            digest: `sha256:${createHash('sha256').update(SKILL).digest('hex')}`,
          },
        ],
      }),
      'application/json',
    ),
    '/.well-known/agent-skills/x/SKILL.md': text(SKILL, 'text/markdown'),
  };
}

let server;
afterEach(
  () => new Promise((resolve) => (server ? server.close(resolve) : resolve())),
);

/** Serves `routes`; returns the base URL. */
async function serve(routes) {
  server = createServer((req, res) => {
    const path = new URL(req.url, 'http://x').pathname;
    const route = routes[path];
    if (!route) {
      res.writeHead(404, { 'content-type': 'text/html' });
      res.end('<h1>Not found</h1>');
      return;
    }
    const wantsMarkdown = /text\/markdown/.test(req.headers.accept ?? '');
    const chosen = wantsMarkdown && route.markdown ? route.markdown : route;
    res.writeHead(route.status ?? 200, {
      'content-type': chosen.type,
      ...(route.headers ?? {}),
      ...(chosen.headers ?? {}),
    });
    res.end(chosen.body);
  });
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  return `http://127.0.0.1:${server.address().port}`;
}

const crawl = async (routes) =>
  run(['--base', await serve(routes), '--concurrency', '2']);

const messages = (result) =>
  result.failures.map(
    (item) => `[${item.area}] ${item.target}: ${item.message}`,
  );

describe('check-site run', () => {
  it('passes a healthy site', async () => {
    const result = await crawl(healthySite());
    expect(messages(result)).toEqual([]);
    expect(result.pages).toBe(3);
  });

  it('fails a page without exactly one h1', async () => {
    const site = healthySite();
    site['/legal'].body = html({
      title: 'Legal · Waffuru',
      canonical: `${ORIGIN}/legal`,
      hreflangs: [['x-default', `${ORIGIN}/legal`]],
      markdown: `${ORIGIN}/legal.md`,
      h1: '<h1>One</h1><h1>Two</h1>',
    });
    expect(messages(await crawl(site))).toEqual([
      '[page] /legal: 2 <h1> (expected 1)',
    ]);
  });

  it('fails a canonical that points at another page', async () => {
    const site = healthySite();
    site['/legal'].body = site['/legal'].body.replace(
      `${ORIGIN}/legal"/>`,
      `${ORIGIN}/elsewhere"/>`,
    );
    expect(messages(await crawl(site))).toEqual([
      expect.stringContaining('[page] /legal: canonical'),
    ]);
  });

  it('fails hreflang that is not reciprocal or names the wrong language', async () => {
    const site = healthySite();
    // The Spanish page forgets to list the English one.
    site['/es'].body = site['/es'].body
      .replace(`<link rel="alternate" hrefLang="en" href="${ORIGIN}"/>\n`, '')
      .replace(
        `<link rel="alternate" hrefLang="x-default" href="${ORIGIN}"/>`,
        '',
      );
    const found = messages(await crawl(site));
    expect(found).toEqual(
      expect.arrayContaining([
        '[page] /: hreflang es -> /es does not link back',
        '[page] /es: hreflang lacks x-default',
      ]),
    );
  });

  it('fails a share image that is missing or not a PNG', async () => {
    const site = healthySite();
    delete site['/og/en/index.png'];
    expect(messages(await crawl(site))).toEqual([
      expect.stringMatching(/^\[og\] \/og\/en\/index\.png.*status 404/),
    ]);
    const jpeg = healthySite();
    jpeg['/og/en/index.png'].type = 'image/jpeg';
    expect(messages(await crawl(jpeg))).toEqual([
      expect.stringMatching(/^\[og\].*image\/png/),
    ]);
  });

  it('fails when Accept: text/markdown is ignored or lacks Vary', async () => {
    const ignored = healthySite();
    delete ignored['/legal'].markdown;
    expect(messages(await crawl(ignored))).toEqual(
      expect.arrayContaining([
        expect.stringContaining(
          '[markdown] /legal: Accept: text/markdown returned "text/html',
        ),
      ]),
    );
    const noVary = healthySite();
    noVary['/legal'].markdown.headers = {};
    expect(messages(await crawl(noVary))).toEqual([
      '[markdown] /legal: markdown response lacks Vary: Accept',
    ]);
  });

  it('fails a broken internal link but ignores installers and external links', async () => {
    const site = healthySite();
    site['/'].body = site['/'].body.replace(
      '<a href="/legal">',
      '<a href="/gone">gone</a><a href="/legal">',
    );
    expect(messages(await crawl(site))).toEqual([
      expect.stringContaining('[link] /gone: resolves 404'),
    ]);
  });

  it('fails when unknown URLs do not return 404', async () => {
    const site = healthySite();
    site['/this-page-does-not-exist'] = text('<h1>Oops</h1>', 'text/html');
    expect(messages(await crawl(site))).toEqual([
      '[404] /this-page-does-not-exist: status 200 (expected 404)',
    ]);
  });

  it('fails discovery files with the wrong type or a bad digest', async () => {
    const site = healthySite();
    site['/.well-known/api-catalog'].type = 'application/json';
    site['/llms.txt'].type = 'text/html';
    site['/.well-known/agent-skills/x/SKILL.md'] = text(
      'tampered',
      'text/markdown',
    );
    const found = messages(await crawl(site));
    expect(found).toEqual(
      expect.arrayContaining([
        expect.stringContaining('api-catalog: content-type "application/json"'),
        expect.stringContaining('[file] /llms.txt: content-type "text/html"'),
        expect.stringContaining('digest'),
      ]),
    );
  });

  it('fails a non-production host that does not block crawlers', async () => {
    const site = healthySite();
    site['/robots.txt'] = text('User-agent: *\nAllow: /\n');
    expect(messages(await crawl(site))).toEqual([
      '[robots] /robots.txt: a non-production host must disallow everything',
    ]);
  });

  it('fails when the sitemap is missing', async () => {
    const site = healthySite();
    delete site['/sitemap.xml'];
    const result = await crawl(site);
    expect(messages(result)).toEqual(['[sitemap] /sitemap.xml: status 404']);
  });
});
