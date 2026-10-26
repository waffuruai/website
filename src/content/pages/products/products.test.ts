import { describe, expect, it } from 'vitest';

import {
  audienceHrefs,
  audienceKeys,
  productCopy,
  productFacts,
  productSlugs,
  productsBottomUp,
  productsOverview,
  productsShared,
  productsTopDown,
  type ProductSlug,
} from '@/content/pages/products';

/** Every string in a content tree, so copy rules apply to all of it. */
function strings(value: unknown): string[] {
  if (typeof value === 'string') return [value];
  if (Array.isArray(value)) return value.flatMap(strings);
  if (value && typeof value === 'object') {
    return Object.values(value).flatMap(strings);
  }
  return [];
}

const accentCount = (text: string) => (text.match(/\*[^*]+\*/g) ?? []).length;

describe('stack order', () => {
  it('lists four products from the metal up, Iron first', () => {
    expect(productSlugs).toEqual(['iron', 'butter', 'waffle', 'syrup']);
    expect(productsBottomUp.map((p) => p.index)).toEqual([
      '01',
      '02',
      '03',
      '04',
    ]);
    expect(productsTopDown.map((p) => p.slug)).toEqual([
      'syrup',
      'waffle',
      'butter',
      'iron',
    ]);
  });

  it('gives every product a route under /products', () => {
    for (const slug of productSlugs) {
      expect(productFacts[slug].path).toBe(`/products/${slug}`);
    }
  });

  it('points every audience at a solutions page', () => {
    expect(audienceKeys.map((key) => audienceHrefs[key])).toEqual([
      '/solutions/small-business',
      '/solutions/enterprise',
      '/solutions/neoclouds',
      '/solutions/ai-companies',
    ]);
  });
});

describe.each(productSlugs)('%s content', (slug: ProductSlug) => {
  const copy = productCopy[slug].en;
  const facts = productFacts[slug];

  it('has one gold accent word in each heading that has one', () => {
    for (const heading of [
      copy.hero.title,
      copy.story.heading,
      copy.capabilities.heading,
      copy.specs.heading,
      copy.stack.heading,
      copy.cta.title,
      ...(copy.code ? [copy.code.heading] : []),
      ...(copy.platforms ? [copy.platforms.heading] : []),
      ...(copy.extras ?? []).map((section) => section.heading),
    ]) {
      expect(accentCount(heading), heading).toBe(1);
    }
  });

  it('is complete enough to be honest', () => {
    expect(copy.hero.highlights).toHaveLength(3);
    expect(copy.story.outcomes.length).toBeGreaterThanOrEqual(3);
    expect(copy.capabilities.items.length).toBeGreaterThanOrEqual(4);
    expect(copy.capabilities.items.length).toBeLessThanOrEqual(6);
    expect(copy.specs.rows.length).toBeGreaterThanOrEqual(5);
    expect(copy.faq.length).toBeGreaterThanOrEqual(4);
    expect(copy.faq.length).toBeLessThanOrEqual(6);
  });

  it('says plainly that it is closed source during early access', () => {
    const openSource = copy.faq.find((item) =>
      /open source/i.test(item.question),
    );
    expect(openSource?.answer).toMatch(/closed source/i);
    expect(openSource?.answer).toMatch(/early access/i);
  });

  it('has a code sample exactly when its copy introduces one', () => {
    expect(Boolean(facts.code)).toBe(Boolean(copy.code));
  });

  it('has a docs label exactly when it links to the docs', () => {
    expect(Boolean(copy.cta.docsLabel)).toBe(facts.secondaryCta === 'docs');
  });

  it('keeps the voice: no hype words, no exclamation marks, no speed claims', () => {
    // The one measured number lives in the "How fast is it?" answer, which
    // repeats the homepage's measurement and points at its test conditions.
    const measured = copy.faq.find((item) =>
      /how fast/i.test(item.question),
    )?.answer;
    if (measured) {
      expect(measured).toMatch(/test conditions/i);
      expect(measured).toMatch(/depend on model/i);
    }
    for (const text of strings(copy)) {
      expect(text).not.toMatch(
        /revolutionary|game-changing|seamless|unleash|supercharge|cutting-edge|blazing/i,
      );
      expect(text).not.toContain('!');
      if (text !== measured)
        expect(text).not.toMatch(/tok\/s|tokens per second|\d+\s?x faster/i);
      // Names that are internal or undecided stay off the site.
      expect(text).not.toMatch(/\b(wrunner|wci|morpheus|juke)\b/i);
    }
  });
});

describe('hardware tiers', () => {
  it.each(['iron', 'butter'] as const)(
    '%s ranks Metal over CUDA over the rest',
    (slug) => {
      const tiers = productCopy[slug].en.platforms?.tiers ?? [];
      expect(tiers.map((tier) => [tier.platform, tier.level])).toEqual([
        ['Apple · Metal', 'primary'],
        ['NVIDIA · CUDA', 'secondary'],
        ['AMD ROCm · Vulkan', 'runs'],
      ]);
    },
  );

  it('keeps tiers off the pages where hardware is not the point', () => {
    expect(productCopy.waffle.en.platforms).toBeUndefined();
    expect(productCopy.syrup.en.platforms).toBeUndefined();
  });

  it('lists the enterprise datacenter GPUs as still in progress', () => {
    const item = productsShared.en.runsOn.items.find((entry) =>
      /datacenter/i.test(entry.label),
    );
    expect(item?.inProgress).toBe(true);
  });
});

