import React, { forwardRef } from 'react';
import clsx from 'clsx';
import './DynBreadcrumbItem.css';

export interface DynBreadcrumbItemProps {
  /**
   * Item content
   */
  children: React.ReactNode;
  
  /**
   * Link href
   */
  href?: string;
  
  /**
   * Click handler (for button-like items)
   */
  onClick?: () => void;
  
  /**
   * Current/active item
   */
  current?: boolean;
  
  /**
   * Disabled state
   */
  disabled?: boolean;
  
  /**
   * Additional CSS class names
   */
  className?: string;
  
  /**
   * HTML element to render as
   * @default determined by props
   */
  as?: React.ElementType;
}

/**
 * DynBreadcrumbItem - Individual breadcrumb item
 * 
 * Features:
 * - Automatic element selection (a, button, span)
 * - Current page indication
 * - Disabled state support
 * - Polymorphic rendering
 */
export const DynBreadcrumbItem = forwardRef<HTMLElement, DynBreadcrumbItemProps>((
  {
    children,
    href,
    onClick,
    current = false,
    disabled = false,
    className,
    as,
    ...props
  },
  ref
) => {
  // Determine component type
  const Component = as || (href ? 'a' : onClick ? 'button' : 'span');
  
  const classes = clsx(
    'dyn-breadcrumb-item',
    {
      'dyn-breadcrumb-item--current': current,
      'dyn-breadcrumb-item--disabled': disabled,
      'dyn-breadcrumb-item--link': href && !disabled,
      'dyn-breadcrumb-item--button': onClick && !disabled,
      'dyn-breadcrumb-item--text': !href && !onClick
    },
    className
  );
  
  const commonProps = {
    ref,
    className: classes,
    'aria-current': current ? 'page' : undefined,
    'aria-disabled': disabled,
    ...props
  };
  
  if (Component === 'a') {
    return (
      <a
        {...commonProps}
        href={disabled ? undefined : href}
        tabIndex={disabled ? -1 : undefined}
        onClick={disabled ? (e) => e.preventDefault() : undefined}
      >
        {children}
      </a>
    );
  }
  
  if (Component === 'button') {
    return (
      <button
        {...commonProps}
        type="button"
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </button>
    );
  }
  
  // Default: span
  return (
    <span {...commonProps}>
      {children}
    </span>
  );
});

DynBreadcrumbItem.displayName = 'DynBreadcrumbItem';