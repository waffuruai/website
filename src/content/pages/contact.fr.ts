import type { contact } from './contact';

const contactFr: (typeof contact)['en'] = {
  seo: {
    title: 'Contact',
    description:
      'Contactez Waffuru pour les ventes, les partenariats, la presse, le support, un signalement de sécurité ou le recrutement, ou demandez un accès anticipé.',
    keywords: [
      'contacter Waffuru',
      'vente d’infrastructure IA',
      'partenariats',
      'presse Waffuru',
      'accès anticipé Waffuru',
    ],
  },
  hero: {
    label: 'Contact',
    title: 'Dites-nous ce que vous *construisez*.',
    lede: 'Ventes et partenariats arrivent à sales@waffuru.ai, les signalements de sécurité à security@waffuru.ai, et presse, support et recrutement à hello@waffuru.ai. Choisissez le sujet qui convient.',
  },
  callouts: {
    title: 'Choisissez une *porte*.',
    intro:
      'Aucun formulaire à remplir. Chaque bouton ouvre un e-mail dont l’objet est déjà renseigné.',
    emailLabel: 'Nous écrire',
    items: [
      {
        subject: 'Sales',
        title: 'Ventes',
        body: 'Vous faites tourner des modèles sur votre propre matériel, ou sur toute une flotte ? Dites-nous la charge de travail et où elle tourne.',
      },
      {
        subject: 'Partnerships',
        title: 'Partenariats',
        body: 'Fabricants de matériel, neoclouds et équipes de modèles : dites-nous ce que vous aimeriez construire ensemble.',
      },
      {
        subject: 'Press',
        title: 'Presse',
        body: 'Vous écrivez sur l’IA locale, les logiciels GPU ou les personnes qui les construisent ? Nous en parlerons volontiers.',
      },
      {
        subject: 'Support',
        title: 'Support',
        body: 'Quelque chose ne marche pas ou n’est pas clair ? Envoyez-nous votre matériel, ce que vous avez lancé et ce qui s’est passé.',
      },
      {
        subject: 'Security',
        title: 'Sécurité',
        body: 'Vous avez trouvé une vulnérabilité ? Dites-le-nous en privé et laissez-nous le temps de la corriger avant qu’elle ne soit rendue publique.',
      },
      {
        subject: 'Hiring',
        title: 'Recrutement',
        body: 'Envie de nous aider à construire la stack ? Dites-nous ce que vous avez livré et sur quoi vous aimeriez travailler.',
      },
    ],
  },
  earlyAccess: {
    title: 'Envie de l’avoir en *premier* ?',
    body: 'Nos produits sont en accès anticipé privé. Dites-nous ce que vous voulez faire tourner, et sur quel matériel, et nous vous écrirons quand nous aurons quelque chose qui convient.',
  },
};

export default contactFr;
