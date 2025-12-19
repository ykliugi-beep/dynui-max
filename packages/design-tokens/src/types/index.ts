/**
 * Design token type definitions
 */

// Color scale type
export type ColorScale = {
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
};

// Spacing tokens type
export interface SpacingTokens {
  '2xs': string;
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  '3xl': string;
}

// Typography tokens type
export interface TypographyTokens {
  fontSize: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
    '3xl': string;
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

// Radius tokens type
export interface RadiusTokens {
  none: string;
  sm: string;
  md: string;
  lg: string;
  full: string;
}

// Shadow tokens type
export interface ShadowTokens {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
}

// Breakpoint tokens type
export interface BreakpointTokens {
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
}

// Base token structure
export interface BaseTokens {
  color: {
    primary: ColorScale;
    gray: ColorScale;
    white: string;
    black: string;
  };
  spacing: SpacingTokens;
  typography: TypographyTokens;
  radius: RadiusTokens;
  shadow: ShadowTokens;
  breakpoint: BreakpointTokens;
  zIndex: {
    hide: number;
    auto: number;
    base: number;
    docked: number;
    dropdown: number;
    sticky: number;
    banner: number;
    overlay: number;
    modal: number;
    popover: number;
    tooltip: number;
  };
}

// Semantic token structure
export interface SemanticTokens {
  color: {
    text: {
      primary: string;
      secondary: string;
      muted: string;
      inverse: string;
    };
    background: {
      primary: string;
      secondary: string;
      muted: string;
      inverse: string;
    };
    border: {
      primary: string;
      secondary: string;
      muted: string;
      focus: string;
      success: string;
      warning: string;
      danger: string;
    };
    feedback: {
      success: string;
      warning: string;
      danger: string;
    };
    interactive: {
      primary: string;
      secondary: string;
      hover: string;
      active: string;
      disabled: string;
    };
  };
}

// Theme structure
export interface Theme {
  name: string;
  base: BaseTokens;
  semantic: SemanticTokens;
}

// Component prop types
export type ComponentSize = 'sm' | 'md' | 'lg';
export type ComponentVariant = 'solid' | 'outline' | 'ghost' | 'link';
export type ComponentColor = 'primary' | 'success' | 'warning' | 'danger' | 'neutral';

// Theme names
export type ThemeName = 'light' | 'dark';

// CSS custom property map type
export interface CSSCustomProperties {
  [key: string]: string | number;
}
