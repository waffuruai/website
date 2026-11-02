import type { whisk } from './whisk';

const whiskFr: (typeof whisk)['en'] = {
  layer: 'Mémoire',
  tagline: 'De la mémoire pour votre IA, gardée sur votre machine.',
  summary:
    'Whisk indexe les fichiers que vous avez déjà, des notes et du code aux tableurs, PDF et enregistrements, et donne à votre IA les passages utiles avec une citation de l’original. Le rappel des sessions de votre assistant, par jour, semaine et mois, est en développement.',
  seo: {
    title: 'Whisk : mémoire et récupération locales pour votre IA',
    description:
      'Whisk cherche dans vos notes, code, documents, tableurs, PDF et médias sur votre propre machine et renvoie des passages cités via MCP. Le rappel de sessions entre jours et assistants est en développement.',
    keywords: [
      'RAG local',
      'mémoire pour IA',
      'récupération MCP',
      'recherche sémantique privée',
      'recherche de documents pour IA',
    ],
  },
  hero: {
    title: 'Votre IA oublie. Vos *fichiers* non.',
    lede: 'Whisk indexe ce qui se trouve sur votre ordinateur et donne à votre IA les passages pertinents quand elle en a besoin, chacun avec une citation du fichier, de la page, de la diapositive ou de la plage de cellules d’où il vient. Rien n’est envoyé ailleurs ; la récupération tourne sur votre machine.',
    highlights: [
      {
        value: 'Local',
        label: 'indexation et recherche sur votre propre machine',
      },
      {
        value: 'Cité',
        label:
          'chaque passage nomme son fichier, sa page, sa diapositive ou sa plage de cellules',
      },
      {
        value: 'MCP',
        label: 'plus un hook qui cherche avant l’envoi du prompt',
      },
    ],
  },
  story: {
    heading: 'Cessez de vous *réexpliquer*.',
    problem:
      'Chaque nouvelle conversation repart de zéro. Vous recollez la même citation, le même tableur, la même moitié de PDF, et quand la réponse arrive vous ne savez pas lequel elle a utilisé. Le travail fait hier avec l’assistant a disparu de sa vue au matin.',
    outcome:
      'Whisk indexe vos notes, votre code, vos documents et vos médias sur votre propre machine et surveille leurs changements. Votre IA interroge Whisk, ou Whisk répond avant l’envoi du prompt, et chaque passage arrive avec une citation que vous pouvez ouvrir. Le rappel des sessions de l’assistant, pour reprendre là où il s’est arrêté, est en développement.',
    outcomes: [
      'Tout reste chez vous : fichiers, index et recherche restent sur votre machine, et la récupération n’exige aucune clé d’IA hébergée.',
      'Vérifiez chaque réponse : les résultats citent le fichier et la page, la diapositive, la plage de cellules ou la plage de temps d’où ils viennent.',
      'Cherchez comme vous pensez : par les mots exacts que vous avez employés ou par ce que vous vouliez dire, dans tous les dossiers enregistrés.',
    ],
  },
  capabilities: {
    heading: 'Ce que fait *Whisk*.',
    intro:
      'Une couche de mémoire que vous exécutez vous-même, pour les fichiers que vous avez déjà.',
    items: [
      {
        title: 'Lit vos documents tels quels',
        body: 'Fichiers Word, PowerPoint et Excel, PDF avec couche de texte ou numérisés, images, audio et vidéo. Les formules des tableurs sont gardées comme texte, jamais évaluées.',
      },
      {
        title: 'Cite l’original',
        body: 'Un résultat issu d’un PDF nomme la page, d’une présentation la diapositive, d’un classeur la feuille et la plage de cellules, d’un enregistrement les secondes. Les dossiers déplacés se résolvent toujours.',
      },
      {
        title: 'Cherche par les mots et par le sens',
        body: 'Recherche par mots-clés avec racinisation, recherche dense sur des embeddings, et correspondance sur le nom de fichier pour les documents dont le sujet n’apparaît que dans le titre. Les résultats sont fusionnés en une seule liste classée.',
      },
      {
        title: 'Place la version actuelle en premier',
        body: 'Quand un dossier contient plusieurs versions d’un document, la plus récente passe en premier et les anciennes sont marquées comme remplacées, jamais écartées.',
      },
      {
        title: 'Répond aux questions qui couvrent plusieurs sources',
        body: 'Demandez ce que chaque service a décidé et obtenez une fiche par source avec son meilleur passage, plus la liste des sources interrogées où il n’y avait rien.',
      },
      {
        title: 'Agit sans qu’on le demande',
        body: 'Un hook Claude Code cherche avant chaque prompt éligible et n’injecte que les passages qui passent un seuil de confiance. Une recherche rejetée n’ajoute rien.',
      },
    ],
  },
  code: {
    heading: 'Indexez un dossier, puis *posez* votre question.',
    intro:
      'Pointez Whisk vers un dossier. Tout client MCP peut y chercher, et le hook Claude Code peut chercher pour vous.',
    caption:
      'À titre d’illustration. Remplacez les valeurs entre chevrons par votre dossier et le nom de votre projet. Les options et valeurs par défaut sont dans la documentation.',
  },
  extras: [
    {
      id: 'privacy',
      heading: 'Privé *par construction*.',
      intro:
        'Whisk tourne sur votre machine. Voici les contrôles qui l’y gardent.',
      items: [
        {
          title: 'Loopback uniquement',
          body: 'Le port MCP accepte les connexions de cette machine. Le lier à une adresse réseau est refusé sauf autorisation explicite, et le journal indique que le port n’est pas authentifié.',
        },
        {
          title: 'Projets restreints',
          body: 'Marquez un dossier comme restreint et il est exclu de toute recherche automatique. Il n’est consulté que s’il est nommé.',
        },
        {
          title: 'Journaux expurgés',
          body: 'Le texte des requêtes et les répertoires de travail peuvent être expurgés des journaux d’exploitation, et le journal de rejeu peut être désactivé.',
        },
        {
          title: 'Hygiène contre les injections',
          body: 'Le texte que le hook place dans un prompt est assaini : Unicode caché, faux marqueurs de rôle, liens récupérables et longs blocs encodés sont retirés ou neutralisés.',
        },
      ],
      note: 'Le port local n’a aucune authentification par utilisateur aujourd’hui. Gardez le daemon sur loopback et traitez l’index avec le même soin que les fichiers à partir desquels il a été construit.',
    },
    {
      id: 'continuity',
      heading: 'Se souvenir *du travail lui-même*.',
      intro:
        'En développement : Whisk apprend à se souvenir de ce que vous et votre assistant avez fait, pour qu’une nouvelle session puisse commencer là où la précédente s’est arrêtée. Rien de cela n’est dans la version actuelle.',
      items: [
        {
          title: 'Qu’ai-je fait hier ?',
          body: 'Rappel par jour, semaine ou mois, groupé par projet, avec l’endroit où chaque session s’est arrêtée. Les jours calendaires suivent votre fuseau horaire, y compris les journées longues et courtes du changement d’heure.',
        },
        {
          title: 'Entre assistants et machines',
          body: 'Importe les transcriptions de Claude Code, Codex et Grok et garde de quel ordinateur chacune vient. Une session copiée ou dérivée (fork) est rattachée à son parent, sans être comptée deux fois.',
        },
        {
          title: 'Dit contre fait',
          body: 'Une pull request compte comme créée seulement quand le reçu de la commande le dit. Un « terminé » de l’assistant sans reçu reste une affirmation.',
        },
        {
          title: 'Des citations à l’octet près',
          body: 'Chaque ligne d’un récapitulatif renvoie à l’enregistrement exact de la transcription d’où elle vient, même une fois la session archivée.',
        },
        {
          title: 'Les corrections l’emportent',
          body: 'Quand un récapitulatif est raccourci pour tenir, votre dernière correction garde sa place devant l’ancien résumé de l’assistant.',
        },
        {
          title: 'Un oubli qui tient',
          body: 'Supprimez une session et elle ne peut plus être réimportée. La purge retire le contenu, ses résumés et ses copies d’archive.',
        },
      ],
      note: 'Encore tôt. La capture en direct est optionnelle par client, les imports sont explicites et le rappel ne couvre que les sessions capturées ; il ne prétend jamais connaître toute votre journée. Dans aucune version pour l’instant.',
    },
  ],
  specs: {
    heading: 'Les *détails* techniques.',
    rows: [
      {
        term: 'Indexe',
        chips: [
          { label: 'Markdown' },
          { label: 'Code' },
          { label: 'DOCX' },
          { label: 'PPTX' },
          { label: 'XLSX' },
          { label: 'PDF' },
          { label: 'Images' },
          { label: 'Audio' },
          { label: 'Vidéo' },
          { label: 'Sessions de l’assistant', inProgress: true },
        ],
      },
      {
        term: 'Où il tourne',
        detail:
          'En local, sur votre machine. Python 3.11 ou plus récent. Embeddings EmbeddingGemma 2 natifs via Butter sur silicium Apple ; un modèle d’embeddings portable sur CPU sinon.',
      },
      {
        term: 'Recherche',
        detail:
          'Mots-clés (FTS5, avec racinisation) plus recherche vectorielle dense avec fusion des rangs. Correspondance sur le nom de fichier. Préférence de version au sein d’un dossier. Regroupement entre sources.',
      },
      {
        term: 'Citations',
        detail:
          'Chemin du fichier plus page, diapositive, feuille et plage de cellules, ou secondes de début et de fin.',
        chips: [
          { label: 'Citations de session à l’octet près', inProgress: true },
        ],
      },
      {
        term: 'Interfaces',
        detail:
          'MCP via stdio ou HTTP sur loopback. Hook UserPromptSubmit de Claude Code. Hook DeepSeek Harness.',
      },
      {
        term: 'Embeddings',
        detail:
          'Stockés en float32 par défaut. Compression optionnelle sans perte ou dérivée d’AURA pour les vecteurs froids d’un nouveau cache.',
      },
      {
        term: 'Contrôles de confidentialité',
        detail:
          'Liaison loopback, projets restreints, expurgation des requêtes et des chemins, assainisseur de prompts.',
      },
      {
        term: 'Disponibilité',
        detail: 'Privé et à code fermé pendant l’accès anticipé.',
      },
    ],
  },
  stack: {
    heading: 'Compatible avec le reste de la *stack*.',
    intro:
      'Whisk fonctionne seul avec tout client MCP. Butter fournit des embeddings natifs sur silicium Apple, Syrup surveille les machines et Iron compile les kernels en dessous.',
  },
  faq: [
    {
      question: 'Whisk est-il open source ?',
      answer:
        'Pas aujourd’hui. Whisk est privé et à code fermé pendant l’accès anticipé. Demandez l’accès et nous vous écrirons quand il y aura plus à partager.',
    },
    {
      question: 'Mes données quittent-elles ma machine ?',
      answer:
        'Non. L’indexation et la recherche tournent en local et n’exigent aucune clé d’IA hébergée. Le seul événement réseau est le premier téléchargement du modèle d’embeddings. Si vous branchez votre assistant sur un fournisseur d’IA hébergé, ce fournisseur voit ce que l’assistant lui envoie ; Whisk n’y change rien.',
    },
    {
      question: 'Qu’indexe-t-il ?',
      answer:
        'Notes, code, fichiers Word, PowerPoint et Excel, PDF y compris numérisés, images, audio et vidéo. L’audio est indexé pour le sens, pas transcrit ; les pages numérisées bénéficient d’un OCR optionnel sur macOS.',
    },
    {
      question: 'Se souviendra-t-il de ce que mon assistant a fait hier ?',
      answer:
        'Pas dans la version actuelle. Le rappel de sessions entre jours, assistants et ordinateurs est en développement, avec des citations vers l’enregistrement exact de la transcription. Nous vous écrirons à sa sortie.',
    },
    {
      question: 'Qu’est-ce qu’AURA ?',
      answer:
        'Notre algorithme de compression pour le cache KV, les embeddings et les poids des modèles. Dans Whisk, c’est une option pour les vecteurs froids d’un nouvel index ; par défaut, les embeddings sont stockés sans compression. Il s’inspire de TurboQuant+, les améliorations apportées par Tom Turney au [TurboQuant](https://research.google/blog/turboquant-redefining-ai-efficiency-with-extreme-compression/) de Google, et nous sommes allés encore plus loin avec quelques techniques inédites de notre cru. AURA est né d’une collaboration entre Eric Kryski et Tom Turney.',
    },
    {
      question: 'Qu’est-ce qui peut utiliser Whisk ?',
      answer:
        'Tout ce qui parle MCP. Claude Code peut aussi l’exécuter comme hook, si bien que les passages pertinents arrivent avant que le modèle voie votre prompt.',
    },
  ],
  cta: {
    title: 'Donnez une *mémoire* à votre IA.',
    body: 'Whisk est en accès anticipé et à code fermé pour l’instant. Demandez l’accès, ou dites-nous quels fichiers vous aimeriez que votre IA connaisse déjà.',
  },
};

export default whiskFr;
