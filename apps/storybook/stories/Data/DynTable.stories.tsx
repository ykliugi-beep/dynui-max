import type { Meta, StoryObj } from '@storybook/react';
import { DynTable } from '@dynui-max/core';

const meta = {
  title: 'Data/DynTable',
  component: DynTable,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DynTable>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleData = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User' },
];

const columns = [
  { key: 'id', label: 'ID', width: '80px' },
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'role', label: 'Role' },
];

export const Default: Story = {
  args: {
    data: sampleData,
    columns: columns,
  },
};

export const Striped: Story = {
  args: {
    data: sampleData,
    columns: columns,
    striped: true,
  },
};

export const Hoverable: Story = {
  args: {
    data: sampleData,
    columns: columns,
    hoverable: true,
  },
};
