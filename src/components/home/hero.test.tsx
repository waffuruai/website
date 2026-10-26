import { render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { Hero } from '@/components/home/hero';
import { HeroTiles } from '@/components/home/hero-tiles';
import { home } from '@/content/pages/home';
import { site } from '@/content/site';
import { withDictionary } from '@/i18n/test-utils';

const primary = { label: 'Request early access', href: site.urls.earlyAccess };

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

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
  it('draws on two canvases, hidden from assistive tech', () => {
    stubBrowserApis();
    const { container } = render(<HeroTiles />);
    const floor = container.firstElementChild;
    expect(floor?.getAttribute('aria-hidden')).toBe('true');
    expect(floor?.querySelectorAll('canvas')).toHaveLength(2);
    // No 162 animated elements any more.
    expect(container.querySelectorAll('.wf-cell')).toHaveLength(0);
  });

  it('marks itself ready once set up, and tears down cleanly', () => {
    const { disconnect } = stubBrowserApis();
    const { container, unmount } = render(<HeroTiles />);
    expect(container.firstElementChild?.hasAttribute('data-ready')).toBe(true);
    unmount();
    expect(disconnect).toHaveBeenCalled();
  });
});

/** jsdom lacks the observers and matchMedia the floor uses. */
function stubBrowserApis() {
  const disconnect = vi.fn();
  class Observer {
    observe() {}
    disconnect = disconnect;
  }
  vi.stubGlobal('ResizeObserver', Observer);
  vi.stubGlobal('IntersectionObserver', Observer);
  vi.stubGlobal('matchMedia', () => ({
    matches: false,
    addEventListener() {},
    removeEventListener() {},
  }));
  // jsdom has no canvas: getContext returns null and the floor draws nothing.
  vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(null);
  return { disconnect };
}
