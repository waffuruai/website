import { mailto, site } from '@/content/site';
import type { support } from './support';

// TODO(i18n): translate to ja. Keep hrefs, slugs and product names.
const supportJa: (typeof support)['en'] = {
  seo: {
    title: 'Support',
    description:
      'What is available today, how early access works, supported hardware, where the docs are, and how to report a bug or a security issue.',
    keywords: [
      'Waffuru support',
      'Waffuru docs',
      'Waffuru early access',
      'report a security issue',
      'local AI hardware support',
    ],
  },
  hero: {
    label: 'Support',
    title: 'Answers, and a *person* when you need one.',
    lede: 'What’s available today, how early access works, and where to go when something breaks.',
  },
  links: {
    title: 'Where to *start*',
    items: [
      {
        title: 'Read the docs',
        body: 'Guides and references live at docs.waffuru.ai.',
        href: site.urls.docs,
      },
      {
        title: 'Email support',
        body: 'Bugs, questions, install trouble. Say what you ran and on which hardware.',
        href: mailto('Support'),
      },
      {
        title: 'Report a security issue',
        body: 'Privately, by email to hello@waffuru.ai with the subject Security.',
        href: mailto('Security'),
      },
      {
        title: 'security.txt',
        body: 'Our security contact in machine-readable form.',
        href: '/.well-known/security.txt',
        file: true,
      },
    ],
  },
  faq: [
    {
      question: 'What can I use today?',
      answer:
        'Our products (Iron, Butter, Waffle and Syrup) are private and closed source for now, and nothing is generally available yet. Early access is how people get in first. Guides and references live at docs.waffuru.ai.',
    },
    {
      question: 'How does early access work?',
      answer:
        'Fill in the early-access form and tell us what you’re building and what you want to run it on. We write to you when we have something that fits. Early access is pre-release software: it can change or break, and your feedback is how it improves.',
    },
    {
      question: 'Which hardware does it run on?',
      answer:
        'Apple silicon is the primary target: every kernel is written and tuned for Metal first. NVIDIA CUDA is secondary, in production on RTX and DGX Spark, with datacenter GPUs in progress. AMD ROCm and Vulkan run today but are not tuned yet. Think MacBook and Mac Studio, RTX workstations, DGX Spark, Strix Halo and neocloud fleets.',
    },
    {
      question: 'Where are the docs?',
      answer:
        'At docs.waffuru.ai. If something there is wrong or missing, tell us through the support link on this page.',
    },
    {
      question: 'How do I report a bug?',
      answer:
        'Email hello@waffuru.ai with the subject Support; the Email support link above does that for you. Include your hardware and OS, what you ran, what you expected and what happened, and trim anything private from logs first.',
    },
    {
      question: 'How do I report a security issue?',
      answer:
        'Email hello@waffuru.ai with the subject Security and enough detail to reproduce it. Please keep it private until we have had a reasonable chance to fix it. Our security.txt lists the same contact in machine-readable form.',
    },
    {
      question: 'What happens to my data?',
      answer:
        'Our software runs locally, and your data stays on your machine unless you opt in to something that sends it elsewhere. On this website we collect only what the privacy policy lists, and Google Analytics stays off unless you accept it.',
    },
  ],
  cta: {
    title: 'Not in here? *Ask* us.',
    body: 'Send your hardware, your OS, what you ran and what happened. The more detail, the easier it is to help.',
    docs: 'Read the docs',
    email: 'Email support',
  },
};

export default supportJa;
