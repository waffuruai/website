import { readFile } from 'node:fs/promises';
import path from 'node:path';

import { afterEach, describe, expect, it, vi } from 'vitest';

import { navigation } from '@/content/navigation';
import {
  LEGAL_DIRECTORY,
  formatPolicyDate,
  getAllPolicies,
  listPolicySlugs,
  loadPolicy,
  loadPolicyHeadings,
} from '@/lib/legal';

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
const sourceOf = (slug: string) =>
  readFile(path.join(process.cwd(), LEGAL_DIRECTORY, slug, 'page.mdx'), 'utf8');

/** The text a reader sees: MDX comments (TODOs for the founder) removed. */
const rendered = (source: string) =>
  source.replace(/\{\/\*[\s\S]*?\*\/\}/g, '');

afterEach(() => {
  vi.doUnmock('@/content/legal/terms/page.mdx');
  vi.resetModules();
});

describe('legal policies', () => {
  it('finds a folder for terms, privacy and cookies', async () => {
    expect(await listPolicySlugs()).toEqual(
      expect.arrayContaining(['terms', 'privacy', 'cookies']),
    );
  });

  it('lists published policies with well-formed metadata, main three first', async () => {
    const policies = await getAllPolicies();
    expect(policies.map((policy) => policy.slug).slice(0, 3)).toEqual([
      'terms',
      'privacy',
      'cookies',
    ]);

    for (const policy of policies) {
      expect(policy.slug).toMatch(/^[a-z0-9-]+$/);
      expect(policy.title.length).toBeGreaterThan(5);
      expect(policy.description.length).toBeGreaterThan(20);
      expect(policy.date).toMatch(ISO_DATE);
      expect(Number.isNaN(Date.parse(policy.date))).toBe(false);
      expect(policy.published).toBe(true);
    }
  });

  it('dates the three policies 2026-10-26', async () => {
    const policies = await getAllPolicies();
    expect(policies.map((policy) => policy.date)).toEqual([
      '2026-10-26',
      '2026-10-26',
      '2026-10-26',
    ]);
  });

  it('never lists or loads an unpublished policy', async () => {
    vi.resetModules();
    vi.doMock('@/content/legal/terms/page.mdx', () => ({
      default: () => null,
      policy: {
        title: 'Terms of use',
        description: 'A draft that is not ready.',
        date: '2026-10-26',
        published: false,
      },
    }));
    const legal = await import('@/lib/legal');

    expect(await legal.loadPolicy('terms')).toBeNull();
    const slugs = (await legal.getAllPolicies()).map((policy) => policy.slug);
    expect(slugs).not.toContain('terms');
    expect(slugs).toEqual(expect.arrayContaining(['privacy', 'cookies']));
  });

  it('loads a policy module and refuses slugs that are not policies', async () => {
    const loaded = await loadPolicy('privacy');
    expect(loaded?.policy.title).toBe('Privacy policy');
    expect(typeof loaded?.default).toBe('function');

    expect(await loadPolicy('nope')).toBeNull();
    expect(await loadPolicy('../terms')).toBeNull();
    expect(await loadPolicy('')).toBeNull();
  });

  it('every footer legal link resolves to a published policy (no 404s)', async () => {
    const slugs = (await getAllPolicies()).map((policy) => policy.slug);
    expect(navigation.footer.legal.length).toBeGreaterThan(0);
    for (const { href } of navigation.footer.legal) {
      expect(href).toMatch(/^\/legal\/[a-z0-9-]+$/);
      expect(slugs).toContain(href.replace('/legal/', ''));
    }
  });
});

