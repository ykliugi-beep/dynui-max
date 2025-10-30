import type { Theme } from '../types';
import baseTokens from '../tokens/base';
import semanticTokens from '../tokens/semantic';

/**
 * Light theme - default theme
 */
export const lightTheme: Theme = {
  name: 'light',
  base: baseTokens,
  semantic: semanticTokens
};

/**
 * Dark theme - inverted semantic tokens
 */
export const darkTheme: Theme = {
  name: 'dark', 
  base: baseTokens,
  semantic: {
    color: {
      text: {
        primary: baseTokens.color.white,
        secondary: baseTokens.color.gray[300],
        muted: baseTokens.color.gray[400],
        inverse: baseTokens.color.gray[900]
      },
      background: {
        primary: baseTokens.color.gray[900],
        secondary: baseTokens.color.gray[800],
        muted: baseTokens.color.gray[700],
        inverse: baseTokens.color.white
      },
      border: {
        primary: baseTokens.color.gray[700],
        secondary: baseTokens.color.gray[600],
        muted: baseTokens.color.gray[800]
      },
      feedback: {
        success: '#34d399', // green-400
        warning: '#fbbf24', // amber-400
        danger: '#f87171', // red-400
        info: baseTokens.color.primary[400]
      },
      interactive: {
        primary: baseTokens.color.primary[500],
        secondary: baseTokens.color.gray[800],
        hover: baseTokens.color.primary[400],
        active: baseTokens.color.primary[300],
        disabled: baseTokens.color.gray[600]
      }
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