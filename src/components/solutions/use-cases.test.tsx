import { render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { UseCases } from '@/components/solutions/use-cases';
import { solutionsShared } from '@/content/pages/solutions/shared';
import type { UseCase } from '@/content/pages/solutions/types';
import type { Locale } from '@/i18n/config';
import { withDictionary } from '@/i18n/test-utils';

const items: UseCase[] = [
  { tag: 'cost', title: 'See the spend.', body: 'Per workload.' },
  {
    tag: 'control',
    title: 'Harden the hosts.',
    body: 'Scan every machine.',
    link: { label: 'Explore Pantry', href: '/products/pantry' },
  },
];

function renderUseCases(locale: Locale = 'en') {
  return render(
    withDictionary(
      <UseCases
        id="use-cases"
        label="Use cases"
        title="Jobs *done*."
        intro="Two jobs."
        items={items}
        tags={solutionsShared.en.tags}
      />,
      locale,
    ),
  );
}

describe('UseCases', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('renders each job as a card with its tag, title and body', () => {
    renderUseCases();
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
    expect(
      screen.getByRole('heading', { level: 3, name: 'See the spend.' }),
    ).toBeTruthy();
    expect(screen.getByText('Per workload.')).toBeTruthy();
    expect(screen.getByText('Control')).toBeTruthy();
  });

  it('links onward, localized, when the page is published', () => {
    vi.stubEnv('NEXT_PUBLIC_SHOW_UNRELEASED', '1');
    renderUseCases('ja');
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(1);
    expect(links[0]?.textContent).toContain('Explore Pantry');
    expect(links[0]?.getAttribute('href')).toBe('/ja/products/pantry');
  });

  it('leaves the link out while its section is unlaunched', () => {
    vi.stubEnv('NEXT_PUBLIC_SHOW_UNRELEASED', '0');
    renderUseCases();
    expect(screen.queryByRole('link')).toBeNull();
    expect(screen.queryByText('Explore Pantry')).toBeNull();
    expect(screen.getByText('Scan every machine.')).toBeTruthy();
  });
});
