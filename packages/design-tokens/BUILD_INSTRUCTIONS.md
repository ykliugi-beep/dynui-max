# Design Tokens Build Instructions

This document explains how the DynUI-Max design tokens build pipeline works and how to use the generated CSS variables in components.

## 📦 Build Pipeline Overview

The design tokens package uses **Style Dictionary** to transform JSON token definitions into multiple output formats:

```
src/tokens/*.json  →  Style Dictionary  →  dist/*.css + dist/*.js + dist/*.json
```

### Source Files

- `src/tokens/base.json` - Base design tokens (colors, spacing, typography, etc.)
- `src/tokens/semantic.json` - Semantic tokens that reference base tokens

### Generated Output Files

```
dist/
├── tokens.css           # All CSS variables for light theme
├── tokens-dark.css      # CSS variables for dark theme
├── variables.css        # All variables without theme scoping
├── tokens.js            # JavaScript exports (ES6)
├── tokens.json          # Flat JSON structure
└── tokens-nested.json   # Nested JSON structure
```

## 🔨 Building Design Tokens

### Prerequisites

Ensure you have dependencies installed:

```bash
# From repository root
pnpm install
```

### Build Commands

```bash
# Build only design tokens package
pnpm --filter @dynui-max/design-tokens build

# Or from within packages/design-tokens/
pnpm build

# Watch mode for development
pnpm dev

# Clean build artifacts
pnpm clean
```

### Build Process Steps

1. **Clean** - Removes old `dist/` files
2. **Build Tokens** - Runs `node build/build.js` to generate CSS/JS/JSON from JSON sources
3. **Build JS** - Transpiles TypeScript to JavaScript using `tsup`
4. **Build Types** - Generates TypeScript declaration files

## 📝 Generated CSS Variables

### Naming Convention

All CSS variables follow the pattern: `--dyn-{category}-{type}-{item}`

Examples:
```css
--dyn-color-primary-500
--dyn-spacing-md
--dyn-font-family-sans
--dyn-size-radius-md
```

### Usage in Components

#### Basic Example

```typescript
// packages/core/src/ui/dyn-button.tsx
import '@dynui-max/design-tokens/dist/tokens.css';

const styles = `
  .dyn-button {
    /* Use CSS variables instead of hardcoded values */
    padding: var(--dyn-spacing-md);
    background-color: var(--dyn-color-primary-500);
    color: var(--dyn-color-white);
    border-radius: var(--dyn-size-radius-md);
    font-family: var(--dyn-font-family-sans);
    font-size: var(--dyn-font-size-md);
    font-weight: var(--dyn-font-weight-medium);
    transition: background-color var(--dyn-duration-normal) ease;
  }
  
  .dyn-button:hover {
    background-color: var(--dyn-color-primary-600);
  }
  
  .dyn-button:disabled {
    opacity: var(--dyn-opacity-disabled);
    cursor: not-allowed;
  }
`;

export const DynButton = ({ children, disabled, onClick }) => (
  <>
    <style>{styles}</style>
    <button className="dyn-button" disabled={disabled} onClick={onClick}>
      {children}
    </button>
  </>
);
```

#### With TypeScript Imports

```typescript
// Import token values in JavaScript/TypeScript
import { tokens } from '@dynui-max/design-tokens';

const buttonPadding = tokens.spacing.md; // Access token values
```

## 🎨 Available Token Categories

### Colors
```css
--dyn-color-primary-{50|100|200|...| 900}
--dyn-color-gray-{50|100|200|...|900}
--dyn-color-success-{50|100|...|900}
--dyn-color-error-{50|100|...|900}
--dyn-color-warning-{50|100|...|900}
--dyn-color-info-{50|100|...|900}
```

### Spacing
```css
--dyn-spacing-{xs|sm|md|lg|xl|2xl|3xl}
```

### Typography
```css
--dyn-font-family-{sans|mono}
--dyn-font-size-{xs|sm|md|lg|xl|2xl|3xl}
--dyn-font-weight-{normal|medium|semibold|bold}
--dyn-line-height-{tight|normal|relaxed}
```

### Sizing
```css
--dyn-size-radius-{sm|md|lg|full}
--dyn-size-border-{thin|normal|thick}
```

### Effects
```css
--dyn-shadow-{sm|md|lg|xl}
--dyn-opacity-{disabled|hover}
--dyn-duration-{fast|normal|slow}
```

## 🌓 Theme Support

### Light Theme (Default)

```tsx
import '@dynui-max/design-tokens/dist/tokens.css';

// Variables applied to :root by default
```

### Dark Theme

```tsx
import '@dynui-max/design-tokens/dist/tokens-dark.css';

// Variables scoped to [data-theme="dark"]
// Apply theme: <div data-theme="dark">...</div>
```

### Theme Switching

```tsx
function App() {
  const [theme, setTheme] = useState('light');
  
  return (
    <div data-theme={theme}>
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        Toggle Theme
      </button>
      <YourComponents />
    </div>
  );
}
```

## 🔧 Troubleshooting

### Issue: CSS files not found

**Error**: `Failed to resolve import "@dynui-max/design-tokens/dist/tokens.css"`

**Solution**:
```bash
# Build design tokens package first
pnpm --filter @dynui-max/design-tokens build

# Then build/run your app
pnpm storybook
```

### Issue: Outdated CSS variables

**Solution**:
```bash
# Clean and rebuild
pnpm --filter @dynui-max/design-tokens clean
pnpm --filter @dynui-max/design-tokens build
```

### Issue: Style Dictionary errors

**Check**:
1. JSON token files have valid structure
2. All token references resolve correctly
3. Custom transforms are registered

**Debug**:
```bash
# Run build script directly with verbose output
node packages/design-tokens/build/build.js
```

## 📁 File Structure

```
packages/design-tokens/
├── build/
│   ├── build.js         # Main build script (executes Style Dictionary)
│   ├── config.js        # Style Dictionary configuration
│   └── transforms.js    # Custom transforms and transform groups
├── src/
│   ├── tokens/
│   │   ├── base.json    # Base token definitions
│   │   └── semantic.json # Semantic token definitions
│   ├── index.ts         # TypeScript exports
│   └── types.ts         # TypeScript type definitions
├── dist/                # Generated files (gitignored)
│   ├── tokens.css
│   ├── tokens-dark.css
│   ├── variables.css
│   ├── tokens.js
│   ├── tokens.json
│   └── tokens-nested.json
└── package.json
```

## 🚀 Next Steps

1. **Build the tokens**: `pnpm --filter @dynui-max/design-tokens build`
2. **Verify output**: Check that `dist/tokens.css` exists
3. **Start Storybook**: `pnpm storybook` (should now work without errors)
4. **Refactor components**: Replace hardcoded values with CSS variables

## 📚 Resources

- [Style Dictionary Documentation](https://amzn.github.io/style-dictionary/)
- [Design Tokens Specification](https://design-tokens.github.io/community-group/format/)
- [DynUI-Max Component Standards](../../docs/COMPONENT_STANDARDS.md)

---

**Questions?** Check the main repository documentation or open an issue.
