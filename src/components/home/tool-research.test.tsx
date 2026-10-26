import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { ToolResearch } from '@/components/home/tool-research';
import {
  toolResearch,
  toolResearchEvidence,
} from '@/content/pages/tool-research';
import { locales } from '@/i18n/config';
import { localize } from '@/lib/content';
import { withDictionary } from '@/i18n/test-utils';

describe('ToolResearch', () => {
  it('shows counts against the actual request denominator and preserves baseline retention', () => {
    render(withDictionary(<ToolResearch content={toolResearch.en} />));
    const meters = screen.getAllByRole('meter');
    expect(meters.map((meter) => meter.getAttribute('aria-valuenow'))).toEqual([
      '36',
      '56',
    ]);
    for (const meter of meters)
      expect(meter.getAttribute('aria-valuemax')).toBe('144');
    expect(screen.getByText('36 / 36')).toBeTruthy();
    expect(screen.getByText('20 additional correct responses')).toBeTruthy();
    expect(screen.getByRole('heading', { level: 2 }).textContent).toBe(
      'Better tool calls.Measured in Butter.',
    );
  });

  it('exposes a focusable native disclosure and keeps costs and unmeasured benefits explicit', async () => {
    const user = userEvent.setup();
    const { container } = render(
      withDictionary(<ToolResearch content={toolResearch.en} />),
    );
    const details = container.querySelector('details')!;
    expect(details.open).toBe(false);
    const summary = details.querySelector('summary')!;
    await user.tab();
    expect(document.activeElement).toBe(summary);
    await user.click(summary);
    expect(details.open).toBe(true);
    expect(within(details).getByText(/72 prompts/)).toBeTruthy();
    expect(
      within(details).getByText(/No external tools were executed/),
    ).toBeTruthy();
    expect(
      within(details).getByText(/8,304 input and 536 generated tokens/),
    ).toBeTruthy();
    expect(within(details).getByText(/not a released capability/)).toBeTruthy();
    expect(
      within(details)
        .getByRole('link', { name: toolResearch.en.source })
        .getAttribute('href'),
    ).toBe(toolResearchEvidence.sourceHref);
    expect(screen.getByText(/next outcomes to measure/)).toBeTruthy();
  });

  it.each(locales)(
    'renders translated evidence and the same immutable counts in %s',
    (locale) => {
      const copy = localize(toolResearch, locale);
      render(withDictionary(<ToolResearch content={copy} />, locale));
      expect(screen.getByText(copy.gain)).toBeTruthy();
      expect(screen.getByText(copy.limits)).toBeTruthy();
      expect(
        screen
          .getAllByRole('meter')
          .map((meter) => meter.getAttribute('aria-valuenow')),
      ).toEqual(['36', '56']);
      expect(
        screen.getByRole('link', { name: copy.source }).getAttribute('href'),
      ).toBe(toolResearchEvidence.sourceHref);
    },
  );
});
