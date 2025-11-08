import React, { forwardRef } from 'react';
import clsx from 'clsx';
import './DynDivider.css';

export interface DynDividerProps {
  orientation?: 'horizontal' | 'vertical';
  thickness?: 'thin' | 'medium' | 'thick';
  color?: 'default' | 'light' | 'dark';
  spacing?: 'none' | 'sm' | 'md' | 'lg';
  label?: React.ReactNode;
  labelPosition?: 'left' | 'center' | 'right';
  className?: string;
}

export const DynDivider = forwardRef<HTMLHRElement, DynDividerProps>((
  {
    orientation = 'horizontal',
    thickness = 'thin',
    color = 'default',
    spacing = 'md',
    label,
    labelPosition = 'center',
    className,
    ...props
  },
  ref
) => {
  const classes = clsx(
    'dyn-divider',
    `dyn-divider--${orientation}`,
    `dyn-divider--thickness-${thickness}`,
    `dyn-divider--color-${color}`,
    `dyn-divider--spacing-${spacing}`,
    {
      'dyn-divider--with-label': label,
      [`dyn-divider--label-${labelPosition}`]: label
    },
    className
  );

  if (label) {
    return (
      <div className={classes} role="separator" aria-orientation={orientation}>
        <hr ref={ref} className="dyn-divider__line" {...props} />
        <span className="dyn-divider__label">{label}</span>
        <hr className="dyn-divider__line" />
      </div>
    );
  }

  return (
    <hr
      ref={ref}
      className={classes}
      role="separator"
      aria-orientation={orientation}
      {...props}
    />
  );
});

DynDivider.displayName = 'DynDivider';