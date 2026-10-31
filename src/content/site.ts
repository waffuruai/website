/**
 * Company facts used across pages, JSON-LD, llms.txt and the footer.
 * Change a fact here and every surface follows.
 */
export const site = {
  name: 'Waffuru',
  /** The company: a Delaware corporation. Terms, privacy and the footer. */
  legalName: 'Waffuru AI Inc.',
  /** Katakana for "waffle"; shown beside the wordmark. */
  kana: 'ワッフル',
  description:
    'Waffuru builds the AI stack that runs models fast and at the lowest cost per token, on hardware you own or rent: GPU kernels (Iron), an inference engine (Butter), a control plane (Syrup), memory (Whisk) and an agent harness (Waffle). Its first public product is Pantry, a free, open-source vulnerability scanner.',
  mission: 'Democratize access to intelligence.',
  url: 'https://waffuru.ai',
  emails: {
    /** General enquiries, support, press, privacy requests. */
    hello: 'hello@waffuru.ai',
    /** Sales and partnerships. */
    sales: 'sales@waffuru.ai',
    /** Vulnerability reports; also in security.txt and /security. */
    security: 'security@waffuru.ai',
  },
  socials: {
    x: 'https://x.com/waffuruai',
    xHandle: '@waffuruai',
    linkedin: 'https://www.linkedin.com/company/waffuru/',
    github: 'https://github.com/waffuruai',
  },
  /**
   * Whether docs.waffuru.ai is ready to be linked from the site. While false
   * the nav, product pages and support page leave the docs out.
   */
  docsPublished: false,
  /**
   * Sections live in production. An unlaunched section still builds and
   * shows in dev and tests, like a blog draft, so it can be reviewed;
   * production leaves it out of the nav, sitemap and llms.txt and prunes its
   * pages after the build (`scripts/postbuild/unreleased.mjs`). Routes per
   * section are in `src/lib/launch.ts`. Flip one to true to launch it.
   */
  launched: {
    pantry: true,
    stack: true,
    solutions: true,
    industries: true,
  },
  urls: {
    docs: 'https://docs.waffuru.ai',
    /** Early-access sign-up (Google Form), the primary call to action. */
    earlyAccess: 'https://forms.gle/SHaVSRRWmZKy8UJy7',
  },
} as const;

export type Site = typeof site;

/** Topics for `mailto:` callouts; each becomes the email's subject line. */
export type MailSubject =
  | 'Sales'
  | 'Partnerships'
  | 'Press'
  | 'Support'
  | 'Hiring'
  | 'Security'
  | 'Pantry on Windows';

/** Which mailbox reads a subject: sales@ for buyers and partners, security@ for reports, hello@ for the rest. */
export function addressFor(subject: MailSubject): string {
  switch (subject) {
    case 'Sales':
    case 'Partnerships':
      return site.emails.sales;
    case 'Security':
      return site.emails.security;
    default:
      return site.emails.hello;
  }
}

/** `mailto:<mailbox>?subject=…`, the destination for formless CTAs. */
export const mailto = (subject: MailSubject) =>
  `mailto:${addressFor(subject)}?subject=${encodeURIComponent(subject)}`;
