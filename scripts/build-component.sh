#!/bin/bash

# Script: build-component.sh
# Purpose: Build and validate exports for a single component
# Usage: ./scripts/build-component.sh DynButton

set -e

COMPONENT=$1

if [ -z "$COMPONENT" ]; then
  echo "❌ Error: Component name required"
  echo "Usage: ./scripts/build-component.sh DynButton"
  exit 1
fi

echo "🔨 Building Component: $COMPONENT"
echo ""

# Navigate to core package
cd packages/core

# 1. Type check
echo "1️⃣ Type checking..."
pnpm typecheck
TYPE_EXIT=$?

if [ $TYPE_EXIT -eq 0 ]; then
  echo "  ✅ TypeScript check passed"
else
  echo "  ❌ TypeScript check failed"
  exit 1
fi

# 2. Lint specific component
echo ""
echo "2️⃣ Linting component files..."
pnpm eslint "src/components/$COMPONENT" --ext .ts,.tsx
LINT_EXIT=$?

if [ $LINT_EXIT -eq 0 ]; then
  echo "  ✅ Linting passed"
else
  echo "  ❌ Linting failed"
  exit 1
fi

# 3. Build entire package (required for proper exports)
echo ""
echo "3️⃣ Building package..."
pnpm build
BUILD_EXIT=$?

if [ $BUILD_EXIT -eq 0 ]; then
  echo "  ✅ Build successful"
else
  echo "  ❌ Build failed"
  exit 1
fi

# 4. Verify component exports
echo ""
echo "4️⃣ Verifying component exports..."
node -e "
const pkg = require('./dist/index.cjs');
if (!pkg.$COMPONENT) {
  console.error('❌ Component $COMPONENT not exported from package');
  process.exit(1);
}
console.log('✅ Component $COMPONENT exported successfully');
"
EXPORT_EXIT=$?

# Navigate back to root
cd ../..

# Summary
echo ""
echo "${'='*60}"
echo "📊 Build Summary for $COMPONENT:"
echo "${'='*60}"
echo "  ✅ TypeScript"
echo "  ✅ Linting"
echo "  ✅ Build"
[ $EXPORT_EXIT -eq 0 ] && echo "  ✅ Exports" || echo "  ❌ Exports"
echo "${'='*60}"

if [ $EXPORT_EXIT -ne 0 ]; then
    echo ""
    echo "❌ Component $COMPONENT export verification failed"
    exit 1
fi

echo ""
echo "✨ Component $COMPONENT built successfully!"
exit 0
