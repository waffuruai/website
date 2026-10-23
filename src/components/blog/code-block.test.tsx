import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { MdxFigure, Pre } from '@/components/blog/code-block';
import { withDictionary } from '@/i18n/test-utils';

const themes = 'waffuru-dark waffuru-light';

/** What rehype-pretty-code emits for a fenced block with `title="unary.rs"`. */
const highlighted = (title?: string) => (
  <MdxFigure data-rehype-pretty-code-figure="">
    {title && (
      <figcaption
        data-rehype-pretty-code-title=""
        data-language="rust"
        data-theme={themes}
      >
        {title}
      </figcaption>
    )}
    <Pre data-language="rust" data-theme={themes}>
      <code data-language="rust" data-theme={themes}>
        <span data-line="">
          <span style={{ '--shiki-dark': '#e39a7a' } as React.CSSProperties}>
            pub fn
          </span>
          <span> iron_exp</span>
        </span>
        {'\n'}
        <span data-line="">
          <span>{'}'}</span>
        </span>
      </code>
    </Pre>
  </MdxFigure>
);

describe('MdxFigure', () => {
  it('frames a highlighted block: file name, language, Copy', () => {
    const { container } = render(withDictionary(highlighted('unary.rs')));

    const frame = container.querySelector('figure[data-code-block]');
    expect(frame?.getAttribute('aria-label')).toBe('unary.rs');
    expect(container.querySelector('[data-code-title]')?.textContent).toBe(
      'unary.rs',
    );
    expect(container.querySelector('[data-code-language]')?.textContent).toBe(
      'rust',
    );
    expect(screen.getByRole('button', { name: 'Copy unary.rs' })).toBeTruthy();
    // The highlighted tokens stay inside the one <pre>.
    expect(container.querySelectorAll('pre')).toHaveLength(1);
    expect(container.querySelector('pre span[style]')?.textContent).toBe(
      'pub fn',
    );
  });

  it('scrolls inside the block and is keyboard reachable', () => {
    const { container } = render(withDictionary(highlighted('unary.rs')));
    const pre = container.querySelector('pre');
    expect(pre?.className).toContain('overflow-x-auto');
    expect(pre?.getAttribute('tabindex')).toBe('0');
  });

  it('uses the language as the label when there is no title', () => {
    const { container } = render(withDictionary(highlighted()));
    expect(container.querySelector('[data-code-title]')?.textContent).toBe(
      'rust',
    );
    // Not repeated on the right.
    expect(container.querySelector('[data-code-language]')).toBeNull();
    expect(screen.getByRole('button', { name: 'Copy rust' })).toBeTruthy();
  });

  it('copies the code as plain text, line breaks included', async () => {
    const user = userEvent.setup();
    render(withDictionary(highlighted('unary.rs')));

    await user.click(screen.getByRole('button', { name: 'Copy unary.rs' }));

    expect(await navigator.clipboard.readText()).toBe('pub fn iron_exp\n}');
  });

  it('passes any other figure through untouched', () => {
    const { container } = render(
      withDictionary(
        <MdxFigure>
          <p>A diagram</p>
          <figcaption>A diagram</figcaption>
        </MdxFigure>,
      ),
    );
    expect(container.querySelector('figure[data-code-block]')).toBeNull();
    expect(container.querySelector('figcaption')?.textContent).toBe(
      'A diagram',
    );
    expect(screen.queryByRole('button')).toBeNull();
  });
});

describe('Pre', () => {
  it('frames a plain fence that was never highlighted', async () => {
    const user = userEvent.setup();
    const { container } = render(
      withDictionary(
        <Pre>
          <code className="language-sh">
            {'curl -fsSL https://x.test | sh\n'}
          </code>
        </Pre>,
      ),
    );

    expect(container.querySelector('[data-code-title]')?.textContent).toBe(
      'sh',
    );
    await user.click(screen.getByRole('button', { name: 'Copy sh' }));
    expect(await navigator.clipboard.readText()).toBe(
      'curl -fsSL https://x.test | sh\n',
    );
  });

  it('does not frame twice inside a highlighted figure', () => {
    const { container } = render(withDictionary(highlighted('unary.rs')));
    expect(container.querySelectorAll('figure[data-code-block]')).toHaveLength(
      1,
    );
    expect(screen.getAllByRole('button')).toHaveLength(1);
  });
});
