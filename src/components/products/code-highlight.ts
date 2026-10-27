/**
 * A tiny highlighter for the snippet on the product pages (Butter's shell
 * example; Iron's kernel is pre-tokenized in its own section). It sorts text
 * into four roles the code panel colours with tokens, so there is no
 * syntax-highlighting dependency and nothing runs in the browser.
 */
export type TokenRole = 'muted' | 'strong' | 'accent' | 'plain';

export type Token = { role: TokenRole; text: string };

export type CodeLanguage = 'shell';

/** Prompt, line-continuation backslash, flag, string, anything else. */
const SHELL_TOKEN =
  /(^\$ )|(\\$)|((?<=\s)-{1,2}[A-Za-z][\w-]*)|("(?:[^"\\]|\\.)*")|(\s+|[^\s"]+|.)/g;

function shellLine(line: string): Token[] {
  const tokens: Token[] = [];
  let expectCommand = false;
  for (const [text, prompt, continuation, flag, string] of line.matchAll(
    SHELL_TOKEN,
  )) {
    if (prompt) {
      tokens.push({ role: 'muted', text });
      expectCommand = true;
    } else if (continuation) tokens.push({ role: 'muted', text });
    else if (flag) tokens.push({ role: 'strong', text });
    else if (string) tokens.push({ role: 'plain', text });
    else if (expectCommand && text.trim()) {
      tokens.push({ role: 'accent', text });
      expectCommand = false;
    } else tokens.push({ role: 'plain', text });
  }
  return tokens;
}

/**
 * Joins neighbouring tokens that share a role, and folds a lone space into
 * the tokens either side of it when they match, so the HTML stays small.
 */
function merge(tokens: Token[]): Token[] {
  const merged: Token[] = [];
  for (const token of tokens) {
    const last = merged.at(-1);
    if (last?.role === token.role) last.text += token.text;
    else merged.push({ ...token });
  }

  const folded: Token[] = [];
  for (let index = 0; index < merged.length; index++) {
    const token = merged[index]!;
    const before = folded.at(-1);
    const after = merged[index + 1];
    const space = token.role === 'plain' && /^ +$/.test(token.text);
    if (before && after && space && before.role === after.role) {
      before.text += token.text + after.text;
      index++;
    } else folded.push(token);
  }
  return folded;
}

const LINE: Record<CodeLanguage, (line: string) => Token[]> = {
  shell: shellLine,
};

/** Splits `source` into lines of role-tagged tokens. */
export function highlight(source: string, language: CodeLanguage): Token[][] {
  return source.split('\n').map((text) => merge(LINE[language](text)));
}
