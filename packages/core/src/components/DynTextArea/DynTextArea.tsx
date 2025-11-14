import {
  forwardRef,
  useState,
  useCallback,
  useRef,
  useEffect,
  type ChangeEvent,
  type FocusEvent,
  type TextareaHTMLAttributes
} from 'react';
import clsx from 'clsx';
import type { ComponentSize } from '@dynui-max/design-tokens';
import type { InputVariant } from '../DynInput';
import './DynTextArea.css';

export interface DynTextAreaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'size' | 'onChange'> {
  /**
   * Textarea size using design tokens
   * @default 'md'
   */
  size?: ComponentSize;
  
  /**
   * Visual variant
   * @default 'outline'
   */
  variant?: InputVariant;
  
  /**
   * Current textarea value (controlled)
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
   * Auto-resize height based on content
   * @default false
   */
  autoResize?: boolean;
  
  /**
   * Minimum number of visible rows
   * @default 3
   */
  minRows?: number;
  
  /**
   * Maximum number of visible rows (for auto-resize)
   */
  maxRows?: number;
  
  /**
   * Show character count
   */
  showCount?: boolean;
  
  /**
   * Maximum character length
   */
  maxLength?: number;
}

/**
 * DynTextArea - Multi-line text input with auto-resize and character count
 * 
 * Features:
 * - Size variants using spacing tokens
 * - Visual variants (outline, filled, ghost)
 * - Auto-resize functionality
 * - Character count display
 * - Error state styling
 * - Min/max rows control
 */
export const DynTextArea = forwardRef<HTMLTextAreaElement, DynTextAreaProps>((
  {
    size = 'md',
    variant = 'outline',
    value,
    defaultValue,
    onChange,
    error = false,
    disabled = false,
    autoResize = false,
    minRows = 3,
    maxRows,
    showCount = false,
    maxLength,
    className,
    onFocus,
    onBlur,
    style,
    ...props
  },
  ref
) => {
  const [isFocused, setIsFocused] = useState(false);
  const [internalValue, setInternalValue] = useState(defaultValue || '');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  const currentValue = value !== undefined ? value : internalValue;
  const characterCount = currentValue.length;
  const isOverLimit = maxLength ? characterCount > maxLength : false;
  
  // Combine refs
  useEffect(() => {
    if (ref) {
      if (typeof ref === 'function') {
        ref(textareaRef.current);
      } else {
        ref.current = textareaRef.current;
      }
    }
  }, [ref]);
  
  // Auto-resize functionality
  const adjustHeight = useCallback(() => {
    const textarea = textareaRef.current;
    if (!textarea || !autoResize) return;
    
    // Reset height to calculate scrollHeight
    textarea.style.height = 'auto';
    
    const lineHeight = parseInt(getComputedStyle(textarea).lineHeight);
    const padding = parseInt(getComputedStyle(textarea).paddingTop) + 
                   parseInt(getComputedStyle(textarea).paddingBottom);
    
    const minHeight = lineHeight * minRows + padding;
    const maxHeight = maxRows ? lineHeight * maxRows + padding : Infinity;
    
    const scrollHeight = textarea.scrollHeight;
    const newHeight = Math.min(Math.max(scrollHeight, minHeight), maxHeight);
    
    textarea.style.height = `${newHeight}px`;
    textarea.style.overflowY = scrollHeight > maxHeight ? 'auto' : 'hidden';
  }, [autoResize, minRows, maxRows]);
  
  const handleChange = useCallback((event: ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = event.target.value;
    
    // Enforce maxLength if specified
    if (maxLength && newValue.length > maxLength) {
      return;
    }
    
    if (value === undefined) {
      setInternalValue(newValue);
    }
    
    onChange?.(newValue);
    
    // Adjust height after content change
    setTimeout(adjustHeight, 0);
  }, [onChange, value, maxLength, adjustHeight]);
  
  const handleFocus = useCallback((event: FocusEvent<HTMLTextAreaElement>) => {
    setIsFocused(true);
    onFocus?.(event);
  }, [onFocus]);
  
  const handleBlur = useCallback((event: FocusEvent<HTMLTextAreaElement>) => {
    setIsFocused(false);
    onBlur?.(event);
  }, [onBlur]);
  
  // Adjust height on mount and value change
  useEffect(() => {
    adjustHeight();
  }, [adjustHeight, currentValue]);
  
  const containerClasses = clsx(
    'dyn-textarea-container',
    `dyn-textarea-container--size-${size}`,
    `dyn-textarea-container--variant-${variant}`,
    {
      'dyn-textarea-container--focused': isFocused,
      'dyn-textarea-container--error': error,
      'dyn-textarea-container--disabled': disabled,
      'dyn-textarea-container--auto-resize': autoResize
    },
    className
  );
  
  const textareaClasses = clsx(
    'dyn-textarea',
    `dyn-textarea--size-${size}`,
    `dyn-textarea--variant-${variant}`
  );
  
  const textareaStyle = {
    ...style,
    ...(autoResize && {
      resize: 'none',
      overflow: 'hidden'
    })
  };

  return (
    <div className={containerClasses}>
      {/* Textarea element */}
      <textarea
        ref={textareaRef}
        className={textareaClasses}
        value={currentValue}
        disabled={disabled}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        rows={autoResize ? minRows : props.rows}
        maxLength={maxLength}
        style={textareaStyle}
        {...props}
      />
      
      {/* Character count */}
      {showCount && (
        <div className={clsx(
          'dyn-textarea__count',
          { 'dyn-textarea__count--over-limit': isOverLimit }
        )}>
          {characterCount}
          {maxLength && (
            <span className="dyn-textarea__count-max">/{maxLength}</span>
          )}
        </div>
      )}
    </div>
  );
});

DynTextArea.displayName = 'DynTextArea';