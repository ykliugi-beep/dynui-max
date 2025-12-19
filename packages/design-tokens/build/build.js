#!/usr/bin/env node

import { readFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import StyleDictionary from 'style-dictionary';
import config from './config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Build design tokens using Style Dictionary
 * 
 * This script:
 * 1. Loads the Style Dictionary configuration
 * 2. Builds all platform outputs (CSS, JS, JSON)
 * 3. Generates tokens.css and tokens-dark.css for Storybook
 * 4. Provides console feedback on build status
 */

async function build() {
  console.log('\n🚀 Building DynUI-Max Design Tokens...\n');

  try {
    // Create Style Dictionary instance with our config
    const sd = new StyleDictionary(config);

    // Build all platforms
    await sd.buildAllPlatforms();

    console.log('\n✅ Design tokens built successfully!\n');
    console.log('📦 Generated files:');
    console.log('   - dist/tokens.css (light theme)');
    console.log('   - dist/tokens-dark.css (dark theme)');
    console.log('   - dist/variables.css (all variables)');
    console.log('   - dist/tokens.js (JavaScript export)');
    console.log('   - dist/tokens.json (flat JSON)');
    console.log('   - dist/tokens-nested.json (nested JSON)');
    console.log('');

    // Read package.json to show version
    try {
      const packageJsonPath = join(__dirname, '../package.json');
      const packageJson = JSON.parse(await readFile(packageJsonPath, 'utf-8'));
      console.log(`📝 @dynui-max/design-tokens v${packageJson.version}`);
      console.log('');
    } catch (err) {
      // Ignore if package.json can't be read
    }

  } catch (error) {
    console.error('\n❌ Error building design tokens:\n');
    console.error(error);
    process.exit(1);
  }
}

// Execute build
build();
