import { describe, expect, it } from 'vitest';

import rehypeToc, { headingsOf } from './rehype-toc.mjs';

type Node = Record<string, unknown>;

const text = (value: string): Node => ({ type: 'text', value });
const el = (tagName: string, properties: Node, ...children: Node[]): Node => ({
  type: 'element',
  tagName,
  properties,
  children,
});
const root = (...children: Node[]) => ({ type: 'root', children });

describe('headingsOf', () => {
  it('collects the h2s with their ids, in document order', () => {
    const tree = root(
      el('p', {}, text('Intro')),
      el('h2', { id: 'why-now' }, text('Why '), el('em', {}, text('now'))),
      el('h3', { id: 'detail' }, text('Detail')),
      el('h2', { id: 'build' }, el('code', {}, text('butter serve'))),
    );
    expect(headingsOf(tree)).toEqual([
      { id: 'why-now', text: 'Why now' },
      { id: 'build', text: 'butter serve' },
    ]);
  });

  it('finds headings nested in other elements and skips ones without an id', () => {
    const tree = root(
      el('section', {}, el('h2', { id: 'inner' }, text('Inner'))),
      el('h2', {}, text('No id')),
      el('h2', { id: 'empty' }),
    );
    expect(headingsOf(tree)).toEqual([{ id: 'inner', text: 'Inner' }]);
  });
});

describe('rehypeToc', () => {
  it('adds `export const toc` to the module', () => {
    const tree = root(el('h2', { id: 'a' }, text('A')));
    rehypeToc()(tree);

    const node = tree.children.at(-1) as Node;
    expect(node.type).toBe('mdxjsEsm');
    expect(node.value).toBe('export const toc = [{"id":"a","text":"A"}]');
  });
});
