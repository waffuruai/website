import { LocalizedLink } from '@/components/localized-link';

/** A file served as-is, outside the locale tree (`/.well-known/security.txt`). */
const FILE = /^\/\.well-known\//;

/**
 * Links inside a policy's text. Internal links (`/legal/privacy`) keep the
 * visitor in their language, web links open in a new tab, `mailto:` and
 * `#section` links behave as usual, and a file under `/.well-known/` gets no
 * locale prefix.
 */
export function PolicyLink({
  href = '',
  ...props
}: React.ComponentPropsWithoutRef<'a'>) {
  if (FILE.test(href)) return <a href={href} {...props} />;
  return <LocalizedLink href={href} {...props} />;
}
