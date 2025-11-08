import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'vitest-axe';
import { DynStepper } from './DynStepper';
import type { StepData } from './DynStepper';

expect.extend(toHaveNoViolations);

const mockSteps: StepData[] = [
  { key: 'step1', title: 'Personal Information', description: 'Enter your details' },
  { key: 'step2', title: 'Contact', description: 'How can we reach you' },
  { key: 'step3', title: 'Confirmation', description: 'Review and submit' }
];

describe('DynStepper - Accessibility', () => {
  it('has no accessibility violations - horizontal', async () => {
    const { container } = render(
      <DynStepper current={1} steps={mockSteps} orientation="horizontal" />
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has no accessibility violations - vertical', async () => {
    const { container } = render(
      <DynStepper current={1} steps={mockSteps} orientation="vertical" />
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has no accessibility violations - with icons', async () => {
    const stepsWithIcons: StepData[] = mockSteps.map((step, idx) => ({
      ...step,
      icon: <span data-testid={`icon-${idx}`}>✓</span>
    }));

    const { container } = render(
      <DynStepper current={1} steps={stepsWithIcons} showNumbers={false} />
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has no accessibility violations - with errors', async () => {
    const stepsWithError: StepData[] = [
      mockSteps[0],
      { ...mockSteps[1], status: 'error' },
      mockSteps[2]
    ];

    const { container } = render(
      <DynStepper current={1} steps={stepsWithError} />
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
