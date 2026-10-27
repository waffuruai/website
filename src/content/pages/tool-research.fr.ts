import type { ToolResearchCopy } from './tool-research';

const copy: ToolResearchCopy = {
  eyebrow: 'Mesuré dans Butter',
  title: 'Moins d’arguments faux.\n*Des bons moins chers.*',
  intro:
    'Un appel d’outil avec un argument faux échoue, déclenche une nouvelle tentative ou s’exécute avec la mauvaise valeur. Nous traçons l’exécution et le comportement, puis testons des changements ciblés de l’inférence. Sur une évaluation de 144 requêtes, le correctif Butter a produit {more} arguments exacts de plus et fait passer les tokens par argument correct d’environ {before} à environ {after}.',
  figure: {
    headline: 'Tokens par argument correct',
    baseline: 'Avant',
    candidate: 'Avec le correctif Butter',
    fewer: 'environ {percent}% de moins',
    unit: 'tokens',
    exact: 'Arguments exacts',
    totalTokens: 'Tokens totaux d’inférence',
    retained: 'Réussites initiales conservées',
    perAdditional: 'Coût par argument correct supplémentaire',
    development: 'Jeu de développement distinct',
    caption:
      'Évaluation : 72 prompts, chacun en mode buffered et streaming (144 requêtes par variante). Qwen3.5-0.8B Q4_K_M, température 0, M5 Max. Aucun outil externe n’a été exécuté. On mesure des valeurs d’arguments exactes, pas la fiabilité générale des tâches.',
  },
  wrongTitle: 'Ce que coûte un argument faux',
  wrongBody:
    'Une mauvaise valeur fait échouer l’appel, ce qui coûte un tour de modèle de plus et un aller-retour vers l’outil, ou s’exécute avec la mauvaise valeur, par exemple en écrivant ou en supprimant le mauvais chemin.',
  methodTitle: 'Des observations à un changement d’inférence',
  example: {
    label: 'Exemple illustratif de la famille d’échecs par mauvais type',
    controls: 'Étapes de la boucle de recherche',
    replay: 'Rejouer les étapes',
    schema: 'schéma',
    output: 'sortie du modèle',
    flag: 'chaîne, nombre attendu',
    inProgress: 'Exécution de la même évaluation de 144 requêtes',
    check: 'valeur et type exacts',
  },
  steps: [
    {
      title: 'Examiner l’échec',
      body: 'Capturer la réponse et identifier la représentation de l’argument qui a échoué.',
    },
    {
      title: 'Modifier le chemin d’inférence',
      body: 'Tester un changement ciblé de l’inférence avec la même évaluation, sans réentraîner le modèle.',
    },
    {
      title: 'Vérifier le résultat',
      body: 'Contrôler les arguments et leurs types exacts via l’API normale, en modes buffered et streaming. Conserver chaque réussite initiale et comptabiliser le travail supplémentaire.',
    },
  ],
  details: 'Voir les conditions et limites',
  scopeTitle: 'Résultat de l’API native · 26 octobre 2026',
  scope:
    'L’évaluation élargie comporte 72 prompts, chacun testé en modes buffered et streaming : 144 requêtes par variante. Ce sont de nouvelles valeurs dans des familles d’échecs connues, pas 144 tâches indépendantes. Aucun outil externe n’a été exécuté.',
  cost: 'Le changement ajoute 8 304 tokens d’entrée et 536 tokens générés sur l’évaluation élargie : les tokens totaux d’inférence passent de 50 382 à 59 222 tandis que les tokens par argument correct baissent.',
  limits:
    'Ces résultats se limitent à cette évaluation de valeurs exactes d’arguments ; autres modèles, API et tâches complètes en sont exclus.',
};
export default copy;
