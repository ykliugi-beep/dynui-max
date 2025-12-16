import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
// Import design tokens CSS through TypeScript/Vite import system
// This uses Node.js module resolution and package.json exports
import '@dynui-max/design-tokens/css';
import './index.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Failed to find the root element');
}

const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
