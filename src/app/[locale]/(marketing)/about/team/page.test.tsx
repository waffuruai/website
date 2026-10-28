import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import TeamPage, {
  generateMetadata,
} from '@/app/[locale]/(marketing)/about/team/page';
import { team, visibleLinks } from '@/content/team';
import { withDictionary } from '@/i18n/test-utils';

const params = Promise.resolve({ locale: 'en' });

async function renderPage() {
  return render(withDictionary(await TeamPage({ params })));
}

describe('Team page', () => {
  it('asks who is in the kitchen, once', async () => {
    await renderPage();
    const h1 = screen.getAllByRole('heading', { level: 1 });
    expect(h1).toHaveLength(1);
    expect(h1[0]?.textContent).toBe('Who’s in the kitchen.');
    expect(
      screen.getByText(
        'Experienced builders with backgrounds in cybersecurity, military, consumer and enterprise. We’ve built and scaled startups, and worked with everyone from small businesses to the enterprise.',
      ),
    ).toBeTruthy();
  });

  it('shows a card per person, h2 each, then hiring and the call to action', async () => {
    const { container } = await renderPage();
    expect(
      screen.getAllByRole('heading', { level: 2 }).map((h) => h.textContent),
    ).toEqual([
      ...team.map((member) => member.name),
      'Put on an apron.',
      'See what we’re cooking.',
    ]);
    expect(container.querySelector('#hiring')).not.toBeNull();
  });

  it('links only real profiles, each named for its person', async () => {
    await renderPage();
    const expected = team.flatMap((member) => visibleLinks(member));
    const external = screen
      .getAllByRole('article')
      .flatMap((card) => within(card).queryAllByRole('link'));
    expect(external).toHaveLength(expected.length);
    for (const link of external) {
      expect(link.getAttribute('rel')).toBe('noopener noreferrer');
      expect(link.getAttribute('href')).not.toContain('PLACEHOLDER');
    }
    expect(
      screen
        .getByRole('link', { name: 'Tom Turney on GitHub' })
        .getAttribute('href'),
    ).toBe('https://github.com/TheTom');
  });

  it('emits a Person per member (sameAs = visible links) and breadcrumbs', async () => {
    const { container } = await renderPage();
    const data = [
      ...container.querySelectorAll('script[type="application/ld+json"]'),
    ]
      .map((script) => JSON.parse(script.textContent ?? '{}'))
      .flat();
    const people = data.filter((item) => item['@type'] === 'Person');
    expect(people.map((p) => p.name)).toEqual(team.map((m) => m.name));
    for (const [index, member] of team.entries()) {
      expect(people[index].sameAs).toEqual(
        visibleLinks(member).map(([, href]) => href),
      );
      expect(people[index].image).toMatch(
        new RegExp(`^https://waffuru.ai/img/team/${member.slug}-\\d+\\.jpg$`),
      );
    }
    expect(data.at(-1)?.['@type']).toBe('BreadcrumbList');
  });

  it('sets metadata with keywords', async () => {
    const metadata = await generateMetadata({ params });
    expect(metadata.keywords).toEqual(['Waffuru team', 'Waffuru founders']);
    expect(metadata.alternates?.canonical).toBe('/about/team');
  });
});
