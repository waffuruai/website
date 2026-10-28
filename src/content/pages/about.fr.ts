import type { about } from './about';

const aboutFr: (typeof about)['en'] = {
  seo: {
    title: 'Mission : démocratiser l’accès à l’intelligence',
    description:
      'Waffuru veut démocratiser l’accès à l’intelligence. Nos convictions, nos valeurs et pourquoi nous construisons une infrastructure d’IA qui tourne sur le matériel que vous possédez ou louez.',
    keywords: [
      'mission Waffuru',
      'démocratiser l’IA',
      'entreprise d’infrastructure IA',
      'startup d’infrastructure IA',
    ],
  },
  hero: {
    label: 'À propos de Waffuru',
    title: 'Démocratiser l’accès à l’*intelligence*.',
    lede: 'Waffuru construit la stack d’IA qui exécute les modèles vite et au coût par token le plus bas, sur le matériel que vous possédez ou louez, des portables de vos équipes aux flottes de GPU en datacenter : kernels, inférence, plan de contrôle, mémoire et harnais d’agents.',
    actions: [
      { label: 'Rencontrer l’équipe', href: '/about/team' },
      { label: 'Travailler avec nous', href: '#hiring', variant: 'outline' },
    ],
    name: '« Waffuru » est la façon dont le japonais dit gaufres. Le nom est un clin d’œil à notre respect pour la culture japonaise et sa longue histoire, à un amour partagé des gaufres et à une mission mondiale.',
  },
  why: {
    title: 'Pourquoi nous *construisons*.',
    intro:
      'L’intelligence doit tourner là où les gens utilisent déjà la technologie.',
    paragraphs: [
      'Les modèles sont désormais assez bons pour tourner sur le matériel que les gens possèdent déjà.',
      'Encore faut-il que la stack qui les exécute soit prête. Elle doit être plus rapide, moins chère, simple à utiliser et **à vous** : des kernels qui tirent plus de chaque watt, des résultats corrects plus vite, des modèles de vision, d’audio et de texte qui tournent sans une montagne de dépendances et de complexité, et une mémoire et un contexte qui restent sur votre machine.',
      'L’accès à l’intelligence ne doit dépendre ni de la géographie, ni de la fortune, ni des diplômes. Cela suppose un coût par token plus bas partout : sur le portable que l’on possède déjà, et sur les GPU qu’une entreprise possède ou loue.',
    ],
    constraintsLabel: 'Deux contraintes que nous nous imposons',
    constraints: [
      'Réduire au minimum la consommation de tokens et le coût par token.',
      'Vos données restent sur votre matériel, sauf si vous choisissez d’utiliser un fournisseur d’inférence d’IA hébergé.',
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
        body: 'Chaque gain d’efficacité est dépensé en intelligence supplémentaire : le [paradoxe de Jevons](https://fr.wikipedia.org/wiki/Paradoxe_de_Jevons) à l’œuvre. C’est pourquoi le travail sur l’efficacité n’est jamais terminé.',
      },
      {
        statement:
          'Des modèles assez bons sur du matériel courant, c’est maintenant.',
        body: 'Les modèles exécutés sur le matériel que les gens possèdent déjà sont aujourd’hui assez bons pour un vrai travail, tandis que la loi de Moore et les progrès rapides de l’IA continuent de se cumuler.',
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
        line: 'Nous dépensons le temps et l’argent de façon réfléchie, comme s’ils étaient rares.',
      },
      {
        name: 'Prendre du plaisir',
        line: 'Les problèmes difficiles méritent des équipes qui aiment leur travail.',
      },
    ],
  },
  teamTeaser: {
    title: 'Les personnes *derrière* le projet.',
    body: 'Des bâtisseurs expérimentés, issus de la cybersécurité, de l’armée, du grand public et de l’entreprise. Nous avons créé et fait grandir des startups, et travaillé avec tout le monde, des petites entreprises aux grands groupes.',
    cta: 'Rencontrer l’équipe',
    portraitAlt: 'Portrait de {name}',
  },
  hiring: {
    label: 'Recrutement',
    title: 'Enfilez le *tablier*.',
    lines: [
      'Nous cherchons des personnes qui aiment le travail bas niveau : kernels GPU, moteurs d’inférence, Rust, Swift, Metal, CUDA et HIP/ROCm, et le produit qui repose dessus.',
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
      'CUDA et HIP/ROCm',
      'Produit',
    ],
    cta: 'Prendre contact',
  },
  cta: {
    title: 'Essayez-le en *avant-première*.',
    body: 'Pantry est gratuit et open source dès aujourd’hui. Notre stack d’inférence IA est en accès anticipé privé : demandez un accès, ou parlez-nous de ce que vous voulez faire tourner sur le matériel que vous possédez ou louez.',
  },
};

export default aboutFr;
