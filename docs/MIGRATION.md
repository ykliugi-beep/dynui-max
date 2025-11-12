# Migration Guide to DynUI-Max

## From dyn-ui to DynUI-Max

### Overview

DynUI-Max is a comprehensive rewrite and enhancement of the original dyn-ui library, providing better TypeScript support, accessibility, and design token integration.

### Breaking Changes

#### 1. Design Tokens Integration

**Before (dyn-ui):**

```tsx
// Hardcoded styles
<DynButton style={{ padding: '8px 16px', fontSize: '14px' }}>
  Click me
</DynButton>
```

**After (DynUI-Max):**

```tsx
// Design token system
import '@dynui-max/design-tokens/css';

<DynButton size="md"> {/* Uses --dyn-spacing-* and --dyn-typography-* tokens */}
  Click me
</DynButton>
```

#### 2. Theme Provider Required

**Before (dyn-ui):**

```tsx
// No theme provider needed
<App>
  <DynButton>Click me</DynButton>
</App>
```

**After (DynUI-Max):**

```tsx
// Theme provider required for proper token resolution
import { ThemeProvider } from '@dynui-max/core';

<ThemeProvider defaultTheme="light">
  <App>
    <DynButton>Click me</DynButton>
  </App>
</ThemeProvider>
```

#### 3. Enhanced TypeScript Types

**Before (dyn-ui):**

```tsx
// Loose typing
<DynSelect options={options} onChange={(value: any) => {}} />
```

**After (DynUI-Max):**

```tsx
// Strict typing with generic support
<DynSelect<string>
  options={options}
  onChange={(value: string | string[]) => {}}
/>
```

#### 4. Component API Changes

##### DynSelect

**Before:**

```tsx
<DynSelect
  options={[{ id: 1, text: 'Option 1' }]}
  valueKey="id"
  labelKey="text"
/>
```

**After:**

```tsx
<DynSelect
  options={[{ value: '1', label: 'Option 1' }]}
  // Standardized value/label keys
/>
```

##### DynTable

**Before:**

```tsx
<DynTable
  data={users}
  columns={[
    { field: 'name', header: 'Name' }
  ]}
/>
```

**After:**

```tsx
<DynTable
  dataSource={users}
  columns={[
    { key: 'name', title: 'Name', dataIndex: 'name' }
  ]}
/>
```

### New Features in DynUI-Max

#### 1. Advanced Keyboard Navigation

```tsx
// All interactive components support full keyboard navigation
<DynTabs 
  items={tabs}
  // Arrow keys, Home, End navigation built-in
/>

<DynTreeView 
  treeData={data}
  // Arrow keys for navigation, Enter/Space for selection, etc.
/>
```

#### 2. Enhanced Accessibility

```tsx
// Automatic ARIA attributes and roles
<DynModal
  open={isOpen}
  onClose={handleClose}
  title="Settings" // Automatically sets aria-labelledby
>
  {/* Focus trap and restoration built-in */}
</DynModal>
```

#### 3. Flexible Layout System

```tsx
// New DynBox for flexible layouts
<DynBox 
  display="flex" 
  justify="space-between" 
  align="center"
  p="md" // Design token spacing
  bg="primary" // Semantic color tokens
  radius="lg" // Border radius tokens
>
  Content
</DynBox>

// CSS Grid system
<DynGrid columns={12} gap="lg">
  <DynGridItem span={8}>Main content</DynGridItem>
  <DynGridItem span={4}>Sidebar</DynGridItem>
</DynGrid>
```

#### 4. Theme Switching

```tsx
// Built-in theme switching
<ThemeSwitcher variant="toggle" showLabels />

// Programmatic theme control
const { theme, setTheme } = useTheme();
setTheme('dark');
```

### Migration Steps

#### Step 1: Update Dependencies

```bash
# Remove old dyn-ui
npm uninstall dyn-ui

# Install DynUI-Max
npm install @dynui-max/core @dynui-max/design-tokens
```

#### Step 2: Import Design Tokens

```tsx
// Add to your main CSS or at app root
import '@dynui-max/design-tokens/css';
```

#### Step 3: Add Theme Provider

```tsx
import { ThemeProvider } from '@dynui-max/core';

// Wrap your app
<ThemeProvider defaultTheme="light">
  <App />
</ThemeProvider>
```

#### Step 4: Update Imports

```tsx
// Before
import { DynButton, DynInput } from 'dyn-ui';

// After  
import { DynButton, DynInput } from '@dynui-max/core';
```

#### Step 5: Update Component Props

Refer to the API documentation and Storybook for updated prop interfaces. Most components maintain similar APIs but with enhanced TypeScript types.

### Component Mapping

| dyn-ui | DynUI-Max | Notes |
|--------|-----------|-------|
| `DynButton` | `DynButton` | Enhanced with polymorphic rendering |
| `DynInput` | `DynInput` | Added clear button and search variant |
| `DynSelect` | `DynSelect` + `DynSelectOption` | Improved with search and multi-select |
| `DynTable` | `DynTable` | Enhanced sorting and selection |
| `DynTabs` | `DynTabs` | Added keyboard navigation |
| `DynModal` | `DynModal` | Focus trap and better accessibility |
| `DynTree` | `DynTreeView` + `DynTreeNode` | Split into container and node components |
| `DynBreadcrumb` | `DynBreadcrumb` + `DynBreadcrumbItem` | Enhanced with individual item control |
| _New_ | `DynBox` | Flexible layout container |
| _New_ | `DynGrid` + `DynGridItem` | CSS Grid system |
| _New_ | `ThemeSwitcher` | Built-in theme switching |

### Benefits of Migration

✅ **Better TypeScript Support** - Strict types, no `any` usage  
✅ **Design Token System** - Consistent theming, easy customization  
✅ **Enhanced Accessibility** - WCAG 2.1 AA compliance  
✅ **Modern React Patterns** - Hooks, forwardRef, polymorphic components  
✅ **Better Performance** - Tree-shaking, smaller bundle sizes  
✅ **Theme Switching** - Built-in light/dark mode support  
✅ **Keyboard Navigation** - Full keyboard support across all components  
✅ **Comprehensive Testing** - Better test coverage and quality assurance  

### Support

For migration assistance:

- 📖 Check Storybook examples at [docs URL when deployed]
- 📚 Review API documentation
- 🐛 Open issues on GitHub for specific migration problems

---

**Migration Timeline Recommendation:**

1. **Phase 1**: Update build system and dependencies
2. **Phase 2**: Add theme provider and design token imports
3. **Phase 3**: Update component imports and basic props
4. **Phase 4**: Leverage new features (DynBox, enhanced accessibility)
5. **Phase 5**: Add theme switching and advanced functionality
