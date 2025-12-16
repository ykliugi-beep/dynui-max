import type { Meta, StoryObj } from '@storybook/react';
import { DynBox } from '@dynui-max/core';

const meta = {
  title: 'Layout/DynBox',
  component: DynBox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DynBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'This is a Box component',
    style: { padding: '2rem', background: '#f5f5f5', borderRadius: '8px' },
  },
};

export const WithPadding: Story = {
  args: {
    children: 'Box with padding',
    p: '2rem',
    style: { background: '#f5f5f5', borderRadius: '8px' },
  },
};

export const AsSection: Story = {
  args: {
    as: 'section',
    children: 'Box rendered as <section>',
    style: { padding: '2rem', background: '#e0f2fe', borderRadius: '8px' },
  },
};
