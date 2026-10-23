import type { teamPage } from './team';

// TODO(i18n): translate to es. Keep hrefs, slugs and product names.
const teamPageEs: (typeof teamPage)['en'] = {
  seo: {
    title: 'Meet the founders and team',
    description:
      'The people building Waffuru: research, security, revenue and a couple of founders who have shipped before.',
    keywords: ['Waffuru team', 'Waffuru founders'],
  },
  hero: {
    label: 'Team',
    title: 'Who’s in the *kitchen*.',
    lede: 'Research, security, revenue and a couple of founders who have shipped before.',
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
    body: 'Our products are private for now. Request early access to try them, or talk to us about what you need.',
  },
};

export default teamPageEs;
