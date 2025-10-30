import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';
import { DynDivider, DynBox, ThemeProvider } from '@dynui-max/core';

const meta = {
  title: 'Layout/DynDivider',
  component: DynDivider,
  decorators: [
    (Story) => (
      <ThemeProvider defaultTheme="light">
        <div style={{ padding: '2rem' }}>
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
Visual separator component for creating clear divisions between content sections.

### Features
- Horizontal and vertical orientations
- Multiple visual variants (solid, dashed, dotted, subtle)
- Flexible sizing options
- Inset positioning control
- Optional text labels
- Semantic separator role for accessibility
- Responsive design support
        `
      }
    }
  },
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Divider orientation'
    },
    variant: {
      control: 'select',
      options: ['solid', 'dashed', 'dotted', 'subtle'],
      description: 'Visual style variant'
    },
    inset: {
      control: 'select',
      options: ['none', 'left', 'right', 'both'],
      description: 'Inset positioning'
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Divider thickness'
    },
    label: {
      control: 'text',
      description: 'Optional text label'
    },
    color: {
      control: 'select',
      options: ['default', 'muted', 'primary', 'secondary'],
      description: 'Color variant'
    }
  },
} satisfies Meta<typeof DynDivider>;

export default meta;
type Story = StoryObj<typeof meta>;

// Overview - Basic horizontal divider
export const Overview: Story = {
  args: {
    orientation: 'horizontal',
    variant: 'solid',
    size: 'md'
  },
  render: (args) => (
    <div>
      <DynBox p="md" bg="primary" radius="md">
        <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--color-text-inverse)' }}>Section Above</h4>
        <p style={{ margin: 0, color: 'var(--color-text-inverse)' }}>This is content above the divider.</p>
      </DynBox>
      
      <div style={{ margin: '2rem 0' }}>
        <DynDivider {...args} />
      </div>
      
      <DynBox p="md" bg="secondary" radius="md">
        <h4 style={{ margin: '0 0 0.5rem 0' }}>Section Below</h4>
        <p style={{ margin: 0, color: 'var(--color-text-secondary)' }}>This is content below the divider, clearly separated.</p>
      </DynBox>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Check divider has proper role
    const divider = canvas.getByRole('separator');
    await expect(divider).toBeInTheDocument();
    
    // Verify aria-orientation attribute
    await expect(divider).toHaveAttribute('aria-orientation', 'horizontal');
    
    // Check content separation
    await expect(canvas.getByText('Section Above')).toBeInTheDocument();
    await expect(canvas.getByText('Section Below')).toBeInTheDocument();
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic horizontal divider separating two content sections. Uses semantic separator role for accessibility.'
      }
    }
  }
};

// Variants - All visual styles
export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
      <div>
        <h4 style={{ margin: '0 0 1rem 0', color: 'var(--color-text-primary)' }}>Solid Divider</h4>
        <p style={{ margin: '0 0 1rem 0', color: 'var(--color-text-secondary)' }}>Clean, continuous line for clear separation</p>
        <DynDivider variant="solid" size="md" />
      </div>
      
      <div>
        <h4 style={{ margin: '0 0 1rem 0', color: 'var(--color-text-primary)' }}>Dashed Divider</h4>
        <p style={{ margin: '0 0 1rem 0', color: 'var(--color-text-secondary)' }}>Segmented line for softer visual separation</p>
        <DynDivider variant="dashed" size="md" />
      </div>
      
      <div>
        <h4 style={{ margin: '0 0 1rem 0', color: 'var(--color-text-primary)' }}>Dotted Divider</h4>
        <p style={{ margin: '0 0 1rem 0', color: 'var(--color-text-secondary)' }}>Subtle dotted pattern for minimal emphasis</p>
        <DynDivider variant="dotted" size="md" />
      </div>
      
      <div>
        <h4 style={{ margin: '0 0 1rem 0', color: 'var(--color-text-primary)' }}>Subtle Divider</h4>
        <p style={{ margin: '0 0 1rem 0', color: 'var(--color-text-secondary)' }}>Very light separation for delicate interfaces</p>
        <DynDivider variant="subtle" size="md" />
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Check all divider variants are present
    const dividers = canvas.getAllByRole('separator');
    await expect(dividers).toHaveLength(4);
    
    // Check each has proper orientation
    dividers.forEach(async (divider) => {
      await expect(divider).toHaveAttribute('aria-orientation', 'horizontal');
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'All visual variants: solid for clear separation, dashed for softer division, dotted for subtle breaks, and subtle for minimal emphasis.'
      }
    }
  }
};

// Vertical Orientation - Vertical dividers in flex layout
export const VerticalOrientation: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
      {/* Basic vertical layout */}
      <div>
        <h4 style={{ margin: '0 0 1rem 0', color: 'var(--color-text-primary)' }}>Basic Vertical Divider</h4>
        <div style={{ display: 'flex', alignItems: 'stretch', minHeight: '200px' }}>
          <DynBox p="lg" bg="primary" radius="md" style={{ flex: 1 }}>
            <h5 style={{ margin: '0 0 0.5rem 0', color: 'var(--color-text-inverse)' }}>Left Section</h5>
            <p style={{ margin: 0, color: 'var(--color-text-inverse)' }}>Content on the left side of the vertical divider.</p>
          </DynBox>
          
          <div style={{ margin: '0 1rem', display: 'flex', alignItems: 'center' }}>
            <DynDivider orientation="vertical" variant="solid" size="md" />
          </div>
          
          <DynBox p="lg" bg="secondary" radius="md" style={{ flex: 1 }}>
            <h5 style={{ margin: '0 0 0.5rem 0' }}>Right Section</h5>
            <p style={{ margin: 0, color: 'var(--color-text-secondary)' }}>Content on the right side of the vertical divider.</p>
          </DynBox>
        </div>
      </div>
      
      {/* Navigation-style layout */}
      <div>
        <h4 style={{ margin: '0 0 1rem 0', color: 'var(--color-text-primary)' }}>Navigation Separator</h4>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '1rem',
          padding: '1rem',
          background: 'var(--color-background-secondary)',
          borderRadius: '8px'
        }}>
          <a href="#" style={{ color: 'var(--color-link)', textDecoration: 'none', fontWeight: 'bold' }}>Home</a>
          <DynDivider orientation="vertical" variant="subtle" size="sm" />
          <a href="#" style={{ color: 'var(--color-link)', textDecoration: 'none' }}>Products</a>
          <DynDivider orientation="vertical" variant="subtle" size="sm" />
          <a href="#" style={{ color: 'var(--color-link)', textDecoration: 'none' }}>About</a>
          <DynDivider orientation="vertical" variant="subtle" size="sm" />
          <a href="#" style={{ color: 'var(--color-link)', textDecoration: 'none' }}>Contact</a>
        </div>
      </div>
      
      {/* Multi-column layout */}
      <div>
        <h4 style={{ margin: '0 0 1rem 0', color: 'var(--color-text-primary)' }}>Multi-Column Layout</h4>
        <div style={{ display: 'flex', minHeight: '160px' }}>
          <div style={{ flex: 1, padding: '1rem' }}>
            <h5 style={{ margin: '0 0 0.5rem 0', color: 'var(--color-text-primary)' }}>Column 1</h5>
            <p style={{ margin: 0, color: 'var(--color-text-secondary)', fontSize: '0.9em' }}>First column content with some text to demonstrate the layout.</p>
          </div>
          
          <DynDivider orientation="vertical" variant="dashed" size="md" />
          
          <div style={{ flex: 1, padding: '1rem' }}>
            <h5 style={{ margin: '0 0 0.5rem 0', color: 'var(--color-text-primary)' }}>Column 2</h5>
            <p style={{ margin: 0, color: 'var(--color-text-secondary)', fontSize: '0.9em' }}>Second column content separated by a vertical divider.</p>
          </div>
          
          <DynDivider orientation="vertical" variant="dashed" size="md" />
          
          <div style={{ flex: 1, padding: '1rem' }}>
            <h5 style={{ margin: '0 0 0.5rem 0', color: 'var(--color-text-primary)' }}>Column 3</h5>
            <p style={{ margin: 0, color: 'var(--color-text-secondary)', fontSize: '0.9em' }}>Third column completing the multi-column layout.</p>
          </div>
        </div>
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Check vertical dividers are present
    const dividers = canvas.getAllByRole('separator');
    await expect(dividers.length).toBeGreaterThan(0);
    
    // Check vertical orientation
    const verticalDividers = dividers.filter(divider => 
      divider.getAttribute('aria-orientation') === 'vertical'
    );
    await expect(verticalDividers.length).toBeGreaterThan(0);
    
    // Check navigation links
    const homeLink = canvas.getByRole('link', { name: /home/i });
    await expect(homeLink).toBeInTheDocument();
  },
  parameters: {
    docs: {
      description: {
        story: 'Vertical dividers in flex layouts: basic column separation, navigation separators, and multi-column content layouts.'
      }
    }
  }
};

// Size Variants - Different thicknesses
export const SizeVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
      <div>
        <h4 style={{ margin: '0 0 1rem 0', color: 'var(--color-text-primary)' }}>Small (sm)</h4>
        <p style={{ margin: '0 0 1rem 0', color: 'var(--color-text-secondary)' }}>Thin divider for subtle separation</p>
        <DynDivider variant="solid" size="sm" />
      </div>
      
      <div>
        <h4 style={{ margin: '0 0 1rem 0', color: 'var(--color-text-primary)' }}>Medium (md)</h4>
        <p style={{ margin: '0 0 1rem 0', color: 'var(--color-text-secondary)' }}>Standard thickness for most use cases</p>
        <DynDivider variant="solid" size="md" />
      </div>
      
      <div>
        <h4 style={{ margin: '0 0 1rem 0', color: 'var(--color-text-primary)' }}>Large (lg)</h4>
        <p style={{ margin: '0 0 1rem 0', color: 'var(--color-text-secondary)' }}>Thick divider for strong emphasis</p>
        <DynDivider variant="solid" size="lg" />
      </div>
      
      {/* Comparison */}
      <div style={{ 
        padding: '1.5rem', 
        background: 'var(--color-background-secondary)', 
        borderRadius: '8px',
        border: '1px solid var(--color-border-primary)'
      }}>
        <h4 style={{ margin: '0 0 1rem 0', color: 'var(--color-text-primary)' }}>Size Comparison</h4>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ marginBottom: '0.5rem', fontSize: '0.9em', color: 'var(--color-text-secondary)' }}>Small</div>
            <div style={{ width: '60px', display: 'flex', justifyContent: 'center' }}>
              <DynDivider orientation="vertical" variant="solid" size="sm" style={{ height: '40px' }} />
            </div>
          </div>
          
          <div style={{ textAlign: 'center' }}>
            <div style={{ marginBottom: '0.5rem', fontSize: '0.9em', color: 'var(--color-text-secondary)' }}>Medium</div>
            <div style={{ width: '60px', display: 'flex', justifyContent: 'center' }}>
              <DynDivider orientation="vertical" variant="solid" size="md" style={{ height: '40px' }} />
            </div>
          </div>
          
          <div style={{ textAlign: 'center' }}>
            <div style={{ marginBottom: '0.5rem', fontSize: '0.9em', color: 'var(--color-text-secondary)' }}>Large</div>
            <div style={{ width: '60px', display: 'flex', justifyContent: 'center' }}>
              <DynDivider orientation="vertical" variant="solid" size="lg" style={{ height: '40px' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different size variants from thin to thick. Choose based on the visual hierarchy and emphasis needed in your design.'
      }
    }
  }
};

// Inset Positioning - Various inset options
export const InsetPositioning: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
      <div>
        <h4 style={{ margin: '0 0 1rem 0', color: 'var(--color-text-primary)' }}>No Inset (Full Width)</h4>
        <div style={{ padding: '1rem', background: 'var(--color-background-secondary)', borderRadius: '8px' }}>
          <p style={{ margin: '0 0 1rem 0', color: 'var(--color-text-secondary)' }}>Content above divider</p>
          <DynDivider variant="solid" size="md" inset="none" />
          <p style={{ margin: '1rem 0 0 0', color: 'var(--color-text-secondary)' }}>Content below divider</p>
        </div>
      </div>
      
      <div>
        <h4 style={{ margin: '0 0 1rem 0', color: 'var(--color-text-primary)' }}>Left Inset</h4>
        <div style={{ padding: '1rem', background: 'var(--color-background-secondary)', borderRadius: '8px' }}>
          <p style={{ margin: '0 0 1rem 0', color: 'var(--color-text-secondary)' }}>Content above divider</p>
          <DynDivider variant="solid" size="md" inset="left" />
          <p style={{ margin: '1rem 0 0 0', color: 'var(--color-text-secondary)' }}>Content below divider with left inset</p>
        </div>
      </div>
      
      <div>
        <h4 style={{ margin: '0 0 1rem 0', color: 'var(--color-text-primary)' }}>Right Inset</h4>
        <div style={{ padding: '1rem', background: 'var(--color-background-secondary)', borderRadius: '8px' }}>
          <p style={{ margin: '0 0 1rem 0', color: 'var(--color-text-secondary)' }}>Content above divider</p>
          <DynDivider variant="solid" size="md" inset="right" />
          <p style={{ margin: '1rem 0 0 0', color: 'var(--color-text-secondary)' }}>Content below divider with right inset</p>
        </div>
      </div>
      
      <div>
        <h4 style={{ margin: '0 0 1rem 0', color: 'var(--color-text-primary)' }}>Both Sides Inset</h4>
        <div style={{ padding: '1rem', background: 'var(--color-background-secondary)', borderRadius: '8px' }}>
          <p style={{ margin: '0 0 1rem 0', color: 'var(--color-text-secondary)' }}>Content above divider</p>
          <DynDivider variant="solid" size="md" inset="both" />
          <p style={{ margin: '1rem 0 0 0', color: 'var(--color-text-secondary)' }}>Content below divider with both sides inset</p>
        </div>
      </div>
      
      {/* Real-world example */}
      <div>
        <h4 style={{ margin: '0 0 1rem 0', color: 'var(--color-text-primary)' }}>List with Inset Dividers</h4>
        <div style={{ 
          background: 'var(--color-background-primary)', 
          borderRadius: '8px', 
          border: '1px solid var(--color-border-primary)',
          overflow: 'hidden'
        }}>
          <div style={{ padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--color-primary)' }}></div>
            <div>
              <div style={{ fontWeight: 'bold', color: 'var(--color-text-primary)' }}>John Doe</div>
              <div style={{ fontSize: '0.9em', color: 'var(--color-text-secondary)' }}>john@example.com</div>
            </div>
          </div>
          
          <DynDivider variant="subtle" size="sm" inset="left" />
          
          <div style={{ padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--color-secondary)' }}></div>
            <div>
              <div style={{ fontWeight: 'bold', color: 'var(--color-text-primary)' }}>Jane Smith</div>
              <div style={{ fontSize: '0.9em', color: 'var(--color-text-secondary)' }}>jane@example.com</div>
            </div>
          </div>
          
          <DynDivider variant="subtle" size="sm" inset="left" />
          
          <div style={{ padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--color-muted)' }}></div>
            <div>
              <div style={{ fontWeight: 'bold', color: 'var(--color-text-primary)' }}>Bob Johnson</div>
              <div style={{ fontSize: '0.9em', color: 'var(--color-text-secondary)' }}>bob@example.com</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Inset positioning options: none (full width), left, right, or both sides. Commonly used in lists and card layouts.'
      }
    }
  }
};

// Labeled Dividers - Text labels for semantic separation
export const LabeledDividers: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
      <div>
        <h4 style={{ margin: '0 0 1rem 0', color: 'var(--color-text-primary)' }}>Basic Labeled Divider</h4>
        <DynBox p="md" bg="primary" radius="md">
          <p style={{ margin: 0, color: 'var(--color-text-inverse)' }}>User profile information above</p>
        </DynBox>
        
        <div style={{ margin: '2rem 0' }}>
          <DynDivider label="Account Settings" variant="solid" size="md" />
        </div>
        
        <DynBox p="md" bg="secondary" radius="md">
          <p style={{ margin: 0, color: 'var(--color-text-secondary)' }}>Account settings section below</p>
        </DynBox>
      </div>
      
      <div>
        <h4 style={{ margin: '0 0 1rem 0', color: 'var(--color-text-primary)' }}>Form Sections</h4>
        <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <h5 style={{ margin: '0 0 1rem 0', color: 'var(--color-text-primary)' }}>Personal Information</h5>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <input type="text" placeholder="First Name" style={{ padding: '0.5rem', border: '1px solid var(--color-border-primary)', borderRadius: '4px' }} />
              <input type="text" placeholder="Last Name" style={{ padding: '0.5rem', border: '1px solid var(--color-border-primary)', borderRadius: '4px' }} />
            </div>
          </div>
          
          <DynDivider label="Contact Details" variant="dashed" size="sm" />
          
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <input type="email" placeholder="Email Address" style={{ padding: '0.5rem', border: '1px solid var(--color-border-primary)', borderRadius: '4px' }} />
              <input type="tel" placeholder="Phone Number" style={{ padding: '0.5rem', border: '1px solid var(--color-border-primary)', borderRadius: '4px' }} />
            </div>
          </div>
          
          <DynDivider label="Preferences" variant="dotted" size="sm" />
          
          <div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-primary)' }}>
                <input type="checkbox" />
                Email notifications
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-primary)' }}>
                <input type="checkbox" />
                SMS notifications
              </label>
            </div>
          </div>
        </form>
      </div>
      
      <div>
        <h4 style={{ margin: '0 0 1rem 0', color: 'var(--color-text-primary)' }}>Timeline Dividers</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <DynBox p="md" bg="muted" radius="md">
            <div style={{ fontSize: '0.9em', color: 'var(--color-text-secondary)', marginBottom: '0.5rem' }}>9:00 AM</div>
            <div style={{ color: 'var(--color-text-primary)' }}>Team standup meeting</div>
          </DynBox>
          
          <DynDivider label="Lunch Break" variant="subtle" size="sm" />
          
          <DynBox p="md" bg="muted" radius="md">
            <div style={{ fontSize: '0.9em', color: 'var(--color-text-secondary)', marginBottom: '0.5rem' }}>1:30 PM</div>
            <div style={{ color: 'var(--color-text-primary)' }}>Project review with client</div>
          </DynBox>
          
          <DynDivider label="End of Day" variant="subtle" size="sm" />
          
          <DynBox p="md" bg="muted" radius="md">
            <div style={{ fontSize: '0.9em', color: 'var(--color-text-secondary)', marginBottom: '0.5rem' }}>5:00 PM</div>
            <div style={{ color: 'var(--color-text-primary)' }}>Wrap up and planning for tomorrow</div>
          </DynBox>
        </div>
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Check labeled dividers are present
    const accountSettingsLabel = canvas.getByText('Account Settings');
    await expect(accountSettingsLabel).toBeInTheDocument();
    
    const contactDetailsLabel = canvas.getByText('Contact Details');
    await expect(contactDetailsLabel).toBeInTheDocument();
    
    // Check form inputs are accessible
    const firstNameInput = canvas.getByPlaceholderText('First Name');
    await expect(firstNameInput).toBeInTheDocument();
    
    // Check checkboxes
    const checkboxes = canvas.getAllByRole('checkbox');
    await expect(checkboxes.length).toBeGreaterThanOrEqual(2);
  },
  parameters: {
    docs: {
      description: {
        story: 'Labeled dividers with text content for semantic separation. Useful in forms, timelines, and sectioned content.'
      }
    }
  }
};

// Color Variants - Different color options
export const ColorVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
      <div>
        <h4 style={{ margin: '0 0 1rem 0', color: 'var(--color-text-primary)' }}>Default Color</h4>
        <p style={{ margin: '0 0 1rem 0', color: 'var(--color-text-secondary)' }}>Standard divider color from theme</p>
        <DynDivider variant="solid" size="md" color="default" />
      </div>
      
      <div>
        <h4 style={{ margin: '0 0 1rem 0', color: 'var(--color-text-primary)' }}>Muted Color</h4>
        <p style={{ margin: '0 0 1rem 0', color: 'var(--color-text-secondary)' }}>Subtle, low-contrast appearance</p>
        <DynDivider variant="solid" size="md" color="muted" />
      </div>
      
      <div>
        <h4 style={{ margin: '0 0 1rem 0', color: 'var(--color-text-primary)' }}>Primary Color</h4>
        <p style={{ margin: '0 0 1rem 0', color: 'var(--color-text-secondary)' }}>Brand color for emphasis</p>
        <DynDivider variant="solid" size="md" color="primary" />
      </div>
      
      <div>
        <h4 style={{ margin: '0 0 1rem 0', color: 'var(--color-text-primary)' }}>Secondary Color</h4>
        <p style={{ margin: '0 0 1rem 0', color: 'var(--color-text-secondary)' }}>Secondary brand color</p>
        <DynDivider variant="solid" size="md" color="secondary" />
      </div>
      
      {/* Usage in cards */}
      <div style={{ 
        padding: '1.5rem', 
        background: 'var(--color-background-secondary)', 
        borderRadius: '8px',
        border: '1px solid var(--color-border-primary)'
      }}>
        <h4 style={{ margin: '0 0 1rem 0', color: 'var(--color-text-primary)' }}>Contextual Usage</h4>
        
        <DynBox p="md" bg="primary" radius="md" style={{ marginBottom: '1rem' }}>
          <h5 style={{ margin: '0 0 0.5rem 0', color: 'var(--color-text-inverse)' }}>Important Notice</h5>
          <p style={{ margin: 0, color: 'var(--color-text-inverse)' }}>This section uses primary color theme</p>
        </DynBox>
        
        <DynDivider variant="solid" size="md" color="primary" />
        
        <DynBox p="md" bg="secondary" radius="md" style={{ marginTop: '1rem' }}>
          <h5 style={{ margin: '0 0 0.5rem 0' }}>Additional Information</h5>
          <p style={{ margin: 0, color: 'var(--color-text-secondary)' }}>This section complements with secondary colors</p>
        </DynBox>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Color variants for different emphasis levels: default for standard use, muted for subtle separation, primary/secondary for brand consistency.'
      }
    }
  }
};

// Responsive Examples - Mobile-friendly patterns
export const ResponsiveExamples: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
      <div>
        <h4 style={{ margin: '0 0 1rem 0', color: 'var(--color-text-primary)' }}>Adaptive Layout</h4>
        <p style={{ margin: '0 0 1rem 0', color: 'var(--color-text-secondary)' }}>Dividers that work well across different screen sizes</p>
        
        {/* Desktop-style horizontal layout */}
        <div style={{ 
          display: 'flex', 
          gap: '1rem', 
          marginBottom: '2rem',
          '@media (max-width: 768px)': {
            flexDirection: 'column'
          }
        }}>
          <DynBox p="md" bg="primary" radius="md" style={{ flex: 1 }}>
            <h5 style={{ margin: '0 0 0.5rem 0', color: 'var(--color-text-inverse)' }}>Panel A</h5>
            <p style={{ margin: 0, color: 'var(--color-text-inverse)' }}>Content that stacks on mobile</p>
          </DynBox>
          
          {/* Show vertical divider on desktop, horizontal on mobile */}
          <div className="divider-container" style={{ display: 'flex', alignItems: 'center' }}>
            <DynDivider orientation="vertical" variant="solid" size="md" className="desktop-divider" />
          </div>
          
          <DynBox p="md" bg="secondary" radius="md" style={{ flex: 1 }}>
            <h5 style={{ margin: '0 0 0.5rem 0' }}>Panel B</h5>
            <p style={{ margin: 0, color: 'var(--color-text-secondary)' }}>Content that adapts to screen size</p>
          </DynBox>
        </div>
      </div>
      
      <div>
        <h4 style={{ margin: '0 0 1rem 0', color: 'var(--color-text-primary)' }}>Mobile-First Navigation</h4>
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column',
          gap: '0.5rem',
          background: 'var(--color-background-secondary)',
          padding: '1rem',
          borderRadius: '8px'
        }}>
          <a href="#" style={{ 
            padding: '0.75rem 0', 
            color: 'var(--color-link)', 
            textDecoration: 'none',
            fontWeight: 'bold'
          }}>Dashboard</a>
          
          <DynDivider variant="subtle" size="sm" inset="none" />
          
          <a href="#" style={{ 
            padding: '0.75rem 0', 
            color: 'var(--color-link)', 
            textDecoration: 'none'
          }}>Projects</a>
          
          <DynDivider variant="subtle" size="sm" inset="none" />
          
          <a href="#" style={{ 
            padding: '0.75rem 0', 
            color: 'var(--color-link)', 
            textDecoration: 'none'
          }}>Team</a>
          
          <DynDivider variant="subtle" size="sm" inset="none" />
          
          <a href="#" style={{ 
            padding: '0.75rem 0', 
            color: 'var(--color-link)', 
            textDecoration: 'none'
          }}>Settings</a>
        </div>
      </div>
      
      <div style={{ 
        padding: '1.5rem', 
        background: 'var(--color-background-secondary)', 
        borderRadius: '8px',
        border: '1px solid var(--color-border-primary)'
      }}>
        <h4 style={{ margin: '0 0 1rem 0', color: 'var(--color-text-primary)' }}>Responsive Design Tips</h4>
        <ul style={{ margin: 0, paddingLeft: '1.5rem', color: 'var(--color-text-secondary)' }}>
          <li>Use horizontal dividers for mobile-stacked content</li>
          <li>Consider subtle variants for small screens</li>
          <li>Adjust insets based on available space</li>
          <li>Test divider visibility across themes</li>
          <li>Ensure adequate touch targets around interactive elements</li>
        </ul>
      </div>
    </div>
  ),
  parameters: {
    viewport: {
      defaultViewport: 'responsive',
    },
    docs: {
      description: {
        story: 'Responsive divider patterns that adapt to different screen sizes. Includes mobile-first navigation and adaptive layouts.'
      }
    }
  }
};

// Playground - Interactive testing
export const Playground: Story = {
  args: {
    orientation: 'horizontal',
    variant: 'solid',
    inset: 'none',
    size: 'md',
    label: '',
    color: 'default'
  },
  render: (args) => (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ margin: '0 0 1rem 0', color: 'var(--color-text-primary)' }}>Divider Playground</h3>
        <p style={{ margin: '0 0 1rem 0', color: 'var(--color-text-secondary)' }}>Use the controls panel to experiment with different divider configurations.</p>
      </div>
      
      {args.orientation === 'horizontal' ? (
        <div>
          <DynBox p="md" bg="primary" radius="md">
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--color-text-inverse)' }}>Content Above</h4>
            <p style={{ margin: 0, color: 'var(--color-text-inverse)' }}>This content appears above the divider.</p>
          </DynBox>
          
          <div style={{ margin: '2rem 0' }}>
            <DynDivider {...args} />
          </div>
          
          <DynBox p="md" bg="secondary" radius="md">
            <h4 style={{ margin: '0 0 0.5rem 0' }}>Content Below</h4>
            <p style={{ margin: 0, color: 'var(--color-text-secondary)' }}>This content appears below the divider.</p>
          </DynBox>
        </div>
      ) : (
        <div style={{ display: 'flex', alignItems: 'stretch', minHeight: '200px' }}>
          <DynBox p="lg" bg="primary" radius="md" style={{ flex: 1 }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--color-text-inverse)' }}>Left Content</h4>
            <p style={{ margin: 0, color: 'var(--color-text-inverse)' }}>This content appears to the left of the vertical divider.</p>
          </DynBox>
          
          <div style={{ margin: '0 1rem', display: 'flex', alignItems: 'center' }}>
            <DynDivider {...args} />
          </div>
          
          <DynBox p="lg" bg="secondary" radius="md" style={{ flex: 1 }}>
            <h4 style={{ margin: '0 0 0.5rem 0' }}>Right Content</h4>
            <p style={{ margin: 0, color: 'var(--color-text-secondary)' }}>This content appears to the right of the vertical divider.</p>
          </DynBox>
        </div>
      )}
    </div>
  ),
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    
    // Check divider is present
    const divider = canvas.getByRole('separator');
    await expect(divider).toBeInTheDocument();
    
    // Check orientation attribute
    await expect(divider).toHaveAttribute('aria-orientation', args.orientation);
    
    // Check label if provided
    if (args.label) {
      await expect(canvas.getByText(args.label)).toBeInTheDocument();
    }
    
    // Verify content is separated properly
    if (args.orientation === 'horizontal') {
      await expect(canvas.getByText('Content Above')).toBeInTheDocument();
      await expect(canvas.getByText('Content Below')).toBeInTheDocument();
    } else {
      await expect(canvas.getByText('Left Content')).toBeInTheDocument();
      await expect(canvas.getByText('Right Content')).toBeInTheDocument();
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground for testing different divider configurations. Use the controls panel to experiment with various properties.'
      }
    }
  }
};