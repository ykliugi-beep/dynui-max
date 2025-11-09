import React, { forwardRef } from 'react';
import clsx from 'clsx';
import type { ComponentSize } from '@dynui-max/design-tokens';
import './DynGrid.css';

export interface DynGridProps {
  columns?: number;
  gap?: ComponentSize;
  rowGap?: ComponentSize;
  columnGap?: ComponentSize;
  responsive?: {
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  children: React.ReactNode;
  className?: string;
}

export interface DynGridItemProps {
  span?: number;
  offset?: number;
  responsive?: {
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  children: React.ReactNode;
  className?: string;
}

export const DynGrid = forwardRef<HTMLDivElement, DynGridProps>((
  {
    columns = 12,
    gap = 'md',
    rowGap,
    columnGap,
    responsive,
    children,
    className,
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
    <div
      ref={ref}
      className={classes}
      style={style}
      {...props}
    >
      {children}
    </div>
  );
});

DynGrid.displayName = 'DynGrid';

export const DynGridItem = forwardRef<HTMLDivElement, DynGridItemProps>((
  {
    span = 1,
    offset,
    responsive,
    children,
    className,
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
    <div
      ref={ref}
      className={classes}
      style={style}
      {...props}
    >
      {children}
    </div>
  );
});

DynGridItem.displayName = 'DynGridItem';