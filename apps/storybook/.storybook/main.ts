import type { StorybookConfig } from '@storybook/react-vite';
import { resolve } from 'path';
import type { InlineConfig } from 'vite';

const config: StorybookConfig = {
  stories: [
    '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'
  ],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
    '@storybook/addon-docs'
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {}
  },
  features: {
    buildStoriesJson: true
  },
  typescript: {
    check: true,
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      shouldRemoveUndefinedFromOptional: true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  },
  async viteFinal(config: InlineConfig) {
    // Add aliases for design-tokens CSS exports
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...config.resolve.alias,
      // Use relative path from storybook directory to design-tokens dist
      '@dynui-max/design-tokens/css': resolve(__dirname, '../../../packages/design-tokens/dist/tokens.css'),
      '@dynui-max/design-tokens/css-dark': resolve(__dirname, '../../../packages/design-tokens/dist/tokens-dark.css'),
      '@dynui-max/design-tokens/css-variables': resolve(__dirname, '../../../packages/design-tokens/dist/variables.css'),
    };
    return config;
  },
};

export default config;
