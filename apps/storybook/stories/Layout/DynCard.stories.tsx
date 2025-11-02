import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import {
  DynCard,
  DynButton,
  DynBox,
  DynBadge,
  DynProgress,
  DynSpinner,
  ThemeProvider,
} from '@dynui-max/core';

const meta = {
  title: 'Layout/DynCard',
  component: DynCard,
  decorators: [
    (Story) => (
      <ThemeProvider defaultTheme="light">
        <Story />
      </ThemeProvider>
    ),
  ],
  args: {
    title: 'Campaign performance',
    subtitle: 'Week of April 8',
    children: (
      <DynBox display="flex" direction="column" gap="sm">
        <p style={{ margin: 0 }}>
          Track high-level metrics and milestones with built-in spacing tokens.
        </p>
        <DynProgress value={72} label="72% complete" />
      </DynBox>
    ),
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Composable card surface with media, header, body, and footer slots.

- Variant tokens for elevated, outlined, and subtle cards
- Padding and radius scales mapped to spacing tokens
- Interactive state with hover/focus affordances
- Flexible header/footer compositions
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['elevated', 'outlined', 'subtle'],
    },
    padding: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    radius: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'xl', '2xl', 'full'],
    },
    interactive: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof DynCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <DynCard {...args} footer={<DynButton variant="outline">View report</DynButton>} />
  ),
};

export const WithMedia: Story = {
  args: {
    media: (
      <img
        src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=600&q=80"
        alt="Team collaborating"
        style={{ display: 'block', width: '100%', height: 'auto' }}
      />
    ),
    footer: (
      <DynBox display="flex" justify="space-between" align="center">
        <DynBadge color="success">On track</DynBadge>
        <DynButton variant="solid">Open dashboard</DynButton>
      </DynBox>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Showcase media slot, badge footer actions, and subtle variant.',
      },
    },
  },
  render: (args) => (
    <DynCard {...args} variant="subtle" />
  ),
};

export const InteractiveSelectable: Story = {
  args: {
    variant: 'outlined',
    interactive: true,
    footer: null,
  },
  render: (args) => {
    const [selected, setSelected] = useState(false);
    const handleToggle = () => setSelected((value) => !value);

    const selectedLabel = selected ? 'Selected' : 'Tap to select';

    return (
      <DynCard
        {...args}
        subtitle={selectedLabel}
        actions={
          <DynButton size="sm" variant={selected ? 'solid' : 'outline'} onClick={handleToggle}>
            {selected ? 'Remove' : 'Add'}
          </DynButton>
        }
        onClick={handleToggle}
      >
        <DynBox display="flex" gap="md" align="center">
          <DynSpinner inline size="sm" label="" />
          <div>
            <strong>Automation pipeline</strong>
            <p style={{ margin: 0 }}>Keep stakeholders synced while deployment runs.</p>
          </div>
        </DynBox>
      </DynCard>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive outlined card with inline actions and spinner.',
      },
    },
  },
};
