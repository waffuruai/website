import type { teamPage } from './team';

const teamPageFr: (typeof teamPage)['en'] = {
  seo: {
    title: 'Les fondateurs et l’équipe',
    description:
      'Les personnes qui construisent Waffuru : de la recherche, de la sécurité, des ventes, et quelques fondateurs qui ont déjà livré des produits.',
    keywords: ['équipe Waffuru', 'fondateurs Waffuru'],
  },
  hero: {
    label: 'Équipe',
    title: 'Qui est en *cuisine*.',
    lede: 'De la recherche, de la sécurité, des ventes, et quelques fondateurs qui ont déjà livré des produits.',
  },
  portraitAlt: 'Portrait de {name}',
  linkAria: '{name} sur {network}',
  linkNames: {
    linkedin: 'LinkedIn',
    website: 'Site web',
    x: 'X',
    github: 'GitHub',
  },
  cta: {
    title: 'Voyez ce qui *mijote*.',
    body: 'Nos produits sont privés pour l’instant. Demandez un accès anticipé pour les essayer, ou parlez-nous de vos besoins.',
  },
};

export default teamPageFr;
