import type { ProductSlug } from '@/content/pages/products/types';
import { cn } from '@/lib/utils';

/*
 * The four After Hours motifs, one per product, built from the classes in
 * motifs.css: stamps (Iron), a melting pat (Butter), LEDs (Syrup) and a
 * drip (Whisk). `sm` matches the stack rows on the home page; `lg` is the
 * larger version for a product page's hero. Decorative and CSS-only.
 */
export type MotifSize = 'sm' | 'lg';

type MotifProps = { size: MotifSize; className?: string };

/** Seconds between neighbouring items in a ripple. */
const RIPPLE = 0.12;

function IronMotif({ size, className }: MotifProps) {
  const side = size === 'lg' ? 6 : 4;
  return (
    <div
      className={cn(
        'grid',
        size === 'lg' ? 'w-[220px] gap-2' : 'w-24 gap-1.5',
        className,
      )}
      style={{ gridTemplateColumns: `repeat(${side}, minmax(0, 1fr))` }}
    >
      {Array.from({ length: side * side }, (_, i) => (
        <div
          key={i}
          className="wf-stamp"
          style={{
            animationDelay: `${(((i % side) + Math.floor(i / side)) * RIPPLE).toFixed(2)}s`,
          }}
        />
      ))}
    </div>
  );
}

/** Delays for the plate's tiles, with a couple of hot ones. */
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
        <div className="wf-pat" />
      </div>
    );
  }
  return (
    <div
      className={cn(
        'flex h-[200px] w-[240px] flex-col items-center justify-end gap-3',
        className,
      )}
    >
      <div className="wf-pat size-24" />
      <div className="grid w-full grid-cols-8 gap-1.5">
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

/** The home page's LED stagger: a prime-ish walk through the 4s cycle. */
const ledDelay = (i: number) => `${(((i * 14) % 23) * 0.17).toFixed(2)}s`;

function SyrupMotif({ size, className }: MotifProps) {
  if (size === 'sm') {
    return (
      <div className={cn('grid grid-cols-8 gap-2', className)}>
        {Array.from({ length: 32 }, (_, i) => (
          <div
            key={i}
            className="wf-led"
            style={{ animationDelay: ledDelay(i) }}
          />
        ))}
      </div>
    );
  }
  return (
    <div className={cn('flex w-[240px] flex-col gap-2', className)}>
      {Array.from({ length: 5 }, (_, unit) => (
        <div
          key={unit}
          className="flex items-center justify-between gap-6 rounded-lg border border-foreground/12 bg-background/50 px-4 py-3"
        >
          <span className="flex flex-col gap-1.5">
            <span className="block h-1.5 w-12 rounded-full bg-off" />
            <span className="block h-1.5 w-7 rounded-full bg-off" />
          </span>
          <span className="grid grid-cols-6 gap-2">
            {Array.from({ length: 6 }, (_, led) => (
              <span
                key={led}
                className="wf-led"
                style={{ animationDelay: ledDelay(unit * 6 + led) }}
              />
            ))}
          </span>
        </div>
      ))}
    </div>
  );
}

function WhiskMotif({ size, className }: MotifProps) {
  if (size === 'sm') {
    return (
      <div className={cn('relative h-[120px] w-6', className)}>
        <div className="wf-drip" />
        <div className="wf-drop" />
      </div>
    );
  }
  return (
    <div className={cn('relative h-[220px] w-[240px]', className)}>
      <div className="wf-drip" />
      {/* Notes the drop runs past, alternating sides of the line. */}
      <span className="absolute top-[24%] left-1/2 ml-4 h-1.5 w-20 rounded-full bg-off" />
      <span className="absolute top-[50%] right-1/2 mr-4 h-1.5 w-24 rounded-full bg-off" />
      <span className="absolute top-[74%] left-1/2 ml-4 h-1.5 w-14 rounded-full bg-off" />
      <div className="wf-drop" />
    </div>
  );
}

const MOTIFS: Record<ProductSlug, (props: MotifProps) => React.ReactElement> = {
  iron: IronMotif,
  butter: ButterMotif,
  syrup: SyrupMotif,
  whisk: WhiskMotif,
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
