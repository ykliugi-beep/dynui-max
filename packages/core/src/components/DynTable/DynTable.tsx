import React, { forwardRef, useState, useMemo } from 'react';
import clsx from 'clsx';
import { DynIcon } from '../DynIcon';
import './DynTable.css';

export interface TableColumn<T = any> {
  key: string;
  title: string;
  dataIndex?: string;
  render?: (value: any, record: T, index: number) => React.ReactNode;
  sortable?: boolean;
  width?: number | string;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

export interface DynTableProps<T = any> {
  /**
   * Table columns configuration
   */
  columns: TableColumn<T>[];
  
  /**
   * Table data source
   */
  dataSource: T[];
  
  /**
   * Row key extractor
   * @default 'key' or index
   */
  rowKey?: string | ((record: T, index: number) => string);
  
  /**
   * Loading state
   */
  loading?: boolean;
  
  /**
   * Empty state content
   */
  emptyText?: React.ReactNode;
  
  /**
   * Row selection configuration
   */
  rowSelection?: {
    selectedRowKeys?: string[];
    onChange?: (selectedKeys: string[], selectedRows: T[]) => void;
    type?: 'checkbox' | 'radio';
  };
  
  /**
   * Sorting configuration
   */
  sortConfig?: {
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    onChange?: (sortBy: string, sortOrder: 'asc' | 'desc') => void;
  };
  
