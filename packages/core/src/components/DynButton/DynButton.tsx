import React, { forwardRef } from 'react';
import clsx from 'clsx';
import type { ComponentVariant, ComponentSize, ComponentColor } from '@dynui-max/design-tokens';
import { DynIcon } from '../DynIcon';
import './DynButton.css';

export interface DynButtonProps {
  variant?: ComponentVariant;
  size?: ComponentSize;
  color?: ComponentColor;
  loading?: boolean;
  disabled?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  fullWidth?: boolean;
  className?: string;
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'submit' | 'reset';
}

export const DynButton = forwardRef<HTMLButtonElement, DynButtonProps>(
  ({ variant = 'solid', size = 'md', color = 'primary', loading = false, disabled = false, fullWidth = false, startIcon, endIcon, className, children, type = 'button', ...props }, ref) => {
    const isDisabled = disabled || loading;
    return (
      <button
        ref={ref}
        className={clsx(
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
        )}
        disabled={isDisabled}
        type={type}
        aria-busy={loading}
        {...props}
      >
        {loading && (
          <span className="dyn-button__loading" aria-hidden="true">
            <DynIcon name="spinner" size={size} />
          </span>
        )}
        {startIcon && !loading && (
          <span className="dyn-button__start-icon" aria-hidden="true">
            {startIcon}
          </span>
        )}
        {children && (
          <span className="dyn-button__content">
            {children}
          </span>
        )}
        {endIcon && !loading && (
          <span className="dyn-button__end-icon" aria-hidden="true">
            {endIcon}
          </span>
        )}
      </button>
    );
  }
);

DynButton.displayName = 'DynButton';
