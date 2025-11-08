import React, { forwardRef } from 'react';
import clsx from 'clsx';
import type { ComponentVariant, ComponentSize, ComponentColor } from '@dynui-max/design-tokens';
import { DynIcon } from '../DynIcon';
import './DynButton.css';

// Polymorphic types for DynButton
type AsProp<C extends React.ElementType> = {
  as?: C;
};

type PropsToOmit<C extends React.ElementType, P> = keyof (AsProp<C> & P);

type PolymorphicComponentProp<
  C extends React.ElementType,
  Props = object
> = React.PropsWithChildren<Props & AsProp<C>> &
  Omit<React.ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>>;

type PolymorphicRef<C extends React.ElementType> =
  React.ComponentPropsWithRef<C>['ref'];

export interface DynButtonBaseProps {
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
   * Button content
   */
  children?: React.ReactNode;
}

export type DynButtonProps<C extends React.ElementType = 'button'> = PolymorphicComponentProp<
  C,
  DynButtonBaseProps
> & { ref?: PolymorphicRef<C> };

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
export const DynButton = forwardRef(
  <C extends React.ElementType = 'button'>(
    {
      variant = 'solid',
      size = 'md',
      color = 'primary',
      loading = false,
      disabled = false,
      fullWidth = false,
      startIcon,
      endIcon,
      as,
      className,
      children,
      ...props
    }: DynButtonProps<C>,
    ref?: PolymorphicRef<C>
  ) => {
    const Component = as || 'button';
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
) as <C extends React.ElementType = 'button'>(
  props: DynButtonProps<C>
) => React.ReactElement | null;

DynButton.displayName = 'DynButton';