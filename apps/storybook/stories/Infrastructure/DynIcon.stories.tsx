import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { DynIcon } from '@dynui-max/core';

const meta = {
  title: 'Infrastructure/DynIcon',
  component: DynIcon,
  parameters: {
    layout: 'padded',
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

export const AllIcons: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(60px, 1fr))', gap: '1rem' }}>
      <div style={{ textAlign: 'center' }}>
        <DynIcon name="check" />
        <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.85em' }}>check</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <DynIcon name="arrow-right" />
        <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.85em' }}>arrow-right</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <DynIcon name="close" />
        <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.85em' }}>close</p>
      </div>
    </div>
  ),
};
