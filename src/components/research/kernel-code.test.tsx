import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { KernelCode } from './kernel-code';
import { kernelCode } from '@/content/pages/kernel-code';
import { withDictionary } from '@/i18n/test-utils';

const renderKernel = () =>
  render(withDictionary(<KernelCode content={kernelCode.en} />));

describe('KernelCode', () => {
  it('breaks the heading and accents the second line', () => {
    const { container } = renderKernel();
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading.querySelector('br')).not.toBeNull();
    expect(heading.querySelector('em')?.textContent).toBe(
      'Iron writes the rest.',
    );
    expect(container.querySelectorAll('h1')).toHaveLength(0);
  });

  it('shows the kernel verbatim with its syntax colours', () => {
    const { container } = renderKernel();
    const code = container.querySelector('pre code');
    expect(code?.textContent).toBe(
      [
        '#[kernel(bench(op = "unary", subop = "exp", tol = 1e-4))]',
        'pub fn iron_exp<T>(a: Tensor<T>, out: Tensor<T>) {',
        '    let idx = program_id(0);',
        '    store(out[idx], exp(load(a[idx])));',
        '}',
      ].join('\n'),
    );
    const classOf = (text: string) =>
      screen.getByText(text, { selector: 'code span' }).className;
    expect(classOf('pub fn')).toContain('text-foreground');
    expect(classOf('let')).toContain('text-foreground');
    expect(classOf('iron_exp')).toContain('text-brand-ink');
    expect(classOf(kernelCode.en.code.tokens[0].text)).toContain(
      'text-muted-foreground',
    );
    expect(screen.getByText('unary.rs')).toBeTruthy();
    expect(screen.getByText('iron · rust dsl')).toBeTruthy();
  });

  it('keeps the code panel keyboard-scrollable', () => {
    const { container } = renderKernel();
    expect(container.querySelector('pre')?.getAttribute('tabindex')).toBe('0');
  });

  it('tiers the backends: Metal primary, CUDA secondary, ROCm and Vulkan runs', () => {
    const { container } = renderKernel();
    const tiers = screen.getAllByRole('heading', { level: 4 });
    expect(tiers.map((tier) => tier.textContent)).toEqual([
      'Apple · Metal',
      'NVIDIA · CUDA',
      'AMD ROCm · Vulkan',
    ]);
    const rows = container.querySelectorAll('ul > li');
    const [metal, cuda, rocm] = [...rows];
    expect(within(metal as HTMLElement).getByText('Primary')).toBeTruthy();
    expect(within(cuda as HTMLElement).getByText('Secondary')).toBeTruthy();
    expect(within(rocm as HTMLElement).getByText('Runs')).toBeTruthy();
    // Lit bars out of three: 3, 2, 1. Unlit bars use the "off" token.
    const unlit = (row: Element) => row.querySelectorAll('.bg-off').length;
    expect([metal, cuda, rocm].map(unlit)).toEqual([0, 1, 2]);
  });

  it('pulses at 1.4s, 2.4s and 4.6s, hidden from assistive tech', () => {
    const { container } = renderKernel();
    const pulses = [...container.querySelectorAll('.wf-pulse')];
    expect(pulses.map((pulse) => pulse.className)).toEqual([
      expect.stringContaining('[animation-duration:1.4s]'),
      expect.stringContaining('[animation-duration:2.4s]'),
      expect.stringContaining('[animation-duration:4.6s]'),
    ]);
    for (const pulse of pulses) {
      expect(pulse.closest('[aria-hidden="true"]')).not.toBeNull();
    }
  });

  it('keeps the CUDA and ROCm notes honest', () => {
    renderKernel();
    expect(
      screen.getByText('In production on RTX and DGX Spark. CUDA → PTX.'),
    ).toBeTruthy();
    expect(
      screen.getByText('Moving fast on AMD. HIP → AMDGPU, Vulkan → SPIR-V.'),
    ).toBeTruthy();
  });

  it('lists where it runs, with datacenter GPUs as a dashed chip', () => {
    renderKernel();
    const group = screen.getByRole('group', { name: 'Runs on' });
    for (const item of kernelCode.en.runsOn.items) {
      expect(within(group).getByText(item)).toBeTruthy();
    }
    const pending = within(group).getByText(
      'Enterprise datacenter GPUs · next',
    );
    expect(pending.className).toContain('border-dashed');
  });
});
