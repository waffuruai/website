/**
 * Lets a remark or rehype plugin add `export const name = <json>` to the MDX
 * module it is compiling, so build-time facts (reading time, headings) travel
 * with the post instead of being re-derived by reading the source again.
 *
 * MDX needs an ESTree next to the source text of every ESM node, so the JSON
 * value is converted by hand rather than pulling in a parser.
 */

/**
 * @param {unknown} value JSON value (finite, non-negative numbers only)
 * @returns {object} an ESTree expression
 */
function toEstree(value) {
  if (value === null) return { type: 'Literal', value: null, raw: 'null' };
  if (Array.isArray(value)) {
    return { type: 'ArrayExpression', elements: value.map(toEstree) };
  }
  switch (typeof value) {
    case 'string':
      return { type: 'Literal', value, raw: JSON.stringify(value) };
    case 'boolean':
      return { type: 'Literal', value, raw: String(value) };
    case 'number':
      if (!Number.isFinite(value) || value < 0) break;
      return { type: 'Literal', value, raw: String(value) };
    case 'object':
      return {
        type: 'ObjectExpression',
        properties: Object.entries(value).map(([key, entry]) => ({
          type: 'Property',
          kind: 'init',
          method: false,
          shorthand: false,
          computed: false,
          key: { type: 'Literal', value: key, raw: JSON.stringify(key) },
          value: toEstree(entry),
        })),
      };
  }
  throw new TypeError(`Cannot export ${String(value)} from MDX`);
}

/**
 * An `mdxjsEsm` node declaring `export const <name> = <value>`. Push it onto
 * the root's `children`.
 *
 * @param {string} name
 * @param {unknown} value
 */
export function exportConst(name, value) {
  return {
    type: 'mdxjsEsm',
    value: `export const ${name} = ${JSON.stringify(value)}`,
    data: {
      estree: {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExportNamedDeclaration',
            specifiers: [],
            source: null,
            declaration: {
              type: 'VariableDeclaration',
              kind: 'const',
              declarations: [
                {
                  type: 'VariableDeclarator',
                  id: { type: 'Identifier', name },
                  init: toEstree(value),
                },
              ],
            },
          },
        ],
      },
    },
  };
}
