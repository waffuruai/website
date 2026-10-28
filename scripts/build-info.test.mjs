import { mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { describe, expect, it } from 'vitest';

import { readBuildInfo, renderBuildInfo } from './build-info.mjs';

describe('build info', () => {
  it('reads the version, short commit and commit date from this checkout', async () => {
    const info = await readBuildInfo(join(import.meta.dirname, '..'));
    expect(info.version).toMatch(/^\d+\.\d+\.\d+/);
    expect(info.commit).toMatch(/^([0-9a-f]{7,}|dev)$/);
    expect(info.date).toMatch(/^(\d{4}-\d{2}-\d{2}|dev)$/);
  });

  it('falls back to dev outside a git checkout', async () => {
    const dir = mkdtempSync(join(tmpdir(), 'build-info-'));
    writeFileSync(join(dir, 'package.json'), '{ "version": "2.3.4" }');
    expect(await readBuildInfo(dir)).toEqual({
      version: '2.3.4',
      commit: 'dev',
      date: 'dev',
    });
  });

  it('renders a typed module', () => {
    expect(
      renderBuildInfo({
        version: '1.0.0',
        commit: 'abc1234',
        date: '2026-10-28',
      }),
    ).toContain('export const buildInfo = {');
  });
});
