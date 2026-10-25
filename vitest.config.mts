import mdx from '@mdx-js/rollup';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [
    {
      enforce: 'pre',
      ...mdx({ providerImportSource: '@mdx-js/react' }),
    },
  ],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    include: [
      'src/**/*.test.{ts,tsx}',
      'worker/**/*.test.ts',
      'scripts/**/*.test.mjs',
    ],
    exclude: [
      'node_modules/**',
      '.next/**',
      'out/**',
      '_site/**',
      '.claude/**',
    ],
    css: false,
    // The on-disk transform cache keys on a file's own content, so a module
    // whose dynamic import globs over other files (blog posts) keeps a stale
    // file list when posts are added. The suite is fast enough without it.
    fsModuleCache: false,
    passWithNoTests: false,
  },
});
