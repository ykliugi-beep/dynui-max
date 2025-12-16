import type { Meta, StoryObj } from '@storybook/react';
import { DynMenu } from '@dynui-max/core';

const meta = {
  title: 'Navigation/DynMenu',
  component: DynMenu,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DynMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      { label: 'Profile', onClick: () => console.log('Profile clicked') },
      { label: 'Settings', onClick: () => console.log('Settings clicked') },
      { label: 'Logout', onClick: () => console.log('Logout clicked'), variant: 'danger' },
    ],
  },
};
