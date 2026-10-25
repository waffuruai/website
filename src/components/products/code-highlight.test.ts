import { describe, expect, it } from 'vitest';

import { highlight } from '@/components/products/code-highlight';
import { productFacts } from '@/content/pages/products/facts';

const roles = (line: ReturnType<typeof highlight>[number]) =>
  line.map(({ role, text }) => `${role}:${text}`);

describe('highlight (rust)', () => {
  const lines = highlight(productFacts.iron.code!.source, 'rust');

  it('mutes the attribute and keeps its text whole', () => {
    expect(lines[0]).toEqual([
      {
        role: 'muted',
        text: '#[kernel(bench(op = "unary", subop = "exp", tol = 1e-4))]',
      },
    ]);
  });

  it('marks keywords and accents the function name', () => {
    expect(roles(lines[1]!).slice(0, 4)).toEqual([
      'strong:pub fn',
      'plain: ',
      'accent:iron_exp',
      'plain:<T>(a: Tensor<T>, out: Tensor<T>) {',
    ]);
    expect(lines[2]![1]).toEqual({ role: 'strong', text: 'let' });
  });

  it('never loses or reorders text', () => {
    const source = productFacts.iron.code!.source;
    expect(
      lines.map((line) => line.map((token) => token.text).join('')).join('\n'),
    ).toBe(source);
  });
});

describe('highlight (shell)', () => {
  const lines = highlight(productFacts.butter.code!.source, 'shell');

  it('mutes the prompt and accents the command', () => {
    expect(lines[0]).toEqual([
      { role: 'muted', text: '$ ' },
      { role: 'accent', text: 'butter' },
      { role: 'plain', text: ' serve <model>' },
    ]);
  });

  it('marks flags and line continuations', () => {
    const continued = lines.find((line) =>
      line.some((token) => token.text === '-H'),
    );
    expect(continued?.find((token) => token.text === '-H')?.role).toBe(
      'strong',
    );
    expect(continued?.at(-1)).toEqual({ role: 'muted', text: '\\' });
  });

  it('never loses or reorders text', () => {
    const source = productFacts.butter.code!.source;
    expect(
      lines.map((line) => line.map((token) => token.text).join('')).join('\n'),
    ).toBe(source);
  });
});
