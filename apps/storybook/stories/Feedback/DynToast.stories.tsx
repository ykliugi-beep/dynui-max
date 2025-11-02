import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import {
  DynToast,
  DynButton,
  DynBox,
  DynIcon,
  ThemeProvider,
} from '@dynui-max/core';

const meta = {
  title: 'Feedback/DynToast',
  component: DynToast,
  decorators: [
    (Story) => (
      <ThemeProvider defaultTheme="light">
        <Story />
      </ThemeProvider>
    ),
  ],
  args: {
    status: 'info',
    title: 'Heads up',
    description: 'Profile settings have been moved to the account tab.',
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Transient notification surface with semantic status colors and dismiss controls.

- Roles map to \`status\` or \`alert\` for assistive technology
- Supports optional actions and dismiss callbacks
- Styled with design tokens for color, spacing, and shadows
        `,
      },
    },
  },
  argTypes: {
    status: {
      control: 'select',
      options: ['info', 'success', 'warning', 'danger'],
    },
  },
} satisfies Meta<typeof DynToast>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => <DynToast {...args} />,
};

export const WithActions: Story = {
  args: {
    status: 'success',
    title: 'Invite sent',
    description: 'We emailed Chris with the workspace invite.',
  },
  render: (args) => (
    <DynToast
      {...args}
      actions={
        <DynBox display="flex" gap="sm">
          <DynButton size="sm" variant="solid">View invites</DynButton>
          <DynButton size="sm" variant="outline">Copy link</DynButton>
        </DynBox>
      }
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Attach primary and secondary actions that sit within the toast layout.',
      },
    },
  },
};

export const AutoDismissPattern: Story = {
  render: () => {
    const [open, setOpen] = useState(true);

    return (
      <DynBox display="flex" direction="column" gap="sm" align="center">
        <DynButton onClick={() => setOpen(true)} startIcon={<DynIcon name="plus" size="sm" />}>
          Trigger toast
        </DynButton>
        {open && (
          <DynToast
            status="warning"
            title="Sync delayed"
            description="We will retry in the background."
            onDismiss={() => setOpen(false)}
            dismissLabel="Dismiss toast"
          />
        )}
      </DynBox>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates controlling toast visibility and dismiss callbacks.',
      },
    },
  },
};
