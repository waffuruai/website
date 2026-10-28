// @vitest-environment node
import { join } from 'node:path';

import { afterEach, describe, expect, it } from 'vitest';

import { checkLinks, targetsOf } from './links.mjs';
import { pageHtml, tempDirs } from './test-utils.mjs';

const { make, cleanup } = tempDirs();
afterEach(cleanup);

const PRODUCTS = JSON.stringify([
  { product: 'iron', repo: 'waffuruai/iron', asset: 'install.sh' },
]);

const links = (...hrefs) =>
  pageHtml({
    body: `<h1 id="top">Home</h1>${hrefs.map((href) => `<a href="${href}">x</a>`).join('')}`,
  });

/** A repo root with `out/` holding `pages`, plus the release manifest. */
async function site(pages) {
  const root = await make({
    'releases/products.json': PRODUCTS,
    'out/en/about.html': pageHtml({ body: '<h1 id="team">About</h1>' }),
    'out/es/about.html': pageHtml({ lang: 'es' }),
    'out/en/blog/feed.xml': '<rss/>',
    'out/img/logo.png': 'png',
    ...Object.fromEntries(
      Object.entries(pages).map(([file, html]) => [`out/${file}`, html]),
    ),
  });
  return { root, out: join(root, 'out') };
}

describe('targetsOf', () => {
  it('maps pages onto their locale and files onto out/ or out/en', () => {
    expect(targetsOf('/', [])).toEqual(['/en.html']);
    expect(targetsOf('/about/', [])).toEqual(['/en/about.html']);
    expect(targetsOf('/ja/about', [])).toEqual(['/ja/about.html']);
    expect(targetsOf('/blog/feed.xml', [])).toEqual([
      '/blog/feed.xml',
      '/en/blog/feed.xml',
    ]);
  });

  it('skips installers, the API and Next assets', () => {
    expect(targetsOf('/iron/install.sh', ['iron'])).toBeNull();
    expect(targetsOf('/api/subscribe', [])).toBeNull();
    expect(targetsOf('/_next/static/x.js', [])).toBeNull();
  });
});

describe('checkLinks', () => {
  it('passes when every link and anchor resolves', async () => {
    const paths = await site({
      'en.html': links(
        '/about',
        '/es/about',
        '/about#team',
        '#top',
        'https://waffuru.ai/about',
        '/blog/feed.xml',
        '/img/logo.png',
        '/iron/install.sh',
        'https://github.com/waffuruai',
        'mailto:hello@waffuru.ai',
      ),
    });
    await expect(checkLinks(paths)).resolves.toBeUndefined();
  });

  it('names every link to a page or anchor that was not built', async () => {
    const paths = await site({
      'en.html': links('/products/iron', '/about#nope', '#missing', '/about'),
      'ja.html': links('/ja/solutions'),
    });
    const error = await checkLinks(paths).catch((caught) => caught);
    expect(error).toBeInstanceOf(Error);
    expect(error.message).toContain('en.html → /products/iron');
    expect(error.message).toContain('en.html → /about#nope (no #nope)');
    expect(error.message).toContain('en.html → #missing (no #missing)');
    expect(error.message).toContain('ja.html → /ja/solutions');
    expect(error.message).not.toContain('→ /about\n');
  });
});
