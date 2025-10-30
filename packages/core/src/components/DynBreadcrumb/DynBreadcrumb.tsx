import React, { forwardRef } from 'react';
import clsx from 'clsx';
import { DynIcon } from '../DynIcon';
import './DynBreadcrumb.css';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export interface DynBreadcrumbProps {
  /**
   * Breadcrumb items
   */
  items: BreadcrumbItem[];
  
  /**
   * Separator icon/text
   * @default chevron-right icon
   */
  separator?: React.ReactNode;
  
  /**
   * Maximum visible items (others will be collapsed)
   */
  maxItems?: number;
  
  /**
   * Additional CSS class names
   */
  className?: string;
  
  /**
   * Test identifier
   */
  'data-testid'?: string;
}

/**
 * DynBreadcrumb - Navigation breadcrumb component
 * 
 * Features:
 * - Automatic overflow handling
 * - Customizable separator
 * - Link and button support
 * - ARIA navigation pattern
 */
export const DynBreadcrumb = forwardRef<HTMLNavElement, DynBreadcrumbProps>((
  {
    items,
    separator = <DynIcon name="chevron-right" size="sm" />,
    maxItems,
    className,
    'data-testid': dataTestId,
    ...props
  },
  ref
) => {
  // Handle overflow when maxItems is specified
  const displayItems = useMemo(() => {
    if (!maxItems || items.length <= maxItems) {
      return items;
    }
    
    if (maxItems === 1) {
      return [items[items.length - 1]];
    }
    
    if (maxItems === 2) {
      return [
        items[0],
        { label: '...', disabled: true },
        items[items.length - 1]
      ];
    }
    
    const start = items.slice(0, 1);
    const end = items.slice(-(maxItems - 2));
    const overflow = { label: '...', disabled: true };
    
    return [...start, overflow, ...end];
  }, [items, maxItems]);
  
  return (
    <nav
      ref={ref}
      className={clsx('dyn-breadcrumb', className)}
      aria-label="Breadcrumb"
      data-testid={dataTestId}
      {...props}
    >
      <ol className="dyn-breadcrumb__list">
        {displayItems.map((item, index) => {
          const isLast = index === displayItems.length - 1;
          const isOverflow = item.label === '...';
          
          return (
            <li key={index} className="dyn-breadcrumb__item">
              {isOverflow ? (
                <span className="dyn-breadcrumb__overflow">
                  {item.label}
                </span>
              ) : item.href ? (
                <a
                  href={item.href}
                  className={clsx(
                    'dyn-breadcrumb__link',
                    {
                      'dyn-breadcrumb__link--current': isLast,
                      'dyn-breadcrumb__link--disabled': item.disabled
                    }
                  )}
                  aria-current={isLast ? 'page' : undefined}
                  tabIndex={item.disabled ? -1 : undefined}
                >
                  {item.label}
                </a>
              ) : item.onClick ? (
                <button
                  type="button"
                  className={clsx(
                    'dyn-breadcrumb__button',
                    {
                      'dyn-breadcrumb__button--current': isLast,
                      'dyn-breadcrumb__button--disabled': item.disabled
                    }
                  )}
                  onClick={item.onClick}
                  disabled={item.disabled}
                  aria-current={isLast ? 'page' : undefined}
                >
                  {item.label}
                </button>
              ) : (
                <span
                  className={clsx(
                    'dyn-breadcrumb__text',
                    { 'dyn-breadcrumb__text--current': isLast }
                  )}
                  aria-current={isLast ? 'page' : undefined}
                >
                  {item.label}
                </span>
              )}
              
              {/* Separator */}
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