/*
 * A small, dependency-free HTML to Markdown converter for our own prerendered
 * pages (the `.md` twins written next to every page, see markdown-mirrors.mjs).
 * It only has to understand the markup this site produces, so it is a tag
 * scanner rather than a full HTML parser, and it needs no DOM.
 *
 * Ported from Bidali's marketing site, with fixes for what Waffuru's pages
 * need: fenced code keeps its language (rehype-pretty-code writes
 * `data-language` on `<pre>` / `<code>`), cards whose heading sits inside a
 * link keep the link, inline code is not escaped, and spacing around links
 * and emphasis comes out right.
 */

/** Subtrees that carry no readable content. */
const SKIP = new Set([
  'script',
  'style',
  'svg',
  'noscript',
  'template',
  'video',
  'audio',
  'canvas',
  'iframe',
  'select',
  'textarea',
  'nav',
]);

const VOID = new Set([
  'area',
  'base',
  'br',
  'col',
  'embed',
  'hr',
  'img',
  'input',
  'link',
  'meta',
  'source',
  'track',
  'wbr',
]);

/** Elements that start a new block of text. */
const BLOCK = new Set([
  'address',
  'article',
  'aside',
  'blockquote',
  'dd',
  'details',
  'div',
  'dl',
  'dt',
  'fieldset',
  'figcaption',
  'figure',
  'footer',
  'form',
  'header',
  'li',
  'main',
  'ol',
  'p',
  'section',
  'summary',
  'table',
  'tbody',
  'thead',
  'tr',
  'ul',
]);

const ENTITIES = {
  amp: '&',
  lt: '<',
  gt: '>',
  quot: '"',
  apos: "'",
  nbsp: ' ',
  rsquo: '’',
  lsquo: '‘',
  rdquo: '”',
  ldquo: '“',
  mdash: '—',
  ndash: '–',
  hellip: '…',
  middot: '·',
  copy: '©',
  reg: '®',
  trade: '™',
  times: '×',
  rarr: '→',
  larr: '←',
};

export const decodeEntities = (text) =>
  text.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (match, code) => {
    if (code[0] !== '#') return ENTITIES[code.toLowerCase()] ?? match;
    const point =
      code[1]?.toLowerCase() === 'x'
        ? parseInt(code.slice(2), 16)
        : parseInt(code.slice(1), 10);
    try {
      return Number.isFinite(point) ? String.fromCodePoint(point) : match;
    } catch {
      return match;
    }
  });

/** The (entity-decoded) value of attribute `name` in a tag's attribute text. */
export const attribute = (attributes, name) => {
  const match = attributes.match(
    new RegExp(
      `(?:^|\\s)${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`,
      'i',
    ),
  );
  const value = match?.[1] ?? match?.[2] ?? match?.[3];
  return value === undefined ? undefined : decodeEntities(value);
};

/** Whether a tag's attribute text has the bare attribute `name`. */
const hasAttribute = (attributes, name) =>
  new RegExp(`(?:^|\\s)${name}(?:\\s|=|$)`, 'i').test(
    attributes.replace(/"[^"]*"|'[^']*'/g, '""'),
  );

