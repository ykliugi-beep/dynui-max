import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { DynPagination, DynBox, DynTable, ThemeProvider } from '@dynui-max/core';

const meta = {
  title: 'Navigation/DynPagination',
  component: DynPagination,
  decorators: [
    (Story) => (
      <ThemeProvider defaultTheme="light">
        <Story />
      </ThemeProvider>
    ),
  ],
  args: {
    totalPages: 8,
    currentPage: 1,
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
Token-driven pagination control with ellipsis collapsing and accessible labelling.

- Supports sibling and boundary counts
- First/last and previous/next controls
- Keyboard and screen reader friendly
        `,
      },
    },
  },
  argTypes: {
    siblingCount: {
      control: { type: 'number', min: 0, max: 3 },
    },
    boundaryCount: {
      control: { type: 'number', min: 0, max: 3 },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
} satisfies Meta<typeof DynPagination>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => {
    const [page, setPage] = useState(args.currentPage ?? 1);
    return (
      <DynPagination
        {...args}
        currentPage={page}
        onPageChange={setPage}
      />
    );
  },
};

export const Compact: Story = {
  args: {
    siblingCount: 0,
    boundaryCount: 0,
    size: 'sm',
  },
  render: (args) => {
    const [page, setPage] = useState(3);
    return (
      <DynPagination
        {...args}
        totalPages={5}
        currentPage={page}
        onPageChange={setPage}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Compact configuration ideal for tables and card footers.',
      },
    },
  },
};

export const WithDataTable: Story = {
  render: () => {
    const [page, setPage] = useState(1);
    const pageSize = 5;
    const rows = Array.from({ length: 23 }).map((_, index) => ({
      id: index + 1,
      name: `Record ${index + 1}`,
    }));
    const slice = rows.slice((page - 1) * pageSize, page * pageSize);

    return (
      <DynBox display="flex" direction="column" gap="md">
        <DynTable
          columns={[
            { key: 'id', title: 'ID', dataIndex: 'id' },
            { key: 'name', title: 'Name', dataIndex: 'name' },
          ]}
          dataSource={slice}
        />
        <DynBox display="flex" justify="space-between" align="center">
          <span style={{ fontSize: '0.875rem' }}>
            Showing {(page - 1) * pageSize + 1}–{Math.min(page * pageSize, rows.length)} of {rows.length}
          </span>
          <DynPagination
            totalPages={Math.ceil(rows.length / pageSize)}
            currentPage={page}
            onPageChange={setPage}
          />
        </DynBox>
      </DynBox>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Realistic pagination usage paired with the DynTable component.',
      },
    },
  },
};
