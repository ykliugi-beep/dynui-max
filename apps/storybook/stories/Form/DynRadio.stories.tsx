import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { DynRadio } from '@dynui-max/core';

const meta = {
  title: 'Form/DynRadio',
  component: DynRadio,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DynRadio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Radio label',
  },
};

export const Checked: Story = {
  args: {
    label: 'Checked radio',
    checked: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled radio',
    disabled: true,
  },
};

export const CheckedDisabled: Story = {
  args: {
    label: 'Checked and disabled',
    checked: true,
    disabled: true,
  },
};

export const RadioGroup: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <DynRadio label="Option 1" name="group" value="1" />
      <DynRadio label="Option 2" name="group" value="2" />
      <DynRadio label="Option 3" name="group" value="3" />
    </div>
  ),
};
