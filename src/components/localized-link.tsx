'use client';

import NextLink from 'next/link';

import { postLocales } from '@/generated/blog-locales';
import { defaultLocale, localizePath, type Locale } from '@/i18n/config';
import { useLocale } from '@/i18n/dictionary-provider';

type LocalizedLinkProps = Omit<
  React.ComponentPropsWithoutRef<typeof NextLink>,
  'href'
> & { href: string };

/** True for URLs that leave the site (other origins, mailto:, tel:). */
export const isExternalHref = (href: string) =>
  /^[a-z][a-z0-9+.-]*:/i.test(href) || href.startsWith('//');

const POST = /^\/blog\/([^/?#]+)/;

/**
 * The locale to link `href` in from a page in `locale`: its own, except a
 * blog post not written in it, which links to its English page.
 */
export function linkLocale(href: string, locale: Locale): Locale {
  const slug = POST.exec(href)?.[1];
  const written = slug ? postLocales[slug] : undefined;
  return !written || written.includes(locale) ? locale : defaultLocale;
}

/**
 * Link that keeps visitors in their language: internal paths get the active
 * locale prefix (none for English), except posts not translated into it.
 * External http(s) links open in a new tab.
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

  const target = linkLocale(href, locale);
  return (
    <NextLink
      href={localizePath(href, target)}
      {...(target !== locale ? { hrefLang: target } : {})}
      {...props}
    />
  );
}
