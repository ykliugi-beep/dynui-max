import React from 'react';

/**
 * Icon component for displaying SVG icons
 * @component
 * @example
 * ```tsx
 * <DynIcon name="check" size="md" />
 * <DynIcon name="close" color="var(--dyn-color-error)" />
 * <DynIcon name="search" aria-label="Search" />
 * ```
 */

export type IconName =
  | 'check'
  | 'close'
  | 'arrow-up'
  | 'arrow-down'
  | 'arrow-left'
  | 'arrow-right'
  | 'chevron-up'
  | 'chevron-down'
  | 'chevron-left'
  | 'chevron-right'
  | 'menu'
  | 'search'
  | 'info'
  | 'warning'
  | 'error'
  | 'success'
  | 'help'
  | 'settings'
  | 'user'
  | 'lock';

export interface DynIconProps {
  /** Icon name from available dictionary */
  name: IconName;
  /** Icon size variant */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** Icon color (CSS color or variable) */
  color?: string;
  /** CSS class */
  className?: string;
  /** Aria label for accessibility */
  'aria-label'?: string;
  /** CSS style */
  style?: React.CSSProperties;
}

const ICON_SIZES = {
  xs: '12px',
  sm: '16px',
  md: '20px',
  lg: '24px',
  xl: '32px',
};

/**
 * SVG icon paths dictionary
 * Each icon is a simple SVG path that can be scaled
 */
const ICON_PATHS: Record<IconName, string> = {
  check: 'M20 6L9 17l-5-5',
  close: 'M18 6L6 18M6 6l12 12',
  'arrow-up': 'M7 14l5-5 5 5M12 19V5',
  'arrow-down': 'M7 10l5 5 5-5M12 5v14',
  'arrow-left': 'M14 7l-5 5 5 5M19 12H5',
  'arrow-right': 'M10 7l5 5-5 5M5 12h14',
  'chevron-up': 'M18 15l-6-6-6 6',
  'chevron-down': 'M6 9l6 6 6-6',
  'chevron-left': 'M15 18l-6-6 6-6',
  'chevron-right': 'M9 18l6-6-6-6',
  menu: 'M3 6h18M3 12h18M3 18h18',
  search: 'M11 4a7 7 0 100 14 7 7 0 000-14zm8 13l4.35 4.35',
  info: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z',
  warning:
    'M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z',
  error:
    'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z',
  success: 'M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z',
  help: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 13.9 13 14.5 13 15.5v1h-2v-1c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.41-1.14-2.5-2.5-2.5s-2.5 1.09-2.5 2.5h-2c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z',
  settings:
    'M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.64l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.22-.07.5.12.64l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.64l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.5-.12-.64l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z',
  user: 'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z',
  lock: 'M18 8h-1V6c0-2.76-2.24-5-5-5s-5 2.24-5 5v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z',
};

const styles = `
  .dyn-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    color: currentColor;
  }
  
  .dyn-icon svg {
    width: 100%;
    height: 100%;
  }
`;

/**
 * DynIcon Component
 * 
 * Renders SVG icons from a built-in dictionary.
 * Supports sizing, coloring, and accessibility attributes.
 */
export const DynIcon = React.forwardRef<SVGSVGElement, DynIconProps>(
  (
    {
      name,
      size = 'md',
      color = 'currentColor',
      className = '',
      style = {},
      'aria-label': ariaLabel,
    },
    ref
  ) => {
    const iconSize = ICON_SIZES[size];
    const iconPath = ICON_PATHS[name] || ICON_PATHS.help;
    const hasLabel = !!ariaLabel;

    return (
      <>
        <style>{styles}</style>
        <svg
          ref={ref}
          className={`dyn-icon dyn-icon--${size} ${className}`}
          width={iconSize}
          height={iconSize}
          viewBox="0 0 24 24"
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-label={ariaLabel}
          role={hasLabel ? 'img' : 'presentation'}
          aria-hidden={!hasLabel}
          style={{
            ...style,
            width: iconSize,
            height: iconSize,
            color,
          }}
        >
          <path d={iconPath} />
        </svg>
      </>
    );
  }
);

DynIcon.displayName = 'DynIcon';
