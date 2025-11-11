#!/usr/bin/env node

/**
 * Script: open-story.mjs
 * Purpose: Open specific Storybook story in browser
 * Usage: pnpm story:open DynButton [StoryName]
 */

import { execSync } from 'child_process';
import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';

const COMPONENT_NAME = process.argv[2];
const STORY_NAME = process.argv[3] || 'Default';

if (!COMPONENT_NAME) {
  console.error('❌ Error: Component name required');
  console.log('Usage: pnpm story:open DynButton [StoryName]');
  process.exit(1);
}

console.log(`📖 Opening Storybook story: ${COMPONENT_NAME} - ${STORY_NAME}\n`);

// Find story file
const storiesDir = 'apps/storybook/stories';
let storyPath = null;
let category = null;

// Search in all categories
const categories = ['Form', 'Layout', 'Navigation', 'Data', 'Feedback', 'Infrastructure'];

for (const cat of categories) {
  const categoryPath = join(storiesDir, cat);
  try {
    const files = readdirSync(categoryPath);
    const storyFile = files.find(f => f === `${COMPONENT_NAME}.stories.tsx`);
    
    if (storyFile) {
      category = cat.toLowerCase();
      storyPath = join(categoryPath, storyFile);
      break;
    }
  } catch (e) {
    // Category doesn't exist, skip
  }
}

if (!storyPath) {
  console.error(`❌ Story file not found for ${COMPONENT_NAME}`);
  process.exit(1);
}

console.log(`✅ Found story: ${storyPath}`);

// Parse story file to get available stories
const storyContent = readFileSync(storyPath, 'utf-8');
const storyMatches = storyContent.match(/export const (\w+):/g) || [];
const availableStories = storyMatches.map(m => m.match(/export const (\w+):/)[1]);

console.log(`\n📚 Available stories:`);
availableStories.forEach(s => console.log(`  - ${s}`));

if (!availableStories.includes(STORY_NAME)) {
  console.warn(`\n⚠️  Story "${STORY_NAME}" not found, using first available story`);
}

const storyToOpen = availableStories.includes(STORY_NAME) ? 
                    STORY_NAME : 
                    availableStories[0];

// Construct Storybook URL
const storyURL = `http://localhost:6006/?path=/story/${category}-${COMPONENT_NAME.toLowerCase()}--${storyToOpen.toLowerCase()}`;

console.log(`\n🌐 Opening: ${storyURL}`);

// Check if Storybook is running
try {
  execSync('curl -s http://localhost:6006 > /dev/null', { stdio: 'ignore' });
} catch (error) {
  console.error('\n❌ Storybook is not running!');
  console.log('Start Storybook first: pnpm storybook');
  process.exit(1);
}

// Open in browser
const openCmd = process.platform === 'darwin' ? 'open' :
                process.platform === 'win32' ? 'start' : 'xdg-open';

try {
  execSync(`${openCmd} "${storyURL}"`, { stdio: 'inherit' });
  console.log('✅ Story opened in browser\n');
} catch (error) {
  console.error('⚠️  Could not auto-open browser');
  console.log(`\nManually open: ${storyURL}\n`);
}
