import { ProductSection } from '@/components/products/product-section';
import { MonoLabel } from '@/components/sections/mono-label';
import { SectionHeading } from '@/components/sections/section-heading';
import type {
  ProductCopy,
  ProductsShared,
} from '@/content/pages/products/types';

/**
 * Problem to outcome, with the reader as the protagonist: what stood in the
 * way on the left, what they can do now on the right.
 */
export function ProductStory({
  story,
  shared,
}: {
  story: ProductCopy['story'];
  shared: Pick<ProductsShared, 'storyProblemLabel' | 'storyOutcomeLabel'>;
}) {
  return (
    <ProductSection id="story">
      <SectionHeading id="story" title={story.heading} />
      <div className="mt-12 grid gap-10 md:mt-16 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-14">
        <div className="flex flex-col gap-5 border-t border-foreground/12 pt-8">
          <MonoLabel>{shared.storyProblemLabel}</MonoLabel>
          <p className="text-xl leading-[1.45] text-pretty text-soft md:text-[22px]">
            {story.problem}
          </p>
        </div>
        <div className="flex flex-col gap-6 rounded-2xl border border-foreground/12 bg-card p-6 md:p-10">
          <MonoLabel dot>{shared.storyOutcomeLabel}</MonoLabel>
          <p className="text-xl leading-[1.4] text-pretty text-foreground md:text-2xl">
            {story.outcome}
          </p>
          <ul className="flex flex-col border-t border-foreground/10">
            {story.outcomes.map((item) => (
              <li
                key={item}
                className="flex gap-4 border-b border-foreground/10 py-4 text-base leading-[1.55] text-muted-foreground last:border-b-0"
              >
                <span aria-hidden className="font-mono text-brand-ink">
                  →
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </ProductSection>
  );
}
