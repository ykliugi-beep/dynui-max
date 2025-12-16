import type { StorybookConfig } from '@storybook/react-vite';
import { join, dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import type { InlineConfig } from 'vite';

// Get __dirname equivalent in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, 'package.json')));
}

const config: StorybookConfig = {
  stories: [
    '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'
  ],
  addons: [
    getAbsolutePath('@storybook/addon-essentials'),
    getAbsolutePath('@storybook/addon-interactions'),
    getAbsolutePath('@storybook/addon-a11y'),
    getAbsolutePath('@storybook/addon-docs')
  ],
  framework: {
    name: getAbsolutePath('@storybook/react-vite'),
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
      '@dynui-max/design-tokens/css': resolve(__dirname, '../../../packages/design-tokens/dist/tokens.css'),
      '@dynui-max/design-tokens/css-dark': resolve(__dirname, '../../../packages/design-tokens/dist/tokens-dark.css'),
      '@dynui-max/design-tokens/css-variables': resolve(__dirname, '../../../packages/design-tokens/dist/variables.css'),
    };
    return config;
  },
};

export default config;
