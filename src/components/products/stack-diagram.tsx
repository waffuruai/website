import { LocalizedLink } from '@/components/localized-link';
import { ProductMotif } from '@/components/products/product-motif';
import { ProductSection } from '@/components/products/product-section';
import { MonoLabel } from '@/components/sections/mono-label';
import { SectionHeading } from '@/components/sections/section-heading';
import type { ProductSummary } from '@/content/pages/products';
import type { ProductsOverviewCopy } from '@/content/pages/products/types';

/** Floor tiles under the stack, rippling like the home page's grid. */
const FLOOR_TILES = 16;

/** The short line and gold dot that tie a slab to the drip on its left. */
function Connector() {
  return (
    <>
      <span
        aria-hidden
        className="bg-foreground/12 absolute top-1/2 -left-11 hidden h-px w-11 md:block"
      />
      <span
        aria-hidden
        className="bg-brand absolute top-1/2 -left-12 hidden size-2 -translate-y-1/2 rounded-full md:block"
      />
    </>
  );
}

function Layer({
  product,
  privateLabel,
}: {
  product: ProductSummary;
  privateLabel: string;
}) {
  return (
    <li className="relative">
      <Connector />
      <article className="group border-foreground/12 bg-card hover:border-foreground/30 has-focus-visible:outline-ring relative grid gap-6 rounded-2xl border p-6 transition-colors has-focus-visible:outline-2 has-focus-visible:outline-offset-4 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:items-center md:gap-10 md:p-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)_240px]">
        <div className="flex flex-col gap-3">
          <MonoLabel>
            {product.index} · {product.layer}
          </MonoLabel>
          <h3 className="group-hover:text-brand-ink font-serif text-[clamp(56px,7vw,76px)] leading-[0.9] tracking-[-0.02em] transition-colors">
            <LocalizedLink
              href={product.path}
              className="after:absolute after:inset-0 after:content-[''] hover:text-inherit focus-visible:outline-none"
            >
              {product.name}
            </LocalizedLink>
          </h3>
        </div>
        <div className="flex flex-col gap-3">
          <p className="text-foreground text-2xl leading-[1.3] text-balance">
            {product.tagline}
          </p>
          <p className="text-muted-foreground text-[17px] leading-[1.6] text-pretty">
            {product.summary}
          </p>
        </div>
        <div className="hidden items-center gap-7 sm:flex md:hidden lg:flex lg:justify-end">
          <ProductMotif slug={product.slug} size="sm" />
          <span className="label-mono text-muted-foreground border-foreground/16 hidden rounded-full border px-3 py-2 lg:inline-flex">
            {privateLabel}
          </span>
        </div>
      </article>
    </li>
  );
}

/**
 * The four layers as slabs, Syrup (04) on top down to Iron (01) at the metal,
 * with a drop running down a spine through all of them. Each slab links to
 * its product page. Below sit the backends they all end up on.
 */
export function StackDiagram({
  layers,
  products,
  privateLabel,
}: {
  layers: ProductsOverviewCopy['layers'];
  /** Top of the stack first. */
  products: ProductSummary[];
  /** Dictionary `common.private`. */
  privateLabel: string;
}) {
  return (
    <ProductSection id="layers">
      <SectionHeading id="layers" title={layers.heading} intro={layers.intro} />
      <div className="relative mt-12 md:mt-16 md:pl-14">
        <div
          aria-hidden
          className="absolute inset-y-0 left-0 hidden w-6 md:block"
        >
          <div className="wf-drip" />
          <div className="wf-drop" />
        </div>
        <ol aria-label={layers.listLabel} className="flex flex-col gap-4">
          {products.map((product) => (
            <Layer
              key={product.slug}
              product={product}
              privateLabel={privateLabel}
            />
          ))}
        </ol>
        <div className="relative mt-4">
          <Connector />
          <div className="border-foreground/20 flex flex-col gap-6 overflow-hidden rounded-2xl border border-dashed px-6 py-6 md:px-8">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              <MonoLabel dot>{layers.metal.label}</MonoLabel>
              <ul className="flex flex-wrap gap-2.5">
                {layers.metal.backends.map((backend) => (
                  <li
                    key={backend}
                    className="border-foreground/16 text-foreground rounded-full border px-4 py-2 text-sm"
                  >
                    {backend}
                  </li>
                ))}
              </ul>
            </div>
            <div
              aria-hidden
              className="grid gap-1"
              style={{
                gridTemplateColumns: `repeat(${FLOOR_TILES}, minmax(0, 1fr))`,
              }}
            >
              {Array.from({ length: FLOOR_TILES }, (_, i) => (
                <div
                  key={i}
                  className="wf-cell h-4"
                  data-hot={i % 5 === 2 ? '' : undefined}
                  style={{ animationDelay: `${(i * 0.18).toFixed(2)}s` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </ProductSection>
  );
}
