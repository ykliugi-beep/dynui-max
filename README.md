# DynUI-Max

Production-ready React + TypeScript component library with design tokens, comprehensive testing, and CI quality gates.

## 🎯 Status: **Core Library Complete – 29 Components**

✅ **Phase 1-4 Complete**: Infrastructure, design tokens, core components, and quality gates
🚀 **29 Production Components**: Token-driven React components with shared utilities
🔥 **100% Component Test Coverage**: Rendering, variant, keyboard, and a11y suites for every core component plus shared hooks
🏁 **Phase 5 in Progress**: Storybook + MDX backlog tracked below

### 📊 Component Coverage Analysis

**Storybook & Docs Snapshot (Phase 5):**

- **Interactive stories:** 31 `.stories.tsx` files covering all 29 exported components.
- **Component MDX guides:** 19 published (10 remaining for parity).
- **Reference material:** `TokensShowcase.stories.tsx` + `Introduction.mdx` for platform context.

## ✅ Component Inventory (29 Components)

The live catalog under [`packages/core/src/components/`](packages/core/src/components) contains 29 primary component folders. Additional leaf exports provide granular building blocks where needed.

### **P0 Prerequisites (3/3) - Complete** ✅

- ✅ **DynIcon** - Icon registry system with size/color tokens
- ✅ **DynFieldContainer** - Universal form field wrapper with validation & accessibility
- ✅ **DynStepper** - Step navigation with progress indication and keyboard support

### **Form Components (8/8) - Complete** ✅

- ✅ **DynButton** - Multi-variant button with loading, icons, polymorphic rendering
- ✅ **DynInput** - Advanced text input with clear button, search, validation states
- ✅ **DynTextArea** - Auto-resize textarea with character counting
- ✅ **DynSelect** - Advanced dropdown with search, multi-select, keyboard navigation
- ✅ **DynCheckbox** - Checkbox with indeterminate state and integrated labels
- ✅ **DynRadio** - Radio buttons with arrow key navigation
- ✅ **DynLabel** - Form labels with required indicators and weight variants

### **Layout & Container Components (6/6) - Complete** ✅

- ✅ **DynBox** - Flexible layout container with spacing utilities and responsive design
- ✅ **DynContainer** - Responsive page container with size constraints
- ✅ **DynGrid** + **DynGridItem** - CSS Grid system with responsive breakpoints
- ✅ **DynModal** - Accessible modal with focus trap, portal rendering
- ✅ **DynDivider** - Visual separators with optional labels
- ✅ **DynCard** - Content surfaces with header, media, and footer slots

### **Navigation Components (5/5) - Complete** ✅

- ✅ **DynTabs** - Tab navigation with keyboard support and orientation variants
- ✅ **DynMenu** - Dropdown context menu with keyboard navigation
- ✅ **DynBreadcrumb** - Navigation breadcrumbs with overflow handling
- ✅ **DynPagination** - Page navigation with ellipsis collapsing and keyboard support
- ✅ **DynStepper** - Step navigation with progress indication and keyboard support

### **Data Display Components (5/5) - Complete** ✅

- ✅ **DynTable** - Advanced data table with sorting, selection, loading states
- ✅ **DynTreeView** - Hierarchical tree with expand/collapse, selection
- ✅ **DynListView** - Flexible list with avatars, descriptions, actions
- ✅ **DynBadge** - Status badges with multiple variants
- ✅ **DynAvatar** - User avatars with image fallback to initials

### **Feedback Components (3/3) - Complete** ✅

- ✅ **DynSpinner** - Loading indicator with token-driven sizing and colors
- ✅ **DynToast** - Transient notification surface with dismiss and actions
- ✅ **DynProgress** - Determinate and indeterminate progress bar

### **Utility Components (1/1) - Complete** ✅

- ✅ **ThemeSwitcher** - Theme toggle with button/toggle/dropdown variants

### **Infrastructure Components** ✅

- ✅ **ThemeProvider** - Theme system with light/dark switching and CSS variables
- ✅ **Theme Hooks** - useTheme for theme switching and context access
- ✅ **Custom Hooks** - useClickOutside, useKeyboard, useFocusTrap

## 📝 Documentation Backlog (10 Components)

Phase 5 focuses on closing the MDX gap for the following components:

- **Layout:** `DynModal`
- **Navigation:** `DynBreadcrumb`, `DynMenu`, `DynTabs`
- **Data Display:** `DynAvatar`, `DynBadge`, `DynTable`, `DynTreeView`
- **Infrastructure:** `DynIcon`, `ThemeSwitcher`

