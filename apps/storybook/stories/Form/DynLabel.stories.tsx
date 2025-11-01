import type { Meta, StoryObj } from '@storybook/react';
import { DynLabel, DynInput, DynBox, ThemeProvider } from '@dynui-max/core';
import type { DynLabelProps } from '@dynui-max/core';

const meta = {
  title: 'Form/DynLabel',
  component: DynLabel,
  decorators: [
    (Story) => (
      <ThemeProvider defaultTheme="light">
        <div style={{ padding: '2rem', maxWidth: '480px', width: '100%' }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Typography-aware form label with optional required indicator, weight variations and disabled styling.',
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    weight: {
      control: 'select',
      options: ['normal', 'medium', 'semibold'],
    },
  },
} satisfies Meta<typeof DynLabel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Email address',
    htmlFor: 'email',
  },
};

export const Required: Story = {
  args: {
    children: 'Password',
    htmlFor: 'password',
    required: true,
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled label',
    htmlFor: 'disabled-input',
    disabled: true,
  },
};

export const SizeVariants: Story = {
  render: (args) => (
    <DynBox display="flex" direction="column" gap="sm">
      {(['sm', 'md', 'lg'] as DynLabelProps['size'][]).map((size) => (
        <DynLabel key={size} {...args} size={size}>
          {size.toUpperCase()} label
        </DynLabel>
      ))}
    </DynBox>
  ),
};

export const WeightVariants: Story = {
  render: (args) => (
    <DynBox display="flex" direction="column" gap="sm">
      {(['normal', 'medium', 'semibold'] as DynLabelProps['weight'][]).map((weight) => (
        <DynLabel key={weight} {...args} weight={weight}>
          {weight.charAt(0).toUpperCase() + weight.slice(1)} label
        </DynLabel>
      ))}
    </DynBox>
  ),
  args: {
    size: 'md',
  },
};

export const WithInput: Story = {
  render: () => (
    <DynBox display="flex" direction="column" gap="sm">
      <DynLabel htmlFor="name" required>
        Full name
      </DynLabel>
      <DynInput id="name" placeholder="John Doe" />
    </DynBox>
  ),
};
