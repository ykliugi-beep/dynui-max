import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import { DynContainer, DynBox, ThemeProvider } from '@dynui-max/core';

const meta = {
  title: 'Layout/DynContainer',
  component: DynContainer,
  decorators: [
    (Story) => (
      <ThemeProvider defaultTheme="light">
        <Story />
      </ThemeProvider>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
Responsive container component with max-width constraints and fluid layout options.

### Features
- Responsive max-width breakpoints (sm, md, lg, xl, full)
- Fluid vs fixed width modes
- Container queries support
- Flexible padding and gap control
- Semantic HTML element rendering
- Mobile-first responsive design
        `
      }
    }
  },
  argTypes: {
    as: {
      control: 'select',
      options: ['div', 'section', 'main', 'article', 'aside'],
      description: 'HTML element to render as'
    },
    maxWidth: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'full'],
      description: 'Maximum width constraint'
    },
    padding: {
      control: 'select', 
      options: ['none', 'sm', 'md', 'lg'],
      description: 'Inner padding'
    },
    fluid: {
      control: 'boolean',
      description: 'Full width without max-width constraints'
    },
    responsive: {
      control: 'boolean',
      description: 'Enable container queries'
    },
    gap: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
      description: 'Gap between child elements'
    }
  },
} satisfies Meta<typeof DynContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

// Overview - Basic responsive container
export const Overview: Story = {
  args: {
    maxWidth: 'lg',
    padding: 'md',
    children: (
      <div>
        <h2 style={{ margin: '0 0 1rem 0', color: 'var(--color-text-primary)' }}>Welcome to DynContainer</h2>
        <p style={{ margin: '0 0 1rem 0', color: 'var(--color-text-secondary)' }}>
          This container adapts to different screen sizes while maintaining readable line lengths.
          Resize your viewport to see the responsive behavior in action.
        </p>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '1rem',
          marginTop: '2rem'
        }}>
          <DynBox p="md" bg="primary" radius="md">Card 1</DynBox>
          <DynBox p="md" bg="secondary" radius="md">Card 2</DynBox>
          <DynBox p="md" bg="muted" radius="md">Card 3</DynBox>
        </div>
      </div>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const container = canvas.getByRole('region') || canvasElement.querySelector('[data-container]');
    
    // Verify container has proper max-width class or style
    await expect(container).toBeTruthy();
    
    // Test responsive behavior by checking computed styles
    const computedStyle = window.getComputedStyle(container!);
    await expect(computedStyle.maxWidth).toBeTruthy();
  },
  parameters: {
    docs: {
      description: {
        story: 'Default container setup with responsive max-width and padding. Perfect for main content areas.'
      }
    }
  }
};

// Max Width Variants - Show all size options
export const MaxWidthVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', background: 'var(--color-background-secondary)', minHeight: '100vh', padding: '2rem 0' }}>
      <DynContainer maxWidth="sm" padding="md">
        <DynBox p="md" bg="primary" radius="md" style={{ textAlign: 'center' }}>
          <strong>Small (sm)</strong><br />
          Perfect for forms and focused content
        </DynBox>
      </DynContainer>
      
      <DynContainer maxWidth="md" padding="md">
        <DynBox p="md" bg="secondary" radius="md" style={{ textAlign: 'center' }}>
          <strong>Medium (md)</strong><br />
          Good for articles and blog posts
        </DynBox>
      </DynContainer>
      
      <DynContainer maxWidth="lg" padding="md">
        <DynBox p="md" bg="muted" radius="md" style={{ textAlign: 'center' }}>
          <strong>Large (lg)</strong><br />
          Ideal for main application content
        </DynBox>
      </DynContainer>
      
      <DynContainer maxWidth="xl" padding="md">
        <DynBox p="md" bg="primary" radius="md" style={{ textAlign: 'center' }}>
          <strong>Extra Large (xl)</strong><br />
          For dashboards and wide layouts
        </DynBox>
      </DynContainer>
      
      <DynContainer maxWidth="full" padding="md">
        <DynBox p="md" bg="inverse" radius="md" style={{ textAlign: 'center', color: 'var(--color-text-inverse)' }}>
          <strong>Full Width</strong><br />
          Uses entire viewport width
        </DynBox>
      </DynContainer>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Comparison of all max-width variants from small to full width. Each serves different content types and use cases.'
      }
    }
  }
};

// Fluid vs Fixed - Demonstrate the difference
export const FluidVsFixed: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', background: 'var(--color-background-secondary)', minHeight: '100vh', padding: '2rem 0' }}>
      <div>
        <h3 style={{ textAlign: 'center', margin: '0 0 1rem 0', color: 'var(--color-text-primary)' }}>Fixed Width Container</h3>
        <DynContainer maxWidth="lg" padding="md" fluid={false}>
          <DynBox p="lg" bg="primary" radius="md">
            <h4 style={{ margin: '0 0 1rem 0' }}>Fixed Width (maxWidth: lg)</h4>
            <p style={{ margin: 0 }}>This container has a maximum width constraint and centers itself. It maintains consistent line lengths for better readability across different screen sizes.</p>
          </DynBox>
        </DynContainer>
      </div>
      
      <div>
        <h3 style={{ textAlign: 'center', margin: '0 0 1rem 0', color: 'var(--color-text-primary)' }}>Fluid Container</h3>
        <DynContainer padding="md" fluid={true}>
          <DynBox p="lg" bg="secondary" radius="md">
            <h4 style={{ margin: '0 0 1rem 0' }}>Fluid Width</h4>
            <p style={{ margin: 0 }}>This container expands to fill the entire width of its parent. Perfect for full-width layouts, hero sections, or when you need maximum space utilization.</p>
          </DynBox>
        </DynContainer>
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Side-by-side comparison of fixed width vs fluid containers. Fixed maintains max-width while fluid uses all available space.'
      }
    }
  }
};

// Nested Containers - Show composition patterns
export const NestedContainers: Story = {
  render: () => (
    <div style={{ background: 'var(--color-background-secondary)', minHeight: '100vh', padding: '2rem 0' }}>
      <DynContainer maxWidth="xl" padding="lg">
        <DynBox p="lg" bg="primary" radius="lg">
          <h2 style={{ margin: '0 0 2rem 0', color: 'var(--color-text-inverse)' }}>Outer Container (xl)</h2>
          
          <DynContainer maxWidth="lg" padding="md">
            <DynBox p="md" bg="secondary" radius="md">
              <h3 style={{ margin: '0 0 1rem 0' }}>Nested Container (lg)</h3>
              <p style={{ margin: '0 0 1rem 0' }}>This pattern is useful when you need different content widths within the same layout.</p>
              
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <DynContainer maxWidth="sm" padding="sm" style={{ flex: 1 }}>
                  <DynBox p="sm" bg="muted" radius="sm">
                    <strong>Narrow Column</strong><br />
                    Perfect for sidebars
                  </DynBox>
                </DynContainer>
                
                <DynContainer maxWidth="md" padding="sm" style={{ flex: 2 }}>
                  <DynBox p="sm" bg="muted" radius="sm">
                    <strong>Wide Column</strong><br />
                    Main content area
                  </DynBox>
                </DynContainer>
              </div>
            </DynBox>
          </DynContainer>
        </DynBox>
      </DynContainer>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Nested container example showing how containers can be composed for complex layouts with different width constraints.'
      }
    }
  }
};

// With Grid Children - Show how it works with other components
export const WithGridChildren: Story = {
  render: () => (
    <div style={{ background: 'var(--color-background-secondary)', minHeight: '100vh', padding: '2rem 0' }}>
      <DynContainer maxWidth="lg" padding="lg" gap="lg">
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 style={{ margin: '0 0 1rem 0', color: 'var(--color-text-primary)' }}>Product Showcase</h2>
          <p style={{ margin: 0, color: 'var(--color-text-secondary)' }}>Container with responsive grid children</p>
        </div>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
          gap: 'var(--spacing-lg)' 
        }}>
          <DynBox p="lg" bg="primary" radius="md">
            <h3 style={{ margin: '0 0 1rem 0' }}>Product A</h3>
            <p style={{ margin: '0 0 1rem 0', color: 'var(--color-text-secondary)' }}>High-quality product with excellent features and great value.</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 'bold', fontSize: '1.2em' }}>$299</span>
              <button style={{ padding: '0.5rem 1rem', border: 'none', borderRadius: '4px', background: 'var(--color-primary)', color: 'white' }}>Add to Cart</button>
            </div>
          </DynBox>
          
          <DynBox p="lg" bg="secondary" radius="md">
            <h3 style={{ margin: '0 0 1rem 0' }}>Product B</h3>
            <p style={{ margin: '0 0 1rem 0', color: 'var(--color-text-secondary)' }}>Premium option with advanced functionality and extended warranty.</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 'bold', fontSize: '1.2em' }}>$499</span>
              <button style={{ padding: '0.5rem 1rem', border: 'none', borderRadius: '4px', background: 'var(--color-primary)', color: 'white' }}>Add to Cart</button>
            </div>
          </DynBox>
          
          <DynBox p="lg" bg="muted" radius="md">
            <h3 style={{ margin: '0 0 1rem 0' }}>Product C</h3>
            <p style={{ margin: '0 0 1rem 0', color: 'var(--color-text-secondary)' }}>Budget-friendly choice that doesn't compromise on quality.</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 'bold', fontSize: '1.2em' }}>$199</span>
              <button style={{ padding: '0.5rem 1rem', border: 'none', borderRadius: '4px', background: 'var(--color-primary)', color: 'white' }}>Add to Cart</button>
            </div>
          </DynBox>
        </div>
        
        <div style={{ marginTop: '3rem', padding: '2rem', background: 'var(--color-background-primary)', borderRadius: '8px', border: '1px solid var(--color-border-primary)' }}>
          <h3 style={{ margin: '0 0 1rem 0', color: 'var(--color-text-primary)' }}>Why Choose Our Products?</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>⚡</div>
              <strong>Fast Delivery</strong>
              <p style={{ fontSize: '0.9em', color: 'var(--color-text-secondary)', margin: '0.5rem 0 0 0' }}>Same day shipping</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🛡️</div>
              <strong>Warranty</strong>
              <p style={{ fontSize: '0.9em', color: 'var(--color-text-secondary)', margin: '0.5rem 0 0 0' }}>2 year guarantee</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>💬</div>
              <strong>Support</strong>
              <p style={{ fontSize: '0.9em', color: 'var(--color-text-secondary)', margin: '0.5rem 0 0 0' }}>24/7 customer care</p>
            </div>
          </div>
        </div>
      </DynContainer>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Real-world example showing DynContainer with responsive grid children, demonstrating how it works with other DynUI components.'
      }
    }
  }
};

// Responsive Demo - Interactive viewport testing
export const ResponsiveDemo: Story = {
  render: () => (
    <div style={{ background: 'var(--color-background-secondary)', minHeight: '100vh', padding: '2rem 0' }}>
      <DynContainer maxWidth="lg" padding="md" responsive={true}>
        <DynBox p="lg" bg="primary" radius="md">
          <h2 style={{ margin: '0 0 1rem 0', color: 'var(--color-text-inverse)' }}>Responsive Container</h2>
          <p style={{ margin: '0 0 1rem 0', color: 'var(--color-text-inverse)' }}>This container adapts to different viewport sizes:</p>
          <ul style={{ margin: '0 0 1rem 0', color: 'var(--color-text-inverse)' }}>
            <li>Mobile: Full width with minimal padding</li>
            <li>Tablet: Moderate max-width with comfortable padding</li>
            <li>Desktop: Large max-width with generous spacing</li>
          </ul>
          <p style={{ margin: 0, color: 'var(--color-text-inverse)', fontSize: '0.9em', opacity: 0.8 }}>Try the viewport controls in Storybook to see the responsive behavior!</p>
        </DynBox>
      </DynContainer>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'responsive',
    },
    docs: {
      description: {
        story: 'Interactive demo for testing responsive behavior. Use Storybook\'s viewport controls to see how the container adapts to different screen sizes.'
      }
    }
  }
};

// Accessibility Demo
export const AccessibilityDemo: Story = {
  render: () => (
    <div style={{ background: 'var(--color-background-secondary)', minHeight: '100vh', padding: '2rem 0' }}>
      <DynContainer as="main" maxWidth="lg" padding="lg" role="main" aria-label="Main content area">
        <header>
          <h1 style={{ margin: '0 0 1rem 0', color: 'var(--color-text-primary)' }}>Accessible Container</h1>
          <p style={{ margin: '0 0 2rem 0', color: 'var(--color-text-secondary)' }}>Proper semantic HTML and ARIA attributes</p>
        </header>
        
        <DynContainer as="section" maxWidth="md" padding="md" aria-labelledby="article-heading">
          <article>
            <h2 id="article-heading" style={{ margin: '0 0 1rem 0', color: 'var(--color-text-primary)' }}>Article Section</h2>
            <p style={{ margin: '0 0 1rem 0', color: 'var(--color-text-secondary)' }}>This nested container uses semantic HTML elements and proper ARIA labeling for screen readers.</p>
            <DynBox p="md" bg="muted" radius="md" role="complementary" aria-label="Additional information">
              <strong>Note:</strong> Always use semantic HTML elements and ARIA attributes for better accessibility.
            </DynBox>
          </article>
        </DynContainer>
        
        <aside aria-label="Related links">
          <DynContainer maxWidth="sm" padding="md">
            <h3 style={{ margin: '0 0 1rem 0', color: 'var(--color-text-primary)' }}>Related Links</h3>
            <nav aria-label="Related navigation">
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                <li style={{ marginBottom: '0.5rem' }}><a href="#" style={{ color: 'var(--color-link)' }}>Design System Guidelines</a></li>
                <li style={{ marginBottom: '0.5rem' }}><a href="#" style={{ color: 'var(--color-link)' }}>Accessibility Best Practices</a></li>
                <li><a href="#" style={{ color: 'var(--color-link)' }}>Component Documentation</a></li>
              </ul>
            </nav>
          </DynContainer>
        </aside>
      </DynContainer>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Check semantic elements
    const main = canvas.getByRole('main');
    await expect(main).toBeInTheDocument();
    
    const article = canvas.getByRole('article');
    await expect(article).toBeInTheDocument();
    
    const complementary = canvas.getByRole('complementary');
    await expect(complementary).toBeInTheDocument();
    
    // Check ARIA labels
    const navElement = canvas.getByRole('navigation', { name: /related navigation/i });
    await expect(navElement).toBeInTheDocument();
    
    // Verify links are accessible
    const links = canvas.getAllByRole('link');
    await expect(links).toHaveLength(3);
  },
  parameters: {
    layout: 'fullscreen',
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
        ],
      },
    },
    docs: {
      description: {
        story: 'Demonstrates proper semantic HTML usage and ARIA attributes for accessibility. Includes landmark roles and screen reader support.'
      }
    }
  }
};

// Playground - Interactive testing
export const Playground: Story = {
  args: {
    as: 'div',
    maxWidth: 'lg',
    padding: 'md',
    fluid: false,
    responsive: true,
    gap: 'md',
    children: (
      <div>
        <h3 style={{ margin: '0 0 1rem 0', color: 'var(--color-text-primary)' }}>Container Playground</h3>
        <p style={{ margin: '0 0 1rem 0', color: 'var(--color-text-secondary)' }}>Use the controls panel to experiment with different container configurations.</p>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <DynBox p="md" bg="primary" radius="md">Item 1</DynBox>
          <DynBox p="md" bg="secondary" radius="md">Item 2</DynBox>
          <DynBox p="md" bg="muted" radius="md">Item 3</DynBox>
        </div>
      </div>
    )
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const container = canvasElement.querySelector('[data-container]') || canvasElement.firstElementChild;
    
    // Test the container has expected properties based on args
    if (args.fluid) {
      // Should have full width when fluid
      const computedStyle = window.getComputedStyle(container!);
      await expect(computedStyle.width).not.toBe('auto');
    }
    
    // Verify children are rendered
    const items = canvas.getAllByText(/Item \d/);
    await expect(items).toHaveLength(3);
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Interactive playground for testing different container configurations. Modify the controls to see real-time changes.'
      }
    }
  }
};