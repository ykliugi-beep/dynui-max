import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import { DynListView, DynAvatar, DynBadge, ThemeProvider } from '@dynui-max/core';

interface ListItem {
  id: string;
  title: string;
  description?: string;
  avatar?: string;
  status?: string;
  metadata?: string;
  actions?: Array<{ label: string; onClick: () => void; }>;
}

const sampleItems: ListItem[] = [
  { id: '1', title: 'John Doe', description: 'Senior Frontend Developer', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e', status: 'active', metadata: '2 hours ago' },
  { id: '2', title: 'Jane Smith', description: 'Product Manager', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786', status: 'away', metadata: '1 day ago' },
  { id: '3', title: 'Mike Johnson', description: 'UX Designer', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d', status: 'offline', metadata: '3 days ago' },
  { id: '4', title: 'Sarah Wilson', description: 'Backend Developer', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80', status: 'active', metadata: '5 minutes ago' }
];

const meta = {
  title: 'Data/DynListView',
  component: DynListView,
  decorators: [
    (Story) => (
      <ThemeProvider defaultTheme="light">
        <div style={{ maxWidth: 720, margin: '0 auto', padding: '2rem' }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `Virtualized list component optimized for large datasets with flexible item rendering.`
      }
    }
  },
  argTypes: {
    items: { control: 'object' },
    itemHeight: { control: { type: 'number', min: 40, max: 200 } },
    height: { control: { type: 'number', min: 200, max: 800 } },
    selectable: { control: 'boolean' },
    multiSelect: { control: 'boolean' },
    searchable: { control: 'boolean' },
    virtualized: { control: 'boolean' },
    loading: { control: 'boolean' },
    empty: { control: 'boolean' }
  },
} satisfies Meta<typeof DynListView>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Overview: Story = {
  args: {
    items: sampleItems,
    itemHeight: 72,
    height: 400,
    selectable: true,
    renderItem: (item: ListItem) => (
      <div style={{ display: 'flex', alignItems: 'center', padding: '12px 16px', borderBottom: '1px solid var(--dyn-color-border-primary)' }}>
        <DynAvatar src={item.avatar} name={item.title} size="md" style={{ marginRight: '12px' }} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 600, color: 'var(--dyn-color-text-primary)', marginBottom: 4 }}>{item.title}</div>
          {item.description && (
            <div style={{ fontSize: 14, color: 'var(--dyn-color-text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.description}</div>
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <DynBadge variant={item.status === 'active' ? 'success' : item.status === 'away' ? 'warning' : 'neutral'} size="sm">{item.status}</DynBadge>
          <div style={{ fontSize: 12, color: 'var(--dyn-color-text-muted)', whiteSpace: 'nowrap' }}>{item.metadata}</div>
        </div>
      </div>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const first = canvas.getByText('John Doe');
    await expect(first).toBeInTheDocument();
  },
};

export const SimpleTextList: Story = {
  args: {
    items: [
      { id: '1', title: 'Apple' },
      { id: '2', title: 'Banana' },
      { id: '3', title: 'Cherry' },
      { id: '4', title: 'Date' },
      { id: '5', title: 'Elderberry' }
    ],
    itemHeight: 48,
    height: 300,
    renderItem: (item: ListItem) => (
      <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--dyn-color-border-primary)', color: 'var(--dyn-color-text-primary)' }}>{item.title}</div>
    )
  }
};

export const WithSearch: Story = {
  args: {
    items: sampleItems,
    itemHeight: 72,
    height: 400,
    searchable: true,
    searchPlaceholder: 'Search users...',
    onSearch: (q: string) => console.log('Searching for:', q),
    renderItem: (item: ListItem) => (
      <div style={{ display: 'flex', alignItems: 'center', padding: '12px 16px', borderBottom: '1px solid var(--dyn-color-border-primary)' }}>
        <DynAvatar src={item.avatar} name={item.title} size="sm" style={{ marginRight: '12px' }} />
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 500, color: 'var(--dyn-color-text-primary)', marginBottom: 2 }}>{item.title}</div>
          <div style={{ fontSize: 13, color: 'var(--dyn-color-text-secondary)' }}>{item.description}</div>
        </div>
      </div>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const search = canvas.getByPlaceholderText('Search users...');
    await userEvent.type(search, 'John');
    await expect(search).toHaveValue('John');
  },
};

export const MultiSelect: Story = {
  args: {
    items: sampleItems,
    itemHeight: 72,
    height: 400,
    selectable: true,
    multiSelect: true,
    onSelectionChange: (ids: string[]) => console.log('Selected:', ids),
    renderItem: (item: ListItem, isSelected: boolean) => (
      <div style={{ display: 'flex', alignItems: 'center', padding: '12px 16px', borderBottom: '1px solid var(--dyn-color-border-primary)', background: isSelected ? 'var(--dyn-color-background-selected)' : 'transparent' }}>
        <input type="checkbox" checked={isSelected} onChange={() => {}} style={{ marginRight: 12 }} />
        <DynAvatar src={item.avatar} name={item.title} size="sm" style={{ marginRight: '12px' }} />
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 500, color: 'var(--dyn-color-text-primary)' }}>{item.title}</div>
          <div style={{ fontSize: 13, color: 'var(--dyn-color-text-secondary)' }}>{item.description}</div>
        </div>
      </div>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const checkboxes = canvas.getAllByRole('checkbox');
    await userEvent.click(checkboxes[0]);
    await userEvent.click(checkboxes[1]);
    await expect(checkboxes[0]).toBeChecked();
    await expect(checkboxes[1]).toBeChecked();
  },
};

export const VirtualizedLargeList: Story = {
  args: {
    items: Array.from({ length: 10000 }, (_, i) => ({ id: `item-${i}`, title: `Item ${i + 1}`, description: `Description for item ${i + 1}`, metadata: `Row ${i + 1}` })),
    itemHeight: 56,
    height: 400,
    virtualized: true,
    renderItem: (item: ListItem, _isSelected: boolean, index: number) => (
      <div style={{ display: 'flex', alignItems: 'center', padding: '12px 16px', borderBottom: '1px solid var(--dyn-color-border-primary)', background: index % 2 === 0 ? 'var(--dyn-color-background-secondary)' : 'transparent' }}>
        <div style={{ width: 32, height: 32, borderRadius: 4, background: 'var(--dyn-color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 12, fontWeight: 600, marginRight: 12 }}>{index + 1}</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 500, color: 'var(--dyn-color-text-primary)', marginBottom: 2 }}>{item.title}</div>
          <div style={{ fontSize: 13, color: 'var(--dyn-color-text-secondary)' }}>{item.description}</div>
        </div>
        <div style={{ fontSize: 12, color: 'var(--dyn-color-text-muted)' }}>{item.metadata}</div>
      </div>
    )
  },
};

export const LoadingState: Story = {
  args: { items: [], height: 300, loading: true, loadingText: 'Loading users...' }
};

export const EmptyState: Story = {
  args: { items: [], height: 300, empty: true, emptyText: 'No users found', emptyDescription: 'Try adjusting your search criteria or add some users.' }
};

export const WithActions: Story = {
  args: {
    items: sampleItems.map(i => ({
      ...i,
      actions: [
        { label: 'Edit', onClick: () => alert(`Edit ${i.title}`) },
        { label: 'Delete', onClick: () => alert(`Delete ${i.title}`) }
      ]
    })),
    itemHeight: 72,
    height: 400,
    renderItem: (item: ListItem) => (
      <div style={{ display: 'flex', alignItems: 'center', padding: '12px 16px', borderBottom: '1px solid var(--dyn-color-border-primary)' }}>
        <DynAvatar src={item.avatar} name={item.title} size="sm" style={{ marginRight: '12px' }} />
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 500, color: 'var(--dyn-color-text-primary)', marginBottom: 2 }}>{item.title}</div>
          <div style={{ fontSize: 13, color: 'var(--dyn-color-text-secondary)' }}>{item.description}</div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {item.actions?.map((action, idx) => (
            <button key={idx} onClick={action.onClick} style={{ padding: '4px 8px', fontSize: 12, border: '1px solid var(--dyn-color-border-primary)', borderRadius: 4, background: 'var(--dyn-color-background-primary)', color: 'var(--dyn-color-text-primary)', cursor: 'pointer' }}>
              {action.label}
            </button>
          ))}
        </div>
      </div>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const editButtons = canvas.getAllByText('Edit');
    await expect(editButtons.length).toBeGreaterThan(0);
  },
};

export const ResponsiveDemo: Story = {
  args: {
    items: sampleItems,
    itemHeight: 72,
    height: 400,
    responsive: true,
    renderItem: (item: ListItem) => (
      <div style={{ display: 'flex', alignItems: 'center', padding: '12px 16px', borderBottom: '1px solid var(--dyn-color-border-primary)' }}>
        <DynAvatar src={item.avatar} name={item.title} size="sm" style={{ marginRight: '12px' }} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 500, color: 'var(--dyn-color-text-primary)', marginBottom: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.title}</div>
          <div style={{ fontSize: 13, color: 'var(--dyn-color-text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.description}</div>
        </div>
        <DynBadge variant={item.status === 'active' ? 'success' : 'neutral'} size="sm" style={{ marginLeft: 8 }}>{item.status}</DynBadge>
      </div>
    )
  },
  parameters: { viewport: { defaultViewport: 'mobile1' } }
};

export const AccessibilityDemo: Story = {
  args: {
    items: sampleItems,
    itemHeight: 72,
    height: 400,
    selectable: true,
    'aria-label': 'Team members list',
    renderItem: (item: ListItem, isSelected: boolean) => (
      <div role="listitem" aria-selected={isSelected} tabIndex={0} style={{ display: 'flex', alignItems: 'center', padding: '12px 16px', borderBottom: '1px solid var(--dyn-color-border-primary)', background: isSelected ? 'var(--dyn-color-background-selected)' : 'transparent' }}>
        <DynAvatar src={item.avatar} name={item.title} size="sm" style={{ marginRight: '12px' }} />
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 500, color: 'var(--dyn-color-text-primary)', marginBottom: 2 }}>{item.title}</div>
          <div style={{ fontSize: 13, color: 'var(--dyn-color-text-secondary)' }}>{item.description}</div>
        </div>
        <div style={{ fontSize: 12, color: 'var(--dyn-color-text-muted)' }}>{item.metadata}</div>
      </div>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const list = canvas.getByRole('list');
    await expect(list).toHaveAttribute('aria-label', 'Team members list');
    const firstItem = canvas.getAllByRole('listitem')[0];
    firstItem.focus();
    await expect(firstItem).toHaveFocus();
    await userEvent.keyboard('{Enter}');
    await expect(firstItem).toHaveAttribute('aria-selected', 'true');
  },
};
