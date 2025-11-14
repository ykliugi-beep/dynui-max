import { forwardRef } from 'react';
import type React from 'react';

export type PolymorphicRef<C extends React.ElementType> =
  React.ComponentPropsWithRef<C>['ref'];

export type PolymorphicComponentProps<
  C extends React.ElementType,
  OwnProps = object
> = OwnProps &
  Omit<React.ComponentPropsWithoutRef<C>, keyof OwnProps | 'as'> & {
    as?: C;
  } &
  React.RefAttributes<React.ElementRef<C>>;

export type ForwardRefWithAsRenderFunction<
  DefaultAs extends React.ElementType,
  OwnProps
> = <As extends React.ElementType = DefaultAs>(
  props: React.PropsWithoutRef<PolymorphicComponentProps<As, OwnProps>>,
  ref: React.ForwardedRef<React.ElementRef<As>>
) => React.ReactElement | null;

export type PolymorphicForwardRefComponent<
  DefaultAs extends React.ElementType,
  OwnProps
> = React.ForwardRefExoticComponent<
  React.PropsWithoutRef<PolymorphicComponentProps<DefaultAs, OwnProps>> &
    React.RefAttributes<React.ElementRef<DefaultAs>>
> & {
  <As extends React.ElementType = DefaultAs>(
    props: React.PropsWithoutRef<PolymorphicComponentProps<As, OwnProps>> &
      React.RefAttributes<React.ElementRef<As>>
  ): React.ReactElement | null;
};

export const forwardRefWithAs = <
  DefaultAs extends React.ElementType,
  OwnProps
>(
  component: ForwardRefWithAsRenderFunction<DefaultAs, OwnProps>
): PolymorphicForwardRefComponent<DefaultAs, OwnProps> =>
  forwardRef<
    React.ElementRef<DefaultAs>,
    PolymorphicComponentProps<DefaultAs, OwnProps>
  >(
    (props, forwardedRef) =>
      component(
        props as React.PropsWithoutRef<
          PolymorphicComponentProps<DefaultAs, OwnProps>
        >,
        forwardedRef
      )
  ) as unknown as PolymorphicForwardRefComponent<
    DefaultAs,
    OwnProps
  >;
