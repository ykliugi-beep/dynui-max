import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import {
  DynProgress,
  DynButton,
  DynBox,
  DynCard,
  ThemeProvider,
} from '@dynui-max/core';

const meta = {
  title: 'Feedback/DynProgress',
  component: DynProgress,
  decorators: [
    (Story) => (
      <ThemeProvider defaultTheme="light">
        <Story />
      </ThemeProvider>
    ),
  ],
  args: {
    value: 40,
    max: 100,
    label: '40% complete',
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
Linear progress indicator with determinate and indeterminate modes.

- Semantic color variants
- Token-driven sizing
- Accessible \`aria-valuenow\` semantics
        `,
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    color: {
      control: 'select',
      options: ['primary', 'success', 'warning', 'danger', 'neutral'],
    },
  },
} satisfies Meta<typeof DynProgress>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => <DynProgress {...args} />,
};

export const Sizes: Story = {
  render: () => (
    <DynBox display="flex" direction="column" gap="md" style={{ maxWidth: 360 }}>
      <DynProgress value={25} label="25%" size="sm" />
      <DynProgress value={50} label="50%" size="md" />
      <DynProgress value={75} label="75%" size="lg" />
    </DynBox>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Showcases the three size variants using spacing tokens.',
      },
    },
  },
};

export const IndeterminateUpload: Story = {
  render: () => {
    const [uploading, setUploading] = useState(false);

    return (
      <DynCard
        title="Upload files"
        subtitle={uploading ? 'Uploading…' : 'Ready for uploads'}
        actions={
          <DynButton onClick={() => setUploading((state) => !state)}>
            {uploading ? 'Cancel' : 'Start upload'}
          </DynButton>
        }
      >
        <DynBox display="flex" direction="column" gap="sm">
          <p style={{ margin: 0 }}>
            {uploading
              ? 'We are processing your files. This may take a moment.'
              : 'Click start upload to simulate progress.'}
          </p>
          {uploading ? (
            <DynProgress indeterminate color="success" label="Uploading files" />
          ) : (
            <DynProgress value={0} label="0%" />
          )}
        </DynBox>
      </DynCard>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Indeterminate animation paired with card layout for async states.',
      },
    },
  },
};
