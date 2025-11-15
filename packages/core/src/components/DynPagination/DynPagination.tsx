import { useMemo, type FC, type HTMLAttributes, type ReactNode } from 'react';
import clsx from 'clsx';
import type { ComponentSize } from '@dynui-max/design-tokens';
import styles from './DynPagination.module.css';

type PaginationItem = number | 'ellipsis';

export interface DynPaginationLabels {
  /** Accessible label for the first page control */
  first?: string;
  /** Accessible label for the previous page control */
  previous?: string;
  /** Accessible label for the next page control */
  next?: string;
  /** Accessible label for the last page control */
  last?: string;
  /** Accessible label generator for each page button */
  page?: (page: number) => string;
}

export interface DynPaginationProps extends HTMLAttributes<HTMLElement> {
  /** Total number of pages */
  totalPages: number;
  /** Currently selected page (1-based index) */
  currentPage: number;
  /** Callback fired when a new page is selected */
  onPageChange: (page: number) => void;
  /** Number of sibling pages to display around the current page */
  siblingCount?: number;
  /** Number of boundary pages to display at the start and end */
  boundaryCount?: number;
  /** Whether to show first/last navigation buttons */
  showFirstLast?: boolean;
  /** Whether to show previous/next navigation buttons */
  showPrevNext?: boolean;
  /** Disable the entire pagination control */
  disabled?: boolean;
  /** Size token for button dimensions */
  size?: ComponentSize;
  /** Accessible label strings */
  labels?: DynPaginationLabels;
}

const createRange = (start: number, end: number): number[] => {
  if (end < start) return [];
  return Array.from({ length: end - start + 1 }, (_, index) => start + index);
};

const buildPaginationRange = (
  totalPages: number,
  currentPage: number,
  siblingCount: number,
  boundaryCount: number
): PaginationItem[] => {
  const totalPageNumbers = siblingCount * 2 + boundaryCount * 2 + 3;

  if (totalPages <= totalPageNumbers) {
    return createRange(1, totalPages);
  }

  const safeCurrent = Math.min(Math.max(currentPage, 1), totalPages);
  const startPages = boundaryCount ? createRange(1, Math.min(boundaryCount, totalPages)) : [];
  const endPages = boundaryCount
    ? createRange(Math.max(totalPages - boundaryCount + 1, boundaryCount + 1), totalPages)
    : [];

  const maxSiblingStart = totalPages - boundaryCount - siblingCount * 2 - 1;
  const minSiblingStart = boundaryCount + 2;
  const siblingStart = Math.max(
    Math.min(safeCurrent - siblingCount, maxSiblingStart),
    minSiblingStart
  );

  const maxSiblingEnd = totalPages - boundaryCount - 1;
  const minSiblingEnd = boundaryCount + siblingCount * 2 + 2;
  const siblingEnd = Math.min(
    Math.max(safeCurrent + siblingCount, minSiblingEnd),
    maxSiblingEnd
  );

  const items: PaginationItem[] = [];

  items.push(...startPages);

  if (siblingStart > boundaryCount + 2) {
    items.push('ellipsis');
  } else if (siblingStart === boundaryCount + 2) {
    items.push(boundaryCount + 1);
  }

  items.push(...createRange(siblingStart, siblingEnd));

  if (siblingEnd < totalPages - boundaryCount - 1) {
    items.push('ellipsis');
  } else if (siblingEnd === totalPages - boundaryCount - 1) {
    items.push(totalPages - boundaryCount);
  }

  items.push(...endPages);

  return items;
};

const defaultLabels: Required<DynPaginationLabels> = {
  first: 'Go to first page',
  previous: 'Go to previous page',
  next: 'Go to next page',
  last: 'Go to last page',
  page: (page: number) => `Go to page ${page}`
};

