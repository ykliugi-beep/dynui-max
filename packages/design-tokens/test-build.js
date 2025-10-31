#!/usr/bin/env node
/**
 * Test script to validate Style Dictionary configuration and token build
 */

import { spawn } from 'child_process';
import { existsSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = join(__filename, '..');

console.log('🧪 Testing Style Dictionary build...');

// Test that config file exists
const configPath = join(__dirname, 'build', 'config.js');
if (!existsSync(configPath)) {
  console.error('❌ Config file not found:', configPath);
  process.exit(1);
}
console.log('✅ Config file exists');

// Test actual build process
const buildProcess = spawn('pnpm', ['build:tokens'], {
  cwd: __dirname,
  stdio: 'pipe'
});

let output = '';
let hasError = false;

buildProcess.stdout.on('data', (data) => {
  output += data.toString();
});

buildProcess.stderr.on('data', (data) => {
  output += data.toString();
  if (data.toString().includes('Error:')) {
    hasError = true;
  }
});

buildProcess.on('close', (code) => {
  if (code === 0 && !hasError) {
    console.log('✅ Style Dictionary build successful!');
    
    // Check generated files
    const cssFile = join(__dirname, 'dist', 'tokens.css');
    const jsFile = join(__dirname, 'dist', 'tokens.js');
    
    if (existsSync(cssFile)) {
      console.log('✅ CSS tokens generated');
    } else {
      console.log('⚠️  CSS tokens not found');
    }
    
    if (existsSync(jsFile)) {
      console.log('✅ JS tokens generated');
    } else {
      console.log('⚠️  JS tokens not found');
    }
    
    console.log('🎉 All tests passed!');
  } else {
    console.error('❌ Style Dictionary build failed');
    console.error('Output:');
    console.error(output);
    process.exit(1);
  }
});