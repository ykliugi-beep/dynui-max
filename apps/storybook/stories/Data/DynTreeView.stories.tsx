import type { Meta, StoryObj } from '@storybook/react';
import { DynTreeView } from '@dynui-max/core';

const meta = {
  title: 'Data/DynTreeView',
  component: DynTreeView,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DynTreeView>;

export default meta;
type Story = StoryObj<typeof meta>;

const treeData = [
  {
    id: '1',
    label: 'Root 1',
    children: [
      { id: '1-1', label: 'Child 1-1' },
      { id: '1-2', label: 'Child 1-2', children: [
        { id: '1-2-1', label: 'Grandchild 1-2-1' },
      ]},
    ],
  },
  {
    id: '2',
    label: 'Root 2',
    children: [
      { id: '2-1', label: 'Child 2-1' },
      { id: '2-2', label: 'Child 2-2' },
    ],
  },
];

export const Default: Story = {
  args: {
    data: treeData,
  },
};

export const ExpandedByDefault: Story = {
  args: {
    data: treeData,
    defaultExpanded: ['1', '2'],
  },
};
