import { describe, expect, it } from 'vitest';

import { solutionLinks } from '@/content/navigation';
import { solutionsOverview } from '@/content/pages/solutions/overview';
import {
  getSolution,
  solutionPath,
  solutionSlugs,
  solutions,
} from '@/content/pages/solutions/registry';
import { solutionsShared } from '@/content/pages/solutions/shared';

/** Every string in a value, however deeply nested. */
function strings(value: unknown): string[] {
  if (typeof value === 'string') return [value];
  if (Array.isArray(value)) return value.flatMap(strings);
  if (value && typeof value === 'object') {
    return Object.values(value).flatMap(strings);
  }
  return [];
}

const HYPE =
  /revolutionary|game-changing|seamless|unleash|supercharge|cutting-edge/i;

describe('solutions registry', () => {
  it('covers the four audiences, in navigation order', () => {
    expect(solutionSlugs).toEqual([
      'small-business',
      'enterprise',
      'neoclouds',
      'ai-companies',
    ]);
    expect(solutionSlugs.map(solutionPath)).toEqual(
      solutionLinks.map((link) => link.href),
    );
  });

  it('returns undefined for unknown slugs', () => {
    expect(getSolution('startups', 'en')).toBeUndefined();
  });

  it('returns the requested locale’s copy', () => {
    expect(getSolution('enterprise', 'ja')).toBe(solutions.enterprise.ja);
  });
});

describe.each(solutionSlugs)('%s content', (slug) => {
  const page = solutions[slug].en;

  it('has the sections the template needs', () => {
    expect(page.useCases.items.length).toBeGreaterThanOrEqual(3);
    expect(page.useCases.items.length).toBeLessThanOrEqual(4);
    expect(page.faq.length).toBeGreaterThanOrEqual(4);
    expect(page.faq.length).toBeLessThanOrEqual(5);
    expect(page.stackFit.items.length).toBeGreaterThanOrEqual(3);
    expect(page.whereWeAre.notes.length).toBeGreaterThan(0);
  });

  it('has an accent word in each serif heading', () => {
    const headings = [
      page.hero.title,
      page.problem.title,
      page.useCases.title,
      page.stackFit.title,
      page.whereWeAre.title,
      page.cta.title,
    ];
    for (const heading of headings) expect(heading).toMatch(/\*[^*]+\*/);
  });

  it('lists each product once', () => {
    const products = page.stackFit.items.map((item) => item.product);
    expect(new Set(products).size).toBe(products.length);
    for (const product of products) {
      expect(solutionsShared.en.products[product].href).toBe(
        `/products/${product}`,
      );
    }
  });

  it('sets seo keywords', () => {
    expect(page.seo.keywords?.length).toBeGreaterThanOrEqual(4);
  });

  it('keeps to the voice: no hype words, no exclamation marks', () => {
    for (const text of strings(page)) {
      expect(text).not.toMatch(HYPE);
      expect(text).not.toContain('!');
    }
  });

  it('never names internal products', () => {
    for (const text of strings(page)) {
      expect(text).not.toMatch(/\b(Morpheus|wrunner|wci|Juke|wOS)\b/);
    }
  });
});

describe('overview and shared content', () => {
  const overview = solutionsOverview.en;

  it('has the three shared value props', () => {
    expect(overview.values.items.map((item) => item.tag)).toEqual([
      'cost',
      'inference',
      'control',
    ]);
  });

  it('keeps to the voice', () => {
    for (const text of [...strings(overview), ...strings(solutionsShared.en)]) {
      expect(text).not.toMatch(HYPE);
      expect(text).not.toContain('!');
    }
  });

  it('states the hardware tiers honestly', () => {
    const tiers = solutionsShared.en.hardware.tiers;
    expect(tiers.map((tier) => [tier.name, tier.status])).toEqual([
      ['Apple · Metal', 'primary'],
      ['NVIDIA · CUDA', 'secondary'],
      ['AMD ROCm · Vulkan', 'runs'],
    ]);
    expect(
      solutionsShared.en.hardware.runsOn.find((chip) => chip.inProgress),
    ).toBeDefined();
  });
});
