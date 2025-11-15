import {
  Fragment,
  forwardRef,
  useCallback,
  useImperativeHandle,
  type FC,
  type KeyboardEvent as ReactKeyboardEvent,
  type ReactNode
} from 'react';
import clsx from 'clsx';
import type { ComponentSize } from '@dynui-max/design-tokens';
import { DynIcon } from '../DynIcon';
import './DynStepper.css';

export type StepStatus = 'pending' | 'current' | 'complete' | 'error';

export interface StepData {
  key: string;
  title: string;
  description?: string;
  status?: StepStatus;
  disabled?: boolean;
  icon?: ReactNode;
}

export interface DynStepProps {
  /**
   * Step title
   */
  title: string;
  
  /**
   * Optional step description
   */
  description?: string;
  
  /**
   * Step status
   */
  status?: StepStatus;
  
  /**
   * Whether step is disabled
   */
  disabled?: boolean;
  
  /**
   * Custom icon for step
   */
  icon?: ReactNode;
  
  /**
   * Step index
   */
  index: number;
  
  /**
   * Whether step is clickable
   */
  clickable?: boolean;
  
  /**
   * Click handler
   */
  onClick?: (index: number) => void;
  
  /**
   * Component size
   */
  size?: ComponentSize;
  
  /**
   * Show numbers instead of icons
   */
  showNumbers?: boolean;
  
  /**
   * Additional CSS class names
   */
  className?: string;
}

export interface DynStepperProps {
  /**
   * Current active step index
   */
  current: number;
  
  /**
   * Step data array
   */
  steps: StepData[];
  
  /**
   * Stepper orientation
   * @default 'horizontal'
   */
  orientation?: 'horizontal' | 'vertical';
  
  /**
   * Stepper size
   * @default 'md'
   */
  size?: ComponentSize;
  
  /**
   * Step click handler
   */
  onChange?: (stepIndex: number, stepData: StepData) => void;
  
  /**
   * Show step numbers instead of icons
   * @default true
   */
  showNumbers?: boolean;
  
  /**
   * Show connecting lines
   * @default true
   */
  showConnectors?: boolean;
  
  /**
   * Allow clicking on completed steps
   * @default true
   */
  clickable?: boolean;
  
  /**
   * Additional CSS class names
   */
  className?: string;
  
  /**
   * Test identifier
   */
  'data-testid'?: string;
}

export interface DynStepperRef {
  goToStep: (stepIndex: number) => void;
  nextStep: () => void;
  previousStep: () => void;
}

/**
 * DynStep - Individual step component for stepper
 * 
 * Features:
 * - Status indicators (pending, current, complete, error)
 * - Custom icons or automatic numbering
 * - Clickable steps
 * - Keyboard navigation
 * - Accessibility support
 */
export const DynStep: FC<DynStepProps> = ({
  title,
  description,
  status = 'pending',
  disabled = false,
  icon,
  index,
  clickable = false,
  onClick,
  size = 'md',
  showNumbers = true,
  className
}) => {
  const handleClick = useCallback(() => {
    if (clickable && !disabled && onClick) {
      onClick(index);
    }
  }, [clickable, disabled, onClick, index]);

  const handleKeyDown = useCallback((e: ReactKeyboardEvent) => {
    if ((e.key === 'Enter' || e.key === ' ') && clickable && !disabled) {
      e.preventDefault();
      handleClick();
    }
  }, [handleClick, clickable, disabled]);

  const stepClasses = clsx(
    'dyn-stepper__step',
    `dyn-stepper__step--${status}`,
    `dyn-stepper__step--size-${size}`,
    {
      'dyn-stepper__step--clickable': clickable && !disabled,
      'dyn-stepper__step--disabled': disabled
    },
    className
  );

  return (
    <div
      className={stepClasses}
      onClick={handleClick}
      role={clickable ? 'button' : undefined}
      tabIndex={clickable && !disabled ? 0 : undefined}
      onKeyDown={handleKeyDown}
      aria-current={status === 'current' ? 'step' : undefined}
      aria-disabled={disabled}
    >
      {/* Step indicator */}
      <div className="dyn-stepper__indicator">
        {status === 'error' ? (
          <DynIcon name="x" size="sm" />
        ) : status === 'complete' ? (
          <DynIcon name="check" size="sm" />
        ) : icon ? (
          icon
        ) : showNumbers ? (
          <span className="dyn-stepper__number">{index + 1}</span>
        ) : (
          <div className="dyn-stepper__dot" />
        )}
      </div>
      
      {/* Step content */}
      <div className="dyn-stepper__content">
        <div className="dyn-stepper__title">
          {title}
        </div>
        
        {description && (
          <div className="dyn-stepper__description">
            {description}
          </div>
        )}
      </div>
    </div>
  );
};

