import {
  type ElementType,
  type KeyboardEvent,
  type KeyboardEventHandler,
  type PropsWithoutRef,
  type ReactNode
} from 'react';
import clsx from 'clsx';
import type { ComponentVariant, ComponentSize, ComponentColor } from '@dynui-max/design-tokens';
import {
  forwardRefWithAs,
  type PolymorphicComponentPropsWithRef,
  type PolymorphicRef
} from '../../types/polymorphic';
import { DynIcon } from '../DynIcon';
import './DynButton.css';

type DynButtonOwnProps = {
  /**
   * Visual style variant
   * @default 'solid'
   */
  variant?: (ComponentVariant | undefined);

  /**
   * Button size using design tokens
   * @default 'md'
   */
  size?: (ComponentSize | undefined);

  /**
   * Color theme variant
   * @default 'primary'
   */
  color?: (ComponentColor | undefined);

  /**
   * Loading state - shows spinner and disables button
   */
  loading?: (boolean | undefined);

  /**
   * Icon at the start of the button
   */
  startIcon?: (ReactNode | undefined);

  /**
   * Icon at the end of the button
   */
  endIcon?: (ReactNode | undefined);

  /**
   * Button content
   */
  children?: (ReactNode | undefined);

  /**
   * Disabled state - supported when rendering as button
   */
  disabled?: (boolean | undefined);
};

export type DynButtonProps<C extends ElementType = 'button'> =
  PolymorphicComponentPropsWithRef<C, DynButtonOwnProps>;

const DynButtonComponent = <C extends ElementType = 'button'>(
  {
    variant = 'solid',
    size = 'md',
    color = 'primary',
    loading = false,
    disabled = false,
    startIcon,
    endIcon,
    as,
    className,
    children,
    onKeyDown,
    ...props
  }: PropsWithoutRef<DynButtonProps<C>>,
  ref: PolymorphicRef<C>
) => {
  const Component = (as || 'button') as ElementType;
  const isDisabled = disabled || loading;
  const isButtonElement = Component === 'button';

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    (onKeyDown as KeyboardEventHandler<HTMLElement> | undefined)?.(event);

    if (
      event.defaultPrevented ||
      isButtonElement ||
      isDisabled ||
      (event.key !== 'Enter' && event.key !== ' ')
    ) {
      return;
    }

    event.preventDefault();
    event.currentTarget.click();
  };

  const classes = clsx(
    'dyn-button',
    `dyn-button--variant-${variant}`,
    `dyn-button--size-${size}`,
    `dyn-button--color-${color}`,
    {
      'dyn-button--loading': loading,
      'dyn-button--disabled': isDisabled,
      'dyn-button--icon-only': !children && (startIcon || endIcon)
    },
    className
  );

  return (
    <Component
      ref={ref}
      className={classes}
      disabled={isButtonElement ? isDisabled : undefined}
      aria-busy={loading}
      aria-disabled={!isButtonElement && isDisabled ? true : undefined}
      onKeyDown={handleKeyDown}
      {...props}
    >
      {/* Loading spinner */}
      {loading && (
        <span className="dyn-button__loading" aria-hidden="true">
          <DynIcon name="spinner" size={size} />
        </span>
      )}

      {/* Start icon */}
      {startIcon && !loading && (
        <span className="dyn-button__start-icon" aria-hidden="true">
          {startIcon}
        </span>
      )}

      {/* Content */}
      {children && (
        <span className="dyn-button__content">
          {children}
        </span>
      )}

      {/* End icon */}
      {endIcon && !loading && (
        <span className="dyn-button__end-icon" aria-hidden="true">
          {endIcon}
        </span>
      )}
    </Component>
  );
};

export const DynButton =
  forwardRefWithAs<'button', DynButtonOwnProps>(DynButtonComponent);
DynButton.displayName = 'DynButton';
