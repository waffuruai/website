import { LocalizedLink } from '@/components/localized-link';

/**
 * Links inside a policy's text. Internal links (`/legal/privacy`) keep the
 * visitor in their language, web links open in a new tab, `mailto:` and
 * `#section` links behave as usual.
 */
export function PolicyLink({
  href = '',
  ...props
}: React.ComponentPropsWithoutRef<'a'>) {
  return <LocalizedLink href={href} {...props} />;
}
