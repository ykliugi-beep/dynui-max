/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    include: [
      'packages/*/src/**/*.{test,spec}.{js,ts,jsx,tsx}',
      'packages/*/tests/**/*.{test,spec}.{js,ts,jsx,tsx}',
    ],
    exclude: [
      'node_modules/**',
      'dist/**',
      'build/**',
      'storybook-static/**',
      '**/*.stories.{js,ts,jsx,tsx}',
    ],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      reportsDirectory: './coverage',
      exclude: [
        'node_modules/**',
        'dist/**',
        'build/**',
        'coverage/**',
        '**/*.d.ts',
        '**/*.config.*',
        '**/*.stories.*',
        '**/tests/setup.ts',
        'storybook-static/**',
      ],
      // Enforce minimum coverage thresholds
      thresholds: {
        global: {
          statements: 80,
          branches: 80,
          functions: 80,
          lines: 80,
        },
      },
    },
    testTimeout: 10000,
    hookTimeout: 10000,
    teardownTimeout: 5000,
    clearMocks: true,
    restoreMocks: true,
    reporter: process.env.CI ? ['verbose', 'github-actions'] : ['verbose'],
  },
  
  resolve: {
    alias: {
      '@dynui-max/core': resolve(__dirname, './packages/core/src'),
      '@dynui-max/design-tokens': resolve(__dirname, './packages/design-tokens/src'),
    },
  },
  
  esbuild: {
    target: 'node14',
  },
});