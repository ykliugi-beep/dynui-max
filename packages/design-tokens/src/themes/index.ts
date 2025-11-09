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
    overlay: 'rgba(0, 0, 0, 0.75)'
  },
  border: {
    primary: baseTokens.colors.gray[700],
    secondary: baseTokens.colors.gray[600],
    focus: baseTokens.colors.primary[400],
    error: baseTokens.colors.error[400] || '#f87171',
    success: baseTokens.colors.success[400] || '#4ade80',
    warning: baseTokens.colors.warning[400] || '#fbbf24'
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
      disabled: baseTokens.colors.gray[900]
    }
  },
  feedback: {
    success: {
      bg: baseTokens.colors.success[900] || '#14532d',
      border: baseTokens.colors.success[700] || '#15803d',
      text: baseTokens.colors.success[300] || '#86efac',
      icon: baseTokens.colors.success[400] || '#4ade80'
    },
    warning: {
      bg: baseTokens.colors.warning[900] || '#78350f',
      border: baseTokens.colors.warning[700] || '#b45309',
      text: baseTokens.colors.warning[300] || '#fcd34d',
      icon: baseTokens.colors.warning[400] || '#fbbf24'
    },
    error: {
      bg: baseTokens.colors.error[900] || '#7f1d1d',
      border: baseTokens.colors.error[700] || '#b91c1c',
      text: baseTokens.colors.error[300] || '#fca5a5',
      icon: baseTokens.colors.error[400] || '#f87171'
    },
    info: {
      bg: baseTokens.colors.info[900] || '#1e3a8a',
      border: baseTokens.colors.info[700] || '#1d4ed8',
      text: baseTokens.colors.info[300] || '#93c5fd',
      icon: baseTokens.colors.info[400] || '#60a5fa'
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
