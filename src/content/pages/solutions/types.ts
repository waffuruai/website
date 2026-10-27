import type { FaqItem, Seo } from '@/content/types';

/*
 * Content model for the Solutions pages: one `SolutionPage` per audience,
 * rendered by one template (`components/solutions/solution-page.tsx`), plus
 * the overview and the strings every page shares. All of it is
 * `Localized<T>`; translators add `<page>.<locale>.ts` siblings typed
 * against the same `T`.
 */

/** Route slugs, in the order the overview and navigation list them. */
export const solutionSlugs = [
  'small-business',
  'enterprise',
  'neoclouds',
  'ai-companies',
] as const;

export type SolutionSlug = (typeof solutionSlugs)[number];

export const solutionPath = (slug: SolutionSlug) => `/solutions/${slug}`;

/** The three value props every audience hears, each in its own words. */
export type SolutionTag = 'cost' | 'inference' | 'control';

/** The Waffuru stack, numbered from the metal up. */
export type ProductKey = 'iron' | 'butter' | 'waffle' | 'syrup';

/** How well a hardware tier is supported: drives the bars, never the copy. */
export type HardwareStatus = 'primary' | 'secondary' | 'runs';

/** A job to be done: a title and two sentences. */
export type UseCase = { tag: SolutionTag; title: string; body: string };

/** One product mapped to the need it answers for this audience. */
export type StackFitItem = { product: ProductKey; need: string; body: string };

/** A short, real code sample (AI companies only). */
export type CodeSample = {
  /** Use `*word*` for the gold italic accent. */
  title: string;
  intro: string;
  filename: string;
  language: string;
  code: string;
  emitsLabel: string;
  emits: string[];
};

/** Every `title` accepts `*word*` for the gold italic accent. */
export type SolutionPage = {
  seo: Seo;
  /** Audience name: hero label, breadcrumb and JSON-LD. */
  name: string;
  /** schema.org `serviceType`. */
  serviceType: string;
  /** Overview card: audience title and one line. */
  card: { title: string; summary: string };
  hero: { title: string; lede: string };
  problem: { title: string; statement: string; body: string };
  useCases: { title: string; intro: string; items: UseCase[] };
  sample?: CodeSample;
  stackFit: { title: string; intro: string; items: StackFitItem[] };
  whereWeAre: { title: string; lede: string; notes: string[] };
  faq: FaqItem[];
  cta: { title: string; body: string };
};

export type ValueProp = {
  tag: SolutionTag;
  title: string;
  body: string;
  points: string[];
};

export type SolutionsOverview = {
  seo: Seo;
  hero: { label: string; title: string; lede: string };
  cards: { label: string; title: string; intro: string };
  values: { label: string; title: string; intro: string; items: ValueProp[] };
  cta: { title: string; body: string };
};

export type ProductInfo = {
  /** Position in the stack ("01"). */
  index: string;
  /** What it does, shown after the index ("Kernels"). */
  role: string;
  /** Never translates. */
  name: string;
  linkLabel: string;
  href: string;
};

export type HardwareTier = {
  name: string;
  status: HardwareStatus;
  statusLabel: string;
  note: string;
};

/** Strings shared by every audience page. */
export type SolutionsShared = {
  breadcrumb: { label: string; home: string; solutions: string };
  /** Mono labels above each section heading. */
  sections: {
    problem: string;
    useCases: string;
    stackFit: string;
    whereWeAre: string;
  };
  tags: Record<SolutionTag, string>;
  products: Record<ProductKey, ProductInfo>;
  hardware: {
    notesLabel: string;
    tiersLabel: string;
    runsOnLabel: string;
    tiers: HardwareTier[];
    runsOn: { label: string; inProgress?: boolean }[];
  };
};
