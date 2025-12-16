import type { Meta, StoryObj } from '@storybook/react';
import { DynCard } from '@dynui-max/core';

const meta = {
  title: 'Layout/DynCard',
  component: DynCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DynCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <div style={{ padding: '1rem' }}>
        <h3>Card Title</h3>
        <p>This is card content.</p>
      </div>
    ),
  },
};

export const WithElevation: Story = {
  args: {
    elevation: 'high',
    children: (
      <div style={{ padding: '1rem' }}>
        <h3>Elevated Card</h3>
        <p>Card with high elevation shadow.</p>
      </div>
    ),
  },
};
