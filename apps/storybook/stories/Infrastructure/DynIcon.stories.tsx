import type { Meta, StoryObj } from '@storybook/react';
import { DynIcon } from '@dynui-max/core';

const meta = {
  title: 'Infrastructure/DynIcon',
  component: DynIcon,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DynIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'check',
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <DynIcon name="check" size="xs" />
      <DynIcon name="check" size="sm" />
      <DynIcon name="check" size="md" />
      <DynIcon name="check" size="lg" />
      <DynIcon name="check" size="xl" />
    </div>
  ),
};

export const CommonIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <DynIcon name="check" />
      <DynIcon name="close" />
      <DynIcon name="arrow-right" />
      <DynIcon name="arrow-left" />
      <DynIcon name="search" />
      <DynIcon name="settings" />
      <DynIcon name="user" />
      <DynIcon name="spinner" />
    </div>
  ),
};
