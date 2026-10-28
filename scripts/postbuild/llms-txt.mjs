import { readFile, stat, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

import { builtPages } from './pages.mjs';
import { SITE, SITE_URL, isPublished, markdownPath } from './site.mjs';

/**
 * llms.txt (https://llmstxt.org) and llms-full.txt, both written to `out/`.
 *
 * llms.txt is a reading list for agents: one H1, a summary, and H2 sections of
 * links to the English markdown twins with each page's meta description.
 * Sections come from the pages that were built (nothing here lists pages);
 * only their order has hints so the stack reads Iron, Butter, Syrup, Whisk.
 */

const SECTIONS = [
  'Products',
  'Solutions',
  'Industries',
  'Company',
  'Blog',
  'Help',
  'Legal',
  'Other',
  'Installers',
];

/** Section of a route; anything unrecognised lands in "Other". */
export function sectionOf(path) {
  const first = path.split('/')[1];
  switch (first) {
    case 'products':
      return 'Products';
    case 'solutions':
      return 'Solutions';
    case 'industries':
      return 'Industries';
    case 'about':
    case 'brand':
      return 'Company';
    case 'blog':
      return 'Blog';
    case 'support':
    case 'contact':
      return 'Help';
    case 'legal':
      return 'Legal';
    default:
      return 'Other';
  }
}

/** Reading order inside sections; unlisted pages follow, alphabetically. */
const PATH_ORDER = [
  '/products',
  '/products/pantry',
  '/products/iron',
  '/products/butter',
  '/products/syrup',
  '/products/whisk',
  '/products/waffle',
  '/solutions',
  '/solutions/small-business',
  '/solutions/enterprise',
  '/solutions/neoclouds',
  '/solutions/ai-companies',
  '/industries',
  '/industries/cloud-infrastructure',
  '/industries/financial-services',
  '/industries/life-sciences',
  '/industries/government',
  '/industries/military',
  '/about',
  '/about/team',
  '/brand',
  '/blog',
  '/support',
  '/contact',
  '/legal',
  '/legal/terms',
  '/legal/privacy',
  '/legal/cookies',
];

function compare(a, z) {
  const rank = (page) => {
    const index = PATH_ORDER.indexOf(page.path);
    return index === -1 ? PATH_ORDER.length : index;
  };
  if (rank(a) !== rank(z)) return rank(a) - rank(z);
  // Posts: newest first.
  if (a.date && z.date && a.date !== z.date) return a.date < z.date ? 1 : -1;
  return a.path.localeCompare(z.path);
}

/** Home first, then by section, then in reading order. */
export function orderPages(pages) {
  const rank = (page) =>
    page.path === '/' ? -1 : SECTIONS.indexOf(sectionOf(page.path));
  return [...pages].sort((a, z) => rank(a) - rank(z) || compare(a, z));
}

/** `- [title](url): description` */
const entry = (title, url, description) =>
  `- [${title}](${url})${description ? `: ${description}` : ''}`;

const oneLine = (text) => text.replace(/\s+/g, ' ').trim();

/** The Installers section lines, straight from releases/products.json. */
export function installerLines(products) {
  return products.flatMap(({ product, repo, asset }) => {
    const base = `${SITE_URL}/${product}`;
    return [
      entry(
        `${product}/${asset}`,
        `${base}/${asset}`,
        `Installer for the latest verified release of ${repo}. Read it before you run it.`,
      ),
      entry(
        `${product}/${asset}.sha256`,
        `${base}/${asset}.sha256`,
        'SHA-256 of the release asset. The served script has one extra header line ("# waffuru release: ..."); drop it before checking',
      ),
      entry(
        `${product}/releases.json`,
        `${base}/releases.json`,
        `Published tags, checksums and the latest tag. Pinned copies live at ${base}/<tag>/${asset}`,
      ),
    ];
  });
}

const INTRO = `Every page has a markdown twin: send \`Accept: text/markdown\` or append \`.md\` to its URL (\`/index.md\` for the home page). The pages are also written in Spanish, French, Chinese, Japanese and Korean under /es, /fr, /zh, /ja and /ko (for example ${SITE_URL}/es/about.md). The links below are the English pages.`;

const MISSION = `${SITE.name} is on a mission to ${SITE.mission.replace(/^D/, 'd').replace(/\.$/, '')}.`;
const STACK =
  'Iron compiles the kernels, Butter runs models on them, Syrup watches the GPUs and Whisk remembers what you were working on, all on the hardware you already own. The stack is closed source and in early access.';
const STACK_UNNAMED =
  'It builds the stack that runs AI on the hardware you already own: kernels, an inference engine, a GPU control plane and memory, all closed source and in early access.';
const PANTRY =
  'Pantry (the `wpantry` command) is its free, open-source vulnerability scanner for macOS and Linux.';

/**
 * The summary blockquote shared by llms.txt and llms-full.txt. It names only
 * what this build publishes (`site.launched`).
 */
export function summary(options) {
  return `> ${[
    MISSION,
    isPublished('stack', options) ? STACK : STACK_UNNAMED,
    ...(isPublished('pantry', options) ? [PANTRY] : []),
  ].join(' ')}`;
}

/**
 * llms.txt as text. `pages` are the English pages (`path`, `title`,
 * `description`, optional `date`); `products` is releases/products.json;
 * `feed` says whether the blog has an RSS feed.
 */
export function buildLlmsTxt({ pages, products, feed = false }) {
  const bySection = new Map(SECTIONS.map((name) => [name, []]));
  for (const page of orderPages(pages)) {
    if (page.path === '/') continue;
    const name = sectionOf(page.path);
    if (!bySection.has(name)) bySection.set(name, []);
    bySection
      .get(name)
      .push(
        entry(
          page.title,
          `${SITE_URL}${markdownPath(page.path)}`,
          oneLine(page.description),
        ),
      );
  }
  if (feed) {
    bySection
      .get('Blog')
      .push(
        entry(
          'RSS feed',
          `${SITE_URL}/blog/feed.xml`,
          'New posts as they publish',
        ),
      );
  }
  bySection
    .get('Help')
    .push(
      entry(
        'Request early access',
        SITE.earlyAccessUrl,
        'Join the early-access list',
      ),
    );
  bySection.set('Installers', installerLines(products));

  const sections = [...bySection]
    .filter(([, lines]) => lines.length)
    .map(([name, lines]) => `## ${name}\n\n${lines.join('\n')}`);

  return `${[
    `# ${SITE.name}`,
    summary(),
    `Home page: ${SITE_URL} (markdown: ${SITE_URL}/index.md). Contact: ${SITE.email}. Made in North America.`,
    INTRO,
    ...sections,
  ].join('\n\n')}\n`;
}

const FRONT_MATTER = /^---\n[\s\S]*?\n---\n\n?/;
const BAR = '='.repeat(72);

/** llms-full.txt as text: `mirrors` are `{ title, url, markdown }` in order. */
export function buildLlmsFull(mirrors) {
  const documents = mirrors.map(
    ({ title, url, markdown }) =>
      `${BAR}\nTitle: ${title}\nURL: ${url}\n${BAR}\n\n${markdown.replace(FRONT_MATTER, '').trimEnd()}\n`,
  );
  return `${[
    `# ${SITE.name}: full text`,
    summary(),
    `Every English page of ${SITE_URL}, as markdown, in the order of ${SITE_URL}/llms.txt.`,
  ].join('\n\n')}\n\n${documents.join('\n')}`;
}

const exists = (path) =>
  stat(path).then(
    () => true,
    () => false,
  );

const dateOf = (markdown) => markdown.match(/^date: (\S+)$/m)?.[1];

/** Writes `out/llms.txt` and `out/llms-full.txt` (run after the mirrors). */
export async function writeLlmsTxt({ root, out }) {
  const products = JSON.parse(
    await readFile(join(root, 'releases/products.json'), 'utf8'),
  );
  const pages = [];
  const markdownByPath = new Map();
  for (const page of await builtPages(out, { locales: ['en'] })) {
    let markdown;
    try {
      markdown = await readFile(
        join(out, page.file.replace(/\.html$/, '.md')),
        'utf8',
      );
    } catch (error) {
      if (error.code !== 'ENOENT') throw error;
    }
    pages.push({ ...page, date: markdown && dateOf(markdown) });
    if (markdown) markdownByPath.set(page.path, markdown);
  }

  const feed = await exists(join(out, 'blog/feed.xml'));
  await writeFile(
    join(out, 'llms.txt'),
    buildLlmsTxt({ pages, products, feed }),
  );

  await writeFile(
    join(out, 'llms-full.txt'),
    buildLlmsFull(
      orderPages(pages)
        .filter((page) => markdownByPath.has(page.path))
        .map((page) => ({
          title: page.title,
          url: page.url,
          markdown: markdownByPath.get(page.path),
        })),
    ),
  );
}
