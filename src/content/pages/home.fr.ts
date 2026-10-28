import type { home } from './home';

const homeFr: (typeof home)['en'] = {
  seo: {
    keywords: [
      'IA privée',
      'IA locale',
      'IA sur appareil',
      'IA sur votre propre matériel',
      'inférence LLM locale',
      'moteur d’inférence',
      'kernels GPU',
      'Apple silicon',
      'scanner de vulnérabilités',
      'Pantry',
    ],
  },

  hero: {
    eyebrow: 'Votre matériel · vos données · votre IA',
    title: 'Plus d’intelligence, avec le matériel que vous *possédez* déjà.',
    lede: 'Waffuru construit la stack qui exécute l’IA sur vos propres machines, du portable à la flotte de GPU. Vous tirez davantage du matériel que vous avez, vos données restent chez vous, et aucune facture cloud ne tombe à chaque prompt.',
    launch: {
      label: 'Nouveau',
      text: 'Pantry, notre scanner de vulnérabilités gratuit pour macOS et Linux',
    },
    secondary: { label: 'Voir comment ça fonctionne', href: '#stack' },
  },

  pantry: {
    label: 'Gratuit · Open source · Disponible aujourd’hui',
    title: 'Sachez ce qui est *exposé*. Corrigez vite.',
    body: 'Avant qu’un assistant ne tourne sur votre machine, celle-ci doit être sûre. Pantry compare tout ce qui est installé, et chaque dépôt, aux données ouvertes sur les vulnérabilités, ne signale que ce qui vous concerne et corrige ce qu’il peut sans risque.',
    points: [
      'Seulement ce qui touche vos versions exactes',
      'Correctifs sûrs appliqués pour vous, étapes sudo affichées',
      'Sans télémétrie, sans IA, écrit en Rust',
    ],
    primary: 'Sécurisez votre système',
    secondary: 'Comment fonctionne Pantry',
    caption: 'Exemple de sortie sur une machine.',
  },

  stack: {
    title: 'Du silicium à la *réponse*.',
    intro:
      'Quatre couches qui fonctionnent seules ou ensemble. Votre requête descend, la réponse remonte, et rien n’a besoin de quitter votre matériel.',
    note: 'La stack est privée et en accès anticipé. Metal d’abord, CUDA ensuite ; ROCm et Vulkan fonctionnent mais ne sont pas encore optimisés.',
    flow: {
      you: 'Vous, vos apps, vos agents',
      boundary: 'Votre matériel · votre réseau',
      layers: [
        {
          role: 'Contrôle',
          name: 'Syrup',
          line: 'Voir chaque GPU et chaque moteur qui y tourne.',
        },
        {
          role: 'Mémoire',
          name: 'Whisk',
          line: 'Du contexte tiré de vos notes et de votre code, avec citations.',
        },
        {
          role: 'Moteur',
          name: 'Butter',
          line: 'Exécute le modèle, sans Python dans le chemin de serving.',
        },
        {
          role: 'Kernels',
          name: 'Iron',
          line: 'Une définition de kernel, optimisée pour chaque puce.',
        },
      ],
      hardware: ['Apple silicon', 'NVIDIA', 'AMD'],
      outside: {
        title: 'Le cloud de quelqu’un d’autre',
        note: 'Inutile. Vos données restent chez vous, sauf si vous choisissez de les partager.',
      },
      outcomes: [
        'Privé par défaut',
        'Plus du matériel que vous possédez',
        'Chaque GPU en vue',
      ],
      caption:
        'Votre requête traverse le plan de contrôle, la mémoire, le moteur et les kernels jusqu’à votre propre matériel, et la réponse revient par le même chemin, le tout à l’intérieur de votre matériel et de votre réseau. Le résultat : privé par défaut, plus du matériel que vous possédez, et chaque GPU en vue.',
    },
  },

  audiences: {
    title: 'Une place à *table*.',
    intro: 'Qui que vous soyez, la même stack fonctionne pour vous.',
    items: [
      {
        title: 'Pour vous',
        body: 'Un assistant privé sur votre propre portable. Vos notes, votre code et vos questions restent sur votre machine.',
      },
      {
        title: 'Pour les entreprises',
        body: 'Internalisez l’IA. Gardez les données sensibles là où elles doivent être, et arrêtez de payer au prompt un travail que votre matériel peut faire.',
        href: '/solutions/enterprise',
      },
      {
        title: 'Pour les clouds GPU',
        body: 'Servez davantage avec chaque GPU que vous louez, et voyez toute la flotte au même endroit.',
        href: '/solutions/neoclouds',
      },
      {
        title: 'Pour ceux qui construisent l’IA',
        body: 'Écrivez un kernel une fois et livrez-le sur Metal, CUDA, ROCm et Vulkan.',
        href: '/solutions/ai-companies',
      },
    ],
    linkLabel: 'Voir comment',
  },

  beliefs: {
    title: 'Pourquoi nous *cuisinons*.',
    intro: 'Trois convictions derrière tout ce que nous construisons.',
    items: [
      {
        title: 'L’intelligence pour tous',
        body: 'L’accès à l’IA ne devrait dépendre ni de l’endroit où vous vivez, ni de ce que vous gagnez, ni de vos diplômes.',
      },
      {
        title: 'Tirer plus de chaque watt',
        body: 'La demande d’intelligence est sans limite ; l’énergie et les puces, non. L’enjeu, c’est plus de travail utile pour chaque unité de calcul.',
      },
      {
        title: 'Assez bon, sur votre propre matériel',
        body: 'D’ici environ deux ans, les modèles qui tournent sur les machines que les gens possèdent déjà seront assez bons pour un vrai travail. C’est pour ce moment que nous construisons.',
      },
    ],
    links: [
      { label: 'Lire l’annonce', href: '/blog/introducing-waffuru' },
      { label: 'Nos convictions', href: '/about#beliefs' },
    ],
  },

  team: {
    title: 'Qui est en *cuisine*.',
    intro:
      'Cybersécurité, armée, grand public et entreprise. Nous avons créé et fait grandir des startups, et travaillé avec tout le monde, des petites entreprises aux grands groupes.',
    portraitAlt: 'Portrait de {name}',
    link: { label: 'Rencontrer l’équipe', href: '/about/team' },
  },

  cta: {
    title: 'Prenez place.',
    body: 'Essayez Pantry dès aujourd’hui, gratuitement. Le reste de la stack est en accès anticipé : demandez une place, ou laissez votre e-mail et nous vous écrirons quand il y aura du nouveau.',
  },
};

export default homeFr;
