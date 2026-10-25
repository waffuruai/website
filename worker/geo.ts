/**
 * `GET /api/geo`: the visitor's country and region from Cloudflare's edge
 * metadata, so the cookie banner can apply the right consent rules (opt-in in
 * the EU/EEA, UK, Switzerland and Quebec; notice elsewhere). Nothing is
 * stored; the answer is computed per request and never cached.
 */
export function handleGeo(request: Request): Response {
  const cf = (request as Request & { cf?: IncomingRequestCfProperties }).cf;
  const body = {
    country: typeof cf?.country === 'string' ? cf.country : null,
    region: typeof cf?.regionCode === 'string' ? cf.regionCode : null,
  };
  return new Response(JSON.stringify(body), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'private, no-store',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}
