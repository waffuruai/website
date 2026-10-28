import type { Localized, StackFlowCopy } from '@/content/types';
import homeEs from './home.es';
import homeFr from './home.fr';
import homeZh from './home.zh';
import homeJa from './home.ja';
import homeKo from './home.ko';

/*
 * Home page copy. English is the source of truth; translators add `home.es.ts`
 * and friends typed against `HomeContent`. Product, platform and lab names
 * (Waffuru, Iron, Butter, Syrup, Whisk, Metal, CUDA, ROCm, Vulkan, …) never
 * translate. `*word*` is the gold italic accent in a heading.
 *
 * The primary calls to action ("Request early access", "Talk to us") come
 * from the UI dictionary (`common.*`), not from here. Pantry's commands and
 * example output come from `pantry/facts.ts`.
 */

export type HomeContent = {
  seo: { keywords: string[] };
  hero: {
    eyebrow: string;
    title: string;
    lede: string;
    /** The launch pill above the title, linking to Pantry. */
    launch: { label: string; text: string };
    secondary: { label: string; href: string };
  };
  /** Our first public product, right under the hero. */
  pantry: {
    label: string;
    title: string;
    body: string;
    points: string[];
    primary: string;
    secondary: string;
    caption: string;
  };
  /** The stack as a working path (`StackFlow`). */
  stack: {
    title: string;
    intro: string;
    /** One line under the flow: where the stack is today. */
    note: string;
    flow: StackFlowCopy;
  };
  /** Who it is for. A card links on once its solutions page launches. */
  audiences: {
    title: string;
    intro: string;
    items: { title: string; body: string; href?: string }[];
    linkLabel: string;
  };
  beliefs: {
    title: string;
    intro: string;
    items: { title: string; body: string }[];
    links: { label: string; href: string }[];
  };
  team: {
    title: string;
    intro: string;
    /** `{name}` is replaced with the person's name. */
    portraitAlt: string;
    link: { label: string; href: string };
  };
  cta: { title: string; body: string };
};

export const home: Localized<HomeContent> = {
  en: {
    seo: {
      keywords: [
        'private AI',
        'local AI',
        'on-device AI',
        'AI on your own hardware',
        'local LLM inference',
        'inference engine',
        'GPU kernels',
        'Apple silicon',
        'vulnerability scanner',
        'Pantry',
      ],
    },

    hero: {
      eyebrow: 'Your hardware · your data · your AI',
      title: 'More intelligence from the hardware you already *own*.',
      lede: 'Waffuru builds the stack that runs AI on your own machines, from a laptop to a GPU fleet. You get more from the hardware you have, your data stays with you, and there is no cloud bill for every prompt.',
      launch: {
        label: 'New',
        text: 'Pantry, our free vulnerability scanner for macOS and Linux',
      },
      secondary: { label: 'See how it works', href: '#stack' },
    },

    pantry: {
      label: 'Free · Open source · Out today',
      title: 'Know what’s *exposed*. Patch it fast.',
      body: 'Before an assistant runs on your machine, the machine has to be safe. Pantry checks everything installed, and every repo, against open vulnerability data, reports only what applies, and fixes what it safely can.',
      points: [
        'Only what applies to your exact versions',
        'Safe fixes, run for you; sudo steps printed',
        'No telemetry, no AI, written in Rust',
      ],
      primary: 'Secure your system',
      secondary: 'How Pantry works',
      caption: 'Example output from one machine.',
    },

    stack: {
      title: 'From silicon to *answer*.',
      intro:
        'Four layers that work alone or together. Your request goes down, the answer comes back, and none of it has to leave your hardware.',
      note: 'The stack is private and in early access. Metal first, CUDA next; ROCm and Vulkan run, not tuned yet.',
      flow: {
        you: 'You, your apps, your agents',
        boundary: 'Your hardware · your network',
        layers: [
          {
            role: 'Control',
            name: 'Syrup',
            line: 'See every GPU and every engine running on it.',
          },
          {
            role: 'Memory',
            name: 'Whisk',
            line: 'Context from your own notes and code, with citations.',
          },
          {
            role: 'Engine',
            name: 'Butter',
            line: 'Runs the model, with no Python in the serving path.',
          },
          {
            role: 'Kernels',
            name: 'Iron',
            line: 'One kernel definition, tuned for each chip.',
          },
        ],
        hardware: ['Apple silicon', 'NVIDIA', 'AMD'],
        outside: {
          title: 'Someone else’s cloud',
          note: 'Not needed. Your data stays with you unless you opt in.',
        },
        outcomes: [
          'Private by default',
          'More from the hardware you own',
          'Every GPU in view',
        ],
        caption:
          'A request from you passes through the control plane, memory, engine and kernels to your own hardware, and the answer comes back the same way, all inside your hardware and network. The outcome: private by default, more from the hardware you own, and every GPU in view.',
      },
    },

    audiences: {
      title: 'A seat at the *table*.',
      intro: 'Whoever you are, the same stack works for you.',
      items: [
        {
          title: 'For you',
          body: 'A private assistant on your own laptop. Your notes, your code and your questions stay on your machine.',
        },
        {
          title: 'For companies',
          body: 'Bring AI in-house. Keep sensitive data where it belongs and stop paying per prompt for work your hardware can do.',
          href: '/solutions/enterprise',
        },
        {
          title: 'For GPU clouds',
          body: 'Serve more from every GPU you rent out, and see the whole fleet in one place.',
          href: '/solutions/neoclouds',
        },
        {
          title: 'For AI builders',
          body: 'Write a kernel once and ship it to Metal, CUDA, ROCm and Vulkan.',
          href: '/solutions/ai-companies',
        },
      ],
      linkLabel: 'See how',
    },

    beliefs: {
      title: 'Why we’re *cooking*.',
      intro: 'Three beliefs behind everything we build.',
      items: [
        {
          title: 'Intelligence for everyone',
          body: 'Access to AI should not depend on where you live, what you earn or which credentials you hold.',
        },
        {
          title: 'More from every watt',
          body: 'Demand for intelligence is limitless; power and chips are not. The win is more useful work from every unit of compute.',
        },
        {
          title: 'Good enough, on hardware you own',
          body: 'Within about two years, models on the machines people already have will be good enough for meaningful work. We are building for that.',
        },
      ],
      links: [
        { label: 'Read the announcement', href: '/blog/introducing-waffuru' },
        { label: 'What we believe', href: '/about#beliefs' },
      ],
    },

    team: {
      title: 'Who’s in the *kitchen*.',
      intro:
        'Cybersecurity, military, consumer and enterprise. We’ve built and scaled startups, and worked with everyone from small businesses to the enterprise.',
      portraitAlt: 'Portrait of {name}',
      link: { label: 'Meet the team', href: '/about/team' },
    },

    cta: {
      title: 'Pull up a seat.',
      body: 'Try Pantry today, free. The rest of the stack is in early access: request a seat, or leave your email and we will write when there is news.',
    },
  },
  es: homeEs,
  fr: homeFr,
  zh: homeZh,
  ja: homeJa,
  ko: homeKo,
};
