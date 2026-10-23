import { MonoLabel } from '@/components/sections/mono-label';
import { SectionOpener } from '@/components/solutions/section-opener';
import type { SolutionTag, UseCase } from '@/content/pages/solutions/types';

/**
 * Use cases as raised cards: a mono value-prop tag (cost, inference or
 * control), the job to be done as the title and two sentences under it.
 * An odd last card spans both columns so the grid never leaves a hole.
 */
export function UseCases({
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
  items: UseCase[];
  tags: Record<SolutionTag, string>;
}) {
  return (
    <section
      aria-labelledby={id}
      className="max-w-site px-site mx-auto pt-[72px] md:pt-[120px]"
    >
      <SectionOpener id={id} label={label} title={title} intro={intro} />
      <ul className="grid gap-5 md:grid-cols-2">
        {items.map((item, index) => (
          <li
            key={item.title}
            className="border-foreground/10 bg-card flex flex-col gap-5 rounded-2xl border p-6 md:p-8 md:[&:last-child:nth-child(odd)]:col-span-2"
          >
            <div className="flex items-center justify-between gap-4">
              <MonoLabel dot as="span">
                {tags[item.tag]}
              </MonoLabel>
              <span
                aria-hidden
                className="label-mono text-muted-foreground tabular-nums"
              >
                {String(index + 1).padStart(2, '0')}
              </span>
            </div>
            <h3 className="text-foreground max-w-[34ch] text-[24px] leading-[1.25] text-balance md:text-[26px]">
              {item.title}
            </h3>
            <p className="text-muted-foreground max-w-[60ch] text-base leading-[1.6] text-pretty">
              {item.body}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
