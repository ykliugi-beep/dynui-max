/**
 * DynUI-Max Design Tokens
 * 
 * Base design tokens and theme definitions for the component library.
 * All values exported here should be consumed via CSS variables or theme provider.
 */

export * from './tokens/base';
export * from './tokens/semantic';
export * from './themes';
export * from './types';

// Re-export for convenience
export { default as baseTokens } from './tokens/base';
export { default as semanticTokens } from './tokens/semantic';
export { lightTheme, darkTheme } from './themes';

// Version and metadata
export const VERSION = '0.1.0';
export const TOKEN_PREFIX = 'dyn' as const;

/**
 * CSS Custom Properties prefix for all design tokens
 * Usage: var(--dyn-color-primary-500)
 */
export const CSS_VAR_PREFIX = '--dyn' as const;