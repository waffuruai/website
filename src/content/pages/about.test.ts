import { describe, expect, it } from 'vitest';

import { about } from '@/content/pages/about';
import { site } from '@/content/site';
import { localize } from '@/lib/content';

describe('about content', () => {
  const content = localize(about, 'en');

  it('states the mission verbatim, with no vision statement', () => {
    expect(content.hero.title.replace(/\*/g, '')).toBe(site.mission);
    expect(JSON.stringify(content).toLowerCase()).not.toContain('vision');
  });

  it('has the seven theses and the fourteen values', () => {
    expect(content.beliefs.theses).toHaveLength(7);
    expect(content.values.items).toHaveLength(14);
  });

  it('gives every heading exactly one accent word', () => {
    const titles = [
      content.hero.title,
      content.why.title,
      content.beliefs.title,
      content.values.title,
      content.teamTeaser.title,
      content.hiring.title,
      content.cta.title,
    ];
    for (const title of titles) {
      expect(title.match(/\*[^*]+\*/g), title).toHaveLength(1);
    }
  });

  it('does not name internal products', () => {
    const text = JSON.stringify(content);
    for (const internal of ['Morpheus', 'wrunner', 'Juke', 'wOS']) {
      expect(text).not.toContain(internal);
    }
  });
});
