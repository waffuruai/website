import type { ProductFacts, ProductSlug } from '@/content/pages/products/types';

/*
 * What never translates about each product: name, place in the stack, route,
 * which secondary call to action it carries, and any code sample. The words
 * live in `iron.ts`, `butter.ts`, `syrup.ts` and `whisk.ts`.
 */
export const productFacts: Record<ProductSlug, ProductFacts> = {
  iron: {
    slug: 'iron',
    index: '01',
    name: 'Iron',
    path: '/products/iron',
    secondaryCta: 'docs',
    // The kernel is in the page's KernelCode section (`../kernel-code.ts`).
  },
  butter: {
    slug: 'butter',
    index: '02',
    name: 'Butter',
    path: '/products/butter',
    secondaryCta: 'docs',
    code: {
      filename: 'terminal',
      label: 'butter · illustrative',
      language: 'shell',
      // TODO(founder): confirm the `butter serve` arguments, the default port
      // and the model naming. The snippet uses placeholders so it stays true
      // whatever they are, and it is captioned as illustrative on the page.
      source: `$ butter serve <model>

$ curl http://localhost:<port>/v1/chat/completions \\
    -H "Content-Type: application/json" \\
    -d '{
      "model": "<model>",
      "messages": [{ "role": "user", "content": "Hello" }],
      "stream": true
    }'`,
    },
  },
  syrup: {
    slug: 'syrup',
    index: '03',
    name: 'Syrup',
    path: '/products/syrup',
    secondaryCta: 'sales',
  },
  whisk: {
    slug: 'whisk',
    index: '04',
    name: 'Whisk',
    path: '/products/whisk',
    secondaryCta: 'sales',
  },
};

/** Stack order, from the metal up: Iron (01) to Whisk (04). */
export const productsBottomUp: ProductFacts[] = [
  productFacts.iron,
  productFacts.butter,
  productFacts.syrup,
  productFacts.whisk,
];

/** Overview order, top of the stack first: Whisk (04) down to Iron (01). */
export const productsTopDown: ProductFacts[] = [...productsBottomUp].reverse();

/** Where each audience card on the overview points. */
export const audienceHrefs = {
  smallBusiness: '/solutions/small-business',
  enterprise: '/solutions/enterprise',
  neoclouds: '/solutions/neoclouds',
  aiCompanies: '/solutions/ai-companies',
} as const;
