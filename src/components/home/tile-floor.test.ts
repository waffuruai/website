import { describe, expect, it } from 'vitest';

import {
  ambientGlow,
  COLUMNS,
  HOT,
  isHot,
  ROWS,
  stillGlow,
  tileQuads,
} from '@/components/home/tile-floor';

const DESKTOP = { width: 1700, height: 900 };

describe('floor geometry', () => {
  it('has 18 x 9 tiles and the 25 hot ones from the design', () => {
    expect(tileQuads(DESKTOP)).toHaveLength(ROWS * COLUMNS);
    expect(HOT).toHaveLength(25);
    const hotIndices = HOT.map(([row, column]) => row * COLUMNS + column);
    expect(hotIndices).toEqual([
      0, 11, 13, 22, 23, 34, 35, 44, 46, 58, 66, 69, 75, 81, 88, 93, 97, 104,
      116, 119, 128, 139, 141, 150, 151,
    ]);
    expect(isHot(0, 0)).toBe(true);
    expect(isHot(0, 1)).toBe(false);
  });

  it('tips the floor back: far rows are narrower than near rows', () => {
    const quads = tileQuads(DESKTOP);
    const width = (quad: { x: number }[]) => quad[1].x - quad[0].x;
    expect(width(quads[0])).toBeLessThan(width(quads[(ROWS - 1) * COLUMNS]));
  });
});

describe('floor light', () => {
  it('starts each tile after its diagonal delay of (row + column) x 0.18s', () => {
    expect(ambientGlow(0, 1, 0.1)).toBe(0);
    expect(ambientGlow(0, 1, 0.18 + 7 * 0.12)).toBeCloseTo(0.22, 5);
    expect(ambientGlow(8, 17, 4.4)).toBe(0);
  });

  it('pools the hot tiles brighter than the wave', () => {
    // 15% into the 7s loop is the pool's peak.
    expect(ambientGlow(0, 0, 7 * 0.15)).toBeCloseTo(0.75, 5);
    expect(ambientGlow(0, 1, 0.18 + 7 * 0.15)).toBeLessThan(0.22);
    expect(stillGlow(0, 0)).toBeGreaterThan(stillGlow(0, 1));
  });
});
