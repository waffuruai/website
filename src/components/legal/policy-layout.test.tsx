import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { PolicyLayout } from '@/components/legal/policy-layout';
import { withDictionary } from '@/i18n/test-utils';
import type { Policy } from '@/lib/legal';

const policy: Policy = {
  title: 'Terms of use',
  description: 'The rules.',
  date: '2026-10-26',
  published: true,
};

const headings = [
  { id: 'using-the-site', text: 'Using the Site' },
  { id: 'feedback', text: 'Feedback' },
  { id: 'changes', text: 'Changes' },
];

const renderLayout = (
  props: Partial<React.ComponentProps<typeof PolicyLayout>> = {},
  locale: 'en' | 'ja' = 'en',
) =>
  render(
    withDictionary(
      <PolicyLayout policy={policy} {...props}>
        <p>The body of the policy.</p>
      </PolicyLayout>,
      locale,
    ),
  );

describe('PolicyLayout', () => {
  it('shows a serif h1 with the last word as the accent, and the date', () => {
    const { container } = renderLayout();
    const h1 = screen.getByRole('heading', { level: 1 });
    expect(h1.textContent).toBe('Terms of use');
    expect(h1.className).toContain('heading-section');
    expect(h1.querySelector('em')?.textContent).toBe('use');
    expect(container.querySelectorAll('h1')).toHaveLength(1);

    const time = container.querySelector('time');
    expect(time?.getAttribute('datetime')).toBe('2026-10-26');
    expect(time?.textContent).toBe('October 26, 2026');
    expect(time?.parentElement?.textContent).toBe(
      'Last updated October 26, 2026',
    );
    expect(time?.parentElement?.className).toContain('label-mono');
  });

  it('renders the policy in English whatever the page locale', () => {
    const { container } = renderLayout({ headings }, 'ja');
    const article = container.querySelector('article');
    expect(article?.getAttribute('lang')).toBe('en');
    expect(article?.textContent).toContain('The body of the policy.');
    // The sidebar contents are English text too.
    expect(container.querySelector('aside')?.getAttribute('lang')).toBe('en');
  });

  it('links back to the legal index within the visitor’s locale', () => {
    renderLayout({}, 'ja');
    expect(
      screen
        .getByRole('link', { name: /All legal documents/ })
        .getAttribute('href'),
    ).toBe('/ja/legal');
    renderLayout();
    expect(
      screen
        .getAllByRole('link', { name: /All legal documents/ })[1]
        .getAttribute('href'),
    ).toBe('/legal');
  });

  it('shows contents for three or more headings: a sidebar and a mobile <details>', () => {
    const { container } = renderLayout({ headings });

    const details = container.querySelector('details');
    expect(details).not.toBeNull();
    expect(details?.className).toContain('lg:hidden');
    expect(details?.hasAttribute('open')).toBe(false);
    expect(
      within(details as HTMLElement).getByText('On this page'),
    ).toBeTruthy();

    const aside = container.querySelector('aside');
    expect(aside?.className).toContain('lg:block');
    expect(aside?.className).toContain('hidden');

    for (const scope of [details, aside] as HTMLElement[]) {
      const nav = within(scope).getByRole('navigation', {
        name: 'On this page',
      });
      const links = within(nav).getAllByRole('link');
      expect(links.map((link) => link.textContent)).toEqual(
        headings.map((heading) => heading.text),
      );
      expect(links.map((link) => link.getAttribute('href'))).toEqual(
        headings.map((heading) => `#${heading.id}`),
      );
    }
  });

  it('leaves contents out for fewer than three headings', () => {
    const { container } = renderLayout({ headings: headings.slice(0, 2) });
    expect(container.querySelector('details')).toBeNull();
    expect(container.querySelector('aside')).toBeNull();
    expect(screen.queryByRole('navigation')).toBeNull();
    expect(container.textContent).toContain('The body of the policy.');
  });

  it('does not rely on JavaScript: a plain server-rendered tree', () => {
    const { container } = renderLayout({ headings });
    expect(container.querySelector('script')).toBeNull();
    expect(container.querySelector('button')).toBeNull();
  });

  it('keeps a one-word title as it is', () => {
    renderLayout({ policy: { ...policy, title: 'Security' } });
    const h1 = screen.getByRole('heading', { level: 1 });
    expect(h1.textContent).toBe('Security');
    expect(h1.querySelector('em')).toBeNull();
  });
});
