import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import {
  DynGrid,
  DynGridItem,
  DynBox,
  DynButton,
  ThemeProvider,
} from '@dynui-max/core';

const sampleCards = Array.from({ length: 6 }).map((_, index) => (
  <DynGridItem key={index} span={4}>
    <DynBox
      p="lg"
      radius="md"
      bg="secondary"
      display="flex"
      direction="column"
      gap="sm"
    >
      <DynBox as="h3" m="0">
        Card {index + 1}
      </DynBox>
      <p style={{ margin: 0 }}>
        Supporting text that demonstrates how content flows inside a grid item.
      </p>
    </DynBox>
  </DynGridItem>
));

const meta = {
  title: 'Layout/DynGrid',
  component: DynGrid,
  decorators: [
    (Story) => (
      <ThemeProvider defaultTheme="light">
        <Story />
      </ThemeProvider>
    ),
  ],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
Responsive CSS Grid layout with column, gap, and breakpoint controls.

### Features
- 12-column grid system by default
- Responsive column overrides (sm, md, lg, xl)
- Gap, row-gap, and column-gap tokens
- Grid item span and offset controls
- Works with any HTML element via the \`as\` prop
        `,
      },
    },
  },
  argTypes: {
    columns: {
      control: 'number',
      description: 'Base number of grid columns',
    },
    gap: {
      control: 'select',
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl'],
    },
    rowGap: {
      control: 'select',
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl'],
    },
    columnGap: {
      control: 'select',
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl'],
    },
    responsive: {
      control: 'object',
      description: 'Responsive column overrides',
    },
  },
} satisfies Meta<typeof DynGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TwelveColumnLayout: Story = {
  render: () => (
    <DynGrid columns={12} gap="md">
      {Array.from({ length: 12 }).map((_, index) => (
        <DynGridItem key={index} span={1}>
          <DynBox p="md" bg="secondary" radius="sm" style={{ textAlign: 'center' }}>
            {index + 1}
          </DynBox>
        </DynGridItem>
      ))}
    </DynGrid>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Default 12-column grid demonstrating individual column spans.',
      },
    },
  },
};

export const GapAndAlignment: Story = {
  render: () => (
    <DynGrid columns={3} gap="lg" rowGap="sm">
      {['Overview', 'Revenue', 'Engagement', 'Retention', 'Latency', 'Errors'].map((title) => (
        <DynGridItem key={title}>
          <DynBox p="lg" bg="muted" radius="md" style={{ minHeight: 140 }}>
            <strong>{title}</strong>
            <p style={{ marginTop: '0.5rem', marginBottom: 0 }}>
              Showcase of gap utilities mixing row and column spacing.
            </p>
          </DynBox>
        </DynGridItem>
      ))}
    </DynGrid>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Combines `gap`, `rowGap`, and `columnGap` tokens for granular spacing.',
      },
    },
  },
};

export const ResponsiveColumns: Story = {
  render: () => (
    <DynGrid
      columns={12}
      responsive={{ sm: 6, md: 8, lg: 12 }}
      gap="md"
    >
      <DynGridItem span={12} responsive={{ sm: 6, md: 8 }}>
        <DynBox p="lg" bg="secondary" radius="md">
          <strong>Responsive headline</strong>
          <p style={{ marginTop: '0.5rem', marginBottom: 0 }}>
            This grid reflows from 1 column on mobile to 6/8 columns on tablets and full width on desktops.
          </p>
        </DynBox>
      </DynGridItem>
      {sampleCards}
    </DynGrid>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Use the `responsive` prop on grid and items to adapt column counts at breakpoints.',
      },
    },
  },
};

export const NestedLayouts: Story = {
  render: () => (
    <DynGrid columns={12} gap="lg">
      <DynGridItem span={8}>
        <DynBox p="lg" bg="secondary" radius="md" display="flex" direction="column" gap="md">
          <strong>Main content</strong>
          <DynGrid columns={12} gap="sm">
            {Array.from({ length: 4 }).map((_, index) => (
              <DynGridItem key={index} span={6}>
                <DynBox p="md" bg="muted" radius="sm">
                  Nested item {index + 1}
                </DynBox>
              </DynGridItem>
            ))}
          </DynGrid>
        </DynBox>
      </DynGridItem>
      <DynGridItem span={4}>
        <DynBox p="lg" bg="muted" radius="md">
          Sidebar content aligned with the main area using grid spans.
        </DynBox>
      </DynGridItem>
    </DynGrid>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Grid items can contain nested grids for complex page layouts and dashboards.',
      },
    },
  },
};

export const InteractivePlayground: Story = {
  render: () => {
    const [columns, setColumns] = useState<number>(12);
    const [gap, setGap] = useState<'sm' | 'md' | 'lg'>('md');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <DynBox display="flex" gap="sm">
          <DynButton size="sm" variant={columns === 12 ? 'solid' : 'outline'} onClick={() => setColumns(12)}>
            12 columns
          </DynButton>
          <DynButton size="sm" variant={columns === 6 ? 'solid' : 'outline'} onClick={() => setColumns(6)}>
            6 columns
          </DynButton>
          <DynButton size="sm" variant={columns === 4 ? 'solid' : 'outline'} onClick={() => setColumns(4)}>
            4 columns
          </DynButton>
          <DynButton size="sm" variant={gap === 'sm' ? 'solid' : 'outline'} onClick={() => setGap('sm')}>
            Small gap
          </DynButton>
          <DynButton size="sm" variant={gap === 'md' ? 'solid' : 'outline'} onClick={() => setGap('md')}>
            Medium gap
          </DynButton>
          <DynButton size="sm" variant={gap === 'lg' ? 'solid' : 'outline'} onClick={() => setGap('lg')}>
            Large gap
          </DynButton>
        </DynBox>

        <DynGrid columns={columns} gap={gap} responsive={{ sm: 2, md: columns === 12 ? 4 : columns }}>
          {Array.from({ length: columns }).map((_, index) => (
            <DynGridItem key={index}>
              <DynBox p="md" bg="secondary" radius="sm" style={{ textAlign: 'center' }}>
                Item {index + 1}
              </DynBox>
            </DynGridItem>
          ))}
        </DynGrid>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive controls demonstrate how column count and gap tokens affect layout in real time.',
      },
    },
  },
};
