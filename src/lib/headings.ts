/** Heading ids and table-of-contents parsing shared by MDX pages. */

export type Heading = { id: string; text: string };

/** Lowercase, hyphenated id for a heading ("1. Definitions" → "1-definitions"). */
export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[’']/g, '')
    .replace(/[^\p{L}\p{N}]+/gu, '-')
    .replace(/^-+|-+$/g, '');
}

/** Plain text of rendered React children (heading ids, code to copy). */
export function textOf(node: unknown): string {
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(textOf).join('');
  if (node && typeof node === 'object' && 'props' in node) {
    return textOf((node as { props?: { children?: unknown } }).props?.children);
  }
  return '';
}

/** Strips inline markdown (links, emphasis, code) from a heading line. */
function plainText(markdown: string) {
  return markdown
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[*_`]/g, '')
    .replace(/<[^>]+>/g, '')
    .trim();
}

/** `##` headings of an MDX source, ignoring fenced code, in document order. */
export function extractHeadings(source: string): Heading[] {
  const headings: Heading[] = [];
  const seen = new Set<string>();
  let inFence = false;

  for (const line of source.split('\n')) {
    if (/^\s*(```|~~~)/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    const match = /^##\s+(.+?)\s*#*\s*$/.exec(line);
    if (!match) continue;
    const text = plainText(match[1]);
    const id = slugify(text);
    if (!id || seen.has(id)) continue;
    seen.add(id);
    headings.push({ id, text });
  }
  return headings;
}
