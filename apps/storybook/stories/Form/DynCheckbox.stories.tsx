import type { Meta, StoryObj } from '@storybook/vue3';
import { userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import DynCheckbox from '@dynui-max/core/components/Form/DynCheckbox.vue';

const meta = {
  title: 'Form/DynCheckbox',
  component: DynCheckbox,
  parameters: {
    docs: {
      description: {
        component: 'Checkbox komponenta sa podrškom za različita stanja, validaciju i accessibility features.'
      }
    }
  },
  argTypes: {
    modelValue: { control: 'boolean' },
    label: { control: 'text' },
    disabled: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
    required: { control: 'boolean' },
    error: { control: 'text' },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg']
    }
  }
} satisfies Meta<typeof DynCheckbox>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Stories
export const Default: Story = {
  args: {
    label: 'Checkbox label'
  }
};

export const Checked: Story = {
  args: {
    label: 'Checked checkbox',
    modelValue: true
  }
};

export const Unchecked: Story = {
  args: {
    label: 'Unchecked checkbox',
    modelValue: false
  }
};

// Interactive States
export const Interactive: Story = {
  args: {
    label: 'Click me to toggle'
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole('checkbox');
    
    // Initially unchecked
    await expect(checkbox).not.toBeChecked();
    
    // Click to check
    await userEvent.click(checkbox);
    await expect(checkbox).toBeChecked();
    
    // Click again to uncheck
    await userEvent.click(checkbox);
    await expect(checkbox).not.toBeChecked();
  }
};

// Indeterminate State
export const Indeterminate: Story = {
  args: {
    label: 'Indeterminate state',
    indeterminate: true
  }
};

// Sizes
export const SmallSize: Story = {
  args: {
    label: 'Small checkbox',
    size: 'sm'
  }
};

export const MediumSize: Story = {
  args: {
    label: 'Medium checkbox (default)',
    size: 'md'
  }
};

export const LargeSize: Story = {
  args: {
    label: 'Large checkbox',
    size: 'lg'
  }
};

// Disabled States
export const Disabled: Story = {
  args: {
    label: 'Disabled checkbox',
    disabled: true
  }
};

export const DisabledChecked: Story = {
  args: {
    label: 'Disabled checked checkbox',
    modelValue: true,
    disabled: true
  }
};

// Error State
export const WithError: Story = {
  args: {
    label: 'Accept terms and conditions',
    required: true,
    error: 'You must accept the terms and conditions'
  }
};

