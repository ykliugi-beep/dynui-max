import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { DynToast, DynButton } from '@dynui-max/core';

const meta = {
  title: 'Feedback/DynToast',
  component: DynToast,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['success', 'error', 'warning', 'info'],
    },
  },
} satisfies Meta<typeof DynToast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {
  render: () => (
    <DynButton
      onClick={() => {
        // Toast implementation
      }}
    >
      Show Success Toast
    </DynButton>
  ),
};

export const Error: Story = {
  render: () => (
    <DynButton
      color="danger"
      onClick={() => {
        // Toast implementation
      }}
    >
      Show Error Toast
    </DynButton>
  ),
};

export const Warning: Story = {
  render: () => (
    <DynButton
      color="warning"
      onClick={() => {
        // Toast implementation
      }}
    >
      Show Warning Toast
    </DynButton>
  ),
};
