import { forwardRef, useState, type KeyboardEvent as ReactKeyboardEvent, type ReactNode } from 'react';
import clsx from 'clsx';
import { DynIcon } from '../DynIcon';
import './DynTreeNode.css';

export interface DynTreeNodeProps {
  /**
   * Node title
   */
  title: string;
  
  /**
   * Node key/identifier
   */
  nodeKey: string;
  
  /**
   * Child nodes
   */
  children?: ReactNode;
  
  /**
   * Expanded state (controlled)
   */
  expanded?: boolean;
  
  /**
   * Default expanded state
   */
  defaultExpanded?: boolean;
  
  /**
   * Selected state
   */
  selected?: boolean;
  
  /**
   * Disabled state
   */
  disabled?: boolean;
  
  /**
   * Node icon
   */
  icon?: ReactNode;
  
  /**
   * Is leaf node (no expand/collapse)
   */
  isLeaf?: boolean;
  
  /**
   * Nesting level
   */
  level?: number;
  
  /**
   * Expand/collapse handler
   */
  onExpand?: (nodeKey: string, expanded: boolean) => void;
  
  /**
   * Selection handler
   */
  onSelect?: (nodeKey: string) => void;
  
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
 * DynTreeNode - Individual tree node component
 * 
 * Features:
 * - Expandable/collapsible with children
 * - Selection state
 * - Custom icons
 * - Nesting level indication
 * - Keyboard navigation support
 */
export const DynTreeNode = forwardRef<HTMLDivElement, DynTreeNodeProps>((
  {
    title,
    nodeKey,
    children,
    expanded,
    defaultExpanded = false,
    selected = false,
    disabled = false,
    icon,
    isLeaf = false,
    level = 0,
    onExpand,
    onSelect,
    className,
    'data-testid': dataTestId,
    ...props
  },
  ref
) => {
  const [internalExpanded, setInternalExpanded] = useState(defaultExpanded);
  
  const isExpanded = expanded !== undefined ? expanded : internalExpanded;
  const hasChildren = Boolean(children);
  const canExpand = hasChildren && !isLeaf;
  
  const handleToggle = () => {
    if (!canExpand || disabled) return;
    
    const newExpanded = !isExpanded;
    
    if (expanded === undefined) {
      setInternalExpanded(newExpanded);
    }
    
    onExpand?.(nodeKey, newExpanded);
  };
  
  const handleSelect = () => {
    if (!disabled) {
      onSelect?.(nodeKey);
    }
  };
  
  const handleKeyDown = (event: ReactKeyboardEvent) => {
    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        if (event.shiftKey && canExpand) {
          handleToggle();
        } else {
          handleSelect();
        }
        break;
        
      case 'ArrowRight':
        if (canExpand && !isExpanded) {
          event.preventDefault();
          handleToggle();
        }
        break;
        
      case 'ArrowLeft':
        if (canExpand && isExpanded) {
          event.preventDefault();
          handleToggle();
        }
        break;
    }
  };
  
  const nodeClasses = clsx(
    'dyn-tree-node',
    {
      'dyn-tree-node--selected': selected,
      'dyn-tree-node--disabled': disabled,
      'dyn-tree-node--expandable': canExpand,
      'dyn-tree-node--expanded': isExpanded,
      'dyn-tree-node--leaf': isLeaf
    },
    className
  );
  
  return (
    <div
      ref={ref}
      className={nodeClasses}
      role="treeitem"
      aria-expanded={canExpand ? isExpanded : undefined}
      aria-selected={selected}
      aria-disabled={disabled}
      data-testid={dataTestId}
      {...props}
    >
      <div
        className="dyn-tree-node__content"
        style={{
          paddingLeft: `${level * 20 + 8}px`
        }}
      >
        {/* Expand/collapse button */}
        {canExpand ? (
          <button
            type="button"
            className="dyn-tree-node__expand"
            onClick={handleToggle}
            aria-label={isExpanded ? 'Collapse' : 'Expand'}
            disabled={disabled}
          >
            <DynIcon 
              name={isExpanded ? 'chevron-down' : 'chevron-right'} 
              size="sm" 
            />
          </button>
        ) : (
          <span className="dyn-tree-node__spacer" />
        )}
        
        {/* Node title */}
        <div
          className="dyn-tree-node__title"
          onClick={handleSelect}
          onKeyDown={handleKeyDown}
          tabIndex={disabled ? -1 : 0}
        >
          {icon && (
            <span className="dyn-tree-node__icon" aria-hidden="true">
              {icon}
            </span>
          )}
          
          <span className="dyn-tree-node__label">
            {title}
          </span>
        </div>
      </div>
      
      {/* Children */}
      {canExpand && isExpanded && (
        <div 
          className="dyn-tree-node__children"
          role="group"
        >
          {children}
        </div>
      )}
    </div>
  );
});

DynTreeNode.displayName = 'DynTreeNode';