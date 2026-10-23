import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import {
  MIN_TOC_HEADINGS,
  TableOfContents,
  hasToc,
} from '@/components/blog/table-of-contents';

const headings = [
  { id: 'why-now', text: 'Why now' },
  { id: 'what-we-build', text: 'What we build' },
  { id: 'where-we-are', text: 'Where we are' },
];

describe('TableOfContents', () => {
  it('asks for three headings', () => {
    expect(MIN_TOC_HEADINGS).toBe(3);
    expect(hasToc(headings.slice(0, 2))).toBe(false);
    expect(hasToc(headings)).toBe(true);
  });

  it.each(['sidebar', 'inline'] as const)(
    'renders nothing with fewer than three headings (%s)',
    (variant) => {
      const { container } = render(
        <TableOfContents
          headings={headings.slice(0, 2)}
          title="On this page"
          variant={variant}
        />,
      );
      expect(container.innerHTML).toBe('');
    },
  );

  it('sidebar: a labelled nav of anchors, in order', () => {
    render(
      <TableOfContents
        headings={headings}
        title="On this page"
        variant="sidebar"
      />,
    );
    const nav = screen.getByRole('navigation', { name: 'On this page' });
    const links = within(nav).getAllByRole('link');
    expect(links.map((a) => a.textContent)).toEqual(
      headings.map((h) => h.text),
    );
    expect(links.map((a) => a.getAttribute('href'))).toEqual([
      '#why-now',
      '#what-we-build',
      '#where-we-are',
    ]);
  });

  it('inline: a collapsed <details> for small screens, same links', () => {
    const { container } = render(
      <TableOfContents
        headings={headings}
        title="On this page"
        variant="inline"
      />,
    );
    const details = container.querySelector('details');
    expect(details).not.toBeNull();
    expect(details?.hasAttribute('open')).toBe(false);
    expect(details?.querySelector('summary')?.textContent).toContain(
      'On this page',
    );
    expect(details?.querySelectorAll('a[href^="#"]')).toHaveLength(3);
    // Large screens use the sidebar instead.
    expect(details?.className).toContain('lg:hidden');
  });
});
