import { forwardRef } from 'react';
import clsx from 'clsx';
import './DynDivider.css';

export interface DynDividerProps {
  /**
   * Divider orientation
   * @default 'horizontal'
   */
  orientation?: 'horizontal' | 'vertical';
  
  /**
   * Visual variant
   * @default 'solid'
   */
  variant?: 'solid' | 'dashed' | 'dotted';
  
  /**
   * Optional label text
   */
  label?: string;
  
  /**
   * Label position for horizontal dividers
   * @default 'center'
   */
  labelPosition?: 'left' | 'center' | 'right';
  
  /**
   * Additional CSS class names
   */
  className?: string;
  
  /**
   * Custom spacing
   */
  spacing?: 'sm' | 'md' | 'lg';
}

/**
 * DynDivider - Visual separator component
 * 
 * Features:
 * - Horizontal and vertical orientations
 * - Multiple visual styles (solid, dashed, dotted)
 * - Optional label with positioning
 * - Spacing variants using design tokens
 */
export const DynDivider = forwardRef<HTMLDivElement, DynDividerProps>((
  {
    orientation = 'horizontal',
    variant = 'solid',
    label,
    labelPosition = 'center',
    className,
    spacing = 'md',
    ...props
  },
  ref
) => {
  const classes = clsx(
    'dyn-divider',
    `dyn-divider--${orientation}`,
    `dyn-divider--${variant}`,
    `dyn-divider--spacing-${spacing}`,
    {
      'dyn-divider--with-label': Boolean(label)
    },
    className
  );
  
  if (label && orientation === 'horizontal') {
    return (
      <div ref={ref} className={classes} {...props}>
        <div className="dyn-divider__line" />
        <div 
          className={clsx(
            'dyn-divider__label',
            `dyn-divider__label--${labelPosition}`
          )}
        >
          {label}
        </div>
        <div className="dyn-divider__line" />
      </div>
    );
  }
  
  return (
    <div 
      ref={ref} 
      className={classes} 
      role="separator"
      aria-orientation={orientation}
      {...props}
    >
      {label && orientation === 'vertical' && (
        <span className="dyn-divider__label">{label}</span>
      )}
    </div>
  );
});

DynDivider.displayName = 'DynDivider';