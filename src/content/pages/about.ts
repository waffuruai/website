import type { Cta, Localized, Seo } from '@/content/types';
import aboutEs from './about.es';
import aboutFr from './about.fr';
import aboutZh from './about.zh';
import aboutJa from './about.ja';
import aboutKo from './about.ko';

/*
 * About page copy. English is the source of truth; locale siblings
 * (`about.es.ts`, …) are typed against `AboutContent`. The mission is the
 * only statement of purpose: there is deliberately no vision statement.
 * Use `*word*` in headings for the gold italic accent.
 */

export type Thesis = {
  /** The claim, set in serif. */
  statement: string;
  /** One or two sentences that back it up. */
  body: string;
};

export type Value = { name: string; line: string };

/** The hiring callout, shared by /about and /about/team (it reads `about.hiring`). */
export type HiringContent = {
  label: string;
  /** Use `*word*` for the gold italic accent. */
  title: string;
  lines: string[];
  skillsLabel: string;
  skills: string[];
  /** Button label; it links to `mailto('Hiring')`. */
  cta: string;
};

export type AboutContent = {
  seo: Seo;
  hero: {
    label: string;
    title: string;
    lede: string;
    actions: Cta[];
  };
  why: {
    title: string;
    intro: string;
    /** The first paragraph is set large, as the lead. */
    paragraphs: string[];
    constraintsLabel: string;
    constraints: string[];
  };
  beliefs: {
    title: string;
    intro: string;
    theses: Thesis[];
  };
  values: {
    title: string;
    intro: string;
    items: Value[];
  };
  teamTeaser: {
    title: string;
    body: string;
    cta: string;
    /** `{name}` is replaced with the person's name. */
    portraitAlt: string;
  };
  hiring: HiringContent;
  cta: {
    title: string;
    body: string;
  };
};

