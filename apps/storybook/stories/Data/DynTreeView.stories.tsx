import type { Meta, StoryObj } from '@storybook/react';
import { DynTreeView, DynBox, DynIcon, ThemeProvider } from '@dynui-max/core';
import { useState } from 'react';

const fileSystemData = [
  {
    key: 'src',
    title: 'src',
    icon: <DynIcon name="folder" size="sm" />,
    children: [
      {
        key: 'components',
        title: 'components',
        icon: <DynIcon name="folder" size="sm" />,
        children: [
          { key: 'Button.tsx', title: 'Button.tsx', icon: <DynIcon name="file" size="sm" />, isLeaf: true },
          { key: 'Input.tsx', title: 'Input.tsx', icon: <DynIcon name="file" size="sm" />, isLeaf: true },
          { key: 'Modal.tsx', title: 'Modal.tsx', icon: <DynIcon name="file" size="sm" />, isLeaf: true },
        ]
      },
      {
        key: 'utils',
        title: 'utils',
        icon: <DynIcon name="folder" size="sm" />,
        children: [
          { key: 'helpers.ts', title: 'helpers.ts', icon: <DynIcon name="file" size="sm" />, isLeaf: true },
          { key: 'constants.ts', title: 'constants.ts', icon: <DynIcon name="file" size="sm" />, isLeaf: true },
        ]
      },
      { key: 'App.tsx', title: 'App.tsx', icon: <DynIcon name="file" size="sm" />, isLeaf: true },
      { key: 'index.tsx', title: 'index.tsx', icon: <DynIcon name="file" size="sm" />, isLeaf: true },
    ]
  },
  {
    key: 'public',
    title: 'public',
    icon: <DynIcon name="folder" size="sm" />,
    children: [
      { key: 'index.html', title: 'index.html', icon: <DynIcon name="file" size="sm" />, isLeaf: true },
      { key: 'favicon.ico', title: 'favicon.ico', icon: <DynIcon name="image" size="sm" />, isLeaf: true },
    ]
  },
  { key: 'package.json', title: 'package.json', icon: <DynIcon name="file" size="sm" />, isLeaf: true },
  { key: 'README.md', title: 'README.md', icon: <DynIcon name="file" size="sm" />, isLeaf: true },
];

const organizationData = [
  {
    key: 'engineering',
    title: 'Engineering',
    icon: <DynIcon name="code" size="sm" />,
    children: [
      {
        key: 'frontend',
        title: 'Frontend Team',
        icon: <DynIcon name="users" size="sm" />,
        children: [
          { key: 'alice', title: 'Alice Johnson (Lead)', isLeaf: true },
          { key: 'bob', title: 'Bob Smith', isLeaf: true },
        ]
      },
      {
        key: 'backend', 
        title: 'Backend Team',
        icon: <DynIcon name="users" size="sm" />,
        children: [
          { key: 'carol', title: 'Carol Williams (Lead)', isLeaf: true },
          { key: 'david', title: 'David Brown', isLeaf: true },
        ]
      }
    ]
  },
  {
    key: 'design',
    title: 'Design',
    icon: <DynIcon name="palette" size="sm" />,
    children: [
      { key: 'eva', title: 'Eva Martinez (Lead)', isLeaf: true },
      { key: 'frank', title: 'Frank Taylor', isLeaf: true },
    ]
  },
];

const meta = {
  title: 'Data/DynTreeView',
  component: DynTreeView,
  decorators: [
    (Story) => (
      <ThemeProvider defaultTheme="light">
        <div style={{ width: '100%', maxWidth: '500px', minHeight: '400px' }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Hierarchical tree component for displaying nested data with expand/collapse functionality.

### Features
- Expandable and collapsible nodes
- Single and multiple selection modes
- Custom icons for nodes
- Keyboard navigation (Arrow keys, Enter, Space)
- Connect lines option
- ARIA tree pattern compliance
- Controlled and uncontrolled expansion/selection
        `
      }
    }
  },
  argTypes: {
    selectionMode: {
      control: 'select',
      options: ['single', 'multiple'],
    },
    showIcon: {
      control: 'boolean',
    },
    showLine: {
      control: 'boolean', 
    },
  },
} satisfies Meta<typeof DynTreeView>;

export default meta;
type Story = StoryObj<typeof meta>;

// File system example
export const FileSystem: Story = {
  args: {
    treeData: fileSystemData,
    defaultExpandedKeys: ['src'],
    showIcon: true,
    selectionMode: 'single',
  },
};

// Organization hierarchy
export const OrganizationHierarchy: Story = {
  args: {
    treeData: organizationData,
    defaultExpandedKeys: ['engineering'],
    showIcon: true,
    showLine: true,
    selectionMode: 'single',
  },
  parameters: {
    docs: {
      description: {
        story: 'Organization hierarchy with connecting lines and team icons. Shows how to represent organizational structures.'
      }
    }
  }
};

// Multiple selection
export const MultipleSelection: Story = {
  render: () => {
    const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
    const [expandedKeys, setExpandedKeys] = useState<string[]>(['src', 'components']);
    
    return (
      <div>
        <DynBox mb="md" p="sm" bg="secondary" radius="md">
          <strong>Selected:</strong> {selectedKeys.length > 0 ? selectedKeys.join(', ') : 'None'}
        </DynBox>
        
        <DynTreeView
          treeData={fileSystemData}
          selectedKeys={selectedKeys}
          expandedKeys={expandedKeys}
          onSelect={setSelectedKeys}
          onExpand={setExpandedKeys}
          selectionMode="multiple"
          showIcon={true}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Tree with multiple selection support. Shows selected node keys above the tree.'
      }
    }
  }
};

// Controlled tree
export const ControlledTree: Story = {
  render: () => {
    const [expandedKeys, setExpandedKeys] = useState<string[]>(['src']);
    const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
    
    const handleExpandAll = () => {
      const allKeys: string[] = [];
      const collectKeys = (nodes: typeof fileSystemData) => {
        nodes.forEach(node => {
          if (node.children) {
            allKeys.push(node.key);
            collectKeys(node.children);
          }
        });
      };
      collectKeys(fileSystemData);
      setExpandedKeys(allKeys);
    };
    
    const handleCollapseAll = () => {
      setExpandedKeys([]);
    };
    
    return (
      <div>
        <DynBox display="flex" gap="sm" mb="md">
          <DynButton size="sm" variant="outline" onClick={handleExpandAll}>
            Expand All
          </DynButton>
          <DynButton size="sm" variant="outline" onClick={handleCollapseAll}>
            Collapse All
          </DynButton>
          <DynButton size="sm" variant="outline" onClick={() => setSelectedKeys([])}>
            Clear Selection
          </DynButton>
        </DynBox>
        
        <DynTreeView
          treeData={fileSystemData}
          expandedKeys={expandedKeys}
          selectedKeys={selectedKeys}
          onExpand={setExpandedKeys}
          onSelect={setSelectedKeys}
          showIcon={true}
          selectionMode="single"
        />
        
        <DynBox mt="md" p="sm" bg="muted" radius="md">
          <div><strong>Expanded:</strong> {expandedKeys.join(', ') || 'None'}</div>
          <div><strong>Selected:</strong> {selectedKeys.join(', ') || 'None'}</div>
        </DynBox>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Fully controlled tree with external state management and bulk operations. Shows how to programmatically control tree state.'
      }
    }
  }
};

// Interactive playground
export const Playground: Story = {
  args: {
    treeData: fileSystemData,
    selectionMode: 'single',
    showIcon: true,
    showLine: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground to test different tree configurations. Use the controls panel to experiment with props.'
      }
    }
  }
};