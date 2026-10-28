import { Accent } from '@/components/sections/accent';
import { cn } from '@/lib/utils';

/**
 * Section opener as on the After Hours page: a serif H2 on the left (accent
 * word allowed) and a short muted intro to its right. On large screens the
 * two sit in fixed columns, so a long, wrapping title never pushes the intro
 * underneath; on narrow screens the intro follows the title.
 */
export function SectionHeading({
  title,
  intro,
  id,
  className,
  children,
}: {
  title: string;
  intro?: string;
  id?: string;
  className?: string;
  /** Extra content under the intro (a legend, a link). */
  children?: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        'flex flex-col gap-6',
        (intro || children) &&
          'lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,400px)] lg:items-end lg:gap-x-16',
        className,
      )}
    >
      <h2 id={id} className="max-w-[900px] heading-section">
        <Accent text={title} />
      </h2>
      {(intro || children) && (
        <div className="flex max-w-[400px] flex-col gap-4">
          {intro && (
            <p className="text-base leading-[1.6] text-muted-foreground">
              {intro}
            </p>
          )}
          {children}
        </div>
      )}
    </div>
  );
}
