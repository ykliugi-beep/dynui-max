# @dynui-max/core

Production-ready React + TypeScript component library with design tokens integration and comprehensive accessibility support.

## Features

- ✅ **TypeScript-first**: Strict typing with comprehensive prop interfaces
- ✅ **Design Tokens**: Full integration with @dynui-max/design-tokens
- ✅ **Accessibility**: WCAG 2.1 AA compliant with axe testing
- ✅ **Theme Support**: Light/dark themes with automatic switching
- ✅ **Tree-shakable**: ESM/CJS exports with proper sideEffects
- ✅ **Comprehensive Testing**: 80%+ coverage with unit and a11y tests

## Installation

```bash
pnpm add @dynui-max/core @dynui-max/design-tokens
```

## Quick Start

```tsx
import { ThemeProvider, DynIcon, DynFieldContainer } from '@dynui-max/core';
import '@dynui-max/design-tokens/css';

function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <DynFieldContainer 
        label="Email" 
        htmlFor="email" 
        required
        error={emailError}
      >
        <input 
          id="email" 
          type="email" 
          value={email}
          onChange={handleEmailChange}
        />
      </DynFieldContainer>
      
      <DynIcon name="check" size="lg" color="success" title="Success" />
    </ThemeProvider>
  );
}
```

## Components

### P0 Prerequisites (Phase 5 Blockers)

#### DynIcon
Icon component with registry system and token integration.

```tsx
<DynIcon 
  name="check" 
  size="md" 
  color="primary" 
  title="Success icon" 
/>
```

**Props**:
- `name`: Icon name from registry
- `size`: 'sm' | 'md' | 'lg'
- `color`: 'current' | 'primary' | 'secondary' | 'muted' | 'success' | 'warning' | 'danger'
- `title`: Accessible title (optional, decorative if omitted)

#### DynFieldContainer
Comprehensive form field wrapper with validation and accessibility.

```tsx
<DynFieldContainer 
  label="Email Address"
  htmlFor="email"
  description="We'll use this to contact you"
  hint="Use your work email"
  error={errors.email}
  required
>
  <input id="email" type="email" />
</DynFieldContainer>
```

**Props**:
- `label`: Field label text
- `description`: Additional description
- `hint`: Help text for users
- `error`: Error message (shows as alert)
- `required`: Required field indicator
- `htmlFor`: Associates label with form control
- `orientation`: 'vertical' | 'horizontal'

#### DynStepper
Step navigation component with progress indication.

```tsx
const steps = [
  { key: 'personal', label: 'Personal Info' },
  { key: 'payment', label: 'Payment', disabled: true },
  { key: 'confirm', label: 'Confirmation', status: 'error' }
];

<DynStepper 
  currentStep={currentStep}
  onStepChange={setCurrentStep}
  steps={steps}
  orientation="horizontal"
/>
```

**Props**:
- `currentStep`: Active step index
- `onStepChange`: Step change callback
- `steps`: Array of step data with key, label, status, disabled
- `orientation`: 'horizontal' | 'vertical'

### Theme System

#### ThemeProvider
Provides theme context and CSS variable injection.

```tsx
<ThemeProvider defaultTheme="light" storageKey="app-theme">
  <App />
</ThemeProvider>
```

#### useTheme Hook
Access theme context and controls.

```tsx
const { theme, themeName, setTheme, toggleTheme } = useTheme();
```

## Testing

```bash
# Run all tests
pnpm test

# Run with coverage (80% threshold)
pnpm test:coverage

# Run accessibility tests
pnpm test:a11y

# Watch mode
pnpm test:watch
```

## Build

```bash
# Build for production
pnpm build

# Development mode
pnpm dev
```

## Design Tokens Integration

All components use design tokens exclusively:

```css
/* Component styles reference tokens */
.dyn-icon--size-md {
  width: var(--dyn-spacing-lg);
  height: var(--dyn-spacing-lg);
}

.dyn-icon--color-primary {
  color: var(--dyn-color-interactive-primary);
}
```

## Accessibility

- WCAG 2.1 AA compliant
- Comprehensive keyboard navigation
- Screen reader support with proper ARIA
- Focus management and visual indicators
- Automated a11y testing with axe-core

## TypeScript

Strict TypeScript with comprehensive prop interfaces:

```tsx
interface DynIconProps extends React.SVGProps<SVGSVGElement> {
  name: string;
  size?: ComponentSize;
  color?: 'current' | 'primary' | 'secondary' | /* ... */;
  title?: string;
  className?: string;
}
```

## Development

See [Contributing Guide](../../CONTRIBUTING.md) for development setup and guidelines.

## Status: P0 Prerequisites Complete

✅ All P0 components implemented with tokens integration  
✅ Comprehensive test coverage ≥80%  
✅ Accessibility testing with axe-core  
✅ TypeScript-first APIs with strict typing  
✅ Theme system with light/dark support

**Ready for Phase 5 progression** 🏁