import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: false,
  sourcemap: true,
  clean: true,
  external: ['react', 'react-dom'],
  splitting: false,
  treeshake: true,
  tsconfig: './tsconfig.json',
  esbuildOptions: (options) => {
    options.banner = {
      js: '"use client"',
    };
  },
});