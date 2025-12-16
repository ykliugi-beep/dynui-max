import type { Meta, StoryObj } from '@storybook/react';
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

export const Default: Story = {
  args: {
    options: [
      { value: '1', label: 'Option 1' },
      { value: '2', label: 'Option 2' },
      { value: '3', label: 'Option 3' },
    ],
    placeholder: 'Select an option...',
  },
};

export const WithValue: Story = {
  args: {
    options: [
      { value: 'red', label: 'Red' },
      { value: 'green', label: 'Green' },
      { value: 'blue', label: 'Blue' },
    ],
    value: 'green',
  },
};

export const Disabled: Story = {
  args: {
    options: [
      { value: '1', label: 'Option 1' },
      { value: '2', label: 'Option 2' },
    ],
    disabled: true,
  },
};
