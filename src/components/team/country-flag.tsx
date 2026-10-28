import type { Country } from '@/content/team';
import { cn } from '@/lib/utils';

/** A stylized maple leaf in a 12 × 12 box. */
const LEAF =
  '6,1 6.9,2.6 8.2,2 7.7,4.8 9.6,3.6 10.1,4.6 11.2,4.3 10.6,6 11.4,6.6 8.6,8.6 8.9,9.6 6.3,9.2 6.3,11.2 5.7,11.2 5.7,9.2 3.1,9.6 3.4,8.6 0.6,6.6 1.4,6 0.8,4.3 1.9,4.6 2.4,3.6 4.3,4.8 3.8,2 5.1,2.6';

const STRIPE = 10 / 7;

/** Seven stripes and a canton of waffle cells where the stars would be. */
function UnitedStates() {
  return (
    <>
      {Array.from({ length: 7 }, (_, i) => (
        <rect
          key={i}
          y={i * STRIPE}
          width={19}
          height={STRIPE}
          className={i % 2 === 0 ? 'fill-brand' : 'fill-off'}
        />
      ))}
      <rect width={8} height={4 * STRIPE} className="fill-background" />
      {Array.from({ length: 12 }, (_, i) => (
        <rect
          key={i}
          x={0.8 + (i % 4) * 1.8}
          y={0.75 + Math.floor(i / 4) * 1.6}
          width={1}
          height={1}
          className="fill-foreground"
        />
      ))}
    </>
  );
}

/** Two bars and the maple leaf on the centre band. */
function Canada() {
  return (
    <>
      <rect width={20} height={10} className="fill-foreground" />
      <rect width={5} height={10} className="fill-brand" />
      <rect x={15} width={5} height={10} className="fill-brand" />
      <polygon
        points={LEAF}
        transform="translate(5.8 0.8) scale(0.7)"
        className="fill-brand"
      />
    </>
  );
}

/**
 * Where someone is based, as a small flag in the brand palette: gold, roast
 * and cream instead of red, white and blue. One accessible name (the
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
      viewBox={country === 'us' ? '0 0 19 10' : '0 0 20 10'}
      className={cn(
        'inline-block h-3.5 w-auto shrink-0 overflow-hidden rounded-[2px] ring-1 ring-foreground/20',
        className,
      )}
    >
      <title>{label}</title>
      {country === 'us' ? <UnitedStates /> : <Canada />}
    </svg>
  );
}
