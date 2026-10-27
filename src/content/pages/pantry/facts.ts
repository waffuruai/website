/*
 * Facts about Pantry, our free, open-source vulnerability scanner. The
 * product is Pantry; the command and the repository are `wscanner`, and its
 * installer is served at /wscanner/install.sh (releases/products.json). Copy
 * lives in `pantry.ts`; these never translate.
 */
export const pantryFacts = {
  name: 'Pantry',
  command: 'wscanner',
  path: '/products/pantry',
  repo: 'https://github.com/waffuruai/wscanner',
  installer: 'https://waffuru.ai/wscanner/install.sh',
  install: 'curl -fsSL https://waffuru.ai/wscanner/install.sh | sh',
  license: 'Apache-2.0',
  platforms: ['macOS', 'Linux'],
} as const;
