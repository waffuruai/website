import remarkMdx from 'remark-mdx';
import remarkParse from 'remark-parse';
import { unified } from 'unified';
import { describe, expect, it } from 'vitest';

import remarkReadingTime, {
  WORDS_PER_MINUTE,
  countWords,
  readingTimeOf,
} from './remark-reading-time.mjs';

const processor = unified().use(remarkParse).use(remarkMdx);
const parse = (source: string) => processor.parse(source);

const words = (count: number) =>
  Array.from({ length: count }, () => 'word').join(' ');

describe('countWords', () => {
  it('counts Latin words and ignores punctuation-only tokens', () => {
    expect(countWords('Hello, world — it is 2026 !')).toBe(5);
    expect(countWords('')).toBe(0);
  });

  it('weights CJK characters, which have no spaces', () => {
    // 22 characters at 500 characters a minute ≈ 10 words at 220 a minute.
    expect(
      countWords('私たちはあらゆる人に知性を届けます。毎日少しずつ。'),
    ).toBeGreaterThan(5);
    expect(countWords('私たちは知性を届けます')).toBeLessThan(10);
    expect(countWords('Waffuru は知性を届けます')).toBeGreaterThan(1);
  });
});

describe('readingTimeOf', () => {
  it('rounds words / 220 and never reports less than a minute', () => {
    expect(readingTimeOf(parse('A short note.')).minutes).toBe(1);
    expect(readingTimeOf(parse(words(WORDS_PER_MINUTE * 3))).minutes).toBe(3);
    expect(readingTimeOf(parse(words(WORDS_PER_MINUTE * 3))).words).toBe(
      WORDS_PER_MINUTE * 3,
    );
  });

  it('counts headings, lists, links and inline code', () => {
    const tree = parse(
      [
        '## Two words',
        '',
        '- three more words',
        '',
        '[link text](/x) and `code`',
      ].join('\n'),
    );
    // Two words (2) + three more words (3) + link text and code (4)
    expect(readingTimeOf(tree).words).toBe(9);
  });

  it('skips code blocks, ESM and JSX attributes', () => {
    const tree = parse(
      [
        "import { Thing } from '@/components/thing'",
        '',
        'export const x = { many: "words in an export that are not prose" }',
        '',
        'Prose only.',
        '',
        '```rust',
        'fn this_is_code() { let many = "many words in a code block"; }',
        '```',
        '',
        '<Thing label="attribute words are not read" />',
      ].join('\n'),
    );
    expect(readingTimeOf(tree).words).toBe(2);
  });
});

describe('remarkReadingTime', () => {
  it('adds `export const readingTime` to the module', async () => {
    const withPlugin = unified()
      .use(remarkParse)
      .use(remarkMdx)
      .use(remarkReadingTime);
    const tree = withPlugin.parse(`Some ${words(440)}`);
    await withPlugin.run(tree);

    const node = tree.children.at(-1) as unknown as {
      type: string;
      value: string;
      data: {
        estree: {
          body: { declaration: { declarations: { id: { name: string } }[] } }[];
        };
      };
    };
    expect(node.type).toBe('mdxjsEsm');
    expect(node.value).toBe(
      'export const readingTime = {"words":441,"minutes":2}',
    );
    expect(node.data.estree.body[0]?.declaration.declarations[0]?.id.name).toBe(
      'readingTime',
    );
  });
});
