#!/usr/bin/env node
/**
 * Safe clean script for dynui-max monorepo
 * Handles Windows file locking issues and provides user feedback
 */

import { rmSync, existsSync } from 'fs';
import { join } from 'path';
import process from 'process';

const rootDir = process.cwd();
const cachePath = join(rootDir, 'node_modules', '.cache');

console.log('🧹 Cleaning cache directories...');

try {
  if (existsSync(cachePath)) {
    console.log(`📂 Removing: ${cachePath}`);
    rmSync(cachePath, { 
      recursive: true, 
      force: true, 
      maxRetries: 3,
      retryDelay: 1000 // Wait 1s between retries on Windows
    });
    console.log('✅ Cache directory removed successfully');
  } else {
    console.log('ℹ️  Cache directory already clean');
  }
  
  console.log('✅ Clean operation completed');
  
} catch (error) {
  console.error('❌ Clean operation failed:');
  console.error(error.message);
  
  // On Windows, suggest manual cleanup
  if (process.platform === 'win32') {
    console.log('\n💡 Windows cleanup tips:');
    console.log('   - Close all Node.js processes and VS Code');
    console.log('   - Run: taskkill /f /im node.exe');
    console.log('   - Manually delete node_modules/.cache if needed');
  }
  
  process.exit(1);
}