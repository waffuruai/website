import { CookieSettingsButton } from '@/components/consent/cookie-settings-button';
import { LocalizedLink } from '@/components/localized-link';
import { NewsletterSignup } from '@/components/newsletter/newsletter-signup';
import { Wordmark } from '@/components/wordmark';
import { navigation, publishedNavigation } from '@/content/navigation';
import { site } from '@/content/site';
import { interpolate } from '@/i18n/config';
import type { Dictionary } from '@/i18n/dictionaries/en';
import { cn } from '@/lib/utils';

/** Column classes by count; Tailwind needs whole class names. */
const COLUMNS: Record<number, string> = {
  1: 'sm:grid-cols-2',
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-3',
  4: 'sm:grid-cols-4',
  5: 'sm:grid-cols-3 xl:grid-cols-5',
};

/** Copyright year, fixed at build time (the site rebuilds on every release). */
const YEAR = new Date().getFullYear();

const SOCIALS = [
  { network: 'X', href: site.socials.x },
  { network: 'LinkedIn', href: site.socials.linkedin },
  { network: 'GitHub', href: site.socials.github },
] as const;

/**
 * Site footer: mailing list, link columns, then the After Hours footer bar
 * (copyright, "Made with 🤖 in North America", contact and socials).
 */
export function Footer({ dictionary }: { dictionary: Dictionary }) {
  const { footer, nav, common } = dictionary;
  const { columns } = publishedNavigation().footer;

  return (
    <footer className="mt-24 border-t border-foreground/10">
      <h2 className="sr-only">{footer.heading}</h2>
      <div className="mx-auto grid max-w-site gap-14 px-site pt-16 pb-12 lg:grid-cols-[1.1fr_2fr]">
        <div className="flex flex-col gap-8">
          <LocalizedLink
            href="/"
            className="w-fit text-foreground hover:text-foreground"
          >
            <Wordmark />
          </LocalizedLink>
          <NewsletterSignup />
        </div>
        <nav
          aria-label={footer.heading}
          className={cn(
            'grid grid-cols-2 gap-x-8 gap-y-10',
            COLUMNS[columns.length] ?? 'sm:grid-cols-4',
          )}
        >
          {columns.map((column) => (
            <div key={column.headingKey}>
              <p className="label-mono text-[11px] text-muted-foreground">
                {footer[column.headingKey]}
              </p>
              <ul className="mt-4 flex flex-col gap-1">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <LocalizedLink
                      href={link.href}
                      className="inline-flex min-h-9 items-center text-[15px] text-soft transition-colors hover:text-foreground"
                    >
                      {nav.items[link.key].label}
                    </LocalizedLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      <div className="mx-auto flex max-w-site flex-col gap-4 border-t border-foreground/10 px-site pt-6 pb-12 font-mono text-xs tracking-[0.06em] text-muted-foreground md:flex-row md:flex-wrap md:items-center md:justify-between">
        <p>
          {interpolate(footer.rights, { year: YEAR })} · {footer.madeIn}{' '}
          <span role="img" aria-label={footer.flagsLabel}>
            🇺🇸 🤝 🇨🇦
          </span>
        </p>
        <ul className="flex flex-wrap items-center gap-x-5 gap-y-1">
          <li>
            <a
              href={`mailto:${site.emails.hello}`}
              className="inline-flex min-h-11 items-center hover:text-foreground"
            >
              {site.emails.hello}
            </a>
          </li>
          {SOCIALS.map(({ network, href }) => (
            <li key={network}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={interpolate(footer.social, { network })}
                className="inline-flex min-h-11 items-center hover:text-foreground"
              >
                {network}
              </a>
            </li>
          ))}
          {navigation.footer.legal.map((link) => (
            <li key={link.href}>
              <LocalizedLink
                href={link.href}
                className="inline-flex min-h-11 items-center hover:text-foreground"
              >
                {footer[link.labelKey]}
              </LocalizedLink>
            </li>
          ))}
          <li>
            <CookieSettingsButton className="inline-flex min-h-11 items-center tracking-[0.06em] hover:text-foreground" />
          </li>
          <li>
            <a
              href="#main"
              className="inline-flex min-h-11 items-center hover:text-foreground"
            >
              {common.backToTop} ↑
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
