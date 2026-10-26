import type { SpeculativeResearchCopy } from './speculative-research';
const copy: SpeculativeResearchCopy = {
  metrics: {
    sampling: 'Mode de tirage',
    metric: 'Mesure',
    comparison: 'Médianes de charges distinctes',
    prefill: 'Préremplissage un flux',
    singleTtft: 'TTFT un flux',
    lane: 'Décodage médian par requête simultanée',
    concurrentTtft: 'TTFT simultané médian',
  },
  eyebrow: 'Mesuré sur Apple silicon · 19 octobre 2026',
  title: '27B.\n*16 requêtes. Un Mac.*',
  intro:
    'Gardez vos agents locaux actifs, même lorsque les requêtes se chevauchent. Butter et Iron combinent kernels Metal natifs, décodage spéculatif et vérification partagée. Voici nos mesures sur un M5 Max.',
  greedy: 'Glouton · T0',
  sampled: 'Échantillonné · T0.7',
  unit: 'tok/s',
  singleTitle: 'Une requête active',
  singleScope: '2,052 tokens en entrée · sortie plafonnée à 128 tokens',
  burstTitle: '16 requêtes simultanées',
  burstScope: 'Rafale entière · préremplissage et fin de traitement inclus',
  gainTitle: 'Décodage plus rapide, toutes requêtes actives',
  gainScope: 'Gain toutes requêtes actives · essais appariés de 16 requêtes',
  before: 'Avant',
  after: 'Après',
  activeTitle: 'Même modèle. Moins de travail répété.',
  activeScope:
    'Seul compte l’intervalle où toutes les requêtes décodent. Ces essais sont distincts du résultat de rafale entière ci-dessus.',
  replay: 'Rejouer le flux',
  illustration: 'Fonctionnement · schéma',
  privateLanes: 'État privé par requête',
  sharedVerify: 'Vérification partagée par la cible',
  committed: 'Les tokens vérifiés avancent',
  diagramNote:
    '16 requêtes tournent en cohortes de 8 au maximum. La cible vérifie les propositions ; chaque requête conserve cache, état récurrent et échantillonneur. Animation architecturale, pas une mesure du temps ou de l’acceptation.',
  details: 'Voir l’ingénierie, les conditions et les preuves',
  method:
    'Qwen3.8-27B affine 4-bit/group64 + DFlash2, M5 Max 128 GiB, Metal, KV BF16 brut. Un flux : trois exécutions, 2,052 tokens en entrée et sortie plafonnée à 128. Rafale : trois exécutions de 16 requêtes, environ 937 tokens en entrée par requête et sortie plafonnée à 600. Nouveaux serveurs, échauffements exclus ; aucun préfixe réutilisé dans les mesures. T0.7 utilise top-p 0.95, top-k 20 et min-p 0.',
  cost: 'Essais appariés : 882–999 tokens en entrée, sortie plafonnée à 600, trois paires gloutonnes et huit échantillonnées. Le temps p50 au premier token échantillonné passe de 9.030 à 9.397 secondes. Gain de débit, pas amélioration uniforme de latence.',
  qualification:
    'Les essais gloutons conservent les textes et comptes des 48 réponses candidates. Une reproduction agentique distincte conserve 111/111 réponses et comptes sans améliorer la latence. Ces charges ne démontrent ni qualité générale, ni précision des outils, ni baisse du nombre de tokens.',
  sources: 'PR sources et Reproduce with Butter',
  steps: [
    {
      title: 'Arithmétique native, ligne par ligne',
      body: 'Calcul sériel et vérification par lots partagent les ordres de réduction. Attention et état récurrent suivent les ancêtres des propositions ; seul le chemin accepté est validé.',
    },
    {
      title: 'La cible décide du tirage',
      body: 'T0 utilise une vérification gloutonne. T0.7 tire dans la distribution cible et suit une branche seulement si elle correspond au tirage. Chaque requête possède son aléatoire.',
    },
    {
      title: 'Partager le travail, isoler l’état',
      body: 'Coût mesuré et acceptation observée répartissent les lignes. La cohorte prépare, vérifie et finalise ensemble ; caches, historiques et échantillonneurs restent privés.',
    },
    {
      title: 'Préparer le brouillon au bon moment',
      body: 'Une ligne exécute toujours la cible. Ses caractéristiques restent dans un tampon borné jusqu’au prochain brouillon ou au remplissage, sans sauter de vérification.',
    },
  ],
};
export default copy;
