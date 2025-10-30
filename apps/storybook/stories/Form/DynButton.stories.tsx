import type { Meta, StoryObj } from '@storybook/react';
import { DynButton, ThemeProvider } from '@dynui-max/core';
import { DynIcon } from '@dynui-max/core';

const meta = {
  title: 'Form/DynButton',
  component: DynButton,
  decorators: [
    (Story) => (
      <ThemeProvider defaultTheme="light">
        <Story />
      </ThemeProvider>
    ),
  ],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Multi-variant button component with loading states, icon support, and polymorphic rendering.

### Features
- Multiple visual variants (primary, secondary, outline, ghost)
- Size variants using design tokens
- Loading state with spinner
- Icon support (left, right, icon-only)
- Disabled state handling
- Polymorphic rendering (as prop)
- Full keyboard navigation
- WCAG 2.1 AA compliant focus indicators
        `
      }
    }
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost'],
    },
    size: {
      control: 'select', 
      options: ['sm', 'md', 'lg'],
    },
    loading: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    children: {
      control: 'text',
    },
  },
  args: {
    children: 'Button',
  },
} satisfies Meta<typeof DynButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic variants
export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline', 
    children: 'Outline Button',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Ghost Button',
  },
};

// Size variants
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <DynButton size="sm">Small</DynButton>
      <DynButton size="md">Medium</DynButton>
      <DynButton size="lg">Large</DynButton>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available button sizes using design token system.'
      }
    }
  }
};

// With icons
export const WithIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <DynButton leftIcon={<DynIcon name="plus" size="sm" />}>
        Add Item
      </DynButton>
      <DynButton rightIcon={<DynIcon name="arrow-right" size="sm" />}>
        Continue
      </DynButton>
      <DynButton variant="outline" iconOnly aria-label="Settings">
        <DynIcon name="settings" size="sm" />
      </DynButton>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Buttons with left icons, right icons, and icon-only variants. Icon-only buttons require aria-label for accessibility.'
      }
    }
  }
};

// Loading states
export const LoadingStates: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <DynButton loading>Loading...</DynButton>
      <DynButton variant="secondary" loading>
        Processing
      </DynButton>
      <DynButton variant="outline" loading leftIcon={<DynIcon name="upload" size="sm" />}>
        Uploading
      </DynButton>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Loading states disable interaction and show spinner animation. Original icons are replaced with spinner.'
      }
    }
  }
};

// States demonstration
export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column', alignItems: 'flex-start' }}>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <DynButton>Normal</DynButton>
        <DynButton disabled>Disabled</DynButton>
        <DynButton loading>Loading</DynButton>
      </div>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <DynButton variant="secondary">Normal</DynButton>
        <DynButton variant="secondary" disabled>Disabled</DynButton>
        <DynButton variant="secondary" loading>Loading</DynButton>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All button states across different variants.'
      }
    }
  }
};

// Polymorphic rendering
export const PolymorphicRendering: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column', alignItems: 'flex-start' }}>
      <DynButton as="a" href="#" variant="primary">
        Link Button
      </DynButton>
      <DynButton as="div" role="button" tabIndex={0}>
        Div Button
      </DynButton>
      <DynButton as="button" type="submit" variant="outline">
        Submit Button
      </DynButton>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Polymorphic rendering allows buttons to be rendered as different HTML elements while maintaining button styling and behavior.'
      }
    }
  }
};

// Interactive playground
export const Playground: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    children: 'Playground Button',
    loading: false,
    disabled: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground to test different button configurations. Use the controls panel to experiment with props.'
      }
    }
  }
};