import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { NewsletterSignup } from '@/components/newsletter/newsletter-signup';
import { formResponseUrl, mailingList } from '@/content/forms';
import en from '@/i18n/dictionaries/en';
import es from '@/i18n/dictionaries/es';
import { withDictionary } from '@/i18n/test-utils';

const { newsletter } = en;

const fetchMock = vi.fn<typeof fetch>();

beforeEach(() => {
  fetchMock.mockReset();
  vi.stubGlobal('fetch', fetchMock);
});

afterEach(() => {
  vi.unstubAllGlobals();
});

const reply = (status: number) =>
  new Response(JSON.stringify(status === 200 ? { ok: true } : { error: 'x' }), {
    status,
  });

function setup(locale: 'en' | 'es' = 'en') {
  const user = userEvent.setup();
  const view = render(withDictionary(<NewsletterSignup />, locale));
  const input = screen.getByLabelText(
    locale === 'en' ? newsletter.email : es.newsletter.email,
  ) as HTMLInputElement;
  const form = view.container.querySelector('form') as HTMLFormElement;
  const honeypot = view.container.querySelector(
    'input[name="website"]',
  ) as HTMLInputElement;
  const submit = () =>
    user.click(
      screen.getByRole('button', {
        name: new RegExp(
          locale === 'en' ? newsletter.submit : es.newsletter.submit,
        ),
      }),
    );
  return { user, view, input, form, honeypot, submit };
}

