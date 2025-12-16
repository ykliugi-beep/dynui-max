import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { DynSelect } from '@dynui-max/core';

const meta = {
  title: 'Form/DynSelect',
  component: DynSelect,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DynSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

const options = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
  { value: '3', label: 'Option 3' },
];

export const Default: Story = {
  args: {
    options: options,
    placeholder: 'Select an option...',
  },
};

export const WithValue: Story = {
  args: {
    options: options,
    value: '1',
  },
};

export const Disabled: Story = {
  args: {
    options: options,
    disabled: true,
    placeholder: 'Disabled select',
  },
};
