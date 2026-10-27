import { describe, expect, it } from 'vitest';
import {
  deriveToolResearch,
  toolResearch,
  toolResearchEvidence,
} from './tool-research';
import { locales } from '@/i18n/config';
import { localize } from '@/lib/content';

describe('deriveToolResearch', () => {
  it('derives cost per correct argument from the evidence, never from typed strings', () => {
    const derived = deriveToolResearch(toolResearchEvidence);
    expect(derived).toEqual({
      baselinePerCorrect: 1400, // 50,382 / 36 = 1,399.5
      candidatePerCorrect: 1058, // 59,222 / 56 = 1,057.5
      fewerPercent: 24,
      additionalCorrect: 20,
      additionalTokens: 8840,
      tokensPerAdditionalCorrect: 442, // 8,840 / 20
      baselineShare: 0.25,
      candidateShare: 56 / 144,
    });
    // The extra tokens are the sum of the recorded input and generated deltas.
    expect(derived.additionalTokens).toBe(
      toolResearchEvidence.additionalInputTokens +
        toolResearchEvidence.additionalGeneratedTokens,
    );
  });

  it('tracks the evidence when it changes', () => {
    const derived = deriveToolResearch({
      ...toolResearchEvidence,
      candidate: 72,
      candidateTokens: 72000,
    });
    expect(derived.candidatePerCorrect).toBe(1000);
    expect(derived.fewerPercent).toBe(29);
    expect(derived.tokensPerAdditionalCorrect).toBe(Math.round(21618 / 36));
  });
});

describe('tool research copy', () => {
  it.each(locales)(
    'keeps placeholders, product names and no private mechanics in %s',
    (locale) => {
      const copy = localize(toolResearch, locale);
      for (const key of ['more', 'before', 'after'])
        expect(copy.intro).toContain(`{${key}}`);
      expect(copy.figure.fewer).toContain('{percent}');
      const text = JSON.stringify(copy);
      expect(text).toContain('Butter');
      expect(text).not.toMatch(/Juke|continuation|github\.com|—|–/);
      expect(copy.steps).toHaveLength(3);
    },
  );
});
