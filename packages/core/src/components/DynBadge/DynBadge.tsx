import React, { forwardRef } from 'react';
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
  children: React.ReactNode;

  /**
   * Additional CSS class names
   */
  className?: string;
};

export type DynBadgeProps<C extends React.ElementType = 'span'> =
  PolymorphicComponentProps<C, DynBadgeOwnProps>;

const DynBadgeComponent = <C extends React.ElementType = 'span'>(
  {
    size = 'md',
    color = 'neutral',
    variant = 'solid',
    children,
    className,
    as,
    ...props
  }: DynBadgeProps<C>,
  ref: React.ComponentPropsWithRef<C>['ref']
) => {
  const Component = (as || 'span') as React.ElementType;

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
  C extends React.ElementType = 'span'
>(
  props: DynBadgeProps<C>
) => React.ReactElement | null;

DynBadge.displayName = 'DynBadge';
