import { forwardRef } from 'react';
import clsx from 'clsx';
import './DynSelectOption.css';

export interface DynSelectOptionProps extends React.OptionHTMLAttributes<HTMLOptionElement> {
  children: React.ReactNode;
}

export const DynSelectOption = forwardRef<HTMLOptionElement, DynSelectOptionProps>((
  { children, className, ...props },
  ref
) => {
  const classes = clsx('dyn-select-option', className);
  
  return (
    <option ref={ref} className={classes} {...props}>
      {children}
    </option>
  );
});

DynSelectOption.displayName = 'DynSelectOption';
