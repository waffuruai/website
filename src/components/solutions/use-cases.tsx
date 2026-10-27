import { LocalizedLink } from '@/components/localized-link';
import { MonoLabel } from '@/components/sections/mono-label';
import { SectionOpener } from '@/components/solutions/section-opener';
import type { SolutionTag, UseCase } from '@/content/pages/solutions/types';
import { isPublishedPath } from '@/lib/launch';

/**
 * Use cases as raised cards: a mono value-prop tag (cost, inference or
 * control), the job to be done as the title and two sentences under it,
 * plus an optional link onward once its page is published. An odd last
 * card spans both columns so the grid never leaves a hole.
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
      className="mx-auto max-w-site px-site pt-[72px] md:pt-[120px]"
    >
      <SectionOpener id={id} label={label} title={title} intro={intro} />
      <ul className="grid gap-5 md:grid-cols-2">
        {items.map((item, index) => (
          <li
            key={item.title}
            className="flex flex-col gap-5 rounded-2xl border border-foreground/10 bg-card p-6 md:p-8 md:[&:last-child:nth-child(odd)]:col-span-2"
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
            <h3 className="max-w-[34ch] text-[24px] leading-[1.25] text-balance text-foreground md:text-[26px]">
              {item.title}
            </h3>
            <p className="max-w-[60ch] text-base leading-[1.6] text-pretty text-muted-foreground">
              {item.body}
            </p>
            {item.link && isPublishedPath(item.link.href) && (
              <LocalizedLink
                href={item.link.href}
                className="mt-auto -mb-2 inline-flex min-h-11 items-center gap-2 self-start rounded-sm label-mono text-foreground underline decoration-foreground/35 underline-offset-[6px] transition-colors hover:text-brand-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                {item.link.label}
                <span aria-hidden>→</span>
              </LocalizedLink>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
