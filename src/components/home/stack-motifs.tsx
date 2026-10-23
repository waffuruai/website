/*
 * The four product motifs beside the stack rows. Pure CSS (see
 * `src/styles/motifs.css`) and decorative, so each one is hidden from
 * assistive tech.
 */

/** Syrup: a drop running down a line. */
export function DripMotif() {
  return (
    <div aria-hidden className="relative h-[120px] w-6">
      <div className="wf-drip" />
      <div className="wf-drop" />
    </div>
  );
}

const LEDS = 32;

/** Waffle: a rack of 32 status LEDs blinking out of step. */
export function LedMotif() {
  return (
    <div aria-hidden className="grid grid-cols-8 gap-2">
      {Array.from({ length: LEDS }, (_, index) => (
        <div
          key={index}
          className="wf-led"
          style={{
            animationDelay: `${(((index * 14) % 23) * 0.17).toFixed(2)}s`,
          }}
        />
      ))}
    </div>
  );
}

/** Butter: a pat that melts and resets. */
export function PatMotif() {
  return (
    <div
      aria-hidden
      className="flex h-[72px] w-[120px] items-end justify-center"
    >
      <div className="wf-pat" />
    </div>
  );
}

const STAMPS = 4;

/** Iron: a 4 x 4 grid of tiles being pressed, corner to corner. */
export function StampMotif() {
  return (
    <div aria-hidden className="grid w-24 grid-cols-4 gap-1.5">
      {Array.from({ length: STAMPS * STAMPS }, (_, index) => {
        const row = Math.floor(index / STAMPS);
        const column = index % STAMPS;
        return (
          <div
            key={index}
            className="wf-stamp"
            style={{
              animationDelay: `${((row + column) * 0.12).toFixed(2)}s`,
            }}
          />
        );
      })}
    </div>
  );
}
