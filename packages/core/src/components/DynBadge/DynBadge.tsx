import React, { forwardRef } from 'react';
import clsx from 'clsx';
import type { ComponentSize, ComponentColor } from '@dynui-max/design-tokens';
import './DynBadge.css';

export interface DynBadgeProps {
  size?: ComponentSize;
  color?: ComponentColor;
  variant?: 'solid' | 'outline' | 'soft';
  className?: string;
  children?: React.ReactNode;
}

export const DynBadge = forwardRef<HTMLSpanElement, DynBadgeProps>(
  ({ size = 'md', color = 'neutral', variant = 'solid', className, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={clsx(
          'dyn-badge',
          `dyn-badge--size-${size}`,
          `dyn-badge--color-${color}`,
          `dyn-badge--variant-${variant}`,
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);

DynBadge.displayName = 'DynBadge';
