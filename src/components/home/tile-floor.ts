/**
 * Geometry and light for the hero's waffle floor, as pure functions.
 *
 * The floor reproduces the After Hours CSS exactly: an 18 × 9 grid with 10px
 * gaps filling a W × H box, transformed with `rotateX(52deg)
 * translateY(-60px) scale(1.1)` about its top centre, seen through
 * `perspective: 1100px` from the box's centre. Projecting the tiles ourselves
 * (instead of 162 animated DOM nodes) means one canvas paints the light, and
 * a pointer position can be mapped back onto the floor to find its tile.
 */

export const COLUMNS = 18;
export const ROWS = 9;
const GAP = 10;
const PERSPECTIVE = 1100;
const TILT = (52 * Math.PI) / 180;
const LIFT = -60;
const SCALE = 1.1;

/** The tiles that pool gold, as `[row, column]`, exactly as in the design. */
export const HOT: readonly (readonly [number, number])[] = [
  [0, 0], [0, 11], [0, 13], [1, 4], [1, 5], [1, 16], [1, 17], [2, 8], [2, 10],
  [3, 4], [3, 12], [3, 15], [4, 3], [4, 9], [4, 16], [5, 3], [5, 7], [5, 14],
  [6, 8], [6, 11], [7, 2], [7, 13], [7, 15], [8, 6], [8, 7],
]; // prettier-ignore

const HOT_KEYS = new Set(HOT.map(([row, column]) => row * COLUMNS + column));

export const isHot = (row: number, column: number) =>
  HOT_KEYS.has(row * COLUMNS + column);

export type Point = { x: number; y: number };

/** Size of the floor's box in CSS pixels (1700 × 900, or 900 × 520 on phones). */
export type Box = { width: number; height: number };

const cellSize = ({ width, height }: Box) => ({
  w: (width - GAP * (COLUMNS - 1)) / COLUMNS,
  h: (height - GAP * (ROWS - 1)) / ROWS,
});

/** Where a point of the flat grid lands on screen, in box coordinates. */
export function project(box: Box, x: number, y: number): Point {
  const cx = box.width / 2;
  const cy = box.height / 2;
  const lifted = SCALE * y + LIFT;
  const depth = lifted * Math.sin(TILT);
  const k = PERSPECTIVE / (PERSPECTIVE - depth);
  return {
    x: cx + SCALE * (x - cx) * k,
    y: cy + (lifted * Math.cos(TILT) - cy) * k,
  };
}

/** The four projected corners of every tile, row by row. */
export function tileQuads(box: Box): Point[][] {
  const { w, h } = cellSize(box);
  const quads: Point[][] = [];
  for (let row = 0; row < ROWS; row += 1) {
    for (let column = 0; column < COLUMNS; column += 1) {
      const x = column * (w + GAP);
      const y = row * (h + GAP);
      quads.push([
        project(box, x, y),
        project(box, x + w, y),
        project(box, x + w, y + h),
        project(box, x, y + h),
      ]);
    }
  }
  return quads;
}

/* Light ------------------------------------------------------------------ */

/** One loop of the ambient light, as in the CSS keyframes (seconds). */
const CYCLE = 7;
/** Delay between neighbouring tiles along the diagonal (seconds). */
const STEP = 0.18;

type Keyframes = readonly (readonly [number, number])[];

/** `wfa-wave`: a faint pass of light across every tile. */
const WAVE: Keyframes = [[0, 0], [0.12, 0.22], [0.3, 0], [1, 0]]; // prettier-ignore
/** `wfa-pool`: the hot tiles brighten, settle and fade. */
const POOL: Keyframes = [[0, 0.05], [0.15, 0.75], [0.55, 0.35], [1, 0.05]]; // prettier-ignore

/** CSS `ease-in-out` between keyframes, close enough at these opacities. */
const ease = (t: number) => t * t * (3 - 2 * t);

function sample(frames: Keyframes, phase: number) {
  for (let i = 1; i < frames.length; i += 1) {
    const [end, to] = frames[i];
    if (phase <= end) {
      const [start, from] = frames[i - 1];
      return from + (to - from) * ease((phase - start) / (end - start));
    }
  }
  return frames[frames.length - 1][1];
}

/**
 * The ambient glow of a tile at `time` seconds since the floor appeared:
 * 0 until its delay has passed (the CSS animations start staggered), then the
 * wave (or the pool for hot tiles) on a 7s loop.
 */
export function ambientGlow(row: number, column: number, time: number) {
  const elapsed = time - (row + column) * STEP;
  if (elapsed < 0) return 0;
  const phase = (elapsed % CYCLE) / CYCLE;
  return sample(isHot(row, column) ? POOL : WAVE, phase);
}

/** The settled look for reduced motion: hot tiles lit, the rest dark. */
export const stillGlow = (row: number, column: number) =>
  isHot(row, column) ? 0.35 : 0;
