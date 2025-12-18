import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { DynDivider } from '@dynui-max/core';

const meta = {
  title: 'Layout/DynDivider',
  component: DynDivider,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DynDivider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div>
      <p>Content above</p>
      <DynDivider />
      <p>Content below</p>
    </div>
  ),
};

export const WithLabel: Story = {
  render: () => (
    <div>
      <p>Content above</p>
      <DynDivider label="or" />
      <p>Content below</p>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <p>Left content</p>
      <DynDivider orientation="vertical" />
      <p>Right content</p>
    </div>
  ),
};
