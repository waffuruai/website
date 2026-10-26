import type { ToolResearchCopy } from './tool-research';

const copy: ToolResearchCopy = {
  neural: {
    label: 'Boucle de recherche · vue conceptuelle',
    replay: 'Rejouer le signal',
    controls: 'Explorer les étapes de recherche',
    note: 'Une métaphore visuelle de la recherche, pas une capture d’activations neuronales. Les résultats mesurés figurent à côté.',
  },
  animation: {
    title: 'De meilleurs arguments. Plus de calcul.',
    measured: 'Compromis mesuré · mêmes 144 requêtes',
    accuracy: 'Précision des arguments exacts',
    tokens: 'Tokens totaux d’inférence',
    replay: 'Rejouer l’animation',
    boundary:
      'La continuation améliore les arguments exacts avec davantage de calcul. Les économies de tokens du flux et le coût par tâche terminée ne sont pas démontrés.',
    accuracyGain: 'réponses exactes supplémentaires',
    tokenOverhead: 'tokens d’inférence supplémentaires',
  },
  eyebrow: 'Juke → Butter · recherche mesurée',
  title: 'De meilleurs appels d’outils.\n*Mesurés dans Butter.*',
  intro:
    'Un argument incorrect peut transformer un outil utile en action ratée. Nous utilisons Juke pour examiner l’exécution et le comportement, puis tester des changements ciblés de l’inférence. Une expérience native de Butter a corrigé davantage d’arguments sans réentraînement.',
  resultTitle: 'Réponses aux arguments exacts',
  baseline: 'Avant',
  candidate: 'Avec des modifications expérimentales',
  denominator: 'correctes / requêtes',
  gain: '20 réponses correctes supplémentaires',
  retained: 'Réussites initiales conservées',
  development: 'Jeu de développement distinct',
  methodTitle: 'Des observations à un changement d’inférence',
  steps: [
    {
      title: 'Examiner l’échec',
      body: 'Capturer la réponse et identifier la représentation de l’argument qui a échoué.',
    },
    {
      title: 'Modifier le chemin d’inférence',
      body: 'Tester une amélioration ciblée avec la même évaluation, sans réentraîner le modèle.',
    },
    {
      title: 'Vérifier le résultat',
      body: 'Contrôler les arguments et leurs types exacts via l’API normale, en modes buffered et streaming. Conserver chaque réussite initiale et comptabiliser le travail supplémentaire.',
    },
  ],
  implication:
    'L’objectif est d’obtenir des actions fiables avec moins de travail perdu. Moins d’actions accidentelles, moins de tours de réparation et un coût total réduit restent les prochains résultats à mesurer.',
  details: 'Voir les conditions et limites',
  scopeTitle: 'Résultat expérimental de l’API native · 26 octobre 2026',
  scope:
    'L’évaluation élargie comporte 72 prompts, chacun testé en modes buffered et streaming : 144 requêtes par variante. Ce sont de nouvelles valeurs dans des familles d’échecs connues, pas 144 tâches indépendantes. Aucun outil externe n’a été exécuté.',
  cost: 'La continuation ajoute 8 304 tokens d’entrée et 536 tokens générés sur l’évaluation élargie. Cette amélioration de la correction demande davantage de calcul d’inférence. Aucune réduction des tokens totaux, de la latence ou du coût par tâche terminée n’est démontrée.',
  limits:
    'Cette capacité est expérimentale et non publiée. Ces résultats se limitent à cette évaluation ; autres modèles, API et tâches complètes exigent une validation distincte.',
};
export default copy;
