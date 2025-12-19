# DynUI-Max Design System

🎨 **Modern, accessible React component library** built with TypeScript, Storybook, and design tokens.

[![Build Status](https://img.shields.io/github/actions/workflow/status/mgasic/dynui-max/build-design-tokens.yml?branch=main)](https://github.com/mgasic/dynui-max/actions)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![pnpm](https://img.shields.io/badge/maintained%20with-pnpm-cc00ff.svg)](https://pnpm.io/)

---

## ⚡ Quick Start

### 🚨 IMPORTANT: Build Design Tokens First!

Before running Storybook, you **MUST** generate CSS files:

```bash
# 1. Install dependencies
pnpm install

# 2. Build design tokens (CRITICAL STEP)
cd packages/design-tokens
pnpm build:tokens

# 3. Verify CSS was generated
ls dist/tokens.css  # Should exist (8KB+)

# 4. Return to root and start Storybook
cd ../../
pnpm storybook
```

**Why?** CSS files in `dist/` are not committed to git. You must build them locally.

📝 **Full instructions**: [BUILD_TOKENS_LOCALLY.md](BUILD_TOKENS_LOCALLY.md)

---

## 📚 Documentation

- **[BUILD_TOKENS_LOCALLY.md](BUILD_TOKENS_LOCALLY.md)** - How to build design tokens
- **[DESIGN_TOKENS_INTEGRATION.md](DESIGN_TOKENS_INTEGRATION.md)** - Using tokens in components
- **[DEVELOPMENT.md](DEVELOPMENT.md)** - Development guidelines
- **[Storybook](http://localhost:6006)** - Component documentation (after `pnpm storybook`)

---

## 🛠️ Development

### Project Structure

```
dynui-max/
├── packages/
│   ├── core/              # React components
│   ├── design-tokens/    # Design system tokens
│   └── icons/            # Icon library
├── apps/
│   └── storybook/        # Component documentation
└── tools/
    ├── build-config/     # Shared build config
    └── eslint-config/   # Shared ESLint config
```

### Common Commands

```bash
# Install dependencies
pnpm install

# Build all packages
pnpm build

# Build design tokens only
pnpm --filter @dynui-max/design-tokens build:tokens

# Start Storybook
pnpm storybook

# Run tests
pnpm test

# Lint code
pnpm lint

# Type check
pnpm typecheck
```

---

## 🎯 Features

- ✅ **29 React Components** - Buttons, inputs, modals, and more
- ✅ **Design Tokens** - CSS variables for consistent theming
- ✅ **Accessibility** - WCAG 2.1 AA compliant with ARIA support
- ✅ **TypeScript** - Full type safety with strict mode
- ✅ **Storybook** - Interactive component documentation
- ✅ **Dark Mode** - Built-in theme switching
- ✅ **Tree-shakeable** - Import only what you need
- ✅ **Monorepo** - pnpm workspaces for efficient development

---

## 📦 Packages

### @dynui-max/core

Core component library with 29+ components:

```tsx
import { DynButton, DynInput, DynModal } from '@dynui-max/core';
import '@dynui-max/core/styles';

function App() {
  return (
    <DynButton variant="solid" size="md">
      Click Me
    </DynButton>
  );
}
```

### @dynui-max/design-tokens

Design system tokens (colors, spacing, typography):

```css
/* Automatically included with @dynui-max/core */
:root {
  --dyn-color-primary-500: #3b82f6;
  --dyn-spacing-md: 1rem;
  --dyn-font-size-base: 1rem;
}
```

### @dynui-max/icons

Icon library with 20+ icons:

```tsx
import { DynIcon } from '@dynui-max/core';

<DynIcon name="CheckCircle" size="md" color="#3b82f6" />
```

---

## 🐛 Troubleshooting

### Error: "Failed to resolve import @dynui-max/design-tokens/dist/tokens.css"

**Problem**: CSS files were not generated.

**Solution**:
```bash
cd packages/design-tokens
pnpm build:tokens
cd ../../
pnpm storybook
```

### Error: "Cannot find module 'style-dictionary'"

**Problem**: Dependencies not installed.

**Solution**:
```bash
pnpm install
```

### Storybook shows no styles

**Problem**: CSS not loaded or build incomplete.

**Solution**:
```bash
# Rebuild everything
pnpm clean
pnpm build
pnpm storybook
```

---

## 🛠️ Tech Stack

- **React 18** - UI library
- **TypeScript 5.6** - Type safety
- **Vite 5** - Build tool
- **Storybook 8** - Component documentation
- **Style Dictionary 4** - Design token pipeline
- **Vitest** - Testing framework
- **pnpm 9** - Package manager
- **Turbo** - Build orchestration

---

## 🧑‍💻 Contributing

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feat/my-feature`
3. **Build design tokens**: `cd packages/design-tokens && pnpm build:tokens`
4. **Make changes and test**: `pnpm test && pnpm storybook`
5. **Commit**: `git commit -m "feat: add my feature"`
6. **Push**: `git push origin feat/my-feature`
7. **Open a Pull Request**

---

## 📝 License

MIT © [Marko Gasic](https://github.com/mgasic)

---

## 🔗 Links

- [GitHub Repository](https://github.com/mgasic/dynui-max)
- [Issue Tracker](https://github.com/mgasic/dynui-max/issues)
- [Changelog](CHANGELOG.md)
- [Contributing Guidelines](CONTRIBUTING.md)

---

## ⭐ Status

**Current Version**: 0.3.0-beta  
**Phase**: Active Development  
**Components**: 29/29 implemented  
**Test Coverage**: In progress  
**Production Ready**: Q1 2026

---

**Built with ❤️ by [Marko Gasic](https://github.com/mgasic)**
