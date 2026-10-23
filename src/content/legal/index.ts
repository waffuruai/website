/**
 * Chrome for the legal pages. The policies are English-only legal text, so
 * these strings are too (they render inside `lang="en"`), not dictionary
 * entries.
 */
export const legalCopy = {
  label: 'Legal',
  /** `*word*` is the gold italic accent. */
  title: 'The fine *print*.',
  description:
    'The terms, privacy and cookie policies that apply when you use waffuru.ai and join Waffuru early access.',
  breadcrumb: 'Legal',
  lastUpdated: 'Last updated',
  onThisPage: 'On this page',
  allLegal: 'All legal documents',
  read: 'Read',
} as const;
