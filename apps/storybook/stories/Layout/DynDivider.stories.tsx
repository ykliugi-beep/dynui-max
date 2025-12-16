import type { Meta, StoryObj } from '@storybook/react';
import { DynDivider } from '@dynui-max/core';

const meta = {
  title: 'Layout/DynDivider',
  component: DynDivider,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DynDivider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  render: () => (
    <div style={{ width: '300px' }}>
      <p>Content above</p>
      <DynDivider />
      <p>Content below</p>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', height: '100px' }}>
      <span>Left content</span>
      <DynDivider orientation="vertical" />
      <span>Right content</span>
    </div>
  ),
};
