import { plainText } from '@/lib/markup';
import type { FaqItem } from '@/content/types';
import { site } from '@/content/site';
import { absoluteUrl } from '@/lib/seo';

/*
 * schema.org builders. Only emit what the page visibly shows (e.g. FAQPage
 * next to a rendered FAQ). Never emit Review or AggregateRating: there are
 * no real reviews to back them.
 */

export type JsonLdValue =
  | string
  | number
  | boolean
  | null
  | JsonLdValue[]
  | { [key: string]: JsonLdValue | undefined };

export type JsonLdObject = { [key: string]: JsonLdValue | undefined };

const ORG_ID = `${site.url}/#organization`;
const WEBSITE_ID = `${site.url}/#website`;

const context = { '@context': 'https://schema.org' } as const;

const publisherRef = { '@id': ORG_ID };

export function organization(): JsonLdObject {
  return {
    ...context,
    '@type': 'Organization',
    '@id': ORG_ID,
    name: site.name,
    legalName: site.legalName,
    alternateName: site.kana,
    url: site.url,
    logo: absoluteUrl('/img/brand/waffle-384.png'),
    description: site.description,
    slogan: site.mission,
    email: site.emails.hello,
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'sales',
        email: site.emails.hello,
        availableLanguage: [
          'English',
          'Spanish',
          'French',
          'Chinese',
          'Japanese',
          'Korean',
        ],
      },
    ],
    sameAs: [site.socials.x, site.socials.linkedin, site.socials.github],
  };
}

export function website(locale = 'en'): JsonLdObject {
  return {
    ...context,
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    name: site.name,
    url: site.url,
    inLanguage: locale,
    publisher: publisherRef,
  };
}

export function breadcrumbs(
  items: { name: string; path: string }[],
): JsonLdObject {
  return {
    ...context,
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqPage(items: FaqItem[]): JsonLdObject {
  return {
    ...context,
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: plainText(item.answer) },
    })),
  };
}

type PageInfo = { name: string; description: string; path: string };

export function softwareApplication({
  name,
  description,
  path,
  category = 'DeveloperApplication',
  operatingSystem = 'macOS, Linux',
}: PageInfo & { category?: string; operatingSystem?: string }): JsonLdObject {
  return {
    ...context,
    '@type': 'SoftwareApplication',
    name,
    description,
    url: absoluteUrl(path),
    applicationCategory: category,
    operatingSystem,
    publisher: publisherRef,
  };
}

/** A team member, shown on the team page with these same facts. */
export function person({
  name,
  jobTitle,
  description,
  image,
  sameAs,
}: {
  name: string;
  jobTitle: string;
  description: string;
  image?: string;
  sameAs: string[];
}): JsonLdObject {
  return {
    ...context,
    '@type': 'Person',
    name,
    jobTitle,
    description,
    image: image ? absoluteUrl(image) : undefined,
    worksFor: publisherRef,
    sameAs: sameAs.length ? sameAs : undefined,
  };
}

export function service({
  name,
  description,
  path,
  serviceType,
}: PageInfo & { serviceType?: string }): JsonLdObject {
  return {
    ...context,
    '@type': 'Service',
    name,
    description,
    url: absoluteUrl(path),
    serviceType: serviceType ?? name,
    provider: publisherRef,
    areaServed: 'Worldwide',
  };
}

export function article({
  title,
  description,
  path,
  date,
  author,
  authorUrl,
  image,
  keywords,
  type = 'BlogPosting',
}: {
  title: string;
  description: string;
  path: string;
  /** ISO date; omitted when unknown. */
  date?: string;
  /** Person name; defaults to the Waffuru organization. */
  author?: string;
  authorUrl?: string;
  image?: string;
  keywords?: string[];
  type?: 'BlogPosting' | 'Article';
}): JsonLdObject {
  return {
    ...context,
    '@type': type,
    headline: title,
    description,
    url: absoluteUrl(path),
    mainEntityOfPage: absoluteUrl(path),
    datePublished: date,
    author: author
      ? { '@type': 'Person', name: author, url: authorUrl }
      : publisherRef,
    publisher: publisherRef,
    image: image ? absoluteUrl(image) : undefined,
    keywords: keywords?.length ? keywords.join(', ') : undefined,
  };
}

export function contactPage({
  name,
  description,
  path,
}: PageInfo): JsonLdObject {
  return {
    ...context,
    '@type': 'ContactPage',
    name,
    description,
    url: absoluteUrl(path),
    about: publisherRef,
  };
}

/** Plain WebPage node for pages without a more specific type. */
export function webPage({
  name,
  description,
  path,
  locale = 'en',
}: PageInfo & { locale?: string }): JsonLdObject {
  return {
    ...context,
    '@type': 'WebPage',
    name,
    description,
    url: absoluteUrl(path),
    inLanguage: locale,
    isPartOf: { '@id': WEBSITE_ID },
    publisher: publisherRef,
  };
}

export function aboutPage({ name, description, path }: PageInfo): JsonLdObject {
  return {
    ...context,
    '@type': 'AboutPage',
    name,
    description,
    url: absoluteUrl(path),
    about: publisherRef,
  };
}
