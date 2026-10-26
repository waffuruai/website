import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { ToolCostAnimation } from './tool-cost-animation';
import {
  toolResearch,
  toolResearchEvidence,
} from '@/content/pages/tool-research';

describe('measured accuracy and token tradeoff', () => {
  it('shows additional inference work without a hypothetical savings control, including after replay', async () => {
    const user = userEvent.setup();
    render(
      <ToolCostAnimation
        copy={toolResearch.en.animation}
        baselineLabel={toolResearch.en.baseline}
        candidateLabel={toolResearch.en.candidate}
        evidence={toolResearchEvidence}
      />,
    );
    expect(screen.getByText('36 / 144 · 25.0%')).toBeTruthy();
    expect(screen.getByText('56 / 144 · 38.9%')).toBeTruthy();
    expect(screen.getByText('50,382')).toBeTruthy();
    expect(screen.getByText('59,222')).toBeTruthy();
    expect(screen.getByText('+20 additional exact responses')).toBeTruthy();
    expect(
      screen.getByText('+8,840 (+17.5%) additional inference tokens'),
    ).toBeTruthy();
    expect(screen.queryByRole('slider')).toBeNull();
    expect(
      screen.getByText(/Workflow token savings.*have not been demonstrated/),
    ).toBeTruthy();
    await user.click(screen.getByRole('button', { name: 'Replay animation' }));
    expect(
      screen.getByText('+8,840 (+17.5%) additional inference tokens'),
    ).toBeTruthy();
  });
});
