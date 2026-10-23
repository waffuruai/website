import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Stack } from '@/components/home/stack';
import { home } from '@/content/pages/home';
import { withDictionary } from '@/i18n/test-utils';

const renderStack = () =>
  render(
    withDictionary(<Stack content={home.en.stack} privateLabel="Private" />),
  );

describe('Stack', () => {
  it('orders the rows from the top of the stack down to the metal', () => {
    renderStack();
    const names = screen
      .getAllByRole('heading', { level: 3 })
      .map((heading) => heading.textContent);
    expect(names).toEqual(['Syrup', 'Waffle', 'Butter', 'Iron']);
    expect(screen.getByRole('heading', { level: 2 }).textContent).toBe(
      'The stack.',
    );
  });

  it('links each row to its product page through the product name', () => {
    renderStack();
    const links = screen.getAllByRole('link');
    expect(links.map((link) => link.getAttribute('href'))).toEqual([
      '/products/syrup',
      '/products/waffle',
      '/products/butter',
      '/products/iron',
    ]);
    expect(links.map((link) => link.textContent)).toEqual([
      'Syrup',
      'Waffle',
      'Butter',
      'Iron',
    ]);
  });

  it('numbers the rows from the metal up', () => {
    renderStack();
    const rows = screen.getAllByRole('listitem');
    expect(rows).toHaveLength(4);
    expect(within(rows[0]).getByText(/04 · Memory/)).toBeTruthy();
    expect(within(rows[3]).getByText(/01 · Kernels/)).toBeTruthy();
  });

  it('draws one decorative motif and one Private chip per row', () => {
    const { container } = renderStack();
    expect(screen.getAllByText('Private')).toHaveLength(4);
    expect(container.querySelectorAll('.wf-drop')).toHaveLength(1);
    expect(container.querySelectorAll('.wf-pat')).toHaveLength(1);
    expect(container.querySelectorAll('.wf-led')).toHaveLength(32);
    expect(container.querySelectorAll('.wf-stamp')).toHaveLength(16);
    for (const motif of container.querySelectorAll(
      '.wf-drip, .wf-pat, .wf-led, .wf-stamp',
    )) {
      expect(motif.closest('[aria-hidden="true"]')).not.toBeNull();
    }
  });

  it('staggers the LEDs and stamps as the design does', () => {
    const { container } = renderStack();
    const leds = [...container.querySelectorAll<HTMLElement>('.wf-led')];
    expect(leds[1].style.animationDelay).toBe('2.38s');
    expect(leds[2].style.animationDelay).toBe('0.85s');
    expect(leds[31].style.animationDelay).toBe('3.4s');
    const stamps = [...container.querySelectorAll<HTMLElement>('.wf-stamp')];
    expect(stamps[0].style.animationDelay).toBe('0s');
    expect(stamps[15].style.animationDelay).toBe('0.72s');
  });
});