const TOKEN =
  /<!--[\s\S]*?-->|<(\/?)([a-zA-Z][a-zA-Z0-9-]*)((?:[^>"']|"[^"]*"|'[^']*')*)>|[^<]+|</g;

/*
 * Inline markers are written as private-use characters while a block is
 * assembled, so empty pairs (left by decorative wrappers) can be removed and
 * stray whitespace moved outside them before they become Markdown.
 */
const BOLD = '';
const ITALIC = '';
const CODE = '';
/** Follows a link; a space unless punctuation or whitespace comes next. */
const SOFT = '';
const MARKS = { [BOLD]: '**', [ITALIC]: '*', [CODE]: '`' };

function emphasis(text) {
  let next = text;
  // Empty pairs, repeatedly: removing one can expose the one around it.
  for (let previous = ''; previous !== next;) {
    previous = next;
    next = next.replace(/([-])\s*\1/g, '');
  }
  // An unbalanced marker has no partner; drop its last occurrence.
  for (const mark of Object.keys(MARKS)) {
    const count = next.split(mark).length - 1;
    if (count % 2) {
      const at = next.lastIndexOf(mark);
      next = next.slice(0, at) + next.slice(at + 1);
    }
  }
  // Whitespace just inside a marker would break the emphasis; move it out.
  const open = {};
  return next.replace(/(\s*)([-])(\s*)/g, (_, before, mark, after) => {
    const opening = !open[mark];
    open[mark] = opening;
    return opening
      ? `${before}${after}${MARKS[mark]}`
      : `${MARKS[mark]}${before}${after}`;
  });
}

/** Collapses whitespace and resolves the soft space left after links. */
const tidy = (text) =>
  text
    .replace(/(?=[\s.,;:!?)\]}'"’”…]|$)/g, '')
    .replace(//g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

/** Escapes characters that would start Markdown syntax inside prose. */
function escapeText(text) {
  return text
    .replace(/[\\*`[\]]/g, '\\$&')
    .replace(/(^|[^\p{L}\p{N}])_|_(?![\p{L}\p{N}])/gu, (m) =>
      m.replace('_', '\\_'),
    );
}

/** A paragraph that would read as a heading, list or quote gets escaped. */
const BLOCK_START = /^(#{1,6}(?:\s|$)|[-+](?:\s|$)|\d+[.)](?:\s|$)|>)/;
const escapeBlockStart = (text) =>
  BLOCK_START.test(text) ? `\\${text}` : text;

/**
 * What the unprefixed Tailwind display utilities in a tag's `class` say about
 * layout: `flex`, `grid` and `block` make even a `<span>` block-level, and
 * the children of a flex or grid container are laid out as separate items
 * (side by side in a flex row, stacked otherwise), so their text must not run
 * together.
 */
function layoutOf(attributes) {
  const tokens = (attribute(attributes, 'class') ?? '').split(/\s+/);
  const has = (name) => tokens.includes(name);
  const flex = has('flex') || has('inline-flex');
  const container = flex || has('grid') || has('inline-grid');
  const row = flex && !has('flex-col') && !has('flex-col-reverse');
  return {
    block:
      has('block') ||
      has('flex') ||
      has('grid') ||
      has('table') ||
      has('flow-root') ||
      has('list-item'),
    items: container ? (row ? 'row' : 'column') : undefined,
    srOnly: has('sr-only'),
  };
}

/** A code fence's info string, from `data-language` or a `language-x` class. */
function languageOf(attributes) {
  const raw =
    attribute(attributes, 'data-language') ??
    attribute(attributes, 'class')?.match(/(?:^|\s)language-([\w+#.-]+)/)?.[1];
  const lang = raw?.toLowerCase().replace(/[^\w+#.-]/g, '');
  return !lang || ['plaintext', 'text', 'txt', 'ansi'].includes(lang)
    ? ''
    : lang;
}

/** A fence long enough that nothing inside the code can close it. */
function fence(code, lang) {
  const longest = Math.max(
    2,
    ...[...code.matchAll(/`+/g)].map((run) => run[0].length),
  );
  const ticks = '`'.repeat(longest + 1);
  return `${ticks}${lang}\n${code}\n${ticks}`;
}

/** A link destination, bracketed when it holds spaces or parentheses. */
const destination = (url) => (/[()\s]/.test(url) ? `<${url}>` : url);

/** The contents of the first `<main>` (or `<body>`), without the wrapper. */
export function mainHtml(html) {
  for (const tag of ['main', 'body']) {
    const open = html.search(new RegExp(`<${tag}[\\s>]`, 'i'));
    const close = html.toLowerCase().lastIndexOf(`</${tag}>`);
    if (open !== -1 && close > open) {
      return html.slice(html.indexOf('>', open) + 1, close);
    }
  }
  return html;
}

const LIST_ITEM = /^\s*(-|\d+\.) /;

/**
 * Converts an HTML fragment to Markdown. Relative links are resolved against
 * `baseUrl`. Decorative subtrees (`aria-hidden`, scripts, inline SVG, site
 * navigation, form controls) are dropped; image `alt` text is kept only
 * where an image is the whole content of a link or list item.
 */
export function htmlToMarkdown(html, baseUrl) {
  const blocks = [];
  const stack = [];
  const lists = [];
  let inline = '';
  let alts = [];
  let quoteDepth = 0;
  let pre = null;
  let preLang = '';
  let table = null;
  let cell = null;

  const absolute = (href) => {
    try {
      return new URL(href, baseUrl).href;
    } catch {
      return href;
    }
  };

  /** The bullet for the list item being read, until its first text is out. */
  let itemPrefix = '';
  /** Open list items: where their text starts, so later blocks can hang. */
  const items = [];

  const flush = (prefix = '') => {
    let text = tidy(emphasis(inline));
    if (!text && alts.length) text = alts.join(', ');
    inline = '';
    alts = [];
    // Open elements now start at the beginning of a fresh buffer.
    for (const frame of stack) frame.start = 0;
    if (!text) return;
    const quote = '> '.repeat(quoteDepth);
    // After an item's first block, the rest hang under its text.
    const item = items.at(-1);
    const hanging =
      !itemPrefix && item ? ' '.repeat(item.indent + item.width) : '';
    blocks.push(
      `${quote}${hanging}${itemPrefix}${prefix}${prefix ? text : escapeBlockStart(text)}`,
    );
    // Remember the block so a link around it can claim it when it closes.
    for (const frame of stack) frame.blocks?.push(blocks.length - 1);
    itemPrefix = '';
  };

  /** Opens a list item; returns false outside a list. */
  const openItem = () => {
    const list = lists.at(-1);
    if (!list) return false;
    list.count += 1;
    const parent = items.at(-1);
    const indent = parent ? parent.indent + parent.width : 0;
    const marker = `${list.ordered ? `${list.count}.` : '-'} `;
    items.push({ indent, width: marker.length });
    itemPrefix = `${' '.repeat(indent)}${marker}`;
    return true;
  };

  const append = (text) => {
    if (cell !== null) cell += text;
    else inline += text;
  };

  /** Raw-text elements: their content is not markup, so search for the end. */
  const RAW_TEXT = new Set(['script', 'style', 'textarea']);
  let exhausted = false;

  /** Skips to the matching close tag of `tag`, which opened at this token. */
  const skipSubtree = (tag) => {
    if (RAW_TEXT.has(tag)) {
      const close = html.toLowerCase().indexOf(`</${tag}`, TOKEN.lastIndex);
      const end = close === -1 ? -1 : html.indexOf('>', close);
      if (end === -1) exhausted = true;
      else TOKEN.lastIndex = end + 1;
      return;
    }
    let depth = 1;
    while (depth > 0) {
      // A failed `exec` resets `lastIndex`, which would restart the scan.
      const next = TOKEN.exec(html);
      if (!next) {
        exhausted = true;
        return;
      }
      if (next[2]?.toLowerCase() !== tag) continue;
      if (next[1]) depth -= 1;
      else if (!/\/\s*$/.test(next[3] ?? '')) depth += 1;
    }
  };

  /** Wraps the block a link surrounded (a heading first) in that link. */
  const linkBlocks = (frame, href) => {
    const claimed = frame.blocks.map((index) => ({
      index,
      text: blocks[index],
    }));
    const heading = claimed.find(({ text }) => /^(?:> )*#{1,6} /.test(text));
    const target = heading ?? claimed[0];
    if (!target) return;
    blocks[target.index] = target.text.replace(
      /^((?:> )*(?:\s*(?:-|\d+\.) )?(?:#{1,6} )?)(.*)$/s,
      (_, lead, text) => `${lead}[${text}](${destination(href)})`,
    );
  };

  TOKEN.lastIndex = 0;
  let match;
  while (!exhausted && (match = TOKEN.exec(html))) {
    const [token, closing, rawTag, attributes = ''] = match;

    if (!rawTag) {
      if (token.startsWith('<!--')) continue;
      if (pre !== null) pre += decodeEntities(token);
      else {
        const text = decodeEntities(token);
        append(
          stack.some((frame) => frame.tag === 'code') ? text : escapeText(text),
        );
      }
      continue;
    }

    const tag = rawTag.toLowerCase();

    if (!closing) {
      const hidden =
        attribute(attributes, 'aria-hidden') === 'true' ||
        hasAttribute(attributes, 'hidden');
      if (SKIP.has(tag) || (hidden && !VOID.has(tag))) {
        if (!/\/\s*$/.test(attributes)) skipSubtree(tag);
        continue;
      }
      if (pre !== null) {
        // Only the language matters inside a code block.
        if (tag === 'code' && !preLang) preLang = languageOf(attributes);
        continue;
      }

      const layout = layoutOf(attributes);
      const parent = stack.at(-1);
      let listItem = false;

      // Visually hidden text inside a link ("(opens in a new tab)") is the
      // link's fallback name, not part of its text.
      if (layout.srOnly && !VOID.has(tag) && !/\/\s*$/.test(attributes)) {
        const anchor = stack.findLast((frame) => frame.tag === 'a');
        if (anchor) {
          const from = TOKEN.lastIndex;
          skipSubtree(tag);
          const text = tidy(
            decodeEntities(
              html.slice(from, TOKEN.lastIndex).replace(/<[^>]*>/g, ' '),
            ),
          );
          if (text)
            anchor.srText = anchor.srText ? `${anchor.srText} ${text}` : text;
          continue;
        }
      }

      // Block-level by class, or an item of a column (or grid) container.
      if (cell === null && !BLOCK.has(tag)) {
        if (layout.block || parent?.items === 'column') flush();
      }

      if (tag === 'br') append(' ');
      else if (tag === 'hr') {
        flush();
        blocks.push('---');
      } else if (tag === 'img') {
        const alt = tidy(attribute(attributes, 'alt') ?? '');
        if (alt && !hidden) alts.push(alt);
      } else if (/^h[1-6]$/.test(tag)) flush();
      else if (tag === 'pre') {
        flush();
        pre = '';
        preLang = languageOf(attributes);
      } else if (tag === 'ul' || tag === 'ol') {
        flush();
        lists.push({ ordered: tag === 'ol', count: 0 });
      } else if (tag === 'blockquote') {
        flush();
        quoteDepth += 1;
      } else if (tag === 'table') {
        flush();
        table = [];
      } else if (tag === 'tr') table?.push([]);
      else if (tag === 'td' || tag === 'th') cell = '';
      else if (tag === 'strong' || tag === 'b') append(BOLD);
      else if (tag === 'em' || tag === 'i') append(ITALIC);
      else if (tag === 'code') append(CODE);
      else if (tag === 'li') {
        flush();
        listItem = openItem();
      } else if (tag === 'summary') {
        flush();
        append(BOLD);
      } else if (BLOCK.has(tag) && cell === null) flush();

      if (!VOID.has(tag) && !/\/\s*$/.test(attributes)) {
        const href = tag === 'a' ? attribute(attributes, 'href') : undefined;
        stack.push({
          tag,
          href,
          label: tag === 'a' ? attribute(attributes, 'aria-label') : undefined,
          start: (cell ?? inline).length,
          blocks: tag === 'a' && href ? [] : undefined,
          items: layout.items,
          item: parent?.items && !BLOCK.has(tag) ? parent.items : undefined,
          blockish: layout.block && !BLOCK.has(tag),
          listItem,
        });
      }
      continue;
    }

    // Closing tag. Inside a code block only `</pre>` matters, and an element
    // outside it must not be unwound by a stray tag within.
    if (pre !== null && tag !== 'pre') continue;

    // Unwind to the matching frame (tolerates stray tags).
    let index = stack.length - 1;
    while (index >= 0 && stack[index].tag !== tag) index -= 1;
    if (index < 0) continue;
    const frame = stack[index];
    stack.length = index;

    if (tag === 'pre') {
      const code = (pre ?? '').replace(/^\n+|\s+$/g, '');
      const lang = preLang;
      pre = null;
      preLang = '';
      if (code) blocks.push(fence(code, lang));
      continue;
    }

    if (tag === 'a') {
      const buffer = cell ?? inline;
      let text = tidy(emphasis(buffer.slice(frame.start)));
      if (!text && alts.length && !frame.blocks?.length) {
        text = alts.join(', ');
        alts = [];
      }
      const href = frame.href;
      const linkable = href && href !== '#' && !/^javascript:/i.test(href);
      if (frame.blocks?.length) {
        // The link surrounded whole blocks (a card): link the heading.
        if (linkable) linkBlocks(frame, absolute(href));
      } else {
        // An aria-label that says more than the text ("Download Original"
        // for "Download") is the better name; so is hidden text for no text.
        const label = frame.label?.trim();
        if (
          label &&
          (!text || label.toLowerCase().includes(text.toLowerCase()))
        ) {
          text = escapeText(label);
        } else if (!text && frame.srText) text = escapeText(frame.srText);
        const linked =
          text && linkable ? `[${text}](${destination(absolute(href))})` : text;
        const kept = buffer.slice(0, frame.start);
        const next = linked ? `${kept}${linked}${SOFT}` : kept;
        if (cell !== null) cell = next;
        else inline = next;
      }
    } else if (/^h[1-6]$/.test(tag)) {
      flush(`${'#'.repeat(Number(tag[1]))} `);
    } else if (tag === 'li') {
      flush();
      itemPrefix = '';
      if (frame.listItem) items.pop();
    } else if (tag === 'ul' || tag === 'ol') {
      flush();
      lists.pop();
    } else if (tag === 'blockquote') {
      flush();
      quoteDepth = Math.max(0, quoteDepth - 1);
    } else if (tag === 'td' || tag === 'th') {
      table?.[table.length - 1]?.push(
        tidy(emphasis(cell ?? '')).replace(/\|/g, '\\|'),
      );
      cell = null;
    } else if (tag === 'table') {
      const rows = (table ?? []).filter((row) => row.length);
      table = null;
      if (rows.length) {
        const width = Math.max(...rows.map((row) => row.length));
        const line = (row) =>
          `| ${Array.from({ length: width }, (_, i) => row[i] ?? '').join(' | ')} |`;
        blocks.push(
          [
            line(rows[0]),
            `| ${Array.from({ length: width }, () => '---').join(' | ')} |`,
            ...rows.slice(1).map(line),
          ].join('\n'),
        );
      }
    } else if (tag === 'strong' || tag === 'b') append(BOLD);
    else if (tag === 'em' || tag === 'i') append(ITALIC);
    else if (tag === 'code') append(CODE);
    else if (tag === 'button' || tag === 'label') append(SOFT);
    else if (tag === 'summary') {
      append(BOLD);
      if (cell === null) flush();
    } else if (BLOCK.has(tag) && cell === null) flush();

    // Block-level by class, or an item of a flex or grid container: stacked
    // items end a block; items in a row stay in the line, spaced.
    if (cell === null && (frame.item === 'column' || frame.blockish)) flush();
    else if (frame.item === 'row') append(SOFT);
  }
  flush();

  return (
    blocks
      .map((block) => block.trimEnd())
      .filter(Boolean)
      // Consecutive list items stay together, as do the lines of one quote;
      // other blocks get a blank line.
      .reduce((lines, block, index, all) => {
        if (index > 0) {
          const previous = all[index - 1];
          if (block.startsWith('>') && previous.startsWith('>')) {
            lines.push('>');
          } else if (!(LIST_ITEM.test(block) && LIST_ITEM.test(previous))) {
            lines.push('');
          }
        }
        lines.push(block);
        return lines;
      }, [])
      .join('\n') + '\n'
  );
}
