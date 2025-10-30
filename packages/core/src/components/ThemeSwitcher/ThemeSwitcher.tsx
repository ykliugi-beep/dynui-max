import React, { forwardRef } from 'react';
import clsx from 'clsx';
import type { ComponentSize } from '@dynui-max/design-tokens';
import { useTheme } from '../../theme';
import { DynIcon } from '../DynIcon';
import './ThemeSwitcher.css';

export interface ThemeSwitcherProps {
  /**
   * Switcher size
   * @default 'md'
   */
  size?: ComponentSize;
  
  /**
   * Show theme labels
   * @default false
   */
  showLabels?: boolean;
  
  /**
   * Variant style
   * @default 'button'
   */
  variant?: 'button' | 'toggle' | 'dropdown';
  
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
 * ThemeSwitcher - Theme toggle component
 * 
 * Features:
 * - Light/dark theme switching
 * - Multiple visual variants
 * - Size variants using design tokens
 * - Keyboard navigation
 * - Theme context integration
 */
export const ThemeSwitcher = forwardRef<HTMLButtonElement, ThemeSwitcherProps>((
  {
    size = 'md',
    showLabels = false,
    variant = 'button',
    className,
    'data-testid': dataTestId,
    ...props
  },
  ref
) => {
  const { theme, setTheme } = useTheme();
  
  const handleToggle = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
  };
  
  const classes = clsx(
    'dyn-theme-switcher',
    `dyn-theme-switcher--${variant}`,
    `dyn-theme-switcher--size-${size}`,
    {
      'dyn-theme-switcher--with-labels': showLabels
    },
    className
  );
  
  const currentIcon = theme === 'light' ? 'sun' : 'moon';
  const currentLabel = theme === 'light' ? 'Light' : 'Dark';
  const toggleLabel = `Switch to ${theme === 'light' ? 'dark' : 'light'} theme`;
  
  if (variant === 'dropdown') {
    // TODO: Implement dropdown variant with DynSelect
    return (
      <div className={classes} data-testid={dataTestId}>
        <button
          ref={ref}
          type="button"
          className="dyn-theme-switcher__button"
          onClick={handleToggle}
          aria-label={toggleLabel}
          {...props}
        >
          <DynIcon name={currentIcon} size={size} />
          {showLabels && (
            <span className="dyn-theme-switcher__label">{currentLabel}</span>
          )}
        </button>
      </div>
    );
  }
  
  if (variant === 'toggle') {
    return (
      <label className={classes} data-testid={dataTestId}>
        <input
          type="checkbox"
          className="dyn-theme-switcher__input"
          checked={theme === 'dark'}
          onChange={handleToggle}
          aria-label={toggleLabel}
        />
        
        <span className="dyn-theme-switcher__track">
          <span className="dyn-theme-switcher__thumb">
            <DynIcon name={currentIcon} size="sm" />
          </span>
        </span>
        
        {showLabels && (
          <span className="dyn-theme-switcher__label">{currentLabel}</span>
        )}
      </label>
    );
  }
  
  // Default: button variant
  return (
    <button
      ref={ref}
      type="button"
      className={classes}
      onClick={handleToggle}
      aria-label={toggleLabel}
      data-testid={dataTestId}
      {...props}
    >
      <DynIcon name={currentIcon} size={size} />
      
      {showLabels && (
        <span className="dyn-theme-switcher__label">{currentLabel}</span>
      )}
    </button>
  );
});

ThemeSwitcher.displayName = 'ThemeSwitcher';