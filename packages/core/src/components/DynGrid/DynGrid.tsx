import React, { forwardRef } from 'react';
import clsx from 'clsx';
import type { ComponentSize } from '@dynui-max/design-tokens';
import './DynGrid.css';

export interface DynGridProps {
  /**
   * Number of columns
   * @default 12
   */
  columns?: number;
  
  /**
   * Gap between grid items
   * @default 'md'
   */
  gap?: ComponentSize;
  
  /**
   * Row gap (if different from gap)
   */
  rowGap?: ComponentSize;
  
  /**
   * Column gap (if different from gap)
   */
  columnGap?: ComponentSize;
  
  /**
   * Responsive columns configuration
   */
  responsive?: {
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  
  /**
   * Grid content
   */
  children: React.ReactNode;
  
  /**
   * Additional CSS class names
   */
  className?: string;
  
  /**
   * HTML element to render as
   * @default 'div'
   */
  as?: React.ElementType;
}

export interface DynGridItemProps {
  /**
   * Column span
   * @default 1
   */
  span?: number;
  
  /**
   * Column offset
   */
  offset?: number;
  
  /**
   * Responsive span configuration
   */
  responsive?: {
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  
  /**
   * Grid item content
   */
  children: React.ReactNode;
  
  /**
   * Additional CSS class names
   */
  className?: string;
  
  /**
   * HTML element to render as
   * @default 'div'
   */
  as?: React.ElementType;
}

/**
 * DynGrid - CSS Grid layout component
 * 
 * Features:
 * - Responsive column system (12-column default)
 * - Gap control using design tokens
 * - Responsive breakpoint support
 * - Flexible item spanning and offsetting
 */
export const DynGrid = forwardRef<HTMLElement, DynGridProps>((
  {
    columns = 12,
    gap = 'md',
    rowGap,
    columnGap,
    responsive,
    children,
    className,
    as: Component = 'div',
    ...props
  },
  ref
) => {
  const classes = clsx(
    'dyn-grid',
    `dyn-grid--columns-${columns}`,
    `dyn-grid--gap-${gap}`,
    {
      [`dyn-grid--row-gap-${rowGap}`]: rowGap,
      [`dyn-grid--column-gap-${columnGap}`]: columnGap,
      'dyn-grid--responsive': responsive
    },
    className
  );
  
  const style: React.CSSProperties = {
    ...(responsive && {
      '--grid-columns': columns,
      '--grid-columns-sm': responsive.sm,
      '--grid-columns-md': responsive.md,
      '--grid-columns-lg': responsive.lg,
      '--grid-columns-xl': responsive.xl
    } as any)
  };
  
  return (
    <Component
      ref={ref}
      className={classes}
      style={style}
      {...props}
    >
      {children}
    </Component>
  );
});

DynGrid.displayName = 'DynGrid';

/**
 * DynGridItem - Individual grid item with span and offset controls
 */
export const DynGridItem = forwardRef<HTMLElement, DynGridItemProps>((
  {
    span = 1,
    offset,
    responsive,
    children,
    className,
    as: Component = 'div',
    ...props
  },
  ref
) => {
  const classes = clsx(
    'dyn-grid-item',
    `dyn-grid-item--span-${span}`,
    {
      [`dyn-grid-item--offset-${offset}`]: offset,
      'dyn-grid-item--responsive': responsive
    },
    className
  );
  
  const style: React.CSSProperties = {
    ...(responsive && {
      '--grid-span': span,
      '--grid-span-sm': responsive.sm,
      '--grid-span-md': responsive.md,
      '--grid-span-lg': responsive.lg,
      '--grid-span-xl': responsive.xl
    } as any)
  };
  
  return (
    <Component
      ref={ref}
      className={classes}
      style={style}
      {...props}
    >
      {children}
    </Component>
  );
});

DynGridItem.displayName = 'DynGridItem';