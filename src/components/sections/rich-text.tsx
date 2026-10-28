import { Fragment } from 'react';

/** `**bold**` or `[label](https://…)`, kept whole when the text is split. */
const TOKEN = /(\*\*[^*]+\*\*|\[[^\]]+\]\(https?:\/\/[^)\s]+\))/g;
const LINK = /^\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)$/;

/**
 * Body copy whose `**doubled**` words are bold and whose `[label](https://…)`
 * spans are links: `'faster and **yours**'` → faster and <strong>yours</strong>.
 * Content stays a plain, translatable string, and each locale can link to its
 * own source. For headings, use `Accent` (`*word*`, the gold italic).
 */
export function RichText({ text }: { text: string }) {
  return text.split(TOKEN).map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
      return (
        <strong key={index} className="font-semibold text-foreground">
          {part.slice(2, -2)}
        </strong>
      );
    }
    const link = LINK.exec(part);
    if (link) {
      return (
        <a
          key={index}
          href={link[2]}
          className="text-foreground underline decoration-foreground/30 underline-offset-4 transition-colors hover:decoration-foreground"
        >
          {link[1]}
        </a>
      );
    }
    return <Fragment key={index}>{part}</Fragment>;
  });
}