export const about: Localized<AboutContent> = {
  en: {
    seo: {
      title: 'Our mission: democratize access to intelligence',
      description:
        'Waffuru’s mission is to democratize access to intelligence. What we believe, what we value and why we build AI infrastructure that runs on hardware you own or rent.',
      keywords: [
        'Waffuru mission',
        'democratize AI',
        'AI infrastructure company',
        'AI infrastructure startup',
      ],
    },
    hero: {
      label: 'About Waffuru',
      title: 'Democratize access to *intelligence*.',
      lede: 'Waffuru builds the AI stack that runs models fast and at the lowest cost per token, on hardware you own or rent, from staff laptops to data-centre GPU fleets: kernels, inference, a control plane, memory and an agent harness.',
      actions: [
        { label: 'Meet the team', href: '/about/team' },
        { label: 'Work with us', href: '#hiring', variant: 'outline' },
      ],
    },
    why: {
      title: 'Why we *build*.',
      intro: 'Intelligence should run where people already are.',
      paragraphs: [
        'Models are getting good enough to run on hardware people already own.',
        'That only matters if the stack that runs them is ready for it. It has to be faster, cheaper, easy to use and **yours**: kernels that get more from every watt, correct results faster, running vision, audio and text models without a pile of dependencies and complexity, and memory and context that stays on your machine.',
        'Access to intelligence must not depend on geography, wealth or credentials. That means a lower cost per token everywhere: on the laptop someone already owns, and on the GPUs a business owns or rents.',
      ],
      constraintsLabel: 'Two constraints we hold ourselves to',
      constraints: [
        'Minimize token usage and cost per token.',
        'Your data stays on your hardware unless you opt in.',
      ],
    },
    beliefs: {
      title: 'What we *believe*.',
      intro: 'Seven theses that drive what we build.',
      theses: [
        {
          statement:
            'Demand for intelligence is limitless. The resources powering it are not.',
          body: 'Scaling inference takes more than new datacenters and power. It takes more useful work from every unit of compute and energy, so access grows faster than cost, energy demand and environmental impact.',
        },
        {
          statement: 'When power is the ceiling, efficiency is the variable.',
          body: 'Tokens per watt and dollars per workload are the numbers you can still improve.',
        },
        {
          statement: 'Demand for compute is insatiable.',
          body: 'Every efficiency gain gets spent on more intelligence, the Jevons paradox at work. That is why efficiency work never finishes.',
        },
        {
          statement: 'Good-enough models on commodity hardware are close.',
          body: 'Within about two years, models running on hardware people already own will be good enough for meaningful work. Moore’s law and fast AI progress keep compounding.',
        },
        {
          statement:
            'Everyone will have a personal assistant, or a team of them.',
          body: 'And those assistants will talk to each other.',
        },
        {
          statement: 'People want agency.',
          body: 'An assistant has to be a trusted extension of yourself: helpful, approachable, not scary. That relationship will be as personal as the one with your phone.',
        },
        {
          statement:
            'Access to intelligence must not depend on geography, wealth or credentials.',
          body: 'Raising earning potential everywhere requires open, local access to intelligence.',
        },
      ],
    },
    values: {
      title: 'What we *value*.',
      intro: 'Fourteen values that guide how we decide.',
      items: [
        {
          name: 'Freedom',
          line: 'Enabling freedom through technology access is fundamental to what we build.',
        },
        {
          name: 'Autonomy',
          line: 'We build systems that give people time back.',
        },
        {
          name: 'Agency',
          line: 'If something needs doing and you are best placed, start it.',
        },
        { name: 'Respect', line: 'We treat people as capable peers.' },
        { name: 'Trust', line: 'Earned slowly, lost in a moment.' },
        {
          name: 'Honesty',
          line: 'We state status, risk, mistakes and limits directly.',
        },
        {
          name: 'Integrity',
          line: 'Keep commitments. Do not ship what you would not stand behind.',
        },
        {
          name: 'Equal opportunity',
          line: 'Access to intelligence must not depend on geography, wealth or credentials.',
        },
        { name: 'Compassion', line: 'We care about people as people.' },
        {
          name: 'Meritocracy',
          line: 'The best idea wins, on evidence and impact.',
        },
        {
          name: 'Scientific method',
          line: 'Hypothesize, measure, reproduce. Benchmarks beat opinions.',
        },
        {
          name: 'Quick decisions and actions',
          line: 'A bias to shipping, measuring and learning.',
        },
        {
          name: 'Fiscal conservatism',
          line: 'We spend time and money with intention, as if they are scarce.',
        },
        {
          name: 'Having fun',
          line: 'Hard problems deserve teams that enjoy the work.',
        },
      ],
    },
    teamTeaser: {
      title: 'The people *behind* it.',
      body: 'Cybersecurity, military, consumer and enterprise. We’ve built and scaled startups, and worked with everyone from small businesses to the enterprise.',
      cta: 'Meet the team',
      portraitAlt: 'Portrait of {name}',
    },
    hiring: {
      label: 'Hiring',
      title: 'Put on an *apron*.',
      lines: [
        'We want people who enjoy the low-level work: GPU kernels, inference engines, Rust, Swift, Metal, CUDA and HIP/ROCm, and the product that sits on top of them.',
        'We work asynchronously across time zones. We are also an agentic company, with humans and agents building together.',
        'If that sounds like your kind of kitchen, tell us what you would like to build.',
      ],
      skillsLabel: 'What we like working on',
      skills: [
        'Low-level GPU',
        'Kernels',
        'Inference',
        'Rust',
        'Swift and Metal',
        'CUDA and HIP/ROCm',
        'Product',
      ],
      cta: 'Get in touch',
    },
    cta: {
      title: 'Try it *early*.',
      body: 'Pantry is free and open source today. Our AI inference stack is in private early access: request access, or talk to us about what you want to run on hardware you own or rent.',
    },
  },
  es: aboutEs,
  fr: aboutFr,
  zh: aboutZh,
  ja: aboutJa,
  ko: aboutKo,
};
