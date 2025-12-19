# Design Tokens Integration Guide

## Overview

This guide explains how to use and integrate design tokens from `@dynui-max/design-tokens` into components and applications.

---

## Table of Contents

1. [Getting Started](#getting-started)
2. [Using Tokens in Components](#using-tokens-in-components)
3. [Theming](#theming)
4. [Customization](#customization)
5. [Best Practices](#best-practices)
6. [Troubleshooting](#troubleshooting)

---

## Getting Started

### Installation

Design tokens are automatically included when you install `@dynui-max/core`:

```bash
npm install @dynui-max/core
# or
pnpm add @dynui-max/core
# or
yarn add @dynui-max/core
```

### Import Styles

Import the bundled styles in your application entry point:

```tsx
// app.tsx or main.tsx
import '@dynui-max/core/styles';
```

This automatically includes:
- Design token CSS variables
- Component styles
- Theme definitions

---

## Using Tokens in Components

### CSS Custom Properties

All design tokens are available as CSS custom properties (variables):

```css
.my-component {
  /* Colors */
  color: var(--color-primary-500);
  background-color: var(--color-neutral-100);
  
  /* Spacing */
  padding: var(--spacing-md);
  margin: var(--spacing-lg);
  
  /* Typography */
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  line-height: var(--line-height-normal);
  
  /* Borders */
  border-radius: var(--radius-md);
  border-width: var(--border-width-thin);
  
  /* Shadows */
  box-shadow: var(--shadow-md);
  
  /* Animations */
  transition-duration: var(--duration-normal);
  transition-timing-function: var(--easing-ease-in-out);
}
```

### TypeScript Integration

Import token types for type-safe token usage:

```tsx
import type { DesignTokens } from '@dynui-max/design-tokens';

interface MyComponentProps {
  color?: keyof DesignTokens['colors'];
  spacing?: keyof DesignTokens['spacing'];
}

const MyComponent: React.FC<MyComponentProps> = ({ 
  color = 'primary-500',
  spacing = 'md' 
}) => {
  return (
    <div 
      style={{
        color: `var(--color-${color})`,
        padding: `var(--spacing-${spacing})`
      }}
    >
      Content
    </div>
  );
};
```

### JavaScript Access

Access token values programmatically:

```tsx
import tokens from '@dynui-max/design-tokens/json/tokens.json';

// Get specific token
const primaryColor = tokens.colors.primary['500'];
console.log(primaryColor); // '#3b82f6'

// Use in computed styles
const getButtonStyle = (variant: string) => ({
  backgroundColor: tokens.colors[variant]?['500'] || tokens.colors.primary['500']
});
```

---

## Theming

### Light and Dark Themes

The design system supports light and dark themes out of the box:

```tsx
// Toggle theme
const toggleTheme = () => {
  const root = document.documentElement;
  const currentTheme = root.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', newTheme);
};

// Using ThemeSwitcher component
import { ThemeSwitcher } from '@dynui-max/core';

<ThemeSwitcher />
```

### Theme Detection

Automatically detect user's system preference:

```tsx
import { useEffect } from 'react';

const useSystemTheme = () => {
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      const theme = e.matches ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', theme);
    };
    
    // Set initial theme
    if (mediaQuery.matches) {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
    
    // Listen for changes
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);
};
```

---

## Customization

### Override Individual Tokens

Customize specific tokens by overriding CSS variables:

```css
:root {
  /* Override primary color */
  --color-primary-500: #ff6b6b;
  
  /* Override spacing */
  --spacing-md: 20px;
  
  /* Override border radius */
  --radius-md: 12px;
}
```

### Create Custom Theme

Define a complete custom theme:

```css
:root[data-theme="custom"] {
  /* Brand Colors */
  --color-primary-500: #ff6b6b;
  --color-primary-600: #ee5a5a;
  --color-secondary-500: #4ecdc4;
  
  /* Background Colors */
  --color-neutral-50: #fafafa;
  --color-neutral-900: #1a1a1a;
  
  /* Component Tokens */
  --button-bg: var(--color-primary-500);
  --button-hover-bg: var(--color-primary-600);
  
  /* Spacing adjustments */
  --spacing-unit: 4px;
}
```

### Theme Configuration Object

For programmatic theme generation:

```tsx
interface ThemeConfig {
  colors: {
    primary: string;
    secondary: string;
    success: string;
    danger: string;
    warning: string;
    info: string;
  };
  spacing: {
    unit: number;
  };
  typography: {
    fontFamily: string;
    baseFontSize: string;
  };
}

const applyTheme = (config: ThemeConfig) => {
  const root = document.documentElement;
  
  Object.entries(config.colors).forEach(([key, value]) => {
    root.style.setProperty(`--color-${key}-500`, value);
  });
  
  root.style.setProperty('--spacing-unit', `${config.spacing.unit}px`);
  root.style.setProperty('--font-family-base', config.typography.fontFamily);
  root.style.setProperty('--font-size-base', config.typography.baseFontSize);
};

// Usage
applyTheme({
  colors: {
    primary: '#3b82f6',
    secondary: '#8b5cf6',
    success: '#10b981',
    danger: '#ef4444',
    warning: '#f59e0b',
    info: '#3b82f6'
  },
  spacing: { unit: 4 },
  typography: {
    fontFamily: 'Inter, system-ui, sans-serif',
    baseFontSize: '16px'
  }
});
```

---

## Best Practices

### 1. Always Use Semantic Tokens

✅ **Good:**
```css
.button-primary {
  background-color: var(--color-primary-500);
}
```

❌ **Bad:**
```css
.button-primary {
  background-color: #3b82f6; /* Hard-coded value */
}
```

### 2. Use Component-Specific Tokens

✅ **Good:**
```css
.dyn-button {
  padding: var(--button-padding, var(--spacing-md));
  border-radius: var(--button-radius, var(--radius-md));
}
```

### 3. Provide Fallback Values

✅ **Good:**
```css
.component {
  color: var(--color-text-primary, #1f2937);
}
```

### 4. Use Spacing Scale Consistently

✅ **Good:**
```css
.container {
  padding: var(--spacing-md);
  gap: var(--spacing-sm);
}
```

❌ **Bad:**
```css
.container {
  padding: 17px; /* Arbitrary value */
  gap: 13px;
}
```

### 5. Leverage CSS Calc for Variations

```css
.component {
  /* Double the base spacing */
  padding: calc(var(--spacing-md) * 2);
  
  /* Negative margin */
  margin-top: calc(var(--spacing-lg) * -1);
}
```

---

## Troubleshooting

### Tokens Not Applied

**Problem:** CSS variables show default browser colors

**Solution:**
```tsx
// Ensure styles are imported
import '@dynui-max/core/styles';

// Or import design tokens separately
import '@dynui-max/design-tokens/css/variables.css';
```

### Theme Not Switching

**Problem:** Dark theme not applying

**Solution:**
```tsx
// Check data-theme attribute
const theme = document.documentElement.getAttribute('data-theme');
console.log('Current theme:', theme);

// Ensure theme styles are defined
// Check that :root[data-theme="dark"] rules exist
```

### TypeScript Errors

**Problem:** Token types not recognized

**Solution:**
```tsx
// Ensure types are exported from design-tokens package
import type { DesignTokens } from '@dynui-max/design-tokens';

// Check package.json exports
{
  "exports": {
    "./types": "./dist/typescript/tokens.d.ts"
  }
}
```

### Build Errors

**Problem:** CSS build failing

**Solution:**
```bash
# Rebuild design tokens first
pnpm --filter @dynui-max/design-tokens build

# Then rebuild core
pnpm --filter @dynui-max/core build

# Clear caches if needed
pnpm clean
```

### Performance Issues

**Problem:** Too many CSS variables causing lag

**Solution:**
- Use CSS variable scoping
- Only override needed tokens
- Consider CSS-in-JS for dynamic theming

```css
/* Scope variables to specific components */
.my-component {
  --local-color: var(--color-primary-500);
  color: var(--local-color);
}
```

---

## Advanced Usage

### Responsive Token Values

```css
.component {
  padding: var(--spacing-sm);
}

@media (min-width: 768px) {
  .component {
    padding: var(--spacing-md);
  }
}

@media (min-width: 1024px) {
  .component {
    padding: var(--spacing-lg);
  }
}
```

### Token Aliases

Create semantic aliases:

```css
:root {
  --card-bg: var(--color-neutral-50);
  --card-border: var(--color-neutral-200);
  --card-shadow: var(--shadow-md);
  --card-radius: var(--radius-lg);
}

.card {
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  box-shadow: var(--card-shadow);
  border-radius: var(--card-radius);
}
```

### Component Token Pattern

```css
/* Component-scoped tokens with fallbacks */
.dyn-button {
  /* Size tokens */
  --button-height-sm: 32px;
  --button-height-md: 40px;
  --button-height-lg: 48px;
  
  /* Use semantic color tokens */
  --button-bg: var(--color-primary-500);
  --button-text: var(--color-neutral-50);
  
  /* Apply tokens */
  height: var(--button-height-md);
  background-color: var(--button-bg);
  color: var(--button-text);
}
```

---

## Resources

- [Design Tokens Specification](https://design-tokens.github.io/community-group/format/)
- [Style Dictionary Documentation](https://amzn.github.io/style-dictionary/)
- [CSS Custom Properties (MDN)](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)
- [DynUI-Max Component Documentation](../README.md)

---

**Document Version**: 1.0  
**Last Updated**: December 17, 2025
