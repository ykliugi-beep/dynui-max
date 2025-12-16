import {
  type ElementType,
  type MouseEventHandler,
  type PropsWithoutRef,
  type ReactNode
} from 'react';
import clsx from 'clsx';
import {
  forwardRefWithAs,
  type PolymorphicComponentPropsWithRef,
  type PolymorphicRef
} from '../../types/polymorphic';
import './DynBreadcrumbItem.css';

type DynBreadcrumbItemOwnProps = {
  /**
   * Item content
   */
  children: ReactNode;

  /**
   * Link href
   */
  href?: string | undefined;

  /**
   * Click handler (for button-like items)
   */
  onClick?: MouseEventHandler | undefined;

  /**
   * Current/active item
   */
  current?: boolean | undefined;

  /**
   * Disabled state
   */
  disabled?: boolean | undefined;

  /**
   * Additional CSS class names
   */
  className?: string | undefined;
};

export type DynBreadcrumbItemProps<C extends ElementType = 'span'> =
  PolymorphicComponentPropsWithRef<C, DynBreadcrumbItemOwnProps>;

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
  }: PropsWithoutRef<DynBreadcrumbItemProps<C>>,
  ref: PolymorphicRef<C>
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
    'aria-current': current ? ('page' as const) : undefined,
    'aria-disabled': disabled ? true : undefined,
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

export const DynBreadcrumbItem =
  forwardRefWithAs<'span', DynBreadcrumbItemOwnProps>(
    DynBreadcrumbItemComponent
  );
DynBreadcrumbItem.displayName = 'DynBreadcrumbItem';
