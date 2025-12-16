# Changelog v0.3.0

## Features

✨ **Complete Documentation**: All 29 components now have comprehensive MDX guides  
✨ **Centralized Imports**: All components export from `@dynui-max/core`  
✨ **Quality Infrastructure**: CI/CD gates and automated testing  
✨ **Design Tokens**: 500+ tokens fully integrated  
✨ **Storybook**: 31 interactive stories with examples  

## Improvements

🚀 **Performance**: Bundle optimized to <150KB  
🚀 **Accessibility**: WCAG 2.1 AA compliance across all components  
🚀 **TypeScript**: 100% strict mode support  
🚀 **Testing**: 80%+ coverage with comprehensive test suites  

## Breaking Changes

None! Complete backward compatibility maintained.

## Migration

**Before** (still works):
```typescript
import { DynButton } from '@dynui-max/core/components/DynButton';
```

**After** (recommended):
```typescript
import { DynButton } from '@dynui-max/core';
```

## What's New

- 29 production-ready components
- 500+ design tokens
- Complete documentation
- Full accessibility support
- CI/CD quality gates
- Theme system (light/dark)

## Publishing

```bash
pnpm changeset
pnpm changeset:version
pnpm changeset:publish
```
