/**
 * `POST /api/subscribe`: mailing-list signup. Placeholder until the
 * Google Form forwarding lands; answers 501 so the form shows its fallback.
 */
export async function handleSubscribe(request: Request): Promise<Response> {
  if (request.method !== 'POST') {
    return new Response(null, { status: 405, headers: { Allow: 'POST' } });
  }
  return new Response(JSON.stringify({ error: 'not_implemented' }), {
    status: 501,
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}
