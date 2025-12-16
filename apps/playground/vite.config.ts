import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@dynui-max/core': path.resolve(__dirname, '../../packages/core/src'),
      '@dynui-max/design-tokens': path.resolve(__dirname, '../../packages/design-tokens/src'),
    },
  },
  server: {
    port: 5173,
    open: true,
  },
});
