export const lightTheme = { name: 'light' } as const;
export const darkTheme = { name: 'dark' } as const;

export const themes = {
  light: lightTheme,
  dark: darkTheme
} as const;

export const baseTokens = {} as const;
export const semanticTokens = {} as const;
export const VERSION = 'test';
export const TOKEN_PREFIX = 'dyn';
export const CSS_VAR_PREFIX = '--dyn';
