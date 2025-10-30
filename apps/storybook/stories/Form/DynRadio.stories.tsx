import type { Meta, StoryObj } from '@storybook/vue3';
import { userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import DynRadio from '@dynui-max/core/components/Form/DynRadio.vue';

const meta = {
  title: 'Form/DynRadio',
  component: DynRadio,
  parameters: {
    docs: {
      description: {
        component: 'Radio button komponenta za izbor jedne opcije iz grupe sa podrškom za validaciju i accessibility.'
      }
    }
  },
  argTypes: {
    modelValue: { control: 'text' },
    value: { control: 'text' },
    name: { control: 'text' },
    label: { control: 'text' },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    error: { control: 'text' },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg']
    }
  }
} satisfies Meta<typeof DynRadio>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Stories
export const Default: Story = {
  args: {
    label: 'Radio option',
    value: 'option1',
    name: 'example'
  }
};

export const Selected: Story = {
  args: {
    label: 'Selected radio',
    value: 'selected',
    modelValue: 'selected',
    name: 'example'
  }
};

// Size Variations
export const SmallSize: Story = {
  args: {
    label: 'Small radio button',
    value: 'small',
    size: 'sm',
    name: 'size-example'
  }
};

export const MediumSize: Story = {
  args: {
    label: 'Medium radio button (default)',
    value: 'medium',
    size: 'md',
    name: 'size-example'
  }
};

export const LargeSize: Story = {
  args: {
    label: 'Large radio button',
    value: 'large',
    size: 'lg',
    name: 'size-example'
  }
};

// Disabled States
export const Disabled: Story = {
  args: {
    label: 'Disabled radio button',
    value: 'disabled',
    disabled: true,
    name: 'disabled-example'
  }
};

export const DisabledSelected: Story = {
  args: {
    label: 'Disabled selected radio',
    value: 'disabled-selected',
    modelValue: 'disabled-selected',
    disabled: true,
    name: 'disabled-example'
  }
};

