import type { Meta, StoryObj } from '@storybook/react';
import { DynAvatar } from '@dynui-max/core';

const meta = {
  title: 'Data/DynAvatar',
  component: DynAvatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DynAvatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithInitials: Story = {
  args: {
    name: 'John Doe',
  },
};

export const WithImage: Story = {
  args: {
    name: 'Jane Smith',
    src: 'https://i.pravatar.cc/150?img=5',
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <DynAvatar name="John Doe" size="xs" />
      <DynAvatar name="John Doe" size="sm" />
      <DynAvatar name="John Doe" size="md" />
      <DynAvatar name="John Doe" size="lg" />
      <DynAvatar name="John Doe" size="xl" />
    </div>
  ),
};

export const Group: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '0.5rem' }}>
      <DynAvatar name="Alice Adams" />
      <DynAvatar name="Bob Brown" />
      <DynAvatar name="Charlie Clark" />
      <DynAvatar name="Diana Davis" />
    </div>
  ),
};
