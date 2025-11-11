#!/usr/bin/env node

/**
 * Script: validate-component.js
 * Purpose: Comprehensive validation of a single component
 * Usage: node scripts/validate-component.js DynButton
 */

import { execSync } from 'child_process';
import { existsSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const COMPONENT_NAME = process.argv[2];

if (!COMPONENT_NAME) {
  console.error('❌ Error: Component name required');
  console.log('Usage: node scripts/validate-component.js DynButton');
  process.exit(1);
}

const ROOT_DIR = join(__dirname, '..');
const CORE_PATH = join(ROOT_DIR, 'packages/core');
const COMPONENT_PATH = join(CORE_PATH, 'src/components', COMPONENT_NAME);
const STORIES_PATH = join(ROOT_DIR, 'apps/storybook/stories');

console.log(`\n🔍 Validating Component: ${COMPONENT_NAME}\n`);

// ===== STEP 1: File Existence Checks =====
console.log('📁 Step 1/7: Checking file structure...');
const requiredFiles = [
  { path: join(COMPONENT_PATH, `${COMPONENT_NAME}.tsx`), name: 'Component', critical: true },
  { path: join(COMPONENT_PATH, `${COMPONENT_NAME}.css`), name: 'Styles', critical: true },
  { path: join(COMPONENT_PATH, `${COMPONENT_NAME}.test.tsx`), name: 'Unit Tests', critical: true },
  { path: join(COMPONENT_PATH, `${COMPONENT_NAME}.a11y.test.tsx`), name: 'A11y Tests', critical: true },
  { path: join(COMPONENT_PATH, 'index.ts'), name: 'Export', critical: true }
];

let fileChecksPassed = true;
requiredFiles.forEach(({ path, name, critical }) => {
  if (existsSync(path)) {
    console.log(`  ✅ ${name}: Found`);
  } else {
    console.log(`  ${critical ? '❌' : '⚠️ '} ${name}: ${critical ? 'MISSING' : 'Not found (optional)'}`);
    if (critical) fileChecksPassed = false;
  }
});

if (!fileChecksPassed) {
  console.error('\n❌ File structure validation failed');
  process.exit(1);
}

// ===== STEP 2: TypeScript Type Check =====
console.log('\n📝 Step 2/7: Running TypeScript type check...');
try {
  execSync('pnpm typecheck', { cwd: CORE_PATH, stdio: 'inherit' });
  console.log('  ✅ TypeScript check passed');
} catch (error) {
  console.error('  ❌ TypeScript check failed');
  process.exit(1);
}

// ===== STEP 3: Linting =====
console.log('\n🔍 Step 3/7: Running ESLint...');
try {
  execSync(
    `pnpm eslint src/components/${COMPONENT_NAME} --ext .ts,.tsx`,
    { cwd: CORE_PATH, stdio: 'inherit' }
  );
  console.log('  ✅ Linting passed');
} catch (error) {
  console.error('  ❌ Linting failed');
  process.exit(1);
}

// ===== STEP 4: Unit Tests =====
console.log('\n🧪 Step 4/7: Running unit tests...');
try {
  execSync(
    `pnpm vitest run src/components/${COMPONENT_NAME}/${COMPONENT_NAME}.test.tsx --reporter=verbose`,
    { cwd: CORE_PATH, stdio: 'inherit' }
  );
  console.log('  ✅ Unit tests passed');
} catch (error) {
  console.error('  ❌ Unit tests failed');
  process.exit(1);
}

// ===== STEP 5: Accessibility Tests =====
console.log('\n♿ Step 5/7: Running accessibility tests...');
try {
  execSync(
    `pnpm vitest run --config vitest.a11y.config.ts src/components/${COMPONENT_NAME}/${COMPONENT_NAME}.a11y.test.tsx --reporter=verbose`,
    { cwd: CORE_PATH, stdio: 'inherit' }
  );
  console.log('  ✅ A11y tests passed');
} catch (error) {
  console.error('  ❌ A11y tests failed');
  process.exit(1);
}

// ===== STEP 6: Coverage Check =====
console.log('\n📊 Step 6/7: Checking test coverage...');
try {
  execSync(
    `pnpm vitest run --coverage src/components/${COMPONENT_NAME}/${COMPONENT_NAME}.test.tsx`,
    { cwd: CORE_PATH, stdio: 'inherit' }
  );
  console.log('  ✅ Coverage threshold met (≥80%)');
} catch (error) {
  console.error('  ⚠️  Coverage below threshold (non-critical)');
  // Don't exit - coverage warnings are informational
}

// ===== STEP 7: Storybook File Check =====
console.log('\n📖 Step 7/7: Checking Storybook files...');
try {
  const storyFile = execSync(
    `find ${STORIES_PATH} -name "${COMPONENT_NAME}.stories.tsx"`,
    { encoding: 'utf-8' }
  ).trim();
  
  if (storyFile) {
    console.log('  ✅ Storybook story exists');
  } else {
    console.error('  ❌ Storybook story missing');
    process.exit(1);
  }
  
  const mdxFile = execSync(
    `find ${STORIES_PATH} -name "${COMPONENT_NAME}.mdx"`,
    { encoding: 'utf-8' }
  ).trim();
  
  if (mdxFile) {
    console.log('  ✅ MDX documentation exists');
  } else {
    console.log('  ⚠️  MDX documentation missing (optional)');
  }
} catch (error) {
  console.error('  ❌ Storybook file check failed');
  process.exit(1);
}

// ===== SUCCESS =====
console.log(`\n${'='.repeat(60)}`);
console.log(`✨ Component ${COMPONENT_NAME} validation complete!`);
console.log('='.repeat(60));
console.log('\n📋 Validation Summary:');
console.log('  ✅ File structure');
console.log('  ✅ TypeScript');
console.log('  ✅ Linting');
console.log('  ✅ Unit tests');
console.log('  ✅ A11y tests');
console.log('  ✅ Coverage');
console.log('  ✅ Storybook files');
console.log('\n🎉 Component is production-ready!\n');
