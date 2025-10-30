import React, { forwardRef, useState, useRef, useCallback, useMemo } from 'react';
import clsx from 'clsx';
import type { ComponentSize } from '@dynui-max/design-tokens';
import type { InputVariant } from '../DynInput';
import { DynIcon } from '../DynIcon';
import { useClickOutside } from '../../hooks/useClickOutside';
import { useKeyboard } from '../../hooks/useKeyboard';
import './DynSelect.css';

export interface SelectOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

export interface DynSelectProps {
  /**
   * Select size using design tokens
   * @default 'md'
   */
  size?: ComponentSize;
  
  /**
   * Visual variant
   * @default 'outline'
   */
  variant?: InputVariant;
  
  /**
   * Current selected value(s)
   */
  value?: string | string[];
  
  /**
   * Default selected value(s)
   */
  defaultValue?: string | string[];
  
  /**
   * Change handler
   */
  onChange?: (value: string | string[]) => void;
  
  /**
   * Available options
   */
  options: SelectOption[];
  
  /**
   * Placeholder text
   */
  placeholder?: string;
  
  /**
   * Multiple selection mode
   */
  multiple?: boolean;
  
  /**
   * Enable search functionality
   */
  searchable?: boolean;
  
  /**
   * Disabled state
   */
  disabled?: boolean;
  
  /**
   * Error state
   */
  error?: boolean;
  
  /**
   * Required field
   */
  required?: boolean;
  
  /**
   * Additional CSS class names
   */
  className?: string;
  
  /**
   * HTML name attribute
   */
  name?: string;
  
  /**
   * HTML id attribute
   */
  id?: string;
  
  /**
   * ARIA attributes
   */
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  
  /**
   * Test identifier
   */
  'data-testid'?: string;
}

export interface DynSelectRef {
  focus: () => void;
  blur: () => void;
  open: () => void;
  close: () => void;
  clear: () => void;
}

/**
 * DynSelect - Advanced dropdown selection component
 * 
 * Features:
 * - Single and multiple selection modes
 * - Searchable with live filtering
 * - Keyboard navigation (Arrow keys, Enter, Escape)
 * - Complete ARIA combobox pattern
 * - Design tokens integration
 * - Click outside to close
 * - Focus management
 */
