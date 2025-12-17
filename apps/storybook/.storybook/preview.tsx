import type { Preview } from '@storybook/react';

// CSS iz design-tokens paketa (dist fajlovi)
import '@dynui-max/design-tokens/dist/tokens.css';
import '@dynui-max/design-tokens/dist/tokens-dark.css';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
