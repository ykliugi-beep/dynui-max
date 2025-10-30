import type { Meta, StoryObj } from '@storybook/react';
import { DynInput, ThemeProvider, DynFieldContainer, DynIcon } from '@dynui-max/core';
import { useState } from 'react';

const meta = {
  title: 'Form/DynInput',
  component: DynInput,
  decorators: [
    (Story) => (
      <ThemeProvider defaultTheme="light">
        <div style={{ maxWidth: '400px', margin: '0 auto' }}>
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
Advanced text input component with clear button, search functionality, and comprehensive validation states.

### Features
- Multiple size variants using design tokens
- Clear button for easy content clearing
- Search variant with search icon
- Error and validation states
- Disabled and readonly states
- Placeholder and helper text support
- Full keyboard navigation
- ARIA attributes for accessibility
        `
      }
    }
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'search'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    error: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    readOnly: {
      control: 'boolean',
    },
    clearable: {
      control: 'boolean',
    },
    placeholder: {
      control: 'text',
    },
    value: {
      control: 'text',
    },
  },
} satisfies Meta<typeof DynInput>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic variants
export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
    clearable: true,
  },
};

export const Search: Story = {
  args: {
    variant: 'search',
    placeholder: 'Search items...',
    clearable: true,
  },
};

// Size variants
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <DynInput size="sm" placeholder="Small input" clearable />
      <DynInput size="md" placeholder="Medium input" clearable />
      <DynInput size="lg" placeholder="Large input" clearable />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available input sizes using design token system.'
      }
    }
  }
};

// States
export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <DynInput placeholder="Normal state" clearable />
      <DynInput error placeholder="Error state" clearable />
      <DynInput disabled placeholder="Disabled state" value="Disabled input" />
      <DynInput readOnly value="Read-only input" />
      <DynInput value="Focused input" autoFocus />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different input states: normal, error, disabled, read-only, and focused.'
      }
    }
  }
};

// With field container
export const WithFieldContainer: Story = {
  render: () => {
    const [value, setValue] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <DynFieldContainer
          label="Full Name"
          helpText="Enter your first and last name"
          required
        >
          <DynInput
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="John Doe"
            clearable
          />
        </DynFieldContainer>
        
        <DynFieldContainer
          label="Email Address"
          errorText={email && !email.includes('@') ? 'Please enter a valid email' : undefined}
          required
        >
          <DynInput
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="john@example.com"
            error={email && !email.includes('@')}
            clearable
          />
        </DynFieldContainer>
        
        <DynFieldContainer
          label="Password"
          helpText="Must be at least 8 characters"
          required
        >
          <DynInput
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            error={password.length > 0 && password.length < 8}
          />
        </DynFieldContainer>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Inputs used within field containers for complete form experiences with labels, help text, validation, and error states.'
      }
    }
  }
};

// Controlled vs Uncontrolled
export const ControlledVsUncontrolled: Story = {
  render: () => {
    const [controlledValue, setControlledValue] = useState('Controlled input');
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <label>Controlled Input:</label>
          <DynInput
            value={controlledValue}
            onChange={(e) => setControlledValue(e.target.value)}
            clearable
          />
          <small>Value: {controlledValue}</small>
        </div>
        
        <div>
          <label>Uncontrolled Input:</label>
          <DynInput
            defaultValue="Uncontrolled input"
            onChange={(e) => console.log('Changed:', e.target.value)}
            clearable
          />
          <small>Check console for changes</small>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstration of controlled vs uncontrolled input patterns. Controlled inputs manage state externally, uncontrolled inputs manage their own state.'
      }
    }
  }
};

// Interactive playground
export const Playground: Story = {
  args: {
    variant: 'default',
    size: 'md',
    placeholder: 'Playground input...',
    clearable: true,
    error: false,
    disabled: false,
    readOnly: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground to test different input configurations. Use the controls panel to experiment with props.'
      }
    }
  }
};