import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { DynBreadcrumb } from '@dynui-max/core';

const meta = {
  title: 'Navigation/DynBreadcrumb',
  component: DynBreadcrumb,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DynBreadcrumb>;

export default meta;
type Story = StoryObj<typeof meta>;

const items = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'Electronics', href: '/products/electronics' },
  { label: 'Laptop', active: true },
];

export const Default: Story = {
  args: {
    items: items,
  },
};
