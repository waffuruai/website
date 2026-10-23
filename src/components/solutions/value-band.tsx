import { Accent } from '@/components/sections/accent';
import { MonoLabel } from '@/components/sections/mono-label';
import { SectionOpener } from '@/components/solutions/section-opener';
import type { SolutionTag, ValueProp } from '@/content/pages/solutions/types';

/**
 * The shared value props (cost, inference, control) as one raised band of
 * three columns separated by hairlines; stacked on phones.
 */
export function ValueBand({
  id,
  label,
  title,
  intro,
  items,
  tags,
}: {
  id: string;
  label: string;
  title: string;
  intro: string;
  items: ValueProp[];
  tags: Record<SolutionTag, string>;
}) {
  return (
    <section
      aria-labelledby={id}
      className="mx-auto max-w-site px-site pt-[72px] md:pt-[120px]"
    >
      <SectionOpener id={id} label={label} title={title} intro={intro} />
      <ul className="grid divide-y divide-foreground/10 overflow-hidden rounded-2xl border border-foreground/10 bg-card md:grid-cols-3 md:divide-x md:divide-y-0">
        {items.map((item) => (
          <li key={item.tag} className="flex flex-col gap-5 p-6 md:p-8">
            <MonoLabel dot as="span">
              {tags[item.tag]}
            </MonoLabel>
            <h3 className="font-serif text-[clamp(32px,3vw,40px)] leading-[1] tracking-[-0.02em]">
              <Accent text={item.title} />
            </h3>
            <p className="text-base leading-[1.6] text-pretty text-muted-foreground">
              {item.body}
            </p>
            <ul className="mt-auto flex flex-col gap-3 border-t border-foreground/10 pt-5">
              {item.points.map((point) => (
                <li
                  key={point}
                  className="flex gap-3 text-[15px] leading-[1.5] text-soft"
                >
                  <span
                    aria-hidden
                    className="mt-[0.55em] size-1.5 shrink-0 rounded-full bg-brand"
                  />
                  {point}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  );
}
