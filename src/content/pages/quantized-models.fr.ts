import type { QuantizedModelsCopy } from './quantized-models';

const copy: QuantizedModelsCopy = {
  eyebrow: 'Modèles quantifiés · bientôt',
  title: 'Des modèles quantifiés *avec soin*',
  intro:
    'Nous préparons des versions quantifiées des modèles que Butter sert, produites avec la même méthode que notre recherche ouverte TurboQuant+ sur les poids. Des fichiers plus petits, une qualité qui tient et la marge pour en faire tourner davantage à la fois.',
  method: {
    heading: 'Comment nous quantifions',
    items: [
      {
        title: 'Couche par couche',
        body: 'Chaque couche reçoit sa propre précision au lieu d’un seul réglage pour tout le modèle.',
      },
      {
        title: 'Couches de bord protégées',
        body: 'La première et la dernière couche restent en précision plus élevée. Ce sont les plus sensibles, pour les poids comme pour le cache KV.',
      },
      {
        title: 'La précision suit le rôle du tenseur',
        body: 'L’attention et les projections de lecture du FFN se compressent bien. Les projections d’écriture comme ffn_down gardent un format natif.',
      },
      {
        title: 'Poids et KV sur un même budget',
        body: 'La précision des poids et celle du cache KV sont choisies comme un seul budget mémoire, puis comparées à la référence non quantifiée avant toute publication.',
      },
    ],
  },
  tiles: {
    heading: 'Ce que la méthode a donné dans notre recherche ouverte',
    scope:
      'Mesuré avec TurboQuant+ sur notre fork de llama.cpp, llama-cpp-turboquant.',
    weights: {
      label: 'de fichiers de modèle en moins',
      detail: 'de perplexité par rapport à l’original 8 bits',
    },
    stacked: {
      label: 'de mémoire totale en moins avec poids et KV compressés ensemble',
      detail:
        'de perplexité par rapport à des poids 8 bits et un cache 16 bits',
    },
    source: 'Source',
    paper: 'Lire l’article sur la compression des poids',
  },
  strip: {
    label: 'Comment la précision est répartie',
    note: 'Schéma. La première et la dernière couche gardent la précision complète ; les autres sont colorées selon le rôle du tenseur. Le nombre réel de couches et les politiques varient selon le modèle.',
    legend: {
      boundary: 'Couche de bord · précision plus élevée',
      attention: 'Attention · compressée',
      ffnRead: 'FFN gate et up · compressées',
      ffnDown: 'FFN down · 4 bits natif',
    },
    first: 'Premières couches',
    last: 'Dernières couches',
  },
  soon: {
    heading: 'Bientôt',
    body: 'Les premières versions arrivent bientôt. Chacune est publiée avec son modèle de base, son format, sa taille par rapport à la référence et les contrôles de qualité qu’elle a passés.',
    // Variante B, sans le nom :
    // 'Elles s’amélioreront avec le temps, mesurées avec nos propres outils de profilage et d’évaluation.'
    tooling:
      'Elles s’amélioreront avec le temps, mesurées avec Juke, notre banc de profilage et d’évaluation.',
    cta: 'Me prévenir',
  },
};

export default copy;
