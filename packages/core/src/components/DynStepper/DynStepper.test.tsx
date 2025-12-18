import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../../test/test-utils';
import userEvent from '@testing-library/user-event';
import { DynStepper, DynStep, type StepData, type DynStepperRef } from './DynStepper';
import { axe } from 'vitest-axe';

const sampleSteps: StepData[] = [
  { key: 'step1', title: 'Personal Info', description: 'Enter your personal details' },
  { key: 'step2', title: 'Account Setup', description: 'Create your account' },
  { key: 'step3', title: 'Preferences', description: 'Set your preferences', disabled: true },
  { key: 'step4', title: 'Review', description: 'Review and confirm' },
];

describe('DynStepper', () => {
  describe('Basic Rendering', () => {
    it('renders all steps with correct titles and descriptions', () => {
      render(
        <DynStepper
          current={1}
          steps={sampleSteps}
          data-testid="stepper"
        />
      );
      
      expect(screen.getByTestId('stepper')).toBeInTheDocument();
      
      sampleSteps.forEach(step => {
        expect(screen.getByText(step.title)).toBeInTheDocument();
        if (step.description) {
          expect(screen.getByText(step.description)).toBeInTheDocument();
        }
      });
    });
    
    it('applies correct orientation classes', () => {
      const { rerender } = render(
        <DynStepper current={0} steps={sampleSteps} orientation="horizontal" />
      );
      
      expect(document.querySelector('.dyn-stepper--horizontal')).toBeInTheDocument();
      
      rerender(
        <DynStepper current={0} steps={sampleSteps} orientation="vertical" />
      );
      
      expect(document.querySelector('.dyn-stepper--vertical')).toBeInTheDocument();
    });
    
    it('shows step numbers when showNumbers is true', () => {
      const { container } = render(
        <DynStepper current={0} steps={sampleSteps} showNumbers={true} />
      );
      
      // Should show numbers 1, 2, 3, 4 (when current=0, no steps are complete)
      const numberElements = container.querySelectorAll('.dyn-stepper__number');
      expect(numberElements).toHaveLength(sampleSteps.length);
      
      numberElements.forEach((el, index) => {
        expect(el.textContent).toBe((index + 1).toString());
      });
    });
  });

  describe('User Interaction', () => {
    it('calls onChange when clicking on clickable steps', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      
      render(
        <DynStepper
          current={2}
          steps={sampleSteps}
          onChange={handleChange}
          clickable={true}
        />
      );
      
      // Click on completed step (should be clickable)
      await user.click(screen.getByText('Personal Info'));
      expect(handleChange).toHaveBeenCalledWith(0, sampleSteps[0]);
      
      // Click on current step (should be clickable) - Preferences is disabled, so use Account Setup
      await user.click(screen.getByText('Account Setup'));
      expect(handleChange).toHaveBeenCalledWith(1, sampleSteps[1]);
    });
    
    it('does not call onChange when clickable is false', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      
      render(
        <DynStepper
          current={1}
          steps={sampleSteps}
          onChange={handleChange}
          clickable={false}
        />
      );
      
      await user.click(screen.getByText('Personal Info'));
      expect(handleChange).not.toHaveBeenCalled();
    });
    
    it('does not allow clicking on disabled steps', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      
      render(
        <DynStepper
          current={0}
          steps={sampleSteps}
          onChange={handleChange}
          clickable={true}
        />
      );
      
      // Try to click on disabled step
      await user.click(screen.getByText('Preferences'));
      expect(handleChange).not.toHaveBeenCalled();
    });
  });

  describe('Keyboard Navigation', () => {
    it('handles Enter and Space keys on clickable steps', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      
      render(
        <DynStepper
          current={2}
          steps={sampleSteps}
          onChange={handleChange}
          clickable={true}
        />
      );
      
      // Find the clickable step element
      const firstStepElement = screen.getByText('Personal Info').closest('[role="button"]') as HTMLElement;
      
      // Focus and press Enter
      firstStepElement.focus();
      await user.keyboard('{Enter}');
      expect(handleChange).toHaveBeenCalledWith(0, sampleSteps[0]);
      
      // Press Space
      await user.keyboard(' ');
      expect(handleChange).toHaveBeenCalledWith(0, sampleSteps[0]);
      
      expect(handleChange).toHaveBeenCalledTimes(2);
    });
  });

  describe('Ref Methods', () => {
    it('exposes ref methods for programmatic navigation', () => {
      const handleChange = vi.fn();
      const ref = React.createRef<DynStepperRef>();

      const TestComponent = () => {
        return (
          <DynStepper
            ref={ref}
            current={1}
            steps={sampleSteps}
            onChange={handleChange}
          />
        );
      };

      render(<TestComponent />);

      expect(ref.current).toBeDefined();
      expect(typeof ref.current?.goToStep).toBe('function');
      expect(typeof ref.current?.nextStep).toBe('function');
      expect(typeof ref.current?.previousStep).toBe('function');

      // Test goToStep method
      ref.current?.goToStep(0);
      expect(handleChange).toHaveBeenCalledWith(0, sampleSteps[0]);

      // Test nextStep method (from current=1, next would be step 2, but it's disabled so nothing happens)
      ref.current?.nextStep();
      // Since step 2 is disabled, handler shouldn't be called again
      expect(handleChange).toHaveBeenCalledTimes(1);

      // Test previousStep method (from current=1, previous is step 0)
      ref.current?.previousStep();
      expect(handleChange).toHaveBeenCalledWith(0, sampleSteps[0]);
      expect(handleChange).toHaveBeenCalledTimes(2);
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA attributes', () => {
      render(
        <DynStepper current={1} steps={sampleSteps} data-testid="stepper" />
      );
      
      const stepper = screen.getByTestId('stepper');
      
      expect(stepper).toHaveAttribute('role', 'progressbar');
      expect(stepper).toHaveAttribute('aria-valuemin', '0');
      expect(stepper).toHaveAttribute('aria-valuemax', (sampleSteps.length - 1).toString());
      expect(stepper).toHaveAttribute('aria-valuenow', '1');

      const stepOne = sampleSteps[1];
      expect(stepOne).toBeDefined();

      const stepOneTitle = stepOne?.title ?? '';
      expect(stepper).toHaveAttribute('aria-valuetext', stepOneTitle);
    });
    
    it('has no accessibility violations', async () => {
      const { container } = render(
        <DynStepper current={1} steps={sampleSteps} />
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});

describe('DynStep', () => {
  describe('Individual Step Component', () => {
    it('renders step with all props', () => {
      const handleClick = vi.fn();
      
      const { container } = render(
        <DynStep
          title="Test Step"
          description="Test description"
          status="current"
          index={0}
          clickable={true}
          onClick={handleClick}
          size="md"
          showNumbers={true}
        />
      );
      
      expect(screen.getByText('Test Step')).toBeInTheDocument();
      expect(screen.getByText('Test description')).toBeInTheDocument();
      
      const numberElement = container.querySelector('.dyn-stepper__number');
      expect(numberElement).toBeInTheDocument();
      expect(numberElement?.textContent).toBe('1');
    });
    
    it('handles click interaction when clickable', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      
      render(
        <DynStep
          title="Clickable Step"
          index={0}
          clickable={true}
          onClick={handleClick}
        />
      );
      
      await user.click(screen.getByText('Clickable Step'));
      expect(handleClick).toHaveBeenCalledWith(0);
    });
    
    it('does not handle click when disabled', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      
      render(
        <DynStep
          title="Disabled Step"
          index={0}
          disabled={true}
          clickable={true}
          onClick={handleClick}
        />
      );
      
      await user.click(screen.getByText('Disabled Step'));
      expect(handleClick).not.toHaveBeenCalled();
    });
    
    it('has proper accessibility attributes', () => {
      render(
        <DynStep
          title="Accessible Step"
          status="current"
          index={1}
          clickable={true}
          onClick={() => {}}
        />
      );
      
      const stepElement = screen.getByText('Accessible Step').closest('[role="button"]');
      
      expect(stepElement).toHaveAttribute('role', 'button');
      expect(stepElement).toHaveAttribute('tabindex', '0');
      expect(stepElement).toHaveAttribute('aria-current', 'step');
      expect(stepElement).toHaveAttribute('aria-disabled', 'false');
    });
  });
});
