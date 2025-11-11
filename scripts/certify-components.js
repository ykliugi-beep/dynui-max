#!/usr/bin/env node

/**
 * Script: certify-components.js
 * Purpose: Batch certification of all components
 * Usage: node scripts/certify-components.js
 */

import { execSync } from 'child_process';
import { readdirSync, statSync, writeFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const ROOT_DIR = join(__dirname, '..');
const COMPONENTS_DIR = join(ROOT_DIR, 'packages/core/src/components');
const REPORT_FILE = join(ROOT_DIR, 'component-certification-report.json');

// Get all component directories
const components = readdirSync(COMPONENTS_DIR)
  .filter(name => {
    const fullPath = join(COMPONENTS_DIR, name);
    return statSync(fullPath).isDirectory() && name.startsWith('Dyn');
  })
  .sort();

console.log(`\n${'='.repeat(60)}`);
console.log(`📋 Component Certification Suite`);
console.log('='.repeat(60));
console.log(`Found ${components.length} components to certify\n`);

const results = {
  timestamp: new Date().toISOString(),
  total: components.length,
  passed: 0,
  failed: 0,
  skipped: 0,
  components: {}
};

// Test each component
components.forEach((component, index) => {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`Testing ${index + 1}/${components.length}: ${component}`);
  console.log('='.repeat(60));
  
  const startTime = Date.now();
  
  try {
    execSync(
      `bash scripts/test-component.sh ${component}`,
      { 
        cwd: ROOT_DIR,
        stdio: 'inherit',
        encoding: 'utf-8'
      }
    );
    
    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    
    results.components[component] = {
      status: 'PASSED',
      timestamp: new Date().toISOString(),
      duration: `${duration}s`
    };
    results.passed++;
    console.log(`\n✅ ${component} certified (${duration}s)`);
  } catch (error) {
    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    
    results.components[component] = {
      status: 'FAILED',
      timestamp: new Date().toISOString(),
      duration: `${duration}s`,
      error: error.message
    };
    results.failed++;
    console.error(`\n❌ ${component} failed certification (${duration}s)`);
  }
});

// Write report
writeFileSync(REPORT_FILE, JSON.stringify(results, null, 2));

// Summary
console.log(`\n${'='.repeat(60)}`);
console.log('📊 CERTIFICATION SUMMARY');
console.log('='.repeat(60));
console.log(`Total Components: ${results.total}`);
console.log(`✅ Passed: ${results.passed} (${((results.passed/results.total)*100).toFixed(1)}%)`);
console.log(`❌ Failed: ${results.failed} (${((results.failed/results.total)*100).toFixed(1)}%)`);
console.log(`\n📄 Full report saved to: ${REPORT_FILE}`);
console.log('='.repeat(60));

if (results.failed > 0) {
  console.log('\n⚠️  Some components failed certification. Run individual tests for details:');
  Object.entries(results.components)
    .filter(([, data]) => data.status === 'FAILED')
    .forEach(([name]) => {
      console.log(`   ./scripts/test-component.sh ${name}`);
    });
}

console.log('');
process.exit(results.failed > 0 ? 1 : 0);
