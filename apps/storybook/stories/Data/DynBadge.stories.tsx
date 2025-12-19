import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { DynBadge } from '@dynui-max/core';

const meta = {
  title: 'Data/DynBadge',
  component: DynBadge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['solid', 'outline', 'ghost'],
    },
    color: {
      control: 'select',
      options: ['primary', 'success', 'warning', 'danger', 'info'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
} satisfies Meta<typeof DynBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Badge',
  },
};

export const Outline: Story = {
  args: {
    children: 'Outline',
    variant: 'outline',
  },
};

export const Ghost: Story = {
  args: {
    children: 'Ghost',
    variant: 'ghost',
  },
};

export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
      <DynBadge color="primary">Primary</DynBadge>
      <DynBadge color="success">Success</DynBadge>
      <DynBadge color="warning">Warning</DynBadge>
      <DynBadge color="danger">Danger</DynBadge>
      <DynBadge color="info">Info</DynBadge>
    </div>
  ),
};
