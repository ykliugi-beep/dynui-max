import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../stories/**/*.mdx', '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  viteFinal: (config, options) => {
    // Force clear cache on every rebuild
    return {
      ...config,
      server: {
        ...config.server,
        middlewareMode: true,
      },
      optimizeDeps: {
        ...config.optimizeDeps,
        force: true, // Force re-optimization
      },
    };
  },
};

export default config;
