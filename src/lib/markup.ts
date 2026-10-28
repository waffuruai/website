/**
 * The two bits of markup content strings may carry: `**bold**` and
 * `[label](https://…)`. `RichText` renders them; `plainText` drops them for
 * places that take text only, like JSON-LD.
 */
export const MARKUP_TOKEN = /(\*\*[^*]+\*\*|\[[^\]]+\]\(https?:\/\/[^)\s]+\))/g;
export const MARKUP_LINK = /^\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)$/;

/** `'the **Jevons** [paradox](https://…)'` → `'the Jevons paradox'`. */
export function plainText(text: string): string {
  return text.replace(MARKUP_TOKEN, (part) =>
    part.startsWith('**')
      ? part.slice(2, -2)
      : (MARKUP_LINK.exec(part)?.[1] ?? part),
  );
}
