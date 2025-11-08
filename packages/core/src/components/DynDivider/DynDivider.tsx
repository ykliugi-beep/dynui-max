import { forwardRef } from 'react';
import clsx from 'clsx';
import type { ComponentSize } from '@dynui-max/design-tokens';
import './DynDivider.css';

export interface DynDividerProps extends React.HTMLAttributes<HTMLHRElement> {
  orientation?: 'horizontal' | 'vertical';
  thickness?: ComponentSize;
  spacing?: ComponentSize;
  variant?: 'solid' | 'dashed' | 'dotted';
  label?: React.ReactNode;
  labelPosition?: 'start' | 'center' | 'end';
}

export const DynDivider = forwardRef<HTMLHRElement, DynDividerProps>((
  {
    orientation = 'horizontal',
    thickness = 'sm',
    spacing = 'md',
    variant = 'solid',
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
    `dyn-divider--spacing-${spacing}`,
    `dyn-divider--variant-${variant}`,
    {
      'dyn-divider--with-label': label,
      [`dyn-divider--label-${labelPosition}`]: label
    },
    className
  );

  if (label) {
    return (
      <div className={classes} role="separator">
        <hr ref={ref} className="dyn-divider__line" {...props} />
        <span className="dyn-divider__label">{label}</span>
        <hr className="dyn-divider__line" />
      </div>
    );
  }

  return <hr ref={ref} className={classes} {...props} />;
});

DynDivider.displayName = 'DynDivider';
