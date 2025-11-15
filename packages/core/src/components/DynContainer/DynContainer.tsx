import { forwardRef, type ElementType, type ReactNode } from 'react';
import clsx from 'clsx';
import type { ComponentSize } from '@dynui-max/design-tokens';
import './DynContainer.css';

export interface DynContainerProps {
  /**
   * Container size variant
   * @default 'md'
   */
  size?: ComponentSize | 'xl' | '2xl';
  
  /**
   * Center content horizontally
   * @default true
   */
  centered?: boolean;
  
  /**
   * Full width (removes max-width)
   */
  fluid?: boolean;
  
  /**
   * Container content
   */
  children: ReactNode;
  
  /**
   * Additional CSS class names
   */
  className?: string;
  
  /**
   * HTML element to render as
   * @default 'div'
   */
  as?: ElementType;
}

/**
 * DynContainer - Layout container with responsive width constraints
 * 
 * Features:
 * - Size variants with max-width constraints
 * - Centered or fluid layout options
 * - Responsive padding
 * - Polymorphic rendering
 */
export const DynContainer = forwardRef<HTMLElement, DynContainerProps>((
  {
    size = 'md',
    centered = true,
    fluid = false,
    children,
    className,
    as: Component = 'div',
    ...props
  },
  ref
) => {
  const classes = clsx(
    'dyn-container',
    `dyn-container--size-${size}`,
    {
      'dyn-container--centered': centered,
      'dyn-container--fluid': fluid
    },
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
});

DynContainer.displayName = 'DynContainer';