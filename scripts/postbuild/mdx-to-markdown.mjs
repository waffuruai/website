/*
 * Blog posts are MDX (`src/content/blog/<slug>/page.mdx`, `page.<locale>.mdx`).
 * Their markdown twins come from the source, not the rendered HTML, so code
 * blocks keep their languages and the prose is exactly what the author wrote:
 * ESM (imports and exports) and JSX are stripped, the children of components
 * are kept, and the front matter comes from the post's `export const
 * article = {...}`.
 */
import remarkGfm from 'remark-gfm';
import remarkMdx from 'remark-mdx';
import remarkParse from 'remark-parse';
import remarkStringify from 'remark-stringify';
import { unified } from 'unified';

const parser = unified().use(remarkParse).use(remarkMdx).use(remarkGfm);

// No remark-mdx here: its serializer escapes `{` and `<` for MDX, and the
// output is plain markdown.
const stringifier = unified().use(remarkGfm).use(remarkStringify, {
  bullet: '-',
  emphasis: '*',
  strong: '*',
  fence: '`',
  fences: true,
  listItemIndent: 'one',
  rule: '-',
  setext: false,
  incrementListMarker: true,
});

/** The value of a literal expression in an ESTree, else `undefined`. */
function evaluate(node) {
  switch (node?.type) {
    case 'Literal':
      return node.regex ? undefined : node.value;
    case 'TemplateLiteral':
      return node.expressions.length
        ? undefined
        : node.quasis.map((part) => part.value.cooked).join('');
    case 'ArrayExpression':
      return node.elements.map(evaluate).filter((item) => item !== undefined);
    case 'ObjectExpression': {
      const object = {};
      for (const property of node.properties) {
        if (property.type !== 'Property' || property.computed) continue;
        const key = property.key.name ?? property.key.value;
        const value = evaluate(property.value);
        if (key !== undefined && value !== undefined) object[key] = value;
      }
      return object;
    }
    case 'UnaryExpression': {
      const value = evaluate(node.argument);
      if (typeof value !== 'number') return undefined;
      return node.operator === '-' ? -value : value;
    }
    case 'NewExpression': {
      // `new Date('2026-10-20')`: the only constructor posts use in data.
      if (node.callee.name !== 'Date') return undefined;
      const date = new Date(...node.arguments.map(evaluate));
      return Number.isNaN(date.getTime()) ? undefined : date.toISOString();
    }
    default:
      return undefined;
  }
}

/** The post's `export const article = {...}` as plain data, else `null`. */
export function readArticle(tree) {
  for (const node of tree.children) {
    if (node.type !== 'mdxjsEsm') continue;
    for (const statement of node.data?.estree?.body ?? []) {
      if (statement.type !== 'ExportNamedDeclaration') continue;
      for (const declarator of statement.declaration?.declarations ?? []) {
        if (declarator.id?.name === 'article') {
          const article = evaluate(declarator.init);
          if (article && typeof article === 'object') return article;
        }
      }
    }
  }
  return null;
}

const PHRASING = new Set([
  'text',
  'emphasis',
  'strong',
  'delete',
  'inlineCode',
  'link',
  'linkReference',
  'image',
  'imageReference',
  'break',
  'footnoteReference',
  'html',
]);
const FLOW_CONTAINERS = new Set([
  'root',
  'blockquote',
  'listItem',
  'footnoteDefinition',
]);

/** Wraps runs of inline nodes that unwrapping left among blocks. */
function wrapPhrasing(nodes) {
  const wrapped = [];
  for (const node of nodes) {
    const last = wrapped.at(-1);
    if (!PHRASING.has(node.type)) wrapped.push(node);
    else if (last?.type === 'paragraph' && last.synthetic) {
      last.children.push(node);
    } else {
      wrapped.push({ type: 'paragraph', synthetic: true, children: [node] });
    }
  }
  return wrapped;
}

