/**
 * The visitor's location, used only to pick the cookie consent tier
 * (`src/lib/consent.ts`). The Worker answers `GET /api/geo` from Cloudflare's
 * edge metadata (`worker/geo.ts`); nothing is stored server side. Everything
 * that crosses a trust boundary (the response body, the session cache) goes
 * through `parseGeo`, so the rest of the code only sees clean values.
 */

export type Geo = {
  /** ISO 3166-1 alpha-2 country code, e.g. `CA`. */
  country: string | null;
  /** Subdivision code without the country prefix, e.g. `QC`. */
  region: string | null;
};

/** No location: local dev, a failed lookup, or an unknown network. */
export const UNKNOWN_GEO: Geo = { country: null, region: null };

const COUNTRY = /^[A-Z]{2}$/;
const REGION = /^[A-Z0-9]{1,3}$/;

/** Uppercases and validates a country code; `XX` (unknown) becomes null. */
export const normalizeCountry = (value: unknown): string | null => {
  if (typeof value !== 'string') return null;
  const code = value.trim().toUpperCase();
  return COUNTRY.test(code) && code !== 'XX' ? code : null;
};

/** Accepts `QC` or `CA-QC` and returns `QC`. */
export const normalizeRegion = (value: unknown): string | null => {
  if (typeof value !== 'string') return null;
  const code = value
    .trim()
    .toUpperCase()
    .replace(/^[A-Z]{2}-/, '');
  return REGION.test(code) ? code : null;
};

/**
 * Reads a `{ country, region }` object of unknown origin. Anything that is
 * not a valid code becomes null, and a region without a country is dropped.
 */
export const parseGeo = (value: unknown): Geo => {
  if (!value || typeof value !== 'object') return UNKNOWN_GEO;
  const { country, region } = value as Record<string, unknown>;
  const code = normalizeCountry(country);
  return code
    ? { country: code, region: normalizeRegion(region) }
    : UNKNOWN_GEO;
};
