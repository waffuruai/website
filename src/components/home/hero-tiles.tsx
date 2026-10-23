import { cn } from '@/lib/utils';

const COLUMNS = 18;
const ROWS = 9;
/** Ripple delay between neighbouring tiles along the diagonal, in seconds. */
const STEP = 0.18;

/** The tiles that pool gold, as `[row, column]`, exactly as in the design. */
const HOT: readonly (readonly [number, number])[] = [
  [0, 0],
  [0, 11],
  [0, 13],
  [1, 4],
  [1, 5],
  [1, 16],
  [1, 17],
  [2, 8],
  [2, 10],
  [3, 4],
  [3, 12],
  [3, 15],
  [4, 3],
  [4, 9],
  [4, 16],
  [5, 3],
  [5, 7],
  [5, 14],
  [6, 8],
  [6, 11],
  [7, 2],
  [7, 13],
  [7, 15],
  [8, 6],
  [8, 7],
];

const isHot = (row: number, column: number) =>
  HOT.some(([hotRow, hotColumn]) => hotRow === row && hotColumn === column);

/**
 * The hero's waffle floor: 18 × 9 tiles tipped back in perspective, faded at
 * the edges with a radial mask, each tile glowing a beat after its neighbour
 * to the upper left. Pure CSS; decorative. Phones get a smaller, shorter
 * floor so the headline stays above the fold.
 */
export function HeroTiles({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        '[mask-image:radial-gradient(ellipse_60%_70%_at_50%_45%,black_30%,transparent_75%)]',
        'pointer-events-none absolute -top-10 left-1/2 -ml-[850px] h-[900px] w-[1700px] [perspective:1100px]',
        'max-[720px]:-ml-[450px] max-[720px]:h-[520px] max-[720px]:w-[900px]',
        className,
      )}
    >
      <div className="grid h-full w-full origin-top [transform:rotateX(52deg)_translateY(-60px)_scale(1.1)] grid-cols-18 gap-2.5">
        {Array.from({ length: COLUMNS * ROWS }, (_, index) => {
          const row = Math.floor(index / COLUMNS);
          const column = index % COLUMNS;
          return (
            <div
              key={index}
              className="wf-cell"
              data-hot={isHot(row, column) ? '' : undefined}
              style={{
                animationDelay: `${((row + column) * STEP).toFixed(2)}s`,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
