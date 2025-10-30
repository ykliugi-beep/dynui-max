import React, { forwardRef } from 'react';
import clsx from 'clsx';
import type { ComponentSize } from '@dynui-max/design-tokens';
import { iconRegistry } from './iconRegistry';
import './DynIcon.css';

export interface DynIconProps extends React.SVGProps<SVGSVGElement> {
  /**
   * Icon name from the registry
   */
  name: string;
  
  /**
   * Icon size using design tokens
   * @default 'md'
   */
  size?: ComponentSize;
  
  /**
   * Color variant - uses semantic color tokens
   * @default 'current'
   */
  color?: 'current' | 'primary' | 'secondary' | 'muted' | 'success' | 'warning' | 'danger';
  
  /**
   * Accessible title for screen readers
   * If not provided, icon is treated as decorative (aria-hidden)
   */
  title?: string;
  
  /**
   * Additional CSS class names
   */
  className?: string;
}

/**
 * DynIcon - Icon component with registry system and token integration
 * 
 * Features:
 * - Icon registry for centralized icon management
 * - Size tokens integration (sm, md, lg)
 * - Color tokens for consistent theming
 * - Accessibility support with optional titles
 * - Decorative mode when no title provided
 */
export const DynIcon = forwardRef<SVGSVGElement, DynIconProps>((
  { 
    name, 
    size = 'md', 
    color = 'current',
    title,
    className,
    ...props 
  }, 
  ref
) => {
  const IconComponent = iconRegistry.get(name);
  
  if (!IconComponent) {
    console.warn(`DynIcon: Icon "${name}" not found in registry`);
    return null;
  }

  const classes = clsx(
    'dyn-icon',
    `dyn-icon--size-${size}`,
    `dyn-icon--color-${color}`,
    className
  );

  return (
    <IconComponent
      ref={ref}
      className={classes}
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={!title}
      {...props}
    >
      {title && <title>{title}</title>}
    </IconComponent>
  );
});

DynIcon.displayName = 'DynIcon';