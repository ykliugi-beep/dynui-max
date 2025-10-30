import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import { DynBreadcrumb, ThemeProvider } from '@dynui-max/core';
import { useState } from 'react';

const meta = {
  title: 'Navigation/DynBreadcrumb',
  component: DynBreadcrumb,
  decorators: [
    (Story) => (
      <ThemeProvider defaultTheme="light">
        <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
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
Navigational breadcrumb component that shows the user's current location within a hierarchical structure.

### Features
- Hierarchical navigation path display
- Overflow handling with max items limit
- Custom separators and icons
- Router integration support
- Current page indication with aria-current
- Keyboard navigation support
- Mobile-responsive design
- Accessibility compliance (WCAG AA)
        `
      }
    }
  },
  argTypes: {
    items: {
      control: 'object',
      description: 'Array of breadcrumb items with label, href, onClick, and optional icon'
    },
    separator: {
      control: 'text',
      description: 'Separator between breadcrumb items'
    },
    maxItems: {
      control: { type: 'number', min: 3, max: 10 },
      description: 'Maximum number of items to show before collapsing'
    },
    currentPageAria: {
      control: 'boolean',
      description: 'Mark the last item as current page for screen readers'
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of breadcrumb text and spacing'
    }
  },
} satisfies Meta<typeof DynBreadcrumb>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample breadcrumb data
const basicItems = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'Electronics', href: '/products/electronics' },
  { label: 'Smartphones', href: '/products/electronics/smartphones' },
  { label: 'iPhone 15 Pro', href: '/products/electronics/smartphones/iphone-15-pro' }
];

const longPathItems = [
  { label: 'Home', href: '/' },
  { label: 'Company', href: '/company' },
  { label: 'Departments', href: '/company/departments' },
  { label: 'Engineering', href: '/company/departments/engineering' },
  { label: 'Frontend Team', href: '/company/departments/engineering/frontend' },
  { label: 'React Projects', href: '/company/departments/engineering/frontend/react' },
  { label: 'Component Library', href: '/company/departments/engineering/frontend/react/components' },
  { label: 'DynUI Documentation', href: '/company/departments/engineering/frontend/react/components/dynui' }
];

// Overview - Basic breadcrumb navigation
export const Overview: Story = {
  args: {
    items: basicItems,
    separator: '/',
    currentPageAria: true
  },
  render: (args) => {
    const [currentPath, setCurrentPath] = useState('/products/electronics/smartphones/iphone-15-pro');
    
    const handleItemClick = (href: string) => {
      setCurrentPath(href);
    };
    
    const itemsWithClick = args.items.map(item => ({
      ...item,
      onClick: (e: React.MouseEvent) => {
        e.preventDefault();
        handleItemClick(item.href!);
      }
    }));
    
    return (
      <div>
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ margin: '0 0 1rem 0', color: 'var(--color-text-primary)' }}>Product Navigation</h3>
          <p style={{ margin: '0 0 1rem 0', color: 'var(--color-text-secondary)' }}>Navigate through the product hierarchy. Click any breadcrumb to go back.</p>
        </div>
        
        <nav aria-label="Breadcrumb navigation">
          <DynBreadcrumb {...args} items={itemsWithClick} />
        </nav>
        
        <div style={{ 
          marginTop: '2rem', 
          padding: '1.5rem', 
          background: 'var(--color-background-secondary)', 
          borderRadius: '8px',
          border: '1px solid var(--color-border-primary)'
        }}>
          <h4 style={{ margin: '0 0 1rem 0', color: 'var(--color-text-primary)' }}>Current Page: iPhone 15 Pro</h4>
          <p style={{ margin: '0 0 1rem 0', color: 'var(--color-text-secondary)' }}>You are currently viewing the iPhone 15 Pro product page.</p>
          <div style={{ fontSize: '0.9em', color: 'var(--color-text-secondary)' }}>
            <strong>Path:</strong> {currentPath}
          </div>
        </div>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Check breadcrumb navigation is present
    const nav = canvas.getByRole('navigation', { name: /breadcrumb/i });
    await expect(nav).toBeInTheDocument();
    
    // Check all breadcrumb items are present
    const homeLink = canvas.getByRole('link', { name: /home/i });
    await expect(homeLink).toBeInTheDocument();
    
    // Check current page has aria-current
    const currentPage = canvas.getByText('iPhone 15 Pro');
    await expect(currentPage).toHaveAttribute('aria-current', 'page');
    
    // Test breadcrumb navigation
    const productsLink = canvas.getByRole('link', { name: /products/i });
    await userEvent.click(productsLink);
    
    // Verify navigation works
    await expect(canvas.getByText('/products')).toBeInTheDocument();
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic breadcrumb navigation showing hierarchical path. Last item is marked as current page for accessibility.'
      }
    }
  }
};

// Long Path With Overflow - Handling many breadcrumb items
export const LongPathWithOverflow: Story = {
  args: {
    items: longPathItems,
    separator: '→',
    maxItems: 4,
    currentPageAria: true
  },
  render: (args) => (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ margin: '0 0 1rem 0', color: 'var(--color-text-primary)' }}>Long Navigation Path</h3>
        <p style={{ margin: '0 0 1rem 0', color: 'var(--color-text-secondary)' }}>When there are many levels, breadcrumbs automatically collapse to prevent overflow.</p>
      </div>
      
      <div style={{ marginBottom: '2rem' }}>
        <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--color-text-primary)' }}>With maxItems = 4</h4>
        <DynBreadcrumb {...args} />
      </div>
      
      <div style={{ marginBottom: '2rem' }}>
        <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--color-text-primary)' }}>With maxItems = 6</h4>
        <DynBreadcrumb {...args} maxItems={6} />
      </div>
      
      <div style={{ marginBottom: '2rem' }}>
        <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--color-text-primary)' }}>Full Path (no limit)</h4>
        <DynBreadcrumb {...args} maxItems={undefined} />
      </div>
      
      <div style={{ 
        padding: '1.5rem', 
        background: 'var(--color-background-secondary)', 
        borderRadius: '8px',
        border: '1px solid var(--color-border-primary)'
      }}>
        <h4 style={{ margin: '0 0 1rem 0', color: 'var(--color-text-primary)' }}>Overflow Behavior</h4>
        <ul style={{ margin: 0, paddingLeft: '1.5rem', color: 'var(--color-text-secondary)' }}>
          <li>When items exceed maxItems, middle items are collapsed into "..."</li>
          <li>First and last items are always visible for context</li>
          <li>Clicking "..." can expand to show hidden items</li>
          <li>Responsive design adapts to available screen space</li>
        </ul>
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Check overflow indicator is present
    const overflowIndicator = canvas.getByText('...');
    await expect(overflowIndicator).toBeInTheDocument();
    
    // Check first and last items are always visible
    const homeLink = canvas.getByRole('link', { name: /home/i });
    await expect(homeLink).toBeInTheDocument();
    
    const currentPage = canvas.getByText('DynUI Documentation');
    await expect(currentPage).toBeInTheDocument();
    
    // Test overflow expansion (if implemented)
    if (overflowIndicator.tagName === 'BUTTON') {
      await userEvent.click(overflowIndicator);
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Overflow handling for long navigation paths. Middle items collapse into "..." when maxItems is exceeded.'
      }
    }
  }
};

// With Icons - Breadcrumbs with visual icons
export const WithIcons: Story = {
  render: () => {
    const itemsWithIcons = [
      { 
        label: 'Home', 
        href: '/', 
        icon: <span style={{ marginRight: '0.5rem' }}>🏠</span>
      },
      { 
        label: 'Projects', 
        href: '/projects',
        icon: <span style={{ marginRight: '0.5rem' }}>📁</span>
      },
      { 
        label: 'Web App', 
        href: '/projects/webapp',
        icon: <span style={{ marginRight: '0.5rem' }}>🌐</span>
      },
      { 
        label: 'Components', 
        href: '/projects/webapp/components',
        icon: <span style={{ marginRight: '0.5rem' }}>🧩</span>
      },
      { 
        label: 'Button.tsx', 
        href: '/projects/webapp/components/button',
        icon: <span style={{ marginRight: '0.5rem' }}>📄</span>
      }
    ];
    
    const fileSystemItems = [
      { 
        label: 'Documents', 
        href: '/documents',
        icon: <span style={{ marginRight: '0.5rem' }}>📂</span>
      },
      { 
        label: 'Projects', 
        href: '/documents/projects',
        icon: <span style={{ marginRight: '0.5rem' }}>📁</span>
      },
      { 
        label: 'React App', 
        href: '/documents/projects/react-app',
        icon: <span style={{ marginRight: '0.5rem' }}>⚛️</span>
      },
      { 
        label: 'src', 
        href: '/documents/projects/react-app/src',
        icon: <span style={{ marginRight: '0.5rem' }}>📁</span>
      },
      { 
        label: 'components', 
        href: '/documents/projects/react-app/src/components',
        icon: <span style={{ marginRight: '0.5rem' }}>🧩</span>
      }
    ];
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
        <div>
          <h4 style={{ margin: '0 0 1rem 0', color: 'var(--color-text-primary)' }}>Project Navigation</h4>
          <DynBreadcrumb 
            items={itemsWithIcons} 
            separator="/" 
            currentPageAria={true}
          />
        </div>
        
        <div>
          <h4 style={{ margin: '0 0 1rem 0', color: 'var(--color-text-primary)' }}>File System Path</h4>
          <DynBreadcrumb 
            items={fileSystemItems} 
            separator=">" 
            currentPageAria={true}
          />
        </div>
        
        <div>
          <h4 style={{ margin: '0 0 1rem 0', color: 'var(--color-text-primary)' }}>Without Icons (Comparison)</h4>
          <DynBreadcrumb 
            items={itemsWithIcons.map(({ icon, ...item }) => item)} 
            separator="/" 
            currentPageAria={true}
          />
        </div>
        
        <div style={{ 
          padding: '1.5rem', 
          background: 'var(--color-background-secondary)', 
          borderRadius: '8px',
          border: '1px solid var(--color-border-primary)'
        }}>
          <h4 style={{ margin: '0 0 1rem 0', color: 'var(--color-text-primary)' }}>Icon Usage Guidelines</h4>
          <ul style={{ margin: 0, paddingLeft: '1.5rem', color: 'var(--color-text-secondary)' }}>
            <li>Use consistent icon style and size throughout the breadcrumb</li>
            <li>Choose icons that clearly represent each level's content type</li>
            <li>Consider accessibility - icons should supplement, not replace text</li>
            <li>Avoid overly complex icons that may not scale well</li>
            <li>Test icon visibility across different themes and devices</li>
          </ul>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Breadcrumbs with icons for better visual hierarchy. Icons help users quickly identify content types and navigation levels.'
      }
    }
  }
};

// Router Integration - Simulated router integration
export const RouterIntegration: Story = {
  render: () => {
    const [currentRoute, setCurrentRoute] = useState('/dashboard/analytics/reports/monthly');
    
    // Simulate router-like navigation
    const routes = {
      '/': 'Dashboard Home',
      '/dashboard': 'Dashboard',
      '/dashboard/analytics': 'Analytics',
      '/dashboard/analytics/reports': 'Reports',
      '/dashboard/analytics/reports/monthly': 'Monthly Report'
    };
    
    // Generate breadcrumb items from current route
    const generateBreadcrumbs = (path: string) => {
      const segments = path.split('/').filter(Boolean);
      const items = [{ label: 'Home', href: '/' }];
      
      let currentPath = '';
      segments.forEach(segment => {
        currentPath += `/${segment}`;
        const label = routes[currentPath as keyof typeof routes] || segment;
        items.push({ label, href: currentPath });
      });
      
      return items;
    };
    
    const breadcrumbItems = generateBreadcrumbs(currentRoute).map(item => ({
      ...item,
      onClick: (e: React.MouseEvent) => {
        e.preventDefault();
        setCurrentRoute(item.href);
      }
    }));
    
    // Custom Link component simulation
    const CustomLink = ({ href, children, onClick, ...props }: any) => (
      <a 
        href={href}
        onClick={onClick}
        style={{ 
          color: 'var(--color-link)', 
          textDecoration: 'none',
          cursor: 'pointer'
        }}
        {...props}
      >
        {children}
      </a>
    );
    
    return (
      <div>
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ margin: '0 0 1rem 0', color: 'var(--color-text-primary)' }}>Router Integration Demo</h3>
          <p style={{ margin: '0 0 1rem 0', color: 'var(--color-text-secondary)' }}>Breadcrumbs automatically generated from current route with custom Link component.</p>
        </div>
        
        <div style={{ marginBottom: '2rem' }}>
          <DynBreadcrumb 
            items={breadcrumbItems}
            separator="/"
            currentPageAria={true}
            renderItem={(item) => (
              <CustomLink href={item.href} onClick={item.onClick}>
                {item.label}
              </CustomLink>
            )}
          />
        </div>
        
        <div style={{ 
          padding: '1.5rem', 
          background: 'var(--color-background-secondary)', 
          borderRadius: '8px',
          border: '1px solid var(--color-border-primary)',
          marginBottom: '2rem'
        }}>
          <h4 style={{ margin: '0 0 1rem 0', color: 'var(--color-text-primary)' }}>Current Page Content</h4>
          <div style={{ color: 'var(--color-text-secondary)' }}>
            <p><strong>Route:</strong> {currentRoute}</p>
            <p><strong>Page:</strong> {routes[currentRoute as keyof typeof routes]}</p>
            <p>This content updates based on the current route selection.</p>
          </div>
        </div>
        
        <div style={{ 
          padding: '1.5rem', 
          background: 'var(--color-background-secondary)', 
          borderRadius: '8px',
          border: '1px solid var(--color-border-primary)'
        }}>
          <h4 style={{ margin: '0 0 1rem 0', color: 'var(--color-text-primary)' }}>Quick Navigation</h4>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {Object.entries(routes).map(([path, name]) => (
              <button
                key={path}
                onClick={() => setCurrentRoute(path)}
                style={{
                  padding: '0.5rem 1rem',
                  border: '1px solid var(--color-border-primary)',
                  borderRadius: '4px',
                  background: currentRoute === path ? 'var(--color-primary)' : 'var(--color-background-primary)',
                  color: currentRoute === path ? 'white' : 'var(--color-text-primary)',
                  cursor: 'pointer',
                  fontSize: '0.9em'
                }}
              >
                {name}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Test initial breadcrumb
    const homeLink = canvas.getByRole('link', { name: /home/i });
    await expect(homeLink).toBeInTheDocument();
    
    // Test route navigation
    const dashboardButton = canvas.getByRole('button', { name: /^Dashboard$/i });
    await userEvent.click(dashboardButton);
    
    // Verify route change
    await expect(canvas.getByText('/dashboard')).toBeInTheDocument();
    
    // Test breadcrumb navigation
    await userEvent.click(homeLink);
    await expect(canvas.getByText('/')).toBeInTheDocument();
  },
  parameters: {
    docs: {
      description: {
        story: 'Integration with routing systems. Breadcrumbs are automatically generated from the current route and support custom Link components.'
      }
    }
  }
};

// Custom Separators - Different separator styles
export const CustomSeparators: Story = {
  render: () => {
    const sampleItems = [
      { label: 'Home', href: '/' },
      { label: 'Category', href: '/category' },
      { label: 'Subcategory', href: '/category/sub' },
      { label: 'Product', href: '/category/sub/product' }
    ];
    
    const separators = [
      { name: 'Forward Slash', value: '/' },
      { name: 'Arrow Right', value: '→' },
      { name: 'Chevron Right', value: '›' },
      { name: 'Greater Than', value: '>' },
      { name: 'Dot', value: '•' },
      { name: 'Pipe', value: '|' },
      { name: 'Double Arrow', value: '»' },
      { name: 'Triangle', value: '▶' }
    ];
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div>
          <h3 style={{ margin: '0 0 1rem 0', color: 'var(--color-text-primary)' }}>Separator Styles</h3>
          <p style={{ margin: '0 0 2rem 0', color: 'var(--color-text-secondary)' }}>Different separator characters for various design aesthetics and contexts.</p>
        </div>
        
        {separators.map(({ name, value }) => (
          <div key={name} style={{ marginBottom: '1rem' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--color-text-primary)', fontSize: '1rem' }}>{name} ({value})</h4>
            <DynBreadcrumb 
              items={sampleItems} 
              separator={value}
              currentPageAria={true}
            />
          </div>
        ))}
        
        <div>
          <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--color-text-primary)', fontSize: '1rem' }}>Custom React Element</h4>
          <DynBreadcrumb 
            items={sampleItems} 
            separator={<span style={{ margin: '0 0.5rem', opacity: 0.5 }}>•••</span>}
            currentPageAria={true}
          />
        </div>
        
        <div style={{ 
          padding: '1.5rem', 
          background: 'var(--color-background-secondary)', 
          borderRadius: '8px',
          border: '1px solid var(--color-border-primary)'
        }}>
          <h4 style={{ margin: '0 0 1rem 0', color: 'var(--color-text-primary)' }}>Separator Guidelines</h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
            <div>
              <strong style={{ color: 'var(--color-text-primary)' }}>Text-based:</strong>
              <ul style={{ margin: '0.5rem 0 0 0', paddingLeft: '1.5rem', color: 'var(--color-text-secondary)', fontSize: '0.9em' }}>
                <li>Forward slash (/) - Classic, familiar</li>
                <li>Greater than (>) - Command-line style</li>
                <li>Pipe (|) - Clean, minimal</li>
              </ul>
            </div>
            <div>
              <strong style={{ color: 'var(--color-text-primary)' }}>Arrows:</strong>
              <ul style={{ margin: '0.5rem 0 0 0', paddingLeft: '1.5rem', color: 'var(--color-text-secondary)', fontSize: '0.9em' }}>
                <li>Arrow (→) - Clear direction</li>
                <li>Chevron (›) - Subtle, elegant</li>
                <li>Triangle (▶) - Bold, modern</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Various separator options from simple characters to custom React elements. Choose based on design aesthetic and brand guidelines.'
      }
    }
  }
};

// Size Variants - Different breadcrumb sizes
export const SizeVariants: Story = {
  render: () => {
    const items = [
      { label: 'Dashboard', href: '/dashboard' },
      { label: 'User Management', href: '/dashboard/users' },
      { label: 'Edit Profile', href: '/dashboard/users/edit' }
    ];
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
        <div>
          <h4 style={{ margin: '0 0 1rem 0', color: 'var(--color-text-primary)' }}>Small (sm)</h4>
          <p style={{ margin: '0 0 1rem 0', color: 'var(--color-text-secondary)', fontSize: '0.9em' }}>Compact size for tight spaces, mobile interfaces, or secondary navigation</p>
          <DynBreadcrumb items={items} separator="/" size="sm" currentPageAria={true} />
        </div>
        
        <div>
          <h4 style={{ margin: '0 0 1rem 0', color: 'var(--color-text-primary)' }}>Medium (md)</h4>
          <p style={{ margin: '0 0 1rem 0', color: 'var(--color-text-secondary)', fontSize: '0.9em' }}>Standard size for most desktop applications and web interfaces</p>
          <DynBreadcrumb items={items} separator="/" size="md" currentPageAria={true} />
        </div>
        
        <div>
          <h4 style={{ margin: '0 0 1rem 0', color: 'var(--color-text-primary)' }}>Large (lg)</h4>
          <p style={{ margin: '0 0 1rem 0', color: 'var(--color-text-secondary)', fontSize: '0.9em' }}>Larger size for headers, hero sections, or when breadcrumbs are primary navigation</p>
          <DynBreadcrumb items={items} separator="/" size="lg" currentPageAria={true} />
        </div>
        
        <div style={{ 
          padding: '1.5rem', 
          background: 'var(--color-background-secondary)', 
          borderRadius: '8px',
          border: '1px solid var(--color-border-primary)'
        }}>
          <h4 style={{ margin: '0 0 1rem 0', color: 'var(--color-text-primary)' }}>Size Usage Guidelines</h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            <div>
              <strong style={{ color: 'var(--color-text-primary)' }}>Small (sm):</strong>
              <ul style={{ margin: '0.5rem 0 0 0', paddingLeft: '1.5rem', color: 'var(--color-text-secondary)', fontSize: '0.9em' }}>
                <li>Mobile interfaces</li>
                <li>Sidebar navigation</li>
                <li>Compact dashboards</li>
                <li>Secondary breadcrumbs</li>
              </ul>
            </div>
            <div>
              <strong style={{ color: 'var(--color-text-primary)' }}>Medium (md):</strong>
              <ul style={{ margin: '0.5rem 0 0 0', paddingLeft: '1.5rem', color: 'var(--color-text-secondary)', fontSize: '0.9em' }}>
                <li>Standard web apps</li>
                <li>Content pages</li>
                <li>Admin interfaces</li>
                <li>Default choice</li>
              </ul>
            </div>
            <div>
              <strong style={{ color: 'var(--color-text-primary)' }}>Large (lg):</strong>
              <ul style={{ margin: '0.5rem 0 0 0', paddingLeft: '1.5rem', color: 'var(--color-text-secondary)', fontSize: '0.9em' }}>
                <li>Page headers</li>
                <li>Hero sections</li>
                <li>Marketing pages</li>
                <li>Primary navigation</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Different size variants for various contexts: small for compact interfaces, medium for standard use, large for prominent placement.'
      }
    }
  }
};

// Mobile Responsive - Mobile-friendly breadcrumbs
export const MobileResponsive: Story = {
  render: () => {
    const items = [
      { label: 'Home', href: '/' },
      { label: 'Electronics', href: '/electronics' },
      { label: 'Smartphones', href: '/electronics/smartphones' },
      { label: 'Apple', href: '/electronics/smartphones/apple' },
      { label: 'iPhone 15 Pro Max 1TB Natural Titanium', href: '/electronics/smartphones/apple/iphone-15-pro-max' }
    ];
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
        <div>
          <h3 style={{ margin: '0 0 1rem 0', color: 'var(--color-text-primary)' }}>Mobile-Optimized Breadcrumb</h3>
          <p style={{ margin: '0 0 2rem 0', color: 'var(--color-text-secondary)' }}>Automatically adapts to smaller screens with truncation and responsive behavior.</p>
        </div>
        
        <div>
          <h4 style={{ margin: '0 0 1rem 0', color: 'var(--color-text-primary)' }}>Standard Desktop View</h4>
          <div style={{ border: '2px solid var(--color-border-primary)', borderRadius: '8px', padding: '1rem', marginBottom: '1rem' }}>
            <DynBreadcrumb items={items} separator="/" currentPageAria={true} />
          </div>
        </div>
        
        <div>
          <h4 style={{ margin: '0 0 1rem 0', color: 'var(--color-text-primary)' }}>Tablet View (Simulated)</h4>
          <div style={{ 
            maxWidth: '600px', 
            border: '2px solid var(--color-border-primary)', 
            borderRadius: '8px', 
            padding: '1rem', 
            marginBottom: '1rem' 
          }}>
            <DynBreadcrumb items={items} separator="/" currentPageAria={true} maxItems={4} />
          </div>
        </div>
        
        <div>
          <h4 style={{ margin: '0 0 1rem 0', color: 'var(--color-text-primary)' }}>Mobile View (Simulated)</h4>
          <div style={{ 
            maxWidth: '320px', 
            border: '2px solid var(--color-border-primary)', 
            borderRadius: '8px', 
            padding: '1rem', 
            marginBottom: '1rem' 
          }}>
            <DynBreadcrumb items={items} separator="/" currentPageAria={true} maxItems={3} size="sm" />
          </div>
        </div>
        
        {/* Back button pattern for mobile */}
        <div>
          <h4 style={{ margin: '0 0 1rem 0', color: 'var(--color-text-primary)' }}>Mobile Back Button Pattern</h4>
          <div style={{ 
            maxWidth: '320px', 
            border: '2px solid var(--color-border-primary)', 
            borderRadius: '8px', 
            padding: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}>
            <button 
              style={{
                background: 'none',
                border: '1px solid var(--color-border-primary)',
                borderRadius: '4px',
                padding: '0.5rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              ← Back
            </button>
            <span style={{ color: 'var(--color-text-primary)', fontWeight: 'bold' }}>iPhone 15 Pro Max</span>
          </div>
          <p style={{ margin: '0.5rem 0 0 0', color: 'var(--color-text-secondary)', fontSize: '0.9em' }}>Alternative: Simple back button with current page title</p>
        </div>
        
        <div style={{ 
          padding: '1.5rem', 
          background: 'var(--color-background-secondary)', 
          borderRadius: '8px',
          border: '1px solid var(--color-border-primary)'
        }}>
          <h4 style={{ margin: '0 0 1rem 0', color: 'var(--color-text-primary)' }}>Mobile Best Practices</h4>
          <ul style={{ margin: 0, paddingLeft: '1.5rem', color: 'var(--color-text-secondary)' }}>
            <li>Limit to 2-3 visible items on mobile screens</li>
            <li>Use smaller font sizes and compact spacing</li>
            <li>Consider showing only "Back" + current page for very small screens</li>
            <li>Ensure touch targets are at least 44px for accessibility</li>
            <li>Test truncation behavior with long item names</li>
            <li>Provide horizontal scrolling as fallback for overflow</li>
          </ul>
        </div>
      </div>
    );
  },
  parameters: {
    viewport: {
      defaultViewport: 'responsive',
    },
    docs: {
      description: {
        story: 'Mobile-responsive breadcrumb patterns with automatic truncation, size adjustment, and alternative back button approach for very small screens.'
      }
    }
  }
};

// Accessibility Demo - Screen reader and keyboard support
export const AccessibilityDemo: Story = {
  render: () => {
    const items = [
      { label: 'Home', href: '/' },
      { label: 'Accessibility', href: '/accessibility' },
      { label: 'Navigation', href: '/accessibility/navigation' },
      { label: 'Breadcrumbs', href: '/accessibility/navigation/breadcrumbs' }
    ];
    
    return (
      <div>
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ margin: '0 0 1rem 0', color: 'var(--color-text-primary)' }}>Accessibility Features</h3>
          <p style={{ margin: '0 0 1rem 0', color: 'var(--color-text-secondary)' }}>Comprehensive keyboard navigation and screen reader support following WCAG guidelines.</p>
        </div>
        
        <div style={{ marginBottom: '2rem' }}>
          <nav aria-label="Main breadcrumb navigation">
            <DynBreadcrumb 
              items={items}
              separator="/"
              currentPageAria={true}
            />
          </nav>
        </div>
        
        <div style={{ 
          padding: '1.5rem', 
          background: 'var(--color-background-secondary)', 
          borderRadius: '8px',
          border: '1px solid var(--color-border-primary)',
          marginBottom: '2rem'
        }}>
          <h4 style={{ margin: '0 0 1rem 0', color: 'var(--color-text-primary)' }}>Keyboard Navigation</h4>
          <ul style={{ margin: 0, paddingLeft: '1.5rem', color: 'var(--color-text-secondary)' }}>
            <li><kbd>Tab</kbd> - Navigate through breadcrumb links</li>
            <li><kbd>Shift + Tab</kbd> - Navigate backwards</li>
            <li><kbd>Enter</kbd> or <kbd>Space</kbd> - Activate focused link</li>
            <li><kbd>Home</kbd> - Jump to first breadcrumb item</li>
            <li><kbd>End</kbd> - Jump to last breadcrumb item</li>
          </ul>
        </div>
        
        <div style={{ 
          padding: '1.5rem', 
          background: 'var(--color-background-secondary)', 
          borderRadius: '8px',
          border: '1px solid var(--color-border-primary)',
          marginBottom: '2rem'
        }}>
          <h4 style={{ margin: '0 0 1rem 0', color: 'var(--color-text-primary)' }}>Screen Reader Announcements</h4>
          <ul style={{ margin: 0, paddingLeft: '1.5rem', color: 'var(--color-text-secondary)' }}>
            <li>"Breadcrumb navigation" - Navigation landmark identification</li>
            <li>"Home, link, 1 of 4" - Link with position context</li>
            <li>"Breadcrumbs, current page" - Final item with current page status</li>
            <li>"You are here: Home > Accessibility > Navigation > Breadcrumbs" - Full path context</li>
          </ul>
        </div>
        
        <div style={{ 
          padding: '1.5rem', 
          background: 'var(--color-background-secondary)', 
          borderRadius: '8px',
          border: '1px solid var(--color-border-primary)'
        }}>
          <h4 style={{ margin: '0 0 1rem 0', color: 'var(--color-text-primary)' }}>WCAG Compliance Features</h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
            <div>
              <strong style={{ color: 'var(--color-text-primary)' }}>Structure:</strong>
              <ul style={{ margin: '0.5rem 0 0 0', paddingLeft: '1.5rem', color: 'var(--color-text-secondary)', fontSize: '0.9em' }}>
                <li>Semantic nav element</li>
                <li>Proper heading hierarchy</li>
                <li>List structure (ol/ul)</li>
                <li>Link relationships</li>
              </ul>
            </div>
            <div>
              <strong style={{ color: 'var(--color-text-primary)' }}>ARIA:</strong>
              <ul style={{ margin: '0.5rem 0 0 0', paddingLeft: '1.5rem', color: 'var(--color-text-secondary)', fontSize: '0.9em' }}>
                <li>aria-label for navigation</li>
                <li>aria-current="page"</li>
                <li>aria-describedby for context</li>
                <li>role="navigation"</li>
              </ul>
            </div>
            <div>
              <strong style={{ color: 'var(--color-text-primary)' }}>Visual:</strong>
              <ul style={{ margin: '0.5rem 0 0 0', paddingLeft: '1.5rem', color: 'var(--color-text-secondary)', fontSize: '0.9em' }}>
                <li>High contrast ratios</li>
                <li>Focus indicators</li>
                <li>Sufficient touch targets</li>
                <li>Clear visual hierarchy</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Check navigation landmark
    const nav = canvas.getByRole('navigation', { name: /breadcrumb/i });
    await expect(nav).toBeInTheDocument();
    
    // Test keyboard navigation
    const firstLink = canvas.getByRole('link', { name: /home/i });
    await userEvent.tab();
    await expect(firstLink).toHaveFocus();
    
    // Test current page aria-current
    const currentPage = canvas.getByText('Breadcrumbs');
    await expect(currentPage).toHaveAttribute('aria-current', 'page');
    
    // Test link navigation
    await userEvent.keyboard('{Enter}');
  },
  parameters: {
    a11y: {
      config: {
        rules: [
          {
            id: 'landmark-one-main',
            enabled: true,
          },
          {
            id: 'region',
            enabled: true,
          },
          {
            id: 'aria-current',
            enabled: true,
          },
        ],
      },
    },
    docs: {
      description: {
        story: 'Comprehensive accessibility implementation with keyboard navigation, screen reader support, and WCAG AA compliance.'
      }
    }
  }
};

// Playground - Interactive testing
export const Playground: Story = {
  args: {
    items: basicItems,
    separator: '/',
    maxItems: undefined,
    currentPageAria: true,
    size: 'md'
  },
  render: (args) => {
    const [items, setItems] = useState(args.items);
    
    const handleItemClick = (index: number) => {
      // Simulate navigation by truncating items array
      setItems(args.items.slice(0, index + 1));
    };
    
    const itemsWithClick = items.map((item, index) => ({
      ...item,
      onClick: (e: React.MouseEvent) => {
        e.preventDefault();
        handleItemClick(index);
      }
    }));
    
    return (
      <div>
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ margin: '0 0 1rem 0', color: 'var(--color-text-primary)' }}>Breadcrumb Playground</h3>
          <p style={{ margin: '0 0 1rem 0', color: 'var(--color-text-secondary)' }}>Use the controls panel to experiment with different breadcrumb configurations.</p>
        </div>
        
        <nav aria-label="Playground breadcrumb">
          <DynBreadcrumb {...args} items={itemsWithClick} />
        </nav>
        
        <div style={{ 
          marginTop: '2rem',
          padding: '1rem',
          background: 'var(--color-background-secondary)',
          borderRadius: '8px',
          border: '1px solid var(--color-border-primary)'
        }}>
          <strong style={{ color: 'var(--color-text-primary)' }}>Current Configuration:</strong>
          <ul style={{ margin: '0.5rem 0 0 0', paddingLeft: '1.5rem', color: 'var(--color-text-secondary)', fontSize: '0.9em' }}>
            <li>Items: {items.length} of {args.items.length}</li>
            <li>Separator: "{args.separator}"</li>
            <li>Max Items: {args.maxItems || 'unlimited'}</li>
            <li>Size: {args.size}</li>
            <li>Current Page ARIA: {args.currentPageAria ? 'enabled' : 'disabled'}</li>
          </ul>
        </div>
      </div>
    );
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    
    // Check breadcrumb is present
    const nav = canvas.getByRole('navigation', { name: /breadcrumb/i });
    await expect(nav).toBeInTheDocument();
    
    // Test breadcrumb navigation
    const homeLink = canvas.getByRole('link', { name: /home/i });
    await userEvent.click(homeLink);
    
    // Check configuration display
    const configText = canvas.getByText(/current configuration/i);
    await expect(configText).toBeInTheDocument();
    
    // Test keyboard navigation
    await userEvent.tab();
    await expect(homeLink).toHaveFocus();
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground for testing different breadcrumb configurations. Modify the controls to see real-time changes.'
      }
    }
  }
};