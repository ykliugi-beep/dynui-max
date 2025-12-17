import React from 'react';

/**
 * Stepper component for displaying step-by-step processes
 * @component
 * @example
 * ```tsx
 * <DynStepper current={1} total={4} onStepChange={handleChange}>
 *   <DynStep label="Step 1" description="First step">Content 1</DynStep>
 *   <DynStep label="Step 2" description="Second step">Content 2</DynStep>
 * </DynStepper>
 * ```
 */

export interface DynStepperProps {
  /** Current step index (0-based) */
  current: number;
  /** Total number of steps */
  total: number;
  /** Stepper orientation */
  orientation?: 'horizontal' | 'vertical';
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Callback when step changes */
  onStepChange?: (step: number) => void;
  /** Child DynStep components */
  children: React.ReactNode;
  /** CSS class */
  className?: string;
  /** Aria label for accessibility */
  'aria-label'?: string;
}

export interface DynStepProps {
  /** Step label/title */
  label: string;
  /** Optional step description */
  description?: string;
  /** Whether step is completed */
  completed?: boolean;
  /** Whether step has error */
  error?: boolean;
  /** Whether step is disabled */
  disabled?: boolean;
  /** Step content (shown when active) */
  children?: React.ReactNode;
  /** CSS class */
  className?: string;
}

const styles = `
  .dyn-stepper {
    display: flex;
    gap: var(--dyn-spacing-md);
  }
  
  .dyn-stepper--horizontal {
    flex-direction: row;
    align-items: flex-start;
  }
  
  .dyn-stepper--vertical {
    flex-direction: column;
    align-items: stretch;
  }
  
  .dyn-stepper__steps {
    display: flex;
    gap: var(--dyn-spacing-lg);
    width: 100%;
  }
  
  .dyn-stepper--horizontal .dyn-stepper__steps {
    flex-direction: row;
  }
  
  .dyn-stepper--vertical .dyn-stepper__steps {
    flex-direction: column;
  }
  
  .dyn-step {
    display: flex;
    align-items: center;
    gap: var(--dyn-spacing-md);
    position: relative;
  }
  
  .dyn-stepper--vertical .dyn-step {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .dyn-step__indicator {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: var(--dyn-spacing-xl);
    width: var(--dyn-spacing-xl);
    height: var(--dyn-spacing-xl);
    border-radius: 50%;
    background-color: var(--dyn-color-gray-200);
    color: var(--dyn-color-text);
    font-weight: var(--dyn-font-weight-medium);
    font-size: var(--dyn-font-size-md);
    flex-shrink: 0;
    border: 2px solid var(--dyn-color-border);
  }
  
  .dyn-step--completed .dyn-step__indicator {
    background-color: var(--dyn-color-primary-500);
    color: white;
    border-color: var(--dyn-color-primary-500);
  }
  
  .dyn-step--active .dyn-step__indicator {
    background-color: var(--dyn-color-primary-500);
    color: white;
    border-color: var(--dyn-color-primary-600);
    box-shadow: 0 0 0 3px var(--dyn-color-primary-100);
  }
  
  .dyn-step--error .dyn-step__indicator {
    background-color: var(--dyn-color-error);
    color: white;
    border-color: var(--dyn-color-error);
  }
  
  .dyn-step--disabled .dyn-step__indicator {
    opacity: var(--dyn-opacity-disabled);
    cursor: not-allowed;
  }
  
  .dyn-step__content {
    display: flex;
    flex-direction: column;
    gap: var(--dyn-spacing-sm);
  }
  
  .dyn-step__label {
    font-weight: var(--dyn-font-weight-medium);
    font-size: var(--dyn-font-size-md);
    color: var(--dyn-color-text);
  }
  
  .dyn-step--completed .dyn-step__label,
  .dyn-step--active .dyn-step__label {
    color: var(--dyn-color-primary-500);
  }
  
  .dyn-step--error .dyn-step__label {
    color: var(--dyn-color-error);
  }
  
  .dyn-step--disabled .dyn-step__label {
    color: var(--dyn-color-text-secondary);
  }
  
  .dyn-step__description {
    font-size: var(--dyn-font-size-sm);
    color: var(--dyn-color-text-secondary);
  }
  
  .dyn-step__detail {
    margin-top: var(--dyn-spacing-md);
    padding: var(--dyn-spacing-md);
    background-color: var(--dyn-color-secondary);
    border-radius: var(--dyn-size-radius-md);
  }
  
  .dyn-stepper__connector {
    flex: 1;
    height: 2px;
    background-color: var(--dyn-color-border);
    margin: 0 var(--dyn-spacing-md);
  }
  
  .dyn-step--completed ~ .dyn-stepper__connector {
    background-color: var(--dyn-color-primary-500);
  }
`;

