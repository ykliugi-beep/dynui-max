import {
  forwardRef,
  useState,
  useCallback,
  useRef,
  useMemo,
  useImperativeHandle,
  type ReactNode
} from 'react';
import clsx from 'clsx';
import './DynTabs.css';

export interface TabItem {
  value: string;
  label: string;
  disabled?: boolean;
  className?: string;
  panel?: ReactNode;
}

export interface DynTabsProps {
  /**
   * Current active tab value (controlled)
   */
  value?: string;
  
  /**
   * Default active tab value (uncontrolled)
   */
  defaultValue?: string;
  
  /**
   * Change handler
   */
  onChange?: (value: string) => void;
  
  /**
   * Tab orientation
   * @default 'horizontal'
   */
  orientation?: 'horizontal' | 'vertical';
  
  /**
   * Tab activation mode
   * @default 'auto'
   */
  activation?: 'auto' | 'manual';
  
  /**
   * Tab items data
   */
  items: TabItem[];
  
  /**
   * Additional CSS class names
   */
  className?: string;
  
  /**
   * ARIA attributes
   */
  'aria-label'?: string;
  'aria-labelledby'?: string;
  
  /**
   * Test identifier
   */
  'data-testid'?: string;
}

export interface DynTabsRef {
  focusTab: (value: string) => void;
  focusFirstTab: () => void;
  focusLastTab: () => void;
  focusNextTab: () => void;
  focusPreviousTab: () => void;
}

/**
 * DynTabs - Accessible tab navigation component
 * 
 * Features:
 * - Keyboard navigation (Arrow keys, Home, End)
 * - Automatic or manual activation modes
 * - Horizontal and vertical orientations
 * - ARIA tabs pattern compliance
 * - Controlled/uncontrolled state management
 * - Focus management and restoration
 */
export const DynTabs = forwardRef<DynTabsRef, DynTabsProps>((
  {
    value,
    defaultValue,
    onChange,
    orientation = 'horizontal',
    activation = 'auto',
    items,
    className,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledby,
    'data-testid': dataTestId,
    ...props
  },
  ref
) => {
  const [internalValue, setInternalValue] = useState(() => {
    const firstEnabledItem = items.find(item => !item.disabled);
    return defaultValue || firstEnabledItem?.value || '';
  });
  
  const [focusedIndex, setFocusedIndex] = useState(0);
  const tablistRef = useRef<HTMLDivElement>(null);
  
  const currentValue = value !== undefined ? value : internalValue;
  const enabledItems = useMemo(() => items.filter(item => !item.disabled), [items]);
  
  const handleTabChange = useCallback((newValue: string) => {
    if (value === undefined) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
  }, [value, onChange]);
  
  const handleTabClick = useCallback((tabValue: string) => {
    handleTabChange(tabValue);
    const index = items.findIndex(item => item.value === tabValue);
    if (index >= 0) {
      setFocusedIndex(index);
    }
  }, [handleTabChange, items]);
  
  const handleTabFocus = useCallback((tabValue: string, index: number) => {
    setFocusedIndex(index);
    if (activation === 'auto') {
      handleTabChange(tabValue);
    }
  }, [activation, handleTabChange]);
  
  // Keyboard navigation
  const focusTab = useCallback((index: number) => {
    const tabs = tablistRef.current?.querySelectorAll('[role="tab"]:not([aria-disabled="true"])') as NodeListOf<HTMLElement>;
    if (tabs && tabs[index]) {
      tabs[index].focus();
    }
  }, []);
  
  const focusTabByValue = useCallback((tabValue: string) => {
    const index = enabledItems.findIndex(item => item.value === tabValue);
    if (index >= 0) {
      focusTab(index);
    }
  }, [enabledItems, focusTab]);
  
  const focusFirstTab = useCallback(() => {
    focusTab(0);
  }, [focusTab]);
  
  const focusLastTab = useCallback(() => {
    focusTab(enabledItems.length - 1);
  }, [focusTab, enabledItems.length]);
  
  const focusNextTab = useCallback(() => {
    const currentIndex = enabledItems.findIndex(item => item.value === currentValue);
    const nextIndex = currentIndex < enabledItems.length - 1 ? currentIndex + 1 : 0;
    focusTab(nextIndex);
  }, [enabledItems, currentValue, focusTab]);
  
  const focusPreviousTab = useCallback(() => {
    const currentIndex = enabledItems.findIndex(item => item.value === currentValue);
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : enabledItems.length - 1;
    focusTab(prevIndex);
  }, [enabledItems, currentValue, focusTab]);
  
  // Expose ref methods
  useImperativeHandle(ref, () => ({
    focusTab: focusTabByValue,
    focusFirstTab,
    focusLastTab,
    focusNextTab,
    focusPreviousTab
  }), [focusTabByValue, focusFirstTab, focusLastTab, focusNextTab, focusPreviousTab]);
  
  const containerClasses = clsx(
    'dyn-tabs',
    `dyn-tabs--${orientation}`,
    className
  );
  
  return (
    <div className={containerClasses} data-testid={dataTestId} {...props}>
      {/* Tab List */}
      <div
        ref={tablistRef}
        className="dyn-tabs__list"
        role="tablist"
        aria-orientation={orientation}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledby}
      >
        {items.map((item, index) => {
          const isActive = item.value === currentValue;
          const isFocused = index === focusedIndex;
          
          return (
            <button
              key={item.value}
              type="button"
              role="tab"
              id={`tab-${item.value}`}
              className={clsx(
                'dyn-tabs__tab',
                {
                  'dyn-tabs__tab--active': isActive,
                  'dyn-tabs__tab--disabled': item.disabled,
                  'dyn-tabs__tab--focused': isFocused
                },
                item.className
              )}
              aria-selected={isActive}
              aria-controls={`panel-${item.value}`}
              aria-disabled={item.disabled}
              tabIndex={isActive ? 0 : -1}
              disabled={item.disabled}
              onClick={() => !item.disabled && handleTabClick(item.value)}
              onFocus={() => !item.disabled && handleTabFocus(item.value, index)}
              onKeyDown={(e) => {
                switch (e.key) {
                  case 'ArrowRight':
                  case 'ArrowDown':
                    e.preventDefault();
                    focusNextTab();
                    break;
                  case 'ArrowLeft':
                  case 'ArrowUp':
                    e.preventDefault();
                    focusPreviousTab();
                    break;
                  case 'Home':
                    e.preventDefault();
                    focusFirstTab();
                    break;
                  case 'End':
                    e.preventDefault();
                    focusLastTab();
                    break;
                  case 'Enter':
                  case ' ':
                    if (activation === 'manual') {
                      e.preventDefault();
                      handleTabChange(item.value);
                    }
                    break;
                }
              }}
            >
              {item.label}
            </button>
          );
        })}
      </div>
      
      {/* Tab Panels */}
      <div className="dyn-tabs__content">
        {items.map((item) => {
          const isActive = item.value === currentValue;
          
          return (
            <div
              key={`panel-${item.value}`}
              id={`panel-${item.value}`}
              className={clsx(
                'dyn-tabs__panel',
                { 'dyn-tabs__panel--active': isActive },
                item.className
              )}
              role="tabpanel"
              aria-labelledby={`tab-${item.value}`}
              hidden={!isActive}
              tabIndex={0}
            >
              {item.panel}
            </div>
          );
        })}
      </div>
    </div>
  );
});

DynTabs.displayName = 'DynTabs';