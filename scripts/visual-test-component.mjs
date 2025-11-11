#!/usr/bin/env node

/**
 * Script: visual-test-component.mjs
 * Purpose: Run Chromatic visual tests for specific component
 * Usage: pnpm visual:test DynButton
 */

import { execSync } from 'child_process';

const COMPONENT_NAME = process.argv[2];

if (!COMPONENT_NAME) {
  console.error('❌ Error: Component name required');
  console.log('Usage: pnpm visual:test DynButton');
  process.exit(1);
}

console.log(`🎨 Running visual regression tests for: ${COMPONENT_NAME}\n`);

// Build Storybook first
console.log('1️⃣ Building Storybook...');
execSync('pnpm storybook:build', { stdio: 'inherit' });

// Run Chromatic with story filter
console.log(`\n2️⃣ Running Chromatic for ${COMPONENT_NAME}...\n`);

try {
  execSync(
    `npx chromatic --only-story-names="${COMPONENT_NAME}/*" --exit-zero-on-changes`,
    { stdio: 'inherit' }
  );
  
  console.log('\n✅ Visual regression tests complete!');
  console.log('View results at: https://www.chromatic.com/\n');
} catch (error) {
  console.error('\n❌ Visual tests failed');
  process.exit(1);
}
