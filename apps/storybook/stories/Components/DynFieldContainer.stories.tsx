import type { Meta, StoryObj } from '@storybook/react';
import { DynFieldContainer } from '@dynui-max/core/ui/dyn-field-container';
import '@dynui-max/design-tokens/dist/tokens.css';

const meta: Meta<typeof DynFieldContainer> = {
  title: 'Components/DynFieldContainer',
  component: DynFieldContainer,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A wrapper component for form fields providing consistent labels, descriptions, errors, and hints.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default with input
export const Default: Story = {
  args: {
    label: 'Email Address',
    children: <input type="email" placeholder="your@email.com" />,
  },
};

// With description
export const WithDescription: Story = {
  args: {
    label: 'Password',
    description: 'Must be at least 8 characters',
    children: <input type="password" placeholder="Enter password" />,
  },
};

// Required field
export const Required: Story = {
  args: {
    label: 'Username',
    required: true,
    children: <input type="text" placeholder="Choose a username" />,
  },
};

// With hint
export const WithHint: Story = {
  args: {
    label: 'Phone Number',
    hint: 'Include country code (e.g., +1)',
    children: <input type="tel" placeholder="+1 (555) 123-4567" />,
  },
};

// With error
export const WithError: Story = {
  args: {
    label: 'Email Address',
    error: 'Please enter a valid email address',
    children: <input type="email" placeholder="your@email.com" defaultValue="invalid-email" />,
  },
};

// With error and description
export const ErrorWithDescription: Story = {
  args: {
    label: 'URL',
    description: 'The website URL for your profile',
    error: 'URL must start with http:// or https://',
    children: <input type="url" placeholder="https://example.com" />,
  },
};

// Small size
export const Small: Story = {
  args: {
    label: 'Name',
    size: 'sm',
    children: <input type="text" placeholder="Enter your name" />,
  },
};

// Large size
export const Large: Story = {
  args: {
    label: 'Bio',
    size: 'lg',
    children: <textarea placeholder="Tell us about yourself" rows={4} />,
  },
};

// Disabled state
export const Disabled: Story = {
  args: {
    label: 'Account ID',
    disabled: true,
    hint: 'This field is automatically generated',
    children: <input type="text" value="ACC-12345" />,
  },
};

// With select
export const WithSelect: Story = {
  args: {
    label: 'Country',
    required: true,
    description: 'Select your country of residence',
    children: (
      <select defaultValue="">
        <option value="">-- Choose a country --</option>
        <option value="us">United States</option>
        <option value="uk">United Kingdom</option>
        <option value="ca">Canada</option>
        <option value="au">Australia</option>
      </select>
    ),
  },
};

// With textarea
export const WithTextarea: Story = {
  args: {
    label: 'Message',
    description: 'Share your feedback with us',
    hint: 'Maximum 500 characters',
    children: <textarea placeholder="Type your message here..." rows={5} />,
  },
};

// Complete form example
function CompleteForm() {
  return (
    <form style={{ maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <DynFieldContainer
        label="Full Name"
        required
        fieldId="name"
      >
        <input type="text" placeholder="John Doe" />
      </DynFieldContainer>

      <DynFieldContainer
        label="Email"
        required
        description="We'll never share your email"
        fieldId="email"
      >
        <input type="email" placeholder="john@example.com" />
      </DynFieldContainer>

      <DynFieldContainer
        label="Password"
        required
        description="Minimum 8 characters"
        hint="Use uppercase, lowercase, numbers, and symbols"
        fieldId="password"
      >
        <input type="password" placeholder="••••••••" />
      </DynFieldContainer>

      <DynFieldContainer
        label="Country"
        description="Select your country"
        fieldId="country"
      >
        <select>
          <option>-- Select --</option>
          <option>United States</option>
          <option>United Kingdom</option>
        </select>
      </DynFieldContainer>

      <button
        type="submit"
        style={{
          padding: '0.5rem 1rem',
          backgroundColor: 'var(--dyn-color-primary-500)',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          fontWeight: '500',
        }}
      >
        Sign Up
      </button>
    </form>
  );
}

export const CompleteExample: Story = {
  render: () => <CompleteForm />,
};

// Accessibility test
export const Accessibility: Story = {
  args: {
    label: 'Search Query',
    required: true,
    hint: 'Enter keywords to search',
    fieldId: 'search-input',
    children: <input type="search" placeholder="Search..." />,
  },
  parameters: {
    a11y: {
      run: true,
    },
  },
};