describe('NewsletterSignup', () => {
  it('renders the dictionary copy and an accessible form', () => {
    const { input, form } = setup();
    expect(screen.getByText(newsletter.heading)).toBeTruthy();
    expect(screen.getByText(newsletter.description)).toBeTruthy();
    expect(input.type).toBe('email');
    expect(input.required).toBe(true);
    expect(input.autocomplete).toBe('email');
    expect(input.placeholder).toBe(newsletter.placeholder);
    // The field is labelled and the status region is live. The form is not
    // a named landmark: the footer renders a second one on the same page.
    expect(form.getAttribute('aria-labelledby')).toBeNull();
    const status = screen.getByRole('status');
    expect(status.getAttribute('aria-live')).toBe('polite');
    expect(status.textContent).toBe('');
  });

  it('works without JavaScript: a post to the Google Form', () => {
    const { input, form } = setup();
    expect(form.method).toBe('post');
    expect(form.getAttribute('action')).toBe(formResponseUrl());
    expect(form.getAttribute('action')).toContain(
      `/forms/d/e/${mailingList.formId}/formResponse`,
    );
    expect(input.name).toBe(mailingList.fields.email);
  });

  it('hides a honeypot named website from people and assistive tech', () => {
    const { honeypot } = setup();
    expect(honeypot.name).toBe('website');
    expect(honeypot.tabIndex).toBe(-1);
    expect(honeypot.autocomplete).toBe('off');
    expect(honeypot.closest('[aria-hidden="true"]')).not.toBeNull();
    expect(honeypot.closest('.sr-only')).not.toBeNull();
  });

  it('validates the address before sending anything', async () => {
    const { user, input, submit } = setup();

    await submit();
    expect(screen.getByRole('status').textContent).toBe(
      newsletter.errorInvalid,
    );
    expect(input.getAttribute('aria-invalid')).toBe('true');
    expect(input.getAttribute('aria-describedby')).toBe(
      screen.getByRole('status').id,
    );
    expect(document.activeElement).toBe(input);

    await user.type(input, 'ada@example');
    await submit();
    expect(screen.getByRole('status').textContent).toBe(
      newsletter.errorInvalid,
    );
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('posts JSON, then confirms and clears the field', async () => {
    fetchMock.mockResolvedValueOnce(reply(200));
    const { user, input, submit } = setup();

    await user.type(input, '  ada@example.com ');
    await submit();

    await waitFor(() =>
      expect(screen.getByRole('status').textContent).toBe(newsletter.success),
    );
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe('/api/subscribe');
    expect(init?.method).toBe('POST');
    expect(new Headers(init?.headers).get('content-type')).toBe(
      'application/json',
    );
    expect(JSON.parse(String(init?.body))).toEqual({
      email: 'ada@example.com',
      website: '',
    });
    expect(input.value).toBe('');
    expect(input.getAttribute('aria-invalid')).toBeNull();
  });

  it('passes a filled honeypot along so the Worker can drop it', async () => {
    fetchMock.mockResolvedValueOnce(reply(200));
    const { user, input, honeypot, submit } = setup();

    await user.type(input, 'bot@example.com');
    await user.type(honeypot, 'https://spam.example');
    await submit();

    await waitFor(() => expect(fetchMock).toHaveBeenCalled());
    expect(JSON.parse(String(fetchMock.mock.calls[0][1]?.body))).toEqual({
      email: 'bot@example.com',
      website: 'https://spam.example',
    });
  });

  it('is disabled while sending and ignores a second submit', async () => {
    let finish: (response: Response) => void = () => {};
    fetchMock.mockImplementationOnce(
      () => new Promise<Response>((resolve) => (finish = resolve)),
    );
    const { user, input, form, submit } = setup();

    await user.type(input, 'ada@example.com');
    await submit();

    const busy = await screen.findByRole('button', {
      name: new RegExp(newsletter.submitting),
    });
    expect((busy as HTMLButtonElement).disabled).toBe(true);
    expect(input.readOnly).toBe(true);
    expect(form.getAttribute('aria-busy')).toBe('true');

    // Enter in the field would submit the form again; it must not.
    form.requestSubmit();
    expect(fetchMock).toHaveBeenCalledTimes(1);

    finish(reply(200));
    const done = await screen.findByRole('button', {
      name: new RegExp(newsletter.submit),
    });
    expect((done as HTMLButtonElement).disabled).toBe(false);
    expect(input.readOnly).toBe(false);
    expect(screen.getByRole('status').textContent).toBe(newsletter.success);
  });

  it('shows the invalid message when the server rejects the address', async () => {
    fetchMock.mockResolvedValueOnce(reply(400));
    const { user, input, submit } = setup();

    await user.type(input, 'ada@example.com');
    await submit();

    await waitFor(() =>
      expect(screen.getByRole('status').textContent).toBe(
        newsletter.errorInvalid,
      ),
    );
    // What the visitor typed is kept so they can fix it.
    expect(input.value).toBe('ada@example.com');
  });

  it.each([
    ['an upstream failure', () => reply(502)],
    ['a server error', () => reply(500)],
  ])(
    'shows the generic error on %s and keeps the address',
    async (_n, make) => {
      fetchMock.mockResolvedValueOnce(make());
      const { user, input, submit } = setup();

      await user.type(input, 'ada@example.com');
      await submit();

      await waitFor(() =>
        expect(screen.getByRole('status').textContent).toBe(
          newsletter.errorGeneric,
        ),
      );
      expect(input.value).toBe('ada@example.com');
      expect(input.getAttribute('aria-invalid')).toBeNull();
      // Back to a usable form: try again.
      expect(
        (screen.getByRole('button', { name: /Subscribe/ }) as HTMLButtonElement)
          .disabled,
      ).toBe(false);
    },
  );

  it('shows the generic error when the network fails, then recovers', async () => {
    fetchMock.mockRejectedValueOnce(new TypeError('offline'));
    fetchMock.mockResolvedValueOnce(reply(200));
    const { user, input, submit } = setup();

    await user.type(input, 'ada@example.com');
    await submit();
    await waitFor(() =>
      expect(screen.getByRole('status').textContent).toBe(
        newsletter.errorGeneric,
      ),
    );

    await submit();
    await waitFor(() =>
      expect(screen.getByRole('status').textContent).toBe(newsletter.success),
    );
  });

  it('uses the active locale’s dictionary', async () => {
    const { submit } = setup('es');
    expect(screen.getByText(es.newsletter.heading)).toBeTruthy();
    await submit();
    expect(screen.getByRole('status').textContent).toBe(
      es.newsletter.errorInvalid,
    );
  });

  it('gives each instance its own ids (footer and page can both render one)', () => {
    const { container } = render(
      withDictionary(
        <>
          <NewsletterSignup />
          <NewsletterSignup />
        </>,
      ),
    );
    const ids = [...container.querySelectorAll('[id]')].map((el) => el.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(screen.getAllByLabelText(newsletter.email)).toHaveLength(2);
  });
});
