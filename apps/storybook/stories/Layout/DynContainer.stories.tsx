import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
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
    children: 'Container content',
    style: { background: '#f5f5f5', padding: '2rem', minHeight: '200px' },
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    children: 'Small container',
    style: { background: '#f5f5f5', padding: '2rem', minHeight: '200px' },
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    children: 'Large container',
    style: { background: '#f5f5f5', padding: '2rem', minHeight: '200px' },
  },
};
