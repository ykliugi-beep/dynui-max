import {
  forwardRef,
  type CSSProperties,
  type ElementType,
  type MouseEventHandler,
  type ReactNode
} from 'react';
import clsx from 'clsx';
import type { ComponentSize } from '@dynui-max/design-tokens';
import './DynBox.css';

export type SpacingValue = ComponentSize | '0' | 'auto';
export type DisplayValue = 'block' | 'inline' | 'inline-block' | 'flex' | 'inline-flex' | 'grid' | 'none';
export type FlexDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse';
export type JustifyContent = 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
export type AlignItems = 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';

export interface DynBoxProps {
  /**
   * HTML element to render as
   * @default 'div'
   */
  as?: ElementType;
  
  /**
   * Display type
   * @default 'block'
   */
  display?: DisplayValue;
  
  /**
   * Padding (all sides)
   */
  p?: SpacingValue;
  
  /**
   * Padding horizontal (left + right)
   */
  px?: SpacingValue;
  
  /**
   * Padding vertical (top + bottom)
   */
  py?: SpacingValue;
  
  /**
   * Padding top
   */
  pt?: SpacingValue;
  
  /**
   * Padding right
   */
  pr?: SpacingValue;
  
  /**
   * Padding bottom
   */
  pb?: SpacingValue;
  
  /**
   * Padding left
   */
  pl?: SpacingValue;
  
  /**
   * Margin (all sides)
   */
  m?: SpacingValue;
  
  /**
   * Margin horizontal (left + right)
   */
  mx?: SpacingValue;
  
  /**
   * Margin vertical (top + bottom)
   */
  my?: SpacingValue;
  
  /**
   * Margin top
   */
  mt?: SpacingValue;
  
  /**
   * Margin right
   */
  mr?: SpacingValue;
  
  /**
   * Margin bottom
   */
  mb?: SpacingValue;
  
  /**
   * Margin left
   */
  ml?: SpacingValue;
  
  /**
   * Background color using semantic tokens
   */
  bg?: 'primary' | 'secondary' | 'muted' | 'inverse';
  
  /**
   * Text color using semantic tokens
   */
  color?: 'primary' | 'secondary' | 'muted' | 'inverse';
  
  /**
   * Border radius using design tokens
   */
  radius?: ComponentSize | 'none' | 'full';
  
  /**
   * Border style
   */
  border?: boolean | 'top' | 'right' | 'bottom' | 'left';
  
  /**
   * Shadow style
   */
  shadow?: ComponentSize | 'none';
  
  /**
   * Flex direction (when display is flex)
   */
  direction?: FlexDirection;
  
  /**
   * Justify content (when display is flex)
   */
  justify?: JustifyContent;
  
  /**
   * Align items (when display is flex)
   */
  align?: AlignItems;
  
  /**
   * Gap between flex/grid children
   */
  gap?: SpacingValue;
  
  /**
   * Width
   */
  width?: string | number;
  
  /**
   * Height
   */
  height?: string | number;
  
  /**
   * Interactive element (adds hover/focus states)
   */
  interactive?: boolean;
  
  /**
   * Box content
   */
  children?: ReactNode;
  
  /**
   * Additional CSS class names
   */
  className?: string;
  
  /**
   * Custom CSS properties
   */
  style?: CSSProperties;
  
  /**
   * Click handler (for interactive boxes)
   */
  onClick?: MouseEventHandler;
}

/**
 * DynBox - Flexible layout container with design tokens
 * 
 * Features:
 * - Polymorphic rendering (div, section, article, etc.)
 * - Spacing system using design tokens
 * - Flexbox and grid utilities
 * - Background and border variants
 * - Interactive states
 * - Semantic color system
 */
export const DynBox = forwardRef<HTMLElement, DynBoxProps>((
  {
    as: Component = 'div',
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
      // Spacing classes
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
      
      // Style classes
      [`dyn-box--bg-${bg}`]: bg,
      [`dyn-box--color-${color}`]: color,
      [`dyn-box--radius-${radius}`]: radius,
      [`dyn-box--shadow-${shadow}`]: shadow,
      [`dyn-box--gap-${gap}`]: gap,
      
      // Flex classes
      [`dyn-box--direction-${direction}`]: direction,
      [`dyn-box--justify-${justify}`]: justify,
      [`dyn-box--align-${align}`]: align,
      
      // Border classes
      'dyn-box--border': border === true,
      [`dyn-box--border-${border}`]: typeof border === 'string',
      
      // Interactive state
      'dyn-box--interactive': interactive
    },
    className
  );
  
  const inlineStyles: CSSProperties = {
    ...(width && { width: typeof width === 'number' ? `${width}px` : width }),
    ...(height && { height: typeof height === 'number' ? `${height}px` : height }),
    ...style
  };
  
  return (
    <Component
      ref={ref}
      className={classes}
      style={inlineStyles}
      onClick={interactive ? onClick : undefined}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      {...props}
    >
      {children}
    </Component>
  );
});

DynBox.displayName = 'DynBox';