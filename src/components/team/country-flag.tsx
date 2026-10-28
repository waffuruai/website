import type { Country } from '@/content/team';
import { cn } from '@/lib/utils';

/** A stylized maple leaf in a 12 × 12 box. */
const LEAF =
  '6,1 6.9,2.6 8.2,2 7.7,4.8 9.6,3.6 10.1,4.6 11.2,4.3 10.6,6 11.4,6.6 8.6,8.6 8.9,9.6 6.3,9.2 6.3,11.2 5.7,11.2 5.7,9.2 3.1,9.6 3.4,8.6 0.6,6.6 1.4,6 0.8,4.3 1.9,4.6 2.4,3.6 4.3,4.8 3.8,2 5.1,2.6';

const STRIPE = 10 / 7;

/*
 * Flags draw from the brand primitives (gold, cream, bronze), which do not
 * change with the theme, so a flag looks the same on a dark page and a light
 * one. A thin bronze frame gives the cream parts an edge on either.
 */
const GOLD = 'fill-[var(--gold)]';
const CREAM = 'fill-[var(--cream)]';
const BRONZE = 'fill-[var(--bronze)]';

/** Seven gold and cream stripes, and a bronze canton of waffle cells. */
function UnitedStates() {
  return (
    <>
      {Array.from({ length: 7 }, (_, i) => (
        <rect
          key={i}
          y={i * STRIPE}
          width={20}
          height={STRIPE}
          className={i % 2 === 0 ? GOLD : CREAM}
        />
      ))}
      <rect width={8.4} height={4 * STRIPE} className={BRONZE} />
      {Array.from({ length: 12 }, (_, i) => (
        <rect
          key={i}
          x={0.9 + (i % 4) * 1.8}
          y={0.75 + Math.floor(i / 4) * 1.6}
          width={1}
          height={1}
          className={CREAM}
        />
      ))}
    </>
  );
}

/** Two gold bars and a bronze maple leaf on the cream centre band. */
function Canada() {
  return (
    <>
      <rect width={20} height={10} className={CREAM} />
      <rect width={5} height={10} className={GOLD} />
      <rect x={15} width={5} height={10} className={GOLD} />
      <polygon
        points={LEAF}
        transform="translate(5.8 0.8) scale(0.7)"
        className={BRONZE}
      />
    </>
  );
}

/**
 * Where someone is based, as a small flag in the brand palette: gold, cream
 * and bronze instead of red, white and blue, the same in either theme. One accessible name (the
 * country); the shapes are decoration.
 */
export function CountryFlag({
  country,
  label,
  className,
}: {
  country: Country;
  /** The country's name in the visitor's language. */
  label: string;
  className?: string;
}) {
  return (
    <svg
      role="img"
      aria-label={label}
      // Both flags share one 2:1 box, so they line up at the same size.
      viewBox="0 0 20 10"
      className={cn(
        'inline-block h-3.5 w-7 shrink-0 overflow-hidden rounded-[2px]',
        className,
      )}
    >
      <title>{label}</title>
      {country === 'us' ? <UnitedStates /> : <Canada />}
      <rect
        x={0.25}
        y={0.25}
        width={19.5}
        height={9.5}
        rx={0.5}
        fill="none"
        strokeWidth={0.5}
        className="stroke-[var(--bronze)]"
      />
    </svg>
  );
}
