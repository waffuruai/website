import { mailto } from '@/content/site';
import type { support } from './support';

const supportFr: (typeof support)['en'] = {
  seo: {
    title: 'Support',
    description:
      'Ce qui est disponible, comment fonctionne l’accès anticipé, le matériel pris en charge, et comment signaler un bug ou une faille de sécurité.',
    keywords: [
      'support Waffuru',
      'accès anticipé Waffuru',
      'signaler une faille de sécurité',
      'matériel pour IA locale',
    ],
  },
  hero: {
    label: 'Support',
    title: 'Des réponses, et une *personne* quand il le faut.',
    lede: 'Ce qui est disponible aujourd’hui, comment fonctionne l’accès anticipé, et où aller quand quelque chose casse.',
  },
  links: {
    title: 'Par où *commencer*',
    items: [
      {
        title: 'Écrire au support',
        body: 'Bugs, questions, problèmes d’installation. Dites ce que vous avez lancé et sur quel matériel.',
        href: mailto('Support'),
      },
      {
        title: 'Signaler une faille de sécurité',
        body: 'En privé, par e-mail à security@waffuru.ai avec l’objet Security.',
        href: mailto('Security'),
      },
      {
        title: 'security.txt',
        body: 'Notre contact sécurité sous forme lisible par machine.',
        href: '/.well-known/security.txt',
        file: true,
      },
      {
        title: 'Politique de divulgation',
        body: 'Ce qui entre dans le périmètre, la rapidité de nos réponses et la protection accordée à la recherche de bonne foi.',
        href: '/security',
      },
    ],
  },
  faq: [
    {
      question: 'Que puis-je utiliser aujourd’hui ?',
      answer:
        'Nos produits (Iron, Butter, Syrup et Whisk) sont privés et à code fermé pour l’instant, et rien n’est encore disponible au grand public. L’accès anticipé est la façon d’entrer en premier.',
    },
    {
      question: 'Comment fonctionne l’accès anticipé ?',
      answer:
        'Remplissez le formulaire d’accès anticipé et dites-nous ce que vous construisez et sur quoi vous voulez le faire tourner. Nous vous écrivons quand nous avons quelque chose qui convient. Ce programme fournit un logiciel en pré-version : il peut changer ou casser, et vos retours sont ce qui le fait progresser.',
    },
    {
      question: 'Sur quel matériel cela tourne-t-il ?',
      answer:
        'Le silicium Apple est la cible principale : chaque kernel est d’abord écrit et optimisé pour Metal. NVIDIA CUDA est en production sur RTX et DGX Spark et en cours d’optimisation, avec de premières exécutions sur H100, H200, B100 et B200. AMD via ROCm et Vulkan avance vite. Pensez MacBook et Mac Studio, stations RTX, DGX Spark, Strix Halo et flottes de neoclouds.',
    },
    {
      question: 'Comment signaler un bug ?',
      answer:
        'Écrivez à hello@waffuru.ai avec l’objet Support ; le lien « Écrire au support » ci-dessus s’en charge pour vous. Indiquez votre matériel et votre système, ce que vous avez lancé, ce que vous attendiez et ce qui s’est passé, et retirez d’abord des journaux tout ce qui est privé.',
    },
    {
      question: 'Comment signaler une faille de sécurité ?',
      answer:
        'Écrivez à security@waffuru.ai avec l’objet Security et assez de détails pour la reproduire. Nous accusons réception sous 3 jours ouvrés, corrigeons selon la gravité et convenons avec vous d’une divulgation publique sous 90 jours ; la [politique de divulgation des vulnérabilités](https://waffuru.ai/security) (en anglais) précise le périmètre, les règles et la protection accordée. Notre security.txt indique le même contact sous forme lisible par machine.',
    },
    {
      question: 'Que deviennent mes données ?',
      answer:
        'Nos logiciels tournent en local, et vos données restent sur votre machine, sauf si vous choisissez d’activer quelque chose qui les envoie ailleurs. Sur ce site, nous ne collectons que ce que liste la politique de confidentialité, et Google Analytics reste désactivé tant que vous ne l’acceptez pas.',
    },
  ],
  cta: {
    title: 'Pas trouvé ici ? *Demandez*-nous.',
    body: 'Envoyez votre matériel, votre système, ce que vous avez lancé et ce qui s’est passé. Plus il y a de détails, plus il est facile de vous aider.',
    docs: 'Lire la documentation',
    email: 'Écrire au support',
  },
};

export default supportFr;
