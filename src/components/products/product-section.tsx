import { cn } from '@/lib/utils';

/**
 * A page section in the site container, named by its heading: give the
 * `SectionHeading` the same `id` so assistive tech announces the region.
 */
export function ProductSection({
  id,
  className,
  children,
}: {
  id: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      aria-labelledby={id}
      className={cn('max-w-site px-site mx-auto py-16 md:py-24', className)}
    >
      {children}
    </section>
  );
}
