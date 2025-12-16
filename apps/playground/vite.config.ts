import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Only alias core src, design-tokens should resolve from dist
      '@dynui-max/core': path.resolve(__dirname, '../../packages/core/src'),
    },
  },
  optimizeDeps: {
    include: ['@dynui-max/core', '@dynui-max/design-tokens'],
  },
  server: {
    port: 5173,
    open: true,
  },
});