DynStep.displayName = 'DynStep';

/**
 * DynStepper - Step navigation component for wizards and multi-step processes
 * 
 * Features:
 * - Horizontal and vertical orientations
 * - Clickable steps (configurable)
 * - Status indicators (pending, current, complete, error)
 * - Custom icons or automatic numbering
 * - Connecting lines between steps
 * - Keyboard navigation
 * - Responsive design
 */
export const DynStepper = forwardRef<DynStepperRef, DynStepperProps>((
  {
    current,
    steps,
    orientation = 'horizontal',
    size = 'md',
    onChange,
    showNumbers = true,
    showConnectors = true,
    clickable = true,
    className,
    'data-testid': dataTestId,
    ...props
  },
  ref
) => {
  const handleStepClick = useCallback((stepIndex: number, stepData: StepData) => {
    if (!clickable || stepData.disabled) return;
    
    // Allow clicking on current step or completed steps
    if (stepIndex <= current) {
      onChange?.(stepIndex, stepData);
    }
  }, [clickable, current, onChange]);
  
  const goToStep = useCallback((stepIndex: number) => {
    const targetStep = steps[stepIndex];

    if (!targetStep || targetStep.disabled) return;

    onChange?.(stepIndex, targetStep);
  }, [steps, onChange]);

  const nextStep = useCallback(() => {
    goToStep(current + 1);
  }, [current, goToStep]);

  const previousStep = useCallback(() => {
    goToStep(current - 1);
  }, [current, goToStep]);
  
  // Expose ref methods
  useImperativeHandle(ref, () => ({
    goToStep,
    nextStep,
    previousStep
  }), [goToStep, nextStep, previousStep]);
  
  const getStepStatus = (stepIndex: number, step: StepData): StepStatus => {
    if (step.status) return step.status;
    if (stepIndex < current) return 'complete';
    if (stepIndex === current) return 'current';
    return 'pending';
  };
  
  const containerClasses = clsx(
    'dyn-stepper',
    `dyn-stepper--${orientation}`,
    `dyn-stepper--size-${size}`,
    {
      'dyn-stepper--clickable': clickable,
      'dyn-stepper--with-connectors': showConnectors
    },
    className
  );
  
  return (
    <div
      className={containerClasses}
      data-testid={dataTestId}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={steps.length - 1}
      aria-valuenow={current}
      aria-valuetext={steps[current]?.title}
      {...props}
    >
      <div className="dyn-stepper__track">
        {steps.map((step, index) => {
          const status = getStepStatus(index, step);
          const isClickable = clickable && !step.disabled && index <= current;
          
          return (
            <Fragment key={step.key}>
              <div
                className={clsx(
                  'dyn-stepper__step',
                  `dyn-stepper__step--${status}`,
                  {
                    'dyn-stepper__step--clickable': isClickable,
                    'dyn-stepper__step--disabled': step.disabled
                  }
                )}
                onClick={isClickable ? () => handleStepClick(index, step) : undefined}
                role={isClickable ? 'button' : undefined}
                tabIndex={isClickable ? 0 : undefined}
                onKeyDown={isClickable ? (e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleStepClick(index, step);
                  }
                } : undefined}
              >
                {/* Step indicator */}
                <div className="dyn-stepper__indicator">
                  {status === 'error' ? (
                    <DynIcon name="x" size="sm" />
                  ) : status === 'complete' ? (
                    <DynIcon name="check" size="sm" />
                  ) : step.icon ? (
                    step.icon
                  ) : showNumbers ? (
                    <span className="dyn-stepper__number">{index + 1}</span>
                  ) : (
                    <div className="dyn-stepper__dot" />
                  )}
                </div>
                
                {/* Step content */}
                <div className="dyn-stepper__content">
                  <div className="dyn-stepper__title">
                    {step.title}
                  </div>
                  
                  {step.description && (
                    <div className="dyn-stepper__description">
                      {step.description}
                    </div>
                  )}
                </div>
              </div>
              
              {/* Connector line */}
              {showConnectors && index < steps.length - 1 && (
                <div
                  className={clsx(
                    'dyn-stepper__connector',
                    {
                      'dyn-stepper__connector--completed': index < current
                    }
                  )}
                />
              )}
            </Fragment>
          );
        })}
      </div>
    </div>
  );
});

DynStepper.displayName = 'DynStepper';
