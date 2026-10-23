import { describe, expect, it } from 'vitest';

import {
  UNKNOWN_GEO,
  normalizeCountry,
  normalizeRegion,
  parseGeo,
} from '@/lib/visitor-geo';

describe('visitor geo', () => {
  it('normalizes country and subdivision codes', () => {
    expect(normalizeCountry(' ca ')).toBe('CA');
    expect(normalizeCountry('Canada')).toBeNull();
    expect(normalizeCountry('XX')).toBeNull();
    expect(normalizeCountry('T1')).toBeNull();
    expect(normalizeCountry(undefined)).toBeNull();
    expect(normalizeRegion('CA-QC')).toBe('QC');
    expect(normalizeRegion('on')).toBe('ON');
    expect(normalizeRegion('Quebec')).toBeNull();
    expect(normalizeRegion(null)).toBeNull();
  });

  it('parses the /api/geo body', () => {
    expect(parseGeo({ country: 'CA', region: 'QC' })).toEqual({
      country: 'CA',
      region: 'QC',
    });
    expect(parseGeo({ country: 'us', region: null })).toEqual({
      country: 'US',
      region: null,
    });
  });

  it('turns anything else into an unknown location', () => {
    for (const value of [
      null,
      undefined,
      'US',
      42,
      [],
      {},
      { country: null, region: 'QC' },
      { country: 'XX', region: 'QC' },
      { country: { code: 'US' } },
    ]) {
      expect(parseGeo(value)).toEqual(UNKNOWN_GEO);
    }
    expect(parseGeo({ country: 'US', region: 'Texas' })).toEqual({
      country: 'US',
      region: null,
    });
  });
});
