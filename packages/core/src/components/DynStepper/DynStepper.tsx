import React, { forwardRef } from 'react';
import clsx from 'clsx';
import { DynIcon } from '../DynIcon';
import './DynStepper.css';

export type StepStatus = 'pending' | 'active' | 'completed' | 'error';

export interface StepData {
  key: string;
  label: string;
  status?: StepStatus;
  disabled?: boolean;
}

export interface DynStepperProps {
  /**
   * Stepper orientation
   * @default 'horizontal'
   */
  orientation?: 'horizontal' | 'vertical';
  
  /**
   * Current active step index
   */
  currentStep: number;
  
  /**
   * Callback when step is changed
   */
  onStepChange: (step: number) => void;
  
  /**
   * Array of step data
   */
  steps: StepData[];
  
  /**
   * Additional CSS class names
   */
  className?: string;
}

export interface DynStepProps {
  /**
   * Step data
   */
  step: StepData;
  
  /**
   * Step index
   */
  index: number;
  
  /**
   * Whether this step is active
   */
  isActive: boolean;
  
  /**
   * Whether this step is completed
   */
  isCompleted: boolean;
  
  /**
   * Click handler
   */
  onClick: (index: number) => void;
  
  /**
   * Stepper orientation
   */
  orientation: 'horizontal' | 'vertical';
  
  /**
   * Whether this is the last step
   */
  isLast: boolean;
}

/**
 * DynStep - Individual step component
 */
export const DynStep = forwardRef<HTMLButtonElement, DynStepProps>((
  {
    step,
    index,
    isActive,
    isCompleted,
    onClick,
    orientation,
    isLast,
    ...props
  },
  ref
) => {
  const { key, label, status = 'pending', disabled = false } = step;
  const actualStatus = isCompleted ? 'completed' : isActive ? 'active' : status;
  
  const classes = clsx(
    'dyn-step',
    `dyn-step--${actualStatus}`,
    `dyn-step--${orientation}`,
    {
      'dyn-step--disabled': disabled,
      'dyn-step--clickable': !disabled && !isActive
    }
  );

  const handleClick = () => {
    if (!disabled && !isActive) {
      onClick(index);
    }
  };

  const getStepIcon = () => {
    switch (actualStatus) {
      case 'completed':
        return <DynIcon name="check" size="sm" />;
      case 'error':
        return <DynIcon name="x" size="sm" />;
      default:
        return <span className="dyn-step__number">{index + 1}</span>;
    }
  };

  return (
    <div className={clsx('dyn-step-wrapper', { 'dyn-step-wrapper--last': isLast })}>
      <button
        ref={ref}
        type="button"
        className={classes}
        onClick={handleClick}
        disabled={disabled}
        aria-current={isActive ? 'step' : undefined}
        aria-label={`Step ${index + 1}: ${label}`}
        {...props}
      >
        <div className="dyn-step__indicator">
          {getStepIcon()}
        </div>
        
        <div className="dyn-step__content">
          <div className="dyn-step__label">{label}</div>
        </div>
      </button>
      
      {/* Connector line */}
      {!isLast && (
        <div className="dyn-step__connector" aria-hidden="true" />
      )}
    </div>
  );
});

DynStep.displayName = 'DynStep';

/**
 * DynStepper - Step navigation component with progress indication
 * 
 * Features:
 * - Horizontal and vertical orientations
 * - Step status management (pending, active, completed, error)
 * - Clickable step navigation
 * - Disabled step support
 * - Accessible navigation with ARIA attributes
 * - Design tokens integration
 */
export const DynStepper = forwardRef<HTMLDivElement, DynStepperProps>((
  {
    orientation = 'horizontal',
    currentStep,
    onStepChange,
    steps,
    className,
    ...props
  },
  ref
) => {
  const classes = clsx(
    'dyn-stepper',
    `dyn-stepper--${orientation}`,
    className
  );

  return (
    <nav 
      ref={ref} 
      className={classes} 
      aria-label="Step navigation"
      {...props}
    >
      <ol className="dyn-stepper__list">
        {steps.map((step, index) => (
          <li key={step.key} className="dyn-stepper__item">
            <DynStep
              step={step}
              index={index}
              isActive={index === currentStep}
              isCompleted={index < currentStep}
              onClick={onStepChange}
              orientation={orientation}
              isLast={index === steps.length - 1}
            />
          </li>
        ))}
      </ol>
    </nav>
  );
});

DynStepper.displayName = 'DynStepper';