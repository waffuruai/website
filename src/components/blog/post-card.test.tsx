import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { AuthorByline } from '@/components/blog/author-byline';
import { PostCard } from '@/components/blog/post-card';
import en from '@/i18n/dictionaries/en';
import ja from '@/i18n/dictionaries/ja';
import { withDictionary } from '@/i18n/test-utils';
import type { Post } from '@/lib/blog';

const post: Post = {
  slug: 'introducing-waffuru',
  title: 'Introducing Waffuru',
  description: 'Why we started.',
  author: 'eric-kryski',
  date: '2026-10-26',
  published: true,
  category: 'Company',
  locale: 'en',
  locales: ['en'],
  readingTime: { words: 1100, minutes: 5 },
};

describe('PostCard', () => {
  it('English page: links the post and shows category, date and reading time', () => {
    const { container } = render(
      withDictionary(<PostCard post={post} locale="en" blog={en.blog} />),
    );
    const link = screen.getByRole('link', { name: 'Introducing Waffuru' });
    expect(link.getAttribute('href')).toBe('/blog/introducing-waffuru');
    expect(container.textContent).toContain('Company');
    expect(container.textContent).toContain('October 26, 2026');
    expect(container.textContent).toContain('5 min read');
    expect(container.textContent).not.toContain(en.blog.englishOnly);
  });

  it('shows the byline with the team slug, linking to the team page', () => {
    render(withDictionary(<PostCard post={post} locale="en" blog={en.blog} />));
    const author = screen.getByRole('link', { name: 'By Eric Kryski' });
    expect(author.getAttribute('href')).toBe('/about/team');
  });

  it('other-language page, no translation: English URL, English text, and the note', () => {
    const { container } = render(
      withDictionary(<PostCard post={post} locale="ja" blog={ja.blog} />, 'ja'),
    );
    const link = screen.getByRole('link', { name: 'Introducing Waffuru' });
    // No /ja/ page exists, so the link is the English URL.
    expect(link.getAttribute('href')).toBe('/blog/introducing-waffuru');
    expect(link.getAttribute('hreflang')).toBe('en');
    // The post's own text is marked as English inside the Japanese page.
    expect(link.closest('[lang]')?.getAttribute('lang')).toBe('en');
    expect(container.textContent).toContain(ja.blog.englishOnly);
  });

  it('other-language page with a translation: localized URL, no note', () => {
    const translated: Post = {
      ...post,
      title: 'Waffuru のご紹介',
      locale: 'ja',
      locales: ['en', 'ja'],
    };
    const { container } = render(
      withDictionary(
        <PostCard post={translated} locale="ja" blog={ja.blog} />,
        'ja',
      ),
    );
    const link = screen.getByRole('link', { name: 'Waffuru のご紹介' });
    expect(link.getAttribute('href')).toBe('/ja/blog/introducing-waffuru');
    expect(link.getAttribute('hreflang')).toBe('ja');
    expect(link.closest('[lang]')).toBeNull();
    expect(container.textContent).not.toContain(ja.blog.englishOnly);
  });

  it('uses the heading level it is given', () => {
    render(
      withDictionary(
        <PostCard post={post} locale="en" blog={en.blog} headingAs="h3" />,
      ),
    );
    expect(screen.getByRole('heading', { level: 3 }).textContent).toBe(
      'Introducing Waffuru',
    );
  });
});

describe('AuthorByline', () => {
  it('shows name, role from the team copy, date and reading time', () => {
    const { container } = render(
      withDictionary(
        <AuthorByline
          author="eric-kryski"
          locale="en"
          blog={en.blog}
          date="2026-10-26"
          readingMinutes={5}
        />,
      ),
    );
    expect(container.textContent).toContain('By Eric Kryski');
    expect(container.textContent).toContain('Chief Product Officer');
    expect(container.textContent).toContain('October 26, 2026');
    expect(container.textContent).toContain('5 min read');
    // The photo is the team member's, from the image manifest.
    expect(container.querySelector('img')?.getAttribute('src')).toContain(
      '/img/team/eric-kryski',
    );
  });

  it('fails loudly for an author who is not on the team', () => {
    expect(() =>
      render(
        withDictionary(
          <AuthorByline author="nobody" locale="en" blog={en.blog} />,
        ),
      ),
    ).toThrow(/Unknown blog author "nobody"/);
  });
});
