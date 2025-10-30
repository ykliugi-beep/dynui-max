import type { Meta, StoryObj } from '@storybook/react';
import { DynTable, DynBadge, DynAvatar, DynButton, DynBox, ThemeProvider } from '@dynui-max/core';
import { useState } from 'react';

interface User {
  key: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive' | 'pending';
  lastLogin: string;
  avatar?: string;
}

const sampleUsers: User[] = [
  {
    key: '1',
    name: 'Alice Johnson',
    email: 'alice@company.com',
    role: 'Frontend Developer', 
    status: 'active',
    lastLogin: '2 hours ago'
  },
  {
    key: '2',
    name: 'Bob Smith',
    email: 'bob@company.com',
    role: 'Backend Developer',
    status: 'active', 
    lastLogin: '1 day ago'
  },
  {
    key: '3',
    name: 'Carol Williams',
    email: 'carol@company.com',
    role: 'UI/UX Designer',
    status: 'inactive',
    lastLogin: '1 week ago'
  },
  {
    key: '4',
    name: 'David Brown',
    email: 'david@company.com', 
    role: 'DevOps Engineer',
    status: 'pending',
    lastLogin: 'Never'
  },
];

const userColumns = [
  {
    key: 'user',
    title: 'User',
    render: (_: any, record: User) => (
      <DynBox display="flex" align="center" gap="sm">
        <DynAvatar name={record.name} size="sm" />
        <div>
          <div style={{ fontWeight: 500 }}>{record.name}</div>
          <div style={{ fontSize: '0.875rem', color: 'var(--dyn-color-text-muted)' }}>
            {record.email}
          </div>
        </div>
      </DynBox>
    ),
    width: '250px'
  },
  {
    key: 'role',
    title: 'Role',
    dataIndex: 'role',
    sortable: true
  },
  {
    key: 'status',
    title: 'Status',
    dataIndex: 'status',
    render: (status: User['status']) => (
      <DynBadge 
        color={status === 'active' ? 'success' : status === 'pending' ? 'warning' : 'neutral'}
      >
        {status}
      </DynBadge>
    ),
    width: '100px'
  },
  {
    key: 'lastLogin',
    title: 'Last Login',
    dataIndex: 'lastLogin',
    sortable: true,
    width: '120px'
  },
  {
    key: 'actions',
    title: 'Actions',
    render: (_: any, record: User) => (
      <DynBox display="flex" gap="xs">
        <DynButton size="sm" variant="outline" onClick={() => alert(`Edit ${record.name}`)}>
          Edit
        </DynButton>
        <DynButton size="sm" variant="ghost" onClick={() => alert(`Delete ${record.name}`)}>
          Delete
        </DynButton>
      </DynBox>
    ),
    width: '140px'
  },
];

