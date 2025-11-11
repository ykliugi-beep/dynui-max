#!/bin/bash

# Script: test-component.sh
# Purpose: Run all tests for a single component
# Usage: ./scripts/test-component.sh DynButton

set -e

COMPONENT=$1

if [ -z "$COMPONENT" ]; then
  echo "❌ Error: Component name required"
  echo "Usage: ./scripts/test-component.sh DynButton"
  exit 1
fi

echo "🧪 Testing Component: $COMPONENT"
echo ""

# Navigate to core package
cd packages/core

# 1. Unit Tests
echo "1️⃣ Running unit tests..."
pnpm vitest run "src/components/$COMPONENT/$COMPONENT.test.tsx" --reporter=verbose
UNIT_TEST_EXIT=$?

if [ $UNIT_TEST_EXIT -eq 0 ]; then
  echo "  ✅ Unit tests passed"
else
  echo "  ❌ Unit tests failed"
fi

# 2. A11y Tests
echo ""
echo "2️⃣ Running accessibility tests..."
pnpm vitest run --config vitest.a11y.config.ts "src/components/$COMPONENT/$COMPONENT.a11y.test.tsx" --reporter=verbose
A11Y_TEST_EXIT=$?

if [ $A11Y_TEST_EXIT -eq 0 ]; then
  echo "  ✅ A11y tests passed"
else
  echo "  ❌ A11y tests failed"
fi

# 3. Coverage
echo ""
echo "3️⃣ Checking test coverage..."
pnpm vitest run --coverage "src/components/$COMPONENT/$COMPONENT.test.tsx" 2>&1 | tee /tmp/coverage-output.txt
COVERAGE_EXIT=$?

if [ $COVERAGE_EXIT -eq 0 ]; then
  echo "  ✅ Coverage threshold met (≥80%)"
else
  echo "  ⚠️  Coverage below threshold"
fi

# 4. Storybook check
echo ""
echo "4️⃣ Checking Storybook files..."
cd ../../apps/storybook

STORY_EXIT=1
if find stories -name "$COMPONENT.stories.tsx" | grep -q .; then
    echo "  ✅ Story file exists"
    STORY_EXIT=0
else
    echo "  ❌ Story file missing"
    STORY_EXIT=1
fi

if find stories -name "$COMPONENT.mdx" | grep -q .; then
    echo "  ✅ MDX documentation exists"
else
    echo "  ⚠️  MDX documentation missing (optional)"
fi

# Navigate back to root
cd ../..

# Summary
echo ""
echo "${'='*60}"
echo "📊 Test Summary for $COMPONENT:"
echo "${'='*60}"
[ $UNIT_TEST_EXIT -eq 0 ] && echo "  ✅ Unit Tests" || echo "  ❌ Unit Tests"
[ $A11Y_TEST_EXIT -eq 0 ] && echo "  ✅ A11y Tests" || echo "  ❌ A11y Tests"
[ $COVERAGE_EXIT -eq 0 ] && echo "  ✅ Coverage ≥80%" || echo "  ⚠️  Coverage <80%"
[ $STORY_EXIT -eq 0 ] && echo "  ✅ Storybook Story" || echo "  ❌ Storybook Story"
echo "${'='*60}"

# Exit with error if critical tests failed
if [ $UNIT_TEST_EXIT -ne 0 ] || [ $A11Y_TEST_EXIT -ne 0 ] || [ $STORY_EXIT -ne 0 ]; then
    echo ""
    echo "❌ Component $COMPONENT failed validation"
    exit 1
fi

echo ""
echo "✨ Component $COMPONENT passed all tests!"
exit 0
