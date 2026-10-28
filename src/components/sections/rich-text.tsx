import { Fragment } from 'react';

/**
 * Body copy whose `**doubled**` words are bold: `'faster and **yours**'` →
 * faster and <strong>yours</strong>. Content stays a plain, translatable
 * string. For headings, use `Accent` (`*word*`, the gold italic).
 */
export function RichText({ text }: { text: string }) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, index) =>
    part.startsWith('**') && part.endsWith('**') && part.length > 4 ? (
      <strong key={index} className="font-semibold text-foreground">
        {part.slice(2, -2)}
      </strong>
    ) : (
      <Fragment key={index}>{part}</Fragment>
    ),
  );
}
