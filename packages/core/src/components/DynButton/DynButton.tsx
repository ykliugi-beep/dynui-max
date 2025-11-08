import React, { forwardRef } from 'react';
import clsx from 'clsx';
import type { ComponentVariant, ComponentSize, ComponentColor } from '@dynui-max/design-tokens';
import { DynIcon } from '../DynIcon';
import './DynButton.css';

export interface DynButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement>, React.ButtonHTMLAttributes<HTMLButtonElement>, React.HTMLAttributes<HTMLButtonElement> {
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
   * Disabled state
   */
  disabled?: boolean;
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
   * HTML element to render as
   * @default 'button'
   */
  as?: React.ElementType;
}

export const DynButton = forwardRef<HTMLButtonElement, DynButtonProps>(
  (
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
      type = 'button',
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
        disabled={Component === 'button' ? isDisabled : undefined}
        type={Component === 'button' ? type : undefined}
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
  }
);
DynButton.displayName = 'DynButton';
