import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Alias core src for development
      '@dynui-max/core': path.resolve(__dirname, '../../packages/core/src'),
      // Alias design-tokens CSS export to actual file
      '@dynui-max/design-tokens/css': path.resolve(__dirname, '../../packages/design-tokens/dist/tokens.css'),
    },
  },
  css: {
    preprocessorOptions: {
      // Configure CSS preprocessor to resolve package imports
      // This allows @import '@package/path' to work in CSS files
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
