import type { Meta, StoryObj } from '@storybook/react';
import { DynSpinner, DynButton, DynBox, ThemeProvider } from '@dynui-max/core';

const meta = {
  title: 'Feedback/DynSpinner',
  component: DynSpinner,
  decorators: [
    (Story) => (
      <ThemeProvider defaultTheme="light">
        <Story />
      </ThemeProvider>
    ),
  ],
  args: {
    label: 'Loading data',
  },
  parameters: {
    docs: {
      description: {
        component: `
Animated loading indicator that maps directly to design token sizing and colors.

- Inline and block variants
- Semantic color mapping (primary, success, warning, danger, neutral)
- Accessible labelling via \`aria-live\`
        `,
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    color: {
      control: 'select',
      options: ['primary', 'success', 'warning', 'danger', 'neutral'],
    },
  },
} satisfies Meta<typeof DynSpinner>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => <DynSpinner {...args} />,
};

export const InlineWithButton: Story = {
  render: () => (
    <DynBox display="flex" align="center" gap="sm">
      <DynButton disabled startIcon={<DynSpinner inline size="sm" label="" />}>Saving</DynButton>
      <DynSpinner inline label="Syncing" />
    </DynBox>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Embed the spinner within buttons and inline text flows.',
      },
    },
  },
};

export const ColorPalette: Story = {
  render: () => (
    <DynBox display="flex" gap="lg" align="center">
      {(['primary', 'success', 'warning', 'danger', 'neutral'] as const).map((color) => (
        <DynSpinner key={color} color={color} label={color} />
      ))}
    </DynBox>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Semantic color mapping pulled from feedback token palette.',
      },
    },
  },
};
