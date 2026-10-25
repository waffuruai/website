import { describe, expect, it } from 'vitest';

import { exportConst } from './export-const.mjs';

type Estree = {
  type: string;
  value?: unknown;
  elements?: Estree[];
  properties?: { key: Estree; value: Estree }[];
};

const init = (node: ReturnType<typeof exportConst>) =>
  (
    node.data.estree.body[0] as unknown as {
      declaration: { declarations: { init: Estree }[] };
    }
  ).declaration.declarations[0]!.init;

/** Turns an ESTree literal/array/object back into a plain value. */
function evaluate(node: Estree): unknown {
  if (node.type === 'Literal') return node.value;
  if (node.type === 'ArrayExpression') return node.elements!.map(evaluate);
  return Object.fromEntries(
    node.properties!.map((p) => [p.key.value as string, evaluate(p.value)]),
  );
}

describe('exportConst', () => {
  it('declares an exported const, with source text and an ESTree', () => {
    const node = exportConst('answer', 42);
    expect(node.type).toBe('mdxjsEsm');
    expect(node.value).toBe('export const answer = 42');
    expect(node.data.estree.body[0]).toMatchObject({
      type: 'ExportNamedDeclaration',
      declaration: { kind: 'const' },
    });
  });

  it('round-trips JSON values through the ESTree', () => {
    const value = {
      id: 'why-now',
      list: [{ id: 'a', text: 'Quote " and \\ and <b>' }, null, true, 0, 1.5],
    };
    expect(evaluate(init(exportConst('toc', value)))).toEqual(value);
  });

  it('rejects values that are not exportable JSON', () => {
    expect(() => exportConst('x', undefined)).toThrow(TypeError);
    expect(() => exportConst('x', -1)).toThrow(TypeError);
    expect(() => exportConst('x', Number.NaN)).toThrow(TypeError);
  });
});
