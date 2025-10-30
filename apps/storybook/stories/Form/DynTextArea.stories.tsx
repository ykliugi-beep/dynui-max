import type { Meta, StoryObj } from '@storybook/vue3';
import { userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import DynTextArea from '@dynui-max/core/components/Form/DynTextArea.vue';

const meta = {
  title: 'Form/DynTextArea',
  component: DynTextArea,
  parameters: {
    docs: {
      description: {
        component: 'Multi-line text input komponenta za duže sadržaje sa podrškom za validaciju i različite stanja.'
      }
    },
    a11y: {
      config: {
        rules: [
          { id: 'color-contrast', enabled: true },
          { id: 'keyboard-navigation', enabled: true },
          { id: 'label-content-name-mismatch', enabled: false }
        ]
      }
    }
  },
  argTypes: {
    modelValue: { control: 'text' },
    placeholder: { control: 'text' },
    rows: { control: { type: 'range', min: 2, max: 10, step: 1 } },
    disabled: { control: 'boolean' },
    readonly: { control: 'boolean' },
    required: { control: 'boolean' },
    maxLength: { control: { type: 'number', min: 0 } },
    error: { control: 'text' },
    resize: {
      control: { type: 'select' },
      options: ['none', 'both', 'horizontal', 'vertical']
    }
  }
} satisfies Meta<typeof DynTextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default Story
export const Default: Story = {
  args: {
    placeholder: 'Unesite vaš tekst...',
    rows: 4
  }
};

// With Label Story
export const WithLabel: Story = {
  args: {
    label: 'Opis projekta',
    placeholder: 'Opišite vaš projekat detaljno...',
    rows: 6
  }
};

// Validation States
export const WithValidation: Story = {
  args: {
    label: 'Komentar (obavezno)',
    placeholder: 'Vaš komentar mora biti najmanje 10 karaktera...',
    required: true,
    minLength: 10,
    rows: 4
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const textarea = canvas.getByRole('textbox');
    
    // Test short text validation
    await userEvent.type(textarea, 'Kratko');
    await userEvent.tab();
    
    // Should show validation error
    await expect(textarea).toHaveAttribute('aria-invalid', 'true');
  }
};

// Error State
export const ErrorState: Story = {
  args: {
    label: 'Feedback',
    placeholder: 'Podelite vaš feedback...',
    modelValue: 'Kratko',
    error: 'Feedback mora biti najmanje 20 karaktera dugačak',
    rows: 5
  }
};

// Disabled State
export const Disabled: Story = {
  args: {
    label: 'Readonly Information',
    modelValue: 'Ovaj sadržaj ne može biti menjan jer je komponenta onemogućena.',
    disabled: true,
    rows: 3
  }
};

// Character Limit
export const WithCharacterLimit: Story = {
  args: {
    label: 'Tweet (280 karaktera)',
    placeholder: 'Šta se događa?',
    maxLength: 280,
    showCharacterCount: true,
    rows: 4
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const textarea = canvas.getByRole('textbox');
    
    // Type text approaching limit
    const longText = 'A'.repeat(250);
    await userEvent.type(textarea, longText);
    
    // Character count should be visible
    const characterCount = canvas.getByText(/\d+\/280/);
    await expect(characterCount).toBeVisible();
  }
};

// Auto-expanding textarea
export const AutoExpanding: Story = {
  args: {
    label: 'Auto-expanding Textarea',
    placeholder: 'Počnite da kucate i textarea će se automatski proširivati...',
    autoExpand: true,
    minRows: 3,
    maxRows: 10
  }
};

// Interactive Form Example
export const InteractiveForm: Story = {
  render: () => ({
    components: { DynTextArea },
    template: `
      <div class="form-example">
        <h3>Kontakt Forma</h3>
        <form @submit.prevent="handleSubmit">
          <DynTextArea
            v-model="message"
            label="Vaša poruka"
            placeholder="Opišite kako možemo da vam pomognemo..."
            :required="true"
            :min-length="20"
            :max-length="500"
            :show-character-count="true"
            :rows="6"
          />
          <div class="form-actions" style="margin-top: 1rem;">
            <button type="submit" :disabled="!isValid" style="padding: 0.5rem 1rem;">Pošalji</button>
          </div>
        </form>
        <div v-if="submitted" class="success-message" style="color: green; margin-top: 1rem;">
          Poruka je uspešno poslata!
        </div>
      </div>
    `,
    data() {
      return {
        message: '',
        submitted: false
      };
    },
    computed: {
      isValid() {
        return this.message.length >= 20 && this.message.length <= 500;
      }
    },
    methods: {
      handleSubmit() {
        if (this.isValid) {
          this.submitted = true;
          setTimeout(() => {
            this.submitted = false;
            this.message = '';
          }, 3000);
        }
      }
    }
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const textarea = canvas.getByRole('textbox');
    const submitButton = canvas.getByRole('button', { name: /pošalji/i });
    
    // Initially button should be disabled
    await expect(submitButton).toBeDisabled();
    
    // Type valid message
    await userEvent.type(textarea, 'Ovo je test poruka koja je dovoljno dugačka da prođe validaciju i omogući slanje forme.');
    
    // Button should now be enabled
    await expect(submitButton).toBeEnabled();
    
    // Submit form
    await userEvent.click(submitButton);
    
    // Success message should appear
    await expect(canvas.getByText('Poruka je uspešno poslata!')).toBeVisible();
  }
};

// Real-world Example - Code Editor
export const CodeEditor: Story = {
  args: {
    label: 'CSS kod',
    placeholder: 'Unesite vaš CSS kod...',
    modelValue: `.container {\n  max-width: 1200px;\n  margin: 0 auto;\n  padding: 20px;\n}\n\n.header {\n  background: #333;\n  color: white;\n  padding: 1rem;\n}`,
    fontFamily: 'monospace',
    rows: 10,
    resize: 'both'
  }
};

// Accessibility Demo
export const AccessibilityDemo: Story = {
  render: (args) => ({
    components: { DynTextArea },
    template: `
      <div>
        <DynTextArea v-bind="args" />
        <div id="help-text" class="help-text" style="margin-top: 0.5rem; color: #666; font-size: 0.875rem;">
          Ovo polje je obavezno i mora sadržavati najmanje 10 karaktera.
        </div>
      </div>
    `,
    setup() {
      return { args };
    }
  }),
  args: {
    label: 'Accessibility-focused Textarea',
    placeholder: 'Ova textarea ima sve potrebne ARIA atribute...',
    required: true,
    'aria-describedby': 'help-text',
    rows: 4
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const textarea = canvas.getByRole('textbox');
    
    // Test keyboard navigation
    await userEvent.tab();
    await expect(textarea).toHaveFocus();
    
    // Test aria attributes
    await expect(textarea).toHaveAttribute('required');
    await expect(textarea).toHaveAttribute('aria-describedby', 'help-text');
  }
};

// Dark Theme
export const DarkTheme: Story = {
  args: {
    label: 'Dark Theme Example',
    placeholder: 'Textarea u dark mode...',
    modelValue: 'Ovaj sadržaj je prikazan u dark theme varijanti.',
    rows: 4
  },
  parameters: {
    backgrounds: { default: 'dark' }
  }
};