import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { TeamCard, type TeamCardLabels } from '@/components/team/team-card';
import { TeamGrid } from '@/components/team/team-grid';
import {
  PLACEHOLDER,
  getMember,
  team,
  teamCopy,
  type TeamMember,
} from '@/content/team';
import { withDictionary } from '@/i18n/test-utils';

const labels: TeamCardLabels = {
  portraitAlt: 'Portrait of {name}',
  linkAria: '{name} on {network}',
  linkNames: {
    linkedin: 'LinkedIn',
    website: 'Website',
    x: 'X',
    github: 'GitHub',
  },
};

const sizes = '320px';
const copy = teamCopy.en;

function member(slug: string): TeamMember {
  const found = getMember(slug);
  if (!found) throw new Error(`no member ${slug}`);
  return found;
}

describe('TeamCard', () => {
  it('shows the role and background over the portrait, then name and bio', () => {
    const tom = member('tom-turney');
    const tomCopy = copy['tom-turney']!;
    render(
      withDictionary(
        <TeamCard member={tom} copy={tomCopy} labels={labels} sizes={sizes} />,
      ),
    );

    expect(
      screen.getByRole('img', { name: 'Portrait of Tom Turney' }),
    ).toBeTruthy();
    expect(screen.getByRole('heading', { name: 'Tom Turney' })).toBeTruthy();
    expect(screen.getByText(tomCopy.role)).toBeTruthy();
    expect(screen.getByText(tomCopy.background)).toBeTruthy();
    expect(screen.getByText(tomCopy.bio)).toBeTruthy();
  });

  it('renders only real profile links, in new tabs, with accessible names', () => {
    const eric = member('eric-kryski');
    render(
      withDictionary(
        <TeamCard
          member={eric}
          copy={copy['eric-kryski']!}
          labels={labels}
          sizes={sizes}
        />,
      ),
    );

    const names = screen.getAllByRole('link').map((link) => link.ariaLabel);
    expect(names).toEqual([
      'Eric Kryski on LinkedIn',
      'Eric Kryski on Website',
      'Eric Kryski on X',
      'Eric Kryski on GitHub',
    ]);
    const linkedin = screen.getByRole('link', {
      name: 'Eric Kryski on LinkedIn',
    });
    expect(linkedin.getAttribute('href')).toBe(
      'https://www.linkedin.com/in/ekryski/',
    );
    expect(linkedin.getAttribute('target')).toBe('_blank');
    expect(linkedin.getAttribute('rel')).toBe('noopener noreferrer');
    expect(linkedin.textContent).toContain('LinkedIn');
  });

  it('hides placeholder and missing links', () => {
    const cory = member('cory-smith');
    expect(Object.values(cory.links)).toContain(PLACEHOLDER);
    render(
      withDictionary(
        <TeamCard
          member={cory}
          copy={copy['cory-smith']!}
          labels={labels}
          sizes={sizes}
        />,
      ),
    );

    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(1);
    expect(links[0]?.ariaLabel).toBe('Cory Smith on LinkedIn');
    expect(screen.queryByText(PLACEHOLDER)).toBeNull();
  });

  it('omits the link row when a person has no links at all', () => {
    const bare: TeamMember = {
      ...member('cory-smith'),
      links: { linkedin: null, website: null, x: PLACEHOLDER, github: null },
    };
    render(
      withDictionary(
        <TeamCard
          member={bare}
          copy={copy['cory-smith']!}
          labels={labels}
          sizes={sizes}
        />,
      ),
    );
    expect(screen.queryByRole('link')).toBeNull();
    expect(screen.queryByRole('list')).toBeNull();
  });

  it('can render its heading one level down', () => {
    render(
      withDictionary(
        <TeamCard
          member={member('kyle-croll')}
          copy={copy['kyle-croll']!}
          labels={labels}
          sizes={sizes}
          headingLevel="h3"
        />,
      ),
    );
    expect(screen.getByRole('heading', { level: 3 })).toBeTruthy();
  });
});

describe('TeamGrid', () => {
  it('renders every member once, in order', () => {
    render(withDictionary(<TeamGrid locale="en" labels={labels} />));

    const cards = screen.getAllByRole('article');
    expect(cards).toHaveLength(team.length);
    expect(
      screen.getAllByRole('heading', { level: 2 }).map((h) => h.textContent),
    ).toEqual(team.map((person) => person.name));
  });
});
