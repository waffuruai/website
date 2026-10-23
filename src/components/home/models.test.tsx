import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Models } from '@/components/home/models';
import { home } from '@/content/pages/home';
import { withDictionary } from '@/i18n/test-utils';

const renderModels = () =>
  render(withDictionary(<Models content={home.en.models} />));

describe('Models', () => {
  it('has the heading and two lanes at 70s and 85s, the second reversed', () => {
    const { container } = renderModels();
    expect(screen.getByRole('heading', { level: 2 }).textContent).toBe(
      'Models on the menu.',
    );
    const tracks = [...container.querySelectorAll('.wf-marquee')];
    expect(tracks).toHaveLength(2);
    expect(tracks[0].className).toContain('[--marquee-duration:70s]');
    expect(tracks[1].className).toContain('[--marquee-duration:85s]');
    expect(tracks[0].hasAttribute('data-reverse')).toBe(false);
    expect(tracks[1].hasAttribute('data-reverse')).toBe(true);
  });

  it('lists every card twice per lane and hides the copy from assistive tech', () => {
    const { container } = renderModels();
    const lanes = [...container.querySelectorAll('.wf-marquee')];
    lanes.forEach((lane, index) => {
      const cards = lane.querySelectorAll(':scope > li');
      const copies = lane.querySelectorAll(':scope > li[aria-hidden="true"]');
      const labs = home.en.models.lanes[index].length;
      expect(cards).toHaveLength(labs * 2);
      expect(copies).toHaveLength(labs);
      // The copy is the second half, in the same order as the first.
      const texts = [...cards].map((card) => card.textContent);
      expect(texts.slice(labs)).toEqual(texts.slice(0, labs));
      for (const card of [...cards].slice(0, labs)) {
        expect(card.hasAttribute('aria-hidden')).toBe(false);
      }
    });
  });

  it('exposes each lab once to screen readers, with its status', () => {
    renderModels();
    const visible = screen.getAllByRole('listitem');
    // 18 real cards + the legend is aria-hidden, so it is not listed.
    expect(visible).toHaveLength(18);
    const deepseek = visible.find((item) =>
      within(item).queryByText('DeepSeek'),
    );
    expect(within(deepseek!).getByText('DeepSeek V4')).toBeTruthy();
    expect(within(deepseek!).getByText('In progress')).toBeTruthy();
    const meta = visible.find((item) => within(item).queryByText('Meta'));
    expect(within(meta!).getByText('Supported')).toBeTruthy();
  });

  it('draws lab logos as themed masks, not images', () => {
    const { container } = renderModels();
    expect(container.querySelector('img')).toBeNull();
    const logo = container.querySelector<HTMLElement>('.wf-logo');
    expect(logo?.style.getPropertyValue('--logo')).toBe('url(/logos/meta.svg)');
    expect(logo?.getAttribute('aria-hidden')).toBe('true');
  });

  it('covers DeepSeek V4, Drama-3 and Flint as in progress, the rest as supported', () => {
    const labs = home.en.models.lanes.flat();
    expect(labs.filter((lab) => lab.status === 'in-progress')).toEqual([
      expect.objectContaining({ lab: 'DeepSeek', models: 'DeepSeek V4' }),
      expect.objectContaining({ lab: 'Fish Audio', models: 'Drama-3' }),
      expect.objectContaining({ lab: 'Recursive', models: 'Flint' }),
    ]);
    expect(labs).toHaveLength(18);
  });
});
