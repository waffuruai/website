import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { withDictionary } from '@/i18n/test-utils';

import { useMDXComponents as mdxComponents } from '../../../mdx-components';

const components = mdxComponents({}) as Record<
  string,
  React.ComponentType<Record<string, unknown>>
>;
const A = components.a!;
const H2 = components.h2!;
const H3 = components.h3!;

describe('MDX links', () => {
  it('keep internal links in the visitor language', () => {
    render(withDictionary(<A href="/products/iron">Iron</A>, 'ja'));
    expect(
      screen.getByRole('link', { name: 'Iron' }).getAttribute('href'),
    ).toBe('/ja/products/iron');
  });

  it('leave English paths unprefixed', () => {
    render(withDictionary(<A href="/about/team">Team</A>));
    expect(screen.getByRole('link').getAttribute('href')).toBe('/about/team');
  });

  it('open web links in a new tab, safely', () => {
    render(withDictionary(<A href="https://x.com/waffuruai">X</A>));
    const link = screen.getByRole('link');
    expect(link.getAttribute('target')).toBe('_blank');
    expect(link.getAttribute('rel')).toBe('noopener noreferrer');
  });

  it('leave mailto and in-page links alone', () => {
    render(
      withDictionary(
        <>
          <A href="mailto:hello@waffuru.ai">Mail</A>
          <A href="#why-now">Jump</A>
        </>,
      ),
    );
    for (const link of screen.getAllByRole('link')) {
      expect(link.getAttribute('target')).toBeNull();
    }
  });
});

describe('MDX headings', () => {
  it('are links to themselves, using the id rehype-slug gave them', () => {
    render(
      withDictionary(
        <>
          <H2 id="why-now">Why now</H2>
          <H3 id="iron">Iron</H3>
        </>,
      ),
    );
    const h2 = screen.getByRole('heading', { level: 2, name: 'Why now' });
    expect(h2.id).toBe('why-now');
    expect(h2.querySelector('a')?.getAttribute('href')).toBe('#why-now');
    const h3 = screen.getByRole('heading', { level: 3, name: 'Iron' });
    expect(h3.querySelector('a')?.getAttribute('href')).toBe('#iron');
  });

  it('derive an id when none was set', () => {
    render(withDictionary(<H2>Who’s in the kitchen</H2>));
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading.id).toBe('whos-in-the-kitchen');
    expect(heading.querySelector('a')?.getAttribute('href')).toBe(
      '#whos-in-the-kitchen',
    );
  });

  it('keep the heading name clean (the anchor adds no text)', () => {
    render(withDictionary(<H2 id="a">Where we are</H2>));
    expect(screen.getByRole('heading').textContent).toBe('Where we are');
  });
});
