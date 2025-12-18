# Storybook Development Guide

## 🚀 Quick Start

### IF IT'S BROKEN (Current Situation)

Run this **FIRST** to completely reset everything:

```bash
# Full reset and rebuild
pnpm clean
rm -rf node_modules
pnpm install
pnpm --filter @dynui-max/design-tokens build
pnpm --filter @dynui-max/core build
pnpm storybook
```

**This will:**
1. ✅ Delete all build artifacts
2. ✅ Reinstall all dependencies
3. ✅ Rebuild design tokens (critical!)
4. ✅ Rebuild core components
5. ✅ Start Storybook with clean cache

---

### From Root Folder (Recommended - Normal Case)

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

### From Storybook Folder (Legacy - NOT RECOMMENDED)

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
4. ❌ Storybook cache is stale

### Solution: Proper Build Sequence

```bash
# ✅ CORRECT - Does everything automatically
pnpm storybook

# ✅ Also correct - Explicit full reset
pnpm clean && pnpm install && pnpm storybook

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

## 📁 Workspace Structure

```
dynui-max/
├─ packages/
│  ├─ design-tokens/          # ⚙️ Must build first!
│  │  ├─ src/
│  │  ├─ dist/               # Generated tokens, CSS, JS
│  │  └─ build/
│  └─ core/                  # React components
│     ├─ src/
│     └─ dist/
├─ apps/
│  └─ storybook/             # 📚 Storybook app
│     ├─ stories/            # Story files (need React imports)
│     ├─ .storybook/         # Storybook config
│     └─ package.json
└─ package.json               # Root config (has dev:storybook script)
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

**Fix #1 - Check Story File:**
```typescript
// Add this to the top of story file
import React from 'react';
```

**Fix #2 - Reset Everything:**
```bash
pnpm clean
pnpm install
pnpm storybook
```

**Fix #3 - Full Nuclear Option:**
```bash
rm -rf node_modules pnpm-lock.yaml
pnpm install
pnpm --filter @dynui-max/design-tokens build
pnpm storybook
```

### "Cannot find module '@dynui-max/core'"

**Cause:** Dependencies not installed or build failed

**Fix:**
```bash
pnpm install
pnpm --filter @dynui-max/design-tokens build
pnpm --filter @dynui-max/core build
pnpm storybook
```

### Storybook Takes Forever to Load

**Cause:** Design tokens not pre-built, Vite cache issues

**Fix:**
```bash
# Option 1: Use the optimized script
pnpm dev:storybook

# Option 2: Manual rebuild
pnpm clean
pnpm --filter @dynui-max/design-tokens build
pnpm storybook
```

### Changes Not Reflecting

**Cause:** Need to rebuild design tokens or Storybook cache is stale

**Fix:**
```bash
# Option 1: Restart Storybook (Ctrl+C, then run again)
pnpm storybook

# Option 2: If design tokens changed
pnpm --filter @dynui-max/design-tokens build
pnpm storybook

# Option 3: Full reset
pnpm clean:artifacts
pnpm install
pnpm storybook
```

### Components Still Don't Render

**Cause:** Multiple potential issues

**Fix - Complete Reset:**
```bash
# Nuclear option - clean everything
pnpm clean
rm -rf node_modules .pnpm-store
pnpm install
pnpm --filter @dynui-max/design-tokens build
pnpm --filter @dynui-max/core build
pnpm storybook
```

Then open `http://localhost:6006` and clear browser cache (Ctrl+Shift+Delete)

---

## 📈 Performance Tips

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

4. **Clear cache if stuck:**
   ```bash
   rm -rf apps/storybook/.storybook-cache
   pnpm storybook
   ```

---

## 🎯 Next Steps

### If Components Still Don't Load:

1. **Run complete reset:**
   ```bash
   pnpm clean
   pnpm install  
   pnpm --filter @dynui-max/design-tokens build
   pnpm --filter @dynui-max/core build
   pnpm storybook
   ```

2. **Wait for Storybook to fully start** (watch the console)

3. **Open browser:** `http://localhost:6006`

4. **Clear browser cache:** `Ctrl+Shift+Delete` → Clear all

5. **Reload page:** `Ctrl+F5`

6. **Check Stories tab** - all components should load without errors

---

## ✨ Success Indicators

✅ Storybook console shows NO errors
✅ Browser console shows NO "React is not defined" errors  
✅ Components appear in the Stories sidebar
✅ Clicking a component shows it renders properly
✅ No error messages in the main panel

**Happy coding! 🚀**
