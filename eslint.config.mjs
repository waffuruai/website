import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import prettier from 'eslint-config-prettier/flat';

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  prettier,
  {
    rules: {
      '@next/next/no-img-element': 'warn',
      'react/no-unescaped-entities': 'off',
      'react-hooks/refs': 'warn',
      'react-hooks/set-state-in-effect': 'warn',
      '@typescript-eslint/no-unused-vars': ['warn', { caughtErrors: 'none' }],
    },
  },
  {
    files: ['scripts/**/*.{js,mjs}'],
    languageOptions: {
      sourceType: 'module',
      globals: { process: 'readonly', console: 'readonly' },
    },
  },
  globalIgnores([
    '.next/**',
    'out/**',
    '_site/**',
    '.wrangler/**',
    'design/**',
    'public/**',
    'next-env.d.ts',
    'coverage/**',
    'src/generated/**',
  ]),
]);
