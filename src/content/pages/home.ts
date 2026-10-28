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
    /** `soon` marks an audience whose product isn't out yet. */
    items: { title: string; body: string; href?: string; soon?: boolean }[];
    linkLabel: string;
    /** The badge on a `soon` item. */
    soonLabel: string;
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
      title: 'More intelligence on hardware you already *own*.',
      lede: 'Waffuru builds the AI stack that runs on hardware you own or rent, from a laptop to a GPU fleet in the data centre. You get more from every GPU, spend less per token, and your data stays with you.',
      launch: {
        label: 'New',
        text: 'Pantry, our free vulnerability scanner for macOS and Linux',
      },
      secondary: { label: 'See how it works', href: '#stack' },
    },

    pantry: {
      label: 'Free · Open source · Out today',
      title: 'Know what’s *exposed*. Patch it fast.',
      body: 'Before AI runs on your machines, they have to be safe. Pantry checks everything installed, and every repo, against open vulnerability data, reports only what applies, and fixes what it safely can.',
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
        'Six products that work alone or together. Your request goes down, the answer comes back, and none of it has to leave hardware you control.',
      note: 'Pantry is free and open source today; the rest of the stack is in private early access, and Waffle is coming soon. Metal first, CUDA being tuned, ROCm and Vulkan coming soon.',
      flow: {
        you: 'You, your team, your agents',
        boundary: 'Hardware you own or rent',
        layers: [
          {
            role: 'Security',
            name: 'Pantry',
            icon: 'pantry',
            line: 'Finds what is exposed on every machine, and patches it.',
          },
          {
            role: 'Agents',
            name: 'Waffle',
            icon: 'waffle',
            line: 'The agent harness, with W, your assistant, inside.',
          },
          {
            role: 'Memory',
            name: 'Whisk',
            icon: 'whisk',
            line: 'Mixes the right documents and context into every request.',
          },
          {
            role: 'Control',
            name: 'Syrup',
            icon: 'syrup',
            line: 'Monitoring, telemetry, access control and cost, for every GPU.',
          },
          {
            role: 'Engine',
            name: 'Butter',
            icon: 'butter',
            line: 'Multi-modal inference for text, vision and audio, streamed.',
          },
          {
            role: 'Kernels',
            name: 'Iron',
            icon: 'iron',
            line: 'Write once in Rust, get optimized kernels everywhere.',
          },
        ],
        hardware: ['Apple silicon', 'NVIDIA', 'AMD'],
        outside: {
          title: 'Someone else’s API',
          note: 'Not needed. Your data stays on your hardware unless you opt in.',
        },
        outcomes: [
          'Built for a lower cost per token',
          'Private by default',
          'Patched and in view',
        ],
        caption:
          'A request from you, your team or your agents passes through Pantry (security), Waffle (agents), Whisk (memory), Syrup (control), Butter (the engine) and Iron (kernels) to hardware you own or rent, and the answer comes back the same way. Built for a lower cost per token, private by default, patched and in view.',
      },
    },

    audiences: {
      title: 'We’ve reserved a seat at the table for *you*.',
      intro: 'Whoever you are, the same stack works for you.',
      items: [
        {
          title: 'For you',
          body: 'A private assistant on your own laptop. Your notes, your code and your questions stay on your machine.',
          soon: true,
        },
        {
          title: 'For companies',
          body: 'Bring AI in-house, on GPUs you own or rent. Keep sensitive data where it belongs and spend less per token.',
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
      soonLabel: 'Coming soon',
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
          title: 'Run on hardware you own',
          body: 'Models on the machines people already have are good enough for meaningful work. We’ve been building for that.',
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
        'Experienced builders with backgrounds in cybersecurity, military, consumer and enterprise. We’ve built and scaled startups, and worked with everyone from small businesses to the enterprise.',
      portraitAlt: 'Portrait of {name}',
      link: { label: 'Meet the team', href: '/about/team' },
    },

    cta: {
      title: 'Reserve your seat.',
      body: 'Try Pantry today, free. The rest of the stack is in early access: reserve a seat, or leave your email and we will write when there is news.',
    },
  },
  es: homeEs,
  fr: homeFr,
  zh: homeZh,
  ja: homeJa,
  ko: homeKo,
};
