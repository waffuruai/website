/**
 * Company facts used across pages, JSON-LD, llms.txt and the footer.
 * Change a fact here and every surface follows.
 */
export const site = {
  name: 'Waffuru',
  /** Katakana for "waffle"; shown beside the wordmark. */
  kana: 'ワッフル',
  description:
    'Waffuru builds GPU kernels (Iron), an inference engine (Butter), a GPU control plane (Waffle) and a memory layer (Syrup) that run models fast on the hardware you already own.',
  mission: 'Democratize access to intelligence.',
  url: 'https://waffuru.ai',
  emails: {
    hello: 'hello@waffuru.ai',
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
  urls: {
    docs: 'https://docs.waffuru.ai',
    /** Early-access sign-up (Google Form), the primary call to action. */
    earlyAccess: 'https://forms.gle/SHaVSRRWmZKy8UJy7',
  },
} as const;

export type Site = typeof site;

/** Topics for `mailto:` callouts; each becomes the email's subject line. */
export type MailSubject =
  'Sales' | 'Partnerships' | 'Press' | 'Support' | 'Hiring' | 'Security';

/** `mailto:hello@waffuru.ai?subject=…`, the destination for formless CTAs. */
export const mailto = (
  subject: MailSubject,
  address: string = site.emails.hello,
) => `mailto:${address}?subject=${encodeURIComponent(subject)}`;
