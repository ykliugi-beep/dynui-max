import {
  forwardRef,
  useState,
  useCallback,
  type ChangeEvent,
  type InputHTMLAttributes
} from 'react';
import clsx from 'clsx';
import type { ComponentSize } from '@dynui-max/design-tokens';
import { DynIcon } from '../DynIcon';
import './DynCheckbox.css';

export interface DynCheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange'> {
  /**
   * Checkbox size using design tokens
   * @default 'md'
   */
  size?: ComponentSize;
  
  /**
   * Current checked state (controlled)
   */
  checked?: boolean;
  
  /**
   * Default checked state (uncontrolled)
   */
  defaultChecked?: boolean;
  
  /**
   * Indeterminate state (mixed)
   */
  indeterminate?: boolean;
  
  /**
   * Change handler with boolean value
   */
  onChange?: (checked: boolean) => void;
  
  /**
   * Error state
   */
  error?: boolean;
  
  /**
   * Label text
   */
  label?: string;
  
  /**
   * Description text
   */
  description?: string;
  
  /**
   * Additional CSS class names
   */
  className?: string;
}

/**
 * DynCheckbox - Checkbox input with design tokens integration
 * 
 * Features:
 * - Size variants using spacing tokens
 * - Indeterminate state support
 * - Error state styling
 * - Integrated label and description
 * - Keyboard navigation
 * - ARIA accessibility
 */
export const DynCheckbox = forwardRef<HTMLInputElement, DynCheckboxProps>((
  {
    size = 'md',
    checked,
    defaultChecked,
    indeterminate = false,
    onChange,
    error = false,
    disabled = false,
    label,
    description,
    className,
    id,
    ...props
  },
  ref
) => {
  const [internalChecked, setInternalChecked] = useState(defaultChecked || false);
  const [isFocused, setIsFocused] = useState(false);
  
  const currentChecked = checked !== undefined ? checked : internalChecked;
  
  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const newChecked = event.target.checked;
    
    if (checked === undefined) {
      setInternalChecked(newChecked);
    }
    
    onChange?.(newChecked);
  }, [checked, onChange]);
  
  const handleFocus = useCallback(() => {
    setIsFocused(true);
  }, []);
  
  const handleBlur = useCallback(() => {
    setIsFocused(false);
  }, []);
  
  const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;
  const descriptionId = description ? `${checkboxId}-description` : undefined;
  
  const containerClasses = clsx(
    'dyn-checkbox',
    `dyn-checkbox--size-${size}`,
    {
      'dyn-checkbox--checked': currentChecked,
      'dyn-checkbox--indeterminate': indeterminate,
      'dyn-checkbox--error': error,
      'dyn-checkbox--disabled': disabled,
      'dyn-checkbox--focused': isFocused
    },
    className
  );
  
  const checkboxClasses = clsx(
    'dyn-checkbox__input',
    `dyn-checkbox__input--size-${size}`
  );
  
  return (
    <label className={containerClasses}>
      <div className="dyn-checkbox__control">
        <input
          ref={ref}
          type="checkbox"
          id={checkboxId}
          className={checkboxClasses}
          checked={currentChecked}
          disabled={disabled}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          aria-describedby={descriptionId}
          {...props}
        />
        
        <div className="dyn-checkbox__box" aria-hidden="true">
          {indeterminate ? (
            <div className="dyn-checkbox__indeterminate" />
          ) : currentChecked ? (
            <DynIcon name="check" size={size === 'lg' ? 'md' : 'sm'} />
          ) : null}
        </div>
      </div>
      
      {(label || description) && (
        <div className="dyn-checkbox__content">
          {label && (
            <div className="dyn-checkbox__label">
              {label}
            </div>
          )}
          
          {description && (
            <div 
              id={descriptionId}
              className="dyn-checkbox__description"
            >
              {description}
            </div>
          )}
        </div>
      )}
    </label>
  );
});

DynCheckbox.displayName = 'DynCheckbox';