import type { SpeculativeResearchCopy } from './speculative-research';
const copy: SpeculativeResearchCopy = {
  metrics: {
    sampling: 'Mode de tirage',
    metric: 'Mesure',
    comparison: 'Résultats de concurrence enregistrés',
    aggregation: 'Agrégation',
    requests: 'Requêtes simultanées',
    burst: 'Débit de rafale entière',
    lane: 'Décodage par requête',
    concurrentTtft: 'Temps jusqu’au premier token p50',
    concurrentTtftP90: 'Temps jusqu’au premier token p90',
    prefill: 'Préremplissage',
  },
  aggregation: {
    burst:
      'Tokens de sortie totaux sur la durée réelle de la rafale, trois exécutions par niveau',
    perRequest: 'Médiane par requête sur trois exécutions',
    ttft: 'Sur toutes les requêtes de trois exécutions',
    prefill: 'Sur trois exécutions par niveau',
  },
  eyebrow: 'Mesuré sur Apple silicon · du 18 au 26 octobre 2026',
  title: '27B.\n*8 requêtes. Un Mac.*',
  intro:
    'Gardez vos agents locaux actifs, même lorsque les requêtes se chevauchent. Butter et Iron combinent kernels Metal natifs, décodage spéculatif et vérification partagée. Voici nos mesures sur un M5 Max.',
  greedy: 'Glouton · T0',
  sampled: 'Échantillonné · T0.7',
  unit: 'tok/s',
  singleTitle: 'Une requête active',
  singleScope: 'Environ 937 tokens en entrée · sortie plafonnée à 600 tokens',
  burstTitle: '8 requêtes simultanées',
  burstScope: 'Rafale entière · préremplissage et fin de traitement inclus',
  scalingTitle: 'Débit de rafale entière quand les requêtes se chevauchent',
  scalingScope:
    'Trois exécutions par niveau · mêmes prompts, nouveau serveur par niveau',
  perRequest: 'Par requête',
  ttft: 'Temps jusqu’au premier token',
  p50: 'p50',
  p90: 'p90',
  gainHeading: 'Gain d’optimisation, exécutions appariées',
  gainTitle: 'Décodage plus rapide, toutes requêtes actives',
  gainScope: 'Gain toutes requêtes actives · essais simultanés appariés',
  before: 'Avant',
  after: 'Après',
  activeTitle: 'Même modèle. Moins de travail répété.',
  activeScope:
    'Seul compte l’intervalle où toutes les requêtes décodent. Ces essais sont distincts des résultats de rafale entière ci-dessus.',
  replay: 'Rejouer le flux',
  illustration: 'Fonctionnement · schéma',
  privateLanes: 'État privé par requête',
  sharedVerify: 'Vérification partagée par la cible',
  committed: 'Les tokens vérifiés avancent',
  diagramNote:
    'Les requêtes simultanées partagent un système local d’inférence. Cette animation conceptuelle illustre le traitement concurrent, sans décrire la planification interne, les durées ou les acceptations.',
  details: 'Voir les conditions et limites',
  method:
    'Qwen3.8-27B affine 4-bit/group64 + DFlash2, M5 Max 128 GiB, Metal, KV BF16 brut. Exécutions de concurrence, 26 octobre 2026 : trois exécutions à chaque niveau de 1, 2, 4 et 8 requêtes simultanées, environ 937 tokens en entrée par requête et sortie plafonnée à 600, nouveau serveur à chaque niveau et aucun préfixe réutilisé dans les mesures. Le débit de rafale entière divise les tokens de sortie totaux par la durée réelle de la rafale, préremplissage et fin de traitement inclus. Les essais d’optimisation appariés du 18 octobre 2026 utilisent le mode glouton et T0.7 ; T0.7 utilise top-p 0.95, top-k 20 et min-p 0.',
  cost: 'Les essais d’optimisation appariés utilisent 882 à 999 tokens en entrée et une sortie plafonnée à 600 : trois paires gloutonnes et huit échantillonnées. Le temps p50 au premier token échantillonné passe de 9.030 à 9.397 secondes. Gain de débit, pas amélioration uniforme de latence.',
  qualification:
    'Les essais gloutons appariés conservent les textes et comptes des 48 réponses candidates. Une reproduction agentique distincte conserve 111/111 réponses et comptes sans améliorer la latence. Ces charges ne démontrent ni qualité générale, ni précision des outils, ni baisse du nombre de tokens.',
};
export default copy;
