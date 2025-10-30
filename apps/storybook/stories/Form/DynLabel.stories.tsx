import type { Meta, StoryObj } from '@storybook/vue3';
import { userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import DynLabel from '@dynui-max/core/components/Form/DynLabel.vue';

const meta = {
  title: 'Form/DynLabel',
  component: DynLabel,
  parameters: {
    docs: {
      description: {
        component: 'Label komponenta za označavanje form elemenata sa podrškom za required/optional indikatore, help tekst i accessibility.'
      }
    }
  },
  argTypes: {
    text: { control: 'text' },
    htmlFor: { control: 'text' },
    required: { control: 'boolean' },
    optional: { control: 'boolean' },
    helpText: { control: 'text' },
    error: { control: 'text' },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg']
    },
    weight: {
      control: { type: 'select' },
      options: ['normal', 'medium', 'semibold', 'bold']
    }
  }
} satisfies Meta<typeof DynLabel>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Stories
export const Default: Story = {
  args: {
    text: 'Basic Label'
  }
};

export const Required: Story = {
  args: {
    text: 'Required Field',
    required: true
  }
};

export const Optional: Story = {
  args: {
    text: 'Optional Field',
    optional: true
  }
};

// With Help Text
export const WithHelpText: Story = {
  args: {
    text: 'Username',
    required: true,
    helpText: 'Must be 3-20 characters long and contain only letters, numbers, and underscores'
  }
};

// Error State
export const WithError: Story = {
  args: {
    text: 'Email Address',
    required: true,
    error: 'Please enter a valid email address'
  }
};

// Size Variations
export const SmallSize: Story = {
  args: {
    text: 'Small Label',
    size: 'sm',
    required: true
  }
};

export const MediumSize: Story = {
  args: {
    text: 'Medium Label (default)',
    size: 'md',
    required: true
  }
};

export const LargeSize: Story = {
  args: {
    text: 'Large Label',
    size: 'lg',
    required: true
  }
};

// Weight Variations
export const NormalWeight: Story = {
  args: {
    text: 'Normal Weight Label',
    weight: 'normal'
  }
};

export const MediumWeight: Story = {
  args: {
    text: 'Medium Weight Label',
    weight: 'medium'
  }
};

export const SemiboldWeight: Story = {
  args: {
    text: 'Semibold Weight Label',
    weight: 'semibold'
  }
};

export const BoldWeight: Story = {
  args: {
    text: 'Bold Weight Label',
    weight: 'bold'
  }
};

