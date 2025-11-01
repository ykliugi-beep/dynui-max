import type { Meta, StoryObj } from '@storybook/react';
import { DynBreadcrumb } from './DynBreadcrumb';
import { DynBox } from '../DynBox/DynBox';
import { DynIcon } from '../DynIcon/DynIcon';

const meta: Meta<typeof DynBreadcrumb> = {
  title: 'Navigation/DynBreadcrumb',
  component: DynBreadcrumb,
  parameters: {
    docs: {
      description: {
        component: `
**DynBreadcrumb** provides hierarchical navigation with automatic overflow handling and customizable separators.

### Features:
- Link, button, and text item support
- Automatic overflow with ellipsis
- Customizable separators
- ARIA navigation pattern
- Proper semantic markup
        `
      }
    }
  },
  argTypes: {
    items: {
      control: 'object',
      description: 'Array of breadcrumb items with labels and navigation'
    },
    separator: {
      control: 'text',
      description: 'Custom separator between breadcrumb items'
    },
    maxItems: {
      control: { type: 'number', min: 1, max: 10 },
      description: 'Maximum visible items before overflow'
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

const basicItems = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'Electronics', href: '/products/electronics' },
  { label: 'Laptops' }
];

const longPathItems = [
  { label: 'Home', href: '/' },
  { label: 'Category', href: '/category' },
  { label: 'Subcategory', href: '/category/sub' },
  { label: 'Products', href: '/category/sub/products' },
  { label: 'Electronics', href: '/category/sub/products/electronics' },
  { label: 'Computers', href: '/category/sub/products/electronics/computers' },
  { label: 'Laptops', href: '/category/sub/products/electronics/computers/laptops' },
  { label: 'Gaming Laptops' }
];

/**
 * Basic breadcrumb with link navigation.
 */
export const Default: Story = {
  args: {
    items: basicItems
  }
};

/**
 * Breadcrumb with click handlers instead of links.
 */
export const WithClickHandlers: Story = {
  args: {
    items: [
      { label: 'Dashboard', onClick: () => alert('Navigate to Dashboard') },
      { label: 'Users', onClick: () => alert('Navigate to Users') },
      { label: 'Profile', onClick: () => alert('Navigate to Profile') },
      { label: 'Edit Profile' }
    ]
  }
};

/**
 * Long breadcrumb path with overflow handling.
 */
export const WithOverflow: Story = {
  args: {
    items: longPathItems,
    maxItems: 4
  },
  parameters: {
    docs: {
      description: {
        story: 'When there are more items than maxItems, middle items are collapsed with ellipsis.'
      }
    }
  }
};

/**
 * Custom separators demonstration.
 */
export const CustomSeparators: Story = {
  render: () => (
    <DynBox display="flex" direction="column" gap="lg">
      <DynBox>
        <h4>Default (Chevron)</h4>
        <DynBreadcrumb items={basicItems} />
      </DynBox>
      
      <DynBox>
        <h4>Slash Separator</h4>
        <DynBreadcrumb 
          items={basicItems} 
          separator={<span>/</span>} 
        />
      </DynBox>
      
      <DynBox>
        <h4>Bullet Separator</h4>
        <DynBreadcrumb 
          items={basicItems} 
          separator={<span>•</span>} 
        />
      </DynBox>
      
      <DynBox>
        <h4>Arrow Separator</h4>
        <DynBreadcrumb 
          items={basicItems} 
          separator={<span>→</span>} 
        />
      </DynBox>
    </DynBox>
  )
};

/**
 * Mixed item types (links, buttons, text).
 */
export const MixedTypes: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Dashboard', onClick: () => alert('Dashboard clicked') },
      { label: 'Reports', href: '/reports' },
      { label: 'Analytics', onClick: () => alert('Analytics clicked') },
      { label: 'Current Page' }
    ]
  }
};

/**
 * Breadcrumb overflow scenarios.
 */
export const OverflowScenarios: Story = {
  render: () => (
    <DynBox display="flex" direction="column" gap="lg">
      <DynBox>
        <h4>Max 1 Item (Only Last)</h4>
        <DynBreadcrumb items={longPathItems} maxItems={1} />
      </DynBox>
      
      <DynBox>
        <h4>Max 2 Items (First + Last)</h4>
        <DynBreadcrumb items={longPathItems} maxItems={2} />
      </DynBox>
      
      <DynBox>
        <h4>Max 3 Items</h4>
        <DynBreadcrumb items={longPathItems} maxItems={3} />
      </DynBox>
      
      <DynBox>
        <h4>Max 5 Items</h4>
        <DynBreadcrumb items={longPathItems} maxItems={5} />
      </DynBox>
    </DynBox>
  )
};

/**
 * Real-world e-commerce example.
 */
export const EcommerceExample: Story = {
  render: () => (
    <DynBox p="lg" bg="background" radius="md">
      <h3>Product Page Navigation</h3>
      <DynBreadcrumb 
        items={[
          { label: 'Home', href: '/' },
          { label: 'Electronics', href: '/electronics' },
          { label: 'Laptops', href: '/electronics/laptops' },
          { label: 'Gaming Laptops', href: '/electronics/laptops/gaming' },
          { label: 'ASUS ROG Strix G15' }
        ]}
        maxItems={4}
      />
      
      <DynBox mt="lg" p="md" bg="primary" color="white" radius="sm">
        <h4>ASUS ROG Strix G15 Gaming Laptop</h4>
        <p>High-performance gaming laptop with RTX graphics</p>
      </DynBox>
    </DynBox>
  )
};

/**
 * Interactive playground.
 */
export const Interactive: Story = {
  args: {
    items: basicItems,
    maxItems: undefined
  }
};