import React, { forwardRef, useMemo } from 'react';
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

const isLinkItem = (
  item: BreadcrumbItem
): item is BreadcrumbItem & { href: string } =>
  typeof item.href === 'string' && item.href.length > 0;

const isButtonItem = (
  item: BreadcrumbItem
): item is BreadcrumbItem & { onClick: () => void } =>
  typeof item.onClick === 'function';

/**
 * DynBreadcrumb - Navigation breadcrumb component
 * 
 * Features:
 * - Automatic overflow handling
 * - Customizable separator
 * - Link and button support
 * - ARIA navigation pattern
 */
export const DynBreadcrumb = forwardRef<HTMLElement, DynBreadcrumbProps>((
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
  const safeItems = useMemo(
    () =>
      items.filter(
        (item): item is BreadcrumbItem =>
          Boolean(item && typeof item.label === 'string')
      ),
    [items]
  );

  const normalizedMaxItems = useMemo(() => {
    if (typeof maxItems !== 'number' || Number.isNaN(maxItems)) {
      return undefined;
    }

    const floored = Math.floor(maxItems);

    if (floored <= 0) {
      return 1;
    }

    return floored;
  }, [maxItems]);

  // Handle overflow when maxItems is specified
  const displayItems = useMemo<BreadcrumbItem[]>(() => {
    if (safeItems.length === 0) {
      return [];
    }

    if (!normalizedMaxItems || safeItems.length <= normalizedMaxItems) {
      return safeItems;
    }

    if (normalizedMaxItems === 1) {
      return [safeItems[safeItems.length - 1]];
    }

    if (normalizedMaxItems === 2) {
      return [
        safeItems[0],
        { label: '...', disabled: true },
        safeItems[safeItems.length - 1]
      ];
    }

    const start = safeItems.slice(0, 1);
    const end = safeItems.slice(-(normalizedMaxItems - 2));
    const overflow = { label: '...', disabled: true };

    return [...start, overflow, ...end];
  }, [normalizedMaxItems, safeItems]);
  
  return (
    <nav
      ref={ref}
      className={clsx('dyn-breadcrumb', className)}
      aria-label="Breadcrumb"
      data-testid={dataTestId}
      {...props}
    >
      <ol className="dyn-breadcrumb__list">
        {displayItems.length === 0 ? (
          <li className="dyn-breadcrumb__item">
            <span className="dyn-breadcrumb__text">No breadcrumb items</span>
          </li>
        ) : (
          displayItems.map((item, index) => {
            const isLast = index === displayItems.length - 1;
            const isOverflow = item.label === '...';
            const linkItem = isLinkItem(item);
            const buttonItem = !linkItem && isButtonItem(item);

            return (
              <li key={index} className="dyn-breadcrumb__item">
                {isOverflow ? (
                  <span className="dyn-breadcrumb__overflow">{item.label}</span>
                ) : linkItem ? (
                  <a
                    href={item.href}
                    className={clsx('dyn-breadcrumb__link', {
                      'dyn-breadcrumb__link--current': isLast,
                      'dyn-breadcrumb__link--disabled': item.disabled
                    })}
                    aria-current={isLast ? 'page' : undefined}
                    tabIndex={item.disabled ? -1 : undefined}
                  >
                    {item.label}
                  </a>
                ) : buttonItem ? (
                  <button
                    type="button"
                    className={clsx('dyn-breadcrumb__button', {
                      'dyn-breadcrumb__button--current': isLast,
                      'dyn-breadcrumb__button--disabled': item.disabled
                    })}
                    onClick={item.onClick}
                    disabled={item.disabled}
                    aria-current={isLast ? 'page' : undefined}
                  >
                    {item.label}
                  </button>
                ) : (
                  <span
                    className={clsx('dyn-breadcrumb__text', {
                      'dyn-breadcrumb__text--current': isLast
                    })}
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
          })
        )}
      </ol>
    </nav>
  );
});

DynBreadcrumb.displayName = 'DynBreadcrumb';