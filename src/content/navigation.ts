import { site } from '@/content/site';
import type { NavLink, Navigation } from '@/content/types';

/*
 * Site navigation, shared by the navbar, the mobile menu, the footer, the
 * sitemap and llms.txt. Labels are dictionary keys (`nav.items.<key>`).
 * `navigation.test.ts` checks every internal href resolves to a route.
 */

/** The stack, numbered from the metal up: kernels (01) to memory (04). */
export const productLinks: NavLink[] = [
  { key: 'iron', href: '/products/iron', index: '01' },
  { key: 'butter', href: '/products/butter', index: '02' },
  { key: 'waffle', href: '/products/waffle', index: '03' },
  { key: 'syrup', href: '/products/syrup', index: '04' },
];

export const solutionLinks: NavLink[] = [
  { key: 'smallBusiness', href: '/solutions/small-business' },
  { key: 'enterprise', href: '/solutions/enterprise' },
  { key: 'neoclouds', href: '/solutions/neoclouds' },
  { key: 'aiCompanies', href: '/solutions/ai-companies' },
];

export const aboutLinks: NavLink[] = [
  { key: 'about', href: '/about' },
  { key: 'team', href: '/about/team' },
  { key: 'careers', href: '/about#hiring' },
  { key: 'brand', href: '/brand' },
];

export const helpLinks: NavLink[] = [
  ...(site.docsPublished
    ? [{ key: 'docs', href: site.urls.docs } as const]
    : []),
  { key: 'support', href: '/support' },
  { key: 'contact', href: '/contact' },
];

export const navigation: Navigation = {
  main: [
    {
      type: 'menu',
      labelKey: 'products',
      columns: [
        {
          heading: 'theStack',
          links: productLinks,
          footer: { labelKey: 'allProducts', href: '/products' },
        },
      ],
    },
    {
      type: 'menu',
      labelKey: 'solutions',
      columns: [
        {
          heading: 'byCustomer',
          links: solutionLinks,
          footer: { labelKey: 'allSolutions', href: '/solutions' },
        },
      ],
    },
    {
      type: 'menu',
      labelKey: 'company',
      columns: [
        { heading: 'company', links: aboutLinks },
        { heading: 'help', links: helpLinks },
      ],
    },
    { type: 'link', labelKey: 'blog', href: '/blog' },
  ],
  utility: {
    cta: { labelKey: 'requestAccess', href: site.urls.earlyAccess },
  },
  footer: {
    columns: [
      {
        headingKey: 'products',
        links: [{ key: 'stack', href: '/products' }, ...productLinks],
      },
      { headingKey: 'solutions', links: solutionLinks },
      {
        headingKey: 'company',
        links: [...aboutLinks, { key: 'blog', href: '/blog' }],
      },
      { headingKey: 'help', links: helpLinks },
    ],
    legal: [
      { labelKey: 'terms', href: '/legal/terms' },
      { labelKey: 'privacy', href: '/legal/privacy' },
      { labelKey: 'cookies', href: '/legal/cookies' },
    ],
  },
};

/** Every internal href in the navigation (used by the sitemap and tests). */
export function internalNavHrefs(nav: Navigation = navigation): string[] {
  const hrefs = new Set<string>();
  const add = (href: string) => {
    if (href.startsWith('/')) hrefs.add(href.split('#')[0] || '/');
  };
  for (const menu of nav.main) {
    if (menu.type === 'link') add(menu.href);
    else {
      for (const column of menu.columns) {
        column.links.forEach((link) => add(link.href));
        if (column.footer) add(column.footer.href);
      }
    }
  }
  add(nav.utility.cta.href);
  for (const column of nav.footer.columns) {
    column.links.forEach((link) => add(link.href));
  }
  nav.footer.legal.forEach((link) => add(link.href));
  return [...hrefs];
}
