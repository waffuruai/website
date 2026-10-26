import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { SpeculativeResearch } from './speculative-research';
import { speculativeResearch } from '@/content/pages/speculative-research';
import { locales } from '@/i18n/config';
import { localize } from '@/lib/content';
import { withDictionary } from '@/i18n/test-utils';

describe('native speculative results', () => {
  it('switches sampling modes without mixing whole-burst and all-active clocks', async () => {
    const user = userEvent.setup();
    render(
      withDictionary(<SpeculativeResearch content={speculativeResearch.en} />),
    );
    expect(
      screen
        .getByRole('button', { name: 'Greedy · T0' })
        .getAttribute('aria-pressed'),
    ).toBe('true');
    expect(screen.getByText('157.3')).toBeTruthy();
    expect(screen.getByText('+5.20')).toBeTruthy();
    expect(screen.getByText('12.9 tok/s')).toBeTruthy();
    expect(screen.getByText('8.8 s / 16.0 s')).toBeTruthy();
    await user.click(screen.getByRole('button', { name: 'Sampled · T0.7' }));
    expect(
      screen
        .getByRole('button', { name: 'Sampled · T0.7' })
        .getAttribute('aria-pressed'),
    ).toBe('true');
    expect(screen.getByText('149.4')).toBeTruthy();
    expect(screen.getByText('70.5')).toBeTruthy();
    expect(screen.getByText('12.3 tok/s')).toBeTruthy();
    expect(screen.getByText('8.4 s / 15.4 s')).toBeTruthy();
    expect(screen.queryByText('8.8 s / 16.0 s')).toBeNull();
    expect(screen.getByText('+8.81')).toBeTruthy();
    expect(screen.getByText('236.80')).toBeTruthy();
    expect(screen.getByText(/includes prefill and drain/)).toBeTruthy();
    expect(
      screen.getByText(/separate trials from the whole-burst/),
    ).toBeTruthy();
    await user.click(screen.getByRole('button', { name: 'Replay the flow' }));
    expect(screen.getByText('149.4')).toBeTruthy();
    await user.click(screen.getByRole('button', { name: 'Greedy · T0' }));
    expect(screen.getByText('157.3')).toBeTruthy();
    expect(screen.queryByText('236.80')).toBeNull();
  });

  it('keeps the research scope, losing latency and public test conditions inspectable', () => {
    const { container } = render(
      withDictionary(<SpeculativeResearch content={speculativeResearch.en} />),
    );
    const details = container.querySelector('details')!;
    expect(details.open).toBe(false);
    expect(within(details).getByText(/9.030 to 9.397 seconds/)).toBeTruthy();
    expect(within(details).getByText(/111\/111/)).toBeTruthy();
    const table = within(details).getByRole('table');
    expect(table.textContent).toContain('Recorded workload results');
    expect(
      within(table).getAllByText(/Median of three runs/).length,
    ).toBeGreaterThanOrEqual(3);
    expect(
      within(table).getByText(/Pooled whole-burst throughput/),
    ).toBeTruthy();
    expect(within(table).getByText('16.0 / 15.4')).toBeTruthy();
    expect(within(details).queryByRole('link')).toBeNull();
    expect(screen.getByText(/not internal scheduling/)).toBeTruthy();
  });

  it.each(locales)(
    'renders the same measured results and translated controls in %s',
    (locale) => {
      const copy = localize(speculativeResearch, locale);
      render(withDictionary(<SpeculativeResearch content={copy} />, locale));
      expect(screen.getByText(copy.intro)).toBeTruthy();
      expect(screen.getByRole('button', { name: copy.sampled })).toBeTruthy();
      expect(screen.getByText('226.61')).toBeTruthy();
      expect(screen.getByText(copy.gainHeading)).toBeTruthy();
      expect(screen.getByText(copy.eyebrow)).toBeTruthy();
      expect(copy.eyebrow).toContain('18');
      expect(screen.getByText(copy.cost)).toBeTruthy();
    },
  );
});
