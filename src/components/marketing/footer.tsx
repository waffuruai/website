import { CookieSettingsButton } from '@/components/consent/cookie-settings-button';
import { LocalizedLink } from '@/components/localized-link';
import { NewsletterSignup } from '@/components/newsletter/newsletter-signup';
import { Wordmark } from '@/components/wordmark';
import { navigation } from '@/content/navigation';
import { site } from '@/content/site';
import { interpolate } from '@/i18n/config';
import type { Dictionary } from '@/i18n/dictionaries/en';

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

  return (
    <footer className="border-foreground/10 mt-24 border-t">
      <h2 className="sr-only">{footer.heading}</h2>
      <div className="max-w-site px-site mx-auto grid gap-14 pt-16 pb-12 lg:grid-cols-[1.1fr_2fr]">
        <div className="flex flex-col gap-8">
          <LocalizedLink
            href="/"
            aria-label={dictionary.header.home}
            className="text-foreground hover:text-foreground w-fit"
          >
            <Wordmark />
          </LocalizedLink>
          <NewsletterSignup />
        </div>
        <nav
          aria-label={footer.heading}
          className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4"
        >
          {navigation.footer.columns.map((column) => (
            <div key={column.headingKey}>
              <p className="label-mono text-muted-foreground text-[11px]">
                {footer[column.headingKey]}
              </p>
              <ul className="mt-4 flex flex-col gap-1">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <LocalizedLink
                      href={link.href}
                      className="text-soft hover:text-foreground inline-flex min-h-9 items-center text-[15px] transition-colors"
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

      <div className="max-w-site border-foreground/10 px-site text-muted-foreground mx-auto flex flex-col gap-4 border-t pt-6 pb-12 font-mono text-xs tracking-[0.06em] md:flex-row md:flex-wrap md:items-center md:justify-between">
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
              className="hover:text-foreground inline-flex min-h-11 items-center"
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
                className="hover:text-foreground inline-flex min-h-11 items-center"
              >
                {network}
              </a>
            </li>
          ))}
          {navigation.footer.legal.map((link) => (
            <li key={link.href}>
              <LocalizedLink
                href={link.href}
                className="hover:text-foreground inline-flex min-h-11 items-center"
              >
                {footer[link.labelKey]}
              </LocalizedLink>
            </li>
          ))}
          <li>
            <CookieSettingsButton className="hover:text-foreground inline-flex min-h-11 items-center tracking-[0.06em]" />
          </li>
          <li>
            <a
              href="#main"
              className="hover:text-foreground inline-flex min-h-11 items-center"
            >
              {common.backToTop} ↑
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
