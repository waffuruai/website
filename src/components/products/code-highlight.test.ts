import { describe, expect, it } from 'vitest';

import { highlight } from '@/components/products/code-highlight';
import { productFacts } from '@/content/pages/products/facts';

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
