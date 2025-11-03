# Development Guide

## Phase 5: Documentation & Publishing

### Overview
Phase 5 focuses on comprehensive documentation, publishing infrastructure, and community enablement for the DynUI-Max component library.

### Documentation Infrastructure

#### 1. Storybook (Component Documentation)
```bash
# Start Storybook development server
pnpm --filter @dynui-max/storybook dev

# Build Storybook for production
pnpm storybook:build
```

**Features:**
- Interactive component stories for all 36 components
- Design token showcase and examples
- Accessibility testing integration (addon-a11y)
- Theme switching capabilities
- Auto-generated controls from TypeScript props
- Comprehensive usage examples and patterns

#### 2. API Documentation (TypeDoc)
```bash
# Generate API documentation
pnpm docs:api

# Serve locally
pnpm --filter @dynui-max/docs serve
```

**Features:**
- Auto-generated from TypeScript interfaces
- Component prop documentation
- Type definitions and examples
- Source code linking
- Search functionality

#### 3. Interactive Playground
```bash
# Start playground development
pnpm playground

# Build playground for production
pnpm playground:build
```

**Features:**
- Live component testing environment
- Real-world usage examples
- Theme switching demonstration
- Complex component interactions
- Performance testing scenarios

### Publishing Pipeline

#### 1. Semantic Versioning with Changesets
```bash
# Add a changeset for your changes
pnpm changeset

# Apply version updates
pnpm changeset:version

# Publish to NPM
pnpm changeset:publish
```

#### 2. Documentation Deployment
Automatic GitHub Pages deployment on main branch:
- Storybook → `/` (primary docs)
- API docs → `/api`
- Playground → `/playground`

#### 3. NPM Publishing
Automated on git tags:
```bash
# Create and push version tag
git tag v0.3.0
git push origin v0.3.0

# GitHub Actions automatically:
# 1. Runs quality gates
# 2. Builds packages
# 3. Publishes to NPM
```

### Quality Standards for Phase 5

#### Documentation Coverage
- [ ] ✅ Storybook story for every component (36/36)
- [ ] ✅ Usage examples for all major features
- [ ] ✅ Accessibility examples and patterns
- [ ] ✅ Migration guides from dyn-ui
- [ ] API documentation completeness

#### Publishing Checklist
- [ ] ✅ Package.json configurations
- [ ] ✅ Proper semantic versioning
- [ ] ✅ Bundle size verification (<150KB)
- [ ] ✅ Tree-shaking validation
- [ ] NPM publishing permissions
- [ ] GitHub Pages setup

### Development Workflow for Phase 5

#### 1. Story Development
```bash
# Start Storybook in development mode
pnpm storybook

# Create new story file:
# apps/storybook/stories/[Category]/[Component].stories.tsx
```

> **Design token build:** Starting Storybook (including `pnpm --filter @dynui-max/storybook dev`, `pnpm storybook`, `pnpm storybook:build`, or `pnpm storybook:preview`) now triggers a pre-step that runs `pnpm --filter @dynui-max/design-tokens build`. The Vite config aliases the package to `packages/design-tokens/src` while the generated CSS is resolved from `packages/design-tokens/dist/tokens.css`, so this pre-step keeps token variables available without manual intervention. If you run Storybook through another task runner, make sure to execute the same build command beforehand.

**Story Requirements:**
- Default export with meta configuration
- Multiple story variants (basic, with props, interactive)
- Accessibility examples
- Documentation descriptions
- Interactive playground story

#### 2. Documentation Updates
```bash
# Update component documentation
# 1. Add/update TSDoc comments in component files
# 2. Run API docs generation
pnpm docs:api

# 3. Verify generated docs
pnpm --filter @dynui-max/docs serve
```

#### 3. Playground Development
```bash
# Add new playground examples
pnpm playground

# Update playground with new component combinations
# File: apps/playground/src/App.tsx
```

### Deployment Architecture

```
GitHub Pages (ykliugi-beep.github.io/dynui-max/)
├── / (Storybook - Primary documentation)
│   ├── Component stories and examples
│   ├── Design token showcase
│   └── Accessibility testing
├── /api (TypeDoc - API reference)
│   ├── Component prop documentation
│   ├── Type definitions
│   └── Source code links
└── /playground (Interactive demo)
    ├── Live component testing
    ├── Real-world examples
    └── Theme demonstration
```

### Bundle Analysis

#### Size Monitoring
```bash
# Analyze bundle sizes
pnpm size:analyze

# Target constraints:
# - @dynui-max/core: <150KB gzipped
# - @dynui-max/design-tokens: <50KB gzipped
```

#### Tree-shaking Verification
```bash
# Verify tree-shaking works
pnpm build

# Check that unused components are excluded from bundle
# All exports should be ESM with proper sideEffects: false
```

### Performance Metrics

#### Target Metrics for v0.3.0
| Metric | Target | Current Status |
|--------|--------|----------------|
| Bundle Size (core) | <150KB gzipped | ✅ Estimated <150KB |
| Bundle Size (tokens) | <50KB gzipped | ✅ Estimated <50KB |
| Tree-shaking | 100% unused excluded | ✅ ESM exports ready |
| Storybook Build | <5min | ⏳ To be measured |
| API Docs Generation | <2min | ⏳ To be measured |
| Lighthouse Score | 90+ | ⏳ To be measured |

### Community Enablement

#### 1. Documentation Quality
- Clear getting started guides
- Comprehensive API reference
- Migration paths from existing libraries
- Best practices and patterns
- Troubleshooting guides

#### 2. Developer Experience
- Interactive Storybook with controls
- Copy-paste code examples
- TypeScript IntelliSense support
- Helpful error messages
- Clear prop interfaces

#### 3. Accessibility Resources
- WCAG 2.1 AA compliance verification
- Keyboard navigation patterns
- Screen reader testing examples
- Color contrast validation
- Focus management demonstrations

### Next Phase Planning

#### Phase 6: Community & Ecosystem (v0.4.0+)
- Specification anchor: [DynUI Fixed Enhanced Specification](../dynui-fixed-enhanced-specification.md)
- Community feedback integration
- Advanced component variants
- Plugin system for custom components
- Integration examples (Next.js, Vite, etc.)
- Performance optimizations
- Advanced accessibility features

---

**Phase 5 Success Criteria:**
- ✅ Complete Storybook with all 36 components
- ✅ API documentation generation
- ✅ Automated publishing pipeline
- ✅ GitHub Pages deployment
- ⏳ Bundle size verification
- ⏳ NPM publishing
- ⏳ Community feedback integration

**Status**: Phase 5 infrastructure complete, ready for content creation and deployment testing.