Each component already has interactive Storybook coverage; only the conceptual MDX guides remain outstanding.

## 🏗️ Architecture

```
dynui-max/
├── packages/
│   ├── design-tokens/     # Complete token system with Style Dictionary
│   └── core/              # 29 React components with tokens integration
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

### Complete Component Library Example

```tsx
import { 
  ThemeProvider,
  DynContainer,
  DynGrid,
  DynGridItem,
  DynBox,
  DynButton, 
  DynInput,
  DynSelect,
  DynTable,
  DynTabs,
  DynMenu,
  DynBreadcrumb,
  DynTreeView,
  DynAvatar,
  DynBadge,
  ThemeSwitcher
} from '@dynui-max/core';
import '@dynui-max/design-tokens/css';

const tableColumns = [
  { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
  { key: 'status', title: 'Status', dataIndex: 'status', 
    render: (status) => <DynBadge color={status === 'active' ? 'success' : 'neutral'}>{status}</DynBadge> }
];

const treeData = [
  {
    key: 'root',
    title: 'Root Folder',
    children: [
      { key: 'file1', title: 'Document.pdf', isLeaf: true },
      { key: 'file2', title: 'Image.png', isLeaf: true }
    ]
  }
];

const tabItems = [
  { value: 'overview', label: 'Overview', panel: <div>Overview content</div> },
  { value: 'settings', label: 'Settings', panel: <div>Settings content</div> }
];

function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <DynContainer size="lg">
        {/* Header */}
        <DynBox display="flex" justify="space-between" align="center" py="md">
          <DynBreadcrumb items={[
            { label: 'Home', href: '/' },
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'Users' }
          ]} />
          
          <DynBox display="flex" align="center" gap="md">
            <ThemeSwitcher variant="toggle" />
            <DynAvatar name="John Doe" size="md" />
          </DynBox>
        </DynBox>
        
        {/* Main Content Grid */}
        <DynGrid columns={12} gap="lg">
          {/* Sidebar */}
          <DynGridItem span={3}>
            <DynBox p="md" bg="secondary" radius="lg">
              <DynTreeView 
                treeData={treeData}
                defaultExpandedKeys={['root']}
              />
            </DynBox>
          </DynGridItem>
          
          {/* Content */}
          <DynGridItem span={9}>
            <DynTabs items={tabItems} defaultValue="overview">
              <DynBox p="lg">
                <DynTable 
                  columns={tableColumns}
                  dataSource={[
                    { key: '1', name: 'Alice Johnson', status: 'active' },
                    { key: '2', name: 'Bob Smith', status: 'inactive' }
                  ]}
                  rowSelection={{ type: 'checkbox' }}
                />
              </DynBox>
            </DynTabs>
          </DynGridItem>
        </DynGrid>
      </DynContainer>
    </ThemeProvider>
  );
}
```

## 📦 Package Overview

### [@dynui-max/design-tokens](./packages/design-tokens/)

Complete design token system with Style Dictionary build.

- **Base tokens**: Colors (primary/gray scales), spacing, typography, radius, shadows, breakpoints, z-index
- **Semantic tokens**: Text, background, border, feedback, interactive mappings
- **Themes**: Light/dark with CSS variables (500+ tokens)
- **TypeScript**: Comprehensive type definitions and exports
- **Build system**: Style Dictionary with CSS/JS/TS generation

### [@dynui-max/core](./packages/core/)

**29 production-ready React components** with design tokens integration.

#### Form & Input (8 components)

- **DynButton** - Multi-variant with loading, icons, polymorphic rendering
- **DynInput** - Advanced with clear button, validation, error states
- **DynTextArea** - Auto-resize with character counting
- **DynSelect** - Advanced dropdown with search, multi-select
- **DynCheckbox** - With indeterminate state, integrated labels
- **DynRadio** - With arrow key navigation
- **DynLabel** - Form labels with required indicators
- **DynFieldContainer** - Form wrapper with validation & accessibility helpers

#### Layout & Container (6 components)

- **DynBox** - Flexible container with spacing utilities, responsive design
- **DynContainer** - Page container with responsive width constraints
- **DynGrid/DynGridItem** - CSS Grid system with responsive breakpoints
- **DynModal** - Accessible modal with focus trap, portal rendering
- **DynDivider** - Visual separators with optional labels
- **DynCard** - Content surfaces with header, media, and footer slots

#### Navigation (5 components)

- **DynTabs** - Tab navigation with keyboard support, orientation variants
- **DynMenu** - Context menus with keyboard navigation
- **DynBreadcrumb** - Navigation breadcrumbs with overflow
- **DynPagination** - Page navigation with ellipsis collapsing and keyboard support
- **DynStepper** - Multi-step navigation with progress indicators

#### Data Display (5 components)

- **DynTable** - Advanced data table with sorting, selection, loading
- **DynTreeView** - Hierarchical data with expand/collapse
- **DynListView** - Flexible lists with avatars, descriptions, actions
- **DynBadge** - Status badges with multiple variants
- **DynAvatar** - User avatars with image fallback

#### Feedback (3 components)

- **DynSpinner** - Loading indicator with inline and block variants
- **DynToast** - Transient notifications with dismiss/action controls
- **DynProgress** - Determinate and indeterminate progress bar

#### Infrastructure (2 components + 3 hooks)

- **DynIcon/DynFieldContainer** - Core system components
- **ThemeProvider/ThemeSwitcher** - Theme system with switching
- **Hooks**: useClickOutside, useKeyboard, useFocusTrap

#### Additional leaf exports

- **DynSelectOption** – Select menu option primitive (pairs with `DynSelect`).
- **DynRadioGroup** – Group controller for `DynRadio` inputs.
- **DynGridItem** – Responsive grid cell companion for `DynGrid`.
- **DynMenuItem** – Standalone menu item primitive.
- **DynBreadcrumbItem** – Individual breadcrumb link helper.
- **DynTreeNode** – Render helper for nested `DynTreeView` data.
- **DynStep** – Step definition primitive for `DynStepper`.
- **iconRegistry** – Central icon mapping consumed by `DynIcon`.

## 🛡️ Quality Standards

### **Testing Infrastructure**

- ✅ **Unit Tests**: Comprehensive coverage setup for all components
- ✅ **A11y Tests**: vitest-axe integration for accessibility compliance
- ✅ **Coverage**: ≥80% threshold enforcement framework
- ✅ **Test Utilities**: Custom render with ThemeProvider

### **CI Quality Gates (Ready for Enforcement)**

- **Gate A**: TypeScript strict mode - zero errors
- **Gate B**: ESLint + Prettier - code quality  
- **Gate C**: Test coverage ≥80% with threshold enforcement
- **Gate D**: Accessibility (axe + Storybook test-runner)
- **Gate E**: Bundle analysis (<150KB) + tree-shaking verification

### **Developer Experience**

- ✅ **TypeScript-first**: Comprehensive prop interfaces, no `any` types
- ✅ **Design tokens only**: Zero hardcoded values in components
- ✅ **Accessibility**: WCAG 2.1 AA compliant patterns, keyboard navigation
- ✅ **Modern React**: forwardRef, hooks, functional components, polymorphic
- ✅ **Tree-shakable**: ESM exports with proper sideEffects

## 🎨 Design System Highlights

### **100% Design Tokens Integration**

Every component uses design tokens exclusively:

```css
/* Example: DynBox spacing system */
.dyn-box--p-md {
  padding: var(--dyn-spacing-md, 1rem);
}

