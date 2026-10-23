import type { MailSubject } from '@/content/site';
import type { Localized, Seo } from '@/content/types';

/** One way to reach us: a short line and an email with the subject set. */
export type Callout = {
  /** The `mailto()` subject. */
  subject: MailSubject;
  title: string;
  body: string;
};

export type ContactContent = {
  seo: Seo;
  hero: { label: string; title: string; lede: string };
  callouts: {
    title: string;
    intro: string;
    /** Button label; screen readers hear it followed by the card's title. */
    emailLabel: string;
    items: Callout[];
  };
  earlyAccess: { title: string; body: string };
};

/*
 * Formless on purpose: every callout is an email with its subject filled in.
 * The early-access button label is `common.requestAccess` (dictionary).
 */
export const contact: Localized<ContactContent> = {
  en: {
    seo: {
      title: 'Contact',
      description:
        'Reach Waffuru for sales, partnerships, press, support, security reports or hiring, or ask for early access.',
      keywords: [
        'contact Waffuru',
        'AI infrastructure sales',
        'partnerships',
        'Waffuru press',
        'Waffuru early access',
      ],
    },
    hero: {
      label: 'Contact',
      title: 'Tell us what you’re *building*.',
      lede: 'Sales, partnerships, press, support, security and hiring all reach us at hello@waffuru.ai. Pick the topic that fits.',
    },
    callouts: {
      title: 'Pick a *door*.',
      intro:
        'No forms to fill in. Each button opens an email with the subject already set.',
      emailLabel: 'Email us',
      items: [
        {
          subject: 'Sales',
          title: 'Sales',
          body: 'Running models on your own hardware, or a fleet of it? Tell us the workload and where it runs.',
        },
        {
          subject: 'Partnerships',
          title: 'Partnerships',
          body: 'Hardware makers, neoclouds and model teams: tell us what you’d like to build together.',
        },
        {
          subject: 'Press',
          title: 'Press',
          body: 'Writing about local AI, GPU software or the people building it? We’re glad to talk.',
        },
        {
          subject: 'Support',
          title: 'Support',
          body: 'Something broken or unclear? Send your hardware, what you ran and what happened.',
        },
        {
          subject: 'Security',
          title: 'Security',
          body: 'Found a vulnerability? Tell us privately and give us time to fix it before it goes public.',
        },
        {
          subject: 'Hiring',
          title: 'Hiring',
          body: 'Want to help build the stack? Tell us what you’ve shipped and what you’d like to work on.',
        },
      ],
    },
    earlyAccess: {
      title: 'Want it *first*?',
      body: 'Our products are in private early access. Tell us what you want to run, and on what hardware, and we’ll write when we have something that fits.',
    },
  },
};
