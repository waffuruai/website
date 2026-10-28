import type { Localized, Seo } from '@/content/types';
import type { TeamMember } from '@/content/team';
import teamPageEs from './team.es';
import teamPageFr from './team.fr';
import teamPageZh from './team.zh';
import teamPageJa from './team.ja';
import teamPageKo from './team.ko';

/*
 * Team page copy. Names, roles, bios and links live in `src/content/team.ts`;
 * this file holds the page's own words. The hiring callout reads
 * `about.hiring`, so there is one source for it.
 */

export type TeamPageContent = {
  seo: Seo;
  hero: { label: string; title: string; lede: string };
  /** `{name}` is replaced with the person's name. */
  portraitAlt: string;
  /** `{name}` and `{network}`: the accessible name of a profile link. */
  linkAria: string;
  /** Visible labels for the profile links. Network names stay as they are. */
  linkNames: Record<keyof TeamMember['links'], string>;
  cta: { title: string; body: string };
};

export const teamPage: Localized<TeamPageContent> = {
  en: {
    seo: {
      title: 'Meet the founders and team',
      description:
        'The people building Waffuru, with experience across cybersecurity, the military, consumer and enterprise, from scaling startups to working with small businesses and the enterprise.',
      keywords: ['Waffuru team', 'Waffuru founders'],
    },
    hero: {
      label: 'Team',
      title: 'Who’s in the *kitchen*.',
      lede: 'Cybersecurity, military, consumer and enterprise. We’ve built and scaled startups, and worked with everyone from small businesses to the enterprise.',
    },
    portraitAlt: 'Portrait of {name}',
    linkAria: '{name} on {network}',
    linkNames: {
      linkedin: 'LinkedIn',
      website: 'Website',
      x: 'X',
      github: 'GitHub',
    },
    cta: {
      title: 'See what we’re *cooking*.',
      body: 'Pantry is free and open source today. Our AI inference stack is in private early access: request access to try it, or talk to us about what you need.',
    },
  },
  es: teamPageEs,
  fr: teamPageFr,
  zh: teamPageZh,
  ja: teamPageJa,
  ko: teamPageKo,
};
