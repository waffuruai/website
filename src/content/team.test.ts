import { describe, expect, it } from 'vitest';

import images from '@/generated/images.json';
import { localize } from '@/lib/content';
import {
  PLACEHOLDER,
  getMember,
  team,
  teamCopy,
  unfilledLinks,
  visibleLinks,
  type TeamMember,
} from '@/content/team';

describe('team', () => {
  it('lists every placeholder link so it shows up in review', () => {
    expect(unfilledLinks()).toMatchInlineSnapshot(`
      [
        "kyle-croll.website",
        "kyle-croll.x",
        "kyle-croll.github",
        "eric-gonzalez.website",
        "eric-gonzalez.x",
        "tom-turney.website",
        "cory-smith.website",
        "cory-smith.github",
      ]
    `);
  });

  it('never shows a placeholder or an empty link', () => {
    for (const member of team) {
      for (const [network, href] of visibleLinks(member)) {
        expect(href, `${member.slug}.${network}`).toMatch(/^https:\/\//);
        expect(href).not.toBe(PLACEHOLDER);
      }
    }

    const member: TeamMember = {
      slug: 'test',
      name: 'Test Person',
      photo: 'team/test',
      country: 'us',
      links: {
        linkedin: 'https://www.linkedin.com/in/test/',
        website: PLACEHOLDER,
        x: null,
        github: 'https://github.com/test',
      },
    };
    expect(visibleLinks(member)).toEqual([
      ['linkedin', 'https://www.linkedin.com/in/test/'],
      ['github', 'https://github.com/test'],
    ]);
    expect(unfilledLinks([member])).toEqual(['test.website']);
  });

  it('has English copy for every member', () => {
    const copy = localize(teamCopy, 'en');
    for (const member of team) {
      const entry = copy[member.slug];
      expect(entry, member.slug).toBeDefined();
      expect(entry?.role).toBeTruthy();
      expect(entry?.background).toBeTruthy();
      expect(entry?.bio).toBeTruthy();
    }
    expect(Object.keys(copy).sort()).toEqual(
      team.map((member) => member.slug).sort(),
    );
  });

  it('points every photo at a built image', () => {
    const built = images as Record<string, unknown>;
    for (const member of team) {
      expect(built[member.photo], member.photo).toBeDefined();
    }
  });

  it('finds members by slug and keeps slugs unique', () => {
    expect(getMember('tom-turney')?.name).toBe('Tom Turney');
    expect(getMember('nobody')).toBeUndefined();
    expect(new Set(team.map((member) => member.slug)).size).toBe(team.length);
  });

  it('places each person in the United States or Canada', () => {
    expect(
      Object.fromEntries(team.map((member) => [member.slug, member.country])),
    ).toEqual({
      'kyle-croll': 'us',
      'eric-gonzalez': 'us',
      'eric-kryski': 'ca',
      'tom-turney': 'us',
      'cory-smith': 'ca',
    });
  });
});
