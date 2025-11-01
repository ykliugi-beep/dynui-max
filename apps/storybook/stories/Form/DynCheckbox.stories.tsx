import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { DynCheckbox, DynBox, ThemeProvider } from '@dynui-max/core';
import type { DynCheckboxProps } from '@dynui-max/core';

const meta = {
  title: 'Form/DynCheckbox',
  component: DynCheckbox,
  decorators: [
    (Story) => (
      <ThemeProvider defaultTheme="light">
        <div style={{ padding: '2rem', display: 'flex', justifyContent: 'center' }}>
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
          'Accessible checkbox component with indeterminate support, flexible sizing and rich helper content.',
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    onChange: { action: 'changed' },
  },
} satisfies Meta<typeof DynCheckbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Receive notifications',
  },
};

export const WithDescription: Story = {
  args: {
    label: 'Enable weekly summary emails',
    description: 'Get one email every Monday with the latest updates.',
  },
};

export const Disabled: Story = {
  args: {
    label: 'This option is disabled',
    disabled: true,
  },
};

export const WithError: Story = {
  args: {
    label: 'I agree to the terms of service',
    error: true,
    required: true,
  },
};

export const SizeVariants: Story = {
  render: (args) => (
    <DynBox display="flex" direction="column" gap="md">
      {(['sm', 'md', 'lg'] as DynCheckboxProps['size'][]).map((size) => (
        <DynCheckbox key={size} {...args} size={size} label={`${size.toUpperCase()} checkbox`} />
      ))}
    </DynBox>
  ),
};

export const Indeterminate: Story = {
  args: {
    label: 'Partially selected',
    indeterminate: true,
  },
};

export const Controlled: Story = {
  render: ({ onChange, ...args }) => {
    const [checked, setChecked] = useState(true);

    return (
      <DynCheckbox
        {...args}
        checked={checked}
        onChange={(value) => {
          setChecked(value);
          onChange?.(value);
        }}
      />
    );
  },
  args: {
    label: 'Controlled checkbox',
  },
};

export const CheckboxGroup: Story = {
  render: () => {
    const [preferences, setPreferences] = useState({
      analytics: true,
      performance: false,
      marketing: false,
    });

    const togglePreference = (key: keyof typeof preferences) => (value: boolean) => {
      setPreferences((prev) => ({ ...prev, [key]: value }));
    };

    return (
      <DynBox display="flex" direction="column" gap="sm">
        <DynCheckbox
          label="Analytics cookies"
          description="Helps us understand how our product is used."
          checked={preferences.analytics}
          onChange={togglePreference('analytics')}
        />
        <DynCheckbox
          label="Performance cookies"
          description="Improves site speed and reliability."
          checked={preferences.performance}
          onChange={togglePreference('performance')}
        />
        <DynCheckbox
          label="Marketing cookies"
          description="Personalises offers and promotions."
          checked={preferences.marketing}
          onChange={togglePreference('marketing')}
        />
      </DynBox>
    );
  },
};
