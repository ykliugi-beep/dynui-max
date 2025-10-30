import React, { forwardRef } from 'react';
import clsx from 'clsx';
import type { SelectOption } from './DynSelect';
import './DynSelectOption.css';

export interface DynSelectOptionProps {
  /**
   * Option data
   */
  option: SelectOption;
  
  /**
   * Selected state
   */
  selected?: boolean;
  
  /**
   * Highlighted/focused state
   */
  highlighted?: boolean;
  
  /**
   * Click handler
   */
  onClick?: (option: SelectOption) => void;
  
  /**
   * Selection mode for checkbox display
   */
  selectionMode?: 'single' | 'multiple';
  
  /**
   * Additional CSS class names
   */
  className?: string;
}

/**
 * DynSelectOption - Individual option component for DynSelect
 * 
 * Features:
 * - Single and multiple selection visualization
 * - Highlighted state for keyboard navigation
 * - Disabled state support
 * - Icon and description display
 */
export const DynSelectOption = forwardRef<HTMLDivElement, DynSelectOptionProps>((
  {
    option,
    selected = false,
    highlighted = false,
    onClick,
    selectionMode = 'single',
    className,
    ...props
  },
  ref
) => {
  const handleClick = () => {
    if (!option.disabled && onClick) {
      onClick(option);
    }
  };
  
  const classes = clsx(
    'dyn-select-option',
    {
      'dyn-select-option--selected': selected,
      'dyn-select-option--highlighted': highlighted,
      'dyn-select-option--disabled': option.disabled,
      'dyn-select-option--with-icon': Boolean(option.icon),
      'dyn-select-option--multiple': selectionMode === 'multiple'
    },
    className
  );
  
  return (
    <div
      ref={ref}
      className={classes}
      role="option"
      aria-selected={selected}
      aria-disabled={option.disabled}
      data-value={option.value}
      onClick={handleClick}
      {...props}
    >
      {/* Multiple selection checkbox */}
      {selectionMode === 'multiple' && (
        <div className="dyn-select-option__checkbox">
          <input
            type="checkbox"
            checked={selected}
            onChange={() => {}} // Handled by onClick
            tabIndex={-1}
            aria-hidden="true"
          />
        </div>
      )}
      
      {/* Icon */}
      {option.icon && (
        <div className="dyn-select-option__icon">
          {option.icon}
        </div>
      )}
      
      {/* Content */}
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
      
      {/* Selected indicator for single selection */}
      {selectionMode === 'single' && selected && (
        <div className="dyn-select-option__indicator">
          ✓
        </div>
      )}
    </div>
  );
});

DynSelectOption.displayName = 'DynSelectOption';