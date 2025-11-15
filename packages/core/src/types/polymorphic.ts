import { forwardRef } from 'react';
import type React from 'react';

export type PolymorphicRef<C extends React.ElementType> =
  React.ComponentPropsWithRef<C>['ref'];

type PolymorphicComponentBaseProps<
  C extends React.ElementType,
  OwnProps = object
> = OwnProps &
  Omit<React.ComponentPropsWithoutRef<C>, keyof OwnProps | 'as'> & {
    as?: C;
  };

export type PolymorphicComponentPropsWithoutRef<
  C extends React.ElementType,
  OwnProps = object
> = PolymorphicComponentBaseProps<C, OwnProps>;

export type PolymorphicComponentPropsWithRef<
  C extends React.ElementType,
  OwnProps = object
> = PolymorphicComponentPropsWithoutRef<C, OwnProps> &
  React.RefAttributes<React.ElementRef<C>>;

/**
 * @deprecated Use {@link PolymorphicComponentPropsWithRef}. This alias is
 * retained for backwards compatibility and continues to include ref support.
 */
export type PolymorphicComponentProps<
  C extends React.ElementType,
  OwnProps = object
> = PolymorphicComponentPropsWithRef<C, OwnProps>;

export type ForwardRefWithAsRenderFunction<
  DefaultAs extends React.ElementType,
  OwnProps
> = <
  As extends React.ElementType = DefaultAs,
  Props extends PolymorphicComponentPropsWithRef<As, OwnProps> = PolymorphicComponentPropsWithRef<As, OwnProps>
>(
  props: React.PropsWithoutRef<Props>,
  ref: React.ForwardedRef<React.ElementRef<As>>
) => React.ReactElement | null;

export type PolymorphicForwardRefComponent<
  DefaultAs extends React.ElementType,
  OwnProps
> = React.ForwardRefExoticComponent<
  React.PropsWithoutRef<
    PolymorphicComponentPropsWithRef<DefaultAs, OwnProps>
  > &
    React.RefAttributes<React.ElementRef<DefaultAs>>
> & {
  <As extends React.ElementType = DefaultAs>(
    props: React.PropsWithoutRef<
      PolymorphicComponentPropsWithRef<As, OwnProps>
    > & React.RefAttributes<React.ElementRef<As>>
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
    PolymorphicComponentPropsWithoutRef<DefaultAs, OwnProps>
  >((props, forwardedRef) =>
    component(
      props as React.PropsWithoutRef<
        PolymorphicComponentPropsWithRef<DefaultAs, OwnProps>
      >,
      forwardedRef
    )
  ) as unknown as PolymorphicForwardRefComponent<DefaultAs, OwnProps>;
