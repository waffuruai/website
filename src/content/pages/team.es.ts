import type { teamPage } from './team';

const teamPageEs: (typeof teamPage)['en'] = {
  seo: {
    title: 'Conoce a los fundadores y al equipo',
    description:
      'Las personas que construyen Waffuru: investigación, seguridad, ingresos y un par de fundadores que ya han llevado productos al mercado.',
    keywords: ['equipo de Waffuru', 'fundadores de Waffuru'],
  },
  hero: {
    label: 'Equipo',
    title: 'Quién está en la *cocina*.',
    lede: 'Investigación, seguridad, ingresos y un par de fundadores que ya han llevado productos al mercado.',
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
