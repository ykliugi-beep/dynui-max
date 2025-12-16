import type { Meta, StoryObj } from '@storybook/react';
import { DynCheckbox } from '@dynui-max/core';

const meta = {
  title: 'Form/DynCheckbox',
  component: DynCheckbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DynCheckbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Checkbox label',
  },
};

export const Checked: Story = {
  args: {
    label: 'Checked checkbox',
    checked: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled checkbox',
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
