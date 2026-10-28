import type { teamPage } from './team';

const teamPageEs: (typeof teamPage)['en'] = {
  seo: {
    title: 'Conoce a los fundadores y al equipo',
    description:
      'Las personas que construyen Waffuru, con experiencia en ciberseguridad, el sector militar, el consumo y la empresa, desde escalar startups hasta trabajar con pequeños negocios y grandes empresas.',
    keywords: ['equipo de Waffuru', 'fundadores de Waffuru'],
  },
  hero: {
    label: 'Equipo',
    title: 'Quién está en la *cocina*.',
    lede: 'Ciberseguridad, sector militar, consumo y empresa. Hemos creado y escalado startups, y hemos trabajado con todos, desde pequeños negocios hasta grandes empresas.',
  },
  portraitAlt: 'Retrato de {name}',
  linkAria: '{name} en {network}',
  linkNames: {
    linkedin: 'LinkedIn',
    website: 'Sitio web',
    x: 'X',
    github: 'GitHub',
  },
  cta: {
    title: 'Mira lo que estamos *cocinando*.',
    body: 'Nuestros productos son privados por ahora. Solicita acceso anticipado para probarlos o cuéntanos qué necesitas.',
  },
};

export default teamPageEs;
