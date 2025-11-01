import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { DynTextArea, DynBox, ThemeProvider } from '@dynui-max/core';
import type { DynTextAreaProps } from '@dynui-max/core';

const meta = {
  title: 'Form/DynTextArea',
  component: DynTextArea,
  decorators: [
    (Story) => (
      <ThemeProvider defaultTheme="light">
        <div style={{ padding: '2rem', maxWidth: '640px', width: '100%' }}>
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
          'Multi-line text input with auto-resize, character counting and size/variant controls built for accessibility.',
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    variant: {
      control: 'select',
      options: ['outline', 'filled', 'ghost'],
    },
    onChange: { action: 'changed' },
  },
} satisfies Meta<typeof DynTextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Leave a comment...',
  },
};

export const WithDescription: Story = {
  args: {
    placeholder: 'Tell us about your experience',
    defaultValue: 'DynTextArea provides auto-resize, focus management and design token awareness.',
    minRows: 4,
  },
};

export const WithCharacterCount: Story = {
  args: {
    placeholder: 'Write an engaging summary',
    showCount: true,
    maxLength: 140,
  },
};

export const AutoResize: Story = {
  args: {
    placeholder: 'Type a longer narrative to see auto-resize in action',
    autoResize: true,
    minRows: 3,
    maxRows: 8,
  },
};

export const SizeVariants: Story = {
  render: (args) => (
    <DynBox display="flex" direction="column" gap="lg">
      {(['sm', 'md', 'lg'] as DynTextAreaProps['size'][]).map((size) => (
        <DynTextArea key={size} {...args} size={size} placeholder={`${size.toUpperCase()} text area`} />
      ))}
    </DynBox>
  ),
  args: {
    minRows: 3,
  },
};

export const VariantShowcase: Story = {
  render: (args) => (
    <DynBox display="flex" direction="column" gap="lg">
      {(['outline', 'filled', 'ghost'] as DynTextAreaProps['variant'][]).map((variant) => (
        <DynTextArea
          key={variant}
          {...args}
          variant={variant}
          placeholder={`${variant.charAt(0).toUpperCase() + variant.slice(1)} variant`}
        />
      ))}
    </DynBox>
  ),
  args: {
    minRows: 3,
  },
};

export const Controlled: Story = {
  render: ({ onChange, ...args }) => {
    const [value, setValue] = useState('Welcome to DynTextArea!');

    return (
      <DynTextArea
        {...args}
        value={value}
        onChange={(nextValue) => {
          setValue(nextValue);
          onChange?.(nextValue);
        }}
      />
    );
  },
  args: {
    minRows: 4,
  },
};
