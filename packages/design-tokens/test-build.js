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
    
    if (config instanceof StyleDictionary) {
      console.log('✅ StyleDictionary instance created successfully');
      console.log('✅ Style Dictionary v4 configuration is valid!');
      
      // Check if tokens are loaded
      if (config.tokens && Object.keys(config.tokens).length > 0) {
        console.log('✅ Tokens loaded successfully');
        console.log('📊 Token categories:', Object.keys(config.tokens));
      } else {
        console.log('⚠️  No tokens found - check source paths');
      }
      
    } else {
      throw new Error('Config did not return StyleDictionary instance');
    }
    
  } catch (error) {
    console.error('❌ Configuration test failed:');
    console.error(error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

testConfig();