import { LocalizedLink } from '@/components/localized-link';
import { categoryPath, type BlogCategory } from '@/lib/blog';
import { cn } from '@/lib/utils';

/**
 * Category filter as plain links to static pages (`/blog`,
 * `/blog/category/<slug>`); nothing reads a query string.
 */
export function CategoryFilter({
  categories,
  active,
  allLabel,
  label,
}: {
  categories: readonly BlogCategory[];
  active?: BlogCategory;
  /** The translated "All". */
  allLabel: string;
  /** Accessible name of the nav (the blog heading). */
  label: string;
}) {
  const items = [
    { name: allLabel, href: '/blog', current: !active },
    ...categories.map((category) => ({
      name: category,
      href: categoryPath(category),
      current: category === active,
    })),
  ];

  return (
    <nav aria-label={label}>
      <ul className="flex flex-wrap gap-2">
        {items.map((item) => (
          <li key={item.href}>
            <LocalizedLink
              href={item.href}
              aria-current={item.current ? 'page' : undefined}
              className={cn(
                'inline-flex h-10 items-center rounded-full border px-4 label-mono transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring',
                item.current
                  ? 'border-transparent bg-primary text-primary-foreground'
                  : 'border-foreground/20 text-soft hover:border-foreground/50 hover:text-foreground',
              )}
            >
              {item.name}
            </LocalizedLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
