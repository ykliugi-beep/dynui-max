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

export interface RadiusTokens {
  none: string;
  sm: string;
  md: string;
  lg: string;
  full: string;
}

export interface ShadowTokens {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
}

export interface BreakpointTokens {
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
}

// Base tokens interface
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

// Semantic tokens for components
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
    };
    feedback: {
      success: string;
      warning: string;
      danger: string;
      info: string;
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

// Theme interface
export interface Theme {
  name: string;
  base: BaseTokens;
  semantic: SemanticTokens;
}

// Component variant types
export type ComponentVariant = 'solid' | 'outline' | 'ghost' | 'link';
export type ComponentSize = 'sm' | 'md' | 'lg';
export type ComponentColor = 'primary' | 'success' | 'warning' | 'danger' | 'neutral';
