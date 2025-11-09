import React, { forwardRef } from 'react';
import clsx from 'clsx';
import type { ComponentSize } from '@dynui-max/design-tokens';
import './DynBox.css';

export type SpacingValue = ComponentSize | '0' | 'auto';
export type DisplayValue = 'block' | 'inline' | 'inline-block' | 'flex' | 'inline-flex' | 'grid' | 'none';
export type FlexDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse';
export type JustifyContent = 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
export type AlignItems = 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';

export interface DynBoxProps {
  display?: DisplayValue;
  p?: SpacingValue;
  px?: SpacingValue;
  py?: SpacingValue;
  pt?: SpacingValue;
  pr?: SpacingValue;
  pb?: SpacingValue;
  pl?: SpacingValue;
  m?: SpacingValue;
  mx?: SpacingValue;
  my?: SpacingValue;
  mt?: SpacingValue;
  mr?: SpacingValue;
  mb?: SpacingValue;
  ml?: SpacingValue;
  bg?: 'primary' | 'secondary' | 'muted' | 'inverse';
  color?: 'primary' | 'secondary' | 'muted' | 'inverse';
  radius?: ComponentSize | 'none' | 'full';
  border?: boolean | 'top' | 'right' | 'bottom' | 'left';
  shadow?: ComponentSize | 'none';
  direction?: FlexDirection;
  justify?: JustifyContent;
  align?: AlignItems;
  gap?: SpacingValue;
  width?: string | number;
  height?: string | number;
  interactive?: boolean;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export const DynBox = forwardRef<HTMLDivElement, DynBoxProps>((
  {
    display = 'block',
    p, px, py, pt, pr, pb, pl,
    m, mx, my, mt, mr, mb, ml,
    bg,
    color,
    radius,
    border,
    shadow,
    direction,
    justify,
    align,
    gap,
    width,
    height,
    interactive = false,
    children,
    className,
    style,
    onClick,
    ...props
  },
  ref
) => {
  const classes = clsx(
    'dyn-box',
    `dyn-box--display-${display}`,
    {
      [`dyn-box--p-${p}`]: p,
      [`dyn-box--px-${px}`]: px,
      [`dyn-box--py-${py}`]: py,
      [`dyn-box--pt-${pt}`]: pt,
      [`dyn-box--pr-${pr}`]: pr,
      [`dyn-box--pb-${pb}`]: pb,
      [`dyn-box--pl-${pl}`]: pl,
      [`dyn-box--m-${m}`]: m,
      [`dyn-box--mx-${mx}`]: mx,
      [`dyn-box--my-${my}`]: my,
      [`dyn-box--mt-${mt}`]: mt,
      [`dyn-box--mr-${mr}`]: mr,
      [`dyn-box--mb-${mb}`]: mb,
      [`dyn-box--ml-${ml}`]: ml,
      [`dyn-box--bg-${bg}`]: bg,
      [`dyn-box--color-${color}`]: color,
      [`dyn-box--radius-${radius}`]: radius,
      [`dyn-box--shadow-${shadow}`]: shadow,
      [`dyn-box--gap-${gap}`]: gap,
      [`dyn-box--direction-${direction}`]: direction,
      [`dyn-box--justify-${justify}`]: justify,
      [`dyn-box--align-${align}`]: align,
      'dyn-box--border': border === true,
      [`dyn-box--border-${border}`]: typeof border === 'string',
      'dyn-box--interactive': interactive
    },
    className
  );
  
  const inlineStyles: React.CSSProperties = {
    ...(width && { width: typeof width === 'number' ? `${width}px` : width }),
    ...(height && { height: typeof height === 'number' ? `${height}px` : height }),
    ...style
  };
  
  return (
    <div
      ref={ref}
      className={classes}
      style={inlineStyles}
      onClick={interactive ? onClick : undefined}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      {...props}
    >
      {children}
    </div>
  );
});

DynBox.displayName = 'DynBox';