// Checkbox Groups
export const CheckboxGroup: Story = {
  render: () => ({
    components: { DynCheckbox },
    template: `
      <div class="checkbox-group">
        <h3>Select your interests:</h3>
        <div style="display: flex; flex-direction: column; gap: 0.5rem;">
          <DynCheckbox v-model="interests.tech" label="Technology" />
          <DynCheckbox v-model="interests.design" label="Design" />
          <DynCheckbox v-model="interests.business" label="Business" />
          <DynCheckbox v-model="interests.marketing" label="Marketing" />
        </div>
        
        <div class="selected-interests" v-if="hasSelectedInterests" style="margin-top: 1rem; padding: 1rem; background: #f5f5f5; border-radius: 4px;">
          <strong>Selected:</strong> {{ selectedInterestsList }}
        </div>
      </div>
    `,
    data() {
      return {
        interests: {
          tech: false,
          design: true,
          business: false,
          marketing: false
        }
      };
    },
    computed: {
      hasSelectedInterests() {
        return Object.values(this.interests).some(Boolean);
      },
      selectedInterestsList() {
        const selected = [];
        if (this.interests.tech) selected.push('Technology');
        if (this.interests.design) selected.push('Design');
        if (this.interests.business) selected.push('Business');
        if (this.interests.marketing) selected.push('Marketing');
        return selected.join(', ');
      }
    }
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Design should be pre-selected
    const designCheckbox = canvas.getByLabelText('Design');
    await expect(designCheckbox).toBeChecked();
    
    // Select Technology
    const techCheckbox = canvas.getByLabelText('Technology');
    await userEvent.click(techCheckbox);
    await expect(techCheckbox).toBeChecked();
    
    // Verify selected interests display
    const selectedText = canvas.getByText(/Selected:/);
    await expect(selectedText).toBeVisible();
  }
};

// Select All/None Pattern
export const SelectAllPattern: Story = {
  render: () => ({
    components: { DynCheckbox },
    template: `
      <div class="select-all-pattern">
        <DynCheckbox 
          :model-value="allSelected" 
          :indeterminate="someSelected && !allSelected"
          label="Select All Items"
          @update:model-value="toggleAll"
        />
        
        <div class="items-list" style="margin-left: 1rem; margin-top: 0.5rem; display: flex; flex-direction: column; gap: 0.5rem;">
          <DynCheckbox 
            v-for="item in items" 
            :key="item.id"
            v-model="item.selected" 
            :label="item.name"
            @update:model-value="updateSelection"
          />
        </div>
        
        <div class="summary" style="margin-top: 1rem; font-weight: bold;">
          {{ selectedCount }} of {{ items.length }} items selected
        </div>
      </div>
    `,
    data() {
      return {
        items: [
          { id: 1, name: 'Item 1', selected: false },
          { id: 2, name: 'Item 2', selected: true },
          { id: 3, name: 'Item 3', selected: false },
          { id: 4, name: 'Item 4', selected: false }
        ]
      };
    },
    computed: {
      selectedCount() {
        return this.items.filter(item => item.selected).length;
      },
      allSelected() {
        return this.items.length > 0 && this.selectedCount === this.items.length;
      },
      someSelected() {
        return this.selectedCount > 0;
      }
    },
    methods: {
      toggleAll(value) {
        this.items.forEach(item => {
          item.selected = value;
        });
      },
      updateSelection() {
        // Computed properties will handle the state automatically
      }
    }
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const selectAllCheckbox = canvas.getByLabelText('Select All Items');
    
    // Should be indeterminate initially (1 of 4 selected)
    // Note: In real implementation, you'd check for indeterminate state
    
    // Click to select all
    await userEvent.click(selectAllCheckbox);
    
    // All items should be selected
    const items = canvas.getAllByRole('checkbox');
    for (const item of items) {
      await expect(item).toBeChecked();
    }
    
    // Summary should show all selected
    await expect(canvas.getByText('4 of 4 items selected')).toBeVisible();
  }
};

// Form Validation Example
export const FormValidation: Story = {
  render: () => ({
    components: { DynCheckbox },
    template: `
      <form @submit.prevent="handleSubmit" class="validation-form">
        <h3>Registration Form</h3>
        
        <div style="display: flex; flex-direction: column; gap: 1rem; margin: 1rem 0;">
          <DynCheckbox 
            v-model="agreedToTerms" 
            label="I agree to the Terms and Conditions"
            :required="true"
            :error="errors.terms"
          />
          
          <DynCheckbox 
            v-model="agreedToPrivacy" 
            label="I agree to the Privacy Policy"
            :required="true"
            :error="errors.privacy"
          />
          
          <DynCheckbox 
            v-model="subscribeNewsletter" 
            label="Subscribe to our newsletter (optional)"
          />
        </div>
        
        <button type="submit" :disabled="!canSubmit" style="padding: 0.5rem 1rem; margin-right: 1rem;">
          Register
        </button>
        
        <div v-if="submitted" class="success-message" style="color: green; margin-top: 1rem;">
          Registration successful!
        </div>
      </form>
    `,
    data() {
      return {
        agreedToTerms: false,
        agreedToPrivacy: false,
        subscribeNewsletter: false,
        errors: {
          terms: '',
          privacy: ''
        },
        submitted: false
      };
    },
    computed: {
      canSubmit() {
        return this.agreedToTerms && this.agreedToPrivacy;
      }
    },
    methods: {
      handleSubmit() {
        this.errors.terms = this.agreedToTerms ? '' : 'You must agree to the terms';
        this.errors.privacy = this.agreedToPrivacy ? '' : 'You must agree to the privacy policy';
        
        if (this.canSubmit) {
          this.submitted = true;
        }
      }
    }
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const submitButton = canvas.getByRole('button', { name: /register/i });
    
    // Initially should be disabled
    await expect(submitButton).toBeDisabled();
    
    // Check Terms and Conditions
    const termsCheckbox = canvas.getByLabelText(/Terms and Conditions/);
    await userEvent.click(termsCheckbox);
    
    // Still disabled (need both agreements)
    await expect(submitButton).toBeDisabled();
    
    // Check Privacy Policy
    const privacyCheckbox = canvas.getByLabelText(/Privacy Policy/);
    await userEvent.click(privacyCheckbox);
    
    // Now should be enabled
    await expect(submitButton).toBeEnabled();
    
    // Submit successfully
    await userEvent.click(submitButton);
    await expect(canvas.getByText('Registration successful!')).toBeVisible();
  }
};

// Accessibility Demo
export const AccessibilityDemo: Story = {
  render: () => ({
    components: { DynCheckbox },
    template: `
      <div class="accessibility-demo">
        <h3>Accessibility Features</h3>
        
        <fieldset style="border: 1px solid #ccc; padding: 1rem; margin: 1rem 0;">
          <legend>Notification preferences</legend>
          
          <div style="display: flex; flex-direction: column; gap: 1rem;">
            <div>
              <DynCheckbox 
                v-model="notifications.email" 
                label="Email notifications"
                aria-describedby="email-help"
              />
              <div id="email-help" class="help-text" style="margin-left: 1.5rem; font-size: 0.875rem; color: #666;">
                Receive updates via email
              </div>
            </div>
            
            <div>
              <DynCheckbox 
                v-model="notifications.sms" 
                label="SMS notifications"
                aria-describedby="sms-help"
              />
              <div id="sms-help" class="help-text" style="margin-left: 1.5rem; font-size: 0.875rem; color: #666;">
                Receive updates via text message
              </div>
            </div>
            
            <div>
              <DynCheckbox 
                v-model="notifications.push" 
                label="Push notifications"
                aria-describedby="push-help"
              />
              <div id="push-help" class="help-text" style="margin-left: 1.5rem; font-size: 0.875rem; color: #666;">
                Receive browser notifications
              </div>
            </div>
          </div>
        </fieldset>
      </div>
    `,
    data() {
      return {
        notifications: {
          email: true,
          sms: false,
          push: true
        }
      };
    }
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Test keyboard navigation
    const firstCheckbox = canvas.getByLabelText('Email notifications');
    firstCheckbox.focus();
    await expect(firstCheckbox).toHaveFocus();
    
    // Test aria-describedby
    await expect(firstCheckbox).toHaveAttribute('aria-describedby', 'email-help');
    
    // Test fieldset/legend structure
    const fieldset = canvas.getByRole('group');
    await expect(fieldset).toBeVisible();
  }
};

// Dark Theme
export const DarkTheme: Story = {
  args: {
    label: 'Dark theme checkbox',
    modelValue: true
  },
  parameters: {
    backgrounds: { default: 'dark' }
  }
};