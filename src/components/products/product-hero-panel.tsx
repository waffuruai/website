import type { Highlight } from '@/content/pages/products/types';

/**
 * Sits under a product's hero text: the product's motif on the left, with a
 * status chip ("Private · early access", or Pantry's "Free · open source"),
 * and its headline facts on the right as a definition list (a short serif
 * value over a plain-language label).
 */
export function ProductHeroPanel({
  motif,
  highlights,
  statusLabel,
}: {
  /** The product's motif at its large size, decorative. */
  motif: React.ReactNode;
  highlights: Highlight[];
  statusLabel: string;
}) {
  return (
    <div className="mt-4 grid overflow-hidden rounded-3xl border border-foreground/12 bg-card md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
      <div className="relative flex min-h-[280px] items-center justify-center border-b border-foreground/10 px-6 pt-16 pb-10 md:border-r md:border-b-0 md:py-14">
        <span className="absolute top-5 left-5 rounded-full border border-foreground/16 px-3 py-2 label-mono text-muted-foreground">
          {statusLabel}
        </span>
        {motif}
      </div>
      <dl className="flex flex-col justify-center">
        {highlights.map((item) => (
          <div
            key={item.value}
            className="flex flex-col gap-2 border-b border-foreground/10 px-6 py-6 last:border-b-0 md:flex-row md:items-center md:gap-10 md:px-10 md:py-8"
          >
            <dd className="order-1 font-serif text-[clamp(34px,3.8vw,54px)] leading-none tracking-[-0.01em] md:min-w-[220px]">
              {item.value}
            </dd>
            <dt className="order-2 max-w-[360px] text-[15px] leading-[1.45] text-soft">
              {item.label}
            </dt>
          </div>
        ))}
      </dl>
    </div>
  );
}
