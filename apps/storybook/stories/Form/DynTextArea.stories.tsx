import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { DynTextArea } from '@dynui-max/core';

const meta = {
  title: 'Form/DynTextArea',
  component: DynTextArea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DynTextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
    rows: 4,
  },
};

export const WithValue: Story = {
  args: {
    value: 'This is some text',
    rows: 4,
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'Disabled textarea',
    disabled: true,
    rows: 4,
  },
};

export const WithError: Story = {
  args: {
    placeholder: 'Enter text...',
    error: true,
    helperText: 'This field is required',
    rows: 4,
  },
};
