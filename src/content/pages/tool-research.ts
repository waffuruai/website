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

export type ToolResearchCopy = {
  neural: { label: string; replay: string; controls: string; note: string };
  animation: {
    title: string;
    measured: string;
    accuracy: string;
    tokens: string;
    replay: string;
    boundary: string;
    accuracyGain: string;
    tokenOverhead: string;
  };
  eyebrow: string;
  title: string;
  intro: string;
  resultTitle: string;
  baseline: string;
  candidate: string;
  denominator: string;
  gain: string;
  retained: string;
  development: string;
  methodTitle: string;
  steps: { title: string; body: string }[];
  implication: string;
  details: string;
  scopeTitle: string;
  scope: string;
  cost: string;
  limits: string;
};

export const toolResearch: Localized<ToolResearchCopy> = {
  en: {
    neural: {
      label: 'Research loop · conceptual view',
      replay: 'Replay signal',
      controls: 'Explore the research stages',
      note: 'A visual metaphor for the research process, not a neuron activation capture. The measured results sit alongside it.',
    },
    animation: {
      title: 'Better arguments. Extra inference work.',
      measured: 'Measured tradeoff · same 144-request screen',
      accuracy: 'Exact argument accuracy',
      tokens: 'Total inference tokens',
      replay: 'Replay animation',
      boundary:
        'The continuation improved exact arguments while adding inference work. Workflow token savings and cost per completed task have not been demonstrated.',
      accuracyGain: 'additional exact responses',
      tokenOverhead: 'additional inference tokens',
    },
    eyebrow: 'Juke → Butter · measured research',
    title: 'Better tool calls.\n*Measured in Butter.*',
    intro:
      'An incorrect argument can turn a useful tool into a failed action. We use Juke to investigate execution and behavior, then test targeted inference changes. One native Butter experiment corrected more tool arguments without retraining.',
    resultTitle: 'Exact tool-argument responses',
    baseline: 'Before',
    candidate: 'With experimental changes',
    denominator: 'correct / requests',
    gain: '20 additional correct responses',
    retained: 'Baseline successes retained',
    development: 'Separate development suite',
    methodTitle: 'From evidence to an inference change',
    steps: [
      {
        title: 'Inspect the failure',
        body: 'Capture the response and locate the argument representation that went wrong.',
      },
      {
        title: 'Change the inference path',
        body: 'Test a targeted inference improvement against the same evaluation, without retraining the model.',
      },
      {
        title: 'Verify the result',
        body: 'Check exact typed arguments through the normal API, in buffered and streaming modes. Keep every baseline pass and account for the extra work.',
      },
    ],
    implication:
      'The goal is dependable actions with less wasted work. Fewer accidental actions, fewer repair turns and lower total workflow cost are the next outcomes to measure.',
    details: 'See test conditions and limitations',
    scopeTitle: 'Experimental native API result · 26 October 2026',
    scope:
      'The breadth screen contains 72 prompts, each tested in buffered and streaming modes: 144 requests per arm. These are new values in known failure families, not 144 independent workflows. No external tools were executed.',
    cost: 'The continuation adds 8,304 input and 536 generated tokens across the breadth screen. This is a correctness improvement with additional inference work. Reduced total workflow tokens, latency and cost per completed task have not been demonstrated.',
    limits:
      'This is an experimental capability, not a released feature. Results apply to this limited screen; other models, APIs and completed workflows require separate qualification.',
  },
  es,
  fr,
  ja,
  ko,
  zh,
};
