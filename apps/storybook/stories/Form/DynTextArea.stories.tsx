import type { Meta, StoryObj } from '@storybook/react';
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
    placeholder: 'Enter your message...',
  },
};

export const WithValue: Story = {
  args: {
    value: 'This is a multi-line\ntext area\nwith initial content.',
  },
};

export const Resizable: Story = {
  args: {
    placeholder: 'Resizable textarea',
    rows: 4,
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'Disabled textarea',
    disabled: true,
  },
};
