import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { DynRadio, DynRadioGroup, DynBox, ThemeProvider } from '@dynui-max/core';
import type { DynRadioGroupProps } from '@dynui-max/core';

const meta = {
  title: 'Form/DynRadio',
  component: DynRadio,
  decorators: [
    (Story) => (
      <ThemeProvider defaultTheme="light">
        <div style={{ padding: '2rem', maxWidth: '640px', width: '100%' }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Radio button and group primitives with full keyboard support, orientation control and error handling.',
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
} satisfies Meta<typeof DynRadio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <DynRadioGroup defaultValue="email" name="notification-channel">
      <DynRadio value="email" label="Email" description="Get notified via email." />
      <DynRadio value="sms" label="SMS" description="Receive text messages." />
      <DynRadio value="push" label="Push" description="Mobile push notifications." />
    </DynRadioGroup>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <DynRadioGroup defaultValue="medium" orientation="horizontal" name="size">
      <DynRadio value="small" label="Small" />
      <DynRadio value="medium" label="Medium" />
      <DynRadio value="large" label="Large" />
    </DynRadioGroup>
  ),
};

export const DisabledGroup: Story = {
  render: () => (
    <DynRadioGroup defaultValue="basic" disabled>
      <DynRadio value="basic" label="Basic plan" />
      <DynRadio value="pro" label="Pro plan" />
      <DynRadio value="enterprise" label="Enterprise plan" />
    </DynRadioGroup>
  ),
};

export const ErrorState: Story = {
  render: () => (
    <DynRadioGroup defaultValue="monthly" error name="billing-interval">
      <DynRadio value="monthly" label="Monthly" />
      <DynRadio value="yearly" label="Yearly" description="Save 20%" />
    </DynRadioGroup>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState('design');

    return (
      <DynRadioGroup value={value} onChange={setValue} name="team">
        <DynRadio value="design" label="Design" />
        <DynRadio value="development" label="Development" />
        <DynRadio value="marketing" label="Marketing" />
      </DynRadioGroup>
    );
  },
};

export const SizeVariants: Story = {
  render: () => (
    <DynBox display="flex" direction="column" gap="lg">
      {(['sm', 'md', 'lg'] as DynRadioGroupProps['size'][]).map((size) => (
        <DynRadioGroup key={size} defaultValue="option-1" size={size} orientation="horizontal" name={`size-${size}`}>
          <DynRadio value="option-1" label={`${size.toUpperCase()} 1`} />
          <DynRadio value="option-2" label={`${size.toUpperCase()} 2`} />
          <DynRadio value="option-3" label={`${size.toUpperCase()} 3`} />
        </DynRadioGroup>
      ))}
    </DynBox>
  ),
};
