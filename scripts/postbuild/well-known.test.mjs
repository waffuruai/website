// @vitest-environment node
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

import { afterEach, describe, expect, it } from 'vitest';

import {
  SKILLS_SCHEMA,
  assertValidSkill,
  buildApiCatalog,
  buildSkillsIndex,
  skillDigest,
  skillMeta,
  writeWellKnown,
} from './well-known.mjs';
import { tempDirs } from './test-utils.mjs';

const dirs = tempDirs();
afterEach(() => dirs.cleanup());

const PRODUCTS = [
  { product: 'ops', repo: 'waffuruai/ops', asset: 'bootstrap.sh' },
  { product: 'iron', repo: 'waffuruai/iron', asset: 'install.sh' },
];

const SKILL = `---
name: install-waffuru
description: Install Iron or Butter and verify the checksum.
---

# Install
`;

describe('buildApiCatalog', () => {
  const catalog = buildApiCatalog(PRODUCTS, {
    schemaUrl: 'https://waffuru.ai/.well-known/releases.schema.json',
  });

  it('is a linkset with a bookmark entry listing every releases.json', () => {
    const [bookmarks] = catalog.linkset;
    expect(bookmarks.anchor).toBe('https://waffuru.ai/.well-known/api-catalog');
    expect(bookmarks.item.map((link) => link.href)).toEqual([
      'https://waffuru.ai/ops/releases.json',
      'https://waffuru.ai/iron/releases.json',
    ]);
  });

  it('gives each API its schema and no docs link', () => {
    const iron = catalog.linkset.find(
      (entry) => entry.anchor === 'https://waffuru.ai/iron/releases.json',
    );
    expect(iron['service-doc']).toBeUndefined();
    expect(iron['service-desc']).toEqual([
      {
        href: 'https://waffuru.ai/.well-known/releases.schema.json',
        type: 'application/schema+json',
      },
    ]);
  });

  it('omits service-desc when no schema is published', () => {
    const without = buildApiCatalog(PRODUCTS);
    expect(JSON.stringify(without)).not.toContain('service-desc');
  });
});

describe('skills', () => {
  it('reads name and description, quoted or not', () => {
    expect(skillMeta(SKILL)).toEqual({
      name: 'install-waffuru',
      description: 'Install Iron or Butter and verify the checksum.',
    });
    expect(
      skillMeta('---\nname: "a-b"\ndescription: \'Do it\'\n---\n'),
    ).toEqual({
      name: 'a-b',
      description: 'Do it',
    });
    expect(skillMeta('# no front matter')).toEqual({
      name: undefined,
      description: undefined,
    });
  });

  it('rejects names and descriptions the spec does not allow', () => {
    const ok = { name: 'a-b', description: 'x' };
    expect(() => assertValidSkill('a-b', ok)).not.toThrow();
    expect(() => assertValidSkill('a-b', { ...ok, name: 'A_b' })).toThrow(
      /name/,
    );
    expect(() => assertValidSkill('a-b', { ...ok, name: '-a' })).toThrow(
      /name/,
    );
    expect(() => assertValidSkill('other', ok)).toThrow(/directory/);
    expect(() => assertValidSkill('a-b', { ...ok, description: '' })).toThrow(
      /description/,
    );
    expect(() =>
      assertValidSkill('a-b', { ...ok, description: 'x'.repeat(1025) }),
    ).toThrow(/description/);
  });

  it('indexes every skill with a digest of the file bytes', async () => {
    const out = await dirs.make({
      '.well-known/agent-skills/install-waffuru/SKILL.md': SKILL,
      '.well-known/agent-skills/another-skill/SKILL.md': SKILL.replace(
        'install-waffuru',
        'another-skill',
      ),
      '.well-known/agent-skills/empty-folder/README.md': 'not a skill',
    });
    const index = await buildSkillsIndex(join(out, '.well-known/agent-skills'));
    expect(index.$schema).toBe(SKILLS_SCHEMA);
    expect(index.skills.map((skill) => skill.name)).toEqual([
      'another-skill',
      'install-waffuru',
    ]);
    expect(index.skills[1]).toEqual({
      name: 'install-waffuru',
      type: 'skill-md',
      description: 'Install Iron or Butter and verify the checksum.',
      url: '/.well-known/agent-skills/install-waffuru/SKILL.md',
      digest: `sha256:${createHash('sha256').update(SKILL).digest('hex')}`,
    });
    expect(skillDigest(Buffer.from(SKILL))).toMatch(/^sha256:[0-9a-f]{64}$/);
  });
});

describe('writeWellKnown', () => {
  it('writes the api-catalog and the skills index', async () => {
    const out = await dirs.make({
      '.well-known/releases.schema.json': '{}',
      '.well-known/agent-skills/install-waffuru/SKILL.md': SKILL,
    });
    const root = await dirs.make({
      'releases/products.json': JSON.stringify(PRODUCTS),
    });
    await writeWellKnown({ root, out });

    const catalog = JSON.parse(
      await readFile(join(out, '.well-known/api-catalog'), 'utf8'),
    );
    expect(catalog.linkset).toHaveLength(3);
    expect(JSON.stringify(catalog)).toContain('releases.schema.json');

    const index = JSON.parse(
      await readFile(join(out, '.well-known/agent-skills/index.json'), 'utf8'),
    );
    expect(index.skills).toHaveLength(1);
  });

  it('copes with no skills and no schema', async () => {
    const out = await dirs.make();
    const root = await dirs.make({
      'releases/products.json': JSON.stringify(PRODUCTS),
    });
    await expect(writeWellKnown({ root, out })).resolves.toBeUndefined();
    const catalog = await readFile(
      join(out, '.well-known/api-catalog'),
      'utf8',
    );
    expect(catalog).not.toContain('service-desc');
    await expect(
      readFile(join(out, '.well-known/agent-skills/index.json')),
    ).rejects.toThrow();
  });
});
