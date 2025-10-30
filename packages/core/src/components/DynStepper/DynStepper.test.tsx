import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../../test/test-utils';
import userEvent from '@testing-library/user-event';
import { DynStepper } from './DynStepper';
import type { StepData } from './DynStepper';

const mockSteps: StepData[] = [
  { key: 'step1', label: 'Step 1' },
  { key: 'step2', label: 'Step 2' },
  { key: 'step3', label: 'Step 3', disabled: true },
  { key: 'step4', label: 'Step 4' }
];

describe('DynStepper', () => {
  it('renders all steps', () => {
    const handleStepChange = vi.fn();
    
    render(
      <DynStepper 
        currentStep={0} 
        onStepChange={handleStepChange} 
        steps={mockSteps}
      />
    );
    
    expect(screen.getByText('Step 1')).toBeInTheDocument();
    expect(screen.getByText('Step 2')).toBeInTheDocument();
    expect(screen.getByText('Step 3')).toBeInTheDocument();
    expect(screen.getByText('Step 4')).toBeInTheDocument();
  });

  it('marks current step as active', () => {
    const handleStepChange = vi.fn();
    
    render(
      <DynStepper 
        currentStep={1} 
        onStepChange={handleStepChange} 
        steps={mockSteps}
      />
    );
    
    const activeStep = screen.getByRole('button', { name: /Step 2: Step 2/ });
    expect(activeStep).toHaveAttribute('aria-current', 'step');
    expect(activeStep).toHaveClass('dyn-step--active');
  });

  it('marks completed steps', () => {
    const handleStepChange = vi.fn();
    
    render(
      <DynStepper 
        currentStep={2} 
        onStepChange={handleStepChange} 
        steps={mockSteps}
      />
    );
    
    const completedSteps = screen.getAllByRole('button');
    expect(completedSteps[0]).toHaveClass('dyn-step--completed');
    expect(completedSteps[1]).toHaveClass('dyn-step--completed');
  });

  it('handles step clicks', async () => {
    const user = userEvent.setup();
    const handleStepChange = vi.fn();
    
    render(
      <DynStepper 
        currentStep={0} 
        onStepChange={handleStepChange} 
        steps={mockSteps}
      />
    );
    
    const step2 = screen.getByRole('button', { name: /Step 2: Step 2/ });
    await user.click(step2);
    
    expect(handleStepChange).toHaveBeenCalledWith(1);
  });

  it('does not handle clicks on active step', async () => {
    const user = userEvent.setup();
    const handleStepChange = vi.fn();
    
    render(
      <DynStepper 
        currentStep={1} 
        onStepChange={handleStepChange} 
        steps={mockSteps}
      />
    );
    
    const activeStep = screen.getByRole('button', { name: /Step 2: Step 2/ });
    await user.click(activeStep);
    
    expect(handleStepChange).not.toHaveBeenCalled();
  });

  it('does not handle clicks on disabled steps', async () => {
    const user = userEvent.setup();
    const handleStepChange = vi.fn();
    
    render(
      <DynStepper 
        currentStep={0} 
        onStepChange={handleStepChange} 
        steps={mockSteps}
      />
    );
    
    const disabledStep = screen.getByRole('button', { name: /Step 3: Step 3/ });
    expect(disabledStep).toBeDisabled();
    
    await user.click(disabledStep);
    expect(handleStepChange).not.toHaveBeenCalled();
  });

  it('applies vertical orientation class', () => {
    const handleStepChange = vi.fn();
    const { container } = render(
      <DynStepper 
        currentStep={0} 
        onStepChange={handleStepChange} 
        steps={mockSteps}
        orientation="vertical"
      />
    );
    
    expect(container.firstChild).toHaveClass('dyn-stepper--vertical');
  });

  it('shows check icon for completed steps', () => {
    const handleStepChange = vi.fn();
    
    render(
      <DynStepper 
        currentStep={2} 
        onStepChange={handleStepChange} 
        steps={mockSteps}
      />
    );
    
    // Check icons should be present for completed steps
    const completedSteps = screen.getAllByRole('button');
    const step1 = completedSteps[0];
    expect(step1).toHaveClass('dyn-step--completed');
  });

  it('shows error icon for error status', () => {
    const errorSteps: StepData[] = [
      { key: 'step1', label: 'Step 1', status: 'error' },
      { key: 'step2', label: 'Step 2' }
    ];
    
    const handleStepChange = vi.fn();
    
    render(
      <DynStepper 
        currentStep={1} 
        onStepChange={handleStepChange} 
        steps={errorSteps}
      />
    );
    
    const errorStep = screen.getByRole('button', { name: /Step 1: Step 1/ });
    expect(errorStep).toHaveClass('dyn-step--error');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLDivElement>();
    const handleStepChange = vi.fn();
    
    render(
      <DynStepper 
        ref={ref}
        currentStep={0} 
        onStepChange={handleStepChange} 
        steps={mockSteps}
      />
    );
    
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});