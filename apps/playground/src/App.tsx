import { useState } from 'react';
import {
  ThemeProvider,
  useTheme,
  DynContainer,
  DynBox,
  DynGrid,
  DynGridItem,
  DynButton,
  DynInput,
  DynSelect,
  DynTabs,
  DynTable,
  DynTreeView,
  DynMenu,
  DynBreadcrumb,
  DynBadge,
  DynAvatar,
  DynModal,
  ThemeSwitcher,
  DynIcon,
  DynFieldContainer
} from '@dynui-max/core';

interface User {
  key: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
}

const sampleUsers: User[] = [
  { key: '1', name: 'Alice Johnson', email: 'alice@company.com', role: 'Developer', status: 'active' },
  { key: '2', name: 'Bob Smith', email: 'bob@company.com', role: 'Designer', status: 'active' },
  { key: '3', name: 'Carol Williams', email: 'carol@company.com', role: 'Manager', status: 'inactive' },
];

const tableColumns = [
  {
    key: 'user',
    title: 'User',
    render: (_: any, record: User) => (
      <DynBox display="flex" align="center" gap="sm">
        <DynAvatar name={record.name} size="sm" />
        <div>
          <div style={{ fontWeight: 500 }}>{record.name}</div>
          <div style={{ fontSize: '0.875rem', opacity: 0.7 }}>{record.email}</div>
        </div>
      </DynBox>
    )
  },
  { key: 'role', title: 'Role', dataIndex: 'role', sortable: true },
  {
    key: 'status',
    title: 'Status',
    dataIndex: 'status',
    render: (status: User['status']) => (
      <DynBadge color={status === 'active' ? 'success' : 'neutral'}>
        {status}
      </DynBadge>
    )
  }
];

const treeData = [
  {
    key: 'components',
    title: 'Components',
    icon: <DynIcon name="folder" size="sm" />,
    children: [
      { key: 'forms', title: 'Form Components', icon: <DynIcon name="edit" size="sm" />, isLeaf: true },
      { key: 'layout', title: 'Layout Components', icon: <DynIcon name="layout" size="sm" />, isLeaf: true },
      { key: 'navigation', title: 'Navigation', icon: <DynIcon name="menu" size="sm" />, isLeaf: true },
    ]
  },
  {
    key: 'tokens',
    title: 'Design Tokens',
    icon: <DynIcon name="palette" size="sm" />,
    children: [
      { key: 'colors', title: 'Colors', isLeaf: true },
      { key: 'typography', title: 'Typography', isLeaf: true },
      { key: 'spacing', title: 'Spacing', isLeaf: true },
    ]
  }
];

const selectOptions = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue.js' },
  { value: 'angular', label: 'Angular' },
  { value: 'svelte', label: 'Svelte' }
];

function PlaygroundContent() {
  const { theme } = useTheme();
  const [selectedFramework, setSelectedFramework] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    {
      value: 'overview',
      label: 'Overview',
      panel: (
        <DynBox p="lg">
          <h2>DynUI-Max Playground</h2>
          <p>Interactive playground for testing all 26 production components in real-time.</p>
          
          <DynBox mt="lg" display="flex" gap="md" direction="column">
            <DynFieldContainer label="Search Components" helpText="Try searching for components or features">
              <DynInput
                variant="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search components..."
                clearable
              />
            </DynFieldContainer>
            
            <DynFieldContainer label="Select Framework" required>
              <DynSelect
                options={selectOptions}
                value={selectedFramework}
                onChange={setSelectedFramework}
                placeholder="Choose your framework..."
                searchable
                clearable
              />
            </DynFieldContainer>
            
            <DynBox display="flex" gap="md">
              <DynButton 
                variant="primary" 
                onClick={() => setModalOpen(true)}
                leftIcon={<DynIcon name="plus" size="sm" />}
              >
                Add New Item
              </DynButton>
              <DynButton 
                variant="outline"
                onClick={() => alert('Export feature coming soon!')}
              >
                Export Data
              </DynButton>
            </DynBox>
          </DynBox>
        </DynBox>
      )
    },
    {
      value: 'users',
      label: 'Users',
      panel: (
        <DynBox p="lg">
          <DynBox display="flex" justify="space-between" align="center" mb="md">
            <h2>User Management</h2>
            <DynBox display="flex" align="center" gap="md">
              {selectedUsers.length > 0 && (
                <DynBadge color="primary">{selectedUsers.length} selected</DynBadge>
              )}
              <ThemeSwitcher size="sm" showLabels />
            </DynBox>
          </DynBox>
          
          <DynTable
            columns={tableColumns}
            dataSource={sampleUsers}
            rowSelection={{
              selectedRowKeys: selectedUsers,
              onChange: setSelectedUsers,
              type: 'checkbox'
            }}
            onRowClick={(user) => alert(`User: ${user.name}`)}
          />
        </DynBox>
      )
    },
    {
      value: 'explorer',
      label: 'File Explorer',
      panel: (
        <DynBox p="lg">
          <h2>Component Explorer</h2>
          <DynBox mt="md">
            <DynTreeView
              treeData={treeData}
              defaultExpandedKeys={['components']}
              showIcon={true}
              selectionMode="single"
              onSelect={(keys, nodes) => {
                if (nodes.length > 0) {
                  alert(`Selected: ${nodes[0].title}`);
                }
              }}
            />
          </DynBox>
        </DynBox>
      )
    }
  ];

  return (
    <DynContainer size="xl">
      {/* Header */}
      <DynBox as="header" display="flex" justify="space-between" align="center" py="lg" mb="lg">
        <div>
          <h1 style={{ margin: 0, fontSize: '2rem' }}>🎯 DynUI-Max</h1>
          <p style={{ margin: '0.5rem 0 0 0', opacity: 0.8 }}>
            Production-ready React component library
          </p>
        </div>
        
        <DynBox display="flex" align="center" gap="md">
          <DynBadge color="success">v0.2.0</DynBadge>
          <DynBadge color="primary">{theme} theme</DynBadge>
          <ThemeSwitcher variant="button" showLabels />
        </DynBox>
      </DynBox>

      {/* Breadcrumb */}
      <DynBreadcrumb 
        items={[
          { label: 'Home', href: '#' },
          { label: 'Playground' },
          { label: activeTab.charAt(0).toUpperCase() + activeTab.slice(1) }
        ]}
      />

      {/* Main content */}
      <DynBox mt="lg">
        <DynTabs
          value={activeTab}
          onChange={setActiveTab}
          items={tabs}
        />
      </DynBox>

      {/* Modal */}
      <DynModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Add New Item"
        size="md"
      >
        <DynBox p="lg">
          <DynFieldContainer label="Item Name" required>
            <DynInput placeholder="Enter item name..." />
          </DynFieldContainer>
          
          <DynBox display="flex" justify="flex-end" gap="md" mt="lg">
            <DynButton variant="outline" onClick={() => setModalOpen(false)}>
              Cancel
            </DynButton>
            <DynButton variant="primary" onClick={() => setModalOpen(false)}>
              Add Item
            </DynButton>
          </DynBox>
        </DynBox>
      </DynModal>
    </DynContainer>
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <PlaygroundContent />
    </ThemeProvider>
  );
}

export default App;