// packages/core/vitest.a11y.config.ts
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

const designTokensSrc = resolve(fileURLToPath(new URL('.', import.meta.url)), '../design-tokens/src');

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',     // već promenjeno pre
    //threads: false,           // <-- dodaj ovo da isključiš worker threads
    testTimeout: 20000,       // <-- opcionalno: povećaj timeout za a11y testove
    setupFiles: ['./src/test/setup.ts'],
    include: ['**/*.a11y.test.{ts,tsx}']
  },
  resolve: {
    alias: {
      '@dynui-max/design-tokens': designTokensSrc
    }
  }
});
