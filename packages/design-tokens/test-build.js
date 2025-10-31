#!/usr/bin/env node
/**
 * Test script to validate Style Dictionary v4 configuration
 * This script can be run to test the config without running full build
 */

import StyleDictionary from 'style-dictionary';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function testConfig() {
  console.log('🧪 Testing Style Dictionary v4 configuration...');
  
  try {
    // Import the config
    const configPath = join(__dirname, 'build', 'config.js');
    if (!existsSync(configPath)) {
      throw new Error('Config file not found at: ' + configPath);
    }
    
    console.log('✅ Config file exists');
    
    // Test basic functionality
    const { default: config } = await import('./build/config.js');
    
    if (config && typeof config === 'object') {
      console.log('✅ Config object loaded successfully');
      
      // Check if required properties exist
      if (config.source && config.platforms && config.hooks) {
        console.log('✅ Style Dictionary v4 configuration is valid!');
        console.log('✅ Configuration includes:');
        console.log(`   - Source paths: ${config.source.length}`);
        console.log(`   - Platforms: ${Object.keys(config.platforms).join(', ')}`);
        console.log(`   - Custom transforms: ${Object.keys(config.hooks.transforms || {}).length}`);
        console.log(`   - Custom formats: ${Object.keys(config.hooks.formats || {}).length}`);
      } else {
        console.log('⚠️  Config missing required properties');
      }
      
    } else {
      throw new Error('Config did not return valid object');
    }
    
  } catch (error) {
    console.error('❌ Configuration test failed:');
    console.error(error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

testConfig();