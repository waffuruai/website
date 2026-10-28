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
    lede: 'Des bâtisseurs expérimentés, issus de la cybersécurité, de l’armée, du grand public et de l’entreprise. Nous avons créé et fait grandir des startups, et travaillé avec tout le monde, des petites entreprises aux grands groupes.',
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
    body: 'Pantry est gratuit et open source dès aujourd’hui. Notre stack d’inférence IA est en accès anticipé privé : demandez un accès pour l’essayer, ou parlez-nous de vos besoins.',
  },
};

export default teamPageFr;
