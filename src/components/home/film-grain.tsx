/**
 * Film grain over the top of the page: an SVG turbulence filter on a rect,
 * painted once (no animation). Opacity follows the theme (`--grain-opacity`,
 * see `.wf-grain`). Decorative, so hidden from assistive tech.
 *
 * The design's grain simply stops at 960px, which on phones (a shorter hero)
 * leaves a visible seam through the "The stack." heading; the last quarter
 * fades out instead.
 */
export function FilmGrain() {
  return (
    <svg
      aria-hidden
      focusable="false"
      className="wf-grain absolute top-0 left-0 z-[5] h-[960px] w-full [mask-image:linear-gradient(black_70%,transparent)]"
    >
      <filter id="home-grain">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.8"
          numOctaves="3"
          stitchTiles="stitch"
        />
      </filter>
      <rect width="100%" height="100%" filter="url(#home-grain)" />
    </svg>
  );
}
