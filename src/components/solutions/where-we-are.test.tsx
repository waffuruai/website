import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { WhereWeAre } from '@/components/solutions/where-we-are';
import { solutionsShared } from '@/content/pages/solutions/shared';

const { hardware } = solutionsShared.en;

function renderSection() {
  return render(
    <WhereWeAre
      id="where-we-are"
      label="Early access"
      title="Where we *are*."
      lede="Early access, closed source for now."
      notes={['Apple silicon is tuned first.', 'ROCm runs, not tuned yet.']}
      hardware={hardware}
    />,
  );
}

describe('WhereWeAre', () => {
  it('states each hardware tier as text, not only as colour', () => {
    renderSection();
    expect(screen.getByText('Apple · Metal')).toBeTruthy();
    expect(screen.getByText('Primary')).toBeTruthy();
    expect(screen.getByText('Tuning')).toBeTruthy();
    expect(screen.getByText('Coming soon')).toBeTruthy();
    expect(screen.getByText(/In production on RTX and DGX Spark/)).toBeTruthy();
    expect(screen.getByText(/Works today, not tuned yet/)).toBeTruthy();
  });

  it('lists the page notes and the machines it runs on', () => {
    renderSection();
    expect(screen.getByText('Apple silicon is tuned first.')).toBeTruthy();
    expect(screen.getByText('DGX Spark')).toBeTruthy();
    expect(
      screen.getByText('H100 · H200 · B100 · B200 · first runs'),
    ).toBeTruthy();
    expect(screen.getByText('MI300 · first runs')).toBeTruthy();
  });

  it('is a labelled section with an accented heading', () => {
    const { container } = renderSection();
    expect(
      container.querySelector('section')?.getAttribute('aria-labelledby'),
    ).toBe('where-we-are');
    expect(
      screen.getByRole('heading', { level: 2 }).querySelector('em')
        ?.textContent,
    ).toBe('are');
  });
});
