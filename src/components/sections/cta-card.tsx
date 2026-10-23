import { Accent } from '@/components/sections/accent';
import { PillLink } from '@/components/sections/pill-link';
import { TileDeco } from '@/components/sections/tile-deco';
import type { Cta } from '@/content/types';
import { cn } from '@/lib/utils';

/**
 * The After Hours closing card ("Pull up a seat."): raised surface, serif
 * title, copy, actions on the right and the tile square peeking from the
 * corner. Every page ends with one.
 */
export function CtaCard({
  title,
  body,
  actions,
  id,
  className,
  children,
}: {
  /** Use `*word*` for the gold italic accent. */
  title: string;
  body?: string;
  actions: Cta[];
  id?: string;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn('max-w-site px-site mx-auto py-12 md:py-20', className)}
    >
      <div className="border-foreground/12 bg-card relative flex flex-col justify-between gap-8 overflow-hidden rounded-3xl border px-6 py-10 md:flex-row md:items-end md:gap-12 md:px-14 md:py-20">
        <TileDeco className="pointer-events-none absolute -top-[70px] -right-[70px] w-[220px] rotate-12 opacity-20 md:-top-20 md:-right-20 md:w-[420px] md:opacity-50" />
        <div className="relative flex max-w-[640px] flex-col gap-5">
          <h2 className="heading-section text-[clamp(48px,6vw,92px)] leading-[0.92]">
            <Accent text={title} />
          </h2>
          {body && <p className="text-soft text-lg leading-[1.6]">{body}</p>}
          {children}
        </div>
        <div className="relative flex flex-col gap-3 sm:flex-row md:flex-col md:items-stretch">
          {actions.map((action, index) => (
            <PillLink
              key={action.href}
              href={action.href}
              variant={
                action.variant === 'outline' || index > 0
                  ? 'outline'
                  : 'primary'
              }
            >
              {action.label}
            </PillLink>
          ))}
        </div>
      </div>
    </section>
  );
}
