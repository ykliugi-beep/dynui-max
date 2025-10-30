/**
 * Design token type definitions
 */

// Base token structure
export interface BaseTokens {
  color: {
    primary: {
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
    gray: {
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
    white: string;
    black: string;
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
    '3xl': string;
  };
  typography: {
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
  };
  radius: {
    none: string;
    sm: string;
    md: string;
    lg: string;
    full: string;
  };
  shadow: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  breakpoint: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
  };
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