/**
 * `POST /api/subscribe`: mailing-list signup. Validates the address, then
 * forwards it to the Google Form that backs the list (`src/content/forms.ts`),
 * so the page can show success or failure itself instead of navigating to
 * Google's confirmation page. Accepts JSON (`{ email, website }`) or a
 * urlencoded form.
 *
 * `website` is the honeypot: real visitors never see it, so a filled value is
 * a bot. It gets the same `200 { ok: true }` as a real signup and is dropped.
 *
 * Nothing the visitor sent is ever echoed back or logged.
 */
import { formResponseUrl, isEmail, mailingList } from '../src/content/forms';

/** A signup is tens of bytes; anything bigger is not one. */
const MAX_BODY_BYTES = 4096;
/** How long to wait for Google before giving up. */
const UPSTREAM_TIMEOUT_MS = 10_000;

const reply = (status: number, body: unknown, headers?: HeadersInit) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
      ...headers,
    },
  });

type Submission = { email: unknown; website: unknown };

/** The media type without parameters, lowercased (`application/json`). */
const mediaType = (request: Request) =>
  (request.headers.get('content-type') ?? '')
    .split(';')[0]
    .trim()
    .toLowerCase();

/**
 * Reads the submission from the body. `null` means the body was not a
 * supported shape (it is treated as a missing email).
 */
function parse(type: string, text: string): Submission | null {
  if (type === 'application/json') {
    try {
      const value: unknown = JSON.parse(text);
      if (value === null || typeof value !== 'object' || Array.isArray(value)) {
        return null;
      }
      const fields = value as Record<string, unknown>;
      return { email: fields.email, website: fields.website };
    } catch {
      return null;
    }
  }
  const params = new URLSearchParams(text);
  return {
    // `emailAddress` is the Google Form's own field name, so a plain HTML
    // form pointed at either place works.
    email: params.get('email') ?? params.get(mailingList.fields.email),
    website: params.get('website'),
  };
}

/** Posts the address to the Google Form; true when Google accepted it. */
async function forward(email: string): Promise<boolean> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), UPSTREAM_TIMEOUT_MS);
  try {
    const upstream = await fetch(formResponseUrl(), {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ [mailingList.fields.email]: email }),
      // A redirect means Google wants a sign-in or moved the form: not a
      // recorded response, and following it would end on a page that is 200.
      redirect: 'manual',
      signal: controller.signal,
    });
    // Free the connection; the confirmation page itself is of no use.
    void upstream.body?.cancel().catch(() => {});
    if (upstream.status === 200) return true;
    console.error(`subscribe: Google Forms answered ${upstream.status}`);
    return false;
  } catch (error) {
    const reason = error instanceof Error ? error.name : 'unknown';
    console.error(`subscribe: could not reach Google Forms (${reason})`);
    return false;
  } finally {
    clearTimeout(timer);
  }
}

export async function handleSubscribe(request: Request): Promise<Response> {
  if (request.method !== 'POST') {
    return reply(405, { error: 'method_not_allowed' }, { Allow: 'POST' });
  }

  const type = mediaType(request);
  if (
    type !== 'application/json' &&
    type !== 'application/x-www-form-urlencoded'
  ) {
    return reply(415, { error: 'unsupported_media_type' });
  }

  const declared = Number(request.headers.get('content-length') ?? 0);
  if (declared > MAX_BODY_BYTES) return reply(413, { error: 'too_large' });
  const text = await request.text();
  if (text.length > MAX_BODY_BYTES) return reply(413, { error: 'too_large' });

  const submission = parse(type, text);

  // Honeypot: look like a success so a bot has nothing to learn from.
  if (
    typeof submission?.website === 'string' &&
    submission.website.trim() !== ''
  ) {
    return reply(200, { ok: true });
  }

  const email =
    typeof submission?.email === 'string' ? submission.email.trim() : '';
  if (!isEmail(email)) return reply(400, { error: 'invalid_email' });

  if (!(await forward(email))) return reply(502, { error: 'upstream' });
  return reply(200, { ok: true });
}
