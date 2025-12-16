import type { Meta, StoryObj } from '@storybook/react';
import { DynButton } from '@dynui-max/core';
import { DynIcon } from '@dynui-max/core';

const meta = {
  title: 'Form/DynButton',
  component: DynButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['solid', 'outline', 'ghost', 'link'],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'danger', 'warning', 'info'],
    },
  },
} satisfies Meta<typeof DynButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'Primary Button',
    variant: 'solid',
    color: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    variant: 'solid',
    color: 'secondary',
  },
};

export const Outline: Story = {
  args: {
    children: 'Outline Button',
    variant: 'outline',
    color: 'primary',
  },
};

export const Ghost: Story = {
  args: {
    children: 'Ghost Button',
    variant: 'ghost',
    color: 'primary',
  },
};

export const Loading: Story = {
  args: {
    children: 'Loading Button',
    loading: true,
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled Button',
    disabled: true,
  },
};

export const WithStartIcon: Story = {
  args: {
    children: 'With Icon',
    startIcon: <DynIcon name="check" />,
  },
};

export const WithEndIcon: Story = {
  args: {
    children: 'With Icon',
    endIcon: <DynIcon name="arrow-right" />,
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
      <DynButton size="xs">Extra Small</DynButton>
      <DynButton size="sm">Small</DynButton>
      <DynButton size="md">Medium</DynButton>
      <DynButton size="lg">Large</DynButton>
      <DynButton size="xl">Extra Large</DynButton>
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <DynButton color="primary">Primary</DynButton>
      <DynButton color="secondary">Secondary</DynButton>
      <DynButton color="success">Success</DynButton>
      <DynButton color="danger">Danger</DynButton>
      <DynButton color="warning">Warning</DynButton>
      <DynButton color="info">Info</DynButton>
    </div>
  ),
};
