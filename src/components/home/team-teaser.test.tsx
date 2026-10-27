import { render, screen, within } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { TeamTeaser } from '@/components/home/team-teaser';
import { home } from '@/content/pages/home';
import { team, teamCopy } from '@/content/team';
import { withDictionary } from '@/i18n/test-utils';

// The real <Picture> reads the image manifest that `pnpm images` generates.
vi.mock('@/components/picture', () => ({
  Picture: ({
    name,
    alt,
    imgClassName,
  }: {
    name: string;
    alt: string;
    imgClassName?: string;
  }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={`/img/${name}.jpg`} alt={alt} className={imgClassName} />
  ),
}));

const renderTeaser = () =>
  render(
    withDictionary(<TeamTeaser content={home.en.team} copy={teamCopy.en} />),
  );

describe('TeamTeaser', () => {
  it('has the heading with the accent word and the intro', () => {
    renderTeaser();
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading.textContent).toBe('Who’s in the kitchen.');
    expect(heading.querySelector('em')?.textContent).toBe('kitchen');
    expect(screen.getByText(home.en.team.intro)).toBeTruthy();
  });

  it('shows all five people with their portrait, name and role', () => {
    const { container } = renderTeaser();
    const people = screen.getAllByRole('listitem');
    expect(people).toHaveLength(5);
    expect(team).toHaveLength(5);
    team.forEach((member, index) => {
      const person = people[index];
      expect(
        within(person).getByRole('heading', { level: 3 }).textContent,
      ).toBe(member.name);
      expect(
        within(person).getByText(teamCopy.en[member.slug].role),
      ).toBeTruthy();
      expect(within(person).getByRole('img').getAttribute('alt')).toBe(
        `Portrait of ${member.name}`,
      );
    });
    expect(container.querySelectorAll('.wf-portrait')).toHaveLength(5);
  });

  it('keeps it short: no bios, one link to the team page', () => {
    renderTeaser();
    for (const copy of Object.values(teamCopy.en)) {
      expect(screen.queryByText(copy.bio)).toBeNull();
      expect(screen.queryByText(copy.background)).toBeNull();
    }
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(1);
    expect(links[0].getAttribute('href')).toBe('/about/team');
    expect(links[0].textContent).toContain('Meet the team');
  });
});
