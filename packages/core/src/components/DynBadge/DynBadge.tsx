import {
  forwardRef,
  type ComponentPropsWithRef,
  type ElementType,
  type ReactElement,
  type ReactNode
} from 'react';
import clsx from 'clsx';
import type { ComponentSize, ComponentColor } from '@dynui-max/design-tokens';
import type { PolymorphicComponentProps } from '../../types/polymorphic';
import './DynBadge.css';

type DynBadgeOwnProps = {
  /**
   * Badge size using design tokens
   * @default 'md'
   */
  size?: ComponentSize;

  /**
   * Color variant
   * @default 'neutral'
   */
  color?: ComponentColor;

  /**
   * Visual variant
   * @default 'solid'
   */
  variant?: 'solid' | 'outline' | 'soft';

  /**
   * Badge content
   */
  children: ReactNode;

  /**
   * Additional CSS class names
   */
  className?: string;
};

export type DynBadgeProps<C extends ElementType = 'span'> =
  PolymorphicComponentProps<C, DynBadgeOwnProps>;

const DynBadgeComponent = <C extends ElementType = 'span'>(
  {
    size = 'md',
    color = 'neutral',
    variant = 'solid',
    children,
    className,
    as,
    ...props
  }: DynBadgeProps<C>,
  ref: ComponentPropsWithRef<C>['ref']
) => {
  const Component = (as || 'span') as ElementType;

  const classes = clsx(
    'dyn-badge',
    `dyn-badge--size-${size}`,
    `dyn-badge--color-${color}`,
    `dyn-badge--variant-${variant}`,
    className
  );

  return (
    <Component ref={ref} className={classes} {...props}>
      {children}
    </Component>
  );
};

export const DynBadge = forwardRef(DynBadgeComponent) as <
  C extends ElementType = 'span'
>(
  props: DynBadgeProps<C>
) => ReactElement | null;

DynBadge.displayName = 'DynBadge';
