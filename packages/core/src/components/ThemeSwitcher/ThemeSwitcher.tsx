import React, { forwardRef, useCallback, useEffect, useMemo, useState } from 'react';
import clsx from 'clsx';
import type { ComponentSize, ThemeName } from '@dynui-max/design-tokens';
import { useTheme } from '../../theme';
import { DynIcon } from '../DynIcon';
import './ThemeSwitcher.css';

export type ThemeMode = ThemeName | 'system';

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

  /**
   * Current theme mode. When provided, the component operates in controlled mode.
   */
  mode?: ThemeMode;

  /**
   * Callback fired when theme mode changes.
   */
  onChange?: (mode: ThemeMode) => void;

  /**
   * Show the system preference option.
   * @default false
   */
  showSystem?: boolean;

  /**
   * Disable user interaction.
   * @default false
   */
  disabled?: boolean;
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
    mode,
    onChange,
    showSystem = false,
    disabled = false,
    ...props
  },
  ref
) => {
  const { themeName, setTheme } = useTheme();
  const [internalMode, setInternalMode] = useState<ThemeMode>(mode ?? themeName);
  const isControlled = mode !== undefined;

  const getSystemTheme = useCallback((): ThemeName => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return 'light';
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }, []);

  const [systemTheme, setSystemTheme] = useState<ThemeName>(() => getSystemTheme());

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return;
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const updateSystemTheme = (event: MediaQueryList | MediaQueryListEvent) => {
      setSystemTheme(event.matches ? 'dark' : 'light');
    };

    updateSystemTheme(mediaQuery);

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', updateSystemTheme);
      return () => mediaQuery.removeEventListener('change', updateSystemTheme);
    }

    mediaQuery.addListener(updateSystemTheme);
    return () => mediaQuery.removeListener(updateSystemTheme);
  }, [getSystemTheme]);

  useEffect(() => {
    if (!isControlled) {
      setInternalMode((current) => (current === 'system' ? current : themeName));
    }
  }, [themeName, isControlled]);

  const resolvedMode: ThemeMode = useMemo(() => {
    if (mode) {
      return mode;
    }

    return internalMode ?? themeName;
  }, [internalMode, mode, themeName]);

  const options = useMemo<ThemeMode[]>(() => {
    return showSystem ? ['system', 'light', 'dark'] : ['light', 'dark'];
  }, [showSystem]);

  const currentTheme: ThemeName = resolvedMode === 'system' ? systemTheme : (resolvedMode as ThemeName);

  useEffect(() => {
    if (!isControlled && resolvedMode === 'system') {
      setTheme(systemTheme);
    }
  }, [isControlled, resolvedMode, setTheme, systemTheme]);

  const handleModeChange = useCallback(
    (nextMode: ThemeMode) => {
      if (disabled) {
        return;
      }

      if (!isControlled) {
        setInternalMode(nextMode);

        if (nextMode === 'system') {
          setTheme(getSystemTheme());
        } else {
          setTheme(nextMode);
        }
      }

      onChange?.(nextMode);
    },
    [disabled, getSystemTheme, isControlled, onChange, setTheme]
  );

  const cycleMode = useCallback(
    (direction: 1 | -1 = 1) => {
      const currentIndex = options.indexOf(resolvedMode);
      const safeIndex = currentIndex >= 0 ? currentIndex : 0;
      const nextIndex = (safeIndex + direction + options.length) % options.length;
      handleModeChange(options[nextIndex]);
    },
    [handleModeChange, options, resolvedMode]
  );

  const nextModeLabel = useMemo(() => {
    const currentIndex = options.indexOf(resolvedMode);
    const safeIndex = currentIndex >= 0 ? currentIndex : 0;
    const nextIndex = (safeIndex + 1) % options.length;
    return options[nextIndex];
  }, [options, resolvedMode]);

  const classes = clsx(
    'dyn-theme-switcher',
    `dyn-theme-switcher--${variant}`,
    `dyn-theme-switcher--size-${size}`,
    {
      'dyn-theme-switcher--with-labels': showLabels,
      'dyn-theme-switcher--disabled': disabled
    },
    className
  );

  const iconForMode = (modeValue: ThemeMode) => {
    const theme = modeValue === 'system' ? systemTheme : modeValue;
    return theme === 'dark' ? 'moon' : 'sun';
  };

  const labelForMode = (modeValue: ThemeMode) => {
    if (modeValue === 'system') {
      return `System (${systemTheme})`;
    }

    return modeValue === 'dark' ? 'Dark' : 'Light';
  };

  const currentIcon = iconForMode(resolvedMode);
  const currentLabel = labelForMode(resolvedMode);
  const toggleLabel = `Switch to ${labelForMode(nextModeLabel)} theme`;

  const handleToggle = () => {
    cycleMode(1);
  };

  if (variant === 'dropdown') {
    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (disabled) {
        return;
      }

      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
        event.preventDefault();
        cycleMode(1);
      }

      if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
        event.preventDefault();
        cycleMode(-1);
      }
    };

    return (
      <div
        className={classes}
        role="radiogroup"
        aria-label="Theme mode"
        aria-disabled={disabled}
        data-testid={dataTestId}
        onKeyDown={handleKeyDown}
      >
        <div className="dyn-theme-switcher__options">
          {options.map((option, index) => {
            const isActive = option === resolvedMode;
            const optionLabel = labelForMode(option);

            return (
              <button
                key={option}
                ref={index === 0 ? ref : undefined}
                type="button"
                role="radio"
                aria-checked={isActive}
                aria-label={`${optionLabel} theme`}
                tabIndex={isActive ? 0 : -1}
                className={clsx(
                  'dyn-theme-switcher__option',
                  `dyn-theme-switcher__option--size-${size}`,
                  {
                    'dyn-theme-switcher__option--active': isActive,
                    'dyn-theme-switcher__option--with-labels': showLabels
                  }
                )}
                onClick={() => handleModeChange(option)}
                disabled={disabled}
                {...(index === 0 ? props : {})}
              >
                <DynIcon name={iconForMode(option)} size={size} />
                {showLabels && (
                  <span className="dyn-theme-switcher__option-label">{optionLabel}</span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  if (variant === 'toggle') {
    return (
      <label className={classes} data-testid={dataTestId}>
        <input
          type="checkbox"
          className="dyn-theme-switcher__input"
          checked={currentTheme === 'dark'}
          onChange={handleToggle}
          aria-label={toggleLabel}
          disabled={disabled}
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
      disabled={disabled}
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