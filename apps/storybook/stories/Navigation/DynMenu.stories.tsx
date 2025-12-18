import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { DynMenu } from '@dynui-max/core';

const meta = {
  title: 'Navigation/DynMenu',
  component: DynMenu,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DynMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

const menuItems = [
  { id: '1', label: 'Home', href: '#' },
  { id: '2', label: 'About', href: '#' },
  { id: '3', label: 'Services', href: '#' },
  { id: '4', label: 'Contact', href: '#' },
];

export const Default: Story = {
  args: {
    items: menuItems,
  },
};
