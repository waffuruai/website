// @vitest-environment node
/*
 * Checks on the hand-written files in public/ that agents and Cloudflare read:
 * _headers, security.txt, the install skill and the releases schema.
 */
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { describe, expect, it } from 'vitest';

import { assertValidSkill, skillMeta } from './well-known.mjs';

const ROOT = fileURLToPath(new URL('../..', import.meta.url));
const read = (file) => readFile(join(ROOT, file), 'utf8');
const products = JSON.parse(await read('releases/products.json'));

/** `_headers` as `[{ path, headers: { name: value } }]`. */
function parseHeaders(text) {
  const rules = [];
  for (const line of text.split('\n')) {
    if (!line.trim() || line.trimStart().startsWith('#')) continue;
    if (/^\s/.test(line)) {
      const at = line.indexOf(':');
      rules
        .at(-1)
        .headers.push([line.slice(0, at).trim(), line.slice(at + 1).trim()]);
    } else rules.push({ path: line.trim(), headers: [] });
  }
  return rules;
}

describe('public/_headers', async () => {
  const text = await read('public/_headers');
  const rules = parseHeaders(text);
  const headersFor = (path) =>
    Object.fromEntries(rules.find((rule) => rule.path === path)?.headers ?? []);

  it('stays inside Cloudflare limits', () => {
    expect(rules.length).toBeLessThanOrEqual(100);
    for (const line of text.split('\n')) {
      expect(line.length).toBeLessThanOrEqual(2000);
    }
  });

  it('gives every rule at least one header, and never repeats a path', () => {
    for (const rule of rules)
      expect(rule.headers.length, rule.path).toBeGreaterThan(0);
    const paths = rules.map((rule) => rule.path);
    expect(new Set(paths).size).toBe(paths.length);
  });

  it('never sets one header from two rules that match the same file', () => {
    // A path can match its own rule and a splat rule above it; those must set
    // different headers, or Cloudflare joins the values.
    const splats = rules.filter((rule) => rule.path.endsWith('/*'));
    for (const splat of splats) {
      const prefix = splat.path.slice(0, -1);
      const names = new Set(splat.headers.map(([name]) => name.toLowerCase()));
      for (const rule of rules) {
        if (rule === splat || !rule.path.startsWith(prefix)) continue;
        for (const [name] of rule.headers) {
          expect(
            names.has(name.toLowerCase()),
            `${rule.path} vs ${splat.path}: ${name}`,
          ).toBe(false);
        }
      }
    }
  });

  it('caches build output and images for a long time', () => {
    expect(headersFor('/_next/static/*')['Cache-Control']).toBe(
      'public, max-age=31536000, immutable',
    );
    for (const path of ['/img/*', '/og/*', '/logos/*']) {
      const age = Number(
        headersFor(path)['Cache-Control'].match(/max-age=(\d+)/)[1],
      );
      expect(age, path).toBeGreaterThanOrEqual(604800);
    }
  });

  it('types the discovery files', () => {
    expect(headersFor('/.well-known/api-catalog')['Content-Type']).toBe(
      'application/linkset+json',
    );
    for (const path of ['/llms.txt', '/llms-full.txt']) {
      expect(headersFor(path)['Content-Type']).toBe(
        'text/plain; charset=utf-8',
      );
    }
  });

  it('covers every installer product with a short cache, nosniff and text/plain scripts', () => {
    for (const { product, asset } of products) {
      const all = headersFor(`/${product}/*`);
      expect(all['Cache-Control'], product).toBe('public, max-age=300');
      expect(all['X-Content-Type-Options'], product).toBe('nosniff');
      for (const path of [
        `/${product}/${asset}`,
        `/${product}/${asset}.sha256`,
        `/${product}/:tag/${asset}`,
        `/${product}/:tag/${asset}.sha256`,
      ]) {
        expect(headersFor(path)['Content-Type'], path).toBe(
          'text/plain; charset=utf-8',
        );
      }
    }
  });

  it('has no rule for an installer path that is not in the manifest', () => {
    const names = products.map((entry) => entry.product);
    const installerLike = rules
      .map((rule) => rule.path.split('/')[1])
      .filter(
        (segment) =>
          segment &&
          ![
            '_next',
            'img',
            'og',
            'logos',
            '.well-known',
            'llms.txt',
            'llms-full.txt',
            'sitemap.xml',
          ].includes(segment),
      );
    for (const segment of installerLike) expect(names).toContain(segment);
  });

  it('matches the bypass list in wrangler.jsonc', async () => {
    const wrangler = await read('wrangler.jsonc');
    for (const rule of rules) {
      const first = `/${rule.path.split('/')[1]}`;
      const covered =
        wrangler.includes(`"!${first}/*"`) || wrangler.includes(`"!${first}"`);
      expect(covered, `${rule.path} is served by the Worker`).toBe(true);
    }
  });
});

describe('public/.well-known/security.txt', async () => {
  const text = await read('public/.well-known/security.txt');
  const field = (name) => text.match(new RegExp(`^${name}: (.+)$`, 'm'))?.[1];

  it('has the RFC 9116 fields we promise', () => {
    expect(field('Contact')).toBe('mailto:hello@waffuru.ai?subject=Security');
    expect(field('Preferred-Languages')).toBe('en');
    expect(field('Canonical')).toBe(
      'https://waffuru.ai/.well-known/security.txt',
    );
    expect(field('Policy')).toBe('https://waffuru.ai/support');
  });

  it('has an Expires date at least a month away (renew it when this fails)', () => {
    const expires = new Date(field('Expires'));
    expect(Number.isNaN(expires.getTime())).toBe(false);
    expect(expires.getTime() - Date.now()).toBeGreaterThan(30 * 86_400_000);
  });
});

describe('the install-waffuru skill', async () => {
  const text = await read(
    'public/.well-known/agent-skills/install-waffuru/SKILL.md',
  );

  it('has valid front matter', () => {
    expect(() =>
      assertValidSkill('install-waffuru', skillMeta(text)),
    ).not.toThrow();
  });

  it('points at the installer URLs the release manifest publishes', () => {
    for (const name of ['iron', 'butter']) {
      const entry = products.find((item) => item.product === name);
      expect(entry, name).toBeDefined();
      expect(text).toContain(`https://waffuru.ai/${name}/${entry.asset}`);
    }
    expect(text).toContain('install.sh.sha256');
    expect(text).toContain('# waffuru release:');
  });

  it('does not name internal products', () => {
    expect(text).not.toMatch(/wrunner|wci|morpheus|juke|wOS/i);
  });
});

describe('public/.well-known/releases.schema.json', async () => {
  const schema = JSON.parse(
    await read('public/.well-known/releases.schema.json'),
  );
  const script = await read('scripts/fetch-releases.sh');

  /** The key sets of the objects fetch-releases.sh builds with jq. */
  const keySets = [...script.matchAll(/\{((?:\w+: \$\w+(?:, )?)+)\}/g)].map(
    (match) =>
      match[1]
        .split(', ')
        .map((pair) => pair.split(':')[0])
        .sort(),
  );

  it('describes exactly what fetch-releases.sh writes', () => {
    expect(keySets).toHaveLength(2);
    expect([...schema.required].sort()).toEqual(
      keySets.find((keys) => keys.includes('product')),
    );
    expect([...schema.properties.releases.items.required].sort()).toEqual(
      keySets.find((keys) => keys.includes('tag')),
    );
  });
});
