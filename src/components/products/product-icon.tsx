import type { ProductIconName } from '@/content/types';
import { cn } from '@/lib/utils';

/*
 * One line icon per product, drawn on a 24 × 24 grid in the brand style: a
 * 1.5 px stroke in the current colour and a single gold accent that says
 * what the product does.
 */

const ACCENT = 'fill-brand stroke-none';
const ACCENT_LINE = 'stroke-brand';

const ICONS: Record<ProductIconName, React.ReactNode> = {
  // Pantry: a jar off the shelf, checked.
  pantry: (
    <>
      <rect x="5.5" y="7.5" width="13" height="13.5" rx="3" />
      <rect x="7" y="3" width="10" height="4.5" rx="1.2" />
      <path d="m9 14.2 2.1 2.1 4-4.3" className={ACCENT_LINE} />
    </>
  ),
  // Waffle: the harness grid, with W glowing in the middle cell.
  waffle: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4" />
      <path d="M9.2 3.5v17M14.8 3.5v17M3.5 9.2h17M3.5 14.8h17" />
      <rect
        x="9.9"
        y="9.9"
        width="4.2"
        height="4.2"
        rx="0.8"
        className={ACCENT}
      />
    </>
  ),
  // Whisk: wires that mix context in, on a gold handle.
  whisk: (
    <>
      <path d="M12 14.5C6.2 10.8 6.6 2.5 12 2.5s5.8 8.3 0 12Z" />
      <path d="M12 14.5c-2.6-3.3-2.4-9.4 0-12 2.4 2.6 2.6 8.7 0 12Z" />
      <path d="M12 14.5v7" className={ACCENT_LINE} strokeWidth="2.25" />
    </>
  ),
  // Syrup: the bottle that holds the stack together, filled in gold.
  syrup: (
    <>
      <path d="M10 2.5h4v3h-4z" />
      <path d="M8 9c0-2.2 1.8-3.5 4-3.5s4 1.3 4 3.5v10a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2Z" />
      <path
        d="M8.75 13.5h6.5v5.5a1.25 1.25 0 0 1-1.25 1.25h-4a1.25 1.25 0 0 1-1.25-1.25Z"
        className={ACCENT}
      />
    </>
  ),
  // Butter: a pat, its top face catching the light.
  butter: (
    <>
      <path d="M3.5 10.5 12 6l8.5 4.5L12 15Z" className="fill-brand/80" />
      <path d="M3.5 10.5V15l8.5 4.5L20.5 15v-4.5" />
      <path d="M12 15v4.5" />
    </>
  ),
  // Iron: a chip, with kernels pressed into it.
  iron: (
    <>
      <rect x="6" y="6" width="12" height="12" rx="2" />
      <path d="M9.5 3v3M14.5 3v3M9.5 18v3M14.5 18v3M3 9.5h3M3 14.5h3M18 9.5h3M18 14.5h3" />
      <rect x="9" y="9" width="2.5" height="2.5" rx="0.4" className={ACCENT} />
      <rect
        x="12.5"
        y="9"
        width="2.5"
        height="2.5"
        rx="0.4"
        className={ACCENT}
      />
      <rect
        x="9"
        y="12.5"
        width="2.5"
        height="2.5"
        rx="0.4"
        className={ACCENT}
      />
      <rect
        x="12.5"
        y="12.5"
        width="2.5"
        height="2.5"
        rx="0.4"
        className={ACCENT}
      />
    </>
  ),
};

/** A product's icon. Decorative: the product name always sits beside it. */
export function ProductIcon({
  name,
  className,
}: {
  name: ProductIconName;
  className?: string;
}) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn('size-6 shrink-0', className)}
    >
      {ICONS[name]}
    </svg>
  );
}

export const productIconNames = Object.keys(ICONS) as ProductIconName[];
