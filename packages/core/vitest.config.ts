import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: ['./src/test/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'json-summary'],
      reportsDirectory: './coverage',
      // ENFORCED: 80% coverage threshold as per specification
      thresholds: {
        global: {
          branches: 80,
          functions: 80,
          lines: 80,
          statements: 80
        }
      },
      include: [
        'src/components/**/*.{ts,tsx}',
        'src/hooks/**/*.{ts,tsx}',
        'src/theme/**/*.{ts,tsx}'
      ],
      exclude: [
        'src/components/**/*.stories.{ts,tsx}',
        'src/components/**/*.test.{ts,tsx}',
        'src/components/**/*.a11y.test.{ts,tsx}',
        'src/components/**/index.ts',
        'src/test/**/*',
        'src/**/*.d.ts'
      ]
    },
    // Fail tests if coverage thresholds are not met
    pool: 'threads',
    poolOptions: {
      threads: {
        singleThread: true
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@dynui-max/design-tokens': path.resolve(__dirname, '../design-tokens/src')
    }
  }
});