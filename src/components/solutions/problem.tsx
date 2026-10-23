import { Accent } from '@/components/sections/accent';
import { MonoLabel } from '@/components/sections/mono-label';

/**
 * "The problem": the buyer's concrete pain. A serif H2 on the left, the
 * statement (24px) and the supporting paragraph on the right, under a
 * hairline that separates it from the hero.
 */
export function Problem({
  id,
  label,
  title,
  statement,
  body,
}: {
  id: string;
  label: string;
  title: string;
  statement: string;
  body: string;
}) {
  return (
    <section aria-labelledby={id} className="mx-auto max-w-site px-site">
      <div className="grid gap-10 border-t border-foreground/12 pt-[72px] md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] md:gap-16 md:pt-[120px]">
        <div className="flex flex-col gap-6">
          <MonoLabel>{label}</MonoLabel>
          <h2 id={id} className="heading-section">
            <Accent text={title} />
          </h2>
        </div>
        <div className="flex flex-col gap-5 md:pt-12">
          <p className="text-2xl leading-[1.3] text-balance text-foreground">
            {statement}
          </p>
          <p className="max-w-[60ch] text-[17px] leading-[1.6] text-pretty text-muted-foreground">
            {body}
          </p>
        </div>
      </div>
    </section>
  );
}
