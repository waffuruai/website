import { describe, expect, it } from 'vitest';
import { aura, auraEvidence } from './aura';
import { locales } from '@/i18n/config';
import { localize } from '@/lib/content';

/** Every number in a copy tree, in order, so translations cannot drift. */
const numbers = (copy: unknown) =>
  (JSON.stringify(copy).match(/\d+(?:\.\d+)?/g) ?? []).sort();

const HYPE =
  /delve|seamless|leverag|unlock|game-chang|revolutionar|cutting-edge|not just/i;

describe('aura copy', () => {
  it('keeps the public numbers in the evidence, with their sources', () => {
    expect(auraEvidence.tiles.turbo4).toMatchObject({
      compression: 3.8,
      ppl: 0.23,
    });
    expect(auraEvidence.tiles.turbo3).toMatchObject({
      compression: 4.6,
      ppl: 1.06,
    });
    expect(auraEvidence.tiles.large).toMatchObject({
      params: '104B',
      context: '128K',
      peakGb: 74,
      ppl: 4.024,
    });
    expect(auraEvidence.ribbonRatio).toBe(
      auraEvidence.tiles.turbo4.compression,
    );
    // Upstream adoption is vLLM and Apple MLX only; llama.cpp is our fork.
    expect(auraEvidence.links.upstream.map((link) => link.href)).toEqual([
      'https://github.com/vllm-project/vllm/pull/38479',
      'https://github.com/ml-explore/mlx-swift-lm/pull/232',
    ]);
    for (const link of [
      ...auraEvidence.links.research,
      ...auraEvidence.links.upstream,
    ]) {
      expect(link.href).not.toMatch(/waffuruai|ggml-org/);
    }
  });

  it.each(locales)(
    'has no dashes, hype or private links and keeps the numbers in %s',
    (locale) => {
      const copy = localize(aura, locale);
      const text = JSON.stringify(copy);
      expect(text).not.toMatch(/—|–/);
      // Exactly one bracketed phrase: the inline paper link.
      expect(copy.lineage.steps[0].body.match(/\[[^\]]+\]/g)).toHaveLength(1);
      expect(text).not.toMatch(HYPE);
      expect(text).not.toMatch(/github\.com|https?:/);
      expect(text).not.toMatch(
        /ggml-org|upstream llama\.cpp|llama\.cpp upstream/i,
      );
      // Product names never translate.
      for (const name of [
        'AURA',
        'TurboQuant+',
        'llama-cpp-turboquant',
        'Iron',
        'Butter',
        'Qwen3.8-27B',
      ])
        expect(text).toContain(name);
      expect(numbers(copy)).toEqual(numbers(aura.en));
      expect(copy.lineage.steps).toHaveLength(3);
      expect(copy.changed.items).toHaveLength(4);
      expect(copy.title).toMatch(/\*[^*]+\*/);
    },
  );
});
