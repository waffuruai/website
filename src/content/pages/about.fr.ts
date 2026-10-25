import type { about } from './about';

const aboutFr: (typeof about)['en'] = {
  seo: {
    title: 'Mission : démocratiser l’accès à l’intelligence',
    description:
      'Waffuru veut démocratiser l’accès à l’intelligence. Nos convictions, nos valeurs et pourquoi nous construisons une infrastructure d’IA locale.',
    keywords: [
      'mission Waffuru',
      'démocratiser l’IA',
      'entreprise d’IA locale',
      'startup d’infrastructure IA',
    ],
  },
  hero: {
    label: 'À propos de Waffuru',
    title: 'Démocratiser l’accès à l’*intelligence*.',
    lede: 'Waffuru construit la stack qui fait tourner l’IA en local : kernels, inférence, pilotage de flotte et mémoire, pour exécuter vite des modèles sur le matériel que chacun possède déjà.',
    actions: [
      { label: 'Rencontrer l’équipe', href: '/about/team' },
      { label: 'Travailler avec nous', href: '#hiring', variant: 'outline' },
    ],
  },
  why: {
    title: 'Pourquoi nous *construisons*.',
    intro: 'L’intelligence doit tourner là où les gens se trouvent déjà.',
    paragraphs: [
      'Les modèles deviennent assez bons pour tourner sur le matériel que les gens possèdent déjà.',
      'Encore faut-il que la stack en dessous soit prête. Elle doit être plus rapide, moins chère et à vous : des kernels qui tirent plus de chaque watt, un serving sans Python dans le chemin, et une mémoire qui reste sur votre machine. C’est aussi la fondation des assistants personnels local-first.',
      'L’accès à l’intelligence ne doit dépendre ni de la géographie, ni de la fortune, ni des diplômes. Un modèle qui exige un datacenter, un budget ou un badge n’est pas un accès. Celui qui tourne sur un ordinateur que vous possédez déjà, si.',
    ],
    constraintsLabel: 'Deux contraintes que nous nous imposons',
    constraints: [
      'Cela tourne sur du matériel grand public.',
      'Vos données restent sur votre machine, sauf si vous choisissez de les partager.',
    ],
  },
  beliefs: {
    title: 'Nos *convictions*.',
    intro: 'Sept thèses qui guident ce que nous construisons.',
    theses: [
      {
        statement:
          'La demande d’intelligence est sans limite. Les ressources qui l’alimentent, non.',
        body: 'Passer l’inférence à l’échelle demande plus que de nouveaux datacenters et de l’énergie. Il faut tirer plus de travail utile de chaque unité de calcul et d’énergie, pour que l’accès progresse plus vite que le coût, la demande énergétique et l’impact environnemental.',
      },
      {
        statement:
          'Quand l’énergie est le plafond, l’efficacité est la variable.',
        body: 'Les tokens par watt et les dollars par charge de travail sont les chiffres que vous pouvez encore améliorer.',
      },
      {
        statement: 'La demande de calcul est insatiable.',
        body: 'Chaque gain d’efficacité est dépensé en intelligence supplémentaire : le paradoxe de Jevons à l’œuvre. C’est pourquoi le travail sur l’efficacité n’est jamais terminé.',
      },
      {
        statement:
          'Des modèles assez bons sur du matériel courant, c’est pour bientôt.',
        body: 'D’ici environ deux ans, les modèles exécutés sur le matériel que les gens possèdent déjà seront assez bons pour un vrai travail. La loi de Moore et les progrès rapides de l’IA continuent de se cumuler.',
      },
      {
        statement:
          'Chacun aura un assistant personnel, voire une équipe d’assistants.',
        body: 'Et ces assistants se parleront entre eux.',
      },
      {
        statement: 'Les gens veulent garder la main.',
        body: 'Un assistant doit être un prolongement de vous-même, digne de confiance : utile, accessible, jamais effrayant. Cette relation sera aussi personnelle que celle que vous avez avec votre téléphone.',
      },
      {
        statement:
          'L’accès à l’intelligence ne doit dépendre ni de la géographie, ni de la fortune, ni des diplômes.',
        body: 'Accroître le potentiel de revenus partout exige un accès ouvert et local à l’intelligence.',
      },
    ],
  },
  values: {
    title: 'Nos *valeurs*.',
    intro: 'Quatorze valeurs qui guident nos décisions.',
    items: [
      {
        name: 'Liberté',
        line: 'Permettre la liberté par l’accès à la technologie est au cœur de ce que nous construisons.',
      },
      {
        name: 'Autonomie',
        line: 'Nous construisons des systèmes qui rendent du temps aux gens.',
      },
      {
        name: 'Initiative',
        line: 'Si quelque chose doit être fait et que vous êtes le mieux placé, lancez-vous.',
      },
      { name: 'Respect', line: 'Nous traitons les gens en pairs compétents.' },
      {
        name: 'Confiance',
        line: 'Elle se gagne lentement et se perd en un instant.',
      },
      {
        name: 'Honnêteté',
        line: 'Nous disons franchement où nous en sommes, les risques, les erreurs et nos limites.',
      },
      {
        name: 'Intégrité',
        line: 'Tenez vos engagements. Ne livrez pas ce que vous ne défendriez pas.',
      },
      {
        name: 'Égalité des chances',
        line: 'L’accès à l’intelligence ne doit dépendre ni de la géographie, ni de la fortune, ni des diplômes.',
      },
      {
        name: 'Compassion',
        line: 'Nous nous soucions des gens en tant que personnes.',
      },
      {
        name: 'Méritocratie',
        line: 'La meilleure idée l’emporte, sur la foi des preuves et de l’impact.',
      },
      {
        name: 'Méthode scientifique',
        line: 'Formuler une hypothèse, mesurer, reproduire. Les benchmarks priment sur les opinions.',
      },
      {
        name: 'Décider et agir vite',
        line: 'Le réflexe de livrer, de mesurer et d’apprendre.',
      },
      {
        name: 'Rigueur budgétaire',
        line: 'Nous dépensons le temps et l’argent comme des ressources rares.',
      },
      {
        name: 'Prendre du plaisir',
        line: 'Les problèmes difficiles méritent des équipes qui aiment leur travail.',
      },
    ],
  },
  teamTeaser: {
    title: 'Les personnes *derrière* le projet.',
    body: 'De la recherche, de la sécurité, des ventes, et quelques fondateurs qui ont déjà livré des produits.',
    cta: 'Rencontrer l’équipe',
    portraitAlt: 'Portrait de {name}',
  },
  hiring: {
    label: 'Recrutement',
    title: 'Tirez une *chaise*.',
    lines: [
      'Nous cherchons des personnes qui aiment le travail bas niveau : kernels GPU, moteurs d’inférence, Rust, Swift et Metal, et le produit qui repose dessus.',
      'Nous travaillons de façon asynchrone, sur plusieurs fuseaux horaires. Nous sommes aussi une entreprise agentique, où humains et agents construisent ensemble.',
      'Si c’est votre genre de cuisine, dites-nous ce que vous aimeriez construire.',
    ],
    skillsLabel: 'Ce sur quoi nous aimons travailler',
    skills: [
      'GPU bas niveau',
      'Kernels',
      'Inférence',
      'Rust',
      'Swift et Metal',
      'Produit',
    ],
    cta: 'Prendre contact',
  },
  cta: {
    title: 'Essayez-le en *avant-première*.',
    body: 'Nos produits sont privés pour l’instant. Demandez un accès anticipé, ou parlez-nous de ce que vous voulez faire tourner sur le matériel que vous possédez déjà.',
  },
};

export default aboutFr;
