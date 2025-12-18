#!/usr/bin/env node
import { fileURLToPath } from 'url';
import path from 'path';
import StyleDictionary from 'style-dictionary';
import config from './config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Build Script for DynUI-Max Design Tokens
 * 
 * This script executes the Style Dictionary build process to generate:
 * - CSS variable files (tokens.css, tokens-dark.css, variables.css)
 * - JavaScript exports (tokens.js)
 * - JSON exports (tokens.json, tokens-nested.json)
 * 
 * The build transforms JSON token definitions into multiple output formats
 * with proper naming conventions and CSS custom properties.
 */

console.log('\n🎨 Building DynUI-Max Design Tokens...\n');

try {
  // Create Style Dictionary instance with our configuration
  const sd = new StyleDictionary(config);

  // Build all configured platforms
  await sd.buildAllPlatforms();

  console.log('\n✅ Design tokens CSS files generated successfully!');
  console.log('\n📦 Generated files:');
  console.log('   - dist/tokens.css (light theme)');
  console.log('   - dist/tokens-dark.css (dark theme)');
  console.log('   - dist/variables.css (all variables)');
  console.log('   - dist/tokens.js (JavaScript exports)');
  console.log('   - dist/tokens.json (flat JSON)');
  console.log('   - dist/tokens-nested.json (nested JSON)');
  console.log('\n');
} catch (error) {
  console.error('\n❌ Error building design tokens:', error);
  console.error('\nStack trace:', error.stack);
  process.exit(1);
}
