import type { StorybookConfig } from '@storybook/react-vite';
import { join, dirname } from 'path';

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, 'package.json')));
}

const config: StorybookConfig = {
  stories: [
    '../stories/**/*.mdx',
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
  viteFinal: async (config) => {
    // Ensure design tokens CSS is available
    if (config.resolve) {
      config.resolve.alias = {
        ...config.resolve.alias,
        '@dynui-max/core': join(__dirname, '../../../packages/core/src'),
        '@dynui-max/design-tokens': join(
          __dirname,
          '../../../packages/design-tokens/src'
        ),
        '@dynui-max/design-tokens/css': join(
          __dirname,
          '../../../packages/design-tokens/dist/tokens.css'
        ),
      };
    }
    return config;
  },
};

export default config;