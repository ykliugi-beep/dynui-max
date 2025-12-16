import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { DynCard } from '@dynui-max/core';

const meta = {
  title: 'Layout/DynCard',
  component: DynCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DynCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'This is a card',
  },
};

export const WithHeader: Story = {
  args: {
    header: 'Card Header',
    children: 'Card content goes here',
  },
};

export const WithFooter: Story = {
  args: {
    header: 'Card Header',
    children: 'Card content goes here',
    footer: 'Card Footer',
  },
};
