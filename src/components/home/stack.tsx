import { LocalizedLink } from '@/components/localized-link';
import { SectionHeading } from '@/components/sections/section-heading';
import type { HomeContent, StackProduct } from '@/content/pages/home';

import { DripMotif, LedMotif, PatMotif, StampMotif } from './stack-motifs';

const MOTIFS: Record<StackProduct['slug'], () => React.JSX.Element> = {
  syrup: DripMotif,
  waffle: LedMotif,
  butter: PatMotif,
  iron: StampMotif,
};

function StackRow({
  product,
  privateLabel,
}: {
  product: StackProduct;
  privateLabel: string;
}) {
  const Motif = MOTIFS[product.slug];

  return (
    <li className="group relative grid grid-cols-[repeat(auto-fit,minmax(min(280px,100%),1fr))] items-center gap-10 border-t border-foreground/12 py-12 last:border-b max-[720px]:gap-4 max-[720px]:py-9">
      <div className="flex flex-col gap-3.5">
        <span className="label-mono text-muted-foreground">
          {product.index} · {product.kicker}
        </span>
        {/*
         * The name is the row's one link; its ::after stretches over the whole
         * row so the row is clickable and screen readers hear a single link.
         */}
        <h3 className="font-serif text-[76px] leading-[0.9] tracking-[-0.02em] transition-colors duration-[400ms] group-focus-within:text-brand-ink group-hover:text-brand-ink max-[720px]:text-[56px]">
          <LocalizedLink
            href={`/products/${product.slug}`}
            className="after:absolute after:inset-0 focus-visible:outline-hidden focus-visible:after:outline-2 focus-visible:after:outline-offset-4 focus-visible:after:outline-ring"
          >
            {product.name}
          </LocalizedLink>
        </h3>
      </div>

      <div className="flex flex-col gap-3.5">
        <p className="text-2xl leading-[1.3] text-balance text-foreground">
          {product.tagline}
        </p>
        <p className="text-[17px] leading-[1.6] text-pretty text-muted-foreground">
          {product.body}
        </p>
      </div>

      <div className="pointer-events-none flex items-center justify-end gap-7 max-[720px]:absolute max-[720px]:top-10 max-[720px]:right-0 max-[720px]:origin-top-right max-[720px]:scale-70">
        <Motif />
        <span className="rounded-full border border-foreground/16 px-3 py-2 label-mono text-muted-foreground max-[720px]:hidden">
          {privateLabel}
        </span>
      </div>
    </li>
  );
}

/**
 * "The stack.": the four products from the top (Syrup, 04) down to the metal
 * (Iron, 01), each row a link to its product page with its CSS motif beside it.
 */
export function Stack({
  content,
  privateLabel,
}: {
  content: HomeContent['stack'];
  /** The "Private" chip, from the dictionary (`common.private`). */
  privateLabel: string;
}) {
  return (
    <section
      id="stack"
      className="relative z-[6] mx-auto max-w-site px-site pt-40 pb-20 max-[720px]:pt-22 max-[720px]:pb-8"
    >
      <SectionHeading
        title={content.title}
        intro={content.intro}
        className="mb-16"
      />
      <ul>
        {content.products.map((product) => (
          <StackRow
            key={product.slug}
            product={product}
            privateLabel={privateLabel}
          />
        ))}
      </ul>
    </section>
  );
}
