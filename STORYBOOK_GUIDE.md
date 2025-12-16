# Storybook Development Guide

## 🚀 Quick Start

### From Root Folder (Recommended)

```bash
# Start Storybook with optimized build order
pnpm storybook

# Or explicitly:
pnpm dev:storybook
```

**What happens:**
1. ✅ Design tokens are built first (`design-tokens` package)
2. ✅ Storybook starts on `http://localhost:6006`
3. ✅ All components are properly imported and styled

### From Storybook Folder (Legacy)

```bash
cd apps/storybook
pnpm dev
```

**Note:** This requires that `design-tokens` is already built!

---

## 🔧 Build Order is Critical

### Problem: "React is not defined"

This error occurs when:
1. ❌ `design-tokens` package hasn't been built
2. ❌ Story files are missing `React` import
3. ❌ Build order is incorrect

### Solution: Proper Build Sequence

```bash
# ✅ CORRECT - Does everything automatically
pnpm storybook

# ❌ WRONG - Skips design-tokens build
cd apps/storybook && pnpm dev

# ❌ WRONG - Partial build
pnpm --filter @dynui-max/storybook run dev
```

---

## 📝 Story Files Format

### Must Have React Import

All story files with `render()` functions **MUST** include React import:

```typescript
// ✅ CORRECT
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { DynButton } from '@dynui-max/core';

// If using hooks in render function:
import React, { useState } from 'react';
```

```typescript
// ❌ WRONG - Missing React import
import type { Meta, StoryObj } from '@storybook/react';
import { DynButton } from '@dynui-max/core';
// React is undefined!
```

### When Render Functions Need React

```typescript
// ✅ Needs React import
export const MyStory: Story = {
  render: () => (
    <div style={{ display: 'flex' }}>
      <DynButton>Click me</DynButton>
    </div>
  ),
};

// ✅ Needs React import (has hooks)
export const Interactive: Story = {
  render: () => {
    const [state, setState] = useState(false);
    return <DynButton onClick={() => setState(!state)}>Toggle</DynButton>;
  },
};

// ✅ Usually OK (but include React anyway for consistency)
export const Simple: Story = {
  args: {
    children: 'Button',
  },
};
```

---

## 📂 Workspace Structure

```
dynui-max/
├── packages/
│   ├── design-tokens/          # ⚙️ Must build first!
│   │   ├── src/
│   │   ├── dist/              # Generated tokens, CSS, JS
│   │   └── build/
│   └── core/                  # React components
│       ├── src/
│       └── dist/
├── apps/
│   └── storybook/             # 📚 Storybook app
│       ├── stories/           # Story files (need React imports)
│       ├── .storybook/        # Storybook config
│       └── package.json
└── package.json               # Root config (has dev:storybook script)
```

---

## ✅ All Story Files Fixed

The following files now have proper React imports:

### Form Stories
- ✅ `Form/DynButton.stories.tsx`
- ✅ `Form/DynInput.stories.tsx`
- ✅ `Form/DynRadio.stories.tsx`
- ✅ `Form/DynSelect.stories.tsx`
- ✅ `Form/DynTextArea.stories.tsx`
- ✅ `Form/DynFieldContainer.stories.tsx`
- ✅ `Form/DynLabel.stories.tsx`
- ✅ `Form/DynCheckbox.stories.tsx` (pre-existing)

### Layout Stories
- ✅ `Layout/DynGrid.stories.tsx`
- ✅ `Layout/DynModal.stories.tsx`
- ✅ `Layout/DynCard.stories.tsx`
- ✅ `Layout/DynContainer.stories.tsx`
- ✅ `Layout/DynDivider.stories.tsx`
- ✅ `Layout/DynBox.stories.tsx` (pre-existing)

### Data Stories
- ✅ `Data/DynAvatar.stories.tsx`
- ✅ `Data/DynTable.stories.tsx`
- ✅ `Data/DynListView.stories.tsx`
- ✅ `Data/DynTreeView.stories.tsx`
- ✅ `Data/DynBadge.stories.tsx`

### Navigation Stories
- ✅ `Navigation/DynStepper.stories.tsx`
- ✅ `Navigation/DynTabs.stories.tsx`
- ✅ `Navigation/DynPagination.stories.tsx`
- ✅ `Navigation/DynBreadcrumb.stories.tsx`
- ✅ `Navigation/DynMenu.stories.tsx`

### Feedback Stories
- ✅ `Feedback/DynProgress.stories.tsx`
- ✅ `Feedback/DynSpinner.stories.tsx`
- ✅ `Feedback/DynToast.stories.tsx`

### Infrastructure Stories
- ✅ `Infrastructure/ThemeSwitcher.stories.tsx`
- ✅ `Infrastructure/DynIcon.stories.tsx`

---

## 🛠️ Available Commands

```bash
# Development
pnpm storybook              # Start Storybook (recommended)
pnpm dev:storybook         # Explicit optimized build
pnpm dev                   # Start both core and storybook

# Building
pnpm storybook:build       # Build Storybook static site
pnpm build                 # Full monorepo build

# Quality
pnpm typecheck             # Check TypeScript types
pnpm lint                  # Run ESLint
pnpm lint:fix              # Fix linting issues
pnpm test                  # Run tests
pnpm format                # Format code with Prettier

# Cleanup
pnpm clean                 # Clean all dist folders
pnpm reset                 # Reset node_modules
pnpm reset:full            # Full clean build
```

---

## 🐛 Troubleshooting

### "React is not defined" Error

**Cause:** Story file missing `React` import or design-tokens not built

**Fix:**
```typescript
// Add this to the top of story file
import React from 'react';
```

Then restart:
```bash
pnpm storybook
```

### "Cannot find module '@dynui-max/core'"

**Cause:** Dependencies not installed

**Fix:**
```bash
pnpm install
pnpm storybook
```

### Storybook Takes Forever to Load

**Cause:** Design tokens not pre-built

**Fix:**
```bash
# Use the optimized script
pnpm dev:storybook

# NOT this:
cd apps/storybook && pnpm dev
```

### Changes Not Reflecting

**Cause:** Need to rebuild design tokens

**Fix:**
```bash
pnpm clean
pnpm storybook
```

---

## 📊 Performance Tips

1. **Always start from root folder:**
   ```bash
   pnpm storybook  # 1 command, proper build order
   ```

2. **Keep design-tokens in sync:**
   ```bash
   # If you modify tokens, rebuild them:
   pnpm --filter @dynui-max/design-tokens build
   ```

3. **Use workspace scripts:**
   ```bash
   # Good
   pnpm dev:storybook
   
   # Also good
   pnpm storybook
   
   # Avoid
   cd apps/storybook && npm start
   ```

---

## 🎯 Next Steps

- ✅ Start Storybook: `pnpm storybook`
- ✅ Open: `http://localhost:6006`
- ✅ All components should render properly
- ✅ No more "React is not defined" errors

**Happy coding! 🚀**