  /**
   * Row click handler
   */
  onRowClick?: (record: T, index: number) => void;
  
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
 * DynTable - Data table component with sorting and selection
 * 
 * Features:
 * - Column configuration with custom rendering
 * - Row selection (checkbox/radio)
 * - Sorting with visual indicators
 * - Loading and empty states
 * - Responsive design
 * - Keyboard navigation
 */
export const DynTable = forwardRef<HTMLTableElement, DynTableProps>((
  {
    columns,
    dataSource,
    rowKey = 'key',
    loading = false,
    emptyText = 'No data',
    rowSelection,
    sortConfig,
    onRowClick,
    className,
    'data-testid': dataTestId,
    ...props
  },
  ref
) => {
  const [selectedKeys, setSelectedKeys] = useState<string[]>(
    rowSelection?.selectedRowKeys || []
  );
  
  const getRowKey = (record: any, index: number): string => {
    if (typeof rowKey === 'function') {
      return rowKey(record, index);
    }
    return record[rowKey] ?? String(index);
  };
  
  const handleSort = (columnKey: string) => {
    if (!sortConfig?.onChange) return;
    
    const currentOrder = sortConfig.sortBy === columnKey ? sortConfig.sortOrder : undefined;
    const nextOrder = currentOrder === 'asc' ? 'desc' : 'asc';
    
    sortConfig.onChange(columnKey, nextOrder);
  };
  
  const handleRowSelection = (recordKey: string, selected: boolean) => {
    if (!rowSelection?.onChange) return;
    
    let newSelectedKeys: string[];
    
    if (rowSelection.type === 'radio') {
      newSelectedKeys = selected ? [recordKey] : [];
    } else {
      newSelectedKeys = selected
        ? [...selectedKeys, recordKey]
        : selectedKeys.filter(key => key !== recordKey);
    }
    
    setSelectedKeys(newSelectedKeys);
    
    const selectedRecords = dataSource.filter((record, index) => 
      newSelectedKeys.includes(getRowKey(record, index))
    );
    
    rowSelection.onChange(newSelectedKeys, selectedRecords);
  };
  
  const handleSelectAll = (selected: boolean) => {
    if (!rowSelection?.onChange || rowSelection.type === 'radio') return;
    
    const allKeys = dataSource.map((record, index) => getRowKey(record, index));
    const newSelectedKeys = selected ? allKeys : [];
    
    setSelectedKeys(newSelectedKeys);
    
    const selectedRecords = selected ? dataSource : [];
    rowSelection.onChange(newSelectedKeys, selectedRecords);
  };
  
  const isAllSelected = useMemo(() => {
    if (!rowSelection || rowSelection.type === 'radio' || dataSource.length === 0) {
      return false;
    }
    
    const allKeys = dataSource.map((record, index) => getRowKey(record, index));
    return allKeys.every(key => selectedKeys.includes(key));
  }, [selectedKeys, dataSource, rowSelection, getRowKey]);
  
  const isIndeterminate = useMemo(() => {
    if (!rowSelection || rowSelection.type === 'radio') {
      return false;
    }
    return selectedKeys.length > 0 && !isAllSelected;
  }, [selectedKeys, isAllSelected, rowSelection]);
  
  return (
    <div className={clsx('dyn-table-container', className)} data-testid={dataTestId}>
      {loading && (
        <div className="dyn-table__loading">
          <DynIcon name="spinner" size="lg" />
          <span>Loading...</span>
        </div>
      )}
      
      <table ref={ref} className="dyn-table" {...props}>
        <thead className="dyn-table__head">
          <tr>
            {/* Selection column */}
            {rowSelection && (
              <th className="dyn-table__header dyn-table__header--selection">
                {rowSelection.type !== 'radio' && (
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    ref={(input) => {
                      if (input) input.indeterminate = isIndeterminate;
                    }}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    aria-label="Select all rows"
                  />
                )}
              </th>
            )}
            
            {/* Data columns */}
            {columns.map((column) => (
              <th
                key={column.key}
                className={clsx(
                  'dyn-table__header',
                  {
                    'dyn-table__header--sortable': column.sortable,
                    'dyn-table__header--sorted': sortConfig?.sortBy === column.key
                  },
                  column.className
                )}
                style={{
                  width: column.width,
                  textAlign: column.align
                }}
                onClick={column.sortable ? () => handleSort(column.key) : undefined}
              >
                <div className="dyn-table__header-content">
                  <span>{column.title}</span>
                  
                  {column.sortable && (
                    <span className="dyn-table__sort-icon">
                      {sortConfig?.sortBy === column.key ? (
                        <DynIcon 
                          name={sortConfig.sortOrder === 'asc' ? 'chevron-up' : 'chevron-down'} 
                          size="sm" 
                        />
                      ) : (
                        <DynIcon name="chevrons-up-down" size="sm" />
                      )}
                    </span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        
        <tbody className="dyn-table__body">
          {dataSource.length === 0 ? (
            <tr>
              <td 
                className="dyn-table__empty" 
                colSpan={columns.length + (rowSelection ? 1 : 0)}
              >
                {emptyText}
              </td>
            </tr>
          ) : (
            dataSource.map((record, index) => {
              const recordKey = getRowKey(record, index);
              const isSelected = selectedKeys.includes(recordKey);
              
              return (
                <tr
                  key={recordKey}
                  className={clsx(
                    'dyn-table__row',
                    {
                      'dyn-table__row--selected': isSelected,
                      'dyn-table__row--clickable': Boolean(onRowClick)
                    }
                  )}
                  onClick={onRowClick ? () => onRowClick(record, index) : undefined}
                >
                  {/* Selection cell */}
                  {rowSelection && (
                    <td className="dyn-table__cell dyn-table__cell--selection">
                      <input
                        type={rowSelection.type || 'checkbox'}
                        checked={isSelected}
                        onChange={(e) => handleRowSelection(recordKey, e.target.checked)}
                        onClick={(e) => e.stopPropagation()}
                        name={rowSelection.type === 'radio' ? 'table-row-selection' : undefined}
                        aria-label={`Select row ${index + 1}`}
                      />
                    </td>
                  )}
                  
                  {/* Data cells */}
                  {columns.map((column) => {
                    const value = column.dataIndex ? record[column.dataIndex] : record;
                    const content = column.render 
                      ? column.render(value, record, index)
                      : value;
                    
                    return (
                      <td
                        key={column.key}
                        className={clsx('dyn-table__cell', column.className)}
                        style={{ textAlign: column.align }}
                      >
                        {content}
                      </td>
                    );
                  })}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
});

DynTable.displayName = 'DynTable';