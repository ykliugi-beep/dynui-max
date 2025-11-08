import React, { forwardRef } from 'react';
import clsx from 'clsx';
import type { ComponentSize, ComponentColor } from '@dynui-max/design-tokens';
import './DynBadge.css';

// Polymorphic component types
type PolymorphicRef<C extends React.ElementType> = React.ComponentPropsWithRef<C>['ref'];

type PolymorphicComponentProp<C extends React.ElementType, Props = object> = {
  as?: C;
} & Props &
  Omit<React.ComponentPropsWithoutRef<C>, keyof Props | 'as'>;

type PolymorphicComponentPropWithRef<
  C extends React.ElementType,
  Props = object
> = PolymorphicComponentProp<C, Props> & { ref?: PolymorphicRef<C> };

export type DynBadgeProps<C extends React.ElementType = 'span'> = PolymorphicComponentPropWithRef<
  C,
  {
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
  }
>;

type DynBadgeComponent = <C extends React.ElementType = 'span'>(
  props: DynBadgeProps<C>
) => React.ReactElement | null;

/**
 * DynBadge - Small status and labeling component
 * 
 * Features:
 * - Size variants using spacing tokens
 * - Color variants using semantic tokens
 * - Multiple visual styles (solid, outline, soft)
 * - Polymorphic rendering (span, a, button, etc.)
 */
export const DynBadge: DynBadgeComponent = forwardRef(
  <C extends React.ElementType = 'span'>(
    {
      size = 'md',
      color = 'neutral',
      variant = 'solid',
      children,
      className,
      as,
      ...props
    }: DynBadgeProps<C>,
    ref?: PolymorphicRef<C>
  ) => {
    const Component = as || 'span';
    
    const classes = clsx(
      'dyn-badge',
      `dyn-badge--size-${size}`,
      `dyn-badge--color-${color}`,
      `dyn-badge--variant-${variant}`,
      className
    );
    
    return (
      <Component
        ref={ref}
        className={classes}
        {...props}
      >
        {children}
      </Component>
    );
  }
) as DynBadgeComponent;

(DynBadge as any).displayName = 'DynBadge';