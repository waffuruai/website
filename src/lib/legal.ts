import { glob, readFile } from 'node:fs/promises';
import path from 'node:path';

import type { MDXComponents } from 'mdx/types';

import { extractHeadings, type Heading } from '@/lib/headings';

/** Where the policies live: `<slug>/page.mdx`, relative to the project root. */
export const LEGAL_DIRECTORY = './src/content/legal';

/** What each policy's MDX exports as `policy`. */
export interface Policy {
  title: string;
  description: string;
  /** ISO date (`2026-10-26`) the text last changed. */
  date: string;
  /** Unpublished drafts are neither listed nor built. */
  published: boolean;
  keywords?: string[];
}

export interface PolicyWithSlug extends Policy {
  slug: string;
}

/** What an MDX policy module exports: the page and its metadata. */
export type PolicyModule = {
  default: React.ComponentType<{
    /** `##` headings for the layout's table of contents. */
    headings?: Heading[];
    /** Overrides for MDX elements (e.g. localized links). */
    components?: MDXComponents;
  }>;
  policy: Policy;
};

/** Imports a policy's MDX module (content component + metadata). */
export const importPolicyModule = (slug: string) =>
  import(`@/content/legal/${slug}/page.mdx`) as Promise<PolicyModule>;

/** Slugs of every `<slug>/page.mdx` under the legal directory, sorted. */
export async function listPolicySlugs(): Promise<string[]> {
  const slugs: string[] = [];
  for await (const entry of glob('*/page.mdx', { cwd: LEGAL_DIRECTORY })) {
    slugs.push(entry.replace(/[\\/]page\.mdx$/, ''));
  }
  return slugs.sort();
}

/**
 * A policy's module, or null when `slug` has no MDX file or is not
 * published (a draft is a 404, never a page).
 */
export async function loadPolicy(slug: string): Promise<PolicyModule | null> {
  if (!/^[a-z0-9-]+$/.test(slug)) return null;
  try {
    const policyModule = await importPolicyModule(slug);
    return policyModule.policy.published ? policyModule : null;
  } catch {
    return null;
  }
}

/** The `##` headings of a policy's MDX source, for its table of contents. */
export async function loadPolicyHeadings(slug: string): Promise<Heading[]> {
  try {
    const source = await readFile(
      path.join(process.cwd(), LEGAL_DIRECTORY, slug, 'page.mdx'),
      'utf8',
    );
    return extractHeadings(source);
  } catch {
    return [];
  }
}

/** Published policies, in the order the footer lists them. */
const ORDER = ['terms', 'privacy', 'cookies'];

const rank = (slug: string) => {
  const index = ORDER.indexOf(slug);
  return index === -1 ? ORDER.length : index;
};

/** All published policies: the main three first, then the rest by slug. */
export async function getAllPolicies(): Promise<PolicyWithSlug[]> {
  const slugs = await listPolicySlugs();
  const loaded = await Promise.all(
    slugs.map(async (slug) => {
      const policyModule = await loadPolicy(slug);
      return policyModule ? { slug, ...policyModule.policy } : null;
    }),
  );
  return loaded
    .filter((policy): policy is PolicyWithSlug => policy !== null)
    .sort(
      (a, z) => rank(a.slug) - rank(z.slug) || a.slug.localeCompare(z.slug),
    );
}

const dateFormat = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  timeZone: 'UTC',
});

/** `2026-10-26` → `October 26, 2026` (policies are English-only). */
export const formatPolicyDate = (iso: string) =>
  dateFormat.format(new Date(`${iso}T00:00:00Z`));
