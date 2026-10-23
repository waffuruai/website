import type { MetadataRoute } from 'next';

import { site } from '@/content/site';

export const dynamic = 'force-static';

/** Web app manifest: name, colours and home-screen icons. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: site.name,
    description: site.description,
    start_url: '/',
    display: 'browser',
    background_color: '#0a0908',
    theme_color: '#0a0908',
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/img/brand/waffle-384.png', sizes: '384x384', type: 'image/png' },
    ],
  };
}
