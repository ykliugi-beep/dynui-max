import {
  forwardRef,
  type ComponentPropsWithRef,
  type ElementType,
  type MouseEventHandler,
  type ReactElement,
  type ReactNode
} from 'react';
import clsx from 'clsx';
import type { PolymorphicComponentProps } from '../../types/polymorphic';
import './DynBreadcrumbItem.css';

type DynBreadcrumbItemOwnProps = {
  /**
   * Item content
   */
  children: ReactNode;

  /**
   * Link href
   */
  href?: string;

  /**
   * Click handler (for button-like items)
   */
  onClick?: MouseEventHandler;

  /**
   * Current/active item
   */
  current?: boolean;

  /**
   * Disabled state
   */
  disabled?: boolean;

  /**
   * Additional CSS class names
   */
  className?: string;
};

export type DynBreadcrumbItemProps<C extends ElementType = 'span'> =
  PolymorphicComponentProps<C, DynBreadcrumbItemOwnProps>;

const DynBreadcrumbItemComponent = <C extends ElementType = 'span'>(
  {
    children,
    href,
    onClick,
    current = false,
    disabled = false,
    className,
    as,
    ...props
  }: DynBreadcrumbItemProps<C>,
  ref: ComponentPropsWithRef<C>['ref']
) => {
  const Component = (as || (href ? 'a' : onClick ? 'button' : 'span')) as ElementType;
  const isLink = Component === 'a';
  const isButton = Component === 'button';

  const classes = clsx(
    'dyn-breadcrumb-item',
    {
      'dyn-breadcrumb-item--current': current,
      'dyn-breadcrumb-item--disabled': disabled,
      'dyn-breadcrumb-item--link': href && !disabled,
      'dyn-breadcrumb-item--button': onClick && !disabled,
      'dyn-breadcrumb-item--text': !href && !onClick
    },
    className
  );

  const commonProps = {
    ref,
    className: classes,
    'aria-current': current ? 'page' : undefined,
    'aria-disabled': disabled || undefined,
    ...props
  };

  if (isLink) {
    return (
      <a
        {...commonProps}
        href={disabled ? undefined : href}
        tabIndex={disabled ? -1 : undefined}
        onClick={
          disabled
            ? (event) => {
                event.preventDefault();
              }
            : onClick
        }
      >
        {children}
      </a>
    );
  }

  if (isButton) {
    return (
      <button
        {...commonProps}
        type="button"
        onClick={disabled ? undefined : onClick}
        disabled={disabled}
      >
        {children}
      </button>
    );
  }

  return (
    <Component {...commonProps}>
      {children}
    </Component>
  );
};

export const DynBreadcrumbItem = forwardRef(DynBreadcrumbItemComponent) as <
  C extends ElementType = 'span'
>(
  props: DynBreadcrumbItemProps<C>
) => ReactElement | null;

DynBreadcrumbItem.displayName = 'DynBreadcrumbItem';
