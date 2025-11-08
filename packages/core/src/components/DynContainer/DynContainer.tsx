import React, { forwardRef } from 'react';
import clsx from 'clsx';
import type { ComponentSize } from '@dynui-max/design-tokens';
import './DynContainer.css';

export interface DynContainerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  padding?: ComponentSize;
  centered?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export const DynContainer = forwardRef<HTMLDivElement, DynContainerProps>((
  {
    size = 'lg',
    padding,
    centered = false,
    children,
    className,
    ...props
  },
  ref
) => {
  const classes = clsx(
    'dyn-container',
    `dyn-container--size-${size}`,
    {
      [`dyn-container--padding-${padding}`]: padding,
      'dyn-container--centered': centered
    },
    className
  );

  return (
    <div ref={ref} className={classes} {...props}>
      {children}
    </div>
  );
});

DynContainer.displayName = 'DynContainer';