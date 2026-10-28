import type { FaqItem, Seo } from '@/content/types';

/*
 * Content model for the Pantry page (`/products/pantry`). Copy is
 * `Localized<PantryContent>` in `pantry.ts`; commands, transcripts and links
 * are facts in `facts.ts` and never translate. Every `title` accepts `*word*`
 * for the gold italic accent.
 */

/** The four steps the "How it works" sequence plays, in order. */
export const pantrySteps = ['install', 'scan', 'cache', 'fix'] as const;
export type PantryStep = (typeof pantrySteps)[number];

/** Where Pantry's answers come from, in the order the page lists them. */
export const pantrySources = [
  'osv',
  'ghsa',
  'kev',
  'eol',
  'malicious',
  'vendors',
] as const;
export type PantrySource = (typeof pantrySources)[number];

/** Ways to install, in the order the page offers them. */
export const installMethods = ['mise', 'script', 'verify'] as const;
export type InstallMethod = (typeof installMethods)[number];

export type PantryStepCopy = {
  id: PantryStep;
  /** Short tab label ("Scan"). */
  label: string;
  title: string;
  body: string;
  /** The flow under the terminal: three stops, left to right. */
  flow: [string, string, string];
  /** One line under the flow: what stays put, or what never runs. */
  note: string;
};

export type PantryContent = {
  seo: Seo;
  hero: {
    label: string;
    title: string;
    lede: string;
    primary: string;
    secondary: string;
    source: string;
    windows: string;
    windowsLink: string;
  };
  how: {
    title: string;
    intro: string;
    /** Under the terminal: the transcripts are examples. */
    caption: string;
    /** Accessible names for the step list and the replay control. */
    stepsLabel: string;
    pause: string;
    play: string;
    steps: PantryStepCopy[];
  };
  install: {
    title: string;
    intro: string;
    methods: {
      id: InstallMethod;
      label: string;
      title: string;
      body: string;
      link?: string;
    }[];
    then: string;
  };
  checks: {
    title: string;
    intro: string;
    items: { title: string; body: string }[];
  };
  /** Open data Pantry asks; names and links come from `facts.sources`. */
  sources: {
    title: string;
    intro: string;
    items: Record<PantrySource, string>;
  };
  trust: {
    title: string;
    intro: string;
    items: { title: string; body: string }[];
  };
  uses: {
    title: string;
    intro: string;
    items: { title: string; body: string }[];
  };
  faq: FaqItem[];
  cta: { title: string; body: string };
};
