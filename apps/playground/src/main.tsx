import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
// Import CSS from node_modules directly
import '../../../node_modules/@dynui-max/design-tokens/dist/tokens.css';
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
