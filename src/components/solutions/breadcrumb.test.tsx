import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Breadcrumb } from '@/components/solutions/breadcrumb';
import { withDictionary } from '@/i18n/test-utils';

const items = [
  { label: 'Home', href: '/' },
  { label: 'Solutions', href: '/solutions' },
  { label: 'Enterprise', href: '/solutions/enterprise' },
];

describe('Breadcrumb', () => {
  it('links the trail and marks the current page', () => {
    render(withDictionary(<Breadcrumb label="Breadcrumb" items={items} />));
    const nav = screen.getByRole('navigation', { name: 'Breadcrumb' });
    expect(nav).toBeTruthy();
    expect(
      screen.getByRole('link', { name: 'Home' }).getAttribute('href'),
    ).toBe('/');
    expect(
      screen.getByRole('link', { name: 'Solutions' }).getAttribute('href'),
    ).toBe('/solutions');
    expect(screen.queryByRole('link', { name: 'Enterprise' })).toBeNull();
    expect(screen.getByText('Enterprise').getAttribute('aria-current')).toBe(
      'page',
    );
  });

  it('keeps visitors in their language', () => {
    render(
      withDictionary(<Breadcrumb label="Fil d’Ariane" items={items} />, 'fr'),
    );
    expect(
      screen.getByRole('link', { name: 'Solutions' }).getAttribute('href'),
    ).toBe('/fr/solutions');
  });
});
