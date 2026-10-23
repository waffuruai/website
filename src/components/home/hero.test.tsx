import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Hero } from '@/components/home/hero';
import { HeroTiles } from '@/components/home/hero-tiles';
import { home } from '@/content/pages/home';
import { site } from '@/content/site';
import { withDictionary } from '@/i18n/test-utils';

const primary = { label: 'Request early access', href: site.urls.earlyAccess };

describe('Hero', () => {
  it('renders the one h1 with the gold accent word', () => {
    const { container } = render(
      withDictionary(<Hero content={home.en.hero} primary={primary} />),
    );
    const headings = screen.getAllByRole('heading', { level: 1 });
    expect(headings).toHaveLength(1);
    expect(headings[0].textContent).toBe('Raw math, pressed into silicon.');
    expect(headings[0].querySelector('em')?.textContent).toBe('pressed');
    expect(container.querySelector('h1.heading-hero')).not.toBeNull();
  });

  it('offers early access first and a jump to the stack second', () => {
    render(withDictionary(<Hero content={home.en.hero} primary={primary} />));
    const access = screen.getByRole('link', { name: /request early access/i });
    expect(access.getAttribute('href')).toBe(site.urls.earlyAccess);
    expect(
      screen.getByRole('link', { name: /see the stack/i }).getAttribute('href'),
    ).toBe('#stack');
  });

  it('lists every backend Iron emits, with a decorative cursor', () => {
    const { container } = render(
      withDictionary(<Hero content={home.en.hero} primary={primary} />),
    );
    for (const target of home.en.hero.emits.targets) {
      expect(screen.getByText(target)).toBeTruthy();
    }
    expect(
      container.querySelector('.wf-blink')?.getAttribute('aria-hidden'),
    ).toBe('true');
  });
});

describe('HeroTiles', () => {
  it('lays out 18 x 9 tiles, 25 of them hot, hidden from assistive tech', () => {
    const { container } = render(<HeroTiles />);
    expect(container.firstElementChild?.getAttribute('aria-hidden')).toBe(
      'true',
    );
    expect(container.querySelectorAll('.wf-cell')).toHaveLength(162);
    expect(container.querySelectorAll('.wf-cell[data-hot]')).toHaveLength(25);
  });

  it('ripples diagonally: delay is (row + column) x 0.18s', () => {
    const { container } = render(<HeroTiles />);
    const tiles = [...container.querySelectorAll<HTMLElement>('.wf-cell')];
    expect(tiles[0].style.animationDelay).toBe('0s');
    expect(tiles[1].style.animationDelay).toBe('0.18s');
    // Row 1, column 0.
    expect(tiles[18].style.animationDelay).toBe('0.18s');
    // Last tile: row 8, column 17.
    expect(tiles[161].style.animationDelay).toBe('4.5s');
  });

  it('pools gold where the design does', () => {
    const { container } = render(<HeroTiles />);
    const hot = [...container.querySelectorAll('.wf-cell')]
      .map((tile, index) => (tile.hasAttribute('data-hot') ? index : -1))
      .filter((index) => index >= 0);
    expect(hot).toEqual([
      0, 11, 13, 22, 23, 34, 35, 44, 46, 58, 66, 69, 75, 81, 88, 93, 97, 104,
      116, 119, 128, 139, 141, 150, 151,
    ]);
  });
});
