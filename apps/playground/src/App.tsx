import { useState } from 'react';
import type { ChangeEvent } from 'react';
import {
  ThemeProvider,
  useTheme,
  DynContainer,
  DynBox,
  DynButton,
  DynInput,
  DynSelect,
  DynTabs,
  DynTable,
  DynTreeView,
  DynBreadcrumb,
  DynBadge,
  DynAvatar,
  DynModal,
  DynPagination,
  DynCard,
  DynSpinner,
  DynToast,
  DynProgress,
  ThemeSwitcher,
  DynIcon,
  DynFieldContainer,
  type TabItem,
  type TableColumn,
  type TreeNode,
  type SelectOption,
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
  { key: '4', name: 'David Kim', email: 'david@company.com', role: 'QA Engineer', status: 'active' },
  { key: '5', name: 'Eva Brown', email: 'eva@company.com', role: 'Data Scientist', status: 'inactive' },
  { key: '6', name: 'Frank Harris', email: 'frank@company.com', role: 'Support', status: 'active' },
  { key: '7', name: 'Grace Lee', email: 'grace@company.com', role: 'Developer', status: 'active' },
  { key: '8', name: 'Henry White', email: 'henry@company.com', role: 'Product Owner', status: 'inactive' },
  { key: '9', name: 'Ivy Patel', email: 'ivy@company.com', role: 'Designer', status: 'active' },
  { key: '10', name: 'Jake Turner', email: 'jake@company.com', role: 'Developer', status: 'active' }
];

