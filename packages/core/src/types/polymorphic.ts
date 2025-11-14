import { forwardRef } from 'react';
import type React from 'react';

export type PolymorphicRef<C extends React.ElementType> =
  React.ComponentPropsWithRef<C>['ref'];

export type PolymorphicComponentProps<
  C extends React.ElementType,
  OwnProps = object
> = OwnProps &
  Omit<React.ComponentPropsWithRef<C>, keyof OwnProps | 'as'> & {
    as?: C;
  };

export type ForwardRefWithAsRenderFunction<
  DefaultAs extends React.ElementType,
  OwnProps
> = <As extends React.ElementType = DefaultAs>(
  props: PolymorphicComponentProps<As, OwnProps>,
  ref: PolymorphicRef<As>
) => React.ReactElement | null;

export type PolymorphicForwardRefComponent<
  DefaultAs extends React.ElementType,
  OwnProps
> = React.ForwardRefExoticComponent<
  PolymorphicComponentProps<DefaultAs, OwnProps>
> & {
  <As extends React.ElementType = DefaultAs>(
    props: PolymorphicComponentProps<As, OwnProps> & {
      ref?: PolymorphicRef<As>;
    }
  ): React.ReactElement | null;
};

export const forwardRefWithAs = <
  DefaultAs extends React.ElementType,
  OwnProps
>(
  component: ForwardRefWithAsRenderFunction<DefaultAs, OwnProps>
): PolymorphicForwardRefComponent<DefaultAs, OwnProps> =>
  forwardRef(component as unknown as React.ForwardRefRenderFunction<
    PolymorphicRef<DefaultAs>,
    PolymorphicComponentProps<DefaultAs, OwnProps>
  >) as unknown as PolymorphicForwardRefComponent<DefaultAs, OwnProps>;
