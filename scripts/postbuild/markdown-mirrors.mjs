import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

import { frontMatter, mdxToMarkdown } from './mdx-to-markdown.mjs';
import { htmlToMarkdown, mainHtml } from './html-to-markdown.mjs';
import { builtPages } from './pages.mjs';
import { DEFAULT_LOCALE, LOCALE_LANG } from './site.mjs';

/** Where a blog post's MDX source lives, or `null` for any other page. */
export function blogSourcePath(root, { path, locale }) {
  const slug = path.match(/^\/blog\/([\w.-]+)$/)?.[1];
  if (!slug || slug.startsWith('.')) return null;
  const file = locale === DEFAULT_LOCALE ? 'page.mdx' : `page.${locale}.mdx`;
  return join(root, 'src/content/blog', slug, file);
}

/** The MDX source of a blog post page, else `null` (not a post, or no file). */
async function blogSource(root, page) {
  const file = blogSourcePath(root, page);
  if (!file) return null;
  try {
    return await readFile(file, 'utf8');
  } catch (error) {
    if (error.code === 'ENOENT') return null;
    throw error;
  }
}

/** The markdown twin of one built page. */
export async function markdownFor(root, page) {
  const meta = {
    title: page.title,
    description: page.description,
    url: page.url,
    language: page.lang || LOCALE_LANG[page.locale],
  };
  const source = await blogSource(root, page);
  if (source) return mdxToMarkdown(source, meta);

  const body = htmlToMarkdown(mainHtml(page.html), page.url);
  return `${frontMatter(meta)}\n${body}`;
}

/**
 * Writes the markdown twin of every built page next to it
 * (`out/en/about.html` gets `out/en/about.md`; `out/en.html` gets
 * `out/en.md`). The Worker serves them for `Accept: text/markdown` and for
 * `/about.md`. Blog posts convert from their MDX source; every other page
 * from the rendered `<main>`. Pages are discovered, never listed.
 */
export async function writeMarkdownMirrors({ root, out }) {
  for (const page of await builtPages(out)) {
    const markdown = await markdownFor(root, page);
    await writeFile(join(out, page.file.replace(/\.html$/, '.md')), markdown);
  }
}
