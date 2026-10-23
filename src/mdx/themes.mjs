/**
 * Shiki themes for code blocks, built from the site palette so code reads as
 * part of the page: soft cream text, gold for what you define, a muted
 * attribute line (the home page's Iron sample), and one restrained hue each
 * for keywords, strings, types and numbers.
 *
 * Plain JSON, so Turbopack can pass it to the MDX loader. The block's own
 * background comes from the `--card` token in CSS, not from the theme, and
 * every colour here clears 4.5:1 on that surface.
 */

/** @param {Record<string, string>} c */
const rules = (c) => [
  {
    scope: ['comment', 'punctuation.definition.comment'],
    settings: { foreground: c.comment },
  },
  {
    // The whole attribute line stays quiet, strings and names included (the
    // descendant selectors outrank the generic string and entity rules).
    scope: [
      'meta.attribute',
      'meta.attribute string',
      'meta.attribute constant',
      'meta.attribute entity',
      'meta.attribute keyword',
      'meta.attribute variable',
      'meta.preprocessor',
    ],
    settings: { foreground: c.comment },
  },
  {
    scope: [
      'keyword',
      'keyword.control',
      'keyword.other',
      'storage',
      'storage.type',
      'storage.modifier',
      'variable.language',
    ],
    settings: { foreground: c.keyword },
  },
  {
    scope: ['keyword.operator', 'punctuation', 'meta.brace'],
    settings: { foreground: c.punctuation },
  },
  {
    scope: [
      'entity.name.function',
      'support.function',
      'meta.definition.function',
      'entity.name.command',
      'entity.name.tag',
    ],
    settings: { foreground: c.accent },
  },
  {
    scope: [
      'entity.name.type',
      'entity.name.class',
      'entity.name.namespace',
      'support.type',
      'support.class',
      'storage.type.rust',
      'storage.type.core.rust',
      'support.type.property-name',
    ],
    settings: { foreground: c.type },
  },
  {
    scope: [
      'string',
      'punctuation.definition.string',
      'string.unquoted',
      'markup.inline.raw',
    ],
    settings: { foreground: c.string },
  },
  {
    scope: [
      'constant.numeric',
      'constant.language',
      'constant.character',
      'constant.other',
    ],
    settings: { foreground: c.number },
  },
  {
    scope: ['entity.other.attribute-name', 'variable.parameter'],
    settings: { foreground: c.text },
  },
  {
    scope: ['markup.heading', 'entity.name.section'],
    settings: { foreground: c.accent },
  },
  {
    scope: ['markup.inserted'],
    settings: { foreground: c.string },
  },
  {
    scope: ['markup.deleted'],
    settings: { foreground: c.keyword },
  },
];

export const waffuruDark = {
  name: 'waffuru-dark',
  type: 'dark',
  colors: { 'editor.background': '#12100e', 'editor.foreground': '#d2ccc1' },
  settings: [
    { settings: { foreground: '#d2ccc1' } },
    ...rules({
      text: '#d2ccc1',
      comment: '#aba599',
      punctuation: '#aba599',
      keyword: '#e39a7a',
      accent: '#e8a33d',
      type: '#8fc4bd',
      string: '#a3c585',
      number: '#c8a8d8',
    }),
  ],
};

export const waffuruLight = {
  name: 'waffuru-light',
  type: 'light',
  colors: { 'editor.background': '#fbf8f2', 'editor.foreground': '#3b362f' },
  settings: [
    { settings: { foreground: '#3b362f' } },
    ...rules({
      text: '#3b362f',
      comment: '#6b645a',
      punctuation: '#6b645a',
      keyword: '#a4492a',
      accent: '#8a5514',
      type: '#2c6a68',
      string: '#3d6b2e',
      number: '#8c3f6b',
    }),
  ],
};
