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
      className="max-w-site px-site mx-auto pt-[72px] md:pt-[120px]"
    >
      <SectionOpener id={id} label={label} title={title} intro={intro} />
      <ul className="border-foreground/10 bg-card divide-foreground/10 grid divide-y overflow-hidden rounded-2xl border md:grid-cols-3 md:divide-x md:divide-y-0">
        {items.map((item) => (
          <li key={item.tag} className="flex flex-col gap-5 p-6 md:p-8">
            <MonoLabel dot as="span">
              {tags[item.tag]}
            </MonoLabel>
            <h3 className="font-serif text-[clamp(32px,3vw,40px)] leading-[1] tracking-[-0.02em]">
              <Accent text={item.title} />
            </h3>
            <p className="text-muted-foreground text-base leading-[1.6] text-pretty">
              {item.body}
            </p>
            <ul className="border-foreground/10 mt-auto flex flex-col gap-3 border-t pt-5">
              {item.points.map((point) => (
                <li
                  key={point}
                  className="text-soft flex gap-3 text-[15px] leading-[1.5]"
                >
                  <span
                    aria-hidden
                    className="bg-brand mt-[0.55em] size-1.5 shrink-0 rounded-full"
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
