import type { Meta, StoryObj } from '@storybook/react';
import { DynBox, ThemeProvider } from '@dynui-max/core';

const meta = {
  title: 'Layout/DynBox',
  component: DynBox,
  decorators: [
    (Story) => (
      <ThemeProvider defaultTheme="light">
        <Story />
      </ThemeProvider>
    ),
  ],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
Flexible layout container with comprehensive spacing utilities and responsive design capabilities.

### Features
- Polymorphic rendering (div, section, article, etc.)
- Spacing system using design tokens (padding, margin)
- Flexbox and CSS utilities
- Background and border variants
- Interactive states with hover/focus
- Semantic color system
- Display type control
        `
      }
    }
  },
  argTypes: {
    as: {
      control: 'select',
      options: ['div', 'section', 'article', 'main', 'aside', 'header', 'footer'],
    },
    display: {
      control: 'select',
      options: ['block', 'inline', 'inline-block', 'flex', 'inline-flex', 'grid', 'none'],
    },
    p: {
      control: 'select',
      options: ['0', 'sm', 'md', 'lg', 'auto'],
    },
    m: {
      control: 'select', 
      options: ['0', 'sm', 'md', 'lg', 'auto'],
    },
    bg: {
      control: 'select',
      options: ['primary', 'secondary', 'muted', 'inverse'],
    },
    radius: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'full'],
    },
    border: {
      control: 'boolean',
    },
    interactive: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof DynBox>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic usage
export const Default: Story = {
  args: {
    p: 'md',
    bg: 'secondary',
    radius: 'md',
    children: 'This is a DynBox container with padding, background, and border radius.',
  },
};

// Spacing utilities
export const SpacingUtilities: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <DynBox p="sm" bg="primary" radius="sm">
        Small padding
      </DynBox>
      <DynBox p="md" bg="secondary" radius="md">
        Medium padding
      </DynBox>
      <DynBox p="lg" bg="muted" radius="lg">
        Large padding
      </DynBox>
      <DynBox px="lg" py="sm" bg="secondary" border>
        Custom horizontal/vertical padding
      </DynBox>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Various spacing utilities using design tokens: p (all), px/py (horizontal/vertical), pt/pr/pb/pl (individual sides).'
      }
    }
  }
};

// Flexbox utilities
export const FlexboxUtilities: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <DynBox display="flex" direction="row" justify="space-between" p="md" bg="secondary" radius="md">
        <span>Left</span>
        <span>Center</span>
        <span>Right</span>
      </DynBox>
      
      <DynBox display="flex" direction="column" align="center" gap="sm" p="md" bg="muted" radius="md">
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
      </DynBox>
      
      <DynBox display="flex" direction="row" justify="center" align="center" p="lg" bg="primary" radius="lg">
        <span>Centered Content</span>
      </DynBox>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Flexbox utilities for layout: direction, justify-content, align-items, and gap control.'
      }
    }
  }
};

// Background and color variants
export const BackgroundVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <DynBox p="md" bg="primary" radius="md">
        Primary background
      </DynBox>
      <DynBox p="md" bg="secondary" radius="md">
        Secondary background
      </DynBox>
      <DynBox p="md" bg="muted" radius="md">
        Muted background
      </DynBox>
      <DynBox p="md" bg="inverse" color="inverse" radius="md">
        Inverse background with inverse text
      </DynBox>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Background color variants using semantic design tokens.'
      }
    }
  }
};

// Interactive states
export const Interactive: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <DynBox 
        interactive
        p="md" 
        bg="secondary" 
        radius="md" 
        onClick={() => alert('Box clicked!')}
      >
        Click me! (Interactive)
      </DynBox>
      
      <DynBox 
        as="button"
        p="md" 
        bg="muted" 
        radius="md"
        onClick={() => alert('Button box clicked!')}
      >
        Button Box
      </DynBox>
      
      <DynBox 
        as="a"
        href="#"
        p="md" 
        bg="primary" 
        radius="md"
        interactive
        onClick={(e) => {
          e.preventDefault();
          alert('Link box clicked!');
        }}
      >
        Link Box
      </DynBox>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Interactive boxes with hover states and click handling. Supports polymorphic rendering as button, link, or interactive div.'
      }
    }
  }
};

// Layout examples
export const LayoutExamples: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Card Layout */}
      <DynBox p="lg" bg="primary" radius="lg" border>
        <h3 style={{ margin: '0 0 1rem 0' }}>Card Layout</h3>
        <p style={{ margin: '0' }}>This is a card-style layout using DynBox with padding, background, radius, and border.</p>
      </DynBox>
      
      {/* Sidebar Layout */}
      <DynBox display="flex" direction="row" gap="md">
        <DynBox p="md" bg="muted" radius="md" style={{ minWidth: '200px' }}>
          <strong>Sidebar</strong>
          <p>Navigation content</p>
        </DynBox>
        <DynBox p="md" bg="secondary" radius="md" style={{ flex: 1 }}>
          <strong>Main Content</strong>
          <p>Primary content area that takes remaining space.</p>
        </DynBox>
      </DynBox>
      
      {/* Header Layout */}
      <DynBox as="header" display="flex" justify="space-between" align="center" p="md" bg="inverse" color="inverse">
        <strong>Logo</strong>
        <div>Navigation • Links • Here</div>
      </DynBox>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Real-world layout examples: cards, sidebars, headers. Shows how DynBox can be used as building blocks for complex layouts.'
      }
    }
  }
};

// Interactive playground
export const Playground: Story = {
  args: {
    as: 'div',
    display: 'block',
    p: 'md',
    bg: 'secondary',
    radius: 'md',
    border: false,
    interactive: false,
    children: 'Playground content - customize using controls panel',
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground to test different box configurations. Use the controls panel to experiment with spacing, colors, and layout props.'
      }
    }
  }
};