import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { DynAvatar, DynBox, ThemeProvider } from '@dynui-max/core';
import type { DynAvatarProps } from '@dynui-max/core';

const meta = {
  title: 'Data/DynAvatar',
  component: DynAvatar,
  decorators: [
    (Story) => (
      <ThemeProvider defaultTheme="light">
        <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
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
          'Display user imagery with graceful fallbacks, generated initials and interactive behaviour.',
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
    },
    shape: {
      control: 'select',
      options: ['circle', 'square'],
    },
    onClick: { action: 'clicked' },
  },
} satisfies Meta<typeof DynAvatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'Ana Jovanović',
    size: 'md',
  },
};

export const WithImage: Story = {
  args: {
    src: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ana',
    alt: 'Ana avatar',
    size: 'lg',
  },
};

export const WithInitials: Story = {
  args: {
    name: 'Miloš Petrović',
    size: 'md',
  },
};

export const CustomInitials: Story = {
  args: {
    initials: 'DP',
    name: 'Displayed Initials',
    size: 'md',
    shape: 'square',
  },
};

export const SizeShowcase: Story = {
  render: (args) => (
    <DynBox display="flex" align="center" gap="lg">
      {(['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as DynAvatarProps['size'][]).map((size) => (
        <div key={size} style={{ textAlign: 'center' }}>
          <DynAvatar {...args} size={size} name={`${size.toUpperCase()} Avatar`} />
          <span style={{ display: 'block', marginTop: '0.5rem', fontSize: '0.75rem' }}>{size}</span>
        </div>
      ))}
    </DynBox>
  ),
  args: {
    src: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Size',
    alt: 'Avatar sizes',
  },
};

export const ShapeVariants: Story = {
  render: (args) => (
    <DynBox display="flex" align="center" gap="xl">
      <div style={{ textAlign: 'center' }}>
        <DynAvatar {...args} shape="circle" name="Circle" />
        <span style={{ display: 'block', marginTop: '0.5rem' }}>Circle</span>
      </div>
      <div style={{ textAlign: 'center' }}>
        <DynAvatar {...args} shape="square" name="Square" />
        <span style={{ display: 'block', marginTop: '0.5rem' }}>Square</span>
      </div>
    </DynBox>
  ),
  args: {
    src: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Shape',
    alt: 'Shape variants',
    size: 'lg',
  },
};

export const Clickable: Story = {
  render: ({ onClick, ...args }) => {
    const [clickCount, setClickCount] = useState(0);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
        <DynAvatar
          {...args}
          onClick={() => {
            setClickCount((count) => count + 1);
            onClick?.();
          }}
        />
        <span style={{ fontSize: '0.875rem', color: 'var(--dyn-color-text-muted)' }}>
          Clicked {clickCount} time{clickCount === 1 ? '' : 's'}
        </span>
      </div>
    );
  },
  args: {
    name: 'Klikni me',
    size: 'lg',
  },
};
