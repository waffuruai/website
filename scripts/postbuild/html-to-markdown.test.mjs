// @vitest-environment node
import { describe, expect, it } from 'vitest';

import {
  attribute,
  decodeEntities,
  htmlToMarkdown,
  mainHtml,
} from './html-to-markdown.mjs';

const BASE = 'https://waffuru.ai/about';
const md = (html) => htmlToMarkdown(html, BASE);

describe('htmlToMarkdown', () => {
  it('converts headings, paragraphs and inline formatting', () => {
    expect(
      md(
        '<h1>Raw math, <em>pressed</em> into silicon.</h1><p>No <strong>Python</strong>, <em>ever</em>. Run <code>butter serve</code>.</p><h2>Next</h2>',
      ),
    ).toBe(
      '# Raw math, *pressed* into silicon.\n\nNo **Python**, *ever*. Run `butter serve`.\n\n## Next\n',
    );
  });

  it('resolves links against the page, anchors included', () => {
    expect(
      md(
        '<p><a href="/contact?topic=sales">Talk to us</a> or <a href="https://docs.waffuru.ai">read the docs</a>. <a href="#faq">FAQ</a> <a href="#">Top</a></p>',
      ),
    ).toBe(
      '[Talk to us](https://waffuru.ai/contact?topic=sales) or [read the docs](https://docs.waffuru.ai/). [FAQ](https://waffuru.ai/about#faq) Top\n',
    );
  });

  it('prefers a more specific aria-label, and names icon-only links', () => {
    expect(
      md(
        '<a href="/x.png" aria-label="Download Original">Download</a> <a href="/y" aria-label="Docs">Read more</a> <a href="https://x.dev" aria-label="GitHub"><svg></svg></a>',
      ),
    ).toBe(
      '[Download Original](https://waffuru.ai/x.png) [Read more](https://waffuru.ai/y) [GitHub](https://x.dev/)\n',
    );
  });

  it('drops visually hidden text in a link but uses it when there is no other name', () => {
    expect(
      md(
        '<a href="https://docs.waffuru.ai">Read the docs<span class="sr-only">(opens in a new tab)</span></a> <a href="/close"><span class="sr-only">Close</span></a><p><span class="sr-only">Hidden</span> kept</p>',
      ),
    ).toBe(
      '[Read the docs](https://docs.waffuru.ai/) [Close](https://waffuru.ai/close)\n\nHidden kept\n',
    );
  });

  it('keeps the pieces of flex and grid layouts apart', () => {
    // A column: each child its own line. A row: side by side, spaced.
    expect(
      md(
        '<li class="flex flex-col"><span>Original</span><span>PNG · 384 × 384</span></li>',
      ),
    ).toBe('Original\n\nPNG · 384 × 384\n');
    expect(
      md(
        '<p class="flex flex-wrap"><span>Company</span><span>October 26</span><span>5 min read</span></p>',
      ),
    ).toBe('Company October 26 5 min read\n');
    expect(
      md(
        '<a href="/legal/terms" class="grid gap-4"><span>Terms of use</span><span>The rules.<span class="block">Last updated <time>Oct 26</time></span></span></a>',
      ),
    ).toBe(
      '[Terms of use](https://waffuru.ai/legal/terms)\n\nThe rules.\n\nLast updated Oct 26\n',
    );
    // Prefixed utilities (md:flex) say nothing about the base layout.
    expect(md('<p class="md:flex"><span>a</span><span>b</span></p>')).toBe(
      'ab\n',
    );
  });

  it('ends a block at an element made block-level by class', () => {
    expect(md('<div><span class="block">One</span>Two</div>')).toBe(
      'One\n\nTwo\n',
    );
  });

  it('spaces buttons and labels from what is next to them', () => {
    expect(
      md('<form><label>Email</label><button>Subscribe</button></form>'),
    ).toBe('Email Subscribe\n');
  });

  it('keeps a space between adjacent links but not before punctuation', () => {
    expect(
      md(
        '<p><a href="/a">One</a><a href="/b">Two</a> (<a href="/c">three</a>)</p>',
      ),
    ).toBe(
      '[One](https://waffuru.ai/a) [Two](https://waffuru.ai/b) ([three](https://waffuru.ai/c))\n',
    );
  });

  it('keeps mailto links as they are', () => {
    expect(
      md('<p><a href="mailto:hello@waffuru.ai?subject=Sales">Email us</a></p>'),
    ).toBe('[Email us](mailto:hello@waffuru.ai?subject=Sales)\n');
  });

  it('links the heading of a card that is one big link', () => {
    expect(
      md(
        '<a href="/products/iron"><span>01</span><h3>Iron</h3><p>One kernel definition, four backends.</p></a>',
      ),
    ).toBe(
      '01\n\n### [Iron](https://waffuru.ai/products/iron)\n\nOne kernel definition, four backends.\n',
    );
    expect(md('<li><a href="/x"><div>Whole row</div></a></li>')).toBe(
      '[Whole row](https://waffuru.ai/x)\n',
    );
  });

  it('keeps lists together, nested and ordered', () => {
    expect(
      md(
        '<ul><li>One</li><li>Two<ol><li>First</li><li>Second</li></ol></li></ul>',
      ),
    ).toBe('- One\n- Two\n  1. First\n  2. Second\n');
  });

  it('hangs the rest of a list item under its first line', () => {
    expect(
      md(
        '<ol><li><span class="block">01</span><h3>Demand is limitless</h3><p>Scaling takes more.</p></li><li><p>Second</p></li></ol>',
      ),
    ).toBe(
      '1. 01\n\n   ### Demand is limitless\n\n   Scaling takes more.\n\n2. Second\n',
    );
  });

  it('nests under the width of an ordered marker', () => {
    expect(
      md('<ol><li>First<ul><li>inner</li><li>more</li></ul></li></ol>'),
    ).toBe('1. First\n   - inner\n   - more\n');
  });

  it('keeps a card heading inside its list item and links it', () => {
    expect(
      md(
        '<ul><li><a href="/products/iron"><h3>Iron</h3><p>Kernels.</p></a></li></ul>',
      ),
    ).toBe('- ### [Iron](https://waffuru.ai/products/iron)\n\n  Kernels.\n');
  });

  it('renders tables', () => {
    expect(
      md(
        '<table><thead><tr><th>Backend</th><th>Tier</th></tr></thead><tbody><tr><td>Metal</td><td>Primary</td></tr><tr><td>CUDA | PTX</td><td>Secondary</td></tr></tbody></table>',
      ),
    ).toBe(
      '| Backend | Tier |\n| --- | --- |\n| Metal | Primary |\n| CUDA \\| PTX | Secondary |\n',
    );
  });

  it('keeps code blocks verbatim', () => {
    expect(
      md('<pre><code>curl -X POST &quot;$URL&quot;\n  -d {}</code></pre>'),
    ).toBe('```\ncurl -X POST "$URL"\n  -d {}\n```\n');
  });

  it('keeps the language of highlighted code (rehype-pretty-code)', () => {
    const html =
      '<figure data-rehype-pretty-code-figure><pre style="x" data-language="rust" data-theme="dark"><code data-language="rust" data-theme="dark"><span data-line><span style="c">pub fn</span><span> iron_exp() {</span></span>\n<span data-line><span>  store(out[idx], exp(x));</span></span>\n<span data-line><span>}</span></span></code></pre></figure>';
    expect(md(html)).toBe(
      '```rust\npub fn iron_exp() {\n  store(out[idx], exp(x));\n}\n```\n',
    );
  });

  it('reads the language from a language- class and skips plain text', () => {
    expect(md('<pre><code class="language-sh">ls</code></pre>')).toBe(
      '```sh\nls\n```\n',
    );
    expect(md('<pre data-language="plaintext"><code>x</code></pre>')).toBe(
      '```\nx\n```\n',
    );
  });

  it('closes a code block inside wrappers and uses a longer fence when needed', () => {
    expect(
      md(
        '<div><span><pre data-language="md"><code><span>```js</span>\n<span>x</span>\n<span>```</span></code></pre></span><p>after</p></div>',
      ),
    ).toBe('````md\n```js\nx\n```\n````\n\nafter\n');
  });

  it('does not escape inside inline code', () => {
    expect(md('<p>Use <code>a_b * c[0]</code> and 5 * 4</p>')).toBe(
      'Use `a_b * c[0]` and 5 \\* 4\n',
    );
  });

  it('drops scripts, inline SVG, navigation and decorative subtrees', () => {
    expect(
      md(
        '<nav><a href="/">Home</a></nav><div aria-hidden="true"><p>decor</p></div><script>x<y</script><svg><text>logo</text></svg><p>Kept</p><div hidden><p>gone</p></div><p data-note="a hidden thing">stays</p>',
      ),
    ).toBe('Kept\n\nstays\n');
  });

  it('uses image alt text only when an image is the whole item', () => {
    expect(
      md(
        '<ul><li><img alt="Metal" src="/a.png"></li><li><img alt="" src="/b.png">CUDA</li></ul><p><img alt="Portrait" src="/c.jpg">Hello.</p>',
      ),
    ).toBe('- Metal\n- CUDA\n\nHello.\n');
  });

  it('handles quotes, rules and entities', () => {
    expect(
      md(
        '<blockquote><p>It&rsquo;s &amp; done&nbsp;now</p><p>Second</p></blockquote><hr><p>&#x2014; &#169;</p>',
      ),
    ).toBe('> It\u2019s & done now\n>\n> Second\n\n---\n\n\u2014 \u00a9\n');
  });

  it('escapes Markdown characters in text', () => {
    expect(md('<p>5 * 4 [draft] a_b _x_ C:\\path</p>')).toBe(
      '5 \\* 4 \\[draft\\] a_b \\_x\\_ C:\\\\path\n',
    );
  });

  it('escapes text that would start a heading, list or quote', () => {
    expect(md('<p># not a heading</p><p>- not a list</p><p>1. no</p>')).toBe(
      '\\# not a heading\n\n\\- not a list\n\n\\1. no\n',
    );
  });

  it('moves whitespace out of emphasis and drops empty pairs', () => {
    expect(md('<p>a <em> b </em>c <strong></strong><em> </em>d</p>')).toBe(
      'a *b* c d\n',
    );
  });

  it('turns a details summary into a bold question', () => {
    expect(
      md(
        '<details><summary>Does it need Python?</summary><p>No.</p></details>',
      ),
    ).toBe('**Does it need Python?**\n\nNo.\n');
  });

  it('wraps link destinations that contain spaces or parentheses', () => {
    expect(md('<p><a href="/a b/(c)">x</a></p>')).toBe(
      '[x](<https://waffuru.ai/a%20b/(c)>)\n',
    );
  });
});

describe('mainHtml', () => {
  it('returns the contents of main, else of body', () => {
    expect(
      mainHtml(
        '<body><header>x</header><main id="main"><h1>Hi</h1></main></body>',
      ),
    ).toBe('<h1>Hi</h1>');
    expect(mainHtml('<html><body><p>Hi</p></body></html>')).toBe('<p>Hi</p>');
  });
});

describe('decodeEntities', () => {
  it('decodes named and numeric entities and leaves unknown ones', () => {
    expect(decodeEntities('&lt;a&gt; &#39;x&#x27; &mdash; &unknown;')).toBe(
      "<a> 'x' \u2014 &unknown;",
    );
  });

  it('leaves out-of-range numeric entities alone', () => {
    expect(decodeEntities('&#99999999;')).toBe('&#99999999;');
  });
});

describe('attribute', () => {
  it('reads quoted and bare values and decodes entities', () => {
    expect(attribute(' href="/a?x=1&amp;y=2" lang=en', 'href')).toBe(
      '/a?x=1&y=2',
    );
    expect(attribute(' href="/a" lang=en', 'lang')).toBe('en');
    expect(attribute(' href="/a"', 'title')).toBeUndefined();
  });
});
