import type { ProductKey } from '@/content/pages/solutions/types';

/** Delay between neighbouring Iron stamps, in seconds. */
const STAMP_STEP = 0.12;

/** LEDs in the Syrup rack: 8 columns, 4 rows. */
const LEDS = 32;

/** Spreads LED start times over the 4s cycle without a visible pattern. */
const ledDelay = (index: number) => ((index * 2.38) % 3.91).toFixed(2);

/**
 * The After Hours motif for each product's row: Iron stamps a 4x4 grid,
 * Butter melts a pat, Syrup blinks a rack of LEDs, Whisk drips. Pure CSS
 * (see motifs.css) and decorative, so it is hidden from assistive tech.
 */
export function ProductMotif({ product }: { product: ProductKey }) {
  switch (product) {
    case 'iron':
      return (
        <div aria-hidden className="grid w-24 grid-cols-4 gap-1.5">
          {Array.from({ length: 16 }, (_, i) => (
            <div
              key={i}
              className="wf-stamp"
              style={{
                animationDelay: `${(((i % 4) + Math.floor(i / 4)) * STAMP_STEP).toFixed(2)}s`,
              }}
            />
          ))}
        </div>
      );
    case 'butter':
      return (
        <div
          aria-hidden
          className="flex h-[72px] w-[120px] items-end justify-center"
        >
          <div className="wf-pat" />
        </div>
      );
    case 'syrup':
      return (
        <div aria-hidden className="grid w-[120px] grid-cols-8 gap-2">
          {Array.from({ length: LEDS }, (_, i) => (
            <div
              key={i}
              className="wf-led"
              style={{ animationDelay: `${ledDelay(i)}s` }}
            />
          ))}
        </div>
      );
    case 'whisk':
      return (
        <div aria-hidden className="relative h-[120px] w-6">
          <div className="wf-drip" />
          <div className="wf-drop" />
        </div>
      );
  }
}
