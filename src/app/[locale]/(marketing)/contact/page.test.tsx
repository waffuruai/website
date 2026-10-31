import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { contact } from '@/content/pages/contact';
import { mailto, site, type MailSubject } from '@/content/site';
import en from '@/i18n/dictionaries/en';
import { withDictionary } from '@/i18n/test-utils';
import { localize } from '@/lib/content';

import ContactPage, { generateMetadata } from './page';

const SUBJECTS: MailSubject[] = [
  'Sales',
  'Partnerships',
  'Press',
  'Support',
  'Security',
  'Hiring',
];

/** Which mailbox each door opens: sales@ for buyers and partners, security@ for reports, hello@ for the rest. */
const MAILBOX: Record<MailSubject, string> = {
  Sales: 'sales@waffuru.ai',
  Partnerships: 'sales@waffuru.ai',
  Press: 'hello@waffuru.ai',
  Support: 'hello@waffuru.ai',
  Security: 'security@waffuru.ai',
  Hiring: 'hello@waffuru.ai',
  'Pantry on Windows': 'hello@waffuru.ai',
};

const params = (locale: string) => Promise.resolve({ locale });

async function renderPage(locale: 'en' | 'ja' = 'en') {
  const page = await ContactPage({ params: params(locale) });
  return render(withDictionary(page, locale));
}

const jsonLd = (container: HTMLElement) =>
  [...container.querySelectorAll('script[type="application/ld+json"]')].flatMap(
    (script) => {
      const data = JSON.parse(script.textContent ?? 'null');
      return Array.isArray(data) ? data : [data];
    },
  );

describe('/contact', () => {
  it('links each of our addresses in the lede, in every locale that names them', async () => {
    for (const locale of ['en', 'ja'] as const) {
      const { unmount } = await renderPage(locale);
      for (const email of Object.values(site.emails)) {
        const link = screen.getByRole('link', { name: email });
        expect(link.getAttribute('href')).toBe(`mailto:${email}`);
      }
      unmount();
    }
  });

  it('has one h1 and a callout for every topic', async () => {
    await renderPage();
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
    const titles = screen
      .getAllByRole('heading', { level: 3 })
      .map((heading) => heading.textContent);
    expect(titles).toEqual(contact.en.callouts.items.map((item) => item.title));
  });

  it.each(SUBJECTS)(
    'links the %s callout to its mailto subject',
    async (subject) => {
      await renderPage();
      const link = screen.getByRole('link', {
        name: `${contact.en.callouts.emailLabel}: ${subject}`,
      });
      expect(link.getAttribute('href')).toBe(mailto(subject));
      expect(link.getAttribute('href')).toBe(
        `mailto:${MAILBOX[subject]}?subject=${subject}`,
      );
      // The link sits inside its own topic's card.
      const card = link.closest('li');
      expect(within(card as HTMLElement).getByRole('heading').textContent).toBe(
        subject,
      );
    },
  );

  it('keeps mailto links unprefixed in every locale', async () => {
    await renderPage('ja');
    const ja = localize(contact, 'ja').callouts;
    for (const subject of SUBJECTS) {
      const title = ja.items.find((item) => item.subject === subject)?.title;
      expect(
        screen
          .getByRole('link', { name: `${ja.emailLabel}: ${title}` })
          .getAttribute('href'),
      ).toBe(mailto(subject));
    }
  });

  it('offers early access and the mailing list', async () => {
    const { container } = await renderPage();
    const early = screen.getByRole('link', { name: /Request early access/ });
    expect(early.getAttribute('href')).toBe(site.urls.earlyAccess);
    expect(screen.getByLabelText(en.newsletter.email)).toBeTruthy();
    expect(screen.getByText(en.newsletter.heading)).toBeTruthy();
    // Formless on purpose: the only form is the mailing list.
    expect(container.querySelectorAll('form')).toHaveLength(1);
    expect(container.querySelector('textarea')).toBeNull();
  });

  it('describes only what is shown: a contact page and its breadcrumbs', async () => {
    const { container } = await renderPage();
    const nodes = jsonLd(container);
    expect(nodes.map((node) => node['@type'])).toEqual([
      'ContactPage',
      'BreadcrumbList',
    ]);
    expect(nodes[0].url).toBe('https://waffuru.ai/contact');
    expect(
      nodes[1].itemListElement.map((item: { item: string }) => item.item),
    ).toEqual(['https://waffuru.ai/', 'https://waffuru.ai/contact']);
  });

  it('localizes its breadcrumb URLs', async () => {
    const { container } = await renderPage('ja');
    const crumbs = jsonLd(container)[1].itemListElement;
    expect(crumbs.map((item: { item: string }) => item.item)).toEqual([
      'https://waffuru.ai/ja',
      'https://waffuru.ai/ja/contact',
    ]);
  });

  it('sets canonical, hreflang and keywords', async () => {
    const metadata = await generateMetadata({ params: params('es') });
    expect(metadata.title).toBe(contact.es?.seo.title);
    expect(metadata.alternates?.canonical).toBe('/es/contact');
    expect(metadata.alternates?.languages).toMatchObject({
      en: '/contact',
      ja: '/ja/contact',
      'x-default': '/contact',
    });
    expect(metadata.keywords).toEqual(contact.es?.seo.keywords);
  });
});
