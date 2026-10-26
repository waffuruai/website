import { describe, expect, it } from 'vitest';
import { quantizedModels, quantizedModelsEvidence } from './quantized-models';
import { locales } from '@/i18n/config';
import { localize } from '@/lib/content';

/** Every number in a copy tree, in order, so translations cannot drift. */
const numbers = (copy: unknown) =>
  (JSON.stringify(copy).match(/\d+(?:\.\d+)?/g) ?? []).sort();

const HYPE =
  /delve|seamless|leverag|unlock|game-chang|revolutionar|cutting-edge|not just/i;

/** Public sources only: our research repos and arXiv. */
const PUBLIC_HOSTS =
  /^https:\/\/(github\.com\/TheTom\/(turboquant_plus|llama-cpp-turboquant)|arxiv\.org)/;

describe('quantized models copy', () => {
  it('keeps the public numbers in the evidence, with their sources', () => {
    expect(quantizedModelsEvidence.tiles.weights).toMatchObject({
      reduction: 37,
      ppl: 1.4,
    });
    expect(quantizedModelsEvidence.tiles.stacked).toMatchObject({
      reduction: 41,
      ppl: 1.4,
      context: '32K',
    });
    expect(quantizedModelsEvidence.boundary).toBe(2);
    for (const href of [
      quantizedModelsEvidence.paperHref,
      ...quantizedModelsEvidence.links.map((link) => link.href),
    ]) {
      expect(href).toMatch(PUBLIC_HOSTS);
    }
  });

  it.each(locales)(
    'has no dashes, hype or links and keeps the numbers in %s',
    (locale) => {
      const copy = localize(quantizedModels, locale);
      const text = JSON.stringify(copy);
      expect(text).not.toMatch(/—|–/);
      expect(text).not.toMatch(HYPE);
      expect(text).not.toMatch(/github\.com|huggingface|https?:/);
      // Product and format names never translate.
      for (const name of [
        'TurboQuant+',
        'llama-cpp-turboquant',
        'Butter',
        'Config I',
        'Juke',
        'ffn_down',
        'q8_0',
      ])
        expect(text).toContain(name);
      expect(numbers(copy)).toEqual(numbers(quantizedModels.en));
      expect(copy.method.items).toHaveLength(4);
      expect(copy.title).toMatch(/\*[^*]+\*/);
    },
  );

  it('frames the section as coming soon without hedging', () => {
    const { en } = quantizedModels;
    expect(en.eyebrow).toMatch(/coming soon/i);
    expect(en.title).toMatch(/with care/);
    // Sales copy: no status hedges (Tom's rule).
    for (const locale of locales) {
      const text = JSON.stringify(localize(quantizedModels, locale));
      expect(text).not.toMatch(
        /in progress|not released|not yet|being qualified|nothing has shipped|has(n't| not) shipped/i,
      );
    }
  });
});
