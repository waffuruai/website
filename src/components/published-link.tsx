import { LocalizedLink } from '@/components/localized-link';
import { isPublishedPath } from '@/lib/launch';

type PublishedLinkProps = React.ComponentProps<typeof LocalizedLink>;

/**
 * A `LocalizedLink`, or just its text when `href` is a page in a section that
 * has not launched (`site.launched`). Copy can link ahead to those pages, and
 * the links appear on launch with no edits.
 */
export function PublishedLink({
  href,
  children,
  ...props
}: PublishedLinkProps) {
  if (!isPublishedPath(href)) return <>{children}</>;
  return (
    <LocalizedLink href={href} {...props}>
      {children}
    </LocalizedLink>
  );
}
