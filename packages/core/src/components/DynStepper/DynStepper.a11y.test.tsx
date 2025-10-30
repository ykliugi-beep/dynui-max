import { describe, it, expect, vi } from 'vitest';
import { render } from '../../test/test-utils';
import { axe, toHaveNoViolations } from 'vitest-axe';
import { DynStepper } from './DynStepper';
import type { StepData } from './DynStepper';

expect.extend(toHaveNoViolations);

const mockSteps: StepData[] = [
  { key: 'step1', label: 'Personal Info' },
  { key: 'step2', label: 'Payment Details' },
  { key: 'step3', label: 'Confirmation', disabled: true }
];

describe('DynStepper Accessibility', () => {
  it('has no accessibility violations in horizontal layout', async () => {
    const handleStepChange = vi.fn();
    const { container } = render(
      <DynStepper 
        currentStep={0} 
        onStepChange={handleStepChange} 
        steps={mockSteps}
        orientation="horizontal"
      />
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has no accessibility violations in vertical layout', async () => {
    const handleStepChange = vi.fn();
    const { container } = render(
      <DynStepper 
        currentStep={1} 
        onStepChange={handleStepChange} 
        steps={mockSteps}
        orientation="vertical"
      />
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has no accessibility violations with error state', async () => {
    const errorSteps: StepData[] = [
      { key: 'step1', label: 'Step 1', status: 'error' },
      { key: 'step2', label: 'Step 2' },
      { key: 'step3', label: 'Step 3' }
    ];
    
    const handleStepChange = vi.fn();
    const { container } = render(
      <DynStepper 
        currentStep={1} 
        onStepChange={handleStepChange} 
        steps={errorSteps}
      />
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has no accessibility violations with disabled steps', async () => {
    const handleStepChange = vi.fn();
    const { container } = render(
      <DynStepper 
        currentStep={0} 
        onStepChange={handleStepChange} 
        steps={mockSteps}
      />
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});