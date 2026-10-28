import type { pantry } from './pantry';

const pantryFr: (typeof pantry)['en'] = {
  seo: {
    title: 'Pantry : scanner de vulnérabilités gratuit pour macOS et Linux',
    description:
      'Pantry trouve les vulnérabilités qui touchent vraiment votre machine et corrige ce qu’il peut sans risque. Gratuit, open source, en Rust. Sans télémétrie ni IA.',
    keywords: [
      'scanner de vulnérabilités',
      'scanner de CVE',
      'scanner de sécurité open source',
      'corriger les vulnérabilités macOS',
      'scanner de vulnérabilités Linux',
      'OSV',
      'CISA KEV',
      'wpantry',
    ],
  },
  hero: {
    label: 'Gratuit · Open source · macOS et Linux',
    title: 'De vulnérable à *corrigé*, en quelques minutes.',
    lede: 'Pantry compare tout ce qui est installé sur votre Mac ou votre machine Linux, et chaque dépôt qu’elle contient, aux données ouvertes sur les vulnérabilités. Il ne signale que ce qui vous concerne vraiment, indique la version qui corrige le problème et applique lui-même les correctifs qui peuvent l’être sans risque.',
    primary: 'Sécurisez votre système',
    secondary: 'En savoir plus',
    source: 'Voir le code source',
    windows: 'La prise en charge de Windows est prévue.',
    windowsLink: 'Dites-nous si vous en avez besoin',
  },
  how: {
    title: 'Installez. Analysez. Mettez en cache. *Corrigez.*',
    intro:
      'Un petit binaire fait tout le travail sur votre machine. Seuls des noms et des versions de paquets en sortent.',
    caption: 'Exemple de sortie sur une machine. La vôtre sera différente.',
    stepsLabel: 'Comment fonctionne Pantry',
    pause: 'Pause',
    play: 'Lecture',
    steps: [
      {
        id: 'install',
        label: 'Installer',
        title: 'Vérifié avant de s’exécuter',
        body: 'Pantry peut lire tout votre répertoire personnel : chaque version est donc signée, hachée et compilée de façon reproductible. packslip ou GitHub vérifie le téléchargement avant même qu’il ne s’exécute.',
        flow: ['Version signée', 'Signature + SHA-256', 'Votre machine'],
        note: 'Un téléchargement qui échoue à l’une des deux vérifications n’est jamais installé.',
      },
      {
        id: 'scan',
        label: 'Analyser',
        title: 'Seulement ce qui vous concerne',
        body: 'Pantry fait l’inventaire de vos runtimes, paquets, applications et du lockfile de chaque dépôt, puis interroge OSV.dev, CISA KEV et endoflife.date sur ces versions exactes. Ce que vous n’avez pas installé n’est jamais signalé.',
        flow: [
          'Votre machine',
          'Noms + versions',
          'OSV.dev · CISA KEV · endoflife.date',
        ],
        note: 'Le contenu des fichiers, les chemins et les secrets ne quittent jamais votre machine.',
      },
      {
        id: 'cache',
        label: 'Cache',
        title: 'La seconde fois, en quelques secondes',
        body: 'Les réponses sont stockées dans une base SQLite sur votre disque, avec un historique de chaque exécution. Une deuxième analyse le même jour prend quelques secondes, et vous pouvez consulter les avis de sécurité hors ligne.',
        flow: [
          'Données ouvertes',
          'SQLite sur votre disque',
          'Votre prochaine analyse',
        ],
        note: 'Le cache vous appartient : du SQLite standard, interrogeable en lecture seule.',
      },
      {
        id: 'fix',
        label: 'Corriger',
        title: 'Des correctifs fiables',
        body: 'Prévisualisez le plan, puis laissez Pantry lancer les mises à jour sûres, au niveau utilisateur, et vérifier à nouveau. Tout ce qui demande sudo ou une modification du code est affiché pour que vous le lanciez vous-même.',
        flow: ['Le plan', 'Mises à jour sûres', 'Nouvelle vérification'],
        note: 'Pantry ne lance jamais sudo et ne modifie jamais votre code.',
      },
    ],
  },
  install: {
    title: 'Sécurisez votre *système*.',
    intro:
      'Choisissez ce que vous voulez vérifier vous-même. Chaque méthode vérifie la version avant que quoi que ce soit ne s’exécute.',
    methods: [
      {
        id: 'mise',
        label: 'Une ligne',
        title: 'Avec mise',
        body: 'mise lit le packslip signé de la version et vérifie qu’il provient bien de notre workflow de publication avant d’installer quoi que ce soit, puis retient le signataire pour chaque mise à jour.',
        link: 'Qu’est-ce que packslip ?',
      },
      {
        id: 'script',
        label: 'Sans mise',
        title: 'Avec le script d’installation',
        body: 'Choisit le build adapté à votre machine, le vérifie avec SHA256SUMS, contrôle sa signature avec packslip, la CLI GitHub ou cosign, puis l’installe dans ~/.local/bin.',
        link: 'Lisez d’abord le script',
      },
      {
        id: 'verify',
        label: 'À la main',
        title: 'Vérifiez par vous-même',
        body: 'Téléchargez le binaire, vérifiez-le avec SHA256SUMS, son packslip signé et son attestation de build GitHub, puis installez-le. Un bundle cosign est aussi fourni.',
        link: 'Guide d’installation complet',
      },
    ],
    then: 'Ensuite, lancez l’analyse et consultez le plan :',
  },
  checks: {
    title: 'Vérifiez *tout* ce qu’il y a sur les étagères.',
    intro:
      'Faire le tour du garde-manger, c’est voir ce que vous avez, ce qui est périmé et ce qu’il faut remplacer.',
    items: [
      {
        title: 'Tout ce qui est installé',
        body: 'Runtimes et compilateurs (chaque version conservée par vos gestionnaires de versions), gestionnaires de paquets, outils CLI, bases de données, Docker, Homebrew et paquets globaux.',
      },
      {
        title: 'Le lockfile de chaque dépôt',
        body: 'Cargo, npm, pnpm, yarn, bun, Go, uv, poetry, pip, Bundler, Composer et d’autres, avant que du code vulnérable ne soit livré.',
      },
      {
        title: 'Des malwares, pas seulement des CVE',
        body: 'Chaque nom de paquet comparé à l’index des paquets malveillants d’OpenSSF, et les extensions d’éditeur à la liste des extensions malveillantes de VS Code.',
      },
      {
        title: 'Secrets divulgués',
        body: 'Identifiants commités n’importe où dans l’historique git d’un dépôt, signalés sous forme masquée.',
      },
      {
        title: 'Vos outils de code IA',
        body: 'Ce qu’exécutent réellement Claude Code, Codex, Cursor, Gemini CLI et d’autres agents : leurs serveurs MCP, plugins, skills et paquets intégrés.',
      },
      {
        title: 'OS, navigateurs et applications',
        body: 'Mise à jour de logiciels de macOS, paquets des principales distributions Linux, Chrome, Firefox, applications Electron et autres, comparés à leurs dernières versions.',
      },
      {
        title: 'Fin de vie',
        body: 'Runtimes et bases de données qui ne reçoivent plus de correctifs de sécurité, avec la date de leur arrêt.',
      },
      {
        title: 'Autorités de certification compromises',
        body: 'Les magasins de confiance de votre système, d’OpenSSL, de Homebrew, de Python et de Node, comparés aux autorités de certification dont on sait qu’elles ne sont plus approuvées.',
      },
      {
        title: 'Risques liés à la chaîne d’approvisionnement',
        body: 'Licences hors de votre liste autorisée, scripts d’installation npm et images de conteneur à partir desquelles vos dépôts sont construits.',
      },
    ],
  },
  sources: {
    title: 'D’où *viennent* les réponses.',
    intro:
      'Des données ouvertes uniquement, sans accès payant. Chaque résultat porte l’identifiant de son avis de sécurité, pour que vous puissiez le vérifier à la source.',
    items: {
      osv: 'Des fiches de vulnérabilité ouvertes pour tous les grands écosystèmes de paquets et toutes les grandes distributions Linux. Pantry les interroge sur vos versions exactes.',
      ghsa: 'Les avis de sécurité de GitHub pour les paquets open source, qui parviennent à Pantry via OSV.',
      kev: 'Les vulnérabilités que des attaquants exploitent en ce moment même. Pantry les fait passer en premier.',
      eol: 'Quand les runtimes et les bases de données cessent de recevoir des correctifs de sécurité.',
      malicious:
        'Des paquets publiés pour nuire, recensés par l’Open Source Security Foundation.',
      vendors:
        'Les données de version et de sécurité publiées par les éditeurs eux-mêmes, pour les applications, les navigateurs, les bases de données, les paquets Linux et les extensions d’éditeur de code.',
    },
  },
  trust: {
    title: 'Conçu pour mériter votre *confiance*.',
    intro:
      'Un outil de sécurité voit toute votre machine. Pantry garde donc une empreinte minimale, et chacune de ses affirmations est vérifiable.',
    items: [
      {
        title: 'Aucune télémétrie',
        body: 'Pantry ne rend jamais compte de ce que vous faites. Il n’envoie que des noms et des versions de paquets, à OSV.dev, pour les rechercher.',
      },
      {
        title: 'Aucune IA',
        body: 'Du code simple et déterministe. La même machine obtient la même réponse, à chaque fois.',
      },
      {
        title: 'Écrit en Rust',
        body: 'Sûr en mémoire, code unsafe interdit, compilé en un seul binaire statique.',
      },
      {
        title: 'Peu de dépendances',
        body: 'Une poignée de crates Rust aux versions figées, examinés un par un. Aucun runtime à installer.',
      },
      {
        title: 'Versionné et haché',
        body: 'Chaque version est taguée, recompilée à l’identique, octet pour octet, avant sa sortie, et listée dans SHA256SUMS.',
      },
      {
        title: 'Deux façons de vérifier',
        body: 'Vérifiez un téléchargement avec son packslip signé ou son attestation de build GitHub, avant qu’il ne s’exécute.',
      },
      {
        title: 'Lecture d’abord',
        body: 'Une analyse ne modifie rien. Les correctifs ne s’exécutent que si vous le demandez, et jamais avec sudo.',
      },
      {
        title: 'Injoignable ne veut pas dire sain',
        body: 'Si une source est injoignable, Pantry indique « non vérifié ». Il ne la considère jamais comme sûre.',
      },
      {
        title: 'Gratuit et open source',
        body: 'Sous licence MIT. Lisez chaque ligne, forkez-le et faites-le tourner sur autant de machines que vous voulez.',
      },
    ],
  },
  uses: {
    title: 'Pour vous, vos agents et votre *parc*.',
    intro:
      'Le même binaire sur un portable, dans votre agent de code, en CI ou sur quelques centaines de serveurs.',
    items: [
      {
        title: 'Les humains',
        body: 'Lancez-le, lisez le plan, appliquez les correctifs sûrs. Le code de sortie indique si quelque chose a encore besoin de vous.',
      },
      {
        title: 'Les agents',
        body: 'Un JSON structuré et une skill intégrée (wpantry skill) apprennent à votre agent de code à trier et à corriger, sans jamais lancer sudo.',
      },
      {
        title: 'Parcs et CI',
        body: 'Pointez-le vers un checkout, ignorez la machine et faites échouer le build dès qu’un problème a un correctif publié.',
      },
    ],
  },
  faq: [
    {
      question: 'Qu’est-ce qui quitte ma machine ?',
      answer:
        'Des noms et des versions de paquets, envoyés à OSV.dev, ainsi que des téléchargements de données publiques comme la liste Known Exploited Vulnerabilities de la CISA et endoflife.date. Le contenu des fichiers, les chemins et les secrets ne sortent jamais. Seule exception : la vérification facultative des fuites liées à votre adresse e-mail, qui ne s’exécute qu’après votre accord.',
    },
    {
      question: 'A-t-il besoin de sudo ?',
      answer:
        'Non. Pantry s’exécute avec votre utilisateur. Les correctifs qui demandent sudo, comme les paquets du système d’exploitation, sont affichés pour que vous les lanciez vous-même.',
    },
    {
      question: 'Pourquoi est-ce gratuit ?',
      answer:
        'Parce que la sécurité ne devrait pas dépendre de ce que vous pouvez payer. Quand les données de vulnérabilités sont payantes, ceux qui peuvent le moins se permettre une faille sont les plus exposés. Pantry utilise des données ouvertes, et il est gratuit pour tout le monde.',
    },
    {
      question: 'Quelle différence avec un flux de CVE ?',
      answer:
        'Un flux liste tout ce qui a cassé, n’importe où. Pantry vous dit ce qui concerne les versions exactes présentes sur votre machine, et quelle version corrige le problème.',
    },
    {
      question: 'Pourquoi s’appelle-t-il Pantry ?',
      answer:
        'En anglais, pantry désigne le garde-manger. En faire le tour vous dit ce que vous avez, ce qui est périmé et ce qui a fait l’objet d’un rappel. C’est son travail. La commande s’appelle wpantry.',
    },
    {
      question: 'Fonctionne-t-il sous Windows ?',
      answer:
        'Pas encore. Pantry fonctionne aujourd’hui sous macOS et Linux. La prise en charge de Windows est prévue, et la demande en fixera la date : dites-nous si vous en avez besoin.',
    },
    {
      question: 'Mon agent IA peut-il l’utiliser ?',
      answer:
        'Oui. wpantry --json fournit à votre agent des résultats structurés, et wpantry skill affiche une skill qui lui apprend à trier et à corriger, sans jamais exécuter les étapes qui demandent sudo.',
    },
  ],
  cta: {
    title: 'Inspectez votre *garde-manger*.',
    body: 'Gratuit, open source et vérifié avant de s’exécuter. Lisez d’abord le code si vous le souhaitez. C’est tout l’intérêt.',
  },
};

export default pantryFr;
