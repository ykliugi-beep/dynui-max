# DynUI-Max

Production-ready React + TypeScript component library with design tokens, comprehensive testing, and CI quality gates.

## 🎯 Project Status: P0 Prerequisites Complete

✅ **Phase 1-4 Complete**: Infrastructure, design tokens, core components, and quality gates  
🚀 **Ready for Phase 5**: Documentation & Publishing

### ✅ Completed Features

- **Monorepo Architecture**: pnpm workspaces + Turborepo with locked dependencies
- **Design Tokens System**: Complete implementation with Style Dictionary build
- **P0 Core Components**: DynIcon, DynFieldContainer, DynStepper with tokens integration
- **Theme System**: Light/dark themes with CSS variable injection
- **Testing Infrastructure**: 80%+ coverage with unit and a11y tests
- **CI Quality Gates**: Enforced typecheck, lint, coverage, a11y, and bundle analysis
- **TypeScript-first**: Strict configuration with comprehensive typing

## 🏗️ Architecture

```
dynui-max/
├── packages/
│   ├── design-tokens/     # Token definitions + Style Dictionary build
│   └── core/              # React components with token integration
├── apps/                  # Future: Storybook + playground apps
├── tools/                 # Future: Shared build configs
├── .github/workflows/     # Quality Gates CI/CD
└── docs/                  # Specifications and development guides
```

## 🚀 Quick Start

```bash
# Install dependencies (uses frozen lockfile)
pnpm install

# Build all packages
pnpm build

# Run tests with coverage
pnpm test:coverage

# Run quality gates (typecheck + lint + test + a11y)
pnpm quality:gates
```

### Using Components

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
        <input id="email" type="email" />
      </DynFieldContainer>
      
      <DynIcon name="check" size="lg" color="success" title="Valid" />
    </ThemeProvider>
  );
}
```

## 📦 Packages

### [@dynui-max/design-tokens](./packages/design-tokens/)
Design token primitives with Style Dictionary build system.
- Base tokens: colors, spacing, typography, radius, shadows
- Semantic tokens: text, background, border, feedback, interactive
- Theme support: light/dark with CSS variables
- TypeScript exports with strict typing

### [@dynui-max/core](./packages/core/)
React components with design tokens integration.
- **DynIcon**: Icon registry with size/color tokens
- **DynFieldContainer**: Form field wrapper with validation
- **DynStepper**: Step navigation with progress indication
- **ThemeProvider**: Theme context with CSS variable injection
- 80%+ test coverage with a11y compliance

## 🛡️ Quality Gates (CI Enforced)

- **Gate A**: Static analysis (TypeScript, ESLint, Prettier) - fail on error
- **Gate B**: Test coverage ≥80% with threshold enforcement
- **Gate C**: Accessibility testing (axe + Storybook test-runner)
- **Gate D**: Bundle analysis (<150KB) + tree-shaking verification

## 🧪 Testing

```bash
# Run all tests
pnpm test

# Coverage with 80% thresholds
pnpm test:coverage

# Accessibility tests only
pnpm test:a11y

# Watch mode
pnpm test:watch
```

Testing stack:
- **Vitest**: Fast unit testing with coverage
- **@testing-library/react**: Component testing utilities
- **vitest-axe**: Automated accessibility testing
- **happy-dom**: Lightweight DOM environment

## 🎨 Design System

### Design Tokens
All components use design tokens exclusively - no hardcoded values.

```css
/* Generated CSS variables */
:root {
  --dyn-color-primary-500: #3b82f6;
  --dyn-spacing-md: 1rem;
  --dyn-radius-md: 0.375rem;
}

/* Theme switching */
.theme-dark {
  --dyn-color-text-primary: #ffffff;
  --dyn-color-background-primary: #111827;
}
```

### Component Standards
- TypeScript-first with comprehensive prop interfaces
- forwardRef for imperative APIs
- WCAG 2.1 AA accessibility compliance
- Tokens-only styling with semantic color/size variants
- Comprehensive Storybook stories (planned Phase 5)

## 🔄 Development Workflow

```bash
# Start development
pnpm dev

# Add new component
mkdir packages/core/src/components/DynNewComponent
# Follow existing patterns: Component.tsx, index.ts, styles.css, tests

# Before committing
pnpm quality:gates
```

### Dependency Management
Versions locked via pnpm catalog protocol:

```yaml
# pnpm-workspace.yaml
catalog:
  react: 18.3.1
  typescript: 5.6.3
  vitest: 2.1.5
  # ... all versions frozen
```

## 🚦 Phase Progress

### ✅ Phase 1: Infrastructure (Complete)
- Monorepo setup with pnpm + Turborepo
- TypeScript strict configuration
- Dependency management with catalog protocol

### ✅ Phase 2: Design Tokens (Complete) 
- Token definitions (base + semantic layers)
- Style Dictionary build system
- CSS variables generation
- TypeScript exports

### ✅ Phase 3: Core Components (Complete)
- P0 components: DynIcon, DynFieldContainer, DynStepper
- Theme system with provider
- Tokens-only styling

### ✅ Phase 4: Testing & Quality (Complete)
- Comprehensive test suites (unit + a11y)
- 80%+ coverage with thresholds
- CI Quality Gates A-D enforced

### 🎯 Phase 5: Documentation & Publishing (Next)
- Storybook setup with comprehensive stories
- API documentation generation
- NPM publishing pipeline
- Migration guides

## 🤝 Contributing

1. **Prerequisites**: Node 20+, pnpm 9+
2. **Setup**: `pnpm install` (uses frozen lockfile)
3. **Development**: Follow existing component patterns
4. **Testing**: Maintain 80%+ coverage
5. **Quality**: All CI gates must pass

See [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed guidelines.

## 📄 Documentation

- [Functional Specification](./docs/dynui-max-functional-spec.md) - Complete development guide
- [Design Tokens Guide](./packages/design-tokens/README.md) - Token system usage
- [Component API](./packages/core/README.md) - Component documentation
- [Development Status](./docs/development-status.md) - Current progress

## 🏆 Key Achievements

- **Zero hardcoded styles** - 100% design tokens integration
- **Strict TypeScript** - No any, comprehensive interfaces
- **80%+ test coverage** - Unit and accessibility tests
- **CI quality gates** - Automated quality enforcement
- **Deterministic builds** - Frozen dependencies, reproducible
- **Enterprise ready** - Scalable architecture, comprehensive docs

## 📊 Metrics

- **Bundle size**: <150KB (enforced)
- **Test coverage**: ≥80% (enforced)
- **TypeScript**: 100% strict mode
- **Accessibility**: WCAG 2.1 AA compliant
- **Dependencies**: 100% catalog-managed

---

**Status**: P0 Prerequisites Complete ✅  
**Next Milestone**: Phase 5 - Documentation & Publishing 🚀  
**Repository**: Production-ready React + TypeScript component library

Built with ❤️ for the Monero project and beyond.