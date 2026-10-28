import {
  industryPath,
  industrySlugs,
  type IndustrySlug,
} from '@/content/pages/industries/types';
import { pantryFacts } from '@/content/pages/pantry/facts';
import { site } from '@/content/site';
import type {
  NavColumn,
  NavItemKey,
  NavLink,
  NavMenu,
  Navigation,
} from '@/content/types';
import { isPublishedPath } from '@/lib/launch';

/*
 * Site navigation, shared by the navbar, the mobile menu, the footer, the
 * sitemap and llms.txt. Labels are dictionary keys (`nav.items.<key>`).
 * Everything renders through `publishedNavigation()`, which drops links to
 * sections that are not launched (`site.launched`).
 */

/** The stack, numbered from the metal up: kernels (01) to memory (04). */
export const productLinks: NavLink[] = [
  { key: 'iron', href: '/products/iron', index: '01' },
  { key: 'butter', href: '/products/butter', index: '02' },
  { key: 'syrup', href: '/products/syrup', index: '03' },
  { key: 'whisk', href: '/products/whisk', index: '04' },
];

/** Free, open-source tools that stand apart from the stack. */
export const openSourceLinks: NavLink[] = [
  { key: 'pantry', href: pantryFacts.path },
];

export const solutionLinks: NavLink[] = [
  { key: 'smallBusiness', href: '/solutions/small-business' },
  { key: 'enterprise', href: '/solutions/enterprise' },
  { key: 'neoclouds', href: '/solutions/neoclouds' },
  { key: 'aiCompanies', href: '/solutions/ai-companies' },
];

const industryKeys: Record<IndustrySlug, NavItemKey> = {
  'cloud-infrastructure': 'cloudInfrastructure',
  'financial-services': 'financialServices',
  'life-sciences': 'lifeSciences',
  government: 'government',
  military: 'military',
};

export const industryLinks: NavLink[] = industrySlugs.map((slug) => ({
  key: industryKeys[slug],
  href: industryPath(slug),
}));

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
        { heading: 'openSource', links: openSourceLinks },
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
      labelKey: 'industries',
      columns: [
        {
          heading: 'byIndustry',
          links: industryLinks,
          footer: { labelKey: 'allIndustries', href: '/industries' },
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
        links: [
          { key: 'stack', href: '/products' },
          ...productLinks,
          ...openSourceLinks,
        ],
      },
      { headingKey: 'solutions', links: solutionLinks },
      {
        headingKey: 'industries',
        links: industryLinks,
      },
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

/**
 * `nav` without links to unpublished pages: links go first, then a column
 * left with no links, then a menu left with no columns. Footer columns with
 * no links go too.
 */
export function publishedNavigation(
  nav: Navigation = navigation,
  isPublished: (href: string) => boolean = isPublishedPath,
): Navigation {
  const links = (list: NavLink[]) =>
    list.filter((link) => isPublished(link.href));

  const column = ({ footer, ...col }: NavColumn): NavColumn => ({
    ...col,
    links: links(col.links),
    ...(footer && isPublished(footer.href) ? { footer } : {}),
  });

  const main = nav.main.flatMap((menu): NavMenu[] => {
    if (menu.type === 'link') return isPublished(menu.href) ? [menu] : [];
    const columns = menu.columns
      .map(column)
      .filter((col) => col.links.length > 0);
    return columns.length ? [{ ...menu, columns }] : [];
  });

  return {
    ...nav,
    main,
    footer: {
      ...nav.footer,
      columns: nav.footer.columns
        .map((col) => ({ ...col, links: links(col.links) }))
        .filter((col) => col.links.length > 0),
    },
  };
}

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
