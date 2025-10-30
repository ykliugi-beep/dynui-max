import type { Meta, StoryObj } from '@storybook/react';
import { DynSelect, ThemeProvider, DynFieldContainer } from '@dynui-max/core';
import { useState } from 'react';

const sampleOptions = [
  { value: 'react', label: 'React', description: 'A JavaScript library for building UIs' },
  { value: 'vue', label: 'Vue.js', description: 'The Progressive JavaScript Framework' },
  { value: 'angular', label: 'Angular', description: 'Platform for building mobile and desktop apps' },
  { value: 'svelte', label: 'Svelte', description: 'Cybernetically enhanced web apps' },
  { value: 'solid', label: 'SolidJS', description: 'Simple and performant reactivity' },
];

const meta = {
  title: 'Form/DynSelect',
  component: DynSelect,
  decorators: [
    (Story) => (
      <ThemeProvider defaultTheme="light">
        <div style={{ maxWidth: '400px', margin: '0 auto', minHeight: '300px' }}>
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
Advanced dropdown select component with search, multi-selection, and keyboard navigation.

### Features
- Single and multiple selection modes
- Search/filter functionality
- Keyboard navigation (Arrow keys, Enter, Escape)
- Custom option rendering with icons and descriptions
- Loading and empty states
- Controlled and uncontrolled patterns
- WCAG 2.1 AA compliant
- Portal rendering for proper z-index handling
        `
      }
    }
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    searchable: {
      control: 'boolean',
    },
    multiple: {
      control: 'boolean', 
    },
    clearable: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    loading: {
      control: 'boolean',
    },
    placeholder: {
      control: 'text',
    },
  },
} satisfies Meta<typeof DynSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic single select
export const SingleSelect: Story = {
  args: {
    options: sampleOptions,
    placeholder: 'Choose a framework...',
    searchable: false,
    clearable: true,
  },
};

// Searchable select
export const SearchableSelect: Story = {
  args: {
    options: sampleOptions,
    placeholder: 'Search frameworks...',
    searchable: true,
    clearable: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Select with search functionality. Type to filter options in real-time.'
      }
    }
  }
};

// Multiple selection
export const MultipleSelect: Story = {
  args: {
    options: sampleOptions,
    placeholder: 'Choose multiple frameworks...',
    multiple: true,
    searchable: true,
    clearable: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Multi-select with search. Selected items show as chips. Supports keyboard navigation and bulk operations.'
      }
    }
  }
};

// Size variants
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <DynSelect size="sm" options={sampleOptions.slice(0, 3)} placeholder="Small select" />
      <DynSelect size="md" options={sampleOptions.slice(0, 3)} placeholder="Medium select" />
      <DynSelect size="lg" options={sampleOptions.slice(0, 3)} placeholder="Large select" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available select sizes using design token system.'
      }
    }
  }
};

// States
export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <DynSelect options={sampleOptions.slice(0, 3)} placeholder="Normal state" />
      <DynSelect options={sampleOptions.slice(0, 3)} disabled placeholder="Disabled state" />
      <DynSelect options={[]} placeholder="No options" />
      <DynSelect options={sampleOptions.slice(0, 3)} loading placeholder="Loading state" />
      <DynSelect 
        options={sampleOptions.slice(0, 3)} 
        value="react" 
        placeholder="With default value"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different select states: normal, disabled, empty, loading, and with default value.'
      }
    }
  }
};

// With field container and validation
export const WithValidation: Story = {
  render: () => {
    const [singleValue, setSingleValue] = useState('');
    const [multiValue, setMultiValue] = useState<string[]>([]);
    
    const hasError = singleValue === 'vue'; // Simulate validation error
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <DynFieldContainer
          label="Preferred Framework"
          helpText="Select your preferred frontend framework"
          errorText={hasError ? 'Vue.js is not allowed in this project' : undefined}
          required
        >
          <DynSelect
            options={sampleOptions}
            value={singleValue}
            onChange={setSingleValue}
            placeholder="Choose framework..."
            searchable
            clearable
            error={hasError}
          />
        </DynFieldContainer>
        
        <DynFieldContainer
          label="Tech Stack"
          helpText={`Selected: ${multiValue.length} framework${multiValue.length !== 1 ? 's' : ''}`}
          optional
        >
          <DynSelect
            options={sampleOptions}
            value={multiValue}
            onChange={setMultiValue}
            placeholder="Choose multiple frameworks..."
            multiple
            searchable
            clearable
          />
        </DynFieldContainer>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Select components integrated with field containers for complete form experiences with labels, help text, validation, and error handling.'
      }
    }
  }
};

// Interactive playground
export const Playground: Story = {
  args: {
    options: sampleOptions,
    variant: 'default',
    size: 'md',
    placeholder: 'Select an option...',
    searchable: true,
    clearable: true,
    multiple: false,
    disabled: false,
    loading: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground to test different select configurations. Use the controls panel to experiment with props.'
      }
    }
  }
};