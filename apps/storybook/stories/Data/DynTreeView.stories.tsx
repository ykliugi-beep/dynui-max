import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { DynTreeView } from '@dynui-max/core';

const meta = {
  title: 'Data/DynTreeView',
  component: DynTreeView,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DynTreeView>;

export default meta;
type Story = StoryObj<typeof meta>;

const treeData = [
  {
    id: '1',
    label: 'Root',
    children: [
      { id: '1-1', label: 'Child 1.1' },
      {
        id: '1-2',
        label: 'Child 1.2',
        children: [
          { id: '1-2-1', label: 'Grandchild 1.2.1' },
        ],
      },
    ],
  },
];

export const Default: Story = {
  args: {
    data: treeData,
  },
};

export const Expanded: Story = {
  render: () => (
    <DynTreeView
      data={treeData}
      defaultExpandedIds={['1', '1-2']}
    />
  ),
};
