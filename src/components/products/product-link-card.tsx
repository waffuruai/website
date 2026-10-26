import { LocalizedLink } from '@/components/localized-link';
import { ProductMotif } from '@/components/products/product-motif';
import { MonoLabel } from '@/components/sections/mono-label';
import type { ProductSummary } from '@/content/pages/products';

/**
 * A product as a raised card that links to its page. The product name is the
 * link; a pseudo-element stretches it over the whole card, so the card is
 * one big tap target and a screen reader hears a single link.
 */
export function ProductLinkCard({
  product,
  learnMoreLabel,
}: {
  product: ProductSummary;
  learnMoreLabel: string;
}) {
  return (
    <article className="group relative flex h-full flex-col gap-5 rounded-2xl border border-foreground/10 bg-card p-6 transition-colors hover:border-foreground/30 has-focus-visible:outline-2 has-focus-visible:outline-offset-4 has-focus-visible:outline-ring md:p-8">
      {/*
       * Fixed-height header with the motif out of flow, so every card's name
       * starts at the same height whatever its motif's size (the tallest,
       * Syrup's drip, renders 90px at scale-75).
       */}
      <div className="relative h-24">
        <MonoLabel>
          {product.index} · {product.layer}
        </MonoLabel>
        <div className="pointer-events-none absolute top-0 right-0 origin-top-right scale-75">
          <ProductMotif slug={product.slug} size="sm" />
        </div>
      </div>
      <h3 className="font-serif text-[56px] leading-[0.9] tracking-[-0.02em] transition-colors group-hover:text-brand-ink">
        <LocalizedLink
          href={product.path}
          className="after:absolute after:inset-0 after:content-[''] hover:text-inherit focus-visible:outline-none"
        >
          {product.name}
        </LocalizedLink>
      </h3>
      <p className="text-lg leading-[1.35] text-balance text-foreground">
        {product.tagline}
      </p>
      <p className="text-[15px] leading-[1.6] text-muted-foreground">
        {product.summary}
      </p>
      <span
        aria-hidden
        className="mt-auto pt-2 label-mono text-soft transition-colors group-hover:text-foreground"
      >
        {learnMoreLabel} →
      </span>
    </article>
  );
}
