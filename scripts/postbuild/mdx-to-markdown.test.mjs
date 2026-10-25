// @vitest-environment node
import { describe, expect, it } from 'vitest';

import {
  articleFields,
  frontMatter,
  mdxToMarkdown,
} from './mdx-to-markdown.mjs';

const META = {
  title: 'Fallback title',
  description: 'Fallback description.',
  url: 'https://waffuru.ai/blog/introducing-waffuru',
  language: 'en',
};

const POST = `import { Callout } from '@/components/callout';
import { Picture } from '@/components/picture';

export const article = {
  title: 'Introducing Waffuru',
  description: 'Why we are building the stack.',
  date: '2026-10-20',
  updated: new Date('2026-10-21'),
  author: { name: 'Eric Kryski', role: 'CPO' },
  category: 'Company',
  tags: ['launch', \`stack\`],
};

Hello **world**. Read the [docs](/docs) or [jump](#below).

<Callout tone="info">

Models on the *menu*.

</Callout>

<Picture name="blog/hero" alt="A waffle" />

{/* TODO(founder): hero copy */}

## The kernels

\`\`\`rust title="iron_exp.rs"
#[kernel]
pub fn iron_exp<T>(a: Tensor<T>) {}
\`\`\`

| Backend | Tier |
| ------- | ---- |
| Metal   | Primary |

- one
- two
`;

describe('mdxToMarkdown', () => {
  const markdown = mdxToMarkdown(POST, META);

  it('writes front matter from the article export', () => {
    expect(markdown.startsWith('---\n')).toBe(true);
    const head = markdown.slice(4, markdown.indexOf('\n---\n'));
    expect(head.split('\n')).toEqual([
      'title: "Introducing Waffuru"',
      'description: "Why we are building the stack."',
      'url: "https://waffuru.ai/blog/introducing-waffuru"',
      'language: "en"',
      'date: 2026-10-20',
      'updated: 2026-10-21',
      'authors: ["Eric Kryski"]',
      'category: "Company"',
      'tags: ["launch","stack"]',
    ]);
  });

  it('adds the title as the h1 and strips ESM, JSX and expressions', () => {
    const body = markdown.slice(markdown.indexOf('\n---\n') + 5);
    expect(body.startsWith('\n# Introducing Waffuru\n\nHello **world**.')).toBe(
      true,
    );
    expect(body).not.toMatch(/import|export|Callout|Picture|TODO|\{\//);
    expect(body).toContain('Models on the *menu*.');
  });

  it('resolves relative links against the page and keeps anchors', () => {
    expect(markdown).toContain('[docs](https://waffuru.ai/docs)');
    expect(markdown).toContain('[jump](#below)');
  });

  it('keeps code languages, tables and lists', () => {
    expect(markdown).toContain(
      '```rust title="iron_exp.rs"\n#[kernel]\npub fn iron_exp<T>(a: Tensor<T>) {}\n```',
    );
    expect(markdown).toContain('| Backend | Tier    |');
    expect(markdown).toContain('- one\n- two');
  });

  it('does not escape braces the way MDX would', () => {
    const out = mdxToMarkdown('Escaped \\{braces\\} and \\<tags>.', META);
    expect(out).toContain('Escaped {braces} and \\<tags>.');
  });

  it('keeps an h1 the post already has and falls back to page metadata', () => {
    const out = mdxToMarkdown('# My own title\n\nBody.', META);
    expect(out).toContain('title: "Fallback title"');
    expect(out).toContain('description: "Fallback description."');
    expect(out.match(/^# /gm)).toHaveLength(1);
    expect(out).toContain('# My own title');
  });

  it('wraps inline text left among blocks by a component', () => {
    const out = mdxToMarkdown(
      'Before.\n\n<Note>Inside text</Note>\n\nAfter.',
      META,
    );
    expect(out).toContain('Before.\n\nInside text\n\nAfter.');
  });
});

describe('articleFields', () => {
  it('accepts the usual alternative field names', () => {
    expect(
      articleFields({
        title: ' T ',
        excerpt: 'E',
        publishedAt: '2026-01-02T00:00:00.000Z',
        authors: ['A', { name: 'B' }, 3, 'eric-kryski'],
        category: 'Company',
        keywords: 'one',
      }),
    ).toEqual({
      title: 'T',
      description: 'E',
      date: '2026-01-02',
      updated: undefined,
      authors: ['A', 'B', 'Eric Kryski'],
      category: 'Company',
      tags: ['one'],
    });
  });
});

describe('frontMatter', () => {
  it('quotes strings, leaves dates bare and skips empties', () => {
    expect(
      frontMatter({
        title: 'He said "hi": ok',
        date: '2026-10-20',
        empty: '',
        none: undefined,
        tags: [],
        list: ['a'],
      }),
    ).toBe(
      '---\ntitle: "He said \\"hi\\": ok"\ndate: 2026-10-20\nlist: ["a"]\n---\n',
    );
  });
});
