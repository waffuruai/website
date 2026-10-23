import { describe, expect, it } from 'vitest';

import {
  ambientGlow,
  COLUMNS,
  HOT,
  isHot,
  project,
  RIPPLE_LIFE,
  rippleGlow,
  ROWS,
  stillGlow,
  tileAt,
  tileQuads,
  unproject,
} from '@/components/home/tile-floor';

const DESKTOP = { width: 1700, height: 900 };
const PHONE = { width: 900, height: 520 };

/** Centre of a tile on screen: the mean of its projected corners. */
const centre = (box: typeof DESKTOP, row: number, column: number) => {
  const quad = tileQuads(box)[row * COLUMNS + column];
  return {
    x: quad.reduce((sum, p) => sum + p.x, 0) / 4,
    y: quad.reduce((sum, p) => sum + p.y, 0) / 4,
  };
};

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

  it.each([
    ['desktop', DESKTOP],
    ['phone', PHONE],
  ])('unproject inverts project (%s)', (_, box) => {
    for (const [x, y] of [
      [0, 0],
      [850, 450],
      [1234.5, 77],
      [12, 880],
    ]) {
      const back = unproject(box, project(box, x, y));
      expect(back?.x).toBeCloseTo(x, 6);
      expect(back?.y).toBeCloseTo(y, 6);
    }
  });

  it('finds the tile under a point, and nothing off the floor', () => {
    for (const [row, column] of [
      [0, 0],
      [4, 9],
      [8, 17],
      [3, 15],
    ]) {
      expect(tileAt(DESKTOP, centre(DESKTOP, row, column))).toEqual({
        row,
        column,
      });
      expect(tileAt(PHONE, centre(PHONE, row, column))).toEqual({
        row,
        column,
      });
    }
    expect(tileAt(DESKTOP, { x: -5000, y: 600 })).toBeNull();
    expect(tileAt(DESKTOP, { x: 850, y: 5000 })).toBeNull();
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

  it('sends a ring out from the touched tile that fades away', () => {
    const ripple = { row: 4, column: 9, start: 10, strength: 1 };
    // At the start the touched tile is brightest.
    expect(rippleGlow(ripple, 4, 9, 10)).toBeCloseTo(1, 5);
    expect(rippleGlow(ripple, 4, 12, 10)).toBeLessThan(0.1);
    // Later the ring has moved outward, past the origin.
    const later = 10 + 3 / 11;
    expect(rippleGlow(ripple, 4, 12, later)).toBeGreaterThan(
      rippleGlow(ripple, 4, 9, later),
    );
    // And it is gone after its life, or before it starts.
    expect(rippleGlow(ripple, 4, 9, 10 + RIPPLE_LIFE + 0.01)).toBe(0);
    expect(rippleGlow(ripple, 4, 9, 9)).toBe(0);
  });
});
