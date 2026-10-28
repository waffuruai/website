/**
 * English UI chrome: the source of truth for every dictionary. The other
 * locales are typed against this shape, so a missing key fails typecheck.
 * Page copy lives in `src/content/*`, not here. Product names (Waffuru, Iron,
 * Butter, Syrup, Whisk) and platform names (Metal, CUDA, …) never translate.
 */
const en = {
  common: {
    requestAccess: 'Request early access',
    talkToUs: 'Talk to us',
    learnMore: 'Learn more',
    readMore: 'Read more',
    skipToContent: 'Skip to content',
    backToTop: 'Back to top',
    copy: 'Copy',
    copied: 'Copied',
    opensInNewTab: '(opens in a new tab)',
    private: 'Private',
    inProgress: 'Next',
    faqHeading: 'Questions, answered',
  },
  meta: {
    defaultTitle: 'Waffuru: more intelligence from the hardware you own',
    defaultDescription:
      'Waffuru builds the stack that runs AI on the hardware you already own, private by default. Start with Pantry, our free vulnerability scanner for macOS and Linux.',
  },
  header: {
    mainNav: 'Main',
    home: 'Waffuru home',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    menu: 'Menu',
  },
  theme: {
    label: 'Change theme',
    light: 'Light',
    dark: 'Dark',
    system: 'System',
  },
  language: {
    label: 'Change language',
  },
  nav: {
    products: 'Products',
    solutions: 'Solutions',
    company: 'About',
    blog: 'Blog',
    theStack: 'The stack',
    byCustomer: 'Who it’s for',
    help: 'Help',
    allProducts: 'See the whole stack',
    allSolutions: 'All solutions',
    industries: 'Industries',
    byIndustry: 'By industry',
    allIndustries: 'All industries',
    openSource: 'Free and open source',
    items: {
      stack: {
        label: 'The Waffuru stack',
        description: 'Four products that work alone or together.',
      },
      iron: {
        label: 'Iron',
        description: 'One kernel definition, four backends.',
      },
      butter: {
        label: 'Butter',
        description: 'Model serving without Python.',
      },
      syrup: {
        label: 'Syrup',
        description: 'See every GPU and every engine running on it.',
      },
      whisk: {
        label: 'Whisk',
        description: 'Your AI remembers what you were working on.',
      },
      pantry: {
        label: 'Pantry',
        description: 'Free vulnerability scanner for macOS and Linux.',
      },
      smallBusiness: {
        label: 'Small business',
        description: 'Private AI on hardware you already own.',
      },
      enterprise: {
        label: 'Enterprise',
        description: 'Inference you control, on-prem or in your cloud.',
      },
      neoclouds: {
        label: 'Neoclouds',
        description: 'More tokens per GPU and one view of the fleet.',
      },
      aiCompanies: {
        label: 'AI model and inference companies',
        description: 'Faster kernels and serving across every backend.',
      },
      cloudInfrastructure: {
        label: 'Cloud infrastructure',
        description: 'More output and clear margins from every GPU.',
      },
      financialServices: {
        label: 'Financial services',
        description: 'Private AI that keeps client data in house.',
      },
      lifeSciences: {
        label: 'Life sciences',
        description: 'Run models next to sensitive research data.',
      },
      government: {
        label: 'Government',
        description: 'Sovereign AI on hardware you control.',
      },
      military: {
        label: 'Military',
        description: 'Capable AI on hardware you own and secure.',
      },
      about: {
        label: 'About us',
        description: 'Our mission, what we believe and why we build.',
      },
      team: {
        label: 'Team',
        description: 'The people in the kitchen.',
      },
      careers: {
        label: 'Careers',
        description: 'Build the stack with us.',
      },
      brand: {
        label: 'Brand',
        description: 'The waffle mark, colours and type.',
      },
      blog: {
        label: 'Blog',
        description: 'News, research notes and releases.',
      },
      docs: {
        label: 'Docs',
        description: 'Guides and references for Iron and Butter.',
      },
      support: {
        label: 'Support',
        description: 'Answers and how to reach us.',
      },
      contact: {
        label: 'Contact',
        description: 'Sales, partnerships, press and hiring.',
      },
    },
  },
  footer: {
    heading: 'Footer',
    products: 'Products',
    solutions: 'Solutions',
    industries: 'Industries',
    company: 'Company',
    help: 'Help',
    terms: 'Terms of use',
    privacy: 'Privacy policy',
    cookies: 'Cookie policy',
    madeIn: 'Made with 🤖 in North America',
    flagsLabel: 'United States and Canada',
    social: 'Waffuru on {network}',
    rights: '© {year} Waffuru AI Inc.',
  },
  newsletter: {
    heading: 'Stay in the loop',
    description:
      'Releases, research notes and the occasional recipe. No spam; unsubscribe any time.',
    email: 'Email address',
    placeholder: 'you@company.com',
    submit: 'Subscribe',
    submitting: 'Subscribing…',
    honeypot: 'Leave this field empty',
    success: 'You’re on the list. Thanks for following along.',
    errorInvalid: 'Enter a valid email address.',
    errorGeneric:
      'That didn’t go through. Try again, or email hello@waffuru.ai.',
  },
  consent: {
    label: 'Cookie consent',
    message:
      'We use Google Analytics cookies only if you accept. Necessary storage, like your theme and language, is always on.',
    noticeMessage:
      'We use Google Analytics to see which pages are useful. You can opt out at any time.',
    gpcNotice:
      'Your browser sends a Global Privacy Control signal, so analytics stays off.',
    policyLink: 'Cookie policy',
    accept: 'Accept',
    decline: 'Decline',
    ok: 'OK',
    optOut: 'Opt out',
    settings: 'Cookie settings',
    settingsDescription:
      'Choose whether we may use analytics cookies. Necessary storage, like your theme and language, is always on.',
    analyticsLabel: 'Analytics',
    analyticsDescription: 'Google Analytics, to see which pages are useful.',
    save: 'Save',
    dismiss: 'Close',
  },
  blog: {
    categories: {
      Company: 'Company',
      Product: 'Product',
      Engineering: 'Engineering',
      Research: 'Research',
    },
    heading: 'Blog',
    description: 'News, research notes and releases from the Waffuru team.',
    all: 'All',
    readingTime: '{minutes} min read',
    by: 'By {author}',
    onThisPage: 'On this page',
    share: 'Share',
    shareOn: 'Share on {network}',
    related: 'Keep reading',
    backToBlog: 'All posts',
    englishOnly: 'This post is in English.',
    rss: 'RSS feed',
  },
  notFound: {
    title: 'That page has melted away',
    description: 'The page you were looking for doesn’t exist or has moved.',
    home: 'Back to the home page',
  },
};

/** Widens literal string types so translations can hold any string. */
type Widen<T> = { [K in keyof T]: T[K] extends string ? string : Widen<T[K]> };

export type Dictionary = Widen<typeof en>;

export default en as Dictionary;
