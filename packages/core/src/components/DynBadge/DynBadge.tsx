import { type ElementType, type PropsWithoutRef, type ReactNode } from 'react';
import clsx from 'clsx';
import type { ComponentSize, ComponentColor } from '@dynui-max/design-tokens';
import {
  forwardRefWithAs,
  type PolymorphicComponentProps,
  type PolymorphicRef
} from '../../types/polymorphic';
import './DynBadge.css';

type DynBadgeOwnProps = {
  /**
   * Badge size using design tokens
   * @default 'md'
   */
  size?: (ComponentSize | undefined);

  /**
   * Color variant
   * @default 'neutral'
   */
  color?: (ComponentColor | undefined);

  /**
   * Visual variant
   * @default 'solid'
   */
  variant?: ('solid' | 'outline' | 'soft' | undefined);

  /**
   * Badge content
   */
  children: ReactNode;

  /**
   * Additional CSS class names
   */
  className?: (string | undefined);
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
  }: PropsWithoutRef<DynBadgeProps<C>>,
  ref: PolymorphicRef<C>
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

export const DynBadge = forwardRefWithAs(DynBadgeComponent);
DynBadge.displayName = 'DynBadge';
