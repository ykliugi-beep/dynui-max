import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { DynLabel } from '@dynui-max/core';

const meta = {
  title: 'Form/DynLabel',
  component: DynLabel,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DynLabel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Label',
  },
};

export const Required: Story = {
  args: {
    children: 'Required Field',
    required: true,
  },
};

export const WithIcon: Story = {
  render: () => (
    <DynLabel>
      <span>Label with icon</span>
    </DynLabel>
  ),
};
