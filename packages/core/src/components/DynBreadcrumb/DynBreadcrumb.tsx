import { forwardRef, useRef } from 'react';
import clsx from 'clsx';
import './DynBreadcrumb.css';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export interface DynBreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: string;
  maxItems?: number;
  className?: string;
  'aria-label'?: string;
  'data-testid'?: string;
}

// Type guards for better type safety
function hasHref(item: BreadcrumbItem): item is BreadcrumbItem & { href: string } {
  return typeof item.href === 'string' && item.href.length > 0;
}

function hasOnClick(item: BreadcrumbItem): item is BreadcrumbItem & { onClick: () => void } {
  return typeof item.onClick === 'function';
}

export const DynBreadcrumb = forwardRef<HTMLElement, DynBreadcrumbProps>((
  {
    items,
    separator = '/',
    maxItems,
    className,
    'aria-label': ariaLabel = 'Breadcrumb',
    'data-testid': dataTestId
  },
  ref
) => {
  const navRef = useRef<HTMLElement>(null);
  
  const displayItems = maxItems && items.length > maxItems
    ? [
        ...items.slice(0, 1),
        { label: '...', disabled: true },
        ...items.slice(-(maxItems - 2))
      ]
    : items;
  
  return (
    <nav
      ref={ref || navRef}
      className={clsx('dyn-breadcrumb', className)}
      aria-label={ariaLabel}
      data-testid={dataTestId}
    >
      <ol className="dyn-breadcrumb__list">
        {displayItems.map((item, index) => {
          const isLast = index === displayItems.length - 1;
          
          return (
            <li key={index} className="dyn-breadcrumb__item">
              {hasHref(item) && !item.disabled ? (
                <a
                  href={item.href}
                  className="dyn-breadcrumb__link"
                  aria-current={isLast ? 'page' : undefined}
                >
                  {item.label}
                </a>
              ) : hasOnClick(item) && !item.disabled ? (
                <button
                  type="button"
                  onClick={item.onClick}
                  className="dyn-breadcrumb__link"
                  aria-current={isLast ? 'page' : undefined}
                >
                  {item.label}
                </button>
              ) : (
                <span
                  className={clsx('dyn-breadcrumb__text', {
                    'dyn-breadcrumb__text--disabled': item.disabled,
                    'dyn-breadcrumb__text--current': isLast
                  })}
                  aria-current={isLast ? 'page' : undefined}
                >
                  {item.label}
                </span>
              )}
              
              {!isLast && (
                <span className="dyn-breadcrumb__separator" aria-hidden="true">
                  {separator}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
});

DynBreadcrumb.displayName = 'DynBreadcrumb';