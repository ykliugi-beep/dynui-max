import React, { forwardRef, useEffect, useMemo, useState } from 'react';
import clsx from 'clsx';
import type { ComponentSize, ThemeName } from '@dynui-max/design-tokens';
import { useTheme } from '../../theme';
import { DynIcon } from '../DynIcon';
import './ThemeSwitcher.css';

export type ThemeMode = 'light' | 'dark' | 'system';

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
   * Allow selecting system preference
   * @default false
   */
  showSystem?: boolean;

  /**
   * Controlled theme mode
   */
  mode?: ThemeMode;

  /**
   * Initial mode when uncontrolled
   */
  defaultMode?: ThemeMode;

  /**
   * Callback when mode changes
   */
  onModeChange?: (mode: ThemeMode) => void;

  /**
   * Disable interactions
   */
  disabled?: boolean;
  
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
    showSystem = false,
    mode,
    defaultMode,
    onModeChange,
    disabled = false,
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

  const getSystemPreference = () => {
    if (typeof window === 'undefined') {
      return 'light' as const;
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  const [systemPreference, setSystemPreference] = useState<'light' | 'dark'>(getSystemPreference);
  const isControlled = mode !== undefined;
  const initialMode: ThemeMode = defaultMode ?? (showSystem ? 'system' : themeName);
  const [internalMode, setInternalMode] = useState<ThemeMode>(initialMode);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const updateSystemPreference = (event: MediaQueryList | MediaQueryListEvent) => {
      const matches = 'matches' in event ? event.matches : (event as MediaQueryList).matches;
      setSystemPreference(matches ? 'dark' : 'light');
    };

    updateSystemPreference(mediaQuery);

    const listener = (event: MediaQueryListEvent) => updateSystemPreference(event);

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', listener);
      return () => mediaQuery.removeEventListener('change', listener);
    }

    mediaQuery.addListener(listener);
    return () => mediaQuery.removeListener(listener);
  }, []);

  useEffect(() => {
    if (!isControlled && defaultMode !== undefined) {
      setInternalMode(defaultMode);
    }
  }, [defaultMode, isControlled]);

  useEffect(() => {
    if (!isControlled && internalMode !== 'system' && themeName !== internalMode) {
      setInternalMode(themeName);
    }
  }, [themeName, internalMode, isControlled]);

  const availableModes = useMemo<ThemeMode[]>(
    () => (showSystem ? ['light', 'dark', 'system'] : ['light', 'dark']),
    [showSystem]
  );

  const currentMode = isControlled ? mode! : internalMode;
  const currentIndex = availableModes.indexOf(currentMode);
  const safeIndex = currentIndex >= 0 ? currentIndex : 0;
  const nextModeLabel = availableModes[(safeIndex + 1) % availableModes.length];
  const effectiveTheme = currentMode === 'system' ? systemPreference : currentMode;

  useEffect(() => {
    if (themeName !== effectiveTheme) {
      setTheme(effectiveTheme);
    }
  }, [effectiveTheme, setTheme, themeName]);

  const handleModeChange = (nextMode: ThemeMode) => {
    if (!isControlled) {
      setInternalMode(nextMode);
    }

    onModeChange?.(nextMode);
  };

  const cycleMode = () => {
    const nextIndex = (safeIndex + 1) % availableModes.length;
    handleModeChange(availableModes[nextIndex]);
  };
  
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

  const currentIcon = effectiveTheme === 'light' ? 'sun' : 'moon';
  const currentLabel = currentMode === 'system'
    ? `System (${systemPreference === 'dark' ? 'dark' : 'light'})`
    : effectiveTheme === 'light'
      ? 'Light'
      : 'Dark';
  const toggleLabel = `Switch to ${nextModeLabel} theme`;
  
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
      <div className={classes} data-testid={dataTestId}>
        <button
          ref={ref}
          type="button"
          className="dyn-theme-switcher__button"
          onClick={cycleMode}
          aria-label={toggleLabel}
          disabled={disabled}
          data-mode={currentMode}
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
      <label className={classes} data-testid={dataTestId} data-mode={currentMode}>
        <input
          type="checkbox"
          className="dyn-theme-switcher__input"
          checked={effectiveTheme === 'dark'}
          onChange={cycleMode}
          aria-label={toggleLabel}
          aria-checked={currentMode === 'system' ? 'mixed' : effectiveTheme === 'dark'}
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
      onClick={cycleMode}
      aria-label={toggleLabel}
      data-testid={dataTestId}
      disabled={disabled}
      data-mode={currentMode}
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