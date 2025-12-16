import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { DynProgress } from '@dynui-max/core';

const meta = {
  title: 'Feedback/DynProgress',
  component: DynProgress,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100 },
    },
    color: {
      control: 'select',
      options: ['primary', 'success', 'warning', 'danger'],
    },
  },
} satisfies Meta<typeof DynProgress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 65,
  },
};

export const Success: Story = {
  args: {
    value: 100,
    color: 'success',
  },
};

export const Warning: Story = {
  args: {
    value: 75,
    color: 'warning',
  },
};

export const Danger: Story = {
  args: {
    value: 30,
    color: 'danger',
  },
};
