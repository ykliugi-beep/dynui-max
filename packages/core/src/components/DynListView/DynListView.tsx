import React, { forwardRef } from 'react';
import clsx from 'clsx';
import './DynListView.css';

export interface ListItem {
  key: string;
  title: string;
  description?: string;
  avatar?: React.ReactNode;
  actions?: React.ReactNode;
  disabled?: boolean;
  data?: any;
}

export interface DynListViewProps {
  /**
   * List items
   */
  items: ListItem[];
  
  /**
   * Item selection handler
   */
  onItemClick?: (item: ListItem, index: number) => void;
  
  /**
   * Selected item keys
   */
  selectedKeys?: string[];
  
  /**
   * Selection change handler
   */
  onSelectionChange?: (selectedKeys: string[], selectedItems: ListItem[]) => void;
  
  /**
   * Selection mode
   * @default 'none'
   */
  selectionMode?: 'none' | 'single' | 'multiple';
  
  /**
   * Loading state
   */
  loading?: boolean;
  
  /**
   * Empty state content
   */
  emptyText?: React.ReactNode;
  
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
 * DynListView - Flexible list component for displaying items
 * 
 * Features:
 * - Avatar, title, description, actions layout
 * - Single and multiple selection modes
 * - Loading and empty states
 * - Keyboard navigation
 * - Responsive design
 */
export const DynListView = forwardRef<HTMLDivElement, DynListViewProps>((
  {
    items,
    onItemClick,
    selectedKeys = [],
    onSelectionChange,
    selectionMode = 'none',
    loading = false,
    emptyText = 'No items',
    className,
    'data-testid': dataTestId,
    ...props
  },
  ref
) => {
  const handleItemClick = useCallback((item: ListItem, index: number) => {
    // Handle selection if enabled
    if (selectionMode !== 'none' && onSelectionChange) {
      let newSelectedKeys: string[];
      
      if (selectionMode === 'single') {
        newSelectedKeys = [item.key];
      } else {
        newSelectedKeys = selectedKeys.includes(item.key)
          ? selectedKeys.filter(key => key !== item.key)
          : [...selectedKeys, item.key];
      }
      
      const selectedItems = items.filter(i => newSelectedKeys.includes(i.key));
      onSelectionChange(newSelectedKeys, selectedItems);
    }
    
    // Call item click handler
    onItemClick?.(item, index);
  }, [selectionMode, selectedKeys, items, onSelectionChange, onItemClick]);
  
  if (loading) {
    return (
      <div className={clsx('dyn-listview', 'dyn-listview--loading', className)}>
        <div className="dyn-listview__loading">
          Loading...
        </div>
      </div>
    );
  }
  
  if (items.length === 0) {
    return (
      <div className={clsx('dyn-listview', 'dyn-listview--empty', className)}>
        <div className="dyn-listview__empty">
          {emptyText}
        </div>
      </div>
    );
  }
  
  return (
    <div
      ref={ref}
      className={clsx('dyn-listview', className)}
      data-testid={dataTestId}
      {...props}
    >
      <div className="dyn-listview__container">
        {items.map((item, index) => {
          const isSelected = selectedKeys.includes(item.key);
          
          return (
            <div
              key={item.key}
              className={clsx(
                'dyn-listview__item',
                {
                  'dyn-listview__item--selected': isSelected,
                  'dyn-listview__item--disabled': item.disabled,
                  'dyn-listview__item--clickable': Boolean(onItemClick) || selectionMode !== 'none'
                }
              )}
              onClick={!item.disabled ? () => handleItemClick(item, index) : undefined}
              role={selectionMode !== 'none' ? 'option' : undefined}
              aria-selected={selectionMode !== 'none' ? isSelected : undefined}
              aria-disabled={item.disabled}
              tabIndex={item.disabled ? -1 : 0}
            >
              {/* Avatar */}
              {item.avatar && (
                <div className="dyn-listview__avatar">
                  {item.avatar}
                </div>
              )}
              
              {/* Content */}
              <div className="dyn-listview__content">
                <div className="dyn-listview__title">
                  {item.title}
                </div>
                
                {item.description && (
                  <div className="dyn-listview__description">
                    {item.description}
                  </div>
                )}
              </div>
              
              {/* Actions */}
              {item.actions && (
                <div className="dyn-listview__actions" onClick={(e) => e.stopPropagation()}>
                  {item.actions}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
});

DynListView.displayName = 'DynListView';