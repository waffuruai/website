import type { teamCopy } from './team';

const teamCopyFr: (typeof teamCopy)['en'] = {
  'kyle-croll': {
    role: 'Directeur général (CEO)',
    background:
      'Ancien militaire. Renseignement sur les menaces, stratégie IA et sécurité.',
    bio: 'Kyle est un ancien militaire, spécialisé dans le renseignement sur les menaces et la chasse aux menaces (threat hunting). En tant que CEO, il fixe la direction de Waffuru et apporte un regard de sécurité sur la façon dont l’IA est conçue et déployée. Il est titulaire d’un MBA de la McCombs School of Business, à UT Austin.',
  },
  'eric-gonzalez': {
    role: 'Directeur des revenus (CRO)',
    background:
      'A fait passer des entreprises de 50 M$ à 2 Md$ d’ARR. Ancien d’Oracle NetSuite.',
    bio: 'Eric est un dirigeant commercial qui a fait passer des entreprises de 50 M$ à 2 Md$ de revenus annuels récurrents (ARR). Il a travaillé chez Oracle NetSuite, puis chez Anaconda, l’entreprise derrière Conda, et il siège au conseil d’administration.',
  },
  'eric-kryski': {
    role: 'Directeur produit (CPO)',
    background:
      'Développeur full-stack, designer et chercheur en ML. Cofondateur de Bidali.',
    bio: 'Eric est développeur full-stack, designer et chercheur en ML, et il livre des produits de bout en bout. Il est directeur général et cofondateur de Bidali, cofondateur de Bullish Ventures, et il dirige le produit chez Waffuru.',
  },
  'tom-turney': {
    role: 'Directeur de la recherche',
    background:
      'Chercheur en IA derrière TurboQuant+. Ancien tech lead manager chez Google.',
    bio: 'Tom est le chercheur en IA derrière TurboQuant+, le travail de compression que Syrup utilise pour réduire la taille des embeddings, et il dirige la recherche chez Waffuru. Auparavant, il était tech lead manager chez Google.',
  },
  'cory-smith': {
    role: 'Directeur technique (CTO)',
    background:
      'A déjà mené une entreprise jusqu’à sa sortie. Cofondateur et CTO de Bidali.',
    bio: 'Cory a mené une entreprise jusqu’à sa sortie (exit) et il est cofondateur et CTO de Bidali, dont il a contribué à porter le volume de paiements en stablecoins à plusieurs millions. Il est managing director chez Bullish Ventures et construit des produits grand public et d’entreprise depuis 2009.',
  },
};

export default teamCopyFr;
