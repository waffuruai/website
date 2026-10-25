import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { HiringCallout } from '@/components/about/hiring-callout';
import { about } from '@/content/pages/about';
import { withDictionary } from '@/i18n/test-utils';

describe('HiringCallout', () => {
  const content = about.en.hiring;

  it('is the #hiring anchor, named by its heading', () => {
    const { container } = render(
      withDictionary(<HiringCallout content={content} />),
    );
    const section = container.querySelector('section#hiring');
    expect(section).not.toBeNull();
    expect(screen.getByRole('region', { name: 'Pull up a chair.' })).toBe(
      section,
    );
    expect(section?.querySelector('em')?.textContent).toBe('chair');
  });

  it('lists what we like working on and says who we want', () => {
    render(withDictionary(<HiringCallout content={content} />));
    expect(screen.getAllByRole('listitem').map((li) => li.textContent)).toEqual(
      content.skills,
    );
    expect(screen.getByText(/agentic company/)).toBeTruthy();
  });

  it('emails hiring with a Hiring subject', () => {
    render(withDictionary(<HiringCallout content={content} />));
    const link = screen.getByRole('link', { name: /Get in touch/ });
    expect(link.getAttribute('href')).toBe(
      'mailto:hello@waffuru.ai?subject=Hiring',
    );
  });
});
