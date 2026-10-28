import type { teamCopy } from './team';

const teamCopyFr: (typeof teamCopy)['en'] = {
  'kyle-croll': {
    role: 'Directeur général (CEO)',
    background:
      'Ancien de la Marine américaine, titulaire d’un MBA de McCombs. Renseignement sur les menaces, stratégie IA et sécurité.',
    bio: 'Kyle fixe la direction de Waffuru et apporte un regard de sécurité sur la façon dont l’IA est conçue et déployée. Il a servi dans la Marine américaine, avec une expérience du renseignement sur les menaces et de la chasse aux menaces (threat hunting), puis a obtenu un MBA à la McCombs School of Business, à UT Austin.',
  },
  'eric-gonzalez': {
    role: 'Directeur des revenus (CRO)',
    background:
      'A fait passer des entreprises de 50 M$ à 2 Md$ d’ARR. Ancien d’Oracle NetSuite et d’Anaconda.',
    bio: 'Eric est responsable des revenus chez Waffuru. Il a fait passer des entreprises de 50 M$ à 2 Md$ de revenus annuels récurrents (ARR), a travaillé chez Oracle NetSuite et chez Anaconda, l’entreprise derrière Conda, et siège à un conseil d’administration.',
  },
  'eric-kryski': {
    role: 'Directeur produit (CPO)',
    background:
      'Développeur full-stack, designer et chercheur en ML. Cofondateur de Bidali.',
    bio: 'Eric dirige le produit et la stratégie chez Waffuru, et livre le produit de bout en bout, du design au code jusqu’à la recherche en ML. Il est directeur général et cofondateur de Bidali, et cofondateur de Bullish Ventures.',
  },
  'tom-turney': {
    role: 'Directeur de la recherche',
    background:
      'Chercheur en IA derrière TurboQuant+. Ancien tech lead manager chez Google.',
    bio: 'Tom dirige la recherche chez Waffuru. Il a passé près de dix ans chez Google à un poste technique senior. Après son départ, il a cofondé une startup d’IA et publié la première implémentation fonctionnelle de TurboQuant, l’algorithme de compression de Google, avant de montrer qu’il pouvait faire mieux avec TurboQuant+. Chez Waffuru, ses travaux couvrent la compression, la performance, la gestion du contexte et la mémoire.',
  },
  'cory-smith': {
    role: 'Directeur technique (CTO)',
    background:
      'CTO de startup, les mains dans le cambouis. Une sortie, un échec. CTO de Bidali.',
    bio: 'Cory dirige la technologie chez Waffuru. CTO de startup aguerri, full-stack et les mains dans le cambouis, il a derrière lui une sortie (exit) et un échec. Il est cofondateur et CTO de Bidali, dont il a contribué à porter le volume de paiements en stablecoins à plusieurs millions. Il construit des produits grand public et d’entreprise depuis 2009.',
  },
};

export default teamCopyFr;
