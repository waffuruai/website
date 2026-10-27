import type { Localized } from '@/content/types';
import es from './tool-research.es';
import fr from './tool-research.fr';
import ja from './tool-research.ja';
import ko from './tool-research.ko';
import zh from './tool-research.zh';

/** Frozen H26/H27 native API evidence, not a live benchmark or release claim. */
export const toolResearchEvidence = {
  asOf: '2026-10-26',
  baseline: 36,
  candidate: 56,
  requests: 144,
  prompts: 72,
  retained: 36,
  developmentBaseline: 17,
  developmentCandidate: 21,
  developmentRequests: 29,
  baselineTokens: 50382,
  candidateTokens: 59222,
  additionalInputTokens: 8304,
  additionalGeneratedTokens: 536,
  model: 'Qwen3.5-0.8B · Q4_K_M',
  hardware: 'M5 Max · Metal',
  api: 'Swift Chat API',
} as const;

/** The counts the derived values need (plain numbers, so tests can vary them). */
export type ToolResearchCounts = {
  baseline: number;
  candidate: number;
  requests: number;
  baselineTokens: number;
  candidateTokens: number;
};

/**
 * Values the page derives from the evidence, never typed by hand. Both arms
 * ran the same 144 requests, so the honest comparison is cost per correct
 * answer, not total tokens:
 *
 *   tokensPerCorrect = inference tokens / exact-argument responses
 *   tokensPerAdditionalCorrect = extra tokens / extra correct responses
 *
 * `deriveToolResearch(toolResearchEvidence)` → `{ baselinePerCorrect: 1400,
 * candidatePerCorrect: 1058, fewerPercent: 24, tokensPerAdditionalCorrect:
 * 442, … }`.
 */
export function deriveToolResearch(evidence: ToolResearchCounts) {
  const baselinePerCorrect = evidence.baselineTokens / evidence.baseline;
  const candidatePerCorrect = evidence.candidateTokens / evidence.candidate;
  const additionalCorrect = evidence.candidate - evidence.baseline;
  const additionalTokens = evidence.candidateTokens - evidence.baselineTokens;
  return {
    baselinePerCorrect: Math.round(baselinePerCorrect),
    candidatePerCorrect: Math.round(candidatePerCorrect),
    /** Whole percent fewer tokens per correct argument, from the unrounded ratio. */
    fewerPercent: Math.round(
      (1 - candidatePerCorrect / baselinePerCorrect) * 100,
    ),
    additionalCorrect,
    additionalTokens,
    tokensPerAdditionalCorrect: Math.round(
      additionalTokens / additionalCorrect,
    ),
    baselineShare: evidence.baseline / evidence.requests,
    candidateShare: evidence.candidate / evidence.requests,
  };
}

export type ToolResearchCopy = {
  eyebrow: string;
  title: string;
  /**
   * `{more}`, `{before}` and `{after}` are filled from the derived values
   * (the number of extra exact arguments and the tokens per correct argument).
   */
  intro: string;
  figure: {
    /** The headline stat, e.g. "Tokens per correct argument". */
    headline: string;
    baseline: string;
    candidate: string;
    /** `{percent}` is the derived whole-percent reduction. */
    fewer: string;
    unit: string;
    exact: string;
    totalTokens: string;
    retained: string;
    perAdditional: string;
    development: string;
    caption: string;
  };
  wrongTitle: string;
  wrongBody: string;
  methodTitle: string;
  example: {
    label: string;
    controls: string;
    replay: string;
    schema: string;
    output: string;
    flag: string;
    inProgress: string;
    check: string;
  };
  steps: { title: string; body: string }[];
  details: string;
  scopeTitle: string;
  scope: string;
  cost: string;
  limits: string;
};

export const toolResearch: Localized<ToolResearchCopy> = {
  en: {
    eyebrow: 'Measured in Butter',
    title: 'Fewer wrong arguments.\n*Cheaper correct ones.*',
    intro:
      'A tool call with a wrong argument fails, triggers a retry, or runs with the wrong value. We trace execution and behavior, then test targeted inference changes. In a 144-request screen, the Butter fix produced {more} more exact arguments while lowering tokens per correct argument from about {before} to about {after}.',
    figure: {
      headline: 'Tokens per correct argument',
      baseline: 'Before',
      candidate: 'With the Butter fix',
      fewer: 'about {percent}% fewer',
      unit: 'tokens',
      exact: 'Exact arguments',
      totalTokens: 'Total inference tokens',
      retained: 'Baseline successes retained',
      perAdditional: 'Cost per additional correct argument',
      development: 'Separate development suite',
      caption:
        'Evaluation screen: 72 prompts, each in buffered and streaming mode (144 requests per arm). Qwen3.5-0.8B Q4_K_M, temperature 0, M5 Max. No external tools were executed. This measures exact argument values, not general task reliability.',
    },
    wrongTitle: 'What a wrong argument costs',
    wrongBody:
      'A wrong value either fails the call, which costs another model turn plus a tool round trip, or executes with the wrong value, such as writing to or deleting the wrong path.',
    methodTitle: 'From evidence to an inference change',
    example: {
      label: 'Illustrative example from the type-mismatch failure family',
      controls: 'Steps of the research loop',
      replay: 'Replay the steps',
      schema: 'schema',
      output: 'model output',
      flag: 'string, expected number',
      inProgress: 'Running the same 144-request evaluation',
      check: 'exact value and type',
    },
    steps: [
      {
        title: 'Inspect the failure',
        body: 'Capture the response and locate the argument representation that went wrong.',
      },
      {
        title: 'Change the inference path',
        body: 'Test a targeted inference change against the same evaluation, without retraining the model.',
      },
      {
        title: 'Verify the result',
        body: 'Check exact typed arguments through the normal API, in buffered and streaming modes. Keep every baseline pass and account for the extra work.',
      },
    ],
    details: 'See test conditions and limitations',
    scopeTitle: 'Native API result · 26 October 2026',
    scope:
      'The breadth screen contains 72 prompts, each tested in buffered and streaming modes: 144 requests per arm. These are new values in known failure families, not 144 independent workflows. No external tools were executed.',
    cost: 'The change adds 8,304 input and 536 generated tokens across the breadth screen, so total inference tokens rose from 50,382 to 59,222 while tokens per correct argument fell.',
    limits:
      'Results apply to this limited screen of exact argument values; other models, APIs and completed workflows are outside it.',
  },
  es,
  fr,
  ja,
  ko,
  zh,
};
