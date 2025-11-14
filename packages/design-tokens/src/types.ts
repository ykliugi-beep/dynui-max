/**
 * Type definitions for design tokens
 */

// Base token types
export interface ColorScale {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  950: string;
}

export type FeedbackScale = Pick<
  ColorScale,
  50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900
>;

export interface SpacingTokens {
  '2xs': string;  // Fixed: This was missing from the original implementation
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  '3xl': string;
  '4xl': string;  // Added: Additional spacing tokens
  '5xl': string;
  '6xl': string;
}

export interface TypographyTokens {
  fontSize: {
    xs: string;
    sm: string;
    base: string;  // Fixed: Changed from 'md' to 'base' for consistency
    lg: string;
    xl: string;
    '2xl': string;
    '3xl': string;
    '4xl': string;  // Added: Additional font sizes
  };
  fontWeight: {
    normal: number;
    medium: number;
    semibold: number;
    bold: number;
  };
  lineHeight: {
    tight: number;
    normal: number;
    relaxed: number;
  };
  fontFamily: {
    sans: string[];
    mono: string[];
  };
}

export interface RadiusTokens {
  none: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;     // Added: Missing radius tokens
  '2xl': string;
  full: string;
}

export interface ShadowTokens {
  sm: string;
  md: string;
  lg: string;
  xl: string;
  inner: string;  // Added: Inner shadow
  none: string;   // Added: No shadow option
}

export interface BreakpointTokens {
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
}

// Enhanced Z-Index tokens
export interface ZIndexTokens {
  hide: number;
  auto: string;   // Fixed: Should be string 'auto'
  base: number;
  docked: number;
  dropdown: number;
  sticky: number;
  banner: number;
  overlay: number;
  modal: number;
  popover: number;
  skipLink: number;  // Added: Missing z-index tokens
  toast: number;
  tooltip: number;
}

// Base tokens interface
export interface BaseTokens {
  colors: {  // Fixed: Changed from 'color' to 'colors' for consistency
    primary: ColorScale;
    gray: ColorScale;
    success: FeedbackScale;  // Added: Semantic color scales
    warning: FeedbackScale;
    danger: FeedbackScale;
    info: FeedbackScale;
    white: string;
    black: string;
    transparent: string;  // Added: Transparent color
  };
  spacing: SpacingTokens;
  typography: TypographyTokens;
  radius: RadiusTokens;
  shadows: ShadowTokens;  // Fixed: Changed from 'shadow' to 'shadows'
  breakpoints: BreakpointTokens;  // Fixed: Changed from 'breakpoint' to 'breakpoints'
  zIndex: ZIndexTokens;
}

// Enhanced semantic tokens for components
export interface SemanticTokens {
  text: {
    primary: string;
    secondary: string;
    tertiary: string;   // Added: Third level text
    disabled: string;   // Added: Disabled state
    inverse: string;
    link: string;       // Added: Link colors
    linkHover: string;
  };
  background: {
    primary: string;
    secondary: string;
    tertiary: string;   // Added: Third level background
    inverse: string;
    overlay: string;    // Added: Overlay background
  };
  border: {
    primary: string;
    secondary: string;
    focus: string;      // Added: Focus state
    danger: string;     // Added: Danger state
    success: string;    // Added: Success state
    warning: string;    // Added: Warning state
  };
  interactive: {        // Enhanced interactive states
    primary: {
      default: string;
      hover: string;
      active: string;
      disabled: string;
    };
    secondary: {
      default: string;
      hover: string;
      active: string;
      disabled: string;
    };
  };
  feedback: {           // Enhanced feedback colors
    success: {
      bg: string;
      border: string;
      text: string;
      icon: string;
    };
    warning: {
      bg: string;
      border: string;
      text: string;
      icon: string;
    };
    danger: {
      bg: string;
      border: string;
      text: string;
      icon: string;
    };
  };
}

// Theme interface
export interface Theme {
  name: string;
  colors: BaseTokens['colors'];
  spacing: SpacingTokens;
  typography: TypographyTokens;
  radius: RadiusTokens;
  shadows: ShadowTokens;
  breakpoints: BreakpointTokens;
  zIndex: ZIndexTokens;
  text: SemanticTokens['text'];
  background: SemanticTokens['background'];
  border: SemanticTokens['border'];
  interactive: SemanticTokens['interactive'];
  feedback: SemanticTokens['feedback'];
}

// Component variant types
export type ComponentVariant = 'solid' | 'outline' | 'ghost' | 'link';
export type ComponentSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';  // Enhanced sizes
export type ComponentColor = 'primary' | 'success' | 'warning' | 'danger' | 'neutral';

// Export the base tokens type for Style Dictionary
export type { BaseTokens as Tokens };