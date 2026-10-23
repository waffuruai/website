// @vitest-environment node
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { formResponseUrl, mailingList } from '../src/content/forms';
import { handleSubscribe } from './subscribe';

const fetchMock = vi.fn<typeof fetch>();

beforeEach(() => {
  fetchMock.mockReset();
  fetchMock.mockImplementation(async () => new Response('ok', { status: 200 }));
  vi.stubGlobal('fetch', fetchMock);
  vi.spyOn(console, 'error').mockImplementation(() => {});
});

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

const post = (body: BodyInit, type = 'application/json') =>
  handleSubscribe(
    new Request('https://waffuru.ai/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': type },
      body,
    }),
  );

const json = (value: unknown) => post(JSON.stringify(value));

/** Headers every answer carries. */
function expectJsonHeaders(response: Response) {
  expect(response.headers.get('content-type')).toContain('application/json');
  expect(response.headers.get('cache-control')).toBe('no-store');
  expect(response.headers.get('x-content-type-options')).toBe('nosniff');
}

describe('handleSubscribe', () => {
  it('answers anything but POST with 405 and Allow: POST', async () => {
    for (const method of ['GET', 'PUT', 'DELETE']) {
      const response = await handleSubscribe(
        new Request('https://waffuru.ai/api/subscribe', { method }),
      );
      expect(response.status).toBe(405);
      expect(response.headers.get('allow')).toBe('POST');
      expectJsonHeaders(response);
    }
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('forwards a JSON signup to the Google Form as a urlencoded post', async () => {
    const response = await json({ email: '  ada@example.com ', website: '' });

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ ok: true });
    expectJsonHeaders(response);

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe(
      `https://docs.google.com/forms/d/e/${mailingList.formId}/formResponse`,
    );
    expect(url).toBe(formResponseUrl());
    expect(init?.method).toBe('POST');
    expect(new Headers(init?.headers).get('content-type')).toBe(
      'application/x-www-form-urlencoded',
    );
    expect(init?.redirect).toBe('manual');
    expect(init?.signal).toBeInstanceOf(AbortSignal);
    const sent = new URLSearchParams(String(init?.body));
    expect([...sent.keys()]).toEqual([mailingList.fields.email]);
    expect(sent.get(mailingList.fields.email)).toBe('ada@example.com');
  });

  it('accepts a urlencoded form, by either field name', async () => {
    const byEmail = await post(
      new URLSearchParams({ email: 'grace@example.org' }).toString(),
      'application/x-www-form-urlencoded; charset=UTF-8',
    );
    expect(byEmail.status).toBe(200);

    const byGoogleName = await post(
      new URLSearchParams({
        [mailingList.fields.email]: 'hopper@example.org',
      }).toString(),
      'application/x-www-form-urlencoded',
    );
    expect(byGoogleName.status).toBe(200);

    const bodies = fetchMock.mock.calls.map(([, init]) =>
      new URLSearchParams(String(init?.body)).get(mailingList.fields.email),
    );
    expect(bodies).toEqual(['grace@example.org', 'hopper@example.org']);
  });

  it('drops honeypot hits with a success and no forward', async () => {
    const response = await json({
      email: 'bot@example.com',
      website: 'https://spam.example',
    });
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ ok: true });
    expect(fetchMock).not.toHaveBeenCalled();

    const form = await post(
      new URLSearchParams({
        email: 'bot@example.com',
        website: 'x',
      }).toString(),
      'application/x-www-form-urlencoded',
    );
    expect(form.status).toBe(200);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it.each([
    ['missing', {}],
    ['empty', { email: '' }],
    ['blank', { email: '   ' }],
    ['not a string', { email: 42 }],
    ['no at sign', { email: 'ada.example.com' }],
    ['no domain dot', { email: 'ada@example' }],
    ['empty label', { email: 'ada@example..com' }],
    ['trailing dot', { email: 'ada@example.com.' }],
    ['two at signs', { email: 'a@b@example.com' }],
    ['inner space', { email: 'ada lovelace@example.com' }],
    ['newline', { email: 'ada@example.com\nBcc: x@example.com' }],
    ['too long', { email: `${'a'.repeat(250)}@example.com` }],
  ])('rejects an invalid email (%s) with 400', async (_name, body) => {
    const response = await json(body);
    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({ error: 'invalid_email' });
    expectJsonHeaders(response);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('rejects bodies that are not signups', async () => {
    for (const body of ['not json', '[]', 'null', '"ada@example.com"']) {
      const response = await post(body);
      expect(response.status).toBe(400);
      expect(await response.json()).toEqual({ error: 'invalid_email' });
    }
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('accepts a 254-character address and rejects 255', async () => {
    const domain = '@example.com';
    const fits = `${'a'.repeat(254 - domain.length)}${domain}`;
    expect(fits).toHaveLength(254);
    expect((await json({ email: fits })).status).toBe(200);
    expect((await json({ email: `a${fits}` })).status).toBe(400);
  });

  it('refuses other media types and oversized bodies', async () => {
    const text = await post('ada@example.com', 'text/plain');
    expect(text.status).toBe(415);
    expect(await text.json()).toEqual({ error: 'unsupported_media_type' });

    const big = await json({ email: 'ada@example.com', pad: 'x'.repeat(5000) });
    expect(big.status).toBe(413);
    expect(await big.json()).toEqual({ error: 'too_large' });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('answers 502 when Google does not answer 200', async () => {
    for (const status of [302, 400, 403, 429, 500]) {
      fetchMock.mockResolvedValueOnce(new Response(null, { status }));
      const response = await json({ email: 'ada@example.com' });
      expect(response.status).toBe(502);
      expect(await response.json()).toEqual({ error: 'upstream' });
      expectJsonHeaders(response);
    }
  });

  it('answers 502 on a network error', async () => {
    fetchMock.mockRejectedValueOnce(new TypeError('network down'));
    const response = await json({ email: 'ada@example.com' });
    expect(response.status).toBe(502);
    expect(await response.json()).toEqual({ error: 'upstream' });
  });

  it('gives up on Google after 10 seconds', async () => {
    vi.useFakeTimers();
    fetchMock.mockImplementationOnce(
      (_url, init) =>
        new Promise((_resolve, reject) => {
          init?.signal?.addEventListener('abort', () =>
            reject(new DOMException('aborted', 'AbortError')),
          );
        }),
    );

    const pending = json({ email: 'ada@example.com' });
    await vi.advanceTimersByTimeAsync(9_999);
    let settled = false;
    void pending.then(() => (settled = true));
    await vi.advanceTimersByTimeAsync(0);
    expect(settled).toBe(false);

    await vi.advanceTimersByTimeAsync(1);
    const response = await pending;
    expect(response.status).toBe(502);
    expect(await response.json()).toEqual({ error: 'upstream' });
  });

  it('never echoes or logs what was sent', async () => {
    const email = 'private.person@example.com';
    fetchMock.mockResolvedValueOnce(new Response(null, { status: 500 }));
    const failed = await json({ email });
    const invalid = await json({ email: `${email} nope`, website: '' });
    const ok = await json({ email });
    for (const response of [failed, invalid, ok]) {
      expect(await response.text()).not.toContain('private.person');
    }
    expect(JSON.stringify(vi.mocked(console.error).mock.calls)).not.toContain(
      'private.person',
    );
  });
});
