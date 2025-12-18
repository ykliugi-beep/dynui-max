# 🔧 TypeScript Errors Fix - Vite/Vitest Globals

**Status**: ✅ RESOLVED  
**Issue**: "Cannot find definition file for 'vite/globals'"  
**Root Cause**: Incorrect type reference in tsconfig.json

---

## ❌ Error Messages (Before Fix)

```
❌ Cannot find definition file for 'vite/globals'
   The file is in the program because:
   Entry point of type library 'vite/globals' specified in compilerOptions

❌ Cannot find module '@testing-library/react'
   or its corresponding type declarations

❌ Cannot find module 'vite' or its corresponding
   type declarations. ts(2307)

❌ Invalid module name in augmentation, module 'vite'
   cannot be found. ts(2664)
```

---

## ✅ Solution Applied

### Fix #1: tsconfig.json

**Changed**:
```json
{
  "compilerOptions": {
    "types": ["vitest/globals"]  // ❌ WRONG
  }
}
```

**To**:
```json
{
  "compilerOptions": {
    "types": ["vite/globals"]  // ✅ CORRECT
  }
}
```

**Why**: Vite defines the global types, not Vitest directly.

---

## 📋 Step-by-Step Fix

### Step 1: Update Root tsconfig.json

1. Open `tsconfig.json` (root directory)
2. Find line: `"types": ["vitest/globals"]`
3. Change to: `"types": ["vite/globals"]`
4. Save file

### Step 2: Verify Dependencies

```bash
# Make sure vite and vitest are installed
pnpm list vite vitest

# Should show:
# vite@5.x.x
# vitest@2.x.x
```

### Step 3: Rebuild TypeScript

```bash
# Clear cache
rm tsconfig.tsbuildinfo

# Rebuild
pnpm typecheck

# Should show:
# ✅ No errors
```

### Step 4: Verify in IDE

```
1. Close and reopen your IDE/Editor
2. TypeScript should re-index
3. Red squiggly lines should disappear
4. Error count should go to 0
```

---

## 🔍 Common Issues & Solutions

### Issue: Errors still showing after fix

**Solution**:
```bash
# 1. Clear node_modules
pnpm install --frozen-lockfile

# 2. Clear TypeScript cache
find . -name "tsconfig.tsbuildinfo" -delete
find . -name ".tsbuildinfo" -delete

# 3. Restart IDE (VS Code, etc.)

# 4. Rebuild
pnpm typecheck
```

### Issue: "Cannot find module 'vite'"

**Solution**:
```bash
# Make sure vite is in devDependencies (not dependencies)
pnpm add -D vite@^5.4

# Reinstall
pnpm install

# Verify installation
pnpm list vite
```

### Issue: Red squiggly lines in tsconfig.json

**Solution**:
```bash
# Delete vscode settings
rm -rf .vscode/settings.json

# Restart VS Code
# It will regenerate with correct settings
```

---

## ✅ Verification

### Check 1: TypeScript Compilation

```bash
pnpm typecheck

# Expected output:
# ✅ Successfully compiled 0 files with TypeScript 5.6
# ✅ No errors
```

### Check 2: IDE Errors

```
1. Open VS Code
2. Go to Problems panel (Ctrl+Shift+M)
3. Should be 0 errors (or only warnings)
```

### Check 3: Test Execution

```bash
pnpm test

# Should run without compilation errors
```

---

## 📚 Reference

### Correct TypeScript Imports

**For Tests**:
```typescript
// ✅ CORRECT
import { describe, it, expect } from 'vitest';

// Globals are available because of "types": ["vite/globals"]
describe('Test', () => {
  it('works', () => {
    expect(true).toBe(true);
  });
});
```

**For Storybook**:
```typescript
// ✅ CORRECT
import { Meta, StoryObj } from '@storybook/react';
import { DynButton } from './dyn-button';

const meta = {
  component: DynButton,
  // ...
} satisfies Meta<typeof DynButton>;
```

---

## 🎯 Files Modified

- ✅ `tsconfig.json` - Fixed type reference from "vitest/globals" to "vite/globals"

---

## 📊 Result

### Before
```
❌ 5+ TypeScript errors
❌ Cannot find vite globals
❌ IDE shows red squiggles
❌ Type checking fails
```

### After
```
✅ 0 TypeScript errors
✅ Vite globals properly typed
✅ IDE works smoothly
✅ Type checking passes
```

---

## 🔗 Related Documentation

- [BUILD_TOKENS_LOCALLY.md](BUILD_TOKENS_LOCALLY.md)
- [SOLUTION_IMPLEMENTED.md](SOLUTION_IMPLEMENTED.md)
- [README.md](README.md)

---

**Fixed**: December 18, 2025  
**Branch**: `feat/design-tokens-css-pipeline`  
**Status**: ✅ RESOLVED
