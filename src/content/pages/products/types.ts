import type { FaqItem, Seo } from '@/content/types';

/** The four layers of the stack, in the order they sit from the metal up. */
export const productSlugs = ['iron', 'butter', 'waffle', 'syrup'] as const;

export type ProductSlug = (typeof productSlugs)[number];

/** Who the overview points at; each maps to a `/solutions/<slug>` page. */
export const audienceKeys = [
  'smallBusiness',
  'enterprise',
  'neoclouds',
  'aiCompanies',
] as const;

export type AudienceKey = (typeof audienceKeys)[number];

/* Facts: the parts of a product that never translate ----------------------- */

export type CodeSample = {
  /** Shown left in the panel's header bar. */
  filename: string;
  /** Shown right in the header bar ("iron · rust dsl"). */
  label: string;
  language: 'rust' | 'shell';
  source: string;
};

export type ProductFacts = {
  slug: ProductSlug;
  /** Position in the stack, counted from the metal up. */
  index: '01' | '02' | '03' | '04';
  /** Product name; never translated. */
  name: string;
  /** Route path without a locale prefix. */
  path: `/products/${ProductSlug}`;
  /** Iron and Butter have public docs; Waffle and Syrup go to sales. */
  secondaryCta: 'docs' | 'sales';
  code?: CodeSample;
};

/* Copy: everything a translator touches ------------------------------------ */

/** One headline fact in the hero panel: a short value over a mono label. */
export type Highlight = { value: string; label: string };

export type Capability = { title: string; body: string };

/**
 * A compact, product-specific section rendered between the code sample and
 * the technical specifics (Butter: agent harness compatibility, model quirks).
 * `id` is the section anchor; `note` is an honest caveat under the list.
 */
export type ExtraSection = {
  id: string;
  heading: string;
  intro?: string;
  items: Capability[];
  note?: string;
};

export type SpecChip = { label: string; inProgress?: boolean };

/** A named cluster inside a spec row (a vendor and its model families). */
export type SpecGroup = { label: string; text: string; inProgress?: boolean };

/** One row of the definition list. Give it text, chips, groups or a mix. */
export type SpecRow = {
  term: string;
  detail?: string;
  chips?: SpecChip[];
  groups?: SpecGroup[];
};

export type TierLevel = 'primary' | 'secondary' | 'runs';

export type PlatformTier = {
  /** "Apple · Metal"; platform names never translate. */
  platform: string;
  level: TierLevel;
  note: string;
};

export type ProductCopy = {
  /** The layer's word in "01 · Kernels". */
  layer: string;
  /** The one-line pitch, also used on the overview and the nav. */
  tagline: string;
  /** Two or three sentences, used on the overview and cross-links. */
  summary: string;
  seo: Seo;
  hero: {
    /** Use `*word*` for the gold italic accent. */
    title: string;
    lede: string;
    highlights: Highlight[];
  };
  story: {
    heading: string;
    problem: string;
    outcome: string;
    /** What the reader can do now that they couldn't. */
    outcomes: string[];
  };
  capabilities: { heading: string; intro?: string; items: Capability[] };
  /** Only for products with a `code` sample in their facts. */
  code?: { heading: string; intro?: string; caption?: string };
  /** Optional product-specific sections, in order, after the code sample. */
  extras?: ExtraSection[];
  specs: { heading: string; intro?: string; rows: SpecRow[] };
  /** Only where hardware tiers matter (Iron, Butter). */
  platforms?: { heading: string; intro?: string; tiers: PlatformTier[] };
  stack: { heading: string; intro: string };
  faq: FaqItem[];
  cta: {
    title: string;
    body: string;
    /** Label for the docs link; set for products whose facts say `docs`. */
    docsLabel?: string;
  };
};

/** Words shared by all four product pages. */
export type ProductsShared = {
  /** Chip in the hero panel: the products are private for now. */
  statusLabel: string;
  storyProblemLabel: string;
  storyOutcomeLabel: string;
  tierLabels: Record<TierLevel, string>;
  /** Legend under the tier heading: more bars, more tuning. */
  tierLegend: string;
  runsOn: {
    label: string;
    items: { label: string; inProgress?: boolean }[];
  };
};

/** The /products overview. */
export type ProductsOverviewCopy = {
  seo: Seo;
  hero: { label: string; title: string; lede: string };
  layers: {
    heading: string;
    intro: string;
    /** Caption on the stack's base slab. */
    metal: { label: string; backends: string[] };
    /** Screen-reader name for the list of layers. */
    listLabel: string;
  };
  together: {
    heading: string;
    intro: string;
    aloneLabel: string;
    /** What each product does on its own, in the reader's words. */
    alone: Record<ProductSlug, string>;
    allLabel: string;
    all: string;
  };
  audience: {
    heading: string;
    intro: string;
    /** One line per solution; titles come from the nav dictionary. */
    items: Record<AudienceKey, string>;
  };
  cta: { title: string; body: string };
};
