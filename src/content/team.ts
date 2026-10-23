import type { Localized } from '@/content/types';

/**
 * The team: facts (photo, links) here, words (role, background, bio) in
 * `teamCopy` so they translate. Used by the team page, the About page, blog
 * bylines and Person JSON-LD.
 *
 * Links: a URL, `null` when the person has no such profile, or PLACEHOLDER
 * when we have not found it yet (hidden on the site; `team.test.ts` lists
 * every placeholder so they get filled in). A link is only set when it is
 * confirmed to be the same person: it is linked from their own site or
 * profile, or two profiles link to each other.
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
      // The github.com/KyleCroll account has no repos, bio or links, so it
      // cannot be tied to him. Fill in when he confirms a handle.
      github: PLACEHOLDER,
    },
  },
  {
    slug: 'eric-gonzalez',
    name: 'Eric Gonzalez',
    photo: 'team/eric-gonzalez',
    links: {
      linkedin: 'https://www.linkedin.com/in/ericgonzalez/',
      website: PLACEHOLDER,
      // TODO(founder): about.me/ericgonzalez links an X account
      // (@ericgonzalez), but that page is stale and cannot be verified.
      x: PLACEHOLDER,
      // His LinkedIn lists this GitHub profile and the profile links back.
      github: 'https://github.com/ericgonzalez',
    },
  },
  {
    slug: 'eric-kryski',
    name: 'Eric Kryski',
    photo: 'team/eric-kryski',
    links: {
      linkedin: 'https://www.linkedin.com/in/ekryski/',
      website: 'https://erickryski.com',
      // Linked from erickryski.com and from his GitHub profile.
      x: 'https://x.com/ekryski',
      github: 'https://github.com/ekryski',
    },
  },
  {
    slug: 'tom-turney',
    name: 'Tom Turney',
    photo: 'team/tom-turney',
    links: {
      linkedin: 'https://www.linkedin.com/in/tturney/',
      // TODO(founder): his GitHub profile lists psyguard.ai as a website,
      // but it was unreachable and may be a project rather than a personal site.
      website: PLACEHOLDER,
      // Linked from his GitHub profile, which also links the LinkedIn above.
      x: 'https://x.com/no_stp_on_snek',
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
      bio: 'Kyle is ex-military, with a background in threat intelligence and threat hunting. As CEO he sets Waffuru’s direction and brings a security lens to how AI gets built and deployed. He holds an MBA from the McCombs School of Business at UT Austin.',
    },
    'eric-gonzalez': {
      role: 'Chief Revenue Officer',
      background: 'Scaled companies from $50M to $2B ARR. Ex-Oracle NetSuite.',
      bio: 'Eric is a revenue leader who has scaled companies from $50M to $2B in ARR. He previously worked at Oracle NetSuite and at Anaconda, the company behind Conda, and he serves as a board member.',
    },
    'eric-kryski': {
      role: 'Chief Product Officer',
      background:
        'Full-stack developer, designer and ML researcher. Co-founder of Bidali.',
      bio: 'Eric is a full-stack developer, designer and ML researcher who ships product end to end. He is CEO and co-founder of Bidali and co-founder of Bullish Ventures, and he leads product at Waffuru.',
    },
    'tom-turney': {
      role: 'Chief of Research',
      background:
        'AI researcher behind TurboQuant+. Former tech lead manager at Google.',
      bio: 'Tom is the AI researcher behind TurboQuant+, the compression work Syrup uses to shrink embeddings, and he leads research at Waffuru. Before this he was a tech lead manager at Google.',
    },
    'cory-smith': {
      role: 'Chief Technology Officer',
      background: 'Has exited a company. Co-founder and CTO of Bidali.',
      bio: 'Cory has exited a company and is co-founder and CTO of Bidali, which he helped grow to millions in stablecoin payments volume. He is a managing director at Bullish Ventures and has been building consumer and enterprise products since 2009.',
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
