import { cn } from '@/lib/utils';

/** Ripple delay between neighbouring tiles, in seconds. */
const STEP = 0.25;

/**
 * The rotated 6x6 waffle-tile square from the After Hours call-to-action
 * card. Purely decorative; a diagonal of "hot" tiles glows gold.
 */
export function TileDeco({
  size = 6,
  hot = [
    [0, 2],
    [1, 3],
    [2, 4],
    [3, 5],
    [5, 0],
  ],
  className,
}: {
  size?: number;
  hot?: [number, number][];
  className?: string;
}) {
  const isHot = (r: number, c: number) =>
    hot.some(([hr, hc]) => hr === r && hc === c);
  return (
    <div
      aria-hidden
      className={cn('grid gap-2', className)}
      style={{ gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))` }}
    >
      {Array.from({ length: size * size }, (_, i) => {
        const r = Math.floor(i / size);
        const c = i % size;
        return (
          <div
            key={i}
            className="wf-cell aspect-square"
            data-hot={isHot(r, c) ? '' : undefined}
            style={{ animationDelay: `${((r + c) * STEP).toFixed(2)}s` }}
          />
        );
      })}
    </div>
  );
}
