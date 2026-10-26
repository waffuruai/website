import type { AuraCopy } from './aura';

const copy: AuraCopy = {
  eyebrow: 'Compression du cache KV · issue de notre recherche ouverte',
  title: 'Plus de contexte par *gigaoctet*.',
  intro:
    'AURA compresse le cache KV, de sorte que des contextes plus longs et davantage de sessions simultanées tiennent dans la même mémoire. Né de notre recherche ouverte TurboQuant+, il tourne aujourd’hui nativement dans Iron et Butter.',
  lineage: {
    heading: 'D’où il vient',
    steps: [
      {
        kicker: '01 · Recherche ouverte',
        title: 'TurboQuant+',
        body: 'La principale implémentation open source de l’article TurboQuant (Google Research, ICLR 2026) avec des résultats complémentaires : compresser les valeurs ne coûte presque rien, la perte de qualité vient des clés, et la première et la dernière couche doivent être protégées. Livrée dans notre fork de llama.cpp, llama-cpp-turboquant.',
      },
      {
        kicker: '02 · Adoptée en amont',
        title: 'vLLM et Apple MLX',
        body: 'La même recherche est entrée dans vLLM comme dtype de cache KV et dans Apple mlx-swift-lm comme schéma de cache KV, tous deux fusionnés en 2026.',
      },
      {
        kicker: '03 · Dans notre pile',
        title: 'AURA dans Iron et Butter',
        body: 'Réécrite pour nos propres kernels et notre serveur. Elle s’éloigne désormais assez de l’article pour porter son propre nom.',
      },
    ],
  },
  tiles: {
    heading: 'Résultats publics de notre recherche ouverte',
    scope:
      'Mesurés avec TurboQuant+ sur notre fork de llama.cpp, llama-cpp-turboquant. Ce ne sont pas des chiffres Butter.',
    turbo4: {
      label: 'de compression KV au réglage de meilleure qualité',
      detail: 'de perplexité par rapport à q8_0',
    },
    turbo3: {
      label: 'de compression KV à un réglage plus compact',
      detail: 'de perplexité par rapport à q8_0',
    },
    large: {
      label: 'paramètres à 128K de contexte sur un seul MacBook',
      detail: 'de mémoire en pic',
    },
    source: 'Source',
  },
  ribbon: {
    label: 'Comment le cache est disposé',
    older: 'Contexte ancien · compressé',
    recent: 'Fenêtre récente · brute',
    note: 'Schéma. Les largeurs de bloc suivent le ratio public de turbo4, 3.8 pour 1, et non un ratio AURA mesuré.',
  },
  changed: {
    heading: 'Ce qui a changé dans AURA',
    items: [
      'Une seule copie KV compressée est partagée entre les têtes d’un groupe de grouped-query attention.',
      'La flash attention compressée tourne sur Metal pour toutes les largeurs de codec.',
      'La compression est planifiée autour du décodage spéculatif, si bien que les tokens brouillons n’écrasent jamais l’historique accepté.',
      'Le prefill de long contexte est fenêtré et tient compte des attention sinks, pour que les premiers tokens restent accessibles quand le contexte grandit.',
    ],
    inProgress:
      'En cours : un mode hybride qui garde l’historique récent non compressé pendant que le contexte ancien est compressé. Nous le qualifions sur Qwen3.8-27B avant de publier des chiffres.',
  },
  footnote:
    'Les ratios de compression, les écarts de perplexité et le résultat 104B proviennent de notre recherche ouverte TurboQuant+ mesurée sur llama-cpp-turboquant, pas de Butter. AURA tourne déjà dans Iron et Butter ; ses propres chiffres sur Qwen3.8-27B sont en cours de qualification et seront publiés avec leurs conditions de test.',
};
export default copy;
