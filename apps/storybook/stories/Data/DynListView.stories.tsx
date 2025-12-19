import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { DynListView } from '@dynui-max/core';

const meta = {
  title: 'Data/DynListView',
  component: DynListView,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DynListView>;

export default meta;
type Story = StoryObj<typeof meta>;

const items = [
  { id: '1', title: 'Item 1', description: 'First item' },
  { id: '2', title: 'Item 2', description: 'Second item' },
  { id: '3', title: 'Item 3', description: 'Third item' },
];

export const Default: Story = {
  args: {
    items: items,
    renderItem: (item) => (
      <div style={{ padding: '0.5rem' }}>
        <strong>{item.title}</strong>
        <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.9em', color: '#666' }}>
          {item.description}
        </p>
      </div>
    ),
  },
};

export const CustomRender: Story = {
  render: () => (
    <DynListView
      items={items}
      renderItem={(item) => (
        <div style={{ padding: '1rem', borderBottom: '1px solid #eee' }}>
          <h3 style={{ margin: 0 }}>{item.title}</h3>
          <p style={{ margin: '0.5rem 0 0 0', color: '#999' }}>{item.description}</p>
        </div>
      )}
    />
  ),
};
