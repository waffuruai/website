'use client';

import NextLink from 'next/link';

import { localizePath } from '@/i18n/config';
import { useLocale } from '@/i18n/dictionary-provider';

type LocalizedLinkProps = Omit<
  React.ComponentPropsWithoutRef<typeof NextLink>,
  'href'
> & { href: string };

/** True for URLs that leave the site (other origins, mailto:, tel:). */
export const isExternalHref = (href: string) =>
  /^[a-z][a-z0-9+.-]*:/i.test(href) || href.startsWith('//');

/**
 * Link that keeps visitors in their language: internal paths get the active
 * locale prefix (none for English). External http(s) links open in a new tab.
 */
export function LocalizedLink({ href, ...props }: LocalizedLinkProps) {
  const locale = useLocale();

  if (isExternalHref(href)) {
    const web = /^(https?:)?\/\//i.test(href);
    return (
      <a
        href={href}
        {...(web ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...props}
      />
    );
  }

  if (href.startsWith('#')) return <a href={href} {...props} />;

  return <NextLink href={localizePath(href, locale)} {...props} />;
}
