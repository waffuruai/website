import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import {
  ToolCostAnimation,
  workflowTokenScenario,
} from './tool-cost-animation';
import {
  toolResearch,
  toolResearchEvidence,
} from '@/content/pages/tool-research';

describe('workflow token scenario', () => {
  it('charges the measured overhead before any hypothetical savings and crosses baseline after nine assumed repairs', () => {
    expect(workflowTokenScenario(59222, 0) - 50382).toBe(8840);
    expect(workflowTokenScenario(59222, 8) - 50382).toBe(840);
    expect(workflowTokenScenario(59222, 9) - 50382).toBe(-160);
  });

  it('lets keyboard users explore a clearly labeled scenario without changing measured accuracy', async () => {
    const user = userEvent.setup();
    render(
      <ToolCostAnimation
        copy={toolResearch.en.animation}
        baselineLabel={toolResearch.en.baseline}
        candidateLabel={toolResearch.en.candidate}
        evidence={toolResearchEvidence}
      />,
    );
    const slider = screen.getByRole('slider', { name: /Avoided repair turns/ });
    expect(screen.getByText('+8,840')).toBeTruthy();
    fireEvent.change(slider, { target: { value: '9' } });
    expect(screen.getByText('-160')).toBeTruthy();
    expect(screen.getByText('56 / 144 · 38.9%')).toBeTruthy();
    expect(screen.getByText(/These savings were not measured/)).toBeTruthy();
    await user.click(screen.getByRole('button', { name: /Replay animation/ }));
    expect(screen.getByText('-160')).toBeTruthy();
    expect(slider.getAttribute('value')).toBe('9');
  });
});
