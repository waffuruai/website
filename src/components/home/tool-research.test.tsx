import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { ToolResearch } from '@/components/home/tool-research';
import { toolResearch } from '@/content/pages/tool-research';
import { locales } from '@/i18n/config';
import { localize } from '@/lib/content';
import { withDictionary } from '@/i18n/test-utils';

describe('ToolResearch', () => {
  it('leads with derived tokens per correct argument and keeps the raw counts beside it', () => {
    render(withDictionary(<ToolResearch content={toolResearch.en} />));
    expect(screen.getByRole('heading', { level: 2 }).textContent).toBe(
      'Fewer wrong arguments.Cheaper correct ones.',
    );
    expect(
      screen.getByText(
        /20 more exact arguments while lowering tokens per correct argument from about 1,400 to about 1,058/,
      ),
    ).toBeTruthy();
    const meters = screen.getAllByRole('meter');
    expect(meters.map((meter) => meter.getAttribute('aria-valuenow'))).toEqual([
      '1400',
      '1058',
    ]);
    for (const meter of meters)
      expect(meter.getAttribute('aria-valuemax')).toBe('1400');
    expect(screen.getByText('about 24% fewer')).toBeTruthy();
    const figure = screen.getByRole('figure');
    expect(figure.textContent).toContain('36→56 / 144');
    expect(figure.textContent).toContain('50,382→59,222');
    expect(figure.textContent).toContain('36 / 36');
    expect(figure.textContent).toContain('~442 tokens');
    expect(figure.textContent).toContain('17 / 29→21 / 29');
    expect(within(figure).getByText(/temperature 0, M5 Max/)).toBeTruthy();
    expect(
      within(figure).getByText(/not general task reliability/),
    ).toBeTruthy();
    expect(
      screen.getByText(/writing to or deleting the wrong path/),
    ).toBeTruthy();
    expect(screen.queryByText(/Juke/)).toBeNull();
  });

  it('exposes a focusable native disclosure and keeps costs and unmeasured benefits explicit', async () => {
    const user = userEvent.setup();
    const { container } = render(
      withDictionary(<ToolResearch content={toolResearch.en} />),
    );
    const details = container.querySelector('details')!;
    expect(details.open).toBe(false);
    const summary = details.querySelector('summary')!;
    summary.focus();
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
    expect(within(details).getByText(/not in a release yet/)).toBeTruthy();
    expect(within(details).queryByRole('link')).toBeNull();
  });

  it.each(locales)(
    'renders translated evidence and the same derived numbers in %s',
    (locale) => {
      const copy = localize(toolResearch, locale);
      render(
        withDictionary(<ToolResearch content={copy} locale={locale} />, locale),
      );
      expect(screen.getByText(copy.figure.headline)).toBeTruthy();
      expect(screen.getByText(copy.limits)).toBeTruthy();
      expect(screen.getByText(copy.figure.caption)).toBeTruthy();
      expect(
        screen
          .getAllByRole('meter')
          .map((meter) => meter.getAttribute('aria-valuenow')),
      ).toEqual(['1400', '1058']);
      // Placeholders are filled, in the locale's digit grouping.
      expect(screen.getAllByText(/1[,.  ]?400/).length).toBeGreaterThanOrEqual(
        2,
      );
      expect(screen.queryByText(/\{(more|before|after|percent)\}/)).toBeNull();
      expect(screen.queryByRole('link')).toBeNull();
      expect(screen.queryByText(/Juke/)).toBeNull();
    },
  );
});
