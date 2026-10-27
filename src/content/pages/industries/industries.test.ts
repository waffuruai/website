import { describe, expect, it } from 'vitest';

import { industryLinks } from '@/content/navigation';
import { industriesOverview } from '@/content/pages/industries/overview';
import {
  getIndustry,
  industries,
  industryPath,
  industrySlugs,
} from '@/content/pages/industries/registry';
import { pantryFacts } from '@/content/pages/pantry/facts';
import { solutionsShared } from '@/content/pages/solutions/shared';
import { locales } from '@/i18n/config';

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

/** Compliance names we may not claim (sales guardrails), in any language. */
const COMPLIANCE =
  /FedRAMP|\bIL ?[2-6]\b|\bITAR\b|\bCMMC\b|HIPAA|\bGxP\b|SOC ?2|\bPCI\b|air[- ]?gap/i;

/** Needs founder confirmation before it appears in rendered copy. */
const UNCONFIRMED = /\b(offline|disconnected|air-gapped|edge)\b/i;

const everyLocale = locales.flatMap((locale) => [
  ...industrySlugs.map((slug) => ({
    id: `${slug}/${locale}`,
    content: industries[slug][locale],
  })),
  { id: `overview/${locale}`, content: industriesOverview[locale] },
]);

describe('industries registry', () => {
  it('covers the five sectors, in navigation order', () => {
    expect(industrySlugs).toEqual([
      'cloud-infrastructure',
      'financial-services',
      'life-sciences',
      'government',
      'military',
    ]);
    expect(industrySlugs.map(industryPath)).toEqual(
      industryLinks.map((link) => link.href),
    );
  });

  it('returns undefined for unknown slugs', () => {
    expect(getIndustry('retail', 'en')).toBeUndefined();
  });

  it('returns the requested locale’s copy', () => {
    expect(getIndustry('government', 'ko')).toBe(industries.government.ko);
  });
});

describe.each(industrySlugs)('%s content', (slug) => {
  const page = industries[slug].en;

  it('has the sections the template needs', () => {
    expect(page.useCases.items.length).toBeGreaterThanOrEqual(3);
    expect(page.useCases.items.length).toBeLessThanOrEqual(4);
    expect(page.faq.length).toBeGreaterThanOrEqual(4);
    expect(page.faq.length).toBeLessThanOrEqual(5);
    expect(page.stackFit.items.length).toBeGreaterThanOrEqual(3);
    expect(page.whereWeAre.notes.length).toBeGreaterThan(0);
    expect(page.sample).toBeUndefined();
  });

  it('has an accent word in each serif heading, in every locale', () => {
    for (const locale of locales) {
      const copy = industries[slug][locale]!;
      const headings = [
        copy.card.title,
        copy.hero.title,
        copy.problem.title,
        copy.useCases.title,
        copy.stackFit.title,
        copy.whereWeAre.title,
        copy.cta.title,
      ];
      for (const heading of headings) expect(heading).toMatch(/\*[^*]+\*/);
    }
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

  it('is honest about where we are: early access, closed source', () => {
    expect(page.whereWeAre.lede).toMatch(/early access/i);
    expect(page.cta.body).toMatch(/^Early access, closed source for now\./);
  });

  it('claims nothing that needs founder confirmation', () => {
    for (const text of strings(page)) {
      expect(text).not.toMatch(UNCONFIRMED);
      expect(text).not.toMatch(/open core/i);
    }
  });

  it('never names internal products', () => {
    for (const text of strings(page)) {
      expect(text).not.toMatch(/\b(Morpheus|wrunner|wci|Juke|wOS)\b/);
    }
  });
});

describe.each(everyLocale)('$id voice and guardrails', ({ content }) => {
  it('has no hype words or exclamation marks', () => {
    for (const text of strings(content)) {
      expect(text).not.toMatch(HYPE);
      expect(text).not.toMatch(/[!！]/);
    }
  });

  it('names no compliance regime or certification', () => {
    for (const text of strings(content)) expect(text).not.toMatch(COMPLIANCE);
  });

  it('quotes no speed numbers and no comparison with other engines', () => {
    for (const text of strings(content)) {
      expect(text).not.toMatch(/\d+\s*(x|×|%)|tok\/s|tokens? per second/i);
      expect(text).not.toMatch(/faster than (vLLM|SGLang|llama|other)/i);
    }
  });
});

describe('military', () => {
  it('links Pantry for hardening the machines, and nothing more', () => {
    const links = industries.military.en.useCases.items.flatMap((item) =>
      item.link ? [item.link] : [],
    );
    expect(links).toEqual([
      { label: 'Explore Pantry', href: pantryFacts.path },
    ]);
  });
});

describe('overview', () => {
  const overview = industriesOverview.en;

  it('has the three shared value props', () => {
    expect(overview.values.items.map((item) => item.tag)).toEqual([
      'cost',
      'inference',
      'control',
    ]);
  });

  it('has an accent word in each serif heading', () => {
    for (const heading of [
      overview.hero.title,
      overview.cards.title,
      overview.values.title,
      overview.cta.title,
      ...overview.values.items.map((item) => item.title),
    ]) {
      expect(heading).toMatch(/\*[^*]+\*/);
    }
  });
});
