import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: false, // Disable tsup's dts generation, use tsc instead
  sourcemap: true,
  clean: true,
  external: ['react', 'react-dom'],
  esbuildOptions: (options) => {
    options.banner = {
      js: '"use client"',
    };
  },
});