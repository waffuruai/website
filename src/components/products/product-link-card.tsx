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
    <article className="group border-foreground/10 bg-card hover:border-foreground/30 has-focus-visible:outline-ring relative flex h-full flex-col gap-5 rounded-2xl border p-6 transition-colors has-focus-visible:outline-2 has-focus-visible:outline-offset-4 md:p-8">
      <div className="flex items-start justify-between gap-4">
        <MonoLabel>
          {product.index} · {product.layer}
        </MonoLabel>
        <div className="origin-top-right scale-75">
          <ProductMotif slug={product.slug} size="sm" />
        </div>
      </div>
      <h3 className="group-hover:text-brand-ink font-serif text-[56px] leading-[0.9] tracking-[-0.02em] transition-colors">
        <LocalizedLink
          href={product.path}
          className="after:absolute after:inset-0 after:content-[''] hover:text-inherit focus-visible:outline-none"
        >
          {product.name}
        </LocalizedLink>
      </h3>
      <p className="text-foreground text-lg leading-[1.35] text-balance">
        {product.tagline}
      </p>
      <p className="text-muted-foreground text-[15px] leading-[1.6]">
        {product.summary}
      </p>
      <span
        aria-hidden
        className="label-mono text-soft group-hover:text-foreground mt-auto pt-2 transition-colors"
      >
        {learnMoreLabel} →
      </span>
    </article>
  );
}
