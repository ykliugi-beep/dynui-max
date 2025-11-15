# @dynui-max/docs

TypeDoc Markdown documentation generator for DynUI-Max component library.

## 🎯 Overview

This package generates comprehensive API documentation from TypeScript source code using TypeDoc with the markdown plugin. The output is **ESM-compatible** and follows monorepo best practices.

## 📋 Requirements

- **Node.js** >= 20.x
- **pnpm** >= 9.12.x
- **TypeDoc** >= 0.28.x (ESM-native)
- **typedoc-plugin-markdown** >= 4.5.x (ESM-compatible)

## 🏗️ Architecture

### ESM-First Design

- **`package.json`** - Contains `"type": "module"` for explicit ESM support
- **`typedoc.config.mjs`** - ESM configuration with `.mjs` extension
- **Plugin System** - Uses TypeDoc's native ESM plugin architecture
- **Workspace Protocol** - Leverages pnpm `workspace:*` for local dependencies

### Migration from CommonJS

This package has been migrated from CommonJS to ESM:

- ✅ `typedoc.json` → `typedoc.config.mjs`
- ✅ TypeDoc 0.26.x → 0.28.1+ (ESM-native)
- ✅ typedoc-plugin-markdown 4.2.x → 4.5.0+ (ESM-compatible)
- ✅ Added `"type": "module"` to package.json

## 🚀 Usage

### Generate Documentation

```bash
# From repository root
pnpm --filter @dynui-max/docs build

# From apps/docs directory
pnpm build
```

### Development Mode (Watch)

```bash
# From repository root
pnpm --filter @dynui-max/docs dev

# From apps/docs directory
pnpm dev
```

### Serve Documentation Locally

```bash
# After building
pnpm serve
# Documentation available at http://localhost:8080
```

### Clean Output

```bash
pnpm clean
```

## 📁 Output Structure

```
dist/
├── index.md              # Main entry point
├── modules.md            # Module listing
└── modules/              # Component documentation
    ├── DynButton.md
    ├── DynInput.md
    ├── DynTable.md
    └── ...
```

## ⚙️ Configuration

Documentation is configured via **`typedoc.config.mjs`** with the following key settings:

### Entry Points
- **Target**: `packages/core/src/index.ts`
- **Strategy**: Expand mode for all exported components

### Output
- **Directory**: `./dist`
- **Format**: Markdown files (`.md` extension)
- **Strategy**: Module-based file organization

### Organization
- **Categories**: Theme, Form, Layout, Navigation, Data Display, Utility, Hooks
- **Sorting**: Source order preservation
- **Navigation**: Hierarchical with categories and groups

### Validation
- ✅ Invalid link detection
- ✅ Not-exported symbol detection
- ⚠️ Undocumented items (warning only)

## 🔧 Integration with Monorepo

This package integrates with the DynUI-Max monorepo:

### Build Dependencies
```bash
# Documentation generation requires built core package
pnpm --filter @dynui-max/core build
pnpm --filter @dynui-max/docs build
```

### Workspace Dependencies
- **@dynui-max/core** - Component source code
- **@dynui-max/design-tokens** - Design system tokens

### Catalog System
Versions are managed through pnpm workspace catalogs:
```yaml
docs:
  typedoc: ^0.28.1
  typedoc-plugin-markdown: ^4.5.0
  http-server: ^14.1.1
```

## 🐛 Troubleshooting

### ESM/CommonJS Compatibility Issues

**Problem**: "Named export not found" errors

```
SyntaxError: Named export 'CategoryRouter' not found.
The requested module 'typedoc' is a CommonJS module...
```

**Solution**:
1. Verify TypeDoc >= 0.28.1 installed:
   ```bash
   pnpm list typedoc
   ```
2. Ensure typedoc-plugin-markdown >= 4.5.0:
   ```bash
   pnpm list typedoc-plugin-markdown
   ```
3. Check `package.json` has `"type": "module"`
4. Verify config file is `.mjs` extension (not `.js` or `.json`)

### Missing Dependencies

**Problem**: "Cannot find module 'typedoc'"

**Solution**:
```bash
# Reinstall workspace dependencies
pnpm install

# Verify installation
pnpm list --filter @dynui-max/docs --depth 0
```

### Core Package Not Built

**Problem**: "Entry point could not be resolved"

**Solution**:
```bash
# Build core package first
pnpm --filter @dynui-max/core build

# Then generate docs
pnpm --filter @dynui-max/docs build
```

### Configuration Not Loading

**Problem**: TypeDoc ignores configuration

**Solution**:
- Ensure config file is named **exactly** `typedoc.config.mjs`
- Verify `export default` syntax is used (not `module.exports`)
- Check file paths are relative to config location

### Node.js Version Issues

**Problem**: ESM module errors

**Solution**:
```bash
# Verify Node.js version
node -v
# Should be >= 20.x

# Update if needed
nvm install 20
nvm use 20
```

## ✅ Standards Compliance

This package follows DynUI-Max specification requirements:

- ✅ **ESM-only module format**
- ✅ **TypeDoc >= 0.28.x compatibility**
- ✅ **Workspace protocol for local dependencies**
- ✅ **Node.js >= 20.x requirement**
- ✅ **Plugin architecture alignment**
- ✅ **CI/CD integration ready**

## 📚 References

- [TypeDoc Documentation](https://typedoc.org/)
- [TypeDoc Options Guide](https://typedoc.org/options/)
- [typedoc-plugin-markdown](https://typedoc-plugin-markdown.org/)
- [typedoc-plugin-markdown Options](https://typedoc-plugin-markdown.org/docs/options)
- [PNPM Workspace](https://pnpm.io/workspaces)
- [Node.js ESM Guide](https://nodejs.org/api/esm.html)

## 🤝 Contributing

When updating documentation:

1. Ensure core package is built
2. Test documentation generation locally
3. Verify all component exports are documented
4. Check for broken links in output
5. Validate ESM compatibility

---

**Status**: ✅ ESM-Compatible  
**TypeDoc**: 0.28.1+  
**Plugin**: 4.5.0+  
**Last Updated**: November 2025
