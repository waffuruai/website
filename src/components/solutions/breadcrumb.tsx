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
      className={cn('max-w-site px-site mx-auto pt-4 md:pt-6', className)}
    >
      <ol className="label-mono text-muted-foreground flex flex-wrap items-center gap-x-3">
        {items.map((item, index) => {
          const current = index === items.length - 1;
          return (
            <li key={item.href} className="flex items-center gap-3">
              {current ? (
                <span
                  aria-current="page"
                  className="text-soft inline-flex min-h-11 items-center"
                >
                  {item.label}
                </span>
              ) : (
                <LocalizedLink
                  href={item.href}
                  className="hover:text-foreground focus-visible:outline-ring inline-flex min-h-11 items-center rounded-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
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
