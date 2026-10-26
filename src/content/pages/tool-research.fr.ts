import type { ToolResearchCopy } from './tool-research';

const copy: ToolResearchCopy = {
  animation: {
    title: 'Plus de précision. Moins de travail perdu ?',
    measured: 'Expérience mesurée',
    accuracy: 'Précision des arguments exacts',
    tokens: 'Tokens totaux d’inférence',
    scenario: 'Explorer les économies potentielles du flux',
    assumption:
      'Hypothèse illustrative : chaque tour de réparation évité économise 1,000 tokens sur ce lot de 144 requêtes. Ces économies ne sont pas mesurées.',
    repairs: 'Tours de réparation évités',
    estimate: 'Tokens du flux modélisé',
    difference: 'Écart de tokens avec la référence',
    replay: 'Rejouer l’animation',
    boundary:
      'La précision reste celle du résultat mesuré. Le curseur modifie uniquement le scénario de coût ; il ne prédit ni tâches terminées ni appels évités.',
  },
  eyebrow: 'Juke → Butter · recherche mesurée',
  title: 'De meilleurs appels d’outils.\n*Mesurés dans Butter.*',
  intro:
    'Un argument incorrect peut transformer un outil utile en action ratée. Nous utilisons Juke pour examiner l’exécution et le comportement, puis tester des changements ciblés de l’inférence. Une expérience native de Butter a corrigé davantage d’arguments sans réentraînement.',
  resultTitle: 'Réponses aux arguments exacts',
  baseline: 'Avant',
  candidate: 'Avec continuation native',
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
      body: 'Butter effectue une continuation bornée à partir de la fonction choisie et du schéma fourni. Elle apporte la structure, jamais les valeurs attendues.',
    },
    {
      title: 'Vérifier le résultat',
      body: 'Contrôler les arguments et leurs types exacts via l’API normale, en modes buffered et streaming. Conserver chaque réussite initiale et comptabiliser le travail supplémentaire.',
    },
  ],
  implication:
    'L’objectif est d’obtenir des actions fiables avec moins de travail perdu. Moins d’actions accidentelles, moins de tours de réparation et un coût total réduit restent les prochains résultats à mesurer.',
  details: 'Voir la méthode, le périmètre et les limites restantes',
  scopeTitle: 'Résultat expérimental de l’API native · 26 octobre 2026',
  scope:
    'L’évaluation élargie comporte 72 prompts, chacun testé en modes buffered et streaming : 144 requêtes par variante. Ce sont de nouvelles valeurs dans des familles d’échecs connues, pas 144 tâches indépendantes. Aucun outil externe n’a été exécuté.',
  method:
    'La référence et la variante utilisent les mêmes tokens initiaux, le même modèle et les mêmes ressources Iron, une température de 0 et un budget partagé de 512 tokens de génération. L’oracle vérifie les valeurs et types JSON exacts. Les 36 réussites initiales sont conservées ; les 20 gains correspondent à dix prompts d’unions de types scalaires dans les deux modes.',
  cost: 'La continuation ajoute 8 304 tokens d’entrée et 536 tokens générés sur l’évaluation élargie. Cette amélioration de la correction demande davantage de calcul d’inférence. Aucune réduction des tokens totaux, de la latence ou du coût par tâche terminée n’est démontrée.',
  limits:
    'Il s’agit d’une implémentation expérimentale de Swift Chat, pas d’une fonctionnalité publiée. Les tableaux imbriqués et les chaînes littérales restent non résolus dans cette évaluation. Les autres modèles, API, tâches complètes à plusieurs tours et appels inutiles exigent des validations distinctes.',
  source: 'Lire le dossier de recherche figé',
  sourceNote:
    'PR de recherche Butter #1508 · Un accès GitHub peut être nécessaire.',
};
export default copy;
