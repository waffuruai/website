import type { Localized } from '@/content/types';

import type { IndustryPage } from './types';
import lifeSciencesEs from './life-sciences.es';
import lifeSciencesFr from './life-sciences.fr';
import lifeSciencesZh from './life-sciences.zh';
import lifeSciencesJa from './life-sciences.ja';
import lifeSciencesKo from './life-sciences.ko';

/*
 * Life sciences: pharma, biotech and research institutes. Sensitive research
 * and patient data, IP that must not leak, and a literature nobody can read
 * fast enough, answered by Whisk with citations. No compliance, clinical
 * validation or certification claims (HIPAA, GxP and the like), no
 * customers, no model-quality claims.
 *
 * TODO(founder): confirm (1) which document formats Whisk indexes today
 * (PDF papers, long reports) before the page names them; (2) any
 * compliance or validation facts we may state.
 */
export const lifeSciences: Localized<IndustryPage> = {
  en: {
    seo: {
      title: 'Private AI inference for life sciences',
      description:
        'Run models next to sensitive research and patient data, keep your IP on hardware you control, and get cited answers from your own sources. Early access.',
      keywords: [
        'private AI for life sciences',
        'AI for research data',
        'local LLM for biotech',
        'retrieval with citations',
        'on-prem AI inference',
      ],
    },
    name: 'Life sciences',
    serviceType: 'Private AI inference and retrieval software for research',
    card: {
      title: 'Life *sciences*',
      summary:
        'Models next to sensitive research data, and answers from your own sources with citations.',
    },
    hero: {
      title: 'Bring the model to the *data*.',
      lede: 'Run models on hardware you control, next to the research, patient data and IP that should never leave it. Ask your own notes, documents and code, and get answers that cite where they came from.',
    },
    problem: {
      title: 'The data that matters can’t *travel*.',
      statement:
        'The data that would make a model useful, from trial results to unpublished work, is exactly the data you cannot send to someone else’s API.',
      body: 'So teams paste less, or paste anyway. The literature grows faster than anyone can read it, a summary without a source is useless in a review, and research compute is hard to tie to the project that used it.',
    },
    useCases: {
      title: 'Research that stays *yours*.',
      intro:
        'Four jobs for the research computing team and the scientists it serves.',
      items: [
        {
          tag: 'control',
          title: 'Run models next to sensitive data.',
          body: 'Butter serves models on hardware you operate, from a Mac Studio in the lab to RTX workstations and servers on-prem, so patient data and unpublished results stay where they are. Data stays put unless you opt in.',
        },
        {
          tag: 'inference',
          title: 'Ask your sources, and get the citation.',
          body: 'Whisk runs retrieval locally over notes, documents and code. Search is lexical plus vector, so exact gene names and fuzzy questions both land, and every answer cites where it came from.',
        },
        {
          tag: 'control',
          title: 'Keep your IP on machines you own.',
          body: 'Models, prompts and results stay on infrastructure you control, so a new target or a draft patent is not sitting in someone else’s logs. The same stack runs on one workstation or a shared cluster.',
        },
        {
          tag: 'cost',
          title: 'Know what each project’s compute costs.',
          body: 'Syrup shows every GPU and every engine on it, busy or idle, so research compute can be tied to the work it did. Budgets get a number instead of a guess.',
        },
      ],
    },
    stackFit: {
      title: 'How the stack *fits*.',
      intro:
        'Butter runs the models, Whisk reads your sources, and Syrup keeps count.',
      items: [
        {
          product: 'butter',
          need: 'Models next to the data.',
          body: 'Swift for macOS and iOS and Rust for everything else, with minimal dependencies. Text, vision, speech and omni models sit behind an OpenAI-compatible API, and checkpoints load straight from Hugging Face.',
        },
        {
          product: 'whisk',
          need: 'Answers from your sources, with citations.',
          body: 'Local retrieval over notes, documents and code. Search is lexical plus vector, and results come back with citations over MCP, so assistants show their work.',
        },
        {
          product: 'syrup',
          need: 'Compute you can account for.',
          body: 'Every GPU and every engine in one view, whether that is Butter, vLLM, SGLang or llama.cpp, from one workstation to a shared cluster.',
        },
      ],
    },
    whereWeAre: {
      title: 'Where we *are*.',
      lede: 'The products are in early access and closed source for now. We make no compliance or validation claims, so ask us about your requirements directly.',
      notes: [
        'A Mac Studio or an RTX workstation is the easiest place to start: Metal is primary, and CUDA is in production on RTX and DGX Spark.',
        'On datacenter GPUs, first runs are done on H100, H200, B100, B200 and MI300. ROCm and Vulkan run but are not tuned yet.',
        'Whisk cites its sources, but it does not check the science. Your reviewers still do.',
      ],
    },
    faq: [
      {
        question: 'Does patient or research data leave our machines?',
        answer:
          'Not by default. Models run on hardware you operate, and data stays where it is unless you opt in.',
      },
      {
        question: 'Can it answer from our own documents?',
        answer:
          'Yes. Whisk runs retrieval locally over notes, documents and code, and every result comes back with a citation to its source, over MCP.',
      },
      {
        question: 'Is it validated for clinical or regulated work?',
        answer:
          'We make no compliance, certification or validation claims. Tell us what your work requires, and we will answer specifically.',
      },
      {
        question: 'Which hardware do we need?',
        answer:
          'A Mac with Apple silicon is the best-supported start, because Metal is where every kernel is tuned first. RTX workstations and DGX Spark run on CUDA. How large a model you can run depends on how much memory you have.',
      },
      {
        question: 'How do we get access?',
        answer:
          'Early access is open by request, and the products are closed source for now. Tell us about your data and your hardware, and we will write back.',
      },
    ],
    cta: {
      title: 'Keep the science *in house*.',
      body: 'Early access, closed source for now. Tell us which data has to stay put and which hardware you run, and we will tell you honestly what fits today.',
    },
  },
  es: lifeSciencesEs,
  fr: lifeSciencesFr,
  zh: lifeSciencesZh,
  ja: lifeSciencesJa,
  ko: lifeSciencesKo,
};
