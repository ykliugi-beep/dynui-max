# @dynui-max/design-tokens

Design token primitives for the DynUI-Max design system with Style Dictionary build system.

## Features

- ✅ **TypeScript-first**: Fully typed token definitions
- ✅ **Style Dictionary**: Automated CSS variable generation  
- ✅ **Multi-theme**: Light and dark theme support
- ✅ **Tree-shakable**: ESM/CJS exports with proper sideEffects
- ✅ **CSS Variables**: Generated :root and theme class CSS

## Installation

```bash
pnpm add @dynui-max/design-tokens
```

## Usage

### TypeScript

```typescript
import { baseTokens, semanticTokens, lightTheme, darkTheme } from '@dynui-max/design-tokens';

// Access base primitive tokens
console.log(baseTokens.color.primary[500]); // #3b82f6
console.log(baseTokens.spacing.md); // 1rem

// Use semantic tokens for components
const buttonStyles = {
  backgroundColor: semanticTokens.color.interactive.primary,
  color: semanticTokens.color.text.inverse
};

// Theme switching
const currentTheme = darkTheme;
```

### CSS Variables

```css
/* Import base CSS variables */
@import '@dynui-max/design-tokens/css';

/* Use in components */
.my-button {
  background-color: var(--dyn-color-interactive-primary);
  color: var(--dyn-color-text-inverse);
  padding: var(--dyn-spacing-sm) var(--dyn-spacing-md);
  border-radius: var(--dyn-radius-md);
}

/* Theme switching */
.theme-dark {
  /* Dark theme CSS variables automatically applied */
}
```

## Token Categories

### Base Tokens (Primitives)

- **Colors**: Primary scale (50-950), Gray scale, White/Black
- **Spacing**: xs, sm, md, lg, xl, 2xl, 3xl
- **Typography**: Font sizes, weights, line heights, families
- **Radius**: Border radius scales
- **Shadows**: Box shadow definitions
- **Breakpoints**: Responsive breakpoint values
- **Z-Index**: Layering hierarchy

### Semantic Tokens (Contextual)

- **Text Colors**: primary, secondary, muted, inverse
- **Backgrounds**: primary, secondary, muted, inverse  
- **Borders**: primary, secondary, muted
- **Feedback**: success, warning, danger, info
- **Interactive**: primary, secondary, hover, active, disabled

## Themes

- **Light Theme**: Default theme with light backgrounds
- **Dark Theme**: Inverted semantic tokens for dark mode

## Build System

Tokens are processed through Style Dictionary to generate:

- CSS custom properties (`:root`, `.theme-light`, `.theme-dark`)
- TypeScript definitions and exports
- JSON token maps for tooling

## Development

```bash
# Build tokens and generate CSS
pnpm build

# Watch mode for development
pnpm dev

# Run tests
pnpm test
```
