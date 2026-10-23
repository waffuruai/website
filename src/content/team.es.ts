import type { teamCopy } from './team';

// TODO(i18n): translate to es. Keep hrefs, slugs and product names.
const teamCopyEs: (typeof teamCopy)['en'] = {
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
};

export default teamCopyEs;