// Form Integration Example
export const FormIntegration: Story = {
  render: () => ({
    components: { DynLabel },
    template: `
      <form class="form-example" style="max-width: 400px;">
        <h3>User Registration</h3>
        
        <div class="field-group" style="margin-bottom: 1.5rem;">
          <DynLabel 
            text="Full Name" 
            html-for="fullName" 
            :required="true"
            help-text="Enter your first and last name"
          />
          <input 
            id="fullName" 
            type="text" 
            style="width: 100%; padding: 0.5rem; border: 1px solid #ddd; border-radius: 4px; margin-top: 0.25rem;"
            placeholder="John Doe"
          />
        </div>
        
        <div class="field-group" style="margin-bottom: 1.5rem;">
          <DynLabel 
            text="Email" 
            html-for="email" 
            :required="true"
            help-text="We'll use this to send you important updates"
          />
          <input 
            id="email" 
            type="email" 
            style="width: 100%; padding: 0.5rem; border: 1px solid #ddd; border-radius: 4px; margin-top: 0.25rem;"
            placeholder="john@example.com"
          />
        </div>
        
        <div class="field-group" style="margin-bottom: 1.5rem;">
          <DynLabel 
            text="Phone Number" 
            html-for="phone" 
            :optional="true"
            help-text="Optional - for account recovery purposes"
          />
          <input 
            id="phone" 
            type="tel" 
            style="width: 100%; padding: 0.5rem; border: 1px solid #ddd; border-radius: 4px; margin-top: 0.25rem;"
            placeholder="+1 (555) 123-4567"
          />
        </div>
        
        <div class="field-group" style="margin-bottom: 1.5rem;">
          <DynLabel 
            text="Password" 
            html-for="password" 
            :required="true"
            help-text="Must be at least 8 characters with numbers and symbols"
          />
          <input 
            id="password" 
            type="password" 
            style="width: 100%; padding: 0.5rem; border: 1px solid #ddd; border-radius: 4px; margin-top: 0.25rem;"
            placeholder="••••••••"
          />
        </div>
        
        <button type="submit" style="width: 100%; padding: 0.75rem; background: #007bff; color: white; border: none; border-radius: 4px; font-weight: 500;">
          Create Account
        </button>
      </form>
    `
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Test label association
    const fullNameLabel = canvas.getByText('Full Name');
    const fullNameInput = canvas.getByLabelText('Full Name');
    
    // Click label should focus input
    await userEvent.click(fullNameLabel);
    await expect(fullNameInput).toHaveFocus();
    
    // Test required indicator
    const requiredLabels = canvas.getAllByText('*');
    expect(requiredLabels.length).toBeGreaterThan(0);
    
    // Test optional indicator
    const optionalText = canvas.getByText('(optional)');
    await expect(optionalText).toBeVisible();
  }
};

// Error States Example
export const ErrorStatesExample: Story = {
  render: () => ({
    components: { DynLabel },
    template: `
      <div class="error-states-demo" style="max-width: 400px;">
        <h3>Validation Error States</h3>
        
        <div class="field-group" style="margin-bottom: 1.5rem;">
          <DynLabel 
            text="Email Address" 
            html-for="errorEmail" 
            :required="true"
            error="Please enter a valid email address"
          />
          <input 
            id="errorEmail" 
            type="email" 
            value="invalid-email"
            style="width: 100%; padding: 0.5rem; border: 2px solid #dc3545; border-radius: 4px; margin-top: 0.25rem;"
          />
        </div>
        
        <div class="field-group" style="margin-bottom: 1.5rem;">
          <DynLabel 
            text="Password" 
            html-for="errorPassword" 
            :required="true"
            error="Password must be at least 8 characters long"
          />
          <input 
            id="errorPassword" 
            type="password" 
            value="123"
            style="width: 100%; padding: 0.5rem; border: 2px solid #dc3545; border-radius: 4px; margin-top: 0.25rem;"
          />
        </div>
        
        <div class="field-group" style="margin-bottom: 1.5rem;">
          <DynLabel 
            text="Username" 
            html-for="errorUsername" 
            :required="true"
            error="Username is already taken"
          />
          <input 
            id="errorUsername" 
            type="text" 
            value="admin"
            style="width: 100%; padding: 0.5rem; border: 2px solid #dc3545; border-radius: 4px; margin-top: 0.25rem;"
          />
        </div>
      </div>
    `
  })
};

// Different Label Types
export const LabelTypes: Story = {
  render: () => ({
    components: { DynLabel },
    template: `
      <div class="label-types" style="display: flex; flex-direction: column; gap: 2rem; max-width: 500px;">
        <div>
          <h4>Form Field Labels</h4>
          <div style="display: flex; flex-direction: column; gap: 1rem;">
            <DynLabel text="Standard Field" :required="true" />
            <DynLabel text="Optional Field" :optional="true" />
            <DynLabel text="Field with Help" help-text="Additional guidance for users" />
          </div>
        </div>
        
        <div>
          <h4>Section Headers</h4>
          <div style="display: flex; flex-direction: column; gap: 1rem;">
            <DynLabel text="Personal Information" size="lg" weight="semibold" />
            <DynLabel text="Contact Details" size="md" weight="medium" />
            <DynLabel text="Preferences" size="sm" weight="normal" />
          </div>
        </div>
        
        <div>
          <h4>Status Labels</h4>
          <div style="display: flex; flex-direction: column; gap: 1rem;">
            <DynLabel text="Success State" style="color: #28a745;" />
            <DynLabel text="Warning State" style="color: #ffc107;" />
            <DynLabel text="Error State" error="Something went wrong" />
          </div>
        </div>
      </div>
    `
  })
};

// Accessibility Demo
export const AccessibilityDemo: Story = {
  render: () => ({
    components: { DynLabel },
    template: `
      <div class="accessibility-demo" style="max-width: 500px;">
        <h3>Accessibility Features</h3>
        
        <div class="field-group" style="margin-bottom: 1.5rem;">
          <DynLabel 
            text="Accessible Input" 
            html-for="accessibleInput" 
            :required="true"
            help-text="This field demonstrates proper label association"
          />
          <input 
            id="accessibleInput" 
            type="text" 
            style="width: 100%; padding: 0.5rem; border: 1px solid #ddd; border-radius: 4px; margin-top: 0.25rem;"
            aria-describedby="accessibleInput-help"
          />
        </div>
        
        <div class="field-group" style="margin-bottom: 1.5rem;">
          <DynLabel 
            text="Complex Field" 
            html-for="complexField" 
            :required="true"
            help-text="Multiple ARIA attributes for enhanced accessibility"
          />
          <input 
            id="complexField" 
            type="email" 
            style="width: 100%; padding: 0.5rem; border: 1px solid #ddd; border-radius: 4px; margin-top: 0.25rem;"
            aria-describedby="complexField-help"
            aria-required="true"
            aria-invalid="false"
          />
        </div>
        
        <fieldset style="border: 1px solid #ddd; padding: 1rem; margin: 1rem 0;">
          <DynLabel text="Group Label" size="md" weight="semibold" />
          <div style="margin-top: 0.5rem; display: flex; flex-direction: column; gap: 0.5rem;">
            <label style="display: flex; align-items: center; gap: 0.5rem;">
              <input type="radio" name="group" value="option1" />
              Option 1
            </label>
            <label style="display: flex; align-items: center; gap: 0.5rem;">
              <input type="radio" name="group" value="option2" />
              Option 2
            </label>
          </div>
        </fieldset>
      </div>
    `
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Test label association
    const accessibleInput = canvas.getByLabelText('Accessible Input');
    await expect(accessibleInput).toHaveAttribute('id', 'accessibleInput');
    
    // Test ARIA attributes
    const complexField = canvas.getByLabelText('Complex Field');
    await expect(complexField).toHaveAttribute('aria-required', 'true');
    await expect(complexField).toHaveAttribute('aria-invalid', 'false');
  }
};

// Custom Styling
export const CustomStyling: Story = {
  render: () => ({
    components: { DynLabel },
    template: `
      <div class="custom-styling" style="display: flex; flex-direction: column; gap: 1.5rem; max-width: 400px;">
        <div class="custom-label-1" style="padding: 1rem; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 8px; color: white;">
          <DynLabel 
            text="Premium Feature" 
            :required="true"
            size="lg"
            weight="bold"
            style="color: inherit;"
          />
          <p style="margin: 0.5rem 0 0 0; font-size: 0.875rem; opacity: 0.9;">This label has custom gradient background</p>
        </div>
        
        <div class="custom-label-2" style="border: 2px solid #4299e1; border-radius: 8px; padding: 1rem; background: #ebf8ff;">
          <DynLabel 
            text="Information Field" 
            :optional="true"
            help-text="This field is styled with custom borders and background"
            style="color: #2b6cb0;"
          />
        </div>
        
        <div class="custom-label-3" style="position: relative; padding: 1rem; border-radius: 8px; background: #f7fafc; border-left: 4px solid #48bb78;">
          <DynLabel 
            text="Success Message" 
            weight="semibold"
            style="color: #2f855a;"
          />
          <p style="margin: 0.25rem 0 0 0; color: #68d391; font-size: 0.875rem;">Operation completed successfully</p>
        </div>
      </div>
    `
  })
};

// Dark Theme
export const DarkTheme: Story = {
  args: {
    text: 'Dark Theme Label',
    required: true,
    helpText: 'This label works great in dark mode'
  },
  parameters: {
    backgrounds: { default: 'dark' }
  }
};