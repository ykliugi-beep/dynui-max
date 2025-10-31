import type { Meta, StoryObj } from '@storybook/react';
import { DynContainer } from './DynContainer';
import { DynBox } from '../DynBox/DynBox';

const meta: Meta<typeof DynContainer> = {
  title: 'Layout/DynContainer',
  component: DynContainer,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
**DynContainer** provides responsive width constraints for page content with configurable size variants.

### Features:
- Multiple size variants (xs, sm, md, lg, xl, 2xl)
- Centered or fluid layout options  
- Responsive padding
- Polymorphic rendering support
        `
      }
    },
    a11y: {
      config: {
        rules: [
          { id: 'color-contrast', enabled: true },
          { id: 'landmark-one-main', enabled: false }
        ]
      }
    }
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      description: 'Container size variant controlling max-width'
    },
    centered: {
      control: 'boolean',
      description: 'Center content horizontally with auto margins'
    },
    fluid: {
      control: 'boolean', 
      description: 'Full width container without max-width constraints'
    },
    as: {
      control: { type: 'select' },
      options: ['div', 'main', 'section', 'article', 'header', 'footer'],
      description: 'HTML element to render as'
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

const SampleContent = () => (
  <DynBox p="lg" bg="primary" color="white" radius="md">
    <h2 style={{ margin: 0, marginBottom: '16px' }}>Container Content</h2>
    <p style={{ margin: 0, opacity: 0.9 }}>
      This content demonstrates how the container constrains width while maintaining
      responsive behavior. The container adapts to screen sizes and provides consistent
      spacing across your application.
    </p>
  </DynBox>
);

/**
 * Default container with medium size and centered layout.
 */
export const Default: Story = {
  args: {
    size: 'md',
    centered: true,
    children: <SampleContent />
  }
};

/**
 * All container size variants showing responsive width constraints.
 */
export const Sizes: Story = {
  render: () => (
    <div style={{ background: '#f8fafc', padding: '24px 0' }}>
      {(['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const).map((size) => (
        <div key={size} style={{ marginBottom: '32px' }}>
          <h3 style={{ textAlign: 'center', marginBottom: '16px' }}>Size: {size}</h3>
          <DynContainer size={size}>
            <DynBox 
              p="lg" 
              bg={size === 'xs' ? 'warning' : size === 'sm' ? 'info' : 
                  size === 'md' ? 'primary' : size === 'lg' ? 'success' : 
                  size === 'xl' ? 'danger' : 'secondary'}
              color="white" 
              radius="md"
            >
              <h4 style={{ margin: 0, marginBottom: '8px' }}>Container {size.toUpperCase()}</h4>
              <p style={{ margin: 0, opacity: 0.9, fontSize: '14px' }}>
                Max-width constraints ensure content remains readable across all devices.
              </p>
            </DynBox>
          </DynContainer>
        </div>
      ))}
    </div>
  )
};

/**
 * Fluid container takes full width without max-width constraints.
 */
export const Fluid: Story = {
  render: () => (
    <div style={{ background: '#f8fafc', padding: '24px 0' }}>
      <div style={{ marginBottom: '32px' }}>
        <h3 style={{ textAlign: 'center', marginBottom: '16px' }}>Standard Container (md)</h3>
        <DynContainer size="md">
          <DynBox p="lg" bg="primary" color="white" radius="md">
            <h4 style={{ margin: 0, marginBottom: '8px' }}>Constrained Width</h4>
            <p style={{ margin: 0, opacity: 0.9 }}>
              This container has max-width constraints for optimal reading experience.
            </p>
          </DynBox>
        </DynContainer>
      </div>
      
      <div>
        <h3 style={{ textAlign: 'center', marginBottom: '16px' }}>Fluid Container</h3>
        <DynContainer fluid>
          <DynBox p="lg" bg="danger" color="white" radius="md">
            <h4 style={{ margin: 0, marginBottom: '8px' }}>Full Width</h4>
            <p style={{ margin: 0, opacity: 0.9 }}>
              This fluid container expands to fill the entire available width.
            </p>
          </DynBox>
        </DynContainer>
      </div>
    </div>
  )
};

/**
 * Non-centered container aligned to the left side.
 */
export const NotCentered: Story = {
  args: {
    size: 'lg',
    centered: false,
    children: (
      <DynBox p="lg" bg="secondary" color="white" radius="md">
        <h4 style={{ margin: 0, marginBottom: '8px' }}>Left-Aligned Container</h4>
        <p style={{ margin: 0, opacity: 0.9 }}>
          This container is not centered and aligns to the left side of its parent.
        </p>
      </DynBox>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Container without centering stays aligned to the left side of its parent element.'
      }
    }
  }
};

/**
 * Semantic HTML elements showing polymorphic rendering capabilities.
 */
export const SemanticElements: Story = {
  render: () => (
    <div style={{ background: '#f8fafc', padding: '24px 0' }}>
      {[
        { as: 'main' as const, label: 'Main', bg: 'primary' as const },
        { as: 'section' as const, label: 'Section', bg: 'success' as const },
        { as: 'article' as const, label: 'Article', bg: 'warning' as const },
        { as: 'header' as const, label: 'Header', bg: 'info' as const },
        { as: 'footer' as const, label: 'Footer', bg: 'secondary' as const }
      ].map(({ as, label, bg }) => (
        <div key={as} style={{ marginBottom: '24px' }}>
          <DynContainer as={as} size="md">
            <DynBox p="lg" bg={bg} color="white" radius="md">
              <h4 style={{ margin: 0, marginBottom: '8px' }}>HTML &lt;{as}&gt; Element</h4>
              <p style={{ margin: 0, opacity: 0.9, fontSize: '14px' }}>
                Container renders as a semantic {label.toLowerCase()} element for better accessibility.
              </p>
            </DynBox>
          </DynContainer>
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'DynContainer can render as any HTML element using the `as` prop for semantic markup.'
      }
    }
  }
};

/**
 * Interactive playground for testing different container configurations.
 */
export const Interactive: Story = {
  args: {
    size: 'md',
    centered: true,
    fluid: false,
    as: 'div',
    children: (
      <DynBox p="xl" bg="primary" color="white" radius="lg">
        <h3 style={{ margin: 0, marginBottom: '16px' }}>Interactive Container Demo</h3>
        <p style={{ margin: 0, marginBottom: '16px', opacity: 0.9 }}>
          Adjust the controls below to see how different container properties affect layout:
        </p>
        <ul style={{ margin: 0, paddingLeft: '20px', opacity: 0.9 }}>
          <li>Size controls max-width constraints</li>
          <li>Centered determines horizontal alignment</li> 
          <li>Fluid removes width constraints</li>
          <li>Element type affects semantic meaning</li>
        </ul>
      </DynBox>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground to experiment with all DynContainer properties and see their effects in real-time.'
      }
    }
  }
};

/**
 * Real-world page layout example showing nested containers.
 */
export const PageLayout: Story = {
  render: () => (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      {/* Header */}
      <DynContainer as="header" size="xl" style={{ paddingTop: '32px', paddingBottom: '32px' }}>
        <DynBox 
          display="flex" 
          justify="space-between" 
          align="center" 
          p="lg" 
          bg="white" 
          radius="lg" 
          style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}
        >
          <h1 style={{ margin: 0, color: '#1a202c' }}>DynUI-Max</h1>
          <p style={{ margin: 0, color: '#4a5568' }}>Component Library</p>
        </DynBox>
      </DynContainer>

      {/* Main Content */}
      <DynContainer as="main" size="lg" style={{ padding: '48px 0' }}>
        <div style={{ display: 'grid', gap: '32px', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
          <DynBox p="xl" bg="white" radius="lg" style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
            <h2 style={{ margin: 0, marginBottom: '16px', color: '#2d3748' }}>Feature One</h2>
            <p style={{ margin: 0, color: '#4a5568', lineHeight: 1.6 }}>
              Container constraints ensure consistent layouts across different screen sizes while maintaining readability.
            </p>
          </DynBox>
          
          <DynBox p="xl" bg="white" radius="lg" style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
            <h2 style={{ margin: 0, marginBottom: '16px', color: '#2d3748' }}>Feature Two</h2>
            <p style={{ margin: 0, color: '#4a5568', lineHeight: 1.6 }}>
              Responsive design ensures your content looks great on mobile, tablet, and desktop devices.
            </p>
          </DynBox>
          
          <DynBox p="xl" bg="white" radius="lg" style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
            <h2 style={{ margin: 0, marginBottom: '16px', color: '#2d3748' }}>Feature Three</h2>
            <p style={{ margin: 0, color: '#4a5568', lineHeight: 1.6 }}>
              Semantic HTML elements improve accessibility and SEO while maintaining visual consistency.
            </p>
          </DynBox>
        </div>
      </DynContainer>

      {/* Footer */}
      <DynContainer as="footer" size="xl" style={{ paddingBottom: '32px' }}>
        <DynBox 
          p="lg" 
          bg="rgba(255, 255, 255, 0.9)" 
          radius="lg" 
          style={{ textAlign: 'center', backdropFilter: 'blur(8px)' }}
        >
          <p style={{ margin: 0, color: '#4a5568' }}>© 2025 DynUI-Max. Built with ❤️ for modern web applications.</p>
        </DynBox>
      </DynContainer>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Complete page layout example demonstrating how containers work together to create cohesive, responsive designs.'
      }
    }
  }
};