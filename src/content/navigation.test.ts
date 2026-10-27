import { describe, expect, it } from 'vitest';

import { isPublishedPath, type Launched } from '@/lib/launch';

import {
  internalNavHrefs,
  navigation,
  publishedNavigation,
} from './navigation';

const launch: Launched = {
  pantry: true,
  stack: false,
  solutions: false,
  industries: false,
};
const atLaunch = publishedNavigation(navigation, (href) =>
  isPublishedPath(href, { launched: launch, unreleased: false }),
);

const menuKeys = (nav = navigation) => nav.main.map((menu) => menu.labelKey);

describe('navigation', () => {
  it('orders the menus Products, Solutions, Industries, About, Blog', () => {
    expect(menuKeys()).toEqual([
      'products',
      'solutions',
      'industries',
      'company',
      'blog',
    ]);
  });

  it('shows everything when every section is published', () => {
    expect(publishedNavigation(navigation, () => true)).toEqual(navigation);
  });
});

describe('publishedNavigation at launch (Pantry only)', () => {
  it('drops the Solutions and Industries menus', () => {
    expect(menuKeys(atLaunch)).toEqual(['products', 'company', 'blog']);
  });

  it('leaves Pantry alone under Products, with no "whole stack" link', () => {
    const products = atLaunch.main[0];
    expect(products.type).toBe('menu');
    if (products.type !== 'menu') return;
    expect(products.columns).toHaveLength(1);
    expect(products.columns[0].heading).toBe('openSource');
    expect(products.columns[0].links.map((link) => link.href)).toEqual([
      '/products/pantry',
    ]);
    expect(products.columns[0].footer).toBeUndefined();
  });

  it('drops empty footer columns and every unlaunched link', () => {
    expect(atLaunch.footer.columns.map((column) => column.headingKey)).toEqual([
      'products',
      'company',
      'help',
    ]);
    expect(internalNavHrefs(atLaunch)).not.toEqual(
      expect.arrayContaining(['/products/iron']),
    );
    for (const href of internalNavHrefs(atLaunch)) {
      expect(href).not.toMatch(
        /^\/(solutions|industries)|^\/products(\/(iron|butter|waffle|syrup))?$/,
      );
    }
  });
});
