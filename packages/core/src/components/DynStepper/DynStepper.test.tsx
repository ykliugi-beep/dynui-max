import React, { useRef } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DynStepper } from './DynStepper';
import type { DynStepperRef, StepData } from './DynStepper';

const mockSteps: StepData[] = [
  { key: 'step1', title: 'Step 1', description: 'First step' },
  { key: 'step2', title: 'Step 2', description: 'Second step' },
  { key: 'step3', title: 'Step 3', description: 'Third step' }
];

describe('DynStepper', () => {
  it('renders all steps', () => {
    render(<DynStepper current={0} steps={mockSteps} />);

    expect(screen.getByText('Step 1')).toBeInTheDocument();
    expect(screen.getByText('Step 2')).toBeInTheDocument();
    expect(screen.getByText('Step 3')).toBeInTheDocument();
  });

  it('marks current step correctly', () => {
    const { container } = render(<DynStepper current={1} steps={mockSteps} />);

    const currentStep = container.querySelector('[aria-current="step"]');
    expect(currentStep).toBeInTheDocument();
  });

  it('shows completed steps', () => {
    const { container } = render(<DynStepper current={2} steps={mockSteps} />);

    const completedSteps = container.querySelectorAll('.dyn-stepper__step--complete');
    expect(completedSteps.length).toBe(2);
  });

  it('calls onChange when clicking clickable step', async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();

    render(
      <DynStepper
        current={2}
        steps={mockSteps}
        onChange={handleChange}
        clickable
      />
    );

    await user.click(screen.getByText('Step 1'));

    expect(handleChange).toHaveBeenCalledWith(0, mockSteps[0]);
  });

  it('does not allow clicking future steps', async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();

    render(
      <DynStepper
        current={0}
        steps={mockSteps}
        onChange={handleChange}
        clickable
      />
    );

    await user.click(screen.getByText('Step 3'));

    expect(handleChange).not.toHaveBeenCalled();
  });

  it('supports vertical orientation', () => {
    const { container } = render(
      <DynStepper current={0} steps={mockSteps} orientation="vertical" />
    );

    expect(container.querySelector('.dyn-stepper--vertical')).toBeInTheDocument();
  });

  it('hides connectors when showConnectors is false', () => {
    const { container } = render(
      <DynStepper current={0} steps={mockSteps} showConnectors={false} />
    );

    expect(container.querySelector('.dyn-stepper__connector')).not.toBeInTheDocument();
  });

  it('uses numbers by default', () => {
    const { container } = render(<DynStepper current={0} steps={mockSteps} />);

    expect(container.querySelector('.dyn-stepper__number')).toBeInTheDocument();
  });

  it('can hide numbers', () => {
    const { container } = render(
      <DynStepper current={0} steps={mockSteps} showNumbers={false} />
    );

    expect(container.querySelector('.dyn-stepper__number')).not.toBeInTheDocument();
  });

  it('shows custom icons when provided', () => {
    const stepsWithIcons: StepData[] = [
      { key: 'step1', title: 'Step 1', icon: <span data-testid="custom-icon">📧</span> }
    ];

    render(<DynStepper current={0} steps={stepsWithIcons} />);

    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
  });

  it('handles disabled steps', () => {
    const stepsWithDisabled: StepData[] = [
      { key: 'step1', title: 'Step 1' },
      { key: 'step2', title: 'Step 2', disabled: true }
    ];

    const { container } = render(
      <DynStepper current={0} steps={stepsWithDisabled} clickable />
    );

    const disabledStep = container.querySelector('.dyn-stepper__step--disabled');
    expect(disabledStep).toBeInTheDocument();
  });

  it('shows error status', () => {
    const stepsWithError: StepData[] = [
      { key: 'step1', title: 'Step 1', status: 'error' }
    ];

    const { container } = render(<DynStepper current={0} steps={stepsWithError} />);

    expect(container.querySelector('.dyn-stepper__step--error')).toBeInTheDocument();
  });

  it('supports keyboard navigation on clickable steps', async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();

    render(
      <DynStepper
        current={1}
        steps={mockSteps}
        onChange={handleChange}
        clickable
      />
    );

    const step1 = screen.getByText('Step 1');
    step1.focus();
    await user.keyboard('{Enter}');

    expect(handleChange).toHaveBeenCalledWith(0, mockSteps[0]);
  });

  it('exposes imperative ref methods', () => {
    const TestComponent = () => {
      const stepperRef = useRef<DynStepperRef>(null);

      return (
        <div>
          <DynStepper
            ref={stepperRef}
            current={1}
            steps={mockSteps}
            onChange={() => {}}
          />
          <button
            onClick={() => stepperRef.current?.goToStep(0)}
            data-testid="goto-btn"
          >
            Go to Step 1
          </button>
          <button
            onClick={() => stepperRef.current?.nextStep()}
            data-testid="next-btn"
          >
            Next
          </button>
          <button
            onClick={() => stepperRef.current?.previousStep()}
            data-testid="prev-btn"
          >
            Previous
          </button>
        </div>
      );
    };

    render(<TestComponent />);

    expect(screen.getByTestId('goto-btn')).toBeInTheDocument();
    expect(screen.getByTestId('next-btn')).toBeInTheDocument();
    expect(screen.getByTestId('prev-btn')).toBeInTheDocument();
  });

  it('updates progressbar attributes', () => {
    render(<DynStepper current={1} steps={mockSteps} />);

    const progressbar = screen.getByRole('progressbar');

    expect(progressbar).toHaveAttribute('aria-valuemin', '0');
    expect(progressbar).toHaveAttribute('aria-valuemax', '2');
    expect(progressbar).toHaveAttribute('aria-valuenow', '1');
    expect(progressbar).toHaveAttribute('aria-valuetext', mockSteps[1]?.title);
  });
});
