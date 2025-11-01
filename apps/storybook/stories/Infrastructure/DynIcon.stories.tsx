import type { Meta, StoryObj } from '@storybook/react';
import { DynIcon, ThemeProvider, iconRegistry, DynBox } from '@dynui-max/core';
import type { DynIconProps } from '@dynui-max/core';

const meta = {
  title: 'Infrastructure/DynIcon',
  component: DynIcon,
  decorators: [
    (Story) => (
      <ThemeProvider defaultTheme="light">
        <div style={{ padding: '2rem' }}>
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
          'SVG icon component backed by a registry for consistent sizing, colors and accessibility across DynUI.',
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
      options: ['current', 'primary', 'secondary', 'muted', 'success', 'warning', 'danger'],
    },
  },
} satisfies Meta<typeof DynIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'check',
    size: 'md',
    color: 'primary',
    title: 'Success',
  },
};

export const AvailableIcons: Story = {
  render: () => {
    const icons = iconRegistry.getNames();

    return (
      <DynBox display="flex" gap="lg" style={{ flexWrap: 'wrap', maxWidth: '480px' }}>
        {icons.map((icon) => (
          <div key={icon} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
            <DynIcon name={icon} size="lg" />
            <span style={{ fontSize: '0.75rem' }}>{icon}</span>
          </div>
        ))}
      </DynBox>
    );
  },
};

export const ColorVariants: Story = {
  render: (args) => (
    <DynBox display="flex" gap="lg">
      {(['current', 'primary', 'secondary', 'muted', 'success', 'warning', 'danger'] as DynIconProps['color'][]).map((color) => (
        <div key={color} style={{ textAlign: 'center' }}>
          <DynIcon {...args} color={color} />
          <span style={{ display: 'block', marginTop: '0.5rem', fontSize: '0.75rem' }}>{color}</span>
        </div>
      ))}
    </DynBox>
  ),
  args: {
    name: 'check',
    size: 'lg',
  },
};

export const SizeVariants: Story = {
  render: (args) => (
    <DynBox display="flex" gap="lg" align="center">
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <div key={size} style={{ textAlign: 'center' }}>
          <DynIcon {...args} size={size} />
          <span style={{ display: 'block', marginTop: '0.5rem', fontSize: '0.75rem' }}>{size}</span>
        </div>
      ))}
    </DynBox>
  ),
  args: {
    name: 'spinner',
    color: 'primary',
  },
};
