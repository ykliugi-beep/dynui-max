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

const pnpmCommand = process.platform === 'win32' ? 'pnpm.cmd' : 'pnpm';

// Test actual build process
const buildProcess = spawn(pnpmCommand, ['build:tokens'], {
  cwd: __dirname,
  stdio: 'pipe'
});

let output = '';
let hasError = false;

buildProcess.on('error', (error) => {
  console.error('❌ Failed to start pnpm:', error.message);
  process.exit(1);
});

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
    const lightThemeFile = join(__dirname, 'dist', 'themes', 'light.css');
    const darkThemeFile = join(__dirname, 'dist', 'themes', 'dark.css');

    const checks = [
      { path: cssFile, label: 'CSS tokens' },
      { path: jsFile, label: 'JS tokens' },
      { path: lightThemeFile, label: 'Light theme CSS' },
      { path: darkThemeFile, label: 'Dark theme CSS' }
    ];

    let missing = false;

    for (const check of checks) {
      if (existsSync(check.path)) {
        console.log(`✅ ${check.label} generated`);
      } else {
        console.error(`❌ ${check.label} not found at ${check.path}`);
        missing = true;
      }
    }

    if (missing) {
      console.error('❌ Build is missing required artifacts');
      process.exit(1);
    }

    console.log('🎉 All tests passed!');
  } else {
    console.error('❌ Style Dictionary build failed');
    console.error('Output:');
    console.error(output);
    process.exit(1);
  }
});