// Radio Group Example
export const RadioGroup: Story = {
  render: () => ({
    components: { DynRadio },
    template: `
      <div class="radio-group">
        <h3>Izaberite opciju plaćanja:</h3>
        <fieldset style="border: 1px solid #ddd; padding: 1rem; margin: 1rem 0;">
          <legend>Payment Method</legend>
          <div style="display: flex; flex-direction: column; gap: 0.75rem;">
            <DynRadio 
              v-model="selectedPayment" 
              value="credit-card" 
              name="payment" 
              label="Credit Card"
            />
            <DynRadio 
              v-model="selectedPayment" 
              value="paypal" 
              name="payment" 
              label="PayPal"
            />
            <DynRadio 
              v-model="selectedPayment" 
              value="bank-transfer" 
              name="payment" 
              label="Bank Transfer"
            />
            <DynRadio 
              v-model="selectedPayment" 
              value="crypto" 
              name="payment" 
              label="Cryptocurrency"
            />
          </div>
        </fieldset>
        
        <div v-if="selectedPayment" class="selected-payment" style="padding: 1rem; background: #f0f8ff; border-radius: 4px; margin-top: 1rem;">
          <strong>Selected payment method:</strong> {{ getPaymentLabel(selectedPayment) }}
        </div>
      </div>
    `,
    data() {
      return {
        selectedPayment: 'paypal'
      };
    },
    methods: {
      getPaymentLabel(value) {
        const labels = {
          'credit-card': 'Credit Card',
          'paypal': 'PayPal',
          'bank-transfer': 'Bank Transfer',
          'crypto': 'Cryptocurrency'
        };
        return labels[value] || value;
      }
    }
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // PayPal should be pre-selected
    const paypalRadio = canvas.getByLabelText('PayPal');
    await expect(paypalRadio).toBeChecked();
    
    // Select Credit Card
    const creditCardRadio = canvas.getByLabelText('Credit Card');
    await userEvent.click(creditCardRadio);
    
    // Credit Card should be selected, PayPal should be deselected
    await expect(creditCardRadio).toBeChecked();
    await expect(paypalRadio).not.toBeChecked();
    
    // Verify selection display
    await expect(canvas.getByText('Selected payment method: Credit Card')).toBeVisible();
  }
};

// Validation Example
export const WithValidation: Story = {
  render: () => ({
    components: { DynRadio },
    template: `
      <form @submit.prevent="handleSubmit" class="validation-form">
        <h3>Survey Form</h3>
        
        <fieldset style="border: 1px solid #ddd; padding: 1rem; margin: 1rem 0;">
          <legend>How satisfied are you with our service? *</legend>
          <div style="display: flex; flex-direction: column; gap: 0.5rem;">
            <DynRadio 
              v-model="satisfaction" 
              value="very-satisfied" 
              name="satisfaction" 
              label="Very Satisfied"
              :error="errors.satisfaction"
            />
            <DynRadio 
              v-model="satisfaction" 
              value="satisfied" 
              name="satisfaction" 
              label="Satisfied"
              :error="errors.satisfaction"
            />
            <DynRadio 
              v-model="satisfaction" 
              value="neutral" 
              name="satisfaction" 
              label="Neutral"
              :error="errors.satisfaction"
            />
            <DynRadio 
              v-model="satisfaction" 
              value="dissatisfied" 
              name="satisfaction" 
              label="Dissatisfied"
              :error="errors.satisfaction"
            />
            <DynRadio 
              v-model="satisfaction" 
              value="very-dissatisfied" 
              name="satisfaction" 
              label="Very Dissatisfied"
              :error="errors.satisfaction"
            />
          </div>
          <div v-if="errors.satisfaction" style="color: red; font-size: 0.875rem; margin-top: 0.5rem;">
            {{ errors.satisfaction }}
          </div>
        </fieldset>
        
        <button type="submit" style="padding: 0.5rem 1rem;">Submit Survey</button>
        
        <div v-if="submitted" class="success-message" style="color: green; margin-top: 1rem;">
          Thank you for your feedback! You selected: {{ getSatisfactionLabel(satisfaction) }}
        </div>
      </form>
    `,
    data() {
      return {
        satisfaction: '',
        errors: {
          satisfaction: ''
        },
        submitted: false
      };
    },
    methods: {
      handleSubmit() {
        this.errors.satisfaction = this.satisfaction ? '' : 'Please select your satisfaction level';
        
        if (this.satisfaction) {
          this.submitted = true;
        }
      },
      getSatisfactionLabel(value) {
        const labels = {
          'very-satisfied': 'Very Satisfied',
          'satisfied': 'Satisfied',
          'neutral': 'Neutral',
          'dissatisfied': 'Dissatisfied',
          'very-dissatisfied': 'Very Dissatisfied'
        };
        return labels[value] || value;
      }
    }
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const submitButton = canvas.getByRole('button', { name: /submit survey/i });
    
    // Try to submit without selecting anything
    await userEvent.click(submitButton);
    
    // Should show validation error
    await expect(canvas.getByText('Please select your satisfaction level')).toBeVisible();
    
    // Select an option
    const satisfiedRadio = canvas.getByLabelText('Satisfied');
    await userEvent.click(satisfiedRadio);
    
    // Submit again
    await userEvent.click(submitButton);
    
    // Should show success message
    await expect(canvas.getByText('Thank you for your feedback! You selected: Satisfied')).toBeVisible();
  }
};

// Interactive Example
export const InteractiveDemo: Story = {
  render: () => ({
    components: { DynRadio },
    template: `
      <div class="interactive-demo">
        <h3>Theme Selection</h3>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin: 1rem 0;">
          <div class="theme-option" style="border: 2px solid #ddd; padding: 1rem; border-radius: 8px;" :class="{ 'selected': selectedTheme === 'light' }">
            <DynRadio 
              v-model="selectedTheme" 
              value="light" 
              name="theme" 
              label="Light Theme"
            />
            <div class="theme-preview" style="margin-top: 0.5rem; padding: 0.5rem; background: #fff; border: 1px solid #ccc; border-radius: 4px;">
              <div style="font-size: 0.875rem; color: #333;">Clean and bright interface</div>
            </div>
          </div>
          
          <div class="theme-option" style="border: 2px solid #ddd; padding: 1rem; border-radius: 8px;" :class="{ 'selected': selectedTheme === 'dark' }">
            <DynRadio 
              v-model="selectedTheme" 
              value="dark" 
              name="theme" 
              label="Dark Theme"
            />
            <div class="theme-preview" style="margin-top: 0.5rem; padding: 0.5rem; background: #2d3748; color: white; border-radius: 4px;">
              <div style="font-size: 0.875rem;">Easy on the eyes</div>
            </div>
          </div>
          
          <div class="theme-option" style="border: 2px solid #ddd; padding: 1rem; border-radius: 8px;" :class="{ 'selected': selectedTheme === 'auto' }">
            <DynRadio 
              v-model="selectedTheme" 
              value="auto" 
              name="theme" 
              label="Auto Theme"
            />
            <div class="theme-preview" style="margin-top: 0.5rem; padding: 0.5rem; background: linear-gradient(90deg, #fff 50%, #2d3748 50%); border-radius: 4px;">
              <div style="font-size: 0.875rem; color: #333;">Follows system preference</div>
            </div>
          </div>
        </div>
        
        <div class="selection-info" style="padding: 1rem; background: #f7fafc; border-radius: 4px; margin-top: 1rem;">
          <strong>Current selection:</strong> {{ getThemeDescription(selectedTheme) }}
        </div>
      </div>
    `,
    data() {
      return {
        selectedTheme: 'light'
      };
    },
    methods: {
      getThemeDescription(theme) {
        const descriptions = {
          'light': 'Light Theme - Clean and bright interface',
          'dark': 'Dark Theme - Easy on the eyes for night use',
          'auto': 'Auto Theme - Automatically switches based on system preference'
        };
        return descriptions[theme] || 'No theme selected';
      }
    }
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Light theme should be pre-selected
    const lightRadio = canvas.getByLabelText('Light Theme');
    await expect(lightRadio).toBeChecked();
    
    // Switch to dark theme
    const darkRadio = canvas.getByLabelText('Dark Theme');
    await userEvent.click(darkRadio);
    
    // Verify selection changed
    await expect(darkRadio).toBeChecked();
    await expect(lightRadio).not.toBeChecked();
    
    // Verify description updated
    await expect(canvas.getByText(/Dark Theme - Easy on the eyes/)).toBeVisible();
  }
};

// Accessibility Demo
export const AccessibilityDemo: Story = {
  render: () => ({
    components: { DynRadio },
    template: `
      <div class="accessibility-demo">
        <h3>Accessibility Features</h3>
        
        <form>
          <fieldset style="border: 1px solid #ccc; padding: 1rem; margin: 1rem 0;">
            <legend>Preferred contact method</legend>
            
            <div style="display: flex; flex-direction: column; gap: 1rem;">
              <div>
                <DynRadio 
                  v-model="contactMethod" 
                  value="email" 
                  name="contact" 
                  label="Email"
                  aria-describedby="email-help"
                />
                <div id="email-help" class="help-text" style="margin-left: 1.5rem; font-size: 0.875rem; color: #666;">
                  We'll send updates to your email address
                </div>
              </div>
              
              <div>
                <DynRadio 
                  v-model="contactMethod" 
                  value="phone" 
                  name="contact" 
                  label="Phone"
                  aria-describedby="phone-help"
                />
                <div id="phone-help" class="help-text" style="margin-left: 1.5rem; font-size: 0.875rem; color: #666;">
                  We'll call you during business hours
                </div>
              </div>
              
              <div>
                <DynRadio 
                  v-model="contactMethod" 
                  value="sms" 
                  name="contact" 
                  label="SMS"
                  aria-describedby="sms-help"
                />
                <div id="sms-help" class="help-text" style="margin-left: 1.5rem; font-size: 0.875rem; color: #666;">
                  We'll send text messages to your phone
                </div>
              </div>
            </div>
          </fieldset>
        </form>
      </div>
    `,
    data() {
      return {
        contactMethod: 'email'
      };
    }
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Test keyboard navigation
    const firstRadio = canvas.getByLabelText('Email');
    firstRadio.focus();
    await expect(firstRadio).toHaveFocus();
    
    // Test aria-describedby
    await expect(firstRadio).toHaveAttribute('aria-describedby', 'email-help');
    
    // Test fieldset/legend structure
    const fieldset = canvas.getByRole('group');
    await expect(fieldset).toBeVisible();
  }
};

// Error State
export const WithError: Story = {
  args: {
    label: 'Required radio option',
    value: 'required-option',
    name: 'required',
    required: true,
    error: 'This field is required'
  }
};

// Dark Theme
export const DarkTheme: Story = {
  args: {
    label: 'Dark theme radio',
    value: 'dark-option',
    modelValue: 'dark-option',
    name: 'dark-example'
  },
  parameters: {
    backgrounds: { default: 'dark' }
  }
};