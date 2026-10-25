import { site } from '@/content/site';

export const dynamic = 'force-static';

/*
 * robots.txt as a route handler: Next's `MetadataRoute.Robots` cannot write
 * `Content-Signal` lines. In production the Worker serves this file; on every
 * other host it answers with a disallow-all of its own (worker/index.ts).
 *
 * Policy: search engines and user-triggered agents (an assistant fetching a
 * page because someone asked it to) are welcome; crawlers that only collect
 * training data are not. The signals say the same thing in the Content
 * Signals vocabulary: search=yes, ai-input=yes, ai-train=no.
 */

const SIGNALS = 'Content-Signal: search=yes, ai-input=yes, ai-train=no';

/** Cloudflare's Content Signals Policy preamble (https://contentsignals.org). */
const PREAMBLE = `# As a condition of accessing this website, you agree to
# abide by the following content signals:

# (a)  If a content-signal = yes, you may collect content
# for the corresponding use.
# (b)  If a content-signal = no, you may not collect content
# for the corresponding use.
# (c)  If the website operator does not include a content
# signal for a corresponding use, the website operator
# neither grants nor restricts permission via content signal
# with respect to the corresponding use.

# The content signals and their meanings are:

# search: building a search index and providing search
# results (e.g., returning hyperlinks and short excerpts
# from your website's contents).  Search does not include
# providing AI-generated search summaries.
# ai-input: inputting content into one or more AI models
# (e.g., retrieval augmented generation, grounding, or other
# real-time taking of content for generative AI search
# answers).
# ai-train: training or fine-tuning AI models.

# ANY RESTRICTIONS EXPRESSED VIA CONTENT-SIGNALS ARE EXPRESS
# RESERVATIONS OF RIGHTS UNDER ARTICLE 4 OF THE EUROPEAN
# UNION DIRECTIVE 2019/790 ON COPYRIGHT AND RELATED RIGHTS
# IN THE DIGITAL SINGLE MARKET.`;

type Source = { agents: string[]; why: string; url?: string };

/**
 * Search crawlers and user-triggered agents. Each entry says what the
 * operator documents the bot as, and where.
 */
const WELCOME: Source[] = [
  { agents: ['Googlebot', 'Bingbot'], why: 'search crawlers' },
  {
    agents: ['OAI-SearchBot', 'ChatGPT-User'],
    why: 'ChatGPT search; fetches made when a user asks',
    url: 'https://developers.openai.com/api/docs/bots',
  },
  {
    agents: ['Claude-SearchBot', 'Claude-User'],
    why: 'Claude search index; fetches made when a user asks',
    url: 'https://support.claude.com/en/articles/8896518',
  },
  {
    agents: ['PerplexityBot', 'Perplexity-User'],
    why: 'Perplexity search index (not used for foundation models); fetches made when a user asks',
    url: 'https://docs.perplexity.ai/guides/bots',
  },
  {
    agents: ['DuckAssistBot'],
    why: "DuckDuckGo's assistant, a user-directed AI Assistant",
    url: 'https://developers.cloudflare.com/ai-crawl-control/reference/bots/',
  },
  {
    agents: ['Applebot'],
    why: 'Spotlight, Siri and Safari search',
    url: 'https://support.apple.com/en-us/119829',
  },
];

/**
 * Crawlers that only collect training data, each checked against the
 * operator's documentation (or Cloudflare's crawler list, which files them as
 * "AI Crawler"). Left out on purpose: Amazonbot, which also improves Amazon's
 * own services and so is not training-only, and any bot we could not verify.
 */
const TRAINING_ONLY: Source[] = [
  {
    agents: ['GPTBot'],
    why: 'may be used to train OpenAI models',
    url: 'https://developers.openai.com/api/docs/bots',
  },
  {
    agents: ['ClaudeBot'],
    why: 'may contribute to training Anthropic models',
    url: 'https://support.claude.com/en/articles/8896518',
  },
  {
    agents: ['Google-Extended'],
    why: 'robots.txt-only token controlling Gemini training and grounding; does not affect Search',
    url: 'https://developers.google.com/search/docs/crawling-indexing/google-common-crawlers',
  },
  {
    agents: ['Applebot-Extended'],
    why: 'control token for Apple generative AI training; does not crawl or affect search',
    url: 'https://support.apple.com/en-us/119829',
  },
  {
    agents: ['Meta-ExternalAgent'],
    why: 'crawls to train foundation AI models',
    url: 'https://developers.facebook.com/docs/sharing/webmasters/web-crawlers/',
  },
  {
    agents: ['CCBot'],
    why: 'Common Crawl, the open corpus much model training starts from',
    url: 'https://commoncrawl.org/ccbot',
  },
  {
    agents: ['Bytespider'],
    why: 'ByteDance, listed by Cloudflare as an AI Crawler',
    url: 'https://developers.cloudflare.com/ai-crawl-control/reference/bots/',
  },
];

const notes = (sources: Source[]) =>
  sources
    .map(
      ({ agents, why, url }) =>
        `# ${agents.join(', ')}: ${why}.${url ? ` ${url}` : ''}`,
    )
    .join('\n');

const group = (agents: string[], rules: string[]) =>
  [...agents.map((agent) => `User-agent: ${agent}`), ...rules].join('\n');

const agentsOf = (sources: Source[]) => sources.flatMap(({ agents }) => agents);

/** The robots.txt body. */
function robotsTxt(): string {
  const parts = [
    `# ${site.name} (${site.url}): search engines and user-triggered agents are\n# welcome; crawlers that only collect training data are not.`,
    PREAMBLE,
    `# Search engines and assistants fetching a page for a user.\n${notes(WELCOME)}\n${group(agentsOf(WELCOME), [SIGNALS, 'Allow: /', 'Disallow: /api/'])}`,
    `# Crawlers that only collect training data.\n${notes(TRAINING_ONLY)}\n${group(agentsOf(TRAINING_ONLY), ['Content-Signal: ai-train=no', 'Disallow: /'])}`,
    `# Everyone else.\n${group(['*'], [SIGNALS, 'Allow: /', 'Disallow: /api/'])}`,
    `Sitemap: ${site.url}/sitemap.xml`,
  ];
  return `${parts.join('\n\n')}\n`;
}

export function GET() {
  return new Response(robotsTxt(), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
