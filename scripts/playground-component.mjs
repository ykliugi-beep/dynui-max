#!/usr/bin/env node

/**
 * Script: playground-component.mjs
 * Purpose: Launch isolated playground for single component
 * Usage: pnpm playground:component DynButton
 */

import { execSync } from 'child_process';
import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const COMPONENT_NAME = process.argv[2];

if (!COMPONENT_NAME) {
  console.error('❌ Error: Component name required');
  console.log('Usage: pnpm playground:component DynButton');
  process.exit(1);
}

const ROOT_DIR = join(__dirname, '..');
const PLAYGROUND_DIR = join(ROOT_DIR, '.playground');
const COMPONENT_PLAYGROUND = join(PLAYGROUND_DIR, COMPONENT_NAME);

console.log(`🎨 Launching playground for: ${COMPONENT_NAME}\n`);

// Create playground directory
mkdirSync(COMPONENT_PLAYGROUND, { recursive: true });

// Generate playground HTML
const playgroundHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${COMPONENT_NAME} Playground</title>
  <style>body{background:#f5f5f5;padding:24px}#root{padding:16px;border:2px dashed #ddd;border-radius:4px;min-height:180px;background:#fff;}</style>
</head>
<body>
  <h2>🎨 ${COMPONENT_NAME} Playground</h2>
  <div id="root"></div>
  <script type="module">
    import React from 'https://esm.sh/react@18';
    import ReactDOM from 'https://esm.sh/react-dom@18/client';
    import { ${COMPONENT_NAME} } from '../../packages/core/dist/index.js';
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(React.createElement(${COMPONENT_NAME}, {children:'Test ${COMPONENT_NAME}'}));
  </script>
</body>
</html>
`;

writeFileSync(join(COMPONENT_PLAYGROUND, 'index.html'), playgroundHTML);

console.log('✅ Playground created at:', COMPONENT_PLAYGROUND);
console.log('\n🚀 Opening playground in browser...\n');

// Open in browser
const playgroundURL = `file://${COMPONENT_PLAYGROUND}/index.html`;
try {
  const openCmd = process.platform === 'darwin' ? 'open' : process.platform === 'win32' ? 'start' : 'xdg-open';
  execSync(`${openCmd} "${playgroundURL}"`, { stdio: 'inherit' });
  console.log('✨ Playground opened successfully!');
  console.log(`\n📍 URL: ${playgroundURL}\n`);
} catch (error) {
  console.log('⚠️  Could not auto-open browser');
  console.log(`\n📍 Manually open: ${playgroundURL}\n`);
}
