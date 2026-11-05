import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { buildInfo } from '@/generated/build-info';
import en from '@/i18n/dictionaries/en';
import { withDictionary } from '@/i18n/test-utils';

import { Footer } from './footer';

describe('Footer', () => {
  it('prints the site version between the copyright and Made with', () => {
    const { container } = render(withDictionary(<Footer dictionary={en} />));
    const version = `v${buildInfo.version} (${buildInfo.commit} ${buildInfo.date})`;
    const text = container.textContent ?? '';
    expect(text).toContain(version);
    expect(text.indexOf('Waffuru AI Inc.')).toBeLessThan(text.indexOf(version));
    expect(text.indexOf(version)).toBeLessThan(text.indexOf('Made with'));
  });

  it('gives the policies their own Legal column, last', () => {
    render(withDictionary(<Footer dictionary={en} />));
    const nav = screen.getByRole('navigation', { name: en.footer.heading });
    const columns = [...nav.children];
    const legal = columns.at(-1) as HTMLElement;
    expect(within(legal).getByText(en.footer.legal)).toBeTruthy();
    expect(
      within(legal)
        .getAllByRole('link')
        .map((link) => [link.textContent, link.getAttribute('href')]),
    ).toEqual([
      [en.footer.terms, '/legal/terms'],
      [en.footer.privacy, '/legal/privacy'],
      [en.footer.cookies, '/legal/cookies'],
    ]);
    expect(
      within(legal).getByRole('button', { name: en.consent.settings }),
    ).toBeTruthy();
    // Only once on the page: the bar under the columns no longer repeats them.
    expect(screen.getAllByRole('link', { name: en.footer.terms })).toHaveLength(
      1,
    );
  });

  it('lists Support and Contact under Company', () => {
    render(withDictionary(<Footer dictionary={en} />));
    const nav = screen.getByRole('navigation', { name: en.footer.heading });
    const company = [...nav.children].find(
      (column) => column.firstElementChild?.textContent === en.footer.company,
    ) as HTMLElement;
    const hrefs = within(company)
      .getAllByRole('link')
      .map((link) => link.getAttribute('href'));
    expect(hrefs).toEqual(expect.arrayContaining(['/support', '/contact']));
    expect(screen.queryByText('Help')).toBeNull();
  });
});
