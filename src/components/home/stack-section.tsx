import { SectionHeading } from '@/components/sections/section-heading';
import { StackFlow } from '@/components/stack/stack-flow';
import type { HomeContent } from '@/content/pages/home';

/**
 * "From silicon to answer.": the stack as the path a request takes, with
 * where we are today under it. The detail lives on the product pages.
 */
export function StackSection({ content }: { content: HomeContent['stack'] }) {
  return (
    <section
      id="stack"
      aria-labelledby="stack-title"
      className="relative z-[6] mx-auto max-w-site px-site py-20 md:py-30"
    >
      <SectionHeading
        id="stack-title"
        title={content.title}
        intro={content.intro}
      />
      <StackFlow copy={content.flow} className="mt-12 md:mt-16" />
      <p className="mt-6 max-w-[720px] text-sm text-muted-foreground">
        {content.note}
      </p>
    </section>
  );
}