describe('policy headings (table of contents)', () => {
  it.each(['terms', 'privacy', 'cookies'])(
    'extracts the ## headings of %s, with unique ids',
    async (slug) => {
      const headings = await loadPolicyHeadings(slug);
      const source = await sourceOf(slug);
      const expected = [...source.matchAll(/^##\s+(.+?)\s*$/gm)].map(
        (match) => match[1],
      );

      // Three or more headings is what turns the contents list on.
      expect(headings.length).toBeGreaterThanOrEqual(3);
      expect(headings.map((heading) => heading.text)).toEqual(expected);
      const ids = headings.map((heading) => heading.id);
      expect(new Set(ids).size).toBe(ids.length);
      for (const id of ids) expect(id).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
    },
  );

  it('returns nothing for a policy that does not exist', async () => {
    expect(await loadPolicyHeadings('nope')).toEqual([]);
  });

  it('keeps in-page links pointing at real headings', async () => {
    for (const slug of ['terms', 'privacy', 'cookies']) {
      const ids = (await loadPolicyHeadings(slug)).map((heading) => heading.id);
      const links = [...(await sourceOf(slug)).matchAll(/\]\(#([^)]+)\)/g)];
      for (const [, id] of links) expect(ids).toContain(id);
    }
  });
});

describe('policy text', () => {
  it('keeps TODOs for the founder in comments, never in the rendered text', async () => {
    for (const slug of ['terms', 'privacy', 'cookies']) {
      const source = await sourceOf(slug);
      expect(rendered(source)).not.toMatch(/TODO|TBD|lorem|\[\[/i);
      for (const [comment] of source.matchAll(/\{\/\*[\s\S]*?\*\/\}/g)) {
        expect(comment).toContain('TODO(founder)');
      }
    }
  });

  it('names the company and its governing law', async () => {
    const terms = rendered(await sourceOf('terms'));
    const privacy = rendered(await sourceOf('privacy'));
    expect(terms).toContain('Waffuru AI Inc., a Delaware corporation');
    expect(terms).toContain('laws of the State of Delaware');
    expect(privacy).toContain('Waffuru AI Inc., a Delaware corporation');
    expect(privacy).toMatch(/Waffuru AI Inc\. decides why and how/);
  });

  it('flags the address and the venue for the founder', async () => {
    const terms = await sourceOf('terms');
    expect(terms).toMatch(
      /TODO\(founder\): add Waffuru AI Inc\.'s registered address/,
    );
    expect(terms).toMatch(/TODO\(founder\): confirm Delaware law/);
    expect(await sourceOf('privacy')).toMatch(
      /TODO\(founder\): add the data controller's registered address/,
    );
  });

  it('covers what the privacy policy has to', async () => {
    const text = rendered(await sourceOf('privacy'));
    for (const topic of [
      'Google Forms',
      'Google Analytics',
      'Consent Mode v2',
      'Global Privacy Control',
      'Cloudflare',
      'GDPR',
      'UK GDPR',
      'CCPA',
      'PIPEDA',
      'We do not sell personal information',
      'stays on that machine',
      'Children',
      'hello@waffuru.ai',
    ]) {
      expect(text).toContain(topic);
    }
  });

  it('lists the cookies and storage the site really uses', async () => {
    const text = rendered(await sourceOf('cookies'));
    for (const name of [
      'waffuru-theme',
      'waffuru-locale',
      '_ga',
      '_ga_<container-id>',
    ]) {
      expect(text).toContain(`\`${name}\``);
    }
    expect(text).toContain('Cookie settings');
    expect(text).toContain('Global Privacy Control');
  });

  it('covers the terms the brief asks for', async () => {
    const text = rendered(await sourceOf('terms'));
    for (const topic of [
      'Early-Access Program',
      'as is',
      'Feedback',
      'Intellectual property',
      'Acceptable use',
      'Third-party links',
      'Disclaimers',
      'Limitation of liability',
      'Changes',
      'Governing law',
      'hello@waffuru.ai',
    ]) {
      expect(text).toContain(topic);
    }
  });

  it('never names the internal products or uses hype words', async () => {
    for (const slug of ['terms', 'privacy', 'cookies']) {
      const text = rendered(await sourceOf(slug));
      expect(text).not.toMatch(/\b(wOS|Morpheus|wrunner|wci|Juke)\b/);
      expect(text).not.toMatch(
        /revolutionary|game-changing|seamless|supercharge/i,
      );
      expect(text).not.toContain('!');
    }
  });
});

describe('formatPolicyDate', () => {
  it('writes the date out in English, in UTC', () => {
    expect(formatPolicyDate('2026-10-26')).toBe('October 26, 2026');
    expect(formatPolicyDate('2027-01-01')).toBe('January 1, 2027');
  });
});
