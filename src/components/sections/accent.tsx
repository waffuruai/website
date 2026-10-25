import { Fragment } from 'react';

/**
 * Renders a heading string whose `*starred*` words are the After Hours
 * accent: `'Raw math, *pressed* into silicon.'` → Raw math, <em>pressed</em>…
 * Content stays plain strings (translatable), and the gold italic comes from
 * the base styles for `em` inside serif headings. `\n` becomes a line break.
 */
export function Accent({ text }: { text: string }) {
  return text.split('\n').map((line, lineIndex) => (
    <Fragment key={lineIndex}>
      {lineIndex > 0 && <br />}
      {line
        .split(/(\*[^*]+\*)/g)
        .map((part, index) =>
          part.startsWith('*') && part.endsWith('*') && part.length > 2 ? (
            <em key={index}>{part.slice(1, -1)}</em>
          ) : (
            <Fragment key={index}>{part}</Fragment>
          ),
        )}
    </Fragment>
  ));
}

/** The same string with the accent markers removed (titles, meta, alt). */
export const plainText = (text: string) =>
  text.replace(/\*([^*]+)\*/g, '$1').replace(/\n/g, ' ');
