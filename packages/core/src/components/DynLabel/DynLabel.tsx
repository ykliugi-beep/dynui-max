import { forwardRef, type ReactNode } from 'react';
import clsx from 'clsx';
import type { ComponentSize } from '@dynui-max/design-tokens';
import './DynLabel.css';

export interface DynLabelProps {
  /**
   * Label size using design tokens
   * @default 'md'
   */
  size?: ComponentSize;
  
  /**
   * Label text
   */
  children: ReactNode;
  
  /**
   * Associated form control ID
   */
  htmlFor?: string;
  
  /**
   * Required field indicator
   */
  required?: boolean;
  
  /**
   * Disabled state
   */
  disabled?: boolean;
  
  /**
   * Weight variant
   * @default 'medium'
   */
  weight?: 'normal' | 'medium' | 'semibold';
  
  /**
   * Additional CSS class names
   */
  className?: string;
}

/**
 * DynLabel - Form label component with design tokens
 * 
 * Features:
 * - Size variants using typography tokens
 * - Weight variants
 * - Required field indicator
 * - Disabled state styling
 * - Proper form association
 */
export const DynLabel = forwardRef<HTMLLabelElement, DynLabelProps>((
  {
    size = 'md',
    children,
    htmlFor,
    required = false,
    disabled = false,
    weight = 'medium',
    className,
    ...props
  },
  ref
) => {
  const classes = clsx(
    'dyn-label',
    `dyn-label--size-${size}`,
    `dyn-label--weight-${weight}`,
    {
      'dyn-label--required': required,
      'dyn-label--disabled': disabled
    },
    className
  );
  
  return (
    <label
      ref={ref}
      className={classes}
      htmlFor={htmlFor}
      {...props}
    >
      {children}
      
      {required && (
        <span className="dyn-label__required" aria-label="Required field">
          *
        </span>
      )}
    </label>
  );
});

DynLabel.displayName = 'DynLabel';