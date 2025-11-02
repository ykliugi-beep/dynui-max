import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: false, // Handled by separate tsc command
  sourcemap: true,
  clean: true,
  external: ['react', 'react-dom', '@dynui-max/design-tokens'],
  esbuildOptions: (options) => {
    options.banner = {
      js: '"use client"',
    };
    // Better module resolution for monorepo
    options.preserveSymlinks = false;
  },
});