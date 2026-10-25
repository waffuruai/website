/** Media types of an `Accept` header with their quality, highest first. */
export function parseAccept(header: string | null | undefined) {
  return (header ?? '')
    .split(',')
    .map((part) => {
      const [type = '', ...params] = part.trim().split(';');
      const q = params
        .map((param) => param.trim().match(/^q=([0-9.]+)$/i)?.[1])
        .find(Boolean);
      const quality = q === undefined ? 1 : Number(q);
      return {
        type: type.trim().toLowerCase(),
        q: Number.isFinite(quality) ? quality : 1,
      };
    })
    .filter((entry) => entry.type && entry.q > 0)
    .sort((a, b) => b.q - a.q);
}

/**
 * Whether the client asked for Markdown (https://acceptmarkdown.com): it
 * names `text/markdown` and does not rank HTML above it. Browsers never send
 * `text/markdown`, so they always get HTML.
 */
export function prefersMarkdown(header: string | null | undefined) {
  const types = parseAccept(header);
  const markdown = types.find((entry) => entry.type === 'text/markdown');
  if (!markdown) return false;
  const html = types.find(
    (entry) =>
      entry.type === 'text/html' || entry.type === 'application/xhtml+xml',
  );
  return !html || markdown.q >= html.q;
}
