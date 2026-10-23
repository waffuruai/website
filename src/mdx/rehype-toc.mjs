import { visit } from 'unist-util-visit';

import { exportConst } from './export-const.mjs';

/**
 * Text content of a hast node (links, emphasis and code flattened).
 *
 * @param {any} node
 * @returns {string}
 */
function textOf(node) {
  if (node.type === 'text') return node.value;
  return Array.isArray(node.children) ? node.children.map(textOf).join('') : '';
}

/**
 * The `##` headings of a document as `{ id, text }`, in order. Headings
 * without an id (run `rehype-slug` first) are skipped.
 *
 * @param {object} tree hast root
 * @returns {{ id: string; text: string }[]}
 */
export function headingsOf(tree) {
  const headings = [];
  visit(tree, 'element', (/** @type {any} */ node) => {
    if (node.tagName !== 'h2') return;
    const id = node.properties?.id;
    const text = textOf(node).trim();
    if (typeof id === 'string' && text) headings.push({ id, text });
  });
  return headings;
}

/**
 * Rehype plugin: exports `toc` (the `##` headings) from the MDX module. Runs
 * after `rehype-slug`, so the ids are the ones the page really carries.
 */
export default function rehypeToc() {
  return (/** @type {any} */ tree) => {
    tree.children.push(exportConst('toc', headingsOf(tree)));
  };
}
