import type { Meta, StoryObj } from '@storybook/react';
import { DynContainer } from '@dynui-max/core';

const meta = {
  title: 'Layout/DynContainer',
  component: DynContainer,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DynContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <div style={{ padding: '2rem', background: '#f5f5f5' }}>
        <h2>Container Content</h2>
        <p>This container has max-width constraints and centers content.</p>
      </div>
    ),
  },
};

export const Fluid: Story = {
  args: {
    fluid: true,
    children: (
      <div style={{ padding: '2rem', background: '#e0f2fe' }}>
        <h2>Fluid Container</h2>
        <p>This container takes full width.</p>
      </div>
    ),
  },
};
