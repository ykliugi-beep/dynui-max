import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { DynFieldContainer, DynInput } from '@dynui-max/core';

const meta = {
  title: 'Form/DynFieldContainer',
  component: DynFieldContainer,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DynFieldContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Field Label',
    children: <DynInput placeholder="Enter value..." />,
  },
};

export const WithError: Story = {
  args: {
    label: 'Field Label',
    error: true,
    helperText: 'This field has an error',
    children: <DynInput placeholder="Enter value..." />,
  },
};

export const WithSuccess: Story = {
  args: {
    label: 'Field Label',
    success: true,
    helperText: 'This field is valid',
    children: <DynInput placeholder="Enter value..." />,
  },
};

export const Required: Story = {
  args: {
    label: 'Field Label',
    required: true,
    children: <DynInput placeholder="Enter value..." />,
  },
};
