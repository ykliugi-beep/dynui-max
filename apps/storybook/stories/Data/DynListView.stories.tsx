import type { Meta, StoryObj } from '@storybook/react';
import { DynListView } from '@dynui-max/core';

const meta = {
  title: 'Data/DynListView',
  component: DynListView,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DynListView>;

export default meta;
type Story = StoryObj<typeof meta>;

const items = [
  { id: '1', title: 'Item 1', description: 'Description for item 1' },
  { id: '2', title: 'Item 2', description: 'Description for item 2' },
  { id: '3', title: 'Item 3', description: 'Description for item 3' },
];

export const Default: Story = {
  args: {
    items: items,
    renderItem: (item) => (
      <div style={{ padding: '0.5rem' }}>
        <strong>{item.title}</strong>
        <p style={{ margin: 0, fontSize: '0.875rem', color: '#666' }}>{item.description}</p>
      </div>
    ),
  },
};

export const WithDividers: Story = {
  args: {
    items: items,
    dividers: true,
    renderItem: (item) => (
      <div style={{ padding: '1rem' }}>
        <strong>{item.title}</strong>
        <p style={{ margin: 0, fontSize: '0.875rem' }}>{item.description}</p>
      </div>
    ),
  },
};
