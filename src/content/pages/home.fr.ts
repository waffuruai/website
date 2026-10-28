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
    title: 'Plus d’intelligence sur le matériel que vous *possédez* déjà.',
    lede: 'Waffuru construit la stack d’IA qui tourne sur le matériel que vous possédez ou louez, du portable à la flotte de GPU en datacenter. Vous tirez davantage de chaque GPU, dépensez moins par token, et vos données restent chez vous.',
    launch: {
      label: 'Nouveau',
      text: 'Pantry, notre scanner de vulnérabilités gratuit pour macOS et Linux',
    },
    secondary: { label: 'Voir comment ça fonctionne', href: '#stack' },
  },

  pantry: {
    label: 'Gratuit · Open source · Disponible aujourd’hui',
    title: 'Sachez ce qui est *exposé*. Corrigez vite.',
    body: 'Avant que l’IA ne tourne sur vos machines, celles-ci doivent être sûres. Pantry compare tout ce qui est installé, et chaque dépôt, aux données ouvertes sur les vulnérabilités, ne signale que ce qui vous concerne et corrige ce qu’il peut sans risque.',
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
      'Six produits qui fonctionnent seuls ou ensemble. Votre requête descend, la réponse remonte, et rien n’a besoin de quitter le matériel que vous contrôlez.',
    note: 'Pantry est gratuit et open source dès aujourd’hui ; le reste de la stack est en accès anticipé privé, et Waffle arrive bientôt. Metal d’abord, CUDA en cours d’optimisation, ROCm et Vulkan bientôt.',
    flow: {
      you: 'Vous, votre équipe, vos agents',
      boundary: 'Matériel possédé ou loué',
      layers: [
        {
          role: 'Sécurité',
          name: 'Pantry',
          icon: 'pantry',
          line: 'Trouve ce qui est exposé sur chaque machine, et le corrige.',
        },
        {
          role: 'Agents',
          name: 'Waffle',
          icon: 'waffle',
          line: 'Le harnais d’agents, avec W, votre assistant, à l’intérieur.',
        },
        {
          role: 'Mémoire',
          name: 'Whisk',
          icon: 'whisk',
          line: 'Incorpore les bons documents et le bon contexte à chaque requête.',
        },
        {
          role: 'Contrôle',
          name: 'Syrup',
          icon: 'syrup',
          line: 'Supervision, télémétrie, contrôle d’accès et coûts, pour chaque GPU.',
        },
        {
          role: 'Moteur',
          name: 'Butter',
          icon: 'butter',
          line: 'Inférence multimodale pour le texte, la vision et l’audio, en streaming.',
        },
        {
          role: 'Kernels',
          name: 'Iron',
          icon: 'iron',
          line: 'Écrivez une fois en Rust, obtenez des kernels optimisés partout.',
        },
      ],
      hardware: ['Apple silicon', 'NVIDIA', 'AMD'],
      outside: {
        title: 'L’API de quelqu’un d’autre',
        note: 'Inutile. Vos données restent sur votre matériel, sauf si vous choisissez de les partager.',
      },
      outcomes: [
        'Conçu pour un coût par token plus bas',
        'Privé par défaut',
        'Corrigé et en vue',
      ],
      caption:
        'Une requête de votre part, de votre équipe ou de vos agents traverse Pantry (sécurité), Waffle (agents), Whisk (mémoire), Syrup (contrôle), Butter (le moteur) et Iron (kernels) jusqu’au matériel que vous possédez ou louez, et la réponse revient par le même chemin. Conçu pour un coût par token plus bas, privé par défaut, corrigé et en vue.',
    },
  },

  audiences: {
    title: 'Nous avons réservé une place à table pour *vous*.',
    intro: 'Qui que vous soyez, la même stack fonctionne pour vous.',
    items: [
      {
        title: 'Pour vous',
        body: 'Un assistant privé sur votre propre portable. Vos notes, votre code et vos questions restent sur votre machine.',
        soon: true,
      },
      {
        title: 'Pour les entreprises',
        body: 'Internalisez l’IA, sur des GPU que vous possédez ou louez. Gardez les données sensibles là où elles doivent être, et dépensez moins par token.',
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
    soonLabel: 'Bientôt',
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
        title: 'Tourner sur votre propre matériel',
        body: 'Les modèles qui tournent sur les machines que les gens possèdent déjà sont assez bons pour un vrai travail. Nous construisons pour cela depuis un moment déjà.',
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
      'Des bâtisseurs expérimentés, issus de la cybersécurité, de l’armée, du grand public et de l’entreprise. Nous avons créé et fait grandir des startups, et travaillé avec tout le monde, des petites entreprises aux grands groupes.',
    portraitAlt: 'Portrait de {name}',
    link: { label: 'Rencontrer l’équipe', href: '/about/team' },
  },

  cta: {
    title: 'Réservez votre place.',
    body: 'Essayez Pantry dès aujourd’hui, gratuitement. Le reste de la stack est en accès anticipé : réservez une place, ou laissez votre e-mail et nous vous écrirons quand il y aura du nouveau.',
  },
};

export default homeFr;
