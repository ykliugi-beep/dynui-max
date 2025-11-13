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
