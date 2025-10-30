import React, { forwardRef, useState, useCallback, createContext, useContext } from 'react';
import clsx from 'clsx';
import type { ComponentSize } from '@dynui-max/design-tokens';
import './DynRadio.css';

export interface DynRadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange'> {
  /**
   * Radio size using design tokens
   * @default 'md'
   */
  size?: ComponentSize;
  
  /**
   * Radio value
   */
  value: string;
  
  /**
   * Current checked state (usually managed by RadioGroup)
   */
  checked?: boolean;
  
  /**
   * Change handler with string value
   */
  onChange?: (value: string) => void;
  
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

export interface DynRadioGroupProps {
  /**
   * Current selected value (controlled)
   */
  value?: string;
  
  /**
   * Default selected value (uncontrolled)
   */
  defaultValue?: string;
  
  /**
   * Change handler
   */
  onChange?: (value: string) => void;
  
  /**
   * Group name for form submission
   */
  name?: string;
  
  /**
   * Radio size for all radios in group
   * @default 'md'
   */
  size?: ComponentSize;
  
  /**
   * Disabled state for all radios
   */
  disabled?: boolean;
  
  /**
   * Error state for all radios
   */
  error?: boolean;
  
  /**
   * Required field
   */
  required?: boolean;
  
  /**
   * Radio group layout
   * @default 'vertical'
   */
  orientation?: 'vertical' | 'horizontal';
  
  /**
   * Children (DynRadio components)
   */
  children: React.ReactNode;
  
  /**
   * Additional CSS class names
   */
  className?: string;
  
  /**
   * ARIA attributes
   */
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
}

interface RadioGroupContextValue {
  value?: string;
  onChange?: (value: string) => void;
  name?: string;
  size?: ComponentSize;
  disabled?: boolean;
  error?: boolean;
}

const RadioGroupContext = createContext<RadioGroupContextValue | undefined>(undefined);

const useRadioGroup = () => {
  const context = useContext(RadioGroupContext);
  return context || {};
};

/**
 * DynRadio - Individual radio button component
 */
export const DynRadio = forwardRef<HTMLInputElement, DynRadioProps>((
  {
    size,
    value,
    checked,
    onChange,
    error,
    disabled,
    label,
    description,
    className,
    id,
    ...props
  },
  ref
) => {
  const [isFocused, setIsFocused] = useState(false);
  const groupContext = useRadioGroup();
  
  // Use context values if available, otherwise use props
  const finalSize = size || groupContext.size || 'md';
  const finalDisabled = disabled !== undefined ? disabled : groupContext.disabled || false;
  const finalError = error !== undefined ? error : groupContext.error || false;
  const finalName = groupContext.name;
  const finalChecked = checked !== undefined ? checked : groupContext.value === value;
  
  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      onChange?.(value);
      groupContext.onChange?.(value);
    }
  }, [value, onChange, groupContext.onChange]);
  
  const handleFocus = useCallback(() => {
    setIsFocused(true);
  }, []);
  
  const handleBlur = useCallback(() => {
    setIsFocused(false);
  }, []);
  
  const radioId = id || `radio-${value}-${Math.random().toString(36).substr(2, 9)}`;
  const descriptionId = description ? `${radioId}-description` : undefined;
  
  const containerClasses = clsx(
    'dyn-radio',
    `dyn-radio--size-${finalSize}`,
    {
      'dyn-radio--checked': finalChecked,
      'dyn-radio--error': finalError,
      'dyn-radio--disabled': finalDisabled,
      'dyn-radio--focused': isFocused
    },
    className
  );
  
  return (
    <label className={containerClasses}>
      <div className="dyn-radio__control">
        <input
          ref={ref}
          type="radio"
          id={radioId}
          className="dyn-radio__input"
          value={value}
          checked={finalChecked}
          disabled={finalDisabled}
          name={finalName}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          aria-describedby={descriptionId}
          {...props}
        />
        
        <div className="dyn-radio__circle" aria-hidden="true">
          {finalChecked && (
            <div className="dyn-radio__dot" />
          )}
        </div>
      </div>
      
      {(label || description) && (
        <div className="dyn-radio__content">
          {label && (
            <div className="dyn-radio__label">
              {label}
            </div>
          )}
          
          {description && (
            <div 
              id={descriptionId}
              className="dyn-radio__description"
            >
              {description}
            </div>
          )}
        </div>
      )}
    </label>
  );
});

DynRadio.displayName = 'DynRadio';

/**
 * DynRadioGroup - Container for radio buttons with shared state
 * 
 * Features:
 * - Controlled/uncontrolled state management
 * - Keyboard navigation (arrow keys)
 * - ARIA radiogroup pattern
 * - Horizontal/vertical layouts
 * - Size, error, and disabled state propagation
 */
export const DynRadioGroup = forwardRef<HTMLDivElement, DynRadioGroupProps>((
  {
    value,
    defaultValue,
    onChange,
    name,
    size = 'md',
    disabled = false,
    error = false,
    required = false,
    orientation = 'vertical',
    children,
    className,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledby,
    'aria-describedby': ariaDescribedby,
    ...props
  },
  ref
) => {
  const [internalValue, setInternalValue] = useState(defaultValue || '');
  
  const currentValue = value !== undefined ? value : internalValue;
  
  const handleChange = useCallback((newValue: string) => {
    if (value === undefined) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
  }, [value, onChange]);
  
  const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
    const radios = Array.from(
      event.currentTarget.querySelectorAll('input[type="radio"]:not(:disabled)')
    ) as HTMLInputElement[];
    
    if (radios.length === 0) return;
    
    const currentIndex = radios.findIndex(radio => radio.checked);
    let nextIndex = currentIndex;
    
    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowRight':
        event.preventDefault();
        nextIndex = currentIndex < radios.length - 1 ? currentIndex + 1 : 0;
        break;
        
      case 'ArrowUp':
      case 'ArrowLeft':
        event.preventDefault();
        nextIndex = currentIndex > 0 ? currentIndex - 1 : radios.length - 1;
        break;
        
      default:
        return;
    }
    
    const nextRadio = radios[nextIndex];
    if (nextRadio) {
      nextRadio.focus();
      nextRadio.checked = true;
      handleChange(nextRadio.value);
    }
  }, [handleChange]);
  
  const contextValue: RadioGroupContextValue = {
    value: currentValue,
    onChange: handleChange,
    name,
    size,
    disabled,
    error
  };
  
  const containerClasses = clsx(
    'dyn-radio-group',
    `dyn-radio-group--${orientation}`,
    {
      'dyn-radio-group--error': error,
      'dyn-radio-group--disabled': disabled
    },
    className
  );
  
  return (
    <RadioGroupContext.Provider value={contextValue}>
      <div
        ref={ref}
        className={containerClasses}
        role="radiogroup"
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledby}
        aria-describedby={ariaDescribedby}
        aria-required={required}
        onKeyDown={handleKeyDown}
        {...props}
      >
        {children}
        
        {/* Hidden input for form submission */}
        {name && (
          <input
            type="hidden"
            name={name}
            value={currentValue}
            required={required}
          />
        )}
      </div>
    </RadioGroupContext.Provider>
  );
});

DynRadioGroup.displayName = 'DynRadioGroup';