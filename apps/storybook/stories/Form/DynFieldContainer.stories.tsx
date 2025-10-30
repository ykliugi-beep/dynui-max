import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import { DynFieldContainer, DynInput, DynSelect, DynTextArea, DynCheckbox, ThemeProvider } from '@dynui-max/core';
import { useState } from 'react';

const meta = {
  title: 'Form/DynFieldContainer',
  component: DynFieldContainer,
  decorators: [
    (Story) => (
      <ThemeProvider defaultTheme="light">
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem' }}>
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
Form field wrapper component that provides consistent labeling, help text, validation states, and accessibility features.

### Features
- Automatic label-field association via htmlFor/id
- Validation state management (default, error, success, warning)
- Required/optional field indicators
- Help text and error message display
- Horizontal and vertical layout orientations
- ARIA attributes for accessibility
- Custom field integration support
        `
      }
    }
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Field label text'
    },
    htmlFor: {
      control: 'text',
      description: 'ID of the associated form control'
    },
    required: {
      control: 'boolean',
      description: 'Mark field as required'
    },
    helpText: {
      control: 'text',
      description: 'Help text displayed below the field'
    },
    error: {
      control: 'text',
      description: 'Error message (overrides helpText when present)'
    },
    state: {
      control: 'select',
      options: ['default', 'error', 'success', 'warning'],
      description: 'Visual state of the field'
    },
    orientation: {
      control: 'select',
      options: ['vertical', 'horizontal'],
      description: 'Layout orientation'
    },
    hintIcon: {
      control: 'boolean',
      description: 'Show hint icon next to label',
      mapping: {
        true: <span style={{ marginLeft: '0.25rem', opacity: 0.6 }}>ℹ️</span>,
        false: undefined
      }
    }
  },
} satisfies Meta<typeof DynFieldContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

// Overview - Basic field container with input
export const Overview: Story = {
  args: {
    label: 'Email Address',
    htmlFor: 'email-basic',
    helpText: 'Enter your email address to receive notifications',
    children: (
      <DynInput 
        id="email-basic"
        type="email"
        placeholder="john@example.com"
      />
    )
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    
    // Check label-field association
    const label = canvas.getByText(args.label!);
    const input = canvas.getByRole('textbox');
    
    await expect(label).toBeInTheDocument();
    await expect(input).toBeInTheDocument();
    
    // Check help text
    if (args.helpText) {
      const helpText = canvas.getByText(args.helpText);
      await expect(helpText).toBeInTheDocument();
    }
    
    // Test focus behavior
    await userEvent.click(label);
    await expect(input).toHaveFocus();
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic field container with label, input, and help text. Label automatically associates with the input field.'
      }
    }
  }
};

// Validation States - Show all state variants
export const ValidationStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <DynFieldContainer
        label="Default State"
        htmlFor="input-default"
        helpText="This field is in its default state"
        state="default"
      >
        <DynInput id="input-default" placeholder="Enter some text..." />
      </DynFieldContainer>
      
      <DynFieldContainer
        label="Success State"
        htmlFor="input-success"
        helpText="Great! This input is valid"
        state="success"
      >
        <DynInput id="input-success" defaultValue="valid@example.com" />
      </DynFieldContainer>
      
      <DynFieldContainer
        label="Warning State"
        htmlFor="input-warning"
        helpText="This email domain is uncommon. Please double-check."
        state="warning"
      >
        <DynInput id="input-warning" defaultValue="user@raredomian.xyz" />
      </DynFieldContainer>
      
      <DynFieldContainer
        label="Error State"
        htmlFor="input-error"
        error="Please enter a valid email address"
        state="error"
      >
        <DynInput id="input-error" defaultValue="invalid-email" />
      </DynFieldContainer>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Check all states are rendered
    await expect(canvas.getByText('Default State')).toBeInTheDocument();
    await expect(canvas.getByText('Success State')).toBeInTheDocument();
    await expect(canvas.getByText('Warning State')).toBeInTheDocument();
    await expect(canvas.getByText('Error State')).toBeInTheDocument();
    
    // Check error message overrides help text
    await expect(canvas.getByText('Please enter a valid email address')).toBeInTheDocument();
    
    // Test ARIA attributes for error state
    const errorInput = canvas.getByDisplayValue('invalid-email');
    await expect(errorInput).toHaveAttribute('aria-invalid', 'true');
  },
  parameters: {
    docs: {
      description: {
        story: 'All validation states: default, success, warning, and error. Error messages override help text when present.'
      }
    }
  }
};

// Required and Optional - Field requirement indicators
export const RequiredAndOptional: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      company: ''
    });
    
    const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData(prev => ({ ...prev, [field]: e.target.value }));
    };
    
    return (
      <form onSubmit={(e) => { e.preventDefault(); alert('Form submitted!'); }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <DynFieldContainer
            label="First Name"
            htmlFor="firstName"
            required
            helpText="Your legal first name"
          >
            <DynInput 
              id="firstName"
              value={formData.firstName}
              onChange={handleInputChange('firstName')}
              placeholder="John"
              required
            />
          </DynFieldContainer>
          
          <DynFieldContainer
            label="Last Name"
            htmlFor="lastName"
            required
            helpText="Your legal last name"
          >
            <DynInput 
              id="lastName"
              value={formData.lastName}
              onChange={handleInputChange('lastName')}
              placeholder="Doe"
              required
            />
          </DynFieldContainer>
          
          <DynFieldContainer
            label="Email Address"
            htmlFor="email"
            required
            helpText="We'll use this to contact you"
          >
            <DynInput 
              id="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange('email')}
              placeholder="john@example.com"
              required
            />
          </DynFieldContainer>
          
          <DynFieldContainer
            label="Phone Number"
            htmlFor="phone"
            helpText="Optional - for urgent communications only"
          >
            <DynInput 
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={handleInputChange('phone')}
              placeholder="+1 (555) 123-4567"
            />
          </DynFieldContainer>
          
          <DynFieldContainer
            label="Company"
            htmlFor="company"
            helpText="Optional - your current employer"
          >
            <DynInput 
              id="company"
              value={formData.company}
              onChange={handleInputChange('company')}
              placeholder="Acme Corp"
            />
          </DynFieldContainer>
          
          <div style={{ marginTop: '1rem' }}>
            <button 
              type="submit"
              style={{
                padding: '0.75rem 2rem',
                background: 'var(--color-primary)',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '1rem',
                cursor: 'pointer'
              }}
            >
              Submit Form
            </button>
          </div>
        </div>
      </form>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Check required field indicators are present
    const requiredLabels = canvas.getAllByText(/\*/); // Assuming asterisk for required
    await expect(requiredLabels.length).toBeGreaterThan(0);
    
    // Test form submission with empty required fields
    const submitButton = canvas.getByRole('button', { name: /submit/i });
    await userEvent.click(submitButton);
    
    // Fill out required fields and test successful submission
    const firstNameInput = canvas.getByPlaceholderText('John');
    const lastNameInput = canvas.getByPlaceholderText('Doe');
    const emailInput = canvas.getByPlaceholderText('john@example.com');
    
    await userEvent.type(firstNameInput, 'John');
    await userEvent.type(lastNameInput, 'Doe');
    await userEvent.type(emailInput, 'john@example.com');
    
    // Optional field should work without being required
    const phoneInput = canvas.getByPlaceholderText('+1 (555) 123-4567');
    await userEvent.type(phoneInput, '555-123-4567');
  },
  parameters: {
    docs: {
      description: {
        story: 'Form with required and optional fields. Required fields show visual indicators and validation, while optional fields provide additional context.'
      }
    }
  }
};

// Horizontal Layout - Alternative orientation
export const HorizontalLayout: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <DynFieldContainer
        label="Full Name"
        htmlFor="fullname-horizontal"
        orientation="horizontal"
        helpText="Enter your first and last name"
      >
        <DynInput id="fullname-horizontal" placeholder="John Doe" />
      </DynFieldContainer>
      
      <DynFieldContainer
        label="Account Type"
        htmlFor="account-type"
        orientation="horizontal"
        helpText="Choose your account level"
      >
        <DynSelect id="account-type">
          <option value="basic">Basic</option>
          <option value="premium">Premium</option>
          <option value="enterprise">Enterprise</option>
        </DynSelect>
      </DynFieldContainer>
      
      <DynFieldContainer
        label="Newsletter"
        htmlFor="newsletter-horizontal"
        orientation="horizontal"
        helpText="Subscribe to our weekly updates"
      >
        <DynCheckbox id="newsletter-horizontal" label="Yes, send me newsletters" />
      </DynFieldContainer>
      
      <DynFieldContainer
        label="Bio"
        htmlFor="bio-horizontal"
        orientation="horizontal"
        helpText="Tell us about yourself (optional)"
      >
        <DynTextArea 
          id="bio-horizontal" 
          placeholder="I'm a developer who loves building great user experiences..."
          rows={3}
        />
      </DynFieldContainer>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Horizontal layout orientation where labels appear alongside fields. Useful for compact forms or dashboard settings.'
      }
    }
  }
};

// With Custom Field - Integration with various input types
export const WithCustomField: Story = {
  render: () => {
    const [rating, setRating] = useState(3);
    const [tags, setTags] = useState(['react', 'typescript']);
    
    const StarRating = ({ value, onChange, id }: { value: number; onChange: (value: number) => void; id: string }) => (
      <div id={id} role="radiogroup" aria-label="Rating" style={{ display: 'flex', gap: '0.25rem' }}>
        {[1, 2, 3, 4, 5].map(star => (
          <button
            key={star}
            type="button"
            role="radio"
            aria-checked={star <= value}
            onClick={() => onChange(star)}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '1.5rem',
              cursor: 'pointer',
              color: star <= value ? '#ffd700' : '#ddd',
              padding: '0.25rem'
            }}
          >
            ★
          </button>
        ))}
      </div>
    );
    
    const TagInput = ({ value, onChange, id }: { value: string[]; onChange: (value: string[]) => void; id: string }) => {
      const [inputValue, setInputValue] = useState('');
      
      const addTag = () => {
        if (inputValue.trim() && !value.includes(inputValue.trim())) {
          onChange([...value, inputValue.trim()]);
          setInputValue('');
        }
      };
      
      const removeTag = (tagToRemove: string) => {
        onChange(value.filter(tag => tag !== tagToRemove));
      };
      
      return (
        <div id={id}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
            {value.map(tag => (
              <span 
                key={tag}
                style={{
                  background: 'var(--color-primary)',
                  color: 'white',
                  padding: '0.25rem 0.5rem',
                  borderRadius: '12px',
                  fontSize: '0.875rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem'
                }}
              >
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'white',
                    cursor: 'pointer',
                    padding: 0,
                    fontSize: '0.75rem'
                  }}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
              placeholder="Add a tag..."
              style={{
                flex: 1,
                padding: '0.5rem',
                border: '1px solid var(--color-border-primary)',
                borderRadius: '4px'
              }}
            />
            <button
              type="button"
              onClick={addTag}
              style={{
                padding: '0.5rem 1rem',
                background: 'var(--color-secondary)',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Add
            </button>
          </div>
        </div>
      );
    };
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <DynFieldContainer
          label="Product Rating"
          htmlFor="rating-field"
          helpText="Rate this product from 1 to 5 stars"
          hintIcon={<span style={{ marginLeft: '0.25rem', opacity: 0.6 }}>ℹ️</span>}
        >
          <StarRating 
            id="rating-field"
            value={rating}
            onChange={setRating}
          />
        </DynFieldContainer>
        
        <DynFieldContainer
          label="Skills & Technologies"
          htmlFor="tags-field"
          helpText="Add relevant tags (press Enter or click Add)"
          required
        >
          <TagInput 
            id="tags-field"
            value={tags}
            onChange={setTags}
          />
        </DynFieldContainer>
        
        <DynFieldContainer
          label="Color Preference"
          htmlFor="color-field"
          helpText="Choose your favorite color"
        >
          <input
            id="color-field"
            type="color"
            defaultValue="#3b82f6"
            style={{
              width: '60px',
              height: '40px',
              border: '1px solid var(--color-border-primary)',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          />
        </DynFieldContainer>
        
        <DynFieldContainer
          label="Profile Picture"
          htmlFor="file-field"
          helpText="Upload a JPG or PNG file (max 5MB)"
          state="default"
        >
          <input
            id="file-field"
            type="file"
            accept="image/jpeg,image/png"
            style={{
              padding: '0.5rem',
              border: '1px solid var(--color-border-primary)',
              borderRadius: '4px',
              width: '100%'
            }}
          />
        </DynFieldContainer>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Test star rating interaction
    const starButtons = canvas.getAllByRole('radio');
    await expect(starButtons).toHaveLength(5);
    
    // Click on 4th star
    await userEvent.click(starButtons[3]);
    await expect(starButtons[3]).toHaveAttribute('aria-checked', 'true');
    
    // Test tag input
    const tagInput = canvas.getByPlaceholderText('Add a tag...');
    await userEvent.type(tagInput, 'javascript');
    
    const addButton = canvas.getByRole('button', { name: /add/i });
    await userEvent.click(addButton);
    
    // Check tag was added
    await expect(canvas.getByText('javascript')).toBeInTheDocument();
    
    // Test file input
    const fileInput = canvas.getByRole('textbox', { name: /profile picture/i }) ||
                     document.querySelector('input[type="file"]');
    await expect(fileInput).toBeInTheDocument();
  },
  parameters: {
    docs: {
      description: {
        story: 'Integration with custom form controls: star rating, tag input, color picker, and file upload. Shows how DynFieldContainer works with any form element.'
      }
    }
  }
};

// Error Handling - Dynamic validation
export const ErrorHandling: Story = {
  render: () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState<{[key: string]: string}>({});
    
    const validateEmail = (value: string) => {
      if (!value) return 'Email is required';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email address';
      return '';
    };
    
    const validatePassword = (value: string) => {
      if (!value) return 'Password is required';
      if (value.length < 8) return 'Password must be at least 8 characters';
      if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) return 'Password must contain uppercase, lowercase, and numbers';
      return '';
    };
    
    const validateConfirmPassword = (value: string, password: string) => {
      if (!value) return 'Please confirm your password';
      if (value !== password) return 'Passwords do not match';
      return '';
    };
    
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setEmail(value);
      const error = validateEmail(value);
      setErrors(prev => ({ ...prev, email: error }));
    };
    
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setPassword(value);
      const error = validatePassword(value);
      setErrors(prev => ({ ...prev, password: error }));
      
      // Re-validate confirm password when password changes
      if (confirmPassword) {
        const confirmError = validateConfirmPassword(confirmPassword, value);
        setErrors(prev => ({ ...prev, confirmPassword: confirmError }));
      }
    };
    
    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setConfirmPassword(value);
      const error = validateConfirmPassword(value, password);
      setErrors(prev => ({ ...prev, confirmPassword: error }));
    };
    
    return (
      <form onSubmit={(e) => { e.preventDefault(); alert('Account created!'); }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <DynFieldContainer
            label="Email Address"
            htmlFor="signup-email"
            required
            error={errors.email}
            state={errors.email ? 'error' : email && !errors.email ? 'success' : 'default'}
          >
            <DynInput 
              id="signup-email"
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter your email"
              aria-invalid={!!errors.email}
            />
          </DynFieldContainer>
          
          <DynFieldContainer
            label="Password"
            htmlFor="signup-password"
            required
            error={errors.password}
            helpText={!errors.password ? 'Must be 8+ characters with uppercase, lowercase, and numbers' : undefined}
            state={errors.password ? 'error' : password && !errors.password ? 'success' : 'default'}
          >
            <DynInput 
              id="signup-password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Create a strong password"
              aria-invalid={!!errors.password}
            />
          </DynFieldContainer>
          
          <DynFieldContainer
            label="Confirm Password"
            htmlFor="confirm-password"
            required
            error={errors.confirmPassword}
            state={errors.confirmPassword ? 'error' : confirmPassword && !errors.confirmPassword ? 'success' : 'default'}
          >
            <DynInput 
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              placeholder="Confirm your password"
              aria-invalid={!!errors.confirmPassword}
            />
          </DynFieldContainer>
          
          <button 
            type="submit"
            disabled={!email || !password || !confirmPassword || Object.values(errors).some(error => error)}
            style={{
              padding: '0.75rem 2rem',
              background: Object.values(errors).some(error => error) ? '#ccc' : 'var(--color-primary)',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '1rem',
              cursor: Object.values(errors).some(error => error) ? 'not-allowed' : 'pointer',
              marginTop: '1rem'
            }}
          >
            Create Account
          </button>
        </div>
      </form>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Test email validation
    const emailInput = canvas.getByPlaceholderText('Enter your email');
    await userEvent.type(emailInput, 'invalid-email');
    await userEvent.tab(); // Trigger blur
    
    // Should show email error
    await expect(canvas.getByText('Please enter a valid email address')).toBeInTheDocument();
    
    // Fix email
    await userEvent.clear(emailInput);
    await userEvent.type(emailInput, 'user@example.com');
    
    // Test password validation
    const passwordInput = canvas.getByPlaceholderText('Create a strong password');
    await userEvent.type(passwordInput, 'weak');
    await userEvent.tab();
    
    // Should show password error
    await expect(canvas.getByText('Password must be at least 8 characters')).toBeInTheDocument();
    
    // Fix password
    await userEvent.clear(passwordInput);
    await userEvent.type(passwordInput, 'StrongPass123');
    
    // Test confirm password
    const confirmInput = canvas.getByPlaceholderText('Confirm your password');
    await userEvent.type(confirmInput, 'DifferentPass123');
    await userEvent.tab();
    
    // Should show mismatch error
    await expect(canvas.getByText('Passwords do not match')).toBeInTheDocument();
    
    // Fix confirm password
    await userEvent.clear(confirmInput);
    await userEvent.type(confirmInput, 'StrongPass123');
    
    // Submit button should now be enabled
    const submitButton = canvas.getByRole('button', { name: /create account/i });
    await expect(submitButton).not.toBeDisabled();
  },
  parameters: {
    docs: {
      description: {
        story: 'Dynamic form validation with real-time error handling. Shows how field containers adapt to validation states and provide user feedback.'
      }
    }
  }
};

// Playground - Interactive testing
export const Playground: Story = {
  args: {
    label: 'Sample Field',
    htmlFor: 'playground-field',
    required: false,
    helpText: 'This is a help text that explains the field',
    error: '',
    state: 'default',
    orientation: 'vertical',
    hintIcon: false,
    children: (
      <DynInput 
        id="playground-field"
        placeholder="Enter some text..."
      />
    )
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    
    // Verify basic functionality
    const label = canvas.getByText(args.label!);
    const input = canvas.getByRole('textbox');
    
    await expect(label).toBeInTheDocument();
    await expect(input).toBeInTheDocument();
    
    // Test label click focuses input
    await userEvent.click(label);
    await expect(input).toHaveFocus();
    
    // Test typing
    await userEvent.type(input, 'Test input');
    await expect(input).toHaveValue('Test input');
    
    // Check error state if error is provided
    if (args.error) {
      await expect(canvas.getByText(args.error)).toBeInTheDocument();
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground for testing different field container configurations. Use the controls panel to experiment with various props.'
      }
    }
  }
};