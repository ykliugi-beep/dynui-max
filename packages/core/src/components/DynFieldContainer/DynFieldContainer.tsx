import {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  type ReactElement,
  type ReactNode
} from 'react';
import clsx from 'clsx';
import { DynIcon } from '../DynIcon';
import './DynFieldContainer.css';

export interface DynFieldContainerProps {
  /**
   * Field label text
   */
  label?: string;
  
  /**
   * Additional description text
   */
  description?: string;
  
  /**
   * Hint text to help users
   */
  hint?: string;
  
  /**
   * Error message to display
   */
  error?: string;
  
  /**
   * Whether the field is required
   */
  required?: boolean;
  
  /**
   * HTML for attribute to connect label with form control
   */
  htmlFor?: string;
  
  /**
   * Layout orientation
   * @default 'vertical'
   */
  orientation?: 'vertical' | 'horizontal';
  
  /**
   * Field content (form controls)
   */
  children: ReactNode;
  
  /**
   * Additional CSS class names
   */
  className?: string;
}

/**
 * DynFieldContainer - Comprehensive form field wrapper with validation and accessibility
 * 
 * Features:
 * - Label, description, hint, and error message slots
 * - Required field indicator
 * - Vertical and horizontal layouts
 * - Proper ARIA associations for accessibility
 * - Error state styling using design tokens
 */
export const DynFieldContainer = forwardRef<HTMLDivElement, DynFieldContainerProps>((
  {
    label,
    description,
    hint,
    error,
    required = false,
    htmlFor,
    orientation = 'vertical',
    children,
    className,
    ...props
  },
  ref
) => {
  const hasError = Boolean(error);
  const fieldId = htmlFor;
  const descriptionId = description ? `${fieldId}-description` : undefined;
  const hintId = hint ? `${fieldId}-hint` : undefined;
  const errorId = error ? `${fieldId}-error` : undefined;
  
  // Build aria-describedby for form control
  const describedBy = [descriptionId, hintId, errorId].filter(Boolean).join(' ') || undefined;

  const classes = clsx(
    'dyn-field-container',
    `dyn-field-container--${orientation}`,
    {
      'dyn-field-container--error': hasError,
      'dyn-field-container--required': required
    },
    className
  );

  return (
    <div ref={ref} className={classes} {...props}>
      {/* Label */}
      {label && (
        <label 
          htmlFor={htmlFor} 
          className="dyn-field-container__label"
        >
          {label}
          {required && (
            <span className="dyn-field-container__required" aria-label="required">
              *
            </span>
          )}
        </label>
      )}
      
      {/* Description */}
      {description && (
        <div 
          id={descriptionId}
          className="dyn-field-container__description"
        >
          {description}
        </div>
      )}
      
      {/* Form Control */}
      <div className="dyn-field-container__control">
        {/* Clone children to add aria-describedby */}
        {Children.map(children, (child) => {
          if (isValidElement(child)) {
            return cloneElement(child as ReactElement<any>, {
              'aria-describedby': describedBy,
              'aria-invalid': hasError || undefined
            });
          }
          return child;
        })}
      </div>
      
      {/* Hint */}
      {hint && !hasError && (
        <div 
          id={hintId}
          className="dyn-field-container__hint"
        >
          {hint}
        </div>
      )}
      
      {/* Error */}
      {error && (
        <div 
          id={errorId}
          className="dyn-field-container__error"
          role="alert"
          aria-live="polite"
        >
          <DynIcon name="x" size="sm" className="dyn-field-container__error-icon" />
          {error}
        </div>
      )}
    </div>
  );
});

DynFieldContainer.displayName = 'DynFieldContainer';