# 🚀 Build Design Tokens Locally

**IMPORTANT**: Design token CSS files are **NOT committed to git** (dist/ is in .gitignore).  
You **MUST build them locally** before running Storybook.

---

## Quick Start (2 minutes)

```bash
# From project root
cd packages/design-tokens

# Build tokens (generates CSS, JS, JSON)
pnpm build:tokens

# Verify files were created
ls -lh dist/

# You should see:
# - tokens.css (light theme)
# - tokens-dark.css (dark theme)  
# - variables.css (all variables)
# - tokens.js (JavaScript export)
# - tokens.json (flat JSON)
# - tokens-nested.json (nested JSON)
```

---

## If You Get "[vite] Failed to resolve import" Error

**Error**:
```
[vite] Internal server error: Failed to resolve import 
"@dynui-max/design-tokens/dist/tokens.css" 
from ".storybook/preview.tsx". Does the file exist?
```

**Solution**:
```bash
# 1. Build tokens first
cd packages/design-tokens
pnpm build:tokens

# 2. Verify CSS exists
cat dist/tokens.css | head -10

# Should show CSS variables like:
# :root {
#   --dyn-color-primary-500: #3b82f6;
#   ...
# }

# 3. Now run Storybook
cd ../../
pnpm storybook
```

---

## Full Build (TypeScript + CSS)

If you want to build everything (CSS + TypeScript types):

```bash
cd packages/design-tokens
pnpm build  # Runs: build:tokens + build:js + build:types
```

---

## Automated Build (CI/CD)

The GitHub Actions workflow `.github/workflows/build-design-tokens.yml` automatically:

1. Builds tokens on every push to `packages/design-tokens/`
2. Verifies CSS files are created
3. Uploads build artifacts
4. Comments on PRs with build status

**You don't need to commit dist/ files** - CI/CD handles it.

---

## Troubleshooting

### Problem: "Cannot find module 'style-dictionary'"

**Solution**:
```bash
pnpm install  # Install all dependencies
```

### Problem: "build.js not found"

**Solution**:
```bash
# Make sure you're in the right directory
cd packages/design-tokens
pwd  # Should show: .../dynui-max/packages/design-tokens
ls build/build.js  # Should exist
```

### Problem: "dist/ folder is empty after build"

**Solution**:
```bash
# Check build output for errors
pnpm build:tokens 2>&1 | tee build.log
cat build.log  # Look for errors

# Check if token source files exist
ls -la src/tokens/*.json
```

### Problem: "CSS has no variables"

**Solution**:
```bash
# Check token source files
cat src/tokens/base.json | head -20

# Rebuild
pnpm clean && pnpm build:tokens

# Verify variables
grep --dyn- dist/tokens.css | head -5
```

---

## What Gets Generated?

### tokens.css (Light Theme)
```css
:root {
  /* Colors */
  --dyn-color-primary-50: #eff6ff;
  --dyn-color-primary-500: #3b82f6;
  --dyn-color-primary-900: #1e3a8a;
  
  /* Spacing */
  --dyn-spacing-xs: 0.25rem;
  --dyn-spacing-md: 1rem;
  --dyn-spacing-xl: 2rem;
  
  /* Typography */
  --dyn-font-size-base: 1rem;
  --dyn-font-weight-medium: 500;
  --dyn-line-height-normal: 1.5;
  
  /* ... ~200+ variables */
}
```

### tokens-dark.css (Dark Theme)
```css
[data-theme="dark"] {
  /* Inverted color palette */
  --dyn-color-neutral-50: #1f2937;
  --dyn-color-neutral-900: #f9fafb;
  /* ... */
}
```

### tokens.js (JavaScript Export)
```javascript
export const tokens = {
  color: {
    primary: {
      50: '#eff6ff',
      500: '#3b82f6',
      900: '#1e3a8a'
    }
  },
  spacing: {
    xs: '0.25rem',
    md: '1rem'
  }
  // ...
};
```

---

## Integration with Components

**Before** (hardcoded):
```typescript
const Button = styled.button`
  background-color: #3b82f6;  /* ❌ Hardcoded */
  padding: 16px;              /* ❌ Hardcoded */
`;
```

**After** (using tokens):
```typescript
const Button = styled.button`
  background-color: var(--dyn-color-primary-500);  /* ✅ Token */
  padding: var(--dyn-spacing-md);                  /* ✅ Token */
`;
```

---

## When to Rebuild?

Rebuild tokens when:

- ✅ You modified `src/tokens/*.json`
- ✅ You pulled latest changes from git
- ✅ You switched branches
- ✅ Storybook shows "Failed to resolve import" error
- ✅ After `pnpm install` (first time setup)

**Pro Tip**: Add to your workflow:
```bash
# After git pull
git pull && cd packages/design-tokens && pnpm build:tokens && cd ../..
```

---

## Development Workflow

```bash
# 1. Setup (first time only)
pnpm install
cd packages/design-tokens
pnpm build

# 2. Make changes to tokens
# Edit: src/tokens/base.json or semantic.json

# 3. Rebuild
pnpm build:tokens

# 4. Test in Storybook
cd ../../
pnpm storybook

# 5. Verify changes
# Open http://localhost:6006
# Inspect elements → Check CSS variables
```

---

## CI/CD Integration

In your CI/CD pipeline, always build tokens before Storybook:

```yaml
# .github/workflows/your-workflow.yml
- name: Build design tokens
  run: |
    cd packages/design-tokens
    pnpm build:tokens

- name: Build Storybook
  run: pnpm build:storybook
```

---

## FAQ

**Q: Why aren't CSS files committed to git?**  
A: Generated files should not be in version control. They're built from source (`src/tokens/*.json`).

**Q: Do I need to rebuild after every change?**  
A: Yes, if you modify token definitions. Otherwise, changes won't appear.

**Q: Can I use `pnpm dev` for auto-rebuild?**  
A: Yes! `pnpm dev` watches for changes and rebuilds automatically.

**Q: What if build fails in CI?**  
A: Check the GitHub Actions logs. Usually missing dependencies or syntax errors in token JSON.

---

✅ **You're all set!** Now run `pnpm build:tokens` and start developing.

For detailed documentation, see:
- [BUILD_INSTRUCTIONS.md](packages/design-tokens/BUILD_INSTRUCTIONS.md)
- [DESIGN_TOKENS_INTEGRATION.md](DESIGN_TOKENS_INTEGRATION.md)