const tableColumns: TableColumn<User>[] = [
  {
    key: 'user',
    title: 'User',
    render: (_: unknown, record: User) => (
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

const treeData: TreeNode[] = [
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

const selectOptions: SelectOption[] = [
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
  const [tablePage, setTablePage] = useState(1);
  const [syncing, setSyncing] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const pageSize = 5;
  const totalPages = Math.ceil(sampleUsers.length / pageSize);
  const paginatedUsers = sampleUsers.slice((tablePage - 1) * pageSize, tablePage * pageSize);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
  };

  const handleFrameworkChange = (value: string | string[]) => {
    if (Array.isArray(value)) {
      setSelectedFramework(value[0] ?? '');
    } else {
      setSelectedFramework(value);
    }
  };

  const handleUserSelectionChange = (keys: string[]) => {
    setSelectedUsers(keys);
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const handlePageChange = (page: number) => {
    setTablePage(page);
  };

  const handleSyncUsers = () => {
    if (syncing) return;
    setShowToast(false);
    setSyncing(true);
    window.setTimeout(() => {
      setSyncing(false);
      setShowToast(true);
    }, 800);
  };

  const dismissToast = () => setShowToast(false);

  const tabs: TabItem[] = [
    {
      value: 'overview',
      label: 'Overview',
      panel: (
        <DynBox p="lg" display="flex" direction="column" gap="lg">
          <DynCard
            title="DynUI-Max Playground"
            subtitle="Interactive playground for testing all 29 production components in real-time."
            actions={<DynBadge color="primary">Live demo</DynBadge>}
          >
            <p style={{ margin: 0 }}>
              Explore how design tokens, accessibility, and TypeScript-first APIs combine across the library.
            </p>
            <DynProgress
              value={selectedUsers.length}
              max={sampleUsers.length}
              label={`${selectedUsers.length}/${sampleUsers.length} users synced`}
              color="success"
            />
          </DynCard>

          <DynCard variant="outlined" title="Try the controls" subtitle="Search, filter, and launch workflows">
            <DynBox display="flex" gap="md" direction="column">
              <DynFieldContainer label="Search Components">
                <DynInput
                  variant="outline"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Search components..."
                  clearable
                />
              </DynFieldContainer>

              <DynFieldContainer label="Select Framework" required>
                <DynSelect
                  options={selectOptions}
                  value={selectedFramework}
                  onChange={handleFrameworkChange}
                  placeholder="Choose your framework..."
                  searchable
                />
              </DynFieldContainer>

              <DynBox display="flex" gap="md">
                <DynButton
                  color="primary"
                  onClick={() => setModalOpen(true)}
                  startIcon={<DynIcon name="plus" size="sm" />}
                >
                  Add New Item
                </DynButton>
                <DynButton
                  variant="outline"
                  onClick={() => alert('Export feature coming soon!')}
                  endIcon={<DynIcon name="arrow-right" size="sm" />}
                >
                  Export Data
                </DynButton>
              </DynBox>
            </DynBox>
          </DynCard>
        </DynBox>
      )
    },
    {
      value: 'users',
      label: 'Users',
      panel: (
        <DynBox p="lg">
          <DynCard
            title="User Management"
            subtitle="Assign roles, monitor selection, and sync access."
            actions={<ThemeSwitcher size="sm" showLabels />}
          >
            <DynBox display="flex" justify="space-between" align="center" mb="md">
              <DynBox display="flex" align="center" gap="sm">
                <DynBadge color="primary">{sampleUsers.length} users</DynBadge>
                {selectedUsers.length > 0 && (
                  <DynBadge color="success">{selectedUsers.length} selected</DynBadge>
                )}
              </DynBox>
              <DynButton
                color="primary"
                onClick={handleSyncUsers}
                startIcon={syncing ? <DynSpinner inline size="sm" label="" /> : <DynIcon name="upload" size="sm" />}
                disabled={selectedUsers.length === 0 || syncing}
              >
                {syncing ? 'Syncing…' : 'Sync selected'}
              </DynButton>
            </DynBox>

            <DynTable
              columns={tableColumns}
              dataSource={paginatedUsers}
              rowSelection={{
                selectedRowKeys: selectedUsers,
                onChange: handleUserSelectionChange,
                type: 'checkbox'
              }}
              onRowClick={(user: User) => alert(`User: ${user.name}`)}
            />

            <DynBox display="flex" justify="space-between" align="center" mt="md">
              <span style={{ fontSize: '0.875rem', opacity: 0.8 }}>
                Showing {(tablePage - 1) * pageSize + 1}–{Math.min(tablePage * pageSize, sampleUsers.length)} of {sampleUsers.length}
              </span>
              <DynPagination
                totalPages={totalPages}
                currentPage={tablePage}
                onPageChange={handlePageChange}
                showFirstLast={false}
              />
            </DynBox>
          </DynCard>
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
              onSelect={(_selectedKeys: string[], nodes: TreeNode[]) => {
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

  // Convert theme to string for display
  const themeStr = String(theme);
  const themeLabel = themeStr === 'light' ? 'Light' : themeStr === 'dark' ? 'Dark' : 'System';

  return (
    <DynContainer size="xl">
      {showToast && (
        <DynToast
          status="success"
          title="Sync complete"
          description={`${selectedUsers.length} user${selectedUsers.length === 1 ? '' : 's'} updated across environments.`}
          onDismiss={dismissToast}
        />
      )}

      {/* Header */}
      <DynBox as="header" display="flex" justify="space-between" align="center" py="lg" mb="lg">
        <div>
          <h1 style={{ margin: 0, fontSize: '2rem' }}>🎯 DynUI-Max</h1>
          <p style={{ margin: '0.5rem 0 0 0', opacity: 0.8 }}>
            Production-ready React component library
          </p>
        </div>
        
        <DynBox display="flex" align="center" gap="md">
          <DynBadge color="success">v0.3.0</DynBadge>
          <DynBadge color="primary">{themeLabel} theme</DynBadge>
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
          onChange={handleTabChange}
          items={tabs}
        />
      </DynBox>

      {/* Modal */}
      <DynModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        size="md"
      >
        <DynBox p="lg">
          <h3 style={{ marginTop: 0 }}>Add New Item</h3>
          <DynFieldContainer label="Item Name" required>
            <DynInput placeholder="Enter item name..." />
          </DynFieldContainer>

          <DynBox display="flex" justify="flex-end" gap="md" mt="lg">
            <DynButton variant="outline" onClick={() => setModalOpen(false)}>
              Cancel
            </DynButton>
            <DynButton color="primary" onClick={() => setModalOpen(false)}>
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
