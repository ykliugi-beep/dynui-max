import {
  forwardRef,
  useState,
  useCallback,
  type ChangeEvent,
  type FocusEvent,
  type InputHTMLAttributes,
  type ReactNode
} from 'react';
import clsx from 'clsx';
import type { ComponentSize } from '@dynui-max/design-tokens';
import { DynIcon } from '../DynIcon';
import './DynInput.css';

export type InputVariant = 'outline' | 'filled' | 'ghost';

export interface DynInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange'> {
  /**
   * Input size using design tokens
   * @default 'md'
   */
  size?: ComponentSize;
  
  /**
   * Visual variant
   * @default 'outline'
   */
  variant?: InputVariant;
  
  /**
   * Current input value (controlled)
   */
  value?: string;
  
  /**
   * Default value (uncontrolled)
   */
  defaultValue?: string;
  
  /**
   * Change handler with string value
   */
  onChange?: (value: string) => void;
  
  /**
   * Error state
   */
  error?: boolean;
  
  /**
   * Icon at the start of the input
   */
  startIcon?: ReactNode;
  
  /**
   * Icon at the end of the input
   */
  endIcon?: ReactNode;
  
  /**
   * Show clear button when input has value
   */
  clearable?: boolean;
  
  /**
   * Loading state
   */
  loading?: boolean;
  
  /**
   * Clear button click handler
   */
  onClear?: () => void;
}

/**
 * DynInput - Text input component with tokens integration
 * 
 * Features:
 * - Size variants using spacing tokens
 * - Visual variants (outline, filled, ghost)
 * - Start/end icon support
 * - Clearable functionality
 * - Loading state
 * - Error state styling
 * - Focus management
 */
export const DynInput = forwardRef<HTMLInputElement, DynInputProps>((
  {
    size = 'md',
    variant = 'outline',
    value,
    defaultValue,
    onChange,
    error = false,
    disabled = false,
    startIcon,
    endIcon,
    clearable = false,
    loading = false,
    onClear,
    className,
    onFocus,
    onBlur,
    ...props
  },
  ref
) => {
  const [isFocused, setIsFocused] = useState(false);
  const [internalValue, setInternalValue] = useState(defaultValue || '');
  
  const currentValue = value !== undefined ? value : internalValue;
  const showClearButton = clearable && currentValue && !disabled && !loading;
  
  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    
    if (value === undefined) {
      setInternalValue(newValue);
    }
    
    onChange?.(newValue);
  }, [onChange, value]);
  
  const handleClear = useCallback(() => {
    const newValue = '';
    
    if (value === undefined) {
      setInternalValue(newValue);
    }
    
    onChange?.(newValue);
    onClear?.();
  }, [onChange, onClear, value]);
  
  const handleFocus = useCallback((event: FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    onFocus?.(event);
  }, [onFocus]);
  
  const handleBlur = useCallback((event: FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    onBlur?.(event);
  }, [onBlur]);
  
  const containerClasses = clsx(
    'dyn-input-container',
    `dyn-input-container--size-${size}`,
    `dyn-input-container--variant-${variant}`,
    {
      'dyn-input-container--focused': isFocused,
      'dyn-input-container--error': error,
      'dyn-input-container--disabled': disabled,
      'dyn-input-container--loading': loading
    },
    className
  );
  
  const inputClasses = clsx(
    'dyn-input',
    `dyn-input--size-${size}`,
    `dyn-input--variant-${variant}`
  );

  return (
    <div className={containerClasses}>
      {/* Start icon */}
      {startIcon && (
        <span className="dyn-input__start-icon" aria-hidden="true">
          {startIcon}
        </span>
      )}
      
      {/* Input element */}
      <input
        ref={ref}
        className={inputClasses}
        value={currentValue}
        disabled={disabled}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...props}
      />
      
      {/* End section (loading, clear, end icon) */}
      <div className="dyn-input__end">
        {/* Loading spinner */}
        {loading && (
          <span className="dyn-input__loading" aria-hidden="true">
            <DynIcon name="spinner" size="sm" />
          </span>
        )}
        
        {/* Clear button */}
        {showClearButton && (
          <button
            type="button"
            className="dyn-input__clear"
            onClick={handleClear}
            aria-label="Clear input"
          >
            <DynIcon name="x" size="sm" />
          </button>
        )}
        
        {/* End icon */}
        {endIcon && !loading && (
          <span className="dyn-input__end-icon" aria-hidden="true">
            {endIcon}
          </span>
        )}
      </div>
    </div>
  );
});

DynInput.displayName = 'DynInput';