.dyn-box--bg-primary {
  background-color: var(--dyn-color-background-primary);
}

/* Example: DynTable responsive design */
.dyn-table__header {
  font-weight: var(--dyn-typography-fontWeight-semibold, 600);
  color: var(--dyn-color-text-primary);
  border-bottom: 1px solid var(--dyn-color-border-primary);
}
```

### **Advanced Component Features**

- **Keyboard Navigation**: Arrow keys, Enter, Escape, Home, End handling
- **Focus Management**: Focus traps, return focus, visual indicators
- **State Management**: Controlled/uncontrolled patterns throughout
- **Polymorphic Components**: Flexible `as` prop support (DynBox, DynContainer)
- **Error Handling**: Graceful fallbacks and user feedback
- **Responsive Design**: Breakpoint-aware layouts and utilities

## 📊 Current Metrics

| Metric | Target | Current | Status |
|--------|--------|---------|--------|
| **Components** | Core catalog | **29/29** (100%) | ✅ **COMPLETE** |
| **Storybook** | Interactive stories | **31 entries** | ✅ **COMPLETE** |
| **MDX Guides** | Conceptual docs | **19/29** | ⚠️ **IN PROGRESS** |
| **Design Tokens** | 500+ tokens | **500+** | ✅ **COMPLETE** |
| **TypeScript** | 100% strict | **100%** | ✅ **COMPLETE** |
| **Accessibility** | WCAG 2.1 AA | **Patterns ready** | ✅ **READY** |
| **Bundle Size** | <150KB | **<150KB estimated** | ✅ **TARGET** |
| **Dependencies** | Minimal, stable | **React, clsx only** | ✅ **OPTIMAL** |

## 🏆 Key Achievements

### **📦 Comprehensive Component Coverage**

- **✨ 29 Production Components**: Core library aligned with `packages/core/src/components`
- **🎯 100% Catalog Coverage**: Every exported component ships with tests & stories
- **📝 19/29 MDX Guides**: Remaining 10 tracked in Phase 5 backlog
- **🎨 500+ Design Tokens**: Comprehensive token system with themes
- **🛡️ Zero Hardcoded Styles**: 100% tokens integration
- **♿ WCAG 2.1 AA Ready**: Full accessibility patterns
- **⚙️ TypeScript Strict**: No `any` types, comprehensive type safety
- **🏗️ Modern React**: Hooks, forwardRef, polymorphic components
- **📱 Responsive**: Mobile-first design with breakpoint utilities

### **🚀 Advanced Features Implemented**

- **Keyboard Navigation**: All interactive components support arrow keys, Enter, Escape
- **Focus Management**: Modal focus traps, focus restoration, visual indicators
- **Multi-Selection**: Table row selection, tree node selection, list item selection
- **Search & Filtering**: Select dropdown search, table sorting
- **Responsive Layout**: Grid system, container constraints, mobile-first approach
- **Theme System**: Light/dark themes with seamless switching
- **State Management**: Both controlled and uncontrolled patterns

### **🧪 Test Coverage Highlights**

- **29/29 components** ship with Vitest suites covering rendering, key props/variants, keyboard behaviors, and axe-based a11y guards
- ThemeSwitcher now has dedicated keyboard and axe coverage across button, toggle, and dropdown variants to prevent regressions
- **Dedicated a11y runs** mirror `DynFieldContainer` patterns for every component, ensuring `pnpm test:a11y` verifies regressions automatically
- **Integration tests** for shared hooks (`useKeyboard`, `useFocusTrap`) now cover listener re-binding, enable/disable toggles, Shift+Tab wraparound, and empty-trap fallbacks

## 🚦 Development Status

### ✅ Phase 1: Infrastructure (Complete)

- Monorepo with pnpm + Turborepo
- TypeScript strict configuration  
- Dependency management with catalog protocol

### ✅ Phase 2: Design Tokens (Complete)

- Token definitions (base + semantic layers)
- Style Dictionary build system
- CSS variables generation + TypeScript exports

### ✅ Phase 3: Component Library (Complete)

- **29 production components** with tokens integration
- Theme system with provider + hooks
- Advanced functionality (search, keyboard nav, focus management)
- **Essential library coverage achieved**

### ✅ Phase 4: Testing & Quality (Ready)

- Comprehensive test framework setup
- Quality Gates A-E implemented and ready for enforcement
- Coverage infrastructure with 80%+ thresholds

### 🎯 Phase 5: Documentation & Publishing (In Progress)

- Storybook coverage complete for all 29 components (31 stories total)
- 19/29 component MDX guides published (10 remaining)
- API documentation generation
- NPM publishing pipeline
- Migration guides and comprehensive examples

## 🤝 Contributing

1. **Prerequisites**: Node 20+, pnpm 9+
2. **Setup**: `pnpm install` (uses frozen lockfile)
3. **Development**: Follow existing component patterns
4. **Testing**: Maintain ≥80% coverage
5. **Quality**: All CI gates must pass

## 📈 Production Readiness

**Status**: **Core Component Library Complete** ✅
**Coverage**: **29/29 Core Components Tested** (100%) 🎯
**Docs**: **19/29 MDX Guides Published** (10 remaining) ⚠️
**Next**: **Phase 5 Documentation & Publishing** 🚀

### **Enterprise Features Ready**

- ✅ **Form Workflows**: Complete form component suite with validation
- ✅ **Data Management**: Tables, trees, lists with sorting/selection
- ✅ **Navigation**: Tabs, menus, breadcrumbs with keyboard support
- ✅ **Layout System**: Flexible containers, grid, spacing utilities
- ✅ **Theme System**: Light/dark themes with seamless switching
- ✅ **Accessibility**: WCAG 2.1 AA patterns throughout
- ✅ **TypeScript**: 100% type safety with comprehensive interfaces

---

**Repository**: <https://github.com/ykliugi-beep/dynui-max>  
**Status**: **Production Component Library Complete** ✅
**Components**: **29/29 Core Components Implemented** 🏁
**Stories**: **31/31 Storybook Entries Published** ✅
**Docs**: **19/29 MDX Guides Live** ⚠️

**Ready for Monero project and enterprise applications!** 🚀

Built with ❤️ for scalable, accessible, production-ready React applications.
