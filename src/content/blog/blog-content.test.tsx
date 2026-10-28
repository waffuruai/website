import { render, screen } from '@testing-library/react';
import { MDXProvider } from '@mdx-js/react';
import { readdirSync } from 'node:fs';
import { describe, expect, it, vi } from 'vitest';

import { BLOG_CATEGORIES, type Article } from '@/lib/blog';
import { home } from '@/content/pages/home';
import { pantryFacts } from '@/content/pages/pantry/facts';
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

  it('is published, by Eric Kryski, dated 2026-10-28, in Company', async () => {
    const { article } = await load!();
    expect(article).toMatchObject({
      title: 'Announcing Waffuru',
      author: 'eric-kryski',
      date: '2026-10-28',
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
      'What we believe',
      'The stack',
      'First off the griddle: Pantry',
      'Who’s in the kitchen',
      'Where we are',
      'Pull up a seat',
    ]);
  });

  it('shows the stack as the home page does', async () => {
    const { default: Content } = await load!();
    const { container } = renderPost(Content);
    const figure = container.querySelector('figure figcaption');
    expect(figure?.textContent).toBe(home.en.stack.flow.caption);
    for (const layer of home.en.stack.flow.layers) {
      expect(container.textContent).toContain(layer.role);
    }
  });

  it('links the theses, the team, Pantry and the ways to follow along', async () => {
    const { default: Content } = await load!();
    renderPost(Content);
    const hrefs = screen
      .getAllByRole('link')
      .map((a) => a.getAttribute('href'));
    for (const href of [
      '/',
      '/about#beliefs',
      '/about/team',
      '/products/pantry',
      '/blog/introducing-pantry',
      'https://github.com/waffuruai/pantry',
      'https://forms.gle/SHaVSRRWmZKy8UJy7',
      'https://x.com/waffuruai',
      'https://www.linkedin.com/company/waffuru/',
    ]) {
      expect(hrefs, href).toContain(href);
    }
  });

  it('renders the install block with a Copy button', async () => {
    const { default: Content } = await load!();
    const { container } = renderPost(Content);
    const blocks = container.querySelectorAll('figure[data-code-block]');
    expect(blocks).toHaveLength(1);
    expect(container.textContent).toContain(
      'mise use -g packslip:github.com/waffuruai/pantry',
    );
    expect(screen.getAllByRole('button', { name: /^Copy/ })).toHaveLength(1);
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

describe('the Pantry post', () => {
  const load = posts['./introducing-pantry/page.mdx'];

  const renderPost = async () => {
    const { default: Content } = await load!();
    return render(
      withDictionary(
        <MDXProvider components={mdxComponents({})}>
          <Content />
        </MDXProvider>,
      ),
    );
  };

  it('is a published product post by Eric Kryski', async () => {
    const { article } = await load!();
    expect(article).toMatchObject({
      author: 'eric-kryski',
      category: 'Product',
      published: true,
    });
  });

  it('links the product page and the source, and shows the diagram', async () => {
    const { container } = await renderPost();
    const hrefs = screen
      .getAllByRole('link')
      .map((a) => a.getAttribute('href'));
    expect(hrefs).toContain(pantryFacts.path);
    expect(hrefs).toContain(pantryFacts.repo);
    expect(container.textContent).toContain(pantryFacts.install.mise);
    expect(container.textContent).toContain('gh attestation verify');
    for (const source of [
      'https://osv.dev',
      'https://www.cisa.gov/known-exploited-vulnerabilities-catalog',
      'https://endoflife.date',
      'https://github.com/ossf/malicious-packages',
    ]) {
      expect(hrefs, source).toContain(source);
    }
    expect(container.querySelector('figure figcaption')?.textContent).toMatch(
      /stay on your machine/,
    );
  });

  it('keeps to the brand voice', async () => {
    const { container } = await renderPost();
    expect(container.textContent).not.toContain('!');
  });
});

describe('the Rust and Swift post', () => {
  const load = posts['./why-rust-and-swift/page.mdx'];

  const renderPost = async () => {
    const { default: Content } = await load!();
    return render(
      withDictionary(
        <MDXProvider components={mdxComponents({})}>
          <Content />
        </MDXProvider>,
      ),
    );
  };

  it('is a published engineering post by Tom Turney', async () => {
    const { article } = await load!();
    expect(article).toMatchObject({
      author: 'tom-turney',
      category: 'Engineering',
      date: '2026-10-28',
      published: true,
    });
  });

  it('links the products it describes and every source it cites', async () => {
    await renderPost();
    const hrefs = screen
      .getAllByRole('link')
      .map((a) => a.getAttribute('href'));
    for (const href of [
      '/products/butter',
      '/products/iron',
      pantryFacts.path,
      pantryFacts.repo,
      pantryFacts.packslip,
      'https://github.com/ossf/malicious-packages',
      'https://blog.npmjs.org/post/180565383195/details-about-the-event-stream-incident',
      'https://pytorch.org/blog/compromised-nightly-dependency/',
      'https://www.openwall.com/lists/oss-security/2024/03/29/4',
      'https://blog.rust-lang.org/2022/05/10/malicious-crate-rustdecimal/',
    ]) {
      expect(hrefs, href).toContain(href);
    }
  });

  it('keeps to the brand voice, and calls provable execution exploration', async () => {
    const { container } = await renderPost();
    const text = container.textContent ?? '';
    expect(text).not.toContain('!');
    expect(text).toContain(
      'we are exploring now: mathematically verifiable, provable execution',
    );
  });
});
