import type { ProductCopy } from '@/content/pages/products/types';
import type { Localized } from '@/content/types';
import whiskEs from './whisk.es';
import whiskFr from './whisk.fr';
import whiskZh from './whisk.zh';
import whiskJa from './whisk.ja';
import whiskKo from './whisk.ko';

/*
 * Whisk, 04 · Memory. Facts come from the content brief and the founder.
 * AURA, the compression algorithm, grew out of Tom Turney's TurboQuant+ (his
 * improvements to Google's TurboQuant) in work with Eric Kryski; the FAQ
 * credits both and links Google's announcement. In Whisk it is opt-in for cold
 * vectors, so the copy never says embeddings are compressed by default.
 * Session recall (continuity) is not in the current release: every claim about
 * it is labelled in development.
 */
export const whisk: Localized<ProductCopy> = {
  en: {
    layer: 'Memory',
    tagline: 'Memory for your AI, kept on your machine.',
    summary:
      'Whisk indexes the files you already have, from notes and code to spreadsheets, PDFs and recordings, and hands your AI the passages that matter with a citation to the original. Recall of your assistant’s own sessions, by day, week and month, is in development.',
    seo: {
      title: 'Whisk: local memory and retrieval for your AI',
      description:
        'Whisk searches your notes, code, documents, spreadsheets, PDFs and media on your own machine and returns cited passages over MCP. Session recall across days and assistants is in development.',
      keywords: [
        'local RAG',
        'AI memory',
        'MCP retrieval',
        'private semantic search',
        'document search for AI',
      ],
    },
    hero: {
      title: 'Your AI forgets. Your *files* don’t.',
      lede: 'Whisk indexes what is on your computer and gives your AI the relevant passages when it needs them, each with a citation back to the file, page, slide or cell range it came from. Nothing is uploaded; retrieval runs on your machine.',
      highlights: [
        { value: 'Local', label: 'indexing and search on your own machine' },
        {
          value: 'Cited',
          label: 'every passage names its file, page, slide or cell range',
        },
        {
          value: 'MCP',
          label: 'plus a hook that searches before the prompt is sent',
        },
      ],
    },
    story: {
      heading: 'Stop re-explaining *yourself*.',
      problem:
        'Every new chat starts from nothing. You paste in the same quote, the same spreadsheet, the same half of a PDF, and when the answer comes back you cannot tell which of them it used. The work you did yesterday with the assistant is gone from its view by morning.',
      outcome:
        'Whisk indexes your notes, code, documents and media on your own machine and watches them for changes. Your AI asks Whisk, or Whisk answers before the prompt is sent, and every passage comes back with a citation you can open. Recall of the assistant’s own sessions, so it can pick up where it left off, is in development.',
      outcomes: [
        'Keep everything in-house: files, index and search stay on your machine, and retrieval needs no hosted AI key.',
        'Check any answer: results cite the file and the page, slide, sheet range or time range they came from.',
        'Search the way you think: by the exact words you used or by what you meant, across every folder you registered.',
      ],
    },
    capabilities: {
      heading: 'What Whisk *does*.',
      intro: 'A memory layer you run yourself, for the files you already have.',
      items: [
        {
          title: 'Reads your documents as they are',
          body: 'Word, PowerPoint and Excel files, PDFs with a text layer or scanned, images, audio and video. Spreadsheet formulas are kept as text, never evaluated.',
        },
        {
          title: 'Cites the original',
          body: 'A result from a PDF names the page, from a deck the slide, from a workbook the sheet and cell range, from a recording the seconds. Moved folders still resolve.',
        },
        {
          title: 'Searches by words and by meaning',
          body: 'Keyword search with stemming, dense search over embeddings, and a file-name match for documents whose subject is only in the title. Results are fused into one ranked list.',
        },
        {
          title: 'Keeps the current version first',
          body: 'When a folder holds several versions of one document, the newest ranks first and older ones are labelled superseded, never dropped.',
        },
        {
          title: 'Answers questions that span sources',
          body: 'Ask what each department decided and get one card per source with its best passage, plus a list of sources that were searched and had nothing.',
        },
        {
          title: 'Works unprompted',
          body: 'A Claude Code hook searches before each eligible prompt and injects only passages that pass a confidence gate. A rejected lookup adds nothing.',
        },
      ],
    },
    code: {
      heading: 'Index a folder, then *ask*.',
      intro:
        'Point Whisk at a folder. Any MCP client can search it, and the Claude Code hook can search it for you.',
      caption:
        'Illustrative. Replace the placeholders with your folder and project name. Options and defaults are in the docs.',
    },
    extras: [
      {
        id: 'privacy',
        heading: 'Private by *construction*.',
        intro:
          'Whisk runs on your machine. These are the controls that keep it there.',
        items: [
          {
            title: 'Loopback only',
            body: 'The MCP port accepts connections from this machine. Binding to a network address is refused unless you allow it explicitly, and the log says the port is unauthenticated.',
          },
          {
            title: 'Restricted projects',
            body: 'Mark a folder restricted and it is left out of every automatic search. It is searched only when named.',
          },
          {
            title: 'Redacted logs',
            body: 'Query text and working directories can be redacted from operational logs, and the replay log can be turned off.',
          },
          {
            title: 'Injection hygiene',
            body: 'Text the hook places in a prompt is sanitised: hidden Unicode, fake role markers, fetchable links and long encoded blobs are removed or defanged.',
          },
        ],
        note: 'There is no per-user authentication on the local port today. Keep the daemon on loopback and treat the index with the same care as the files it was built from.',
      },
      {
        id: 'continuity',
        heading: 'Remembering the *work itself*.',
        intro:
          'In development: Whisk is learning to remember what you and your assistant did, so a new session can start where the last one stopped. None of this is in the current release.',
        items: [
          {
            title: 'What did I do yesterday?',
            body: 'Recall by day, week or month, grouped by project, with where each session stopped. Calendar days follow your time zone, including the long and short days around daylight saving.',
          },
          {
            title: 'Across assistants and machines',
            body: 'Imports Claude Code, Codex and Grok transcripts and keeps which computer each came from. A copied or forked session is linked to its parent, not counted twice.',
          },
          {
            title: 'Said versus done',
            body: 'A pull request counts as created only when the command’s receipt says so. An assistant’s “done” without a receipt stays a claim.',
          },
          {
            title: 'Citations to the byte',
            body: 'Every line in a recap expands to the exact transcript record it came from, even after the session has been archived.',
          },
          {
            title: 'Corrections win',
            body: 'When a recap is trimmed to fit, your latest correction keeps its place ahead of an assistant’s older summary.',
          },
          {
            title: 'Forgetting that sticks',
            body: 'Delete a session and it cannot be re-imported. Purge removes the content, its summaries and its archive copies.',
          },
        ],
        note: 'Early. Live capture is opt-in per client, imports are explicit, and recall covers captured sessions only; it never claims to know your whole day. Not yet in any release.',
      },
    ],
    specs: {
      heading: 'Technical *specifics*.',
      rows: [
        {
          term: 'Indexes',
          chips: [
            { label: 'Markdown' },
            { label: 'Code' },
            { label: 'DOCX' },
            { label: 'PPTX' },
            { label: 'XLSX' },
            { label: 'PDF' },
            { label: 'Images' },
            { label: 'Audio' },
            { label: 'Video' },
            { label: 'Assistant sessions', inProgress: true },
          ],
        },
        {
          term: 'Where it runs',
          detail:
            'Locally, on your machine. Python 3.11 or newer. Native EmbeddingGemma 2 embeddings through Butter on Apple silicon; a portable CPU embedder otherwise.',
        },
        {
          term: 'Search',
          detail:
            'Keyword (FTS5, stemmed) plus dense vector search with rank fusion. File-name matching. Version preference within a folder. Cross-source grouping.',
        },
        {
          term: 'Citations',
          detail:
            'File path plus page, slide, sheet and cell range, or start and end seconds.',
          chips: [
            { label: 'Session citations to exact bytes', inProgress: true },
          ],
        },
        {
          term: 'Interfaces',
          detail:
            'MCP over stdio or HTTP on loopback. Claude Code UserPromptSubmit hook. DeepSeek Harness hook.',
        },
        {
          term: 'Embeddings',
          detail:
            'Stored as float32 by default. Optional lossless or AURA-derived compression for cold vectors in a new cache.',
        },
        {
          term: 'Privacy controls',
          detail:
            'Loopback binding, restricted projects, query and path redaction, prompt sanitiser.',
        },
        {
          term: 'Availability',
          detail: 'Private and closed source during early access.',
        },
      ],
    },
    stack: {
      heading: 'Works with the rest of the *stack*.',
      intro:
        'Whisk works on its own with any MCP client. Butter supplies native embeddings on Apple silicon, Syrup watches the machines, and Iron compiles the kernels underneath.',
    },
    faq: [
      {
        question: 'Is Whisk open source?',
        answer:
          'Not today. Whisk is private and closed source during early access. Request access and we’ll write when there is more to share.',
      },
      {
        question: 'Does my data leave my machine?',
        answer:
          'No. Indexing and search run locally and need no hosted AI key. The one network event is the first download of the embedding model. If you point your assistant at a hosted AI provider, that provider sees what the assistant sends it; Whisk does not change that.',
      },
      {
        question: 'What does it index?',
        answer:
          'Notes, code, Word, PowerPoint and Excel files, PDFs including scanned ones, images, audio and video. Audio is indexed for meaning, not transcribed; scanned pages get optional OCR on macOS.',
      },
      {
        question: 'Will it remember what my assistant did yesterday?',
        answer:
          'Not in the current release. Session recall across days, assistants and computers is in development, with citations back to the exact transcript record. We will write when it ships.',
      },
      {
        question: 'What is AURA?',
        answer:
          'Our compression algorithm for the KV cache, embeddings and model weights. In Whisk it is an option for cold vectors in a new index; the default stores embeddings uncompressed. It was inspired by TurboQuant+, Tom Turney’s improvements to Google’s [TurboQuant](https://research.google/blog/turboquant-redefining-ai-efficiency-with-extreme-compression/), and we took it even further with some novel techniques of our own. AURA came out of a collaboration between Eric Kryski and Tom Turney.',
      },
      {
        question: 'What can use Whisk?',
        answer:
          'Anything that speaks MCP. Claude Code can also run it as a hook, so relevant passages arrive before the model sees your prompt.',
      },
    ],
    cta: {
      title: 'Give your AI a *memory*.',
      body: 'Whisk is in early access and closed source for now. Request access, or tell us which files you wish your AI already knew.',
    },
  },
  es: whiskEs,
  fr: whiskFr,
  zh: whiskZh,
  ja: whiskJa,
  ko: whiskKo,
};
