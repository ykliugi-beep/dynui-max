import type { Meta, StoryObj } from '@storybook/react';
import { DynSpinner } from '@dynui-max/core';

const meta = {
  title: 'Feedback/DynSpinner',
  component: DynSpinner,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DynSpinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Small: Story = {
  args: {
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
      <DynSpinner size="sm" />
      <DynSpinner size="md" />
      <DynSpinner size="lg" />
    </div>
  ),
};
