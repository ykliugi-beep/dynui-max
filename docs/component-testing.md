# Per-Component Testing Guide

## 🎯 Overview

This guide explains how to test, validate, and certify individual components in the DynUI-Max library using our per-component testing infrastructure.

## 🛠️ Available Tools

### 1. `test-component.sh` - Quick Component Testing

**Purpose**: Run all tests for a single component  
**Usage**: `./scripts/test-component.sh <ComponentName>`

**What it does**:
- ✅ Runs unit tests
- ✅ Runs accessibility (a11y) tests
- ✅ Checks test coverage
- ✅ Verifies Storybook files exist

**Example**:
```bash
# Test DynButton
./scripts/test-component.sh DynButton

# Test DynInput
./scripts/test-component.sh DynInput
```

**Expected Output**:
```
🧪 Testing Component: DynButton

1️⃣ Running unit tests...
  ✅ Unit tests passed

2️⃣ Running accessibility tests...
  ✅ A11y tests passed

3️⃣ Checking test coverage...
  ✅ Coverage threshold met (≥80%)

4️⃣ Checking Storybook files...
  ✅ Story file exists
  ✅ MDX documentation exists

============================================================
📊 Test Summary for DynButton:
============================================================
  ✅ Unit Tests
  ✅ A11y Tests
  ✅ Coverage ≥80%
  ✅ Storybook Story
============================================================

✨ Component DynButton passed all tests!
```

---

### 2. `build-component.sh` - Component Build Verification

**Purpose**: Validate that a component builds and exports correctly  
**Usage**: `./scripts/build-component.sh <ComponentName>`

**What it does**:
- ✅ Type checks the component
- ✅ Lints the component files
- ✅ Builds the entire package
- ✅ Verifies component is properly exported

**Example**:
```bash
# Build and verify DynButton
./scripts/build-component.sh DynButton
```

**Expected Output**:
```
🔨 Building Component: DynButton

1️⃣ Type checking...
  ✅ TypeScript check passed

2️⃣ Linting component files...
  ✅ Linting passed

3️⃣ Building package...
  ✅ Build successful

4️⃣ Verifying component exports...
  ✅ Component DynButton exported successfully

============================================================
📊 Build Summary for DynButton:
============================================================
  ✅ TypeScript
  ✅ Linting
  ✅ Build
  ✅ Exports
============================================================

✨ Component DynButton built successfully!
```

---

### 3. `validate-component.js` - Comprehensive Validation

**Purpose**: Full validation including file structure, tests, and Storybook  
**Usage**: `node scripts/validate-component.js <ComponentName>`

**What it does**:
- ✅ Checks file structure (component, tests, styles, exports)
- ✅ TypeScript type checking
- ✅ ESLint validation
- ✅ Unit tests
- ✅ Accessibility tests
- ✅ Coverage validation
- ✅ Storybook file verification

**Example**:
```bash
# Full validation of DynButton
node scripts/validate-component.js DynButton
```

**Expected Output**:
```
🔍 Validating Component: DynButton

📁 Step 1/7: Checking file structure...
  ✅ Component: Found
  ✅ Styles: Found
  ✅ Unit Tests: Found
  ✅ A11y Tests: Found
  ✅ Export: Found

📝 Step 2/7: Running TypeScript type check...
  ✅ TypeScript check passed

🔍 Step 3/7: Running ESLint...
  ✅ Linting passed

🧪 Step 4/7: Running unit tests...
  ✅ Unit tests passed

♿ Step 5/7: Running accessibility tests...
  ✅ A11y tests passed

📊 Step 6/7: Checking test coverage...
  ✅ Coverage threshold met (≥80%)

📖 Step 7/7: Checking Storybook files...
  ✅ Storybook story exists
  ✅ MDX documentation exists

============================================================
✨ Component DynButton validation complete!
============================================================

📋 Validation Summary:
  ✅ File structure
  ✅ TypeScript
  ✅ Linting
  ✅ Unit tests
  ✅ A11y tests
  ✅ Coverage
  ✅ Storybook files

🎉 Component is production-ready!
```

---

### 4. `certify-components.js` - Batch Certification

**Purpose**: Certify all components in the library  
**Usage**: `node scripts/certify-components.js`

**What it does**:
- ✅ Tests all 29 components sequentially
- ✅ Generates certification report
- ✅ Tracks passed/failed components
- ✅ Provides detailed timing metrics

**Example**:
```bash
# Certify all components
node scripts/certify-components.js
```

**Expected Output**:
```
============================================================
📋 Component Certification Suite
============================================================
Found 29 components to certify

============================================================
Testing 1/29: DynAvatar
============================================================
... (test output) ...
✅ DynAvatar certified (5.23s)

============================================================
Testing 2/29: DynBadge
============================================================
... (test output) ...
✅ DynBadge certified (4.87s)

... (continues for all 29 components) ...

============================================================
📊 CERTIFICATION SUMMARY
============================================================
Total Components: 29
✅ Passed: 27 (93.1%)
❌ Failed: 2 (6.9%)

📄 Full report saved to: component-certification-report.json
============================================================

⚠️  Some components failed certification. Run individual tests for details:
   ./scripts/test-component.sh DynModal
   ./scripts/test-component.sh DynTreeView
```

