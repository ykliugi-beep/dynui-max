import {
  Children,
  forwardRef,
  type KeyboardEvent as ReactKeyboardEvent,
  type ReactNode,
  type Ref
} from 'react';
import clsx from 'clsx';
import './DynMenuItem.css';

export interface DynMenuItemProps {
  /**
   * Item content
   */
  children?: ReactNode;
  
  /**
   * Item value/identifier
   */
  value?: string;
  
  /**
   * Click handler
   */
  onClick?: (value?: string) => void;
  
  /**
   * Disabled state
   */
  disabled?: boolean;
  
  /**
   * Selected state
   */
  selected?: boolean;
  
  /**
   * Item icon
   */
  icon?: ReactNode;
  
  /**
   * Item description
   */
  description?: string;
  
  /**
   * Keyboard shortcut display
   */
  shortcut?: string;
  
  /**
   * Render as divider
   */
  divider?: boolean;
  
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
 * DynMenuItem - Individual menu item component
 * 
 * Features:
 * - Icon and description support
 * - Keyboard shortcut display
 * - Selection state
 * - Divider variant
 * - Disabled state
 */
export const DynMenuItem = forwardRef<HTMLButtonElement | HTMLDivElement, DynMenuItemProps>((props, ref) => {
  const {
    children,
    value,
    onClick,
    disabled = false,
    selected = false,
    icon,
    description,
    shortcut,
    divider = false,
    className,
    'data-testid': dataTestId,
    ...rest
  } = props;

  // Divider variant
  if (divider) {
    return (
      <div
        className={clsx('dyn-menu-item-divider', className)}
        role="separator"
        data-testid={dataTestId}
        {...rest}
      />
    );
  }

  const hasContent = Children.count(children) > 0;
  const shouldRenderContent = hasContent || Boolean(description);

  const handleClick = () => {
    if (!disabled && onClick) {
      onClick(value);
    }
  };
  
  const handleKeyDown = (event: ReactKeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleClick();
    }
  };
  
  const classes = clsx(
    'dyn-menu-item',
    {
      'dyn-menu-item--selected': selected,
      'dyn-menu-item--disabled': disabled,
      'dyn-menu-item--with-icon': Boolean(icon),
      'dyn-menu-item--with-description': Boolean(description)
    },
    className
  );
  
  return (
    <button
      ref={ref as Ref<HTMLButtonElement>}
      type="button"
      className={classes}
      role="menuitem"
      disabled={disabled}
      aria-selected={selected}
      data-value={value}
      data-testid={dataTestId}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      {...rest}
    >
      {/* Icon */}
      {icon && (
        <span className="dyn-menu-item__icon" aria-hidden="true">
          {icon}
        </span>
      )}
      
      {/* Content */}
      {shouldRenderContent && (
        <div className="dyn-menu-item__content">
          {hasContent && (
            <div className="dyn-menu-item__label">
              {children}
            </div>
          )}

          {description && (
            <div className="dyn-menu-item__description">
              {description}
            </div>
          )}
        </div>
      )}
      
      {/* Shortcut */}
      {shortcut && (
        <span className="dyn-menu-item__shortcut" aria-label={`Keyboard shortcut: ${shortcut}`}>
          {shortcut}
        </span>
      )}
    </button>
  );
});

DynMenuItem.displayName = 'DynMenuItem';