export const DynSelect = forwardRef<DynSelectRef, DynSelectProps>((
  {
    size = 'md',
    variant = 'outline',
    value,
    defaultValue,
    onChange,
    options,
    placeholder = 'Select option...',
    multiple = false,
    searchable = false,
    disabled = false,
    error = false,
    required = false,
    className,
    name,
    id,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledby,
    'aria-describedby': ariaDescribedby,
    'data-testid': dataTestId,
    ...props
  },
  ref
) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [internalValue, setInternalValue] = useState<string | string[]>(
    multiple ? (defaultValue as string[] || []) : (defaultValue as string || '')
  );
  
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  
  const currentValue = value !== undefined ? value : internalValue;
  
  // Filter options based on search query
  const filteredOptions = useMemo(() => {
    if (!searchable || !searchQuery) return options;
    const query = searchQuery.toLowerCase();
    return options.filter(option => 
      option.label.toLowerCase().includes(query) ||
      option.description?.toLowerCase().includes(query)
    );
  }, [options, searchable, searchQuery]);
  
  // Get display value
  const getDisplayValue = useCallback(() => {
    if (multiple && Array.isArray(currentValue)) {
      if (currentValue.length === 0) return placeholder;
      if (currentValue.length === 1) {
        const option = options.find(opt => opt.value === currentValue[0]);
        return option?.label || currentValue[0];
      }
      return `${currentValue.length} selected`;
    } else {
      const option = options.find(opt => opt.value === currentValue);
      return option?.label || placeholder;
    }
  }, [currentValue, multiple, options, placeholder]);
  
  // Handle value change
  const handleValueChange = useCallback((newValue: string | string[]) => {
    if (value === undefined) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
  }, [onChange, value]);
  
  // Handle option selection
  const handleOptionSelect = useCallback((optionValue: string) => {
    if (multiple && Array.isArray(currentValue)) {
      const newValue = currentValue.includes(optionValue)
        ? currentValue.filter(v => v !== optionValue)
        : [...currentValue, optionValue];
      handleValueChange(newValue);
    } else {
      handleValueChange(optionValue);
      setIsOpen(false);
    }
    setSearchQuery('');
  }, [currentValue, multiple, handleValueChange]);
  
  // Handle trigger click
  const handleTriggerClick = useCallback(() => {
    if (!disabled) {
      setIsOpen(!isOpen);
      if (!isOpen && searchable) {
        setTimeout(() => searchRef.current?.focus(), 0);
      }
    }
  }, [disabled, isOpen, searchable]);
  
  // Handle keyboard navigation
  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else {
          setFocusedIndex(prev => 
            prev < filteredOptions.length - 1 ? prev + 1 : 0
          );
        }
        break;
        
      case 'ArrowUp':
        event.preventDefault();
        if (isOpen) {
          setFocusedIndex(prev => 
            prev > 0 ? prev - 1 : filteredOptions.length - 1
          );
        }
        break;
        
      case 'Enter':
      case ' ':
        event.preventDefault();
        if (isOpen && focusedIndex >= 0) {
          const option = filteredOptions[focusedIndex];
          if (option && !option.disabled) {
            handleOptionSelect(option.value);
          }
        } else if (!isOpen) {
          setIsOpen(true);
        }
        break;
        
      case 'Escape':
        if (isOpen) {
          setIsOpen(false);
          triggerRef.current?.focus();
        }
        break;
    }
  }, [isOpen, focusedIndex, filteredOptions, handleOptionSelect]);
  
  // Close dropdown when clicking outside
  useClickOutside([triggerRef, dropdownRef], () => {
    if (isOpen) {
      setIsOpen(false);
    }
  });
  
  // Reset focused index when options change
  React.useEffect(() => {
    setFocusedIndex(-1);
  }, [filteredOptions.length]);
  
  // Expose ref methods
  React.useImperativeHandle(ref, () => ({
    focus: () => triggerRef.current?.focus(),
    blur: () => triggerRef.current?.blur(),
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
    clear: () => handleValueChange(multiple ? [] : '')
  }), [handleValueChange, multiple]);
  
  const hasValue = multiple 
    ? Array.isArray(currentValue) && currentValue.length > 0
    : Boolean(currentValue);
  
  const triggerClasses = clsx(
    'dyn-select-trigger',
    `dyn-select-trigger--size-${size}`,
    `dyn-select-trigger--variant-${variant}`,
    {
      'dyn-select-trigger--open': isOpen,
      'dyn-select-trigger--disabled': disabled,
      'dyn-select-trigger--error': error,
      'dyn-select-trigger--has-value': hasValue
    },
    className
  );
  
  return (
    <div className="dyn-select" data-testid={dataTestId}>
      <button
        ref={triggerRef}
        type="button"
        id={id}
        className={triggerClasses}
        disabled={disabled}
        onClick={handleTriggerClick}
        onKeyDown={handleKeyDown}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledby}
        aria-describedby={ariaDescribedby}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-required={required}
        {...props}
      >
        <span className="dyn-select-trigger__value">
          {getDisplayValue()}
        </span>
        
        <span className="dyn-select-trigger__icon" aria-hidden="true">
          <DynIcon 
            name="chevron-down" 
            size="sm" 
            className={clsx('dyn-select-trigger__chevron', {
              'dyn-select-trigger__chevron--open': isOpen
            })} 
          />
        </span>
      </button>
      
      {isOpen && (
        <div ref={dropdownRef} className="dyn-select-dropdown">
          {searchable && (
            <div className="dyn-select-search">
              <input
                ref={searchRef}
                type="text"
                className="dyn-select-search__input"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          )}
          
          <ul className="dyn-select-options" role="listbox" aria-multiselectable={multiple}>
            {filteredOptions.length === 0 ? (
              <li className="dyn-select-option dyn-select-option--empty">
                No options found
              </li>
            ) : (
              filteredOptions.map((option, index) => {
                const isSelected = multiple
                  ? Array.isArray(currentValue) && currentValue.includes(option.value)
                  : currentValue === option.value;
                const isFocused = index === focusedIndex;
                
                return (
                  <li
                    key={option.value}
                    className={clsx(
                      'dyn-select-option',
                      {
                        'dyn-select-option--selected': isSelected,
                        'dyn-select-option--focused': isFocused,
                        'dyn-select-option--disabled': option.disabled
                      }
                    )}
                    role="option"
                    aria-selected={isSelected}
                    aria-disabled={option.disabled}
                    onClick={() => !option.disabled && handleOptionSelect(option.value)}
                  >
                    <div className="dyn-select-option__content">
                      <div className="dyn-select-option__label">
                        {option.label}
                      </div>
                      
                      {option.description && (
                        <div className="dyn-select-option__description">
                          {option.description}
                        </div>
                      )}
                    </div>
                    
                    {isSelected && (
                      <div className="dyn-select-option__check" aria-hidden="true">
                        <DynIcon name="check" size="sm" />
                      </div>
                    )}
                  </li>
                );
              })
            )}
          </ul>
        </div>
      )}
      
      {/* Hidden input for form submission */}
      {name && (
        <input
          type="hidden"
          name={name}
          value={multiple
            ? JSON.stringify(Array.isArray(currentValue) ? currentValue : [])
            : (typeof currentValue === 'string' ? currentValue : '')
          }
          required={required}
        />
      )}
    </div>
  );
});

DynSelect.displayName = 'DynSelect';