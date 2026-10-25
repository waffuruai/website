/**
 * Google Forms that receive sign-ups. Shared by the mailing-list component
 * (no-JavaScript fallback) and the Worker (`worker/subscribe.ts`), so keep it
 * dependency-free.
 */

/**
 * The mailing list: Google Form "Website inquiry form" (public). Found by
 * fetching `viewform` and reading `FB_PUBLIC_LOAD_DATA_`: the form has no
 * questions. It uses the form-level "Collect email addresses" setting
 * (responder input, required), which Google posts as `emailAddress`, not as
 * an `entry.<id>`. The form's confirmation message is "Thanks for your
 * interest! We'll be in touch soon."
 *
 * TODO(founder): the form's description reads "Inbound lead gen from main
 * marketing site". Confirm it is meant to double as the mailing list, and
 * that a real submission lands in its Responses sheet (never exercised from
 * code: submitting writes a row).
 */
export const mailingList = {
  formId: '1FAIpQLSdhPse-RUslNVCE3_efanvWBHy8xRnKaOxRhWCIg7BDKLIujg',
  /** Form field name for each answer. */
  fields: { email: 'emailAddress' },
} as const;

/** Where a response is posted (`<form action>` and the Worker's forward). */
export const formResponseUrl = (formId: string = mailingList.formId) =>
  `https://docs.google.com/forms/d/e/${formId}/formResponse`;

/** Longest valid email address (RFC 5321 path limit). */
export const MAX_EMAIL_LENGTH = 254;

/** `local@domain.tld`: no spaces or control characters, no empty labels. */
const EMAIL = /^[^\s@\p{Cc}]+@[^\s@.\p{Cc}]+(?:\.[^\s@.\p{Cc}]+)+$/u;

/**
 * A deliberately simple gate (the browser and the Worker share it): it
 * catches typos, not every address RFC 5322 allows. Pass a trimmed value.
 */
export const isEmail = (value: string) =>
  value.length > 0 && value.length <= MAX_EMAIL_LENGTH && EMAIL.test(value);