const meta = {
  title: 'Data/DynTable',
  component: DynTable,
  decorators: [
    (Story) => (
      <ThemeProvider defaultTheme="light">
        <div style={{ width: '100%', minHeight: '400px' }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
Advanced data table component with sorting, selection, and custom rendering capabilities.

### Features
- Column configuration with custom rendering
- Row selection (checkbox/radio modes)
- Sorting with visual indicators
- Loading and empty states
- Responsive design
- Row click handling
- Keyboard navigation support
- Custom cell rendering with React components
        `
      }
    }
  },
} satisfies Meta<typeof DynTable>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic table
export const Default: Story = {
  args: {
    columns: userColumns,
    dataSource: sampleUsers,
  },
};

// With row selection
export const WithRowSelection: Story = {
  render: () => {
    const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
    
    return (
      <div>
        <DynBox mb="md" p="sm" bg="secondary" radius="md">
          <strong>Selected users:</strong> {selectedKeys.length > 0 ? selectedKeys.join(', ') : 'None'}
        </DynBox>
        
        <DynTable
          columns={userColumns}
          dataSource={sampleUsers}
          rowSelection={{
            selectedRowKeys: selectedKeys,
            onChange: setSelectedKeys,
            type: 'checkbox'
          }}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Table with checkbox row selection. Shows selected row keys above the table.'
      }
    }
  }
};

// With sorting
export const WithSorting: Story = {
  render: () => {
    const [sortConfig, setSortConfig] = useState<{ sortBy?: string; sortOrder?: 'asc' | 'desc' }>({});
    
    const sortedData = [...sampleUsers].sort((a, b) => {
      if (!sortConfig.sortBy) return 0;
      
      const aVal = a[sortConfig.sortBy as keyof User];
      const bVal = b[sortConfig.sortBy as keyof User];
      
      if (sortConfig.sortOrder === 'desc') {
        return bVal > aVal ? 1 : -1;
      }
      return aVal > bVal ? 1 : -1;
    });
    
    return (
      <div>
        <DynBox mb="md" p="sm" bg="secondary" radius="md">
          <strong>Sort:</strong> {sortConfig.sortBy || 'None'} {sortConfig.sortOrder || ''}
        </DynBox>
        
        <DynTable
          columns={userColumns}
          dataSource={sortedData}
          sortConfig={{
            ...sortConfig,
            onChange: setSortConfig
          }}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Table with sorting functionality. Click column headers to sort. Shows current sort configuration above table.'
      }
    }
  }
};

// Loading state
export const Loading: Story = {
  args: {
    columns: userColumns,
    dataSource: sampleUsers,
    loading: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Table loading state with overlay and spinner.'
      }
    }
  }
};

// Empty state
export const Empty: Story = {
  args: {
    columns: userColumns,
    dataSource: [],
    emptyText: (
      <DynBox p="lg" style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '3rem', margin: '1rem 0' }}>📄</div>
        <div><strong>No users found</strong></div>
        <div style={{ color: 'var(--dyn-color-text-muted)', marginTop: '0.5rem' }}>
          Add some users to see them listed here.
        </div>
      </DynBox>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Table empty state with custom content and illustrations.'
      }
    }
  }
};

// Interactive example
export const InteractiveExample: Story = {
  render: () => {
    const [users, setUsers] = useState(sampleUsers);
    const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
    const [sortConfig, setSortConfig] = useState<{ sortBy?: string; sortOrder?: 'asc' | 'desc' }>({});
    
    const handleDeleteSelected = () => {
      setUsers(prev => prev.filter(user => !selectedKeys.includes(user.key)));
      setSelectedKeys([]);
    };
    
    const handleStatusToggle = (userKey: string) => {
      setUsers(prev => prev.map(user => 
        user.key === userKey 
          ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' as any }
          : user
      ));
    };
    
    const interactiveColumns = [
      ...userColumns.slice(0, -1), // All columns except actions
      {
        key: 'actions',
        title: 'Actions',
        render: (_: any, record: User) => (
          <DynBox display="flex" gap="xs">
            <DynButton 
              size="sm" 
              variant="outline"
              onClick={() => handleStatusToggle(record.key)}
            >
              {record.status === 'active' ? 'Deactivate' : 'Activate'}
            </DynButton>
          </DynBox>
        ),
        width: '120px'
      },
    ];
    
    return (
      <div>
        <DynBox display="flex" justify="space-between" align="center" mb="md">
          <div>
            <strong>Users ({users.length})</strong>
            {selectedKeys.length > 0 && (
              <span style={{ marginLeft: '1rem', color: 'var(--dyn-color-text-muted)' }}>
                {selectedKeys.length} selected
              </span>
            )}
          </div>
          
          {selectedKeys.length > 0 && (
            <DynButton 
              variant="outline" 
              size="sm"
              onClick={handleDeleteSelected}
            >
              Delete Selected ({selectedKeys.length})
            </DynButton>
          )}
        </DynBox>
        
        <DynTable
          columns={interactiveColumns}
          dataSource={users}
          rowSelection={{
            selectedRowKeys: selectedKeys,
            onChange: setSelectedKeys,
            type: 'checkbox'
          }}
          sortConfig={{
            ...sortConfig,
            onChange: setSortConfig
          }}
          onRowClick={(record) => alert(`Clicked user: ${record.name}`)}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Fully interactive table example with selection, sorting, bulk operations, and row interactions. Demonstrates real-world usage patterns.'
      }
    }
  }
};

// Interactive playground
export const Playground: Story = {
  args: {
    columns: userColumns.slice(0, 3), // Simplified for playground
    dataSource: sampleUsers.slice(0, 3),
    loading: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground to test different table configurations. Use the controls panel to experiment with props.'
      }
    }
  }
};