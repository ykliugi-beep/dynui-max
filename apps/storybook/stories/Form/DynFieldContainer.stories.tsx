import type { Meta, StoryObj } from '@storybook/react';
import { DynFieldContainer, DynInput, DynLabel } from '@dynui-max/core';

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

export const WithInput: Story = {
  render: () => (
    <DynFieldContainer>
      <DynLabel htmlFor="email">Email Address</DynLabel>
      <DynInput id="email" type="email" placeholder="you@example.com" />
    </DynFieldContainer>
  ),
};

export const WithError: Story = {
  render: () => (
    <DynFieldContainer error="This field is required">
      <DynLabel htmlFor="username">Username</DynLabel>
      <DynInput id="username" error />
    </DynFieldContainer>
  ),
};

export const WithHelperText: Story = {
  render: () => (
    <DynFieldContainer helperText="Choose a unique username">
      <DynLabel htmlFor="username2">Username</DynLabel>
      <DynInput id="username2" placeholder="johndoe" />
    </DynFieldContainer>
  ),
};