**Report Format** (`component-certification-report.json`):
```json
{
  "timestamp": "2025-11-11T22:15:00.000Z",
  "total": 29,
  "passed": 27,
  "failed": 2,
  "skipped": 0,
  "components": {
    "DynButton": {
      "status": "PASSED",
      "timestamp": "2025-11-11T22:10:00.000Z",
      "duration": "5.23s"
    },
    "DynModal": {
      "status": "FAILED",
      "timestamp": "2025-11-11T22:12:00.000Z",
      "duration": "3.45s",
      "error": "Unit tests failed"
    }
  }
}
```

---

## 📝 Usage Patterns

### Development Workflow

```bash
# 1. Work on component with watch mode
cd packages/core
pnpm vitest "src/components/DynButton" --watch

# 2. Quick test before committing
./scripts/test-component.sh DynButton

# 3. Full validation
node scripts/validate-component.js DynButton

# 4. Build verification
./scripts/build-component.sh DynButton
```

### Pre-Commit Checklist

```bash
# For component you modified (e.g., DynButton):

# 1. Run component tests
./scripts/test-component.sh DynButton

# 2. Verify build
./scripts/build-component.sh DynButton

# 3. Check Storybook
cd apps/storybook
pnpm storybook
# Manually verify DynButton stories
```

### CI/CD Integration

```bash
# In GitHub Actions workflow:

# Option 1: Test specific component
- name: Test DynButton
  run: ./scripts/test-component.sh DynButton

# Option 2: Certify all components
- name: Certify All Components
  run: node scripts/certify-components.js

# Option 3: Upload certification report
- name: Upload Report
  uses: actions/upload-artifact@v3
  with:
    name: certification-report
    path: component-certification-report.json
```

---

## 🔧 Troubleshooting

### Test Failures

**Problem**: Unit tests fail  
**Solution**:
```bash
# Run tests in watch mode to debug
cd packages/core
pnpm vitest "src/components/DynButton" --watch

# Check test file directly
cat src/components/DynButton/DynButton.test.tsx
```

**Problem**: A11y tests fail  
**Solution**:
```bash
# Run a11y tests separately
cd packages/core
pnpm vitest run --config vitest.a11y.config.ts "src/components/DynButton"

# Check for common issues:
# - Missing aria labels
# - Invalid ARIA attributes
# - Color contrast issues
```

**Problem**: Coverage below 80%  
**Solution**:
```bash
# Check coverage report
cd packages/core
pnpm vitest run --coverage "src/components/DynButton"

# Open HTML report
open coverage/index.html

# Add missing test cases for uncovered lines
```

**Problem**: Storybook story missing  
**Solution**:
```bash
# Check if story exists
find apps/storybook/stories -name "DynButton.stories.tsx"

# If missing, create story:
touch apps/storybook/stories/Form/DynButton.stories.tsx
```

---

## 📊 Component Certification Criteria

For a component to be **certified**, it must:

### ✅ Required Checks

1. **File Structure**
   - `ComponentName.tsx` exists
   - `ComponentName.css` exists
   - `ComponentName.test.tsx` exists
   - `ComponentName.a11y.test.tsx` exists
   - `index.ts` exists

2. **Quality Gates**
   - TypeScript: Zero type errors
   - ESLint: Zero linting errors
   - Unit Tests: All passing
   - A11y Tests: Zero violations
   - Coverage: ≥80% (statements, branches, functions, lines)

3. **Build & Export**
   - Component builds successfully
   - Component is properly exported from package

4. **Documentation**
   - Storybook `.stories.tsx` file exists
   - MDX documentation (optional but recommended)

---

## 🚀 Best Practices

### 1. Test Component in Isolation

```bash
# Don't run all tests when working on one component
# BAD:
pnpm test

# GOOD:
./scripts/test-component.sh DynButton
```

### 2. Use Watch Mode During Development

```bash
# Keep tests running while you code
cd packages/core
pnpm vitest "src/components/DynButton" --watch
```

### 3. Validate Before Committing

```bash
# Always validate before pushing
node scripts/validate-component.js DynButton
```

### 4. Track Certification Progress

```bash
# Update COMPONENT_STATUS.md after certification
node scripts/certify-components.js
# Then manually update COMPONENT_STATUS.md with results
```

### 5. Run Full Suite Periodically

```bash
# Weekly or before major releases
node scripts/certify-components.js
```

---

## 📅 Next Steps

1. **Start with Tier 1 components**:
   ```bash
   ./scripts/test-component.sh DynButton
   ./scripts/test-component.sh DynInput
   ./scripts/test-component.sh DynIcon
   ./scripts/test-component.sh DynFieldContainer
   ```

2. **Fix any failing tests**

3. **Run full certification**:
   ```bash
   node scripts/certify-components.js
   ```

4. **Update `COMPONENT_STATUS.md`** with results

5. **Repeat for all 29 components** until 100% certified

---

## 📚 Additional Resources

- [Vitest Documentation](https://vitest.dev/)
- [Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [vitest-axe](https://github.com/chaance/vitest-axe)
- [Storybook Testing](https://storybook.js.org/docs/react/writing-tests/introduction)

---

**Happy Testing!** 🧪✨
