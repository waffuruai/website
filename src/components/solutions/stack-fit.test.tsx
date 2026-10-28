import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { StackFit } from '@/components/solutions/stack-fit';
import { solutionsShared } from '@/content/pages/solutions/shared';
import { withDictionary } from '@/i18n/test-utils';

const { products } = solutionsShared.en;

describe('StackFit', () => {
  const items = [
    { product: 'butter', need: 'Serve models.', body: 'Without Python.' },
    { product: 'syrup', need: 'See the fleet.', body: 'Every engine.' },
  ] as const;

  it('renders one row per product, each linking to its product page', () => {
    render(
      withDictionary(
        <StackFit
          id="stack"
          label="The stack"
          title="How the stack *fits*."
          intro="Two of four."
          items={[...items]}
          products={products}
        />,
      ),
    );
    const rows = screen.getAllByRole('listitem');
    expect(rows).toHaveLength(2);
    expect(
      within(rows[0]!).getByRole('heading', { level: 3, name: 'Butter' }),
    ).toBeTruthy();
    expect(within(rows[0]!).getByText('02 · Serving')).toBeTruthy();
    expect(
      screen.getByRole('link', { name: /Explore Butter/ }).getAttribute('href'),
    ).toBe('/products/butter');
    expect(
      screen.getByRole('link', { name: /Explore Syrup/ }).getAttribute('href'),
    ).toBe('/products/syrup');
  });

  it('labels the section by its heading and hides decorative motifs', () => {
    const { container } = render(
      withDictionary(
        <StackFit
          id="stack"
          label="The stack"
          title="How the stack *fits*."
          intro="Two of four."
          items={[...items]}
          products={products}
        />,
      ),
    );
    const section = container.querySelector('section');
    expect(section?.getAttribute('aria-labelledby')).toBe('stack');
    expect(container.querySelector('#stack')?.tagName).toBe('H2');
    expect(
      container.querySelectorAll('[aria-hidden="true"] .wf-strand').length,
    ).toBe(6);
  });
});
