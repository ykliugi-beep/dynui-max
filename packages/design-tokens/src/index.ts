import packageJson from '../package.json' assert { type: 'json' };

/**
 * DynUI-Max Design Tokens
 *
 * Base design tokens and theme definitions for the component library.
 * All values exported here should be consumed via CSS variables or theme provider.
 */

// Export all token values
export * from './tokens/base';
export * from './tokens/semantic';
export * from './themes';

// CRITICAL FIX: Explicitly export all types for cross-package usage
export type {
  // Core theme types
  Theme,
  BaseTokens,
  SemanticTokens,
  
  // Component types
  ComponentVariant,
  ComponentSize,
  ComponentColor,
  
  // Token detail types
  ColorScale,
  SpacingTokens,
  TypographyTokens,
  RadiusTokens,
  ShadowTokens,
  BreakpointTokens
} from './types';

// Re-export for convenience
export { default as baseTokens } from './tokens/base';
export { default as semanticTokens } from './tokens/semantic';
export { lightTheme, darkTheme, themes } from './themes';

// Version and metadata
export const VERSION = packageJson.version;

export const TOKEN_PREFIX = 'dyn' as const;

/**
 * CSS Custom Properties prefix for all design tokens
 * Usage: var(--dyn-color-primary-500)
 */
export const CSS_VAR_PREFIX = '--dyn' as const;
