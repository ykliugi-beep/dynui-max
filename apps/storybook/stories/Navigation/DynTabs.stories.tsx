import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { DynTabs } from '@dynui-max/core';

const meta = {
  title: 'Navigation/DynTabs',
  component: DynTabs,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DynTabs>;

export default meta;
type Story = StoryObj<typeof meta>;

const tabs = [
  { id: '1', label: 'Tab 1', content: 'Content for Tab 1' },
  { id: '2', label: 'Tab 2', content: 'Content for Tab 2' },
  { id: '3', label: 'Tab 3', content: 'Content for Tab 3' },
];

export const Default: Story = {
  render: () => (
    <DynTabs
      tabs={tabs}
      defaultTabId="1"
    />
  ),
};
