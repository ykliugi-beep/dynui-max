import type { Theme } from '../types';
import baseTokens from '../tokens/base';
import semanticTokens from '../tokens/semantic';

/**
 * Light theme - default theme
 */
export const lightTheme: Theme = {
  name: 'light',
  colors: baseTokens.colors,
  spacing: baseTokens.spacing,
  typography: baseTokens.typography,
  radius: baseTokens.radius,
  shadows: baseTokens.shadows,
  breakpoints: baseTokens.breakpoints,
  zIndex: baseTokens.zIndex,
  text: semanticTokens.text,
  background: semanticTokens.background,
  border: semanticTokens.border,
  interactive: semanticTokens.interactive,
  feedback: semanticTokens.feedback
};

/**
 * Dark theme - inverted semantic tokens
 */
export const darkTheme: Theme = {
  name: 'dark',
  colors: baseTokens.colors,
  spacing: baseTokens.spacing,
  typography: baseTokens.typography,
  radius: baseTokens.radius,
  shadows: baseTokens.shadows,
  breakpoints: baseTokens.breakpoints,
  zIndex: baseTokens.zIndex,
  text: {
    primary: baseTokens.colors.white,
    secondary: baseTokens.colors.gray[300],
    tertiary: baseTokens.colors.gray[400],
    disabled: baseTokens.colors.gray[600],
    inverse: baseTokens.colors.gray[900],
    link: baseTokens.colors.primary[400],
    linkHover: baseTokens.colors.primary[300]
  },
  background: {
    primary: baseTokens.colors.gray[900],
    secondary: baseTokens.colors.gray[800],
    tertiary: baseTokens.colors.gray[700],
    inverse: baseTokens.colors.white,
    overlay: 'rgba(0, 0, 0, 0.7)'
  },
  border: {
    primary: baseTokens.colors.gray[700],
    secondary: baseTokens.colors.gray[600],
    focus: baseTokens.colors.primary[400],
    error: baseTokens.colors.error[400],
    success: baseTokens.colors.success[400],
    warning: baseTokens.colors.warning[400]
  },
  interactive: {
    primary: {
      default: baseTokens.colors.primary[500],
      hover: baseTokens.colors.primary[400],
      active: baseTokens.colors.primary[300],
      disabled: baseTokens.colors.gray[600]
    },
    secondary: {
      default: baseTokens.colors.gray[800],
      hover: baseTokens.colors.gray[700],
      active: baseTokens.colors.gray[600],
      disabled: baseTokens.colors.gray[800]
    }
  },
  feedback: {
    success: {
      bg: '#064e3b',
      border: baseTokens.colors.success[400],
      text: '#d1fae5',
      icon: baseTokens.colors.success[400]
    },
    warning: {
      bg: '#78350f',
      border: baseTokens.colors.warning[400],
      text: '#fef3c7',
      icon: baseTokens.colors.warning[400]
    },
    error: {
      bg: '#7f1d1d',
      border: baseTokens.colors.error[400],
      text: '#fecaca',
      icon: baseTokens.colors.error[400]
    },
    info: {
      bg: '#1e3a8a',
      border: baseTokens.colors.info[400],
      text: '#dbeafe',
      icon: baseTokens.colors.info[400]
    }
  }
};

// Export default theme
export const defaultTheme = lightTheme;

// All available themes
export const themes = {
  light: lightTheme,
  dark: darkTheme
} as const;

export type ThemeName = keyof typeof themes;
