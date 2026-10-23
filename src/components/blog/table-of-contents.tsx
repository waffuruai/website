import type { Heading } from '@/lib/headings';
import { cn } from '@/lib/utils';

/** A table of contents earns its space from this many `##` sections. */
export const MIN_TOC_HEADINGS = 3;

export const hasToc = (headings: readonly Heading[]) =>
  headings.length >= MIN_TOC_HEADINGS;

function Links({ headings }: { headings: readonly Heading[] }) {
  return (
    <ol className="flex flex-col gap-2.5 border-l border-foreground/10 text-sm leading-snug text-muted-foreground">
      {headings.map((heading) => (
        <li key={heading.id}>
          <a
            href={`#${heading.id}`}
            className="-ml-px block border-l border-transparent py-0.5 pl-4 transition-colors hover:border-current hover:text-foreground focus-visible:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          >
            {heading.text}
          </a>
        </li>
      ))}
    </ol>
  );
}

/**
 * "On this page" for posts with three or more `##` sections. The sidebar
 * variant is sticky beside the article on large screens; the inline variant
 * is a collapsed `<details>` above the text on small ones. Plain anchors, no
 * script. Renders nothing for shorter posts.
 */
export function TableOfContents({
  headings,
  title,
  variant,
  className,
}: {
  headings: readonly Heading[];
  /** The translated "On this page". */
  title: string;
  variant: 'sidebar' | 'inline';
  className?: string;
}) {
  if (!hasToc(headings)) return null;

  if (variant === 'inline') {
    return (
      <details
        className={cn(
          'group rounded-2xl border border-foreground/10 bg-card px-5 py-4 lg:hidden',
          className,
        )}
      >
        <summary className="flex list-none items-center justify-between gap-4 rounded-md label-mono text-soft outline-none focus-visible:ring-2 focus-visible:ring-ring [&::-webkit-details-marker]:hidden">
          {title}
          <span
            aria-hidden
            className="text-muted-foreground transition-transform group-open:rotate-45"
          >
            +
          </span>
        </summary>
        <nav aria-label={title} className="mt-4">
          <Links headings={headings} />
        </nav>
      </details>
    );
  }

  return (
    <nav
      aria-label={title}
      className={cn('hidden lg:sticky lg:top-28 lg:block', className)}
    >
      <p className="mb-4 label-mono text-soft">{title}</p>
      <Links headings={headings} />
    </nav>
  );
}
