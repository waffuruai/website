'use client';

import { useId, useRef, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { formResponseUrl, isEmail, mailingList } from '@/content/forms';
import { useDictionary } from '@/i18n/dictionary-provider';
import { trackEvent } from '@/lib/analytics';
import { cn } from '@/lib/utils';

type Status = 'idle' | 'sending' | 'success' | 'invalid' | 'error';

/**
 * Wires the form up once it is in the page: from then on the browser's own
 * validation bubbles give way to our localized messages. Without JavaScript
 * the attribute is never set, so native validation still guards the post.
 */
const takeOverValidation = (form: HTMLFormElement | null) => {
  form?.setAttribute('novalidate', '');
};

/**
 * Mailing-list signup (footer, contact, home). With JavaScript it posts JSON
 * to `/api/subscribe` and answers in place. Without it the form is a plain
 * post to the Google Form that backs the list (the CSP's `form-action` allows
 * docs.google.com), so signing up never depends on our scripts.
 *
 * `website` is a honeypot: invisible to people, tempting to bots.
 */
export function NewsletterSignup({ className }: { className?: string }) {
  const { newsletter } = useDictionary();
  const [status, setStatus] = useState<Status>('idle');
  const input = useRef<HTMLInputElement>(null);
  const id = useId();
  const emailId = `${id}-email`;
  const honeypotId = `${id}-website`;
  const statusId = `${id}-status`;

  const sending = status === 'sending';
  const message =
    status === 'success'
      ? newsletter.success
      : status === 'invalid'
        ? newsletter.errorInvalid
        : status === 'error'
          ? newsletter.errorGeneric
          : '';

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending) return;

    const form = event.currentTarget;
    const data = new FormData(form);
    const email = String(data.get(mailingList.fields.email) ?? '').trim();
    const website = String(data.get('website') ?? '');

    if (!isEmail(email)) {
      setStatus('invalid');
      input.current?.focus();
      return;
    }

    setStatus('sending');
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, website }),
      });
      if (response.ok) {
        form.reset();
        setStatus('success');
        trackEvent({ category: 'newsletter', action: 'subscribe' });
      } else {
        setStatus(response.status === 400 ? 'invalid' : 'error');
      }
    } catch {
      setStatus('error');
    }
  }

  return (
    <div data-newsletter className={cn('flex flex-col gap-4', className)}>
      <p className="font-serif text-3xl leading-[1.05]">{newsletter.heading}</p>
      <p className="max-w-md text-[15px] leading-relaxed text-soft">
        {newsletter.description}
      </p>
      <form
        ref={takeOverValidation}
        method="post"
        action={formResponseUrl()}
        onSubmit={onSubmit}
        aria-busy={sending}
        className="flex max-w-md flex-col gap-3 sm:flex-row"
      >
        <Label htmlFor={emailId} className="sr-only">
          {newsletter.email}
        </Label>
        <Input
          ref={input}
          id={emailId}
          name={mailingList.fields.email}
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          readOnly={sending}
          placeholder={newsletter.placeholder}
          aria-invalid={status === 'invalid' || undefined}
          aria-describedby={message ? statusId : undefined}
          className="h-[52px] rounded-full border-foreground/28 px-5 text-[15px] sm:flex-1 md:text-[15px] dark:bg-transparent"
        />
        <div aria-hidden="true" className="sr-only">
          <label htmlFor={honeypotId}>{newsletter.honeypot}</label>
          <input
            id={honeypotId}
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            defaultValue=""
          />
        </div>
        <Button
          type="submit"
          disabled={sending}
          className="h-auto min-h-[52px] gap-2.5 rounded-full bg-primary px-7 text-[15px] font-medium text-primary-foreground hover:bg-primary/90"
        >
          {sending ? newsletter.submitting : newsletter.submit}
          {!sending && <span aria-hidden="true">→</span>}
        </Button>
      </form>
      <p
        id={statusId}
        role="status"
        aria-live="polite"
        className={cn(
          'max-w-md text-sm leading-relaxed empty:hidden',
          status === 'success' ? 'text-success' : 'text-destructive',
        )}
      >
        {message}
      </p>
    </div>
  );
}
