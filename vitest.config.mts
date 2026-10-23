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
    passWithNoTests: false,
  },
});