/**
 * DynStepper Component
 * 
 * Displays a multi-step process with indicators and navigation.
 * Supports both horizontal and vertical layouts.
 */
export const DynStepper = React.forwardRef<HTMLDivElement, DynStepperProps>(
  (
    {
      current,
      total,
      orientation = 'horizontal',
      size = 'md',
      onStepChange,
      children,
      className = '',
      'aria-label': ariaLabel,
    },
    ref
  ) => {
    const steps = React.Children.toArray(children).filter(
      (child) => React.isValidElement(child)
    ) as React.ReactElement<DynStepProps>[];

    const handleStepClick = (index: number) => {
      if (onStepChange && !steps[index].props.disabled) {
        onStepChange(index);
      }
    };

    const handleKeyDown = (event: React.KeyboardEvent, index: number) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        handleStepClick(index);
      } else if (event.key === 'ArrowRight' && index < steps.length - 1) {
        event.preventDefault();
        handleStepClick(index + 1);
      } else if (event.key === 'ArrowLeft' && index > 0) {
        event.preventDefault();
        handleStepClick(index - 1);
      }
    };

    return (
      <div
        ref={ref}
        className={`dyn-stepper dyn-stepper--${orientation} dyn-stepper--${size} ${className}`}
        role="progressbar"
        aria-valuenow={current + 1}
        aria-valuemin={1}
        aria-valuemax={total}
        aria-label={ariaLabel || `Step ${current + 1} of ${total}`}
      >
        <style>{styles}</style>
        <div className="dyn-stepper__steps">
          {steps.map((step, index) => (
            <React.Fragment key={index}>
              <div
                className={`dyn-step ${
                  index === current ? 'dyn-step--active' : ''
                } ${index < current ? 'dyn-step--completed' : ''} ${
                  step.props.error ? 'dyn-step--error' : ''
                } ${step.props.disabled ? 'dyn-step--disabled' : ''}`}
                role="button"
                tabIndex={step.props.disabled ? -1 : 0}
                onClick={() => handleStepClick(index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                aria-current={index === current ? 'step' : undefined}
                aria-disabled={step.props.disabled}
                aria-label={step.props.label}
              >
                <div className="dyn-step__indicator">
                  {index < current ? '✓' : index + 1}
                </div>
                <div className="dyn-step__content">
                  <div className="dyn-step__label">{step.props.label}</div>
                  {step.props.description && (
                    <div className="dyn-step__description">
                      {step.props.description}
                    </div>
                  )}
                </div>
              </div>
              {orientation === 'horizontal' && index < steps.length - 1 && (
                <div
                  className="dyn-stepper__connector"
                  aria-hidden="true"
                />
              )}
            </React.Fragment>
          ))}
        </div>
        {steps[current] && steps[current].props.children && (
          <div className="dyn-step__detail">{steps[current].props.children}</div>
        )}
      </div>
    );
  }
);

DynStepper.displayName = 'DynStepper';

/**
 * DynStep Component
 * 
 * Individual step within a DynStepper.
 * Should be used as a child of DynStepper.
 */
export const DynStep = React.forwardRef<HTMLDivElement, DynStepProps>(
  (
    {
      label,
      description,
      completed = false,
      error = false,
      disabled = false,
      children,
      className = '',
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={`dyn-step ${completed ? 'dyn-step--completed' : ''} ${
          error ? 'dyn-step--error' : ''
        } ${disabled ? 'dyn-step--disabled' : ''} ${className}`}
        data-label={label}
      >
        {/* This component is primarily used as children of DynStepper */}
        {/* The actual rendering is handled by DynStepper */}
      </div>
    );
  }
);

DynStep.displayName = 'DynStep';
