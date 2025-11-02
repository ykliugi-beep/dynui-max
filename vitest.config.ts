import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    // Environment setup
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/setup.ts'],
    
    // Test file patterns
    include: [
      'packages/**/*.{test,spec}.{ts,tsx}',
      'packages/**/src/**/*.{test,spec}.{ts,tsx}',
      'packages/**/tests/**/*.{test,spec}.{ts,tsx}'
    ],
    
    // Coverage configuration with ENFORCED thresholds
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      thresholds: {
        global: {
          statements: 80,  // ENFORCED: 80% minimum coverage
          branches: 80,    // ENFORCED: 80% minimum coverage
          functions: 80,   // ENFORCED: 80% minimum coverage
          lines: 80        // ENFORCED: 80% minimum coverage
        }
      },
      exclude: [
        'node_modules/',
        'dist/',
        '**/*.d.ts',
        '**/*.config.{js,ts}',
        'tests/setup.ts',
        '**/*.stories.{ts,tsx}',
        '**/storybook-static/**',
        '**/.storybook/**'
      ]
    },
    
    // Test timeout
    testTimeout: 10000
  },
  
  resolve: {
    alias: {
      '@dynui-max/core': resolve(__dirname, './packages/core/src'),
      '@dynui-max/design-tokens': resolve(__dirname, './packages/design-tokens/src')
    }
  }
});
