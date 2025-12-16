import type { Meta, StoryObj } from '@storybook/react';
import { DynBadge } from '@dynui-max/core';

const meta = {
  title: 'Data/DynBadge',
  component: DynBadge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DynBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Badge',
  },
};

export const Primary: Story = {
  args: {
    children: 'Primary',
    color: 'primary',
  },
};

export const Success: Story = {
  args: {
    children: 'Success',
    color: 'success',
  },
};

export const Warning: Story = {
  args: {
    children: 'Warning',
    color: 'warning',
  },
};

export const Danger: Story = {
  args: {
    children: 'Danger',
    color: 'danger',
  },
};

export const AllColors: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
      <DynBadge color="primary">Primary</DynBadge>
      <DynBadge color="secondary">Secondary</DynBadge>
      <DynBadge color="success">Success</DynBadge>
      <DynBadge color="danger">Danger</DynBadge>
      <DynBadge color="warning">Warning</DynBadge>
      <DynBadge color="info">Info</DynBadge>
    </div>
  ),
};
