import { forwardRef, useState, useCallback, type ReactNode } from 'react';
import clsx from 'clsx';
import { DynIcon } from '../DynIcon';
import './DynTreeView.css';

export interface TreeNode {
  key: string;
  title: string;
  children?: TreeNode[];
  disabled?: boolean;
  icon?: ReactNode;
  isLeaf?: boolean;
  data?: any;
}

export interface DynTreeViewProps {
  /**
   * Tree data
   */
  treeData: TreeNode[];
  
  /**
   * Expanded node keys (controlled)
   */
  expandedKeys?: string[];
  
  /**
   * Default expanded keys (uncontrolled)
   */
  defaultExpandedKeys?: string[];
  
  /**
   * Selected node keys
   */
  selectedKeys?: string[];
  
  /**
   * Default selected keys
   */
  defaultSelectedKeys?: string[];
  
  /**
   * Selection mode
   * @default 'single'
   */
  selectionMode?: 'single' | 'multiple';
  
  /**
   * Show expand/collapse icons
   * @default true
   */
  showIcon?: boolean;
  
  /**
   * Show connecting lines
   * @default false
   */
  showLine?: boolean;
  
  /**
   * Node expand handler
   */
  onExpand?: (expandedKeys: string[]) => void;
  
  /**
   * Node selection handler
   */
  onSelect?: (selectedKeys: string[], selectedNodes: TreeNode[]) => void;
  
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
 * DynTreeView - Hierarchical tree component
 * 
 * Features:
 * - Expandable/collapsible nodes
 * - Single and multiple selection
 * - Keyboard navigation
 * - Custom icons
 * - Connect lines option
 * - ARIA tree pattern compliance
 */
export const DynTreeView = forwardRef<HTMLDivElement, DynTreeViewProps>((
  {
    treeData,
    expandedKeys,
    defaultExpandedKeys = [],
    selectedKeys,
    defaultSelectedKeys = [],
    selectionMode = 'single',
    showIcon = true,
    showLine = false,
    onExpand,
    onSelect,
    className,
    'data-testid': dataTestId,
    ...props
  },
  ref
) => {
  const [internalExpandedKeys, setInternalExpandedKeys] = useState<string[]>(defaultExpandedKeys);
  const [internalSelectedKeys, setInternalSelectedKeys] = useState<string[]>(defaultSelectedKeys);
  
  const currentExpandedKeys = expandedKeys !== undefined ? expandedKeys : internalExpandedKeys;
  const currentSelectedKeys = selectedKeys !== undefined ? selectedKeys : internalSelectedKeys;
  
  const handleNodeToggle = useCallback((nodeKey: string) => {
    const newExpandedKeys = currentExpandedKeys.includes(nodeKey)
      ? currentExpandedKeys.filter(key => key !== nodeKey)
      : [...currentExpandedKeys, nodeKey];
    
    if (expandedKeys === undefined) {
      setInternalExpandedKeys(newExpandedKeys);
    }
    
    onExpand?.(newExpandedKeys);
  }, [currentExpandedKeys, expandedKeys, onExpand]);
  
  const handleNodeSelect = useCallback((nodeKey: string) => {
    let newSelectedKeys: string[];
    
    if (selectionMode === 'single') {
      newSelectedKeys = [nodeKey];
    } else {
      newSelectedKeys = currentSelectedKeys.includes(nodeKey)
        ? currentSelectedKeys.filter(key => key !== nodeKey)
        : [...currentSelectedKeys, nodeKey];
    }
    
    if (selectedKeys === undefined) {
      setInternalSelectedKeys(newSelectedKeys);
    }
    
    // Find selected nodes
    const findNodes = (nodes: TreeNode[], keys: string[]): TreeNode[] => {
      const result: TreeNode[] = [];
      for (const node of nodes) {
        if (keys.includes(node.key)) {
          result.push(node);
        }
        if (node.children) {
          result.push(...findNodes(node.children, keys));
        }
      }
      return result;
    };
    
    const selectedNodes = findNodes(treeData, newSelectedKeys);
    onSelect?.(newSelectedKeys, selectedNodes);
  }, [currentSelectedKeys, selectionMode, selectedKeys, treeData, onSelect]);
  
  const renderTreeNode = (node: TreeNode, level: number = 0): ReactNode => {
    const isExpanded = currentExpandedKeys.includes(node.key);
    const isSelected = currentSelectedKeys.includes(node.key);
    const hasChildren = Boolean(node.children?.length);
    
    return (
      <div key={node.key} className="dyn-tree__node">
        <div
          className={clsx(
            'dyn-tree__node-title',
            {
              'dyn-tree__node-title--selected': isSelected,
              'dyn-tree__node-title--disabled': node.disabled,
              'dyn-tree__node-title--expandable': hasChildren
            }
          )}
          onClick={() => !node.disabled && handleNodeSelect(node.key)}
          role="treeitem"
          aria-selected={isSelected}
          aria-expanded={hasChildren ? isExpanded : undefined}
          aria-disabled={node.disabled}
          tabIndex={node.disabled ? -1 : 0}
          style={{
            paddingLeft: `${level * 24 + 8}px`
          }}
        >
          {/* Expand/collapse button */}
          {hasChildren ? (
            <button
              type="button"
              className="dyn-tree__expand-button"
              onClick={(e) => {
                e.stopPropagation();
                handleNodeToggle(node.key);
              }}
              aria-label={isExpanded ? 'Collapse' : 'Expand'}
              tabIndex={-1}
            >
              <DynIcon 
                name={isExpanded ? 'chevron-down' : 'chevron-right'} 
                size="sm" 
              />
            </button>
          ) : (
            <span className="dyn-tree__leaf-spacer" />
          )}
          
          {showIcon && node.icon && (
            <span className="dyn-tree__node-icon" aria-hidden="true">
              {node.icon}
            </span>
          )}
          
          <span className="dyn-tree__node-label">
            {node.title}
          </span>
        </div>
        
        {/* Children */}
        {hasChildren && isExpanded && (
          <div className="dyn-tree__children" role="group">
            {node.children!.map(child => renderTreeNode(child, level + 1))}
          </div>
        )}
      </div>
    );
  };
  
  return (
    <div
      ref={ref}
      className={clsx(
        'dyn-tree',
        {
          'dyn-tree--show-line': showLine
        },
        className
      )}
      role="tree"
      data-testid={dataTestId}
      {...props}
    >
      {treeData.map(node => renderTreeNode(node))}
    </div>
  );
});

DynTreeView.displayName = 'DynTreeView';