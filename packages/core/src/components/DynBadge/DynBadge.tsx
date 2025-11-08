import React, { forwardRef } from 'react';
import clsx from 'clsx';
import type { ComponentSize, ComponentColor } from '@dynui-max/design-tokens';
import './DynBadge.css';

export interface DynBadgeProps {
  /**
   * Badge size using design tokens
   * @default 'md'
   */
  size?: ComponentSize;
  
  /**
   * Color variant
   * @default 'neutral'
   */
  color?: ComponentColor;
  
  /**
   * Visual variant
   * @default 'solid'
   */
  variant?: 'solid' | 'outline' | 'soft';
  
  /**
   * Badge content
   */
  children?: React.ReactNode;
  
  /**
   * Additional CSS class names
   */
  className?: string;
  
  /**
   * HTML element to render as
   * @default 'span'
   */
  as?: React.ElementType;
}

/**
 * DynBadge - Small status and labeling component
 * 
 * Features:
 * - Size variants using spacing tokens
 * - Color variants using semantic tokens
 * - Multiple visual styles (solid, outline, soft)
 * - Polymorphic rendering (span, a, button, etc.)
 */
export const DynBadge = forwardRef<HTMLSpanElement, DynBadgeProps>(
  (
    {
      size = 'md',
      color = 'neutral',
      variant = 'solid',
      children,
      className,
      as: Component = 'span',
      ...props
    },
    ref
  ) => {
    const classes = clsx(
      'dyn-badge',
      `dyn-badge--size-${size}`,
      `dyn-badge--color-${color}`,
      `dyn-badge--variant-${variant}`,
      className
    );
    
    return (
      <Component
        ref={ref}
        className={classes}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

DynBadge.displayName = 'DynBadge';