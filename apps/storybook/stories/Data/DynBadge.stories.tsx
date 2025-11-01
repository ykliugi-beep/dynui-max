import type { Meta, StoryObj } from '@storybook/react';
import { DynBadge, DynBox, DynIcon, ThemeProvider } from '@dynui-max/core';
import type { DynBadgeProps } from '@dynui-max/core';

const meta = {
  title: 'Data/DynBadge',
  component: DynBadge,
  decorators: [
    (Story) => (
      <ThemeProvider defaultTheme="light">
        <div style={{ padding: '2rem', display: 'flex', justifyContent: 'center' }}>
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
          'Compact status indicator with semantic color palettes, multiple visual variants and flexible sizing.',
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
    variant: {
      control: 'select',
      options: ['solid', 'outline', 'soft'],
    },
    as: {
      control: false,
    },
  },
} satisfies Meta<typeof DynBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Default badge',
    color: 'primary',
    variant: 'solid',
  },
};

export const ColorPalette: Story = {
  render: (args) => (
    <DynBox display="flex" gap="md" style={{ flexWrap: 'wrap' }}>
      {(['primary', 'success', 'warning', 'danger', 'neutral'] as DynBadgeProps['color'][]).map((color) => (
        <DynBadge key={color} {...args} color={color}>
          {color}
        </DynBadge>
      ))}
    </DynBox>
  ),
  args: {
    variant: 'solid',
  },
};

export const Variants: Story = {
  render: (args) => (
    <DynBox display="flex" gap="lg">
      {(['solid', 'outline', 'soft'] as DynBadgeProps['variant'][]).map((variant) => (
        <DynBadge key={variant} {...args} variant={variant}>
          {variant.charAt(0).toUpperCase() + variant.slice(1)}
        </DynBadge>
      ))}
    </DynBox>
  ),
  args: {
    color: 'primary',
  },
};

export const SizeVariants: Story = {
  render: (args) => (
    <DynBox display="flex" gap="lg" align="center">
      {(['sm', 'md', 'lg'] as DynBadgeProps['size'][]).map((size) => (
        <div key={size} style={{ textAlign: 'center' }}>
          <DynBadge {...args} size={size}>
            {size.toUpperCase()}
          </DynBadge>
          <span style={{ display: 'block', marginTop: '0.5rem', fontSize: '0.75rem' }}>{size}</span>
        </div>
      ))}
    </DynBox>
  ),
  args: {
    color: 'success',
    variant: 'solid',
  },
};

export const WithIcon: Story = {
  args: {
    color: 'success',
    variant: 'soft',
    size: 'md',
    children: (
      <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <DynIcon name="check" size="sm" />
        Completed
      </span>
    ),
  },
};

export const AsLink: Story = {
  args: {
    color: 'danger',
    variant: 'outline',
    as: 'a',
    href: '#alerts',
    children: 'View alerts',
  },
};
