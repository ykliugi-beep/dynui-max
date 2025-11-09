import React, { forwardRef } from 'react';
import clsx from 'clsx';
import './DynBreadcrumbItem.css';

export interface DynBreadcrumbItemProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  current?: boolean;
  disabled?: boolean;
  className?: string;
  as?: React.ElementType;
}

type BreadcrumbElement = HTMLAnchorElement | HTMLButtonElement | HTMLSpanElement;

/**
 * DynBreadcrumbItem - Individual breadcrumb item with polymorphic rendering
 */
export const DynBreadcrumbItem = forwardRef<BreadcrumbElement, DynBreadcrumbItemProps>(({
  children,
  href,
  onClick,
  current = false,
  disabled = false,
  className,
  as,
  ...props
}, ref) => {
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
  
  const ariaCurrentValue = current ? 'page' : undefined;
  
  const commonProps = {
    className: classes,
    'aria-current': ariaCurrentValue as 'page' | undefined,
    'aria-disabled': disabled,
    ...props
  };
  
  if (Component === 'a') {
    return (
      <a
        {...commonProps}
        ref={ref as React.ForwardedRef<HTMLAnchorElement>}
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
        ref={ref as React.ForwardedRef<HTMLButtonElement>}
        type="button"
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </button>
    );
  }
  
  return (
    <span
      {...commonProps}
      ref={ref as React.ForwardedRef<HTMLSpanElement>}
    >
      {children}
    </span>
  );
});

DynBreadcrumbItem.displayName = 'DynBreadcrumbItem';