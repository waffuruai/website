import {
  ButterMelt,
  IronPress,
  SyrupDrips,
  WhiskSpin,
} from '@/components/sections/motifs';
import type { ProductSlug } from '@/content/pages/products/types';
import { cn } from '@/lib/utils';

/*
 * One motif per product: a press (Iron), a melting pat (Butter), drips
 * (Syrup), a whisk (Whisk) and waffle tiles with W lit in the middle
 * (Waffle). `sm` matches the stack rows and cards; `lg` is the larger version
 * for a product page's hero. Decorative and CSS-only.
 */
export type MotifSize = 'sm' | 'lg';

type MotifProps = { size: MotifSize; className?: string };

/** Seconds between neighbouring items in a ripple. */
const RIPPLE = 0.12;

/** Butter's plate under the pat, with a couple of hot tiles. */
const PLATE_HOT = new Set([2, 5, 9, 12]);

function ButterMotif({ size, className }: MotifProps) {
  if (size === 'sm') {
    return (
      <div
        className={cn(
          'flex h-[72px] w-[120px] items-end justify-center',
          className,
        )}
      >
        <ButterMelt size="sm" />
      </div>
    );
  }
  return (
    <div
      className={cn(
        'flex h-[200px] w-[252px] flex-col items-center justify-end',
        className,
      )}
    >
      <ButterMelt size="lg" />
      <div className="grid w-[240px] grid-cols-8 gap-1.5">
        {Array.from({ length: 16 }, (_, i) => (
          <div
            key={i}
            className="wf-cell aspect-[3/2]"
            data-hot={PLATE_HOT.has(i) ? '' : undefined}
            style={{
              animationDelay: `${(((i % 8) + Math.floor(i / 8)) * 0.25).toFixed(2)}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

function WaffleMotif({ size, className }: MotifProps) {
  const side = size === 'lg' ? 5 : 3;
  const centre = Math.floor((side * side) / 2);
  return (
    <div
      className={cn(
        'grid',
        size === 'lg' ? 'w-[200px] gap-2' : 'w-20 gap-1.5',
        className,
      )}
      style={{ gridTemplateColumns: `repeat(${side}, minmax(0, 1fr))` }}
    >
      {Array.from({ length: side * side }, (_, i) => (
        <div
          key={i}
          className="wf-cell aspect-square rounded-[4px]"
          data-hot={i === centre ? '' : undefined}
          style={{
            animationDelay: `${(((i % side) + Math.floor(i / side)) * RIPPLE).toFixed(2)}s`,
          }}
        />
      ))}
    </div>
  );
}

const MOTIFS: Record<ProductSlug, (props: MotifProps) => React.ReactElement> = {
  iron: IronPress,
  butter: ButterMotif,
  syrup: SyrupDrips,
  whisk: WhiskSpin,
  waffle: WaffleMotif,
};

/** The motif for a product. Always `aria-hidden`: it carries no information. */
export function ProductMotif({
  slug,
  size = 'lg',
  className,
}: {
  slug: ProductSlug;
  size?: MotifSize;
  className?: string;
}) {
  const Motif = MOTIFS[slug];
  return (
    <div aria-hidden className="pointer-events-none flex">
      <Motif size={size} className={className} />
    </div>
  );
}
