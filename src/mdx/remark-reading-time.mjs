import { visit } from 'unist-util-visit';

import { exportConst } from './export-const.mjs';

/** Adult silent reading speed for prose. */
export const WORDS_PER_MINUTE = 220;

/** Characters per minute for Chinese, Japanese and Korean text. */
const CJK_CHARS_PER_MINUTE = 500;

const CJK =
  /[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Hangul}]/gu;

/**
 * Words in a run of text. CJK scripts have no spaces, so each character is
 * weighted by how much faster those scripts are read than a Latin word.
 *
 * @param {string} text
 */
export function countWords(text) {
  const cjk = text.match(CJK)?.length ?? 0;
  const latin = text
    .replace(CJK, ' ')
    .split(/\s+/)
    .filter((token) => /[\p{L}\p{N}]/u.test(token)).length;
  return latin + Math.round((cjk * WORDS_PER_MINUTE) / CJK_CHARS_PER_MINUTE);
}

/**
 * Prose words and minutes for an mdast tree: paragraphs, headings, lists and
 * inline code count; code blocks and ESM do not (readers skim them).
 *
 * @param {object} tree mdast root
 */
export function readingTimeOf(tree) {
  let words = 0;
  visit(tree, ['text', 'inlineCode'], (node) => {
    words += countWords(/** @type {{ value: string }} */ (node).value);
  });
  return { words, minutes: Math.max(1, Math.round(words / WORDS_PER_MINUTE)) };
}

/**
 * Remark plugin: exports `readingTime` (`{ words, minutes }`) from the MDX
 * module, computed from the parsed document.
 */
export default function remarkReadingTime() {
  return (/** @type {any} */ tree) => {
    tree.children.push(exportConst('readingTime', readingTimeOf(tree)));
  };
}
