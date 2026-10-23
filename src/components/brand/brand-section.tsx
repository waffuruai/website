import { SectionHeading } from '@/components/sections/section-heading';

/**
 * A press-kit section: the shared container, vertical rhythm and
 * After Hours section heading. `id` doubles as the anchor and, with
 * `-title`, the id of the heading that labels the region.
 */
export function BrandSection({
  id,
  title,
  intro,
  children,
}: {
  id: string;
  title: string;
  intro?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="mx-auto max-w-site px-site py-[72px] md:py-[120px]"
    >
      <SectionHeading id={`${id}-title`} title={title} intro={intro} />
      <div className="mt-12 md:mt-16">{children}</div>
    </section>
  );
}
