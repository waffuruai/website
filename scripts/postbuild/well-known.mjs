import { createHash } from 'node:crypto';
import { mkdir, readFile, readdir, stat, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

import { SITE, SITE_URL } from './site.mjs';

/**
 * Discovery files that are generated, not hand-written, because they must
 * agree with something else in the repo:
 *
 * - `/.well-known/api-catalog` (RFC 9727) lists each installer product's
 *   `releases.json` as an API, straight from releases/products.json.
 * - `/.well-known/agent-skills/index.json` (Agent Skills Discovery RFC, v0.2.0)
 *   lists the skills under `out/.well-known/agent-skills/<name>/SKILL.md`,
 *   with each file's SHA-256 digest so the index can never go stale.
 */

const exists = (path) =>
  stat(path).then(
    () => true,
    () => false,
  );

const writeJson = async (file, data) => {
  await mkdir(join(file, '..'), { recursive: true });
  await writeFile(file, `${JSON.stringify(data, null, 2)}\n`);
};

/* API catalog ---------------------------------------------------------------- */

/**
 * The api-catalog linkset: a bookmark entry listing every API, then one entry
 * per API with its documentation and, when published, a JSON Schema
 * describing the response.
 */
export function buildApiCatalog(products, { schemaUrl } = {}) {
  const feeds = products.map(({ product }) => ({
    product,
    url: `${SITE_URL}/${product}/releases.json`,
  }));
  return {
    linkset: [
      {
        anchor: `${SITE_URL}/.well-known/api-catalog`,
        item: feeds.map(({ product, url }) => ({
          href: url,
          type: 'application/json',
          title: `${product} installer releases`,
        })),
      },
      ...feeds.map(({ product, url }) => ({
        anchor: url,
        ...(schemaUrl
          ? {
              'service-desc': [
                { href: schemaUrl, type: 'application/schema+json' },
              ],
            }
          : {}),
        'service-doc': [
          {
            href: SITE.docsUrl,
            type: 'text/html',
            title: `${SITE.name} documentation (${product})`,
          },
        ],
      })),
    ],
  };
}

export async function writeApiCatalog({ root, out }) {
  const products = JSON.parse(
    await readFile(join(root, 'releases/products.json'), 'utf8'),
  );
  const schema = '.well-known/releases.schema.json';
  const catalog = buildApiCatalog(products, {
    schemaUrl: (await exists(join(out, schema))) ? `${SITE_URL}/${schema}` : '',
  });
  await writeJson(join(out, '.well-known/api-catalog'), catalog);
}

/* Agent skills ---------------------------------------------------------------- */

export const SKILLS_SCHEMA =
  'https://schemas.agentskills.io/discovery/0.2.0/schema.json';

const SKILL_NAME = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/** `sha256:` plus the hex digest of a skill file's raw bytes. */
export const skillDigest = (bytes) =>
  `sha256:${createHash('sha256').update(bytes).digest('hex')}`;

/** The `name` and `description` in a SKILL.md's front matter. */
export function skillMeta(markdown) {
  const block = markdown.match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] ?? '';
  const field = (key) => {
    const value = block
      .match(new RegExp(`^${key}:\\s*(.+)$`, 'm'))?.[1]
      ?.trim();
    return value?.replace(/^(["'])([\s\S]*)\1$/, '$2');
  };
  return { name: field('name'), description: field('description') };
}

/** Throws unless a skill's front matter satisfies the discovery spec. */
export function assertValidSkill(directory, { name, description }) {
  const problems = [];
  if (!name || name.length > 64 || !SKILL_NAME.test(name)) {
    problems.push(
      `name "${name}" must be 1-64 lowercase letters, digits, hyphens`,
    );
  }
  if (name !== directory) {
    problems.push(`name "${name}" must match its directory "${directory}"`);
  }
  if (!description || description.length > 1024) {
    problems.push('description must be 1-1024 characters');
  }
  if (problems.length) {
    throw new Error(
      `agent skill ${directory}/SKILL.md: ${problems.join('; ')}`,
    );
  }
}

/** The index of every `<dir>/SKILL.md` under `skillsDir`. */
export async function buildSkillsIndex(skillsDir) {
  const entries = await readdir(skillsDir, { withFileTypes: true });
  const skills = [];
  for (const entry of entries.filter((item) => item.isDirectory())) {
    const file = join(skillsDir, entry.name, 'SKILL.md');
    if (!(await exists(file))) continue;
    const bytes = await readFile(file);
    const meta = skillMeta(bytes.toString('utf8'));
    assertValidSkill(entry.name, meta);
    skills.push({
      name: meta.name,
      type: 'skill-md',
      description: meta.description,
      url: `/.well-known/agent-skills/${entry.name}/SKILL.md`,
      digest: skillDigest(bytes),
    });
  }
  skills.sort((a, z) => a.name.localeCompare(z.name));
  return { $schema: SKILLS_SCHEMA, skills };
}

export async function writeSkillsIndex({ out }) {
  const skillsDir = join(out, '.well-known/agent-skills');
  if (!(await exists(skillsDir))) return;
  const index = await buildSkillsIndex(skillsDir);
  if (index.skills.length) {
    await writeJson(join(skillsDir, 'index.json'), index);
  }
}

/** The postbuild step: every generated `/.well-known/` file. */
export async function writeWellKnown({ root, out }) {
  await writeApiCatalog({ root, out });
  await writeSkillsIndex({ out });
}
