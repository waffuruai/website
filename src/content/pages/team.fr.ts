import type { teamPage } from './team';

const teamPageFr: (typeof teamPage)['en'] = {
  seo: {
    title: 'Les fondateurs et l’équipe',
    description:
      'Les personnes qui construisent Waffuru, avec une expérience de la cybersécurité, de l’armée, du grand public et de l’entreprise : elles ont fait grandir des startups et travaillé aussi bien avec des petites entreprises qu’avec de grands groupes.',
    keywords: ['équipe Waffuru', 'fondateurs Waffuru'],
  },
  hero: {
    label: 'Équipe',
    title: 'Qui est en *cuisine*.',
    lede: 'Cybersécurité, armée, grand public et entreprise. Nous avons créé et fait grandir des startups, et travaillé avec tout le monde, des petites entreprises aux grands groupes.',
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