/** Removes ESM and JSX nodes, keeping what components wrap. */
function strip(parent) {
  if (!parent.children) return;
  const next = [];
  for (const child of parent.children) {
    if (
      child.type === 'mdxjsEsm' ||
      child.type === 'mdxFlowExpression' ||
      child.type === 'mdxTextExpression'
    ) {
      continue;
    }
    strip(child);
    if (
      child.type === 'mdxJsxFlowElement' ||
      child.type === 'mdxJsxTextElement'
    ) {
      next.push(...(child.children ?? []));
    } else if (child.type === 'paragraph' && !child.children.length) {
      continue;
    } else {
      next.push(child);
    }
  }
  parent.children = FLOW_CONTAINERS.has(parent.type)
    ? wrapPhrasing(next)
    : next;
}

/** Resolves relative link and image URLs against the page. */
function absolutize(node, base) {
  if ((node.type === 'link' || node.type === 'image') && node.url) {
    if (!node.url.startsWith('#')) {
      try {
        node.url = new URL(node.url, base).href;
      } catch {
        // Leave anything unparseable as written.
      }
    }
  }
  for (const child of node.children ?? []) absolutize(child, base);
}

const hasH1 = (tree) =>
  tree.children.some((node) => node.type === 'heading' && node.depth === 1);

/* Front matter ------------------------------------------------------------ */

const asList = (value) =>
  (Array.isArray(value) ? value : value === undefined ? [] : [value])
    .map((item) => (typeof item === 'object' ? item?.name : item))
    .filter((item) => typeof item === 'string' && item.trim())
    .map((item) => item.trim());

/** `eric-kryski` (an author slug) reads as "Eric Kryski"; names pass through. */
const asName = (value) =>
  /^[a-z0-9]+(?:-[a-z0-9]+)+$/.test(value)
    ? value
        .split('-')
        .map((word) => word[0].toUpperCase() + word.slice(1))
        .join(' ')
    : value;

const DATE_ONLY = /^\d{4}-\d{2}-\d{2}$/;
const asDate = (value) => {
  if (typeof value !== 'string') return undefined;
  return DATE_ONLY.test(value)
    ? value
    : value.replace(/T00:00:00(\.000)?Z$/, '');
};

/** Front matter fields for a post, from its `article` export. */
export function articleFields(article) {
  const text = (value) =>
    typeof value === 'string' ? value.trim() : undefined;
  return {
    title: text(article.title),
    description: text(
      article.description ?? article.excerpt ?? article.summary,
    ),
    date: asDate(article.date ?? article.published ?? article.publishedAt),
    updated: asDate(article.updated ?? article.modified ?? article.updatedAt),
    authors: asList(article.authors ?? article.author).map(asName),
    category: text(article.category),
    tags: asList(article.tags ?? article.keywords),
  };
}

/** A YAML front matter block. Strings are JSON-quoted (valid YAML). */
export function frontMatter(fields) {
  const lines = [];
  for (const [key, value] of Object.entries(fields)) {
    if (value === undefined || value === '') continue;
    if (Array.isArray(value)) {
      if (value.length) lines.push(`${key}: ${JSON.stringify(value)}`);
    } else if (typeof value === 'string' && DATE_ONLY.test(value)) {
      lines.push(`${key}: ${value}`);
    } else {
      lines.push(`${key}: ${JSON.stringify(value)}`);
    }
  }
  return `---\n${lines.join('\n')}\n---\n`;
}

/**
 * Converts a post's MDX source to markdown with front matter. `meta` holds
 * what the built page says (`title`, `description`, `url`, `language`); the
 * post's own `article` export wins for title and description.
 */
export function mdxToMarkdown(source, meta) {
  const tree = parser.parse(source);
  const article = readArticle(tree);
  const fields = article ? articleFields(article) : {};

  strip(tree);
  absolutize(tree, meta.url);

  const title = fields.title || meta.title;
  if (title && !hasH1(tree)) {
    tree.children.unshift({
      type: 'heading',
      depth: 1,
      children: [{ type: 'text', value: title }],
    });
  }

  const body = stringifier.stringify(tree);
  const head = frontMatter({
    title,
    description: fields.description || meta.description,
    url: meta.url,
    language: meta.language,
    date: fields.date,
    updated: fields.updated,
    authors: fields.authors,
    category: fields.category,
    tags: fields.tags,
  });
  return `${head}\n${body.trimEnd()}\n`;
}
