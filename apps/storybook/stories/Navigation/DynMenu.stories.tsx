import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { DynMenu, DynButton, DynIcon, DynBox, ThemeProvider } from '@dynui-max/core';
import type { MenuItem, DynMenuProps } from '@dynui-max/core';

const meta = {
  title: 'Navigation/DynMenu',
  component: DynMenu,
  decorators: [
    (Story) => (
      <ThemeProvider defaultTheme="light">
        <div style={{ padding: '3rem', display: 'grid', placeItems: 'center' }}>
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
          'Dropdown menu with keyboard navigation, icon support and controlled/uncontrolled open states.',
      },
    },
  },
} satisfies Meta<typeof DynMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

const baseItems: MenuItem[] = [
  { value: 'profile', label: 'Profile' },
  { value: 'settings', label: 'Settings' },
  { value: 'notifications', label: 'Notifications' },
  { value: 'logout', label: 'Log out' },
];

export const Default: Story = {
  render: () => {
    const [selection, setSelection] = useState<string | null>(null);

    return (
      <DynBox display="flex" direction="column" gap="md" align="center">
        <DynMenu
          items={baseItems}
          onSelect={setSelection}
          trigger={<DynButton variant="primary">Open menu</DynButton>}
        />
        <span style={{ color: 'var(--dyn-color-text-muted)' }}>
          {selection ? `Selected: ${selection}` : 'Choose an option'}
        </span>
      </DynBox>
    );
  },
};

export const WithIcons: Story = {
  render: () => (
    <DynMenu
      items={[
        {
          value: 'new',
          label: 'New file',
          icon: <DynIcon name="check" size="sm" />,
        },
        {
          value: 'rename',
          label: 'Rename',
          icon: <DynIcon name="chevron-down" size="sm" />,
        },
        {
          value: 'delete',
          label: 'Delete',
          icon: <DynIcon name="x" size="sm" />,
          description: 'Remove permanently',
        },
      ]}
      trigger={<DynButton>File actions</DynButton>}
    />
  ),
};

export const ControlledOpen: Story = {
  render: () => {
    const [open, setOpen] = useState(true);

    return (
      <DynMenu
        items={baseItems}
        open={open}
        onOpenChange={setOpen}
        onSelect={() => setOpen(false)}
        trigger={<DynButton>Controlled menu</DynButton>}
      />
    );
  },
};

export const Placements: Story = {
  render: () => {
    const placements: DynMenuProps['placement'][] = [
      'bottom-start',
      'bottom-end',
      'top-start',
      'top-end',
    ];

    return (
      <DynBox display="grid" style={{ gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '1.5rem' }}>
        {placements.map((placement) => (
          <DynMenu
            key={placement}
            placement={placement}
            items={baseItems}
            trigger={<DynButton>{placement}</DynButton>}
          />
        ))}
      </DynBox>
    );
  },
};
