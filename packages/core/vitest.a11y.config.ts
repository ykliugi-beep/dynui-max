// packages/core/vitest.a11y.config.ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',     // već promenjeno pre
    //threads: false,           // <-- dodaj ovo da isključiš worker threads
    testTimeout: 20000,       // <-- opcionalno: povećaj timeout za a11y testove
    setupFiles: ['./packages/core/src/test/setup.ts'],
    include: ['**/*.a11y.test.{ts,tsx}']
  }
});
