import { afterEach, describe, expect, it, vi } from 'vitest';

import { industrySlugs } from '@/content/pages/industries/types';
import { productSlugs } from '@/content/pages/products/types';
import { solutionSlugs } from '@/content/pages/solutions/types';
import { site } from '@/content/site';

import {
  isPublished,
  isPublishedPath,
  sectionOf,
  sectionRoutes,
  showUnreleased,
  unreleasedRoutes,
  type Launched,
} from './launch';

afterEach(() => {
  vi.unstubAllEnvs();
});

const nothingLaunched: Launched = {
  pantry: false,
  stack: false,
  solutions: false,
  industries: false,
};
const prod = { launched: nothingLaunched, unreleased: false };

describe('site.launched', () => {
  // A tripwire: launching a section is a deliberate edit to this test too.
  it('launches exactly these sections', () => {
    expect(site.launched).toEqual({
      pantry: false,
      stack: true,
      solutions: true,
      industries: false,
    });
  });
});

describe('sectionRoutes', () => {
  it('covers every page of every gated section, once', () => {
    expect(sectionRoutes.stack).toEqual([
      '/products',
      ...productSlugs.map((slug) => `/products/${slug}`),
    ]);
    expect(sectionRoutes.solutions).toHaveLength(solutionSlugs.length + 1);
    expect(sectionRoutes.industries).toHaveLength(industrySlugs.length + 1);
    const all = Object.values(sectionRoutes).flat();
    expect(new Set(all).size).toBe(all.length);
  });

  it('keeps Pantry out of the stack', () => {
    expect(productSlugs).not.toContain('pantry');
    expect(sectionOf('/products/pantry')).toBe('pantry');
    expect(sectionOf('/products')).toBe('stack');
  });
});

describe('showUnreleased', () => {
  it('shows unreleased sections everywhere but production', () => {
    vi.stubEnv('NEXT_PUBLIC_SHOW_UNRELEASED', '');
    vi.stubEnv('NODE_ENV', 'production');
    expect(showUnreleased()).toBe(false);
    vi.stubEnv('NODE_ENV', 'development');
    expect(showUnreleased()).toBe(true);
  });

  it('lets NEXT_PUBLIC_SHOW_UNRELEASED decide', () => {
    vi.stubEnv('NODE_ENV', 'production');
    vi.stubEnv('NEXT_PUBLIC_SHOW_UNRELEASED', '1');
    expect(showUnreleased()).toBe(true);
    vi.stubEnv('NODE_ENV', 'development');
    vi.stubEnv('NEXT_PUBLIC_SHOW_UNRELEASED', '0');
    expect(showUnreleased()).toBe(false);
  });
});

describe('isPublishedPath', () => {
  it('hides unlaunched pages in any locale, with hashes and slashes', () => {
    for (const href of [
      '/products',
      '/products/iron',
      '/es/products/butter',
      '/solutions/neoclouds#faq',
      '/ja/industries/government/',
      '/products/pantry?ref=x',
    ]) {
      expect(isPublishedPath(href, prod), href).toBe(false);
    }
  });

  it('always publishes pages no section owns, and external links', () => {
    for (const href of [
      '/',
      '/about#hiring',
      '/blog/introducing-waffuru',
      '/products/unknown',
      'https://github.com/waffuruai/wscanner',
      'mailto:hello@waffuru.ai',
      '#install',
    ]) {
      expect(isPublishedPath(href, prod), href).toBe(true);
    }
  });

  it('follows the flag for each section', () => {
    const launched = { ...nothingLaunched, pantry: true };
    expect(
      isPublishedPath('/products/pantry', { launched, unreleased: false }),
    ).toBe(true);
    expect(
      isPublishedPath('/products/iron', { launched, unreleased: false }),
    ).toBe(false);
    expect(isPublished('stack', { launched, unreleased: true })).toBe(true);
  });
});

describe('unreleasedRoutes', () => {
  it('lists every route of every unlaunched section', () => {
    expect(unreleasedRoutes(prod)).toEqual(Object.values(sectionRoutes).flat());
    expect(unreleasedRoutes({ unreleased: true })).toEqual([]);
  });
});