describe('product specifics from the brief', () => {
  it('Iron shows the brief’s kernel and its public numbers', () => {
    const { code } = productFacts.iron;
    expect(code?.language).toBe('rust');
    expect(code?.label).toBe('iron · rust dsl');
    expect(code?.source).toContain(
      'pub fn iron_exp<T>(a: Tensor<T>, out: Tensor<T>) {',
    );
    const text = strings(productCopy.iron.en).join(' ');
    expect(text).toContain('1,139');
    expect(text).toContain('4,164');
  });

  it('Butter lists every model family and marks DeepSeek V4 in progress', () => {
    const families = productCopy.butter.en.specs.rows.find(
      (row) => row.term === 'Model families',
    )?.groups;
    expect(families).toHaveLength(16);
    expect(families?.find((group) => group.label === 'DeepSeek')?.text).toBe(
      'V4',
    );
    // No status badges on the Butter page: every family is listed plainly.
    expect(families?.filter((group) => group.inProgress)).toHaveLength(0);
  });

  it('Butter names both APIs and states the quantized KV cache plainly', () => {
    const copy = productCopy.butter.en;
    const api = copy.specs.rows.find((row) => row.term === 'Serving API');
    expect(api?.detail).toMatch(/Chat Completions/);
    expect(api?.detail).toMatch(/Anthropic Messages/);
    const chips = api?.chips?.map((chip) => chip.label);
    expect(chips).toContain('Speculative decoding');
    expect(chips).toContain('LoRA');
    const kv = copy.specs.rows.find((row) => row.term === 'KV cache');
    expect(kv?.detail).toMatch(/Quantized/);
    expect(kv?.detail).not.toMatch(/Apple silicon|on CUDA/);
    // The CUDA host compiles kernels at runtime, so "no JIT" stays off the page.
    for (const text of strings(copy)) expect(text).not.toMatch(/\bJIT\b/);
  });

  it('Butter’s harness and quirks sections are compact and name no PRs', () => {
    const extras = productCopy.butter.en.extras ?? [];
    expect(extras.map((section) => section.id)).toEqual(['agents', 'quirks']);
    for (const section of extras) {
      expect(section.items.length).toBeGreaterThanOrEqual(3);
      expect(section.items.length).toBeLessThanOrEqual(6);
      for (const text of strings(section)) {
        expect(text).not.toMatch(/#\d{2,}/);
        expect(text).not.toMatch(/\bPR\b/);
      }
    }
    const agents = extras.find((section) => section.id === 'agents');
    const quirks = extras.find((section) => section.id === 'quirks');
    expect(agents?.note).toMatch(/Exercised end to end/);
    expect(agents?.note).not.toMatch(/Not there yet/);
    expect(strings(agents).join(' ')).toMatch(/Messages/);
    expect(strings(quirks).join(' ')).toMatch(/Nanbeige/);
    // Every locale carries the same sections, in the same order.
    for (const locale of ['es', 'fr', 'zh', 'ja', 'ko'] as const) {
      expect(
        productCopy.butter[locale]?.extras?.map((section) => section.id),
      ).toEqual(['agents', 'quirks']);
    }
  });

  it('Butter lists no gaps', () => {
    const terms = productCopy.butter.en.specs.rows.map((row) => row.term);
    expect(terms).not.toContain('Not yet');
    for (const text of strings(productCopy.butter.en)) {
      expect(text).not.toMatch(/not there yet|not yet\b/i);
    }
  });

  it('Butter’s snippet is illustrative and keeps placeholders', () => {
    const sample = productFacts.butter.code;
    expect(sample?.source).toContain('butter serve <model>');
    expect(productCopy.butter.en.code?.caption).toMatch(/illustrative/i);
    expect(productCopy.butter.en.code?.caption).toMatch(/not a benchmark/i);
  });

  it('Waffle names the engines it works with', () => {
    const engines = productCopy.waffle.en.specs.rows
      .find((row) => row.term === 'Engines')
      ?.chips?.map((chip) => chip.label);
    expect(engines).toEqual([
      'Butter',
      'vLLM',
      'SGLang',
      'llama.cpp',
      'Other OpenAI-compatible servers',
    ]);
  });

  it('Syrup’s specifics cover retrieval, TurboQuant+, search, citations and MCP', () => {
    const text = productCopy.syrup.en.specs.rows
      .map((row) => `${row.term} ${row.detail ?? ''}`)
      .join(' ');
    expect(text).toMatch(/locally/i);
    expect(text).toContain('TurboQuant+');
    expect(text).toMatch(/lexical plus vector/i);
    expect(text).toMatch(/citations/i);
    expect(text).toContain('MCP');
  });
});

describe('the overview', () => {
  const copy = productsOverview.en;

  it('says what each product does on its own', () => {
    expect(Object.keys(copy.together.alone).sort()).toEqual(
      [...productSlugs].sort(),
    );
  });

  it('describes every audience', () => {
    expect(Object.keys(copy.audience.items).sort()).toEqual(
      [...audienceKeys].sort(),
    );
  });

  it('uses the stack line in the lede', () => {
    expect(copy.hero.lede).toContain('Iron compiles the kernels.');
    expect(copy.hero.lede).toContain('Butter runs models on them.');
    expect(copy.hero.lede).toContain('Waffle watches the GPUs.');
    expect(copy.hero.lede).toContain(
      'Syrup remembers what you were working on.',
    );
  });

  it('keeps the voice', () => {
    for (const text of strings(copy)) {
      expect(text).not.toContain('!');
      expect(text).not.toMatch(
        /revolutionary|game-changing|seamless|unleash|supercharge|cutting-edge/i,
      );
    }
  });
});
