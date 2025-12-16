import type { Meta, StoryObj } from '@storybook/react';
import { DynPagination } from '@dynui-max/core';
import { useState } from 'react';

const meta = {
  title: 'Navigation/DynPagination',
  component: DynPagination,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DynPagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [page, setPage] = useState(1);
    return (
      <DynPagination
        currentPage={page}
        totalPages={10}
        onPageChange={setPage}
      />
    );
  },
};

export const ManyPages: Story = {
  render: () => {
    const [page, setPage] = useState(1);
    return (
      <DynPagination
        currentPage={page}
        totalPages={50}
        onPageChange={setPage}
      />
    );
  },
};
