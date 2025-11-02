#!/usr/bin/env node
/**
 * Bundle Analysis Script
 * 
 * Analyzes bundle size and tree-shaking capabilities for @dynui-max/core package.
 * Part of Quality Gate D - Bundle Performance monitoring.
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const gzipSize = require('gzip-size');

const BUNDLE_SIZE_LIMIT = 150 * 1024; // 150KB in bytes
const CORE_PACKAGE_PATH = path.join(__dirname, '../packages/core');
const DIST_PATH = path.join(CORE_PACKAGE_PATH, 'dist');

/**
 * Check if core package is built
 */
function checkBuildExists() {
  if (!fs.existsSync(DIST_PATH)) {
    console.error('❌ Core package not built. Run `pnpm build` first.');
    process.exit(1);
  }
  
  console.log('✅ Core package build found');
}

/**
 * Analyze main bundle size
 */
function analyzeBundleSize() {
  console.log('\n📦 Bundle Size Analysis:');
  
  const mainBundle = path.join(DIST_PATH, 'index.js');
  if (!fs.existsSync(mainBundle)) {
    console.error('❌ Main bundle not found at', mainBundle);
    return;
  }
  
  const stats = fs.statSync(mainBundle);
  const sizeBytes = stats.size;
  const sizeKB = Math.round(sizeBytes / 1024 * 100) / 100;
  
  // Calculate gzip size
  const bundleContent = fs.readFileSync(mainBundle);
  const gzipSizeBytes = gzipSize.sync(bundleContent);
  const gzipSizeKB = Math.round(gzipSizeBytes / 1024 * 100) / 100;
  
  console.log(`  📦 Raw size: ${sizeKB} KB (${sizeBytes} bytes)`);
  console.log(`  🗜️  Gzip size: ${gzipSizeKB} KB (${gzipSizeBytes} bytes)`);
  
  // Check against limit
  if (gzipSizeBytes > BUNDLE_SIZE_LIMIT) {
    console.log(`  ❌ Bundle size ${gzipSizeKB}KB exceeds ${BUNDLE_SIZE_LIMIT/1024}KB limit`);
    return false;
  } else {
    console.log(`  ✅ Bundle size ${gzipSizeKB}KB within ${BUNDLE_SIZE_LIMIT/1024}KB limit`);
    return true;
  }
}

/**
 * Test tree-shaking with individual component imports
 */
function testTreeShaking() {
  console.log('\n🌳 Tree-shaking Analysis:');
  
  const testComponents = ['DynButton', 'DynInput', 'DynSelect', 'DynModal', 'DynTable'];
  
  for (const component of testComponents) {
    try {
      // Create test file with single component import
      const testImport = `import { ${component} } from './packages/core/dist/index.js';\nconsole.log(${component});`;
      fs.writeFileSync('temp-treeshake-test.js', testImport);
      
      // Bundle with esbuild
      const result = execSync(
        'npx esbuild temp-treeshake-test.js --bundle --minify --format=esm --outfile=temp-bundle.js --external:react --external:react-dom', 
        { encoding: 'utf8', stdio: 'pipe' }
      );
      
      // Get bundle size
      const bundleStats = fs.statSync('temp-bundle.js');
      const componentBundleSize = Math.round(bundleStats.size / 1024 * 100) / 100;
      
      console.log(`  ${component}: ${componentBundleSize} KB`);
      
      // Cleanup
      fs.unlinkSync('temp-treeshake-test.js');
      fs.unlinkSync('temp-bundle.js');
      
    } catch (error) {
      console.log(`  ${component}: ❌ Failed to analyze (${error.message})`);
    }
  }
}

/**
 * Verify package.json exports configuration
 */
function verifyExportsConfig() {
  console.log('\n📋 Package Configuration:');
  
  const packageJsonPath = path.join(CORE_PACKAGE_PATH, 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  
  // Check exports field
  const hasExports = packageJson.exports && typeof packageJson.exports === 'object';
  console.log(`  📦 Exports field: ${hasExports ? '✅' : '❌'}`);
  
  // Check sideEffects
  const hasSideEffects = packageJson.sideEffects !== undefined;
  const sideEffectsValue = packageJson.sideEffects;
  console.log(`  🌳 SideEffects field: ${hasSideEffects ? '✅' : '❌'} (${JSON.stringify(sideEffectsValue)})`);
  
  // Check module field
  const hasModule = !!packageJson.module;
  console.log(`  📄 Module field: ${hasModule ? '✅' : '❌'}`);
  
  // Check types field
  const hasTypes = !!packageJson.types;
  console.log(`  🏷️  Types field: ${hasTypes ? '✅' : '❌'}`);
  
  return hasExports && hasSideEffects && hasModule && hasTypes;
}

/**
 * Generate bundle analysis report
 */
function generateReport() {
  const reportData = {
    timestamp: new Date().toISOString(),
    bundleSize: {},
    treeShaking: {},
    packageConfig: {},
    status: 'unknown'
  };
  
  console.log('\n📊 BUNDLE ANALYSIS REPORT');
  console.log('=' .repeat(50));
  
  try {
    // Run all analyses
    const sizeOk = analyzeBundleSize();
    testTreeShaking();
    const configOk = verifyExportsConfig();
    
    reportData.status = sizeOk && configOk ? 'PASS' : 'FAIL';
    
    console.log(`\n🎯 Overall Status: ${reportData.status === 'PASS' ? '✅ PASS' : '❌ FAIL'}`);
    
    // Save report
    fs.writeFileSync('bundle-analysis-report.json', JSON.stringify(reportData, null, 2));
    console.log('💾 Report saved to bundle-analysis-report.json');
    
    return reportData.status === 'PASS';
    
  } catch (error) {
    console.error('❌ Bundle analysis failed:', error.message);
    return false;
  }
}

/**
 * Main execution
 */
function main() {
  console.log('🔍 DynUI-Max Bundle Analysis');
  console.log('=' .repeat(50));
  
  checkBuildExists();
  const success = generateReport();
  
  process.exit(success ? 0 : 1);
}

if (require.main === module) {
  main();
}

module.exports = {
  analyzeBundleSize,
  testTreeShaking,
  verifyExportsConfig,
  generateReport
};
