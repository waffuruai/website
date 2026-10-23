import type { Localized } from '@/content/types';

/**
 * The team: facts (photo, links) here, words (role, background, bio) in
 * `teamCopy` so they translate. Used by the team page, the About page, blog
 * bylines and Person JSON-LD.
 *
 * Links: a URL, `null` when the person has no such profile, or PLACEHOLDER
 * when we have not found it yet (hidden on the site; `team.test.ts` lists
 * every placeholder so they get filled in).
 */
export const PLACEHOLDER = 'PLACEHOLDER';

export type ProfileLink = string | null | typeof PLACEHOLDER;

export type TeamMember = {
  slug: string;
  name: string;
  /** `<Picture>` manifest key, built from `assets/team/<slug>.jpg`. */
  photo: string;
  links: {
    linkedin: ProfileLink;
    website: ProfileLink;
    x: ProfileLink;
    github: ProfileLink;
  };
};

export type TeamCopy = {
  role: string;
  /** One line for the overlay on the photo. */
  background: string;
  /** Two or three sentences for the team page. */
  bio: string;
};

/** In the order the team page shows them. */
export const team: TeamMember[] = [
  {
    slug: 'kyle-croll',
    name: 'Kyle Croll',
    photo: 'team/kyle-croll',
    links: {
      linkedin: 'https://www.linkedin.com/in/kylecroll/',
      website: PLACEHOLDER,
      x: PLACEHOLDER,
      github: 'https://github.com/KyleCroll',
    },
  },
  {
    slug: 'eric-gonzalez',
    name: 'Eric Gonzalez',
    photo: 'team/eric-gonzalez',
    links: {
      linkedin: 'https://www.linkedin.com/in/ericgonzalez/',
      website: PLACEHOLDER,
      x: PLACEHOLDER,
      github: PLACEHOLDER,
    },
  },
  {
    slug: 'eric-kryski',
    name: 'Eric Kryski',
    photo: 'team/eric-kryski',
    links: {
      linkedin: 'https://www.linkedin.com/in/ekryski/',
      website: 'https://erickryski.com',
      x: PLACEHOLDER,
      github: 'https://github.com/ekryski',
    },
  },
  {
    slug: 'tom-turney',
    name: 'Tom Turney',
    photo: 'team/tom-turney',
    links: {
      linkedin: 'https://www.linkedin.com/in/tturney/',
      website: PLACEHOLDER,
      x: PLACEHOLDER,
      github: 'https://github.com/TheTom',
    },
  },
  {
    slug: 'cory-smith',
    name: 'Cory Smith',
    photo: 'team/cory-smith',
    links: {
      linkedin: 'https://www.linkedin.com/in/corysmith/',
      website: PLACEHOLDER,
      x: PLACEHOLDER,
      github: PLACEHOLDER,
    },
  },
];

export const teamCopy: Localized<Record<string, TeamCopy>> = {
  en: {
    'kyle-croll': {
      role: 'CEO',
      background: 'Ex-military. Threat intelligence, AI strategy and security.',
      bio: 'Kyle came up through the military and threat intelligence, hunting adversaries before they could act. He now leads Waffuru’s strategy, with a security lens on how AI gets built and deployed. McCombs MBA.',
    },
    'eric-gonzalez': {
      role: 'Chief Revenue Officer',
      background:
        'Scaled revenue from $50M to $2B ARR. Ex-Oracle NetSuite, ex-Anaconda.',
      bio: 'Eric has taken companies from $50M to $2B in annual recurring revenue, at Oracle NetSuite and at Anaconda, the company behind the Python data science stack. He serves on boards and turns developer tools into businesses.',
    },
    'eric-kryski': {
      role: 'Chief Product Officer',
      background:
        'Full-stack developer, designer and ML researcher. Co-founder of Bidali.',
      bio: 'Eric is a full-stack developer, designer and ML researcher who ships product end to end. He is CEO and co-founder of Bidali and co-founder of Bullish Ventures, and leads product at Waffuru.',
    },
    'tom-turney': {
      role: 'Chief of Research',
      background:
        'AI researcher behind TurboQuant+. Former tech lead manager at Google.',
      bio: 'Tom is the AI researcher behind TurboQuant+, the compression work that lets bigger models and longer contexts fit on hardware people already own. Before Waffuru he was a tech lead manager at Google.',
    },
    'cory-smith': {
      role: 'Chief Technology Officer',
      background:
        'Exited founder. Grew Bidali to millions in stablecoin payments.',
      bio: 'Cory has founded and exited a company, then co-founded Bidali as CTO and helped grow it to millions in stablecoin payments volume. A managing director at Bullish Ventures, he has been shipping consumer and enterprise products since 2009.',
    },
  },
};

/** Every placeholder link, as `slug.network` (for the test and the founder). */
export function unfilledLinks(members: TeamMember[] = team): string[] {
  return members.flatMap((member) =>
    Object.entries(member.links)
      .filter(([, value]) => value === PLACEHOLDER)
      .map(([network]) => `${member.slug}.${network}`),
  );
}

/** Links that should render: real URLs only. */
export function visibleLinks(member: TeamMember) {
  return Object.entries(member.links).filter(
    (entry): entry is [keyof TeamMember['links'], string] =>
      typeof entry[1] === 'string' && entry[1] !== PLACEHOLDER,
  );
}

export const getMember = (slug: string) =>
  team.find((member) => member.slug === slug);
