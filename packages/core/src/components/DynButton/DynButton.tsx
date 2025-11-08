import React, { forwardRef } from 'react';
import clsx from 'clsx';
import type { ComponentVariant, ComponentSize, ComponentColor } from '@dynui-max/design-tokens';
import { DynIcon } from '../DynIcon';
import './DynButton.css';

export interface DynButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Visual style variant
   * @default 'solid'
   */
  variant?: ComponentVariant;
  
  /**
   * Button size using design tokens
   * @default 'md'
   */
  size?: ComponentSize;
  
  /**
   * Color theme variant
   * @default 'primary'
   */
  color?: ComponentColor;
  
  /**
   * Loading state - shows spinner and disables button
   */
  loading?: boolean;
  
  /**
   * Icon at the start of the button
   */
  startIcon?: React.ReactNode;
  
  /**
   * Icon at the end of the button
   */
  endIcon?: React.ReactNode;
  
  /**
   * Full width button
   * @default false
   */
  fullWidth?: boolean;
  
  /**
   * Polymorphic component - render as different element
   * @default 'button'
   */
  as?: React.ElementType;
  
  /**
   * Button content
   */
  children?: React.ReactNode;
}

/**
 * DynButton - Versatile button component with tokens integration
 * 
 * Features:
 * - Multiple visual variants (solid, outline, ghost, link)
 * - Size variants using spacing tokens
 * - Color variants using semantic tokens
 * - Loading state with spinner
 * - Start/end icon support
 * - Full width support
 * - Polymorphic rendering (button, a, etc.)
 * - Full accessibility support
 */
export const DynButton = forwardRef<HTMLButtonElement, DynButtonProps>((
  {
    variant = 'solid',
    size = 'md',
    color = 'primary',
    loading = false,
    disabled = false,
    fullWidth = false,
    startIcon,
    endIcon,
    as: Component = 'button',
    className,
    children,
    ...props
  },
  ref
) => {
  const isDisabled = disabled || loading;
  
  const classes = clsx(
    'dyn-button',
    `dyn-button--variant-${variant}`,
    `dyn-button--size-${size}`,
    `dyn-button--color-${color}`,
    {
      'dyn-button--loading': loading,
      'dyn-button--disabled': isDisabled,
      'dyn-button--full-width': fullWidth,
      'dyn-button--icon-only': !children && (startIcon || endIcon)
    },
    className
  );

  return (
    <Component
      ref={ref}
      className={classes}
      disabled={isDisabled}
      aria-busy={loading}
      {...props}
    >
      {/* Loading spinner */}
      {loading && (
        <span className="dyn-button__loading" aria-hidden="true">
          <DynIcon name="spinner" size={size} />
        </span>
      )}
      
      {/* Start icon */}
      {startIcon && !loading && (
        <span className="dyn-button__start-icon" aria-hidden="true">
          {startIcon}
        </span>
      )}
      
      {/* Content */}
      {children && (
        <span className="dyn-button__content">
          {children}
        </span>
      )}
      
      {/* End icon */}
      {endIcon && !loading && (
        <span className="dyn-button__end-icon" aria-hidden="true">
          {endIcon}
        </span>
      )}
    </Component>
  );
});

DynButton.displayName = 'DynButton';