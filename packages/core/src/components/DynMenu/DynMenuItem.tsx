import React, { forwardRef } from 'react';
import clsx from 'clsx';
import './DynMenuItem.css';

export interface DynMenuItemProps extends Omit<React.HTMLAttributes<HTMLLIElement>, 'role'> {
  children?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  active?: boolean;
  divider?: boolean;
  icon?: React.ReactNode;
  shortcut?: string;
}

export const DynMenuItem = forwardRef<HTMLLIElement, DynMenuItemProps>((
  {
    children,
    onClick,
    disabled = false,
    active = false,
    divider = false,
    icon,
    shortcut,
    className,
    ...props
  },
  ref
) => {
  if (divider) {
    return (
      <li
        ref={ref}
        className={clsx('dyn-menu-item--divider', className)}
        role="separator"
        {...props}
      />
    );
  }

  const classes = clsx(
    'dyn-menu-item',
    {
      'dyn-menu-item--active': active,
      'dyn-menu-item--disabled': disabled
    },
    className
  );

  return (
    <li
      ref={ref}
      className={classes}
      role="menuitem"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled}
      onClick={disabled ? undefined : onClick}
      {...props}
    >
      {icon && <span className="dyn-menu-item__icon" aria-hidden="true">{icon}</span>}
      {children && <span className="dyn-menu-item__label">{children}</span>}
      {shortcut && <span className="dyn-menu-item__shortcut" aria-label={`Keyboard shortcut: ${shortcut}`}>{shortcut}</span>}
    </li>
  );
});

DynMenuItem.displayName = 'DynMenuItem';
