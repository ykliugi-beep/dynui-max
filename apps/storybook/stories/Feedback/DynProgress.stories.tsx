import type { Meta, StoryObj } from '@storybook/react';
import { DynProgress } from '@dynui-max/core';

const meta = {
  title: 'Feedback/DynProgress',
  component: DynProgress,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DynProgress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 50,
  },
};

export const Zero: Story = {
  args: {
    value: 0,
  },
};

export const Complete: Story = {
  args: {
    value: 100,
  },
};

export const WithLabel: Story = {
  args: {
    value: 75,
    showLabel: true,
  },
};

export const DifferentColors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '300px' }}>
      <DynProgress value={30} color="primary" />
      <DynProgress value={50} color="success" />
      <DynProgress value={70} color="warning" />
      <DynProgress value={90} color="danger" />
    </div>
  ),
};
