'use client';

import { ArrowRightIcon, ArrowUpRightIcon, MenuIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';

import { isExternalHref, LocalizedLink } from '@/components/localized-link';
import { LanguageSwitcher } from '@/components/marketing/language-switcher';
import { ThemeToggle } from '@/components/theme-toggle';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Wordmark } from '@/components/wordmark';
import { navigation } from '@/content/navigation';
import { site } from '@/content/site';
import type { NavColumn, NavLink, NavMenu } from '@/content/types';
import { splitLocale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/dictionaries/en';
import { useDictionary } from '@/i18n/dictionary-provider';
import { cn } from '@/lib/utils';

type Nav = Dictionary['nav'];

/** Whether `href` is the current page or one of its children. */
export function isActive(href: string, path: string) {
  if (!href.startsWith('/')) return false;
  const base = href.split(/[?#]/)[0] || '/';
  return base === '/'
    ? path === '/'
    : path === base || path.startsWith(`${base}/`);
}

const menuIsActive = (menu: NavMenu, path: string) =>
  menu.type === 'link'
    ? isActive(menu.href, path)
    : menu.columns.some((column) =>
        column.links.some((link) => isActive(link.href, path)),
      );

/** Mono caps, as on the After Hours header. */
const navText =
  'label-mono text-soft transition-colors hover:text-foreground data-[state=open]:text-foreground';

function MenuLink({
  link,
  nav,
  path,
}: {
  link: NavLink;
  nav: Nav;
  path: string;
}) {
  const item = nav.items[link.key];
  const active = isActive(link.href, path);
  const external = isExternalHref(link.href);

  return (
    <li>
      <NavigationMenuLink asChild active={active}>
        <LocalizedLink
          href={link.href}
          aria-current={active ? 'page' : undefined}
          className="group/item hover:bg-accent focus-visible:bg-accent flex items-start gap-4 rounded-xl p-3"
        >
          {link.index && (
            <span className="text-muted-foreground mt-1.5 font-mono text-[11px] tracking-[0.08em]">
              {link.index}
            </span>
          )}
          <span className="flex flex-col gap-1">
            <span
              className={cn(
                'text-foreground inline-flex items-center gap-1.5',
                link.index
                  ? 'group-hover/item:text-brand-ink font-serif text-[26px] leading-none transition-colors'
                  : 'text-[15px] font-medium',
              )}
            >
              {item.label}
              {external && (
                <ArrowUpRightIcon
                  className="text-muted-foreground size-3.5"
                  aria-hidden
                />
              )}
            </span>
            <span className="text-muted-foreground text-sm leading-snug">
              {item.description}
            </span>
          </span>
        </LocalizedLink>
      </NavigationMenuLink>
    </li>
  );
}

function Column({
  column,
  nav,
  path,
}: {
  column: NavColumn;
  nav: Nav;
  path: string;
}) {
  return (
    <div className="flex flex-col">
      {column.heading && (
        <p className="label-mono text-muted-foreground px-3 pt-2 pb-1 text-[11px]">
          {nav[column.heading]}
        </p>
      )}
      <ul className="grid gap-0.5">
        {column.links.map((link) => (
          <MenuLink key={link.href} link={link} nav={nav} path={path} />
        ))}
      </ul>
      {column.footer && (
        <NavigationMenuLink asChild>
          <LocalizedLink
            href={column.footer.href}
            className="text-brand-ink hover:bg-accent mt-1 inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium"
          >
            {nav[column.footer.labelKey]}
            <ArrowRightIcon className="size-4" aria-hidden />
          </LocalizedLink>
        </NavigationMenuLink>
      )}
    </div>
  );
}

function DesktopNav({ nav, path }: { nav: Nav; path: string }) {
  const { header } = useDictionary();

  return (
    <NavigationMenu className="hidden lg:flex" aria-label={header.mainNav}>
      <NavigationMenuList className="gap-1">
        {navigation.main.map((menu) => {
          const active = menuIsActive(menu, path);
          if (menu.type === 'link') {
            return (
              <NavigationMenuItem key={menu.labelKey}>
                <NavigationMenuLink asChild active={active}>
                  <LocalizedLink
                    href={menu.href}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      navText,
                      'inline-flex h-10 items-center rounded-full px-3',
                      active && 'text-foreground',
                    )}
                  >
                    {nav[menu.labelKey]}
                  </LocalizedLink>
                </NavigationMenuLink>
              </NavigationMenuItem>
            );
          }

          return (
            <NavigationMenuItem key={menu.labelKey}>
              <NavigationMenuTrigger
                className={cn(
                  navText,
                  'h-10 rounded-full bg-transparent px-3 hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent',
                  active && 'text-foreground',
                )}
              >
                {nav[menu.labelKey]}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div
                  className={cn(
                    'grid gap-2 p-2',
                    menu.columns.length > 1
                      ? 'w-[min(92vw,640px)] grid-cols-2'
                      : 'w-[400px]',
                  )}
                >
                  {menu.columns.map((column, index) => (
                    <Column key={index} column={column} nav={nav} path={path} />
                  ))}
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          );
        })}
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <a
              href={site.urls.docs}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                navText,
                'inline-flex h-10 items-center gap-1 rounded-full px-3',
              )}
            >
              {nav.items.docs.label}
              <ArrowUpRightIcon className="size-3.5" aria-hidden />
            </a>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

function MobileNav({ nav, path }: { nav: Nav; path: string }) {
  const { header, common } = useDictionary();

  const link = (href: string, label: string, key: string) => (
    <li key={key}>
      <SheetClose asChild>
        <LocalizedLink
          href={href}
          aria-current={isActive(href, path) ? 'page' : undefined}
          className={cn(
            'hover:bg-accent flex min-h-11 items-center rounded-lg px-3 py-2',
            isActive(href, path) && 'bg-accent text-brand-ink',
          )}
        >
          {label}
        </LocalizedLink>
      </SheetClose>
    </li>
  );

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="size-11 lg:hidden"
          aria-label={header.openMenu}
        >
          <MenuIcon className="size-5" aria-hidden />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full overflow-y-auto sm:max-w-sm">
        <SheetHeader>
          <SheetTitle className="label-mono text-muted-foreground">
            {header.menu}
          </SheetTitle>
        </SheetHeader>
        <nav aria-label={header.mainNav} className="px-4 pb-8">
          <Accordion type="multiple">
            {navigation.main.map((menu) =>
              menu.type === 'link' ? (
                <ul key={menu.labelKey} className="border-b py-2">
                  {link(menu.href, nav[menu.labelKey], menu.labelKey)}
                </ul>
              ) : (
                <AccordionItem key={menu.labelKey} value={menu.labelKey}>
                  <AccordionTrigger className="px-3 font-serif text-2xl font-normal">
                    {nav[menu.labelKey]}
                  </AccordionTrigger>
                  <AccordionContent className="[&_a]:no-underline">
                    {menu.columns.map((column, index) => (
                      <div key={index} className="mb-2">
                        {column.heading && (
                          <p className="label-mono text-muted-foreground px-3 pt-2 text-[11px]">
                            {nav[column.heading]}
                          </p>
                        )}
                        <ul>
                          {column.links.map((item) =>
                            link(
                              item.href,
                              nav.items[item.key].label,
                              item.href,
                            ),
                          )}
                          {column.footer &&
                            link(
                              column.footer.href,
                              nav[column.footer.labelKey],
                              column.footer.href,
                            )}
                        </ul>
                      </div>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              ),
            )}
          </Accordion>
          <div className="mt-8 flex flex-col gap-4">
            <Button asChild size="lg" className="h-12 rounded-full text-[15px]">
              <LocalizedLink href={navigation.utility.cta.href}>
                {common[navigation.utility.cta.labelKey]}
              </LocalizedLink>
            </Button>
            <div className="flex items-center justify-between">
              <LanguageSwitcher showLabel />
              <ThemeToggle />
            </div>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}

/** Sticky, translucent site header with popover menus and a mobile sheet. */
export function Navbar() {
  const { nav, header, common } = useDictionary();
  const { path } = splitLocale(usePathname() ?? '/');

  return (
    <header className="bg-background/80 supports-[backdrop-filter]:bg-background/65 sticky top-0 z-50 border-b border-transparent backdrop-blur-md">
      <a
        href="#main"
        className="bg-primary text-primary-foreground sr-only z-50 rounded-full px-4 py-2 focus:not-sr-only focus:absolute focus:top-3 focus:left-3"
      >
        {common.skipToContent}
      </a>
      <div className="max-w-site px-site mx-auto flex h-[72px] items-center gap-4 lg:h-[88px]">
        <LocalizedLink
          href="/"
          aria-label={header.home}
          className="text-foreground hover:text-foreground inline-flex min-h-11 shrink-0 items-center"
        >
          <Wordmark priority />
        </LocalizedLink>
        <div className="ml-auto flex items-center gap-1">
          <DesktopNav nav={nav} path={path} />
          <LanguageSwitcher className="hidden sm:inline-flex" />
          <ThemeToggle className="hidden sm:inline-flex" />
          <LocalizedLink
            href={navigation.utility.cta.href}
            className="label-mono border-foreground/28 text-foreground hover:border-foreground/60 ml-2 hidden min-h-11 items-center rounded-full border px-[18px] whitespace-nowrap transition-colors sm:inline-flex"
          >
            {common[navigation.utility.cta.labelKey]}
          </LocalizedLink>
          <MobileNav nav={nav} path={path} />
        </div>
      </div>
    </header>
  );
}
