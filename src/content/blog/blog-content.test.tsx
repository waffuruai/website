import { render, screen } from '@testing-library/react';
import { MDXProvider } from '@mdx-js/react';
import { readdirSync } from 'node:fs';
import { describe, expect, it, vi } from 'vitest';

import { BLOG_CATEGORIES, type Article } from '@/lib/blog';
import { getMember } from '@/content/team';
import { isLocale } from '@/i18n/config';
import { withDictionary } from '@/i18n/test-utils';

import { useMDXComponents as mdxComponents } from '../../../mdx-components';

// The layout reads the file system and the dictionaries; here the post body is
// what is under test, so it renders its children and nothing else.
vi.mock('@/components/blog/article-layout', () => ({
  ArticleLayout: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}));

type PostModule = {
  default: React.ComponentType;
  article: Article;
};

// Next's ImportMeta.glob typing is not generic, so the result is narrowed here.
const posts = import.meta.glob('./*/page*.mdx') as Record<
  string,
  () => Promise<PostModule>
>;
const FILE = /^\.\/([^/]+)\/page(?:\.([a-z]{2}))?\.mdx$/;

describe('blog posts', () => {
  it('finds the posts', () => {
    expect(Object.keys(posts).length).toBeGreaterThan(0);
  });

  it('every post has valid, complete article metadata', async () => {
    for (const [file, load] of Object.entries(posts)) {
      const match = FILE.exec(file);
      expect(match, file).not.toBeNull();
      const [, slug = '', code] = match ?? [];
      const { article, default: Content } = await load();

      expect(slug, file).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
      expect(
        code === undefined || (isLocale(code) && code !== 'en'),
        file,
      ).toBe(true);
      expect(typeof Content, file).toBe('function');
      expect(article.title.length, file).toBeGreaterThan(3);
      expect(article.description.length, file).toBeGreaterThan(30);
      expect(article.date, file).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(typeof article.published, file).toBe('boolean');
      expect(BLOG_CATEGORIES, file).toContain(article.category);
      // The author is a team slug, so the byline can show a name, role and photo.
      expect(
        getMember(article.author),
        `${file}: author "${article.author}"`,
      ).toBeDefined();
    }
  });

  it('keeps every translation in step with its English post', async () => {
    for (const [file, load] of Object.entries(posts)) {
      const [, slug = '', code] = FILE.exec(file) ?? [];
      if (!code) continue;
      const english = await posts[`./${slug}/page.mdx`]?.();
      expect(english, `${file} needs ${slug}/page.mdx`).toBeDefined();
      const { article } = await load();
      // These are the keys the filter, sort and byline run on.
      for (const key of ['author', 'date', 'category', 'published'] as const) {
        expect(article[key], `${file}: ${key}`).toEqual(english?.article[key]);
      }
    }
  });

  it('keeps only post folders and their markdown in the content directory', () => {
    const entries = readdirSync('src/content/blog', { withFileTypes: true });
    for (const entry of entries) {
      if (!entry.isDirectory()) continue;
      for (const file of readdirSync(`src/content/blog/${entry.name}`)) {
        expect(file, entry.name).toMatch(/^page(\.[a-z]{2})?\.mdx$/);
      }
    }
  });
});

describe('the launch post', () => {
  const load = posts['./introducing-waffuru/page.mdx'];

  function renderPost(Content: React.ComponentType) {
    return render(
      withDictionary(
        <MDXProvider components={mdxComponents({})}>
          <Content />
        </MDXProvider>,
      ),
    );
  }

  it('is published, by Eric Kryski, dated 2026-10-26, in Company', async () => {
    const { article } = await load!();
    expect(article).toMatchObject({
      author: 'eric-kryski',
      date: '2026-10-26',
      category: 'Company',
      published: true,
    });
  });

  it('has an English page, with any translations beside it', () => {
    const files = Object.keys(posts).filter((f) =>
      f.includes('introducing-waffuru'),
    );
    expect(files).toContain('./introducing-waffuru/page.mdx');
    for (const file of files) {
      expect(file).toMatch(/\/page(\.[a-z]{2})?\.mdx$/);
    }
  });

  it('opens with the mission, verbatim', async () => {
    const { default: Content } = await load!();
    const { container } = renderPost(Content);
    expect(container.textContent).toContain(
      'Democratize access to intelligence.',
    );
  });

  it('has the sections the announcement promises', async () => {
    const { default: Content } = await load!();
    renderPost(Content);
    const h2 = screen
      .getAllByRole('heading', { level: 2 })
      .map((h) => h.textContent);
    expect(h2).toEqual([
      'Why now',
      'What we are building',
      'What we value',
      'Who’s in the kitchen',
      'Where we are',
      'Follow along',
    ]);
  });

  it('links each product and the team page, and the ways to follow along', async () => {
    const { default: Content } = await load!();
    renderPost(Content);
    const hrefs = screen
      .getAllByRole('link')
      .map((a) => a.getAttribute('href'));
    for (const href of [
      '/products/iron',
      '/products/butter',
      '/products/waffle',
      '/products/syrup',
      '/about/team',
      'https://forms.gle/SHaVSRRWmZKy8UJy7',
      'https://x.com/waffuruai',
      'https://www.linkedin.com/company/waffuru/',
    ]) {
      expect(hrefs, href).toContain(href);
    }
  });

  it('renders both code blocks, each with a Copy button', async () => {
    const { default: Content } = await load!();
    const { container } = renderPost(Content);

    const blocks = container.querySelectorAll('figure[data-code-block]');
    expect(blocks).toHaveLength(2);
    expect(container.textContent).toContain(
      'pub fn iron_exp<T>(a: Tensor<T>, out: Tensor<T>) {',
    );
    expect(container.textContent).toContain(
      'curl -fsSL https://waffuru.ai/iron/install.sh | sh',
    );
    expect(screen.getAllByRole('button', { name: /^Copy/ })).toHaveLength(2);
  });

  it('keeps to the brand voice: no exclamation marks or hype words', async () => {
    const { default: Content } = await load!();
    const { container } = renderPost(Content);
    const text = container.textContent ?? '';
    expect(text).not.toContain('!');
    for (const word of [
      'revolutionary',
      'game-changing',
      'seamless',
      'unleash',
      'supercharge',
      'cutting-edge',
    ]) {
      expect(text.toLowerCase(), word).not.toContain(word);
    }
  });

  it('does not name products that are internal or undecided', async () => {
    const { default: Content } = await load!();
    const { container } = renderPost(Content);
    const text = container.textContent ?? '';
    for (const name of ['Morpheus', 'wOS', 'wrunner', 'wci', 'Juke']) {
      expect(text, name).not.toMatch(new RegExp(`\\b${name}\\b`));
    }
  });
});
