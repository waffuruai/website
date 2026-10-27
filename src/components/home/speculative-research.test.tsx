import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { SpeculativeResearch } from './speculative-research';
import {
  speculativeEvidence,
  speculativeResearch,
} from '@/content/pages/speculative-research';
import { locales } from '@/i18n/config';
import { localize } from '@/lib/content';
import { withDictionary } from '@/i18n/test-utils';

describe('native speculative results', () => {
  it('shows the one-request and eight-request cards with the scaling strip', () => {
    render(
      withDictionary(<SpeculativeResearch content={speculativeResearch.en} />),
    );
    expect(
      screen
        .getByRole('button', { name: 'Greedy · T0' })
        .getAttribute('aria-pressed'),
    ).toBe('true');
    expect(screen.getByText('One active request')).toBeTruthy();
    expect(screen.getByText('8 concurrent requests')).toBeTruthy();
    expect(screen.getAllByText('145.6').length).toBeGreaterThanOrEqual(2);
    expect(screen.getByText('1,011 tok/s')).toBeTruthy();
    expect(screen.getByText('0.96 s')).toBeTruthy();
    expect(screen.getByText('26.3 tok/s')).toBeTruthy();
    expect(screen.getByText('4.5 s / 8.2 s')).toBeTruthy();
    expect(screen.getByText('+5.20')).toBeTruthy();
    expect(screen.getByText(/includes prefill and drain/)).toBeTruthy();
    expect(
      screen.getByText(/separate trials from the whole-burst/),
    ).toBeTruthy();
    // The strip lists every measured level as real text, highest last.
    const strip = screen
      .getByText('Whole-burst throughput as requests overlap')
      .closest('div')!.parentElement!;
    const terms = [...strip.querySelectorAll('dt')].map((dt) => dt.textContent);
    expect(terms).toEqual(['1', '2', '4', '8']);
    for (const level of speculativeEvidence.greedy.levels) {
      expect(
        within(strip).getAllByText(level.burst.toFixed(1)).length,
      ).toBeGreaterThanOrEqual(1);
    }
    // No 16-request figure anywhere in the visible copy.
    expect(screen.queryByText(/16 requests/)).toBeNull();
    expect(screen.queryByText(/16 concurrent/)).toBeNull();
  });

  it('switches sampling modes without mixing whole-burst and all-active clocks', async () => {
    const user = userEvent.setup();
    render(
      withDictionary(<SpeculativeResearch content={speculativeResearch.en} />),
    );
    await user.click(screen.getByRole('button', { name: 'Sampled · T0.7' }));
    expect(
      screen
        .getByRole('button', { name: 'Sampled · T0.7' })
        .getAttribute('aria-pressed'),
    ).toBe('true');
    const sampled = speculativeEvidence.sampled;
    const burst = sampled.levels[sampled.levels.length - 1];
    expect(screen.getAllByText(burst.burst.toFixed(1)).length).toBeGreaterThan(
      0,
    );
    expect(screen.getByText(`${burst.lane.toFixed(1)} tok/s`)).toBeTruthy();
    expect(screen.getByText('+8.81')).toBeTruthy();
    expect(screen.getByText('236.80')).toBeTruthy();
    await user.click(screen.getByRole('button', { name: 'Replay the flow' }));
    expect(screen.getByText('236.80')).toBeTruthy();
    await user.click(screen.getByRole('button', { name: 'Greedy · T0' }));
    expect(screen.getByText('+5.20')).toBeTruthy();
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
    expect(within(details).getByText(/1, 2, 4 and 8 concurrent/)).toBeTruthy();
    const table = within(details).getByRole('table');
    expect(table.textContent).toContain('Recorded concurrency results');
    expect(
      within(table)
        .getAllByRole('columnheader')
        .map((th) => th.textContent),
    ).toEqual(['MetricConcurrent requests →', '1', '2', '4', '8']);
    expect(within(table).getByText(/Median per request/)).toBeTruthy();
    expect(
      within(table).getByText(/Total output tokens over burst wall time/),
    ).toBeTruthy();
    expect(within(table).getAllByText('8.20').length).toBeGreaterThanOrEqual(1);
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
      expect(screen.getAllByText('145.6').length).toBeGreaterThanOrEqual(1);
      expect(screen.getByText(copy.gainHeading)).toBeTruthy();
      expect(screen.getByText(copy.scalingTitle)).toBeTruthy();
      expect(screen.getByText(copy.eyebrow)).toBeTruthy();
      expect(copy.eyebrow).toContain('18');
      expect(copy.eyebrow).toContain('26');
      expect(copy.title).not.toContain('16');
      expect(copy.burstTitle).not.toContain('16');
      expect(copy.diagramNote).not.toContain('16');
      expect(copy.gainScope).not.toContain('16');
      expect(screen.getByText(copy.cost)).toBeTruthy();
    },
  );
});
