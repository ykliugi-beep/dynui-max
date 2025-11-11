# DynUI-Max Scripts

Collection of automation scripts for component testing, validation, and certification.

## 📋 Quick Reference

### Test Single Component

```bash
# Quick test
./scripts/test-component.sh DynButton

# Or using npm script
pnpm test:component DynButton
```

### Validate Component (Full Check)

```bash
# Comprehensive validation
node scripts/validate-component.js DynButton

# Or using npm script
pnpm validate:component DynButton
```

### Build Component

```bash
# Verify build and exports
./scripts/build-component.sh DynButton

# Or using npm script
pnpm build:component DynButton
```

### Certify All Components

```bash
# Run full certification suite
node scripts/certify-components.js

# Or using npm script
pnpm certify:all
```

---

## 📚 Available Scripts

### `test-component.sh`

**Purpose**: Quick testing of individual components  
**What it tests**:
- ✅ Unit tests
- ✅ Accessibility tests
- ✅ Test coverage
- ✅ Storybook file existence

**Usage**:
```bash
./scripts/test-component.sh DynButton
```

**Exit Codes**:
- `0` - All tests passed
- `1` - One or more tests failed

---

### `build-component.sh`

**Purpose**: Verify component builds and exports correctly  
**What it checks**:
- ✅ TypeScript compilation
- ✅ ESLint validation
- ✅ Package build
- ✅ Component exports

**Usage**:
```bash
./scripts/build-component.sh DynButton
```

**Exit Codes**:
- `0` - Build successful
- `1` - Build or validation failed

---

### `validate-component.js`

**Purpose**: Comprehensive 7-step validation  
**What it validates**:
1. File structure (component, tests, styles)
2. TypeScript type checking
3. ESLint code quality
4. Unit test execution
5. Accessibility test execution
6. Test coverage ≥80%
7. Storybook files existence

**Usage**:
```bash
node scripts/validate-component.js DynButton
```

**Exit Codes**:
- `0` - All validations passed
- `1` - One or more validations failed

---

### `certify-components.js`

**Purpose**: Batch certification of all 29 components  
**What it does**:
- Tests each component sequentially
- Generates certification report
- Tracks pass/fail statistics
- Records timing metrics

**Usage**:
```bash
node scripts/certify-components.js
```

**Output**:
- Console: Progress and summary
- File: `component-certification-report.json`

**Exit Codes**:
- `0` - All components passed
- `1` - One or more components failed

---

## 🎯 Common Use Cases

### Development Workflow

```bash
# 1. Work on component with watch mode
cd packages/core
pnpm vitest "src/components/DynButton" --watch

# 2. Quick test before commit
pnpm test:component DynButton

# 3. Full validation
pnpm validate:component DynButton
```

### Pre-Commit Checklist

```bash
# Test component
pnpm test:component DynButton

# Verify build
pnpm build:component DynButton

# Check Storybook
pnpm storybook
```

### CI/CD Pipeline

```bash
# Certify all components
pnpm certify:all

# Upload report artifact
# (certification report in root: component-certification-report.json)
```

---

## 🔧 Script Permissions

Make scripts executable:

```bash
chmod +x scripts/*.sh
```

---

## 📊 Understanding Reports

### Certification Report Format

```json
{
  "timestamp": "2025-11-11T22:15:00.000Z",
  "total": 29,
  "passed": 27,
  "failed": 2,
  "components": {
    "DynButton": {
      "status": "PASSED",
      "timestamp": "2025-11-11T22:10:00.000Z",
      "duration": "5.23s"
    }
  }
}
```

---

## 🐛 Troubleshooting

### Permission Denied

```bash
# Make scripts executable
chmod +x scripts/*.sh
```

### Module Not Found

```bash
# Install dependencies
pnpm install
```

### Tests Failing

```bash
# Run in watch mode for debugging
cd packages/core
pnpm vitest "src/components/DynButton" --watch
```

---

## 📖 Full Documentation

For detailed documentation, see:
- [Component Testing Guide](../docs/component-testing.md)
- [Component Status Tracker](../COMPONENT_STATUS.md)

---

## ✨ Examples

### Example 1: Test Single Component

```bash
$ pnpm test:component DynButton

🧪 Testing Component: DynButton

1️⃣ Running unit tests...
  ✅ Unit tests passed

2️⃣ Running accessibility tests...
  ✅ A11y tests passed

3️⃣ Checking test coverage...
  ✅ Coverage threshold met (≥80%)

4️⃣ Checking Storybook files...
  ✅ Story file exists

✨ Component DynButton passed all tests!
```

### Example 2: Certify All Components

```bash
$ pnpm certify:all

============================================================
📋 Component Certification Suite
============================================================
Found 29 components to certify

... (testing all components) ...

============================================================
📊 CERTIFICATION SUMMARY
============================================================
Total Components: 29
✅ Passed: 29 (100%)
❌ Failed: 0 (0%)

📄 Full report saved to: component-certification-report.json
```

---

**Happy Testing!** 🧪✨
