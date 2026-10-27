/**
 * Content model. Page copy lives in `src/content/**` as typed data (no JSX)
 * and is rendered by components; UI chrome strings live in the dictionaries.
 *
 * Every marketing page's content is `Localized<T>`: the English file is the
 * source of truth and imports one sibling per locale (`about.ja.ts`), typed
 * against the same `T` so a missing field fails typecheck.
 */
import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/dictionaries/en';

export type Localized<T> = { en: T } & Partial<
  Record<Exclude<Locale, 'en'>, T>
>;

export type Cta = {
  label: string;
  href: string;
  variant?: 'primary' | 'outline' | 'link';
};

export type FaqItem = { question: string; answer: string };

/** Copy for `StackFlow`, the stack drawn as the path a request takes. */
export type StackFlowCopy = {
  /** Who asks: the top of the flow ("You, your apps, your agents"). */
  you: string;
  /** Mono caps label on the dashed boundary. */
  boundary: string;
  /** The stack from the top down: what each layer does for you. */
  layers: { role: string; line: string; name?: string }[];
  /** The bottom row: hardware it runs on. */
  hardware: string[];
  /** Outside the boundary: where data does not go. */
  outside: { title: string; note: string };
  /** What lights up when the answer comes back. */
  outcomes: string[];
  /** The text alternative for the whole figure. */
  caption: string;
};

export type Seo = {
  title: string;
  description: string;
  keywords?: string[];
};

/* Navigation ------------------------------------------------------------- */

/** Keys of `T` whose values are plain strings. */
type StringKeys<T> = {
  [K in keyof T]: T[K] extends string ? K : never;
}[keyof T];

type NavDictionary = Dictionary['nav'];

/**
 * Nav labels are dictionary keys (`nav.items.<key>`), never raw strings, so
 * the same structure renders in every locale.
 */
export type NavItemKey = keyof NavDictionary['items'];

export type NavLink = {
  key: NavItemKey;
  href: string;
  /** Mono index shown before the label, as on the stack rows ("01"). */
  index?: string;
};

export type NavColumn = {
  heading?: StringKeys<NavDictionary>;
  links: NavLink[];
  /** Optional "All …" link under the column. */
  footer?: { labelKey: StringKeys<NavDictionary>; href: string };
};

export type NavMenu =
  | { type: 'menu'; labelKey: StringKeys<NavDictionary>; columns: NavColumn[] }
  | { type: 'link'; labelKey: StringKeys<NavDictionary>; href: string };

export type FooterColumn = {
  headingKey: StringKeys<Dictionary['footer']>;
  links: NavLink[];
};

export type Navigation = {
  main: NavMenu[];
  utility: {
    cta: { labelKey: StringKeys<Dictionary['common']>; href: string };
  };
  footer: {
    columns: FooterColumn[];
    legal: { labelKey: StringKeys<Dictionary['footer']>; href: string }[];
  };
};
