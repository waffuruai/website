import { LocalizedLink } from '@/components/localized-link';
import { cn } from '@/lib/utils';

export type BreadcrumbItem = { label: string; href: string };

/**
 * Visible breadcrumb trail (mono caps). The BreadcrumbList JSON-LD repeats
 * exactly these items, so structured data never claims more than the page
 * shows. The last item is the current page.
 */
export function Breadcrumb({
  label,
  items,
  className,
}: {
  /** Accessible name of the landmark ("Breadcrumb"). */
  label: string;
  items: BreadcrumbItem[];
  className?: string;
}) {
  return (
    <nav
      aria-label={label}
      className={cn('mx-auto max-w-site px-site pt-4 md:pt-6', className)}
    >
      <ol className="flex flex-wrap items-center gap-x-3 label-mono text-muted-foreground">
        {items.map((item, index) => {
          const current = index === items.length - 1;
          return (
            <li key={item.href} className="flex items-center gap-3">
              {current ? (
                <span
                  aria-current="page"
                  className="inline-flex min-h-11 items-center text-soft"
                >
                  {item.label}
                </span>
              ) : (
                <LocalizedLink
                  href={item.href}
                  className="inline-flex min-h-11 min-w-11 items-center rounded-sm transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  {item.label}
                </LocalizedLink>
              )}
              {!current && (
                <span aria-hidden className="text-faint">
                  /
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
