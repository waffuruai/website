// @vitest-environment node
import { describe, expect, it } from 'vitest';

import { GET, dynamic } from './route';

type Group = { agents: string[]; rules: string[] };

/** The groups of a robots.txt: user agents followed by their rules. */
function parseGroups(text: string): Group[] {
  const groups: Group[] = [];
  let current: Group | null = null;
  let previousWasAgent = false;
  for (const raw of text.split('\n')) {
    const line = raw.replace(/#.*/, '').trim();
    if (!line) continue;
    const [key, ...rest] = line.split(':');
    const value = rest.join(':').trim();
    if (key.toLowerCase() === 'user-agent') {
      if (!current || !previousWasAgent) {
        current = { agents: [], rules: [] };
        groups.push(current);
      }
      current.agents.push(value);
      previousWasAgent = true;
    } else {
      previousWasAgent = false;
      current?.rules.push(`${key}: ${value}`);
    }
  }
  return groups;
}

const response = GET();
const text = await response.text();
const groups = parseGroups(text);
const groupOf = (agent: string) =>
  groups.find((group) => group.agents.includes(agent));

describe('robots.txt', () => {
  it('is static plain text', () => {
    expect(dynamic).toBe('force-static');
    expect(response.headers.get('content-type')).toBe(
      'text/plain; charset=utf-8',
    );
    expect(text.endsWith('\n')).toBe(true);
  });

  it('opens with the Content Signals Policy preamble', () => {
    expect(text).toContain(
      '# As a condition of accessing this website, you agree to',
    );
    expect(text).toContain('# ai-train: training or fine-tuning AI models.');
    expect(text).toContain('ARTICLE 4 OF THE EUROPEAN');
  });

  it('allows search, input and not training for everyone else', () => {
    const everyone = groupOf('*');
    expect(everyone?.rules).toEqual(
      expect.arrayContaining([
        'Content-Signal: search=yes, ai-input=yes, ai-train=no',
        'Allow: /',
      ]),
    );
    expect(everyone?.rules).not.toContain('Disallow: /');
  });

  it.each([
    'Googlebot',
    'Bingbot',
    'OAI-SearchBot',
    'ChatGPT-User',
    'Claude-SearchBot',
    'Claude-User',
    'PerplexityBot',
    'Perplexity-User',
    'DuckAssistBot',
    'Applebot',
  ])('explicitly allows %s', (agent) => {
    const group = groupOf(agent);
    expect(group?.rules).toContain('Allow: /');
    expect(group?.rules).not.toContain('Disallow: /');
    expect(group?.rules).toContain(
      'Content-Signal: search=yes, ai-input=yes, ai-train=no',
    );
  });

  it.each([
    'GPTBot',
    'ClaudeBot',
    'Google-Extended',
    'Applebot-Extended',
    'CCBot',
    'Meta-ExternalAgent',
    'Bytespider',
  ])('disallows the training-only crawler %s', (agent) => {
    const group = groupOf(agent);
    expect(group?.rules).toContain('Disallow: /');
    expect(group?.rules).not.toContain('Allow: /');
  });

  it('never lists an agent twice (a repeat would be a second, conflicting group)', () => {
    const agents = groups.flatMap((group) => group.agents);
    expect(new Set(agents).size).toBe(agents.length);
  });

  it('cites its sources and points at the sitemap', () => {
    expect(text).toContain('https://developers.openai.com/api/docs/bots');
    expect(text).toContain('https://support.claude.com/en/articles/8896518');
    expect(
      text.trimEnd().endsWith('Sitemap: https://waffuru.ai/sitemap.xml'),
    ).toBe(true);
  });
});
