import nextMDX from '@next/mdx';
import type { NextConfig } from 'next';
import { PHASE_PRODUCTION_BUILD } from 'next/constants';

import { mdxOptions } from './src/mdx/options.mjs';

/**
 * Static export for production builds: every page is prerendered HTML and the
 * Cloudflare Worker (worker/index.ts) maps unprefixed English URLs onto the
 * `out/en/…` files. `next dev` has no Worker, so in dev the same mapping is
 * a pair of rewrites (export mode ignores rewrites, hence the phase switch).
 */
const config = (phase: string): NextConfig => {
  const exporting = phase === PHASE_PRODUCTION_BUILD;

  return {
    ...(exporting ? { output: 'export' } : {}),
    trailingSlash: false,
    poweredByHeader: false,
    reactStrictMode: true,
    pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
    // No optimizer in a static export: `scripts/build-images.mjs` prebuilds
    // every size and `<Picture>` emits the srcsets.
    images: { unoptimized: true },
    allowedDevOrigins: ['127.0.0.1'],
    ...(exporting
      ? {}
      : {
          async rewrites() {
            // Non-capturing: Next rejects capturing groups in rewrite sources.
            const prefixed = '(?:en|es|fr|zh|ja|ko)';
            return {
              beforeFiles: [
                { source: '/', destination: '/en' },
                {
                  source: `/:path((?!${prefixed}(?:/|$)|_next/|api/|.*\\..*).*)`,
                  destination: '/en/:path',
                },
              ],
              afterFiles: [],
              fallback: [],
            };
          },
        }),
  };
};

// Turbopack serialises loader options, so plugins are referenced by module name
// or absolute path (see src/mdx/options.mjs).
const withMDX = nextMDX({
  extension: /\.mdx?$/,
  options: mdxOptions,
});

const nextConfig = (phase: string) => withMDX(config(phase));

export default nextConfig;