export const DynPagination: FC<DynPaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
  siblingCount = 1,
  boundaryCount = 1,
  showFirstLast = true,
  showPrevNext = true,
  disabled = false,
  size = 'md',
  labels,
  className,
  'aria-label': ariaLabel,
  ...props
}) => {
  const mergedLabels = { ...defaultLabels, ...labels };

  const paginationRange = useMemo(() => {
    return buildPaginationRange(totalPages, currentPage, siblingCount, boundaryCount);
  }, [totalPages, currentPage, siblingCount, boundaryCount]);

  if (totalPages <= 0) {
    return null;
  }

  const safeCurrent = Math.min(Math.max(currentPage, 1), totalPages);

  const handlePageChange = (page: number) => {
    if (disabled || page === safeCurrent || page < 1 || page > totalPages) {
      return;
    }
    onPageChange(page);
  };

  const paginationClass = styles['dyn-pagination'];
  const sizeClass = styles[`dyn-pagination--size-${size}`];
  const disabledClass = styles['dyn-pagination--disabled'];
  const listClass = styles['dyn-pagination__list'];
  const itemClass = styles['dyn-pagination__item'];
  const ellipsisItemClass = styles['dyn-pagination__item--ellipsis'];
  const ellipsisClass = styles['dyn-pagination__ellipsis'];
  const buttonClass = styles['dyn-pagination__button'];
  const buttonActiveClass = styles['dyn-pagination__button--active'];
  const controlButtonClass = styles['dyn-pagination__button--control'];
  const controlButtonDisabledClass = styles['dyn-pagination__button--disabled'];

  if (
    !paginationClass ||
    !listClass ||
    !itemClass ||
    !ellipsisItemClass ||
    !ellipsisClass ||
    !buttonClass ||
    !buttonActiveClass ||
    !controlButtonClass ||
    !controlButtonDisabledClass
  ) {
    return null;
  }

  if (disabled && !disabledClass) {
    return null;
  }

  const navClassName = clsx(paginationClass, sizeClass, disabled && disabledClass, className);

  const listItems: ReactNode[] = [];

  const addControlButton = (
    key: string,
    label: string,
    targetPage: number,
    isDisabled: boolean,
    icon: ReactNode
  ) => {
    listItems.push(
      <li key={key} className={itemClass}>
        <button
          type="button"
          className={clsx(
            buttonClass,
            controlButtonClass,
            isDisabled && controlButtonDisabledClass
          )}
          onClick={() => handlePageChange(targetPage)}
          disabled={isDisabled}
          aria-label={label}
        >
          {icon}
        </button>
      </li>
    );
  };

  if (showFirstLast) {
    addControlButton('first', mergedLabels.first, 1, disabled || safeCurrent === 1, '«');
  }

  if (showPrevNext) {
    addControlButton(
      'previous',
      mergedLabels.previous,
      safeCurrent - 1,
      disabled || safeCurrent === 1,
      '‹'
    );
  }

  paginationRange.forEach((item, index) => {
    if (item === 'ellipsis') {
      listItems.push(
        <li key={`ellipsis-${index}`} className={clsx(itemClass, ellipsisItemClass)}>
          <span className={ellipsisClass} aria-hidden="true">
            …
          </span>
        </li>
      );
      return;
    }

    const isActive = item === safeCurrent;

    listItems.push(
      <li key={item} className={itemClass}>
        <button
          type="button"
          className={clsx(buttonClass, isActive && buttonActiveClass)}
          onClick={() => handlePageChange(item)}
          aria-current={isActive ? 'page' : undefined}
          aria-label={mergedLabels.page(item)}
          disabled={disabled}
        >
          {item}
        </button>
      </li>
    );
  });

  if (showPrevNext) {
    addControlButton(
      'next',
      mergedLabels.next,
      safeCurrent + 1,
      disabled || safeCurrent === totalPages,
      '›'
    );
  }

  if (showFirstLast) {
    addControlButton(
      'last',
      mergedLabels.last,
      totalPages,
      disabled || safeCurrent === totalPages,
      '»'
    );
  }

  return (
    <nav
      aria-label={ariaLabel ?? 'Pagination navigation'}
      className={navClassName}
      {...props}
    >
      <ul className={listClass}>
        {listItems}
      </ul>
    </nav>
  );
};

DynPagination.displayName = 'DynPagination';
