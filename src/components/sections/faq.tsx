import { JsonLd } from '@/components/seo/json-ld';
import type { FaqItem } from '@/content/types';
import { faqPage } from '@/lib/json-ld';
import { cn } from '@/lib/utils';

/**
 * Questions and answers as native `<details>`: no JavaScript, every answer is
 * in the HTML for crawlers and agents, and the FAQPage JSON-LD repeats only
 * what is visibly on the page.
 */
export function Faq({
  heading,
  items,
  className,
}: {
  heading: string;
  items: FaqItem[];
  className?: string;
}) {
  if (!items.length) return null;
  return (
    <section
      className={cn('max-w-site px-site mx-auto py-16 md:py-24', className)}
    >
      <div className="grid gap-10 md:grid-cols-[1fr_2fr]">
        <h2 className="heading-section text-[clamp(36px,4.5vw,64px)]">
          {heading}
        </h2>
        <div className="border-foreground/12 border-t">
          {items.map((item) => (
            <details
              key={item.question}
              className="group border-foreground/12 border-b [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="text-foreground flex min-h-14 cursor-pointer list-none items-center justify-between gap-6 py-5 text-lg">
                {item.question}
                <span
                  aria-hidden
                  className="text-muted-foreground font-mono transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="text-soft max-w-[680px] pb-6 text-base leading-[1.6]">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
      <JsonLd data={faqPage(items)} />
    </section>
  